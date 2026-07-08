import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ApplicationPayload {
  company_name: string;
  contact_name: string;
  dispatch_phone: string;
  whatsapp_phone: string;
  email: string;
  business_postcode: string;
  website_or_facebook: string;
  postcode_areas: string;
  towns_areas: string;
  hours_covered: string;
  eta_minutes: string;
  service_preference: string;
  standard_local_recovery_price: string;
  non_runner_price: string;
  winch_add_on: string;
  miles_included: string;
  extra_mile_price: string;
  mileage_type: string;
  out_of_hours_uplift: string;
  motorway_minimum_price: string;
  awkward_access_uplift: string;
  accident_damaged_uplift: string;
  pricing_notes: string;
  extra_notes: string;
  capability_roadside: boolean;
  capability_home: boolean;
  capability_non_runner: boolean;
  capability_winch: boolean;
  capability_motorway: boolean;
  capability_accident: boolean;
  capability_specialist: boolean;
  capability_transport: boolean;
  raw_payload?: any;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { application }: { application: ApplicationPayload } = await req.json();

    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set. Email not sent.");
      return new Response(
        JSON.stringify({ message: "API key missing, email skipped." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    const emailBody = `
New Recovero Recovery Partner Application

Company Name: ${application.company_name}
Contact Name: ${application.contact_name}
Dispatch Phone: ${application.dispatch_phone}
WhatsApp Phone: ${application.whatsapp_phone}
Email: ${application.email}
Business Postcode: ${application.business_postcode}
Website/Facebook: ${application.website_or_facebook}

Service Area & Availability
Postcode Areas: ${application.postcode_areas}
Towns Covered: ${application.towns_areas}
Hours Covered: ${application.hours_covered}
ETA: ${application.eta_minutes}
Service Preference: ${application.service_preference}

Capabilities
Roadside: ${application.capability_roadside ? "Yes" : "No"}
Home: ${application.capability_home ? "Yes" : "No"}
Non-Runner: ${application.capability_non_runner ? "Yes" : "No"}
Winch: ${application.capability_winch ? "Yes" : "No"}
Motorway: ${application.capability_motorway ? "Yes" : "No"}
Accident: ${application.capability_accident ? "Yes" : "No"}
Specialist: ${application.capability_specialist ? "Yes" : "No"}
Transport: ${application.capability_transport ? "Yes" : "No"}

Transport Details:
Lead Time: ${application.raw_payload?.transportLeadTime || "N/A"}
Pricing Notes: ${application.raw_payload?.transportPricingNotes || "N/A"}
Vehicle Limits: ${application.raw_payload?.vehicleLimits || "N/A"}

Pricing
Local Recovery: ${application.standard_local_recovery_price}
Non-Runner: ${application.non_runner_price}
Winch Add-on: ${application.winch_add_on}
Miles Included: ${application.miles_included}
Extra Mile Price: ${application.extra_mile_price}
Mileage Type: ${application.mileage_type}
Out of Hours Uplift: ${application.out_of_hours_uplift}
Motorway Minimum: ${application.motorway_minimum_price}
Awkward Access: ${application.awkward_access_uplift}
Accident Uplift: ${application.accident_damaged_uplift}

Pricing Notes:
${application.pricing_notes}

Extra Notes:
${application.extra_notes}
`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Recovero <onboarding@resend.dev>", // Or another verified domain
        to: ["support@recovero247.co.uk"],
        subject: "New Recovero Recovery Partner Application",
        text: emailBody,
      }),
    });

    const resData = await res.json();

    if (res.ok) {
      return new Response(JSON.stringify(resData), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ error: resData }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
