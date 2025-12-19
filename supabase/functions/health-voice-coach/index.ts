import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Health coaching prompts for different lifestyles
const healthCoachingPrompts = {
  athlete: `You are a professional sports health coach and nutritionist. You specialize in optimizing performance, recovery, and injury prevention for athletes. Provide evidence-based advice on training, nutrition, sleep optimization, and performance analytics.`,
  
  senior: `You are a compassionate health coach specializing in senior wellness. You focus on maintaining independence, preventing falls, managing chronic conditions, and promoting healthy aging. Your advice is patient, clear, and considers mobility limitations and medication interactions.`,
  
  deskWorker: `You are a workplace wellness coach specializing in sedentary lifestyle health. You focus on combating the effects of prolonged sitting, improving posture, managing eye strain, and integrating movement into busy work schedules.`,
  
  general: `You are a certified health and wellness coach. You provide personalized, evidence-based health advice tailored to individual lifestyles, goals, and health conditions. You emphasize sustainable, practical changes that improve overall wellbeing.`
};

const getPersonalizedPrompt = (userProfile: any) => {
  let basePrompt = healthCoachingPrompts.general;
  
  // Determine user type based on profile data
  if (userProfile?.exercise_frequency >= 5 || userProfile?.fitness_goals?.includes('Athletic Performance')) {
    basePrompt = healthCoachingPrompts.athlete;
  } else if (userProfile?.age >= 65) {
    basePrompt = healthCoachingPrompts.senior;
  } else if (userProfile?.activity_level === 'sedentary' || userProfile?.activity_level === 'light') {
    basePrompt = healthCoachingPrompts.deskWorker;
  }

  // Add user-specific context
  const context = `
Current user context:
- Age: ${userProfile?.age || 'Not specified'}
- Activity Level: ${userProfile?.activity_level || 'Not specified'}
- Fitness Goals: ${userProfile?.fitness_goals?.join(', ') || 'General health'}
- Health Conditions: ${userProfile?.health_conditions?.join(', ') || 'None specified'}
- Sleep Goal: ${userProfile?.sleep_goal_hours || 8} hours
- Exercise Frequency: ${userProfile?.exercise_frequency || 0} times per week

Health Guidelines:
- Always prioritize safety and recommend consulting healthcare providers for medical concerns
- Provide actionable, specific advice
- Consider accessibility and individual limitations
- Be encouraging and supportive
- Use simple, clear language
- Keep responses concise but comprehensive (2-3 sentences max unless specifically asked for detail)
`;

  return basePrompt + context;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userProfile, conversationHistory = [] } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    // Build conversation messages
    const systemPrompt = getPersonalizedPrompt(userProfile);
    
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-6), // Keep last 6 messages for context
      { role: 'user', content: message }
    ];

    console.log('Sending request to OpenAI with profile:', userProfile);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        frequency_penalty: 0.5,
        presence_penalty: 0.3,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('Generated response:', aiResponse);

    return new Response(JSON.stringify({ 
      message: aiResponse,
      usage: data.usage 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in health-voice-coach function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});