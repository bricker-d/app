import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const healthCoachSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().max(5000)
  })).max(50),
  userData: z.object({
    bioPrecisionScore: z.number().optional(),
    hrv: z.number().optional(),
    hrvBaseline: z.number().optional(),
    hydration: z.object({
      consumed: z.number(),
      target: z.number()
    }).optional(),
    steps: z.number().optional(),
    stepsTarget: z.number().optional(),
    sleep: z.number().optional(),
    glucose: z.number().optional()
  }).optional()
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { messages, userData } = healthCoachSchema.parse(body);
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build system prompt with user's health context
    const systemPrompt = `You are BioPrecision AI, an expert health coach specializing in metabolic health, sleep optimization, and biomarker analysis.

${userData ? `
CURRENT USER CONTEXT:
${userData.bioPrecisionScore ? `- BioPrecision Score: ${userData.bioPrecisionScore}/100` : ''}
${userData.hrv ? `- Heart Rate Variability (HRV): ${userData.hrv} ms (baseline: ${userData.hrvBaseline} ms)` : ''}
${userData.hydration ? `- Hydration: ${userData.hydration.consumed}/${userData.hydration.target} oz (${Math.round((userData.hydration.consumed/userData.hydration.target)*100)}%)` : ''}
${userData.steps && userData.stepsTarget ? `- Steps: ${userData.steps}/${userData.stepsTarget} (${Math.round((userData.steps/userData.stepsTarget)*100)}%)` : ''}
${userData.sleep ? `- Recent Sleep: ${userData.sleep} hours` : ''}
${userData.glucose ? `- Fasting Glucose: ${userData.glucose} mg/dL` : ''}
` : ''}

GUIDELINES:
- Provide actionable, evidence-based health insights
- Reference the user's specific metrics when relevant
- Explain WHY certain recommendations matter (e.g., "Post-meal walks help because...")
- Keep responses concise but informative (2-4 sentences for simple questions)
- For tiredness after meals: consider glucose spikes, meal composition, timing, and activity level
- Always be encouraging and supportive
- If asked about serious medical concerns, recommend consulting a healthcare provider

EXAMPLE RESPONSES:
Q: "Why am I tired after lunch?"
A: "Post-lunch fatigue often signals a glucose spike from carb-dense meals. Your current glucose is ${userData?.glucose || 'N/A'} mg/dL. Try reducing refined carbs, adding protein/fiber, and taking a 10-15 minute walk after eating to improve glucose disposal by ~18%. This should restore energy within 20-30 minutes."

Be conversational, knowledgeable, and focused on actionable steps the user can take right now.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please contact support." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Health coach chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});