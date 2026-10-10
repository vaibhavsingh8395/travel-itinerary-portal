import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface EmailPayload {
  recipientEmail: string;
  destination: string;
  duration: string;
  status: string;
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { recipientEmail, destination, duration, status }: EmailPayload = await req.json();

    console.log(`[EMAIL DISPATCH] To: ${recipientEmail} | Subject: Travel Itinerary Update for ${destination}`);
    console.log(`[BODY] Status updated to: ${status} for your ${duration} trip to ${destination}.`);

    return new Response(
      JSON.stringify({ success: true, message: "Notification email queued." }),
      { headers: { "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { "Content-Type": "application/json" }, status: 400 }
    );
  }
});
