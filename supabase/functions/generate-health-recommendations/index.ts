import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { healthData } = await req.json();

    if (!healthData || healthData.length === 0) {
      throw new Error('No health data provided');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Build health data summary for AI
    const dataSummary = healthData.map((item: any) => 
      `${item.metric}: ${item.average} ${item.unit} (trend: ${item.trend}, normal: ${item.normalRange})`
    ).join('\n');

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an expert health coach analyzing biometric data. Generate 3-5 actionable, personalized health recommendations based on the user's data patterns. Focus on practical advice.

For each recommendation, provide:
- title: Clear, action-oriented title
- description: Detailed explanation (2-3 sentences)
- category: One of: nutrition, exercise, sleep, recovery, hydration
- priority: high, medium, or low
- reasoning: Why this matters based on their specific data
- confidence: 0-1 score for how confident you are in this recommendation

Return ONLY valid JSON in this exact format:
{
  "recommendations": [
    {
      "id": "unique-id",
      "title": "...",
      "description": "...",
      "category": "...",
      "priority": "...",
      "reasoning": "...",
      "confidence": 0.85
    }
  ]
}`
          },
          {
            role: 'user',
            content: `Analyze this health data and provide recommendations:\n\n${dataSummary}`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!aiResponse.ok) {
      const error = await aiResponse.text();
      console.error('AI Gateway error:', error);
      throw new Error(`AI processing failed: ${error}`);
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices[0]?.message?.content || '{"recommendations": []}';
    
    // Parse the JSON response
    let parsedData;
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      parsedData = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Content:', content);
      
      // Fallback: Create basic recommendations from the data
      parsedData = {
        recommendations: healthData.slice(0, 3).map((item: any, index: number) => ({
          id: `rec-${index}`,
          title: `Monitor your ${item.metric}`,
          description: `Your ${item.metric} is currently ${item.average} ${item.unit} with a ${item.trend} trend.`,
          category: 'recovery',
          priority: 'medium',
          reasoning: `Based on your recent ${item.metric} readings`,
          confidence: 0.75
        }))
      };
    }

    return new Response(
      JSON.stringify(parsedData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        recommendations: []
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
