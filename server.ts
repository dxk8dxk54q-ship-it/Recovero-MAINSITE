import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { buildStructuredData, canonicalUrl, getSeoForPath, isKnownRoute, normalizePath } from "./src/seo";

dotenv.config();

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderSeoHtml(template: string, pathname: string) {
  const normalized = normalizePath(pathname);
  const knownRoute = isKnownRoute(normalized);
  const seo = getSeoForPath(normalized);
  const canonical = canonicalUrl(knownRoute ? normalized : "/");
  const robots = seo.robots || (knownRoute ? "index,follow" : "noindex,follow");
  const structuredData = JSON.stringify(buildStructuredData(normalized)).replace(/</g, "\\u003c");

  let html = template
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(seo.title)}</title>`)
    .replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${escapeHtml(seo.description)}" />`)
    .replace(/<meta\s+name=["']robots["'][^>]*>/i, `<meta name="robots" content="${escapeHtml(robots)}" />`)
    .replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${escapeHtml(canonical)}" />`)
    .replace(/<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${escapeHtml(seo.title)}" />`)
    .replace(/<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${escapeHtml(seo.description)}" />`)
    .replace(/<meta\s+property=["']og:url["'][^>]*>/i, `<meta property="og:url" content="${escapeHtml(canonical)}" />`)
    .replace(/<meta\s+name=["']twitter:title["'][^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`)
    .replace(/<meta\s+name=["']twitter:description["'][^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`);

  html = html.replace(
    "</head>",
    `<script id="recovero-structured-data" type="application/ld+json">${structuredData}</script>\n  </head>`
  );

  return html;
}


async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Route for partner application submission
  app.post("/api/partner-apply", async (req, res) => {
    try {
      const {
        companyName,
        contactName,
        dispatchPhone,
        whatsappPhone,
        email,
        businessPostcode,
        websiteOrFacebook,
        postcodeAreas,
        townsCovered,
        hoursCovered,
        eta,
        capabilityRoadside,
        capabilityHome,
        capabilityNonRunner,
        capabilityWinch,
        capabilityMotorway,
        capabilityAccident,
        capabilitySpecialist,
        capabilityTransport,
        servicePreference,
        transportLeadTime,
        transportPricingNotes,
        vehicleLimits,
        priceLocalRecovery,
        priceNonRunner,
        priceWinchAddon,
        milesIncluded,
        priceExtraMile,
        mileageType,
        priceOutOfHoursUplift,
        priceMotorwayMinimum,
        priceAwkwardAccessUplift,
        priceAccidentUplift,
        priceSevereManualQuote,
        pricingNotes,
        extraNotes,
        honeypot, // anti-spam hidden field
      } = req.body;

      // Anti-spam Honeypot Check
      if (honeypot && honeypot.trim() !== "") {
        console.log("Honeypot filled, blocking bot request.");
        // Return 200 to mimic a successful submission and throw off the spam bot
        return res.status(200).json({ 
          success: true, 
          message: "Thanks — we’ve received your application and will be in touch shortly." 
        });
      }

      // Basic Server-side Validation
      if (
        !companyName || 
        !contactName || 
        !dispatchPhone || 
        !email || 
        !postcodeAreas || 
        !hoursCovered || 
        !eta || 
        !priceLocalRecovery || 
        !priceNonRunner || 
        !servicePreference
      ) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields.",
        });
      }

      // Configure nodemailer transporter
      const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
      const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      let transporter = null;
      
      if (smtpUser && smtpPass) {
        transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });
      } else {
        console.warn("SMTP_USER or SMTP_PASS environment variables are missing. Sending will be simulated in server logs.");
      }

      const emailBody = `
New Recovero Recovery Partner Application

Business Details:
Company name: ${companyName}
Contact name: ${contactName}
Dispatch phone: ${dispatchPhone}
WhatsApp phone: ${whatsappPhone || "N/A"}
Email: ${email}
Business postcode: ${businessPostcode || "N/A"}
Website/Facebook: ${websiteOrFacebook || "N/A"}

Coverage:
Postcode areas: ${postcodeAreas}
Towns covered: ${townsCovered || "N/A"}
Hours covered: ${hoursCovered}
Estimated ETA: ${eta} minutes

Capabilities:
Roadside: ${capabilityRoadside ? "Yes" : "No"}
Home: ${capabilityHome ? "Yes" : "No"}
Non-runner: ${capabilityNonRunner ? "Yes" : "No"}
Winch: ${capabilityWinch ? "Yes" : "No"}
Motorway: ${capabilityMotorway ? "Yes" : "No"}
Accident: ${capabilityAccident ? "Yes" : "No"}
Specialist: ${capabilitySpecialist ? "Yes" : "No"}
Transport: ${capabilityTransport ? "Yes" : "No"}

Transport:
Service preference: ${servicePreference}
Typical transport lead time: ${transportLeadTime || "N/A"}
Transport pricing notes: ${transportPricingNotes || "N/A"}
Vehicle limits / notes: ${vehicleLimits || "N/A"}

Pricing:
Standard local price: £${priceLocalRecovery}
Non-runner price: £${priceNonRunner}
Winch add-on: ${priceWinchAddon ? "£" + priceWinchAddon : "N/A"}
Miles included: ${milesIncluded || "N/A"}
Extra mile price: ${priceExtraMile ? "£" + priceExtraMile + "/mile" : "N/A"}
Mileage type: ${mileageType || "N/A"}
Out-of-hours uplift: ${priceOutOfHoursUplift ? "£" + priceOutOfHoursUplift : "N/A"}
Motorway minimum: ${priceMotorwayMinimum ? "£" + priceMotorwayMinimum : "N/A"}
Awkward access uplift: ${priceAwkwardAccessUplift ? "£" + priceAwkwardAccessUplift : "N/A"}
Accident damaged uplift: ${priceAccidentUplift ? "£" + priceAccidentUplift : "N/A"}
Severe/manual quote: ${priceSevereManualQuote ? "Severe accident jobs require manual quote" : "No"}
Pricing notes: ${pricingNotes || "N/A"}

Extra notes:
${extraNotes || "N/A"}
      `.trim();

      const mailOptions = {
        from: smtpUser ? `"Recovero Partners" <${smtpUser}>` : `"Recovero Partners" <applications@recovero247.co.uk>`,
        to: "support@recovero247.co.uk",
        subject: "New Recovero Recovery Partner Application",
        text: emailBody,
        replyTo: email,
      };

      if (transporter) {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to support@recovero247.co.uk");
      } else {
        console.log("=== SIMULATED EMAIL SUBMISSION ===");
        console.log("To: support@recovero247.co.uk");
        console.log("Reply-To:", email);
        console.log("Body:\n", emailBody);
        console.log("==================================");
      }

      return res.status(200).json({
        success: true,
        message: "Thanks — we’ve received your application and will be in touch shortly.",
      });
    } catch (error: any) {
      console.error("Error processing application:", error);
      return res.status(500).json({
        success: false,
        error: "Something went wrong. Please try again or email support@recovero247.co.uk.",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    const indexPath = path.join(distPath, "index.html");
    const indexTemplate = fs.readFileSync(indexPath, "utf-8");

    app.use(express.static(distPath, { index: false }));

    app.get("*", (req, res) => {
      const pathname = normalizePath(req.path);
      const knownRoute = isKnownRoute(pathname);
      const html = renderSeoHtml(indexTemplate, pathname);

      res.status(knownRoute ? 200 : 404).type("html").send(html);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
