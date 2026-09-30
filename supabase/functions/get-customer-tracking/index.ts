import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return new Response(
        JSON.stringify({ error: "Missing Supabase server configuration" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    let token = "";
    if (req.method === "GET") {
      const url = new URL(req.url);
      token = url.searchParams.get("token") || "";
    } else {
      const body = await req.json().catch(() => ({}));
      token = body.token || "";
    }

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Tracking token is required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Try finding by tracking_token, token, reference, or job_number
    let { data: job, error } = await supabase
      .from("jobs")
      .select("*")
      .or(`tracking_token.eq.${token},token.eq.${token},job_number.eq.${token},id.eq.${token}`)
      .maybeSingle();

    if (error || !job) {
      // Try alternate tracking table if present
      const altResult = await supabase
        .from("customer_tracking")
        .select("*")
        .eq("token", token)
        .maybeSingle();

      if (altResult.data) {
        job = altResult.data;
      }
    }

    if (!job) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired tracking link" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404,
        }
      );
    }

    // Sanitize job data for public customer tracking
    const customerJob = {
      id: job.id,
      job_ref: job.job_number || job.job_ref || job.reference || job.id?.slice(0, 8),
      status: job.status || "driver_assigned",
      service_type: job.service_type || job.type || "Vehicle Recovery",
      customer_name: job.customer_name || job.client_name,
      vehicle_make: job.vehicle_make || job.make,
      vehicle_model: job.vehicle_model || job.model,
      vehicle_reg: job.vehicle_reg || job.registration || job.vrm,
      vehicle_color: job.vehicle_color || job.color,
      pickup_address: job.pickup_address || job.collection_address || job.pickup_location,
      pickup_postcode: job.pickup_postcode || job.collection_postcode,
      dropoff_address: job.dropoff_address || job.delivery_address || job.dropoff_location,
      dropoff_postcode: job.dropoff_postcode || job.delivery_postcode,
      driver_name: job.driver_name || (job.driver ? `${job.driver.first_name || ''} ${job.driver.last_name || ''}`.trim() : null),
      driver_phone: job.driver_phone || job.driver_contact,
      driver_vehicle: job.driver_vehicle || job.recovery_truck_type,
      eta: job.eta || job.eta_text,
      eta_minutes: job.eta_minutes,
      notes: job.notes || job.special_instructions,
      updated_at: job.updated_at || job.created_at,
    };

    return new Response(
      JSON.stringify({ job: customerJob, success: true }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "An unexpected error occurred" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
