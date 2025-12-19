import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useUserProfile } from '@/hooks/useUserProfile';
import { supabase } from '@/integrations/supabase/client';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  MessageCircle, 
  Brain, 
  Heart,
  Activity,
  Users,
  Clock,
  Zap
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

interface VoiceHealthCoachProps {
  onClose?: () => void;
}

export function VoiceHealthCoach({ onClose }: VoiceHealthCoachProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [textInput, setTextInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const { toast } = useToast();
  const { profile } = useUserProfile();

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = getWelcomeMessage();
    setMessages([{
      role: 'assistant',
      content: welcomeMessage,
      timestamp: new Date()
    }]);
    
    if (voiceEnabled) {
      speakText(welcomeMessage);
    }
  }, [profile]);

  const getWelcomeMessage = () => {
    const name = profile?.display_name || profile?.first_name || 'there';
    const age = profile?.age;
    const activityLevel = profile?.activity_level;
    
    let personalizedGreeting = `Hello ${name}! I'm your AI health coach, ready to help you on your wellness journey.`;
    
    if (age && age >= 65) {
      personalizedGreeting += " I specialize in supporting healthy aging and maintaining vitality at every stage of life.";
    } else if (activityLevel === 'very_active' || profile?.exercise_frequency >= 5) {
      personalizedGreeting += " I'm here to help optimize your athletic performance, recovery, and training.";
    } else if (activityLevel === 'sedentary' || activityLevel === 'light') {
      personalizedGreeting += " I'll help you integrate healthy movement and wellness habits into your daily routine.";
    }
    
    return personalizedGreeting + " What can I help you with today? You can speak to me or type your question.";
  };

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      audioChunksRef.current = [];
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        processAudio(audioBlob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsListening(true);
      
      toast({
        title: "Listening...",
        description: "Speak your health question now",
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopListening = () => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsLoading(true);
    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        
        // Send to voice-to-text function
        const { data, error } = await supabase.functions.invoke('voice-to-text', {
          body: { audio: base64Audio }
        });
        
        if (error) throw error;
        
        const transcribedText = data.text;
        if (transcribedText.trim()) {
          await handleMessage(transcribedText, true);
        }
      };
      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error('Error processing audio:', error);
      toast({
        title: "Error",
        description: "Could not process your voice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const speakText = async (text: string) => {
    if (!voiceEnabled) return;
    
    try {
      setIsSpeaking(true);
      
      // Choose voice based on user profile
      const voice = profile?.biological_sex === 'female' ? 'nova' : 'alloy';
      
      const { data, error } = await supabase.functions.invoke('text-to-voice', {
        body: { text, voice, speed: 0.9 }
      });
      
      if (error) throw error;
      
      // Play audio
      const audioBlob = new Blob([
        Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))
      ], { type: 'audio/mp3' });
      
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current = new Audio(audioUrl);
      
      audioRef.current.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audioRef.current.play();
    } catch (error) {
      console.error('Error speaking text:', error);
      setIsSpeaking(false);
    }
  };

  const handleMessage = async (messageText: string, isVoice = false) => {
    if (!messageText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: messageText,
      timestamp: new Date(),
      isVoice
    };
    
    setMessages(prev => [...prev, userMessage]);
    setTextInput('');
    setIsLoading(true);
    
    try {
      // Send to health coach
      const conversationHistory = messages.slice(-4).map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      const { data, error } = await supabase.functions.invoke('health-voice-coach', {
        body: { 
          message: messageText,
          userProfile: profile,
          conversationHistory
        }
      });
      
      if (error) throw error;
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Speak response if voice is enabled
      if (voiceEnabled) {
        await speakText(data.message);
      }
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: "Error",
        description: "Could not get response from health coach. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getUserTypeIcon = () => {
    if (profile?.age && profile.age >= 65) {
      return <Heart className="h-5 w-5 text-pink-500" />;
    } else if (profile?.exercise_frequency >= 5 || profile?.fitness_goals?.includes('Athletic Performance')) {
      return <Zap className="h-5 w-5 text-yellow-500" />;
    } else if (profile?.activity_level === 'sedentary' || profile?.activity_level === 'light') {
      return <Clock className="h-5 w-5 text-blue-500" />;
    }
    return <Users className="h-5 w-5 text-green-500" />;
  };

  const getUserTypeLabel = () => {
    if (profile?.age && profile.age >= 65) {
      return "Senior Wellness";
    } else if (profile?.exercise_frequency >= 5 || profile?.fitness_goals?.includes('Athletic Performance')) {
      return "Athletic Performance";
    } else if (profile?.activity_level === 'sedentary' || profile?.activity_level === 'light') {
      return "Workplace Wellness";
    }
    return "General Health";
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[90vh] flex flex-col gradient-card border-primary/20 shadow-neon">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">AI Health Coach</h2>
                <div className="flex items-center gap-2 mt-1">
                  {getUserTypeIcon()}
                  <Badge variant="outline" className="text-xs">
                    {getUserTypeLabel()}
                  </Badge>
                  {isSpeaking && (
                    <Badge className="bg-green-500 text-white animate-pulse">
                      Speaking...
                    </Badge>
                  )}
                  {isListening && (
                    <Badge className="bg-red-500 text-white animate-pulse">
                      Listening...
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={voiceEnabled ? 'bg-primary/10' : ''}
              >
                {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              {onClose && (
                <Button variant="outline" size="sm" onClick={onClose}>
                  Close
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 border border-border'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.role === 'assistant' && (
                    <Brain className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  )}
                  {message.role === 'user' && message.isVoice && (
                    <Mic className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="leading-relaxed">{message.content}</p>
                    <span className="text-xs opacity-70 mt-2 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted/50 border border-border p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-primary animate-pulse" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-border">
          <div className="flex gap-3">
            <div className="flex-1">
              <Textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Ask me about nutrition, exercise, sleep, stress management, or any health topic..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleMessage(textInput);
                  }
                }}
                disabled={isLoading || isListening}
                className="min-h-[60px] resize-none"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <Button
                onClick={isListening ? stopListening : startListening}
                disabled={isLoading || isSpeaking}
                className={`h-[60px] w-[60px] ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              
              <Button
                onClick={() => handleMessage(textInput)}
                disabled={!textInput.trim() || isLoading || isListening}
                variant="outline"
                className="h-[60px] w-[60px]"
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mic className="h-3 w-3" />
                <span>Voice input</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                <span>Text input</span>
              </div>
              <div className="flex items-center gap-1">
                <Activity className="h-3 w-3" />
                <span>Personalized for your lifestyle</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}