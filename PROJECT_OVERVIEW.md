# BioIntelligence Health Platform - Project Overview

## Executive Summary
A comprehensive health optimization platform featuring real-time biometric tracking, AI-powered health coaching, and personalized wellness plans. Built with React, TypeScript, Tailwind CSS, and Supabase backend.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **State Management**: TanStack Query (React Query)
- **UI Components**: Radix UI, shadcn/ui
- **Charts**: Recharts
- **Routing**: React Router v6

## Architecture Overview

### Frontend Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui base components
│   ├── *Chart.tsx      # Data visualization components
│   ├── *Demo.tsx       # Interactive demo components
│   └── Health*.tsx     # Health-specific features
├── pages/              # Route-level components
├── hooks/              # Custom React hooks
│   ├── useAuth.tsx     # Authentication management
│   ├── useHealthData.tsx # Health data fetching
│   └── useNotifications.tsx # Notification system
├── lib/                # Utilities and schemas
└── integrations/       # External service integrations
    └── supabase/       # Supabase client & types
```

### Backend Structure (Supabase)
```
supabase/
├── functions/          # Edge Functions (serverless)
│   ├── health-coach-chat/
│   ├── health-voice-coach/
│   ├── voice-to-text/
│   ├── text-to-voice/
│   ├── extract-lab-results/
│   └── generate-health-recommendations/
└── config.toml        # Supabase configuration
```

## Core Features

### 1. Health Dashboard (`/dashboard`, `/bioprecision`)
- **Real-time metrics**: Heart rate, HRV, glucose, sleep, hydration
- **BioPrecision Score**: Composite health accountability score
- **Trajectory View**: Long-term health trend analysis
- **Weekly Bio Plan**: Personalized weekly optimization plans
- **Labs Optimization**: Lab result tracking and optimization

**Key Components**:
- `AccountabilityScore.tsx` - Main score display with category breakdown
- `TrajectoryView.tsx` - Time-series health data visualization
- `WeeklyBioPlan.tsx` - Weekly goal and action plan
- `LabsOptimization.tsx` - Lab result management

### 2. AI Health Coach
- **Text Chat**: `HealthCoachChat.tsx` - AI-powered health conversations
- **Voice Coach**: `VoiceHealthCoach.tsx` - Voice-enabled coaching with speech-to-text/text-to-speech
- **Personalization**: Uses user profile data for context-aware recommendations
- **Streaming Responses**: Real-time AI response streaming

**Edge Functions**:
- `health-coach-chat/` - Main chat AI endpoint (Lovable AI Gateway)
- `health-voice-coach/` - Voice-specific coaching logic
- `voice-to-text/` - Audio transcription
- `text-to-voice/` - Speech synthesis

### 3. Data Entry & Tracking
- **Manual Entry**: `HealthDataEntry.tsx` - Form-based metric input
- **Photo Entry**: `PhotoDataEntry.tsx` - Image-based data capture
- **Lab Results**: `extract-lab-results/` edge function for document parsing
- **Validation**: `validationSchemas.ts` - Zod-based input validation

### 4. Insights & Recommendations
- **AI Recommendations**: `AIRecommendations.tsx` - Personalized action items
- **Predictive Insights**: `PredictiveInsights.tsx` - Future health predictions
- **Adaptive Nudges**: `AdaptiveNudges.tsx` - Context-aware health reminders
- **Health Insights**: `HealthInsights.tsx` - Pattern detection and analysis

### 5. Integrations
- **Device Integration**: `DeviceIntegration.tsx` - Wearable device connections
- **Data Ecosystem Hub**: `DataEcosystemHub.tsx` - Third-party service integrations
- **Real-time Sync**: Automatic data synchronization

### 6. Authentication & User Management
- **Auth System**: Supabase Auth with email/password
- **User Profiles**: `profiles` table for extended user data
- **Roles**: Admin, coach, enterprise admin roles via `user_roles` table
- **Auth Hook**: `useAuth.tsx` for session management

## Database Schema

### Core Tables
- **profiles**: User profile data (display_name, avatar, bio, preferences)
- **metrics**: Health metric definitions (name, unit, normal ranges)
- **readings**: Individual health measurements (user_id, metric_id, value, timestamp)
- **goals**: User health goals (type, target, deadline, progress)
- **weekly_plans**: Weekly optimization plans
- **notifications**: User notification management
- **device_connections**: Connected device tracking
- **user_roles**: Role-based access control
- **enterprise_members**: Enterprise organization membership

### Key Database Functions
- `handle_new_user()`: Auto-creates profile on signup
- `has_role()`: Role checking for RBAC
- `is_enterprise_admin()`: Enterprise permission checking
- `update_*_updated_at()`: Automatic timestamp updates

## Design System

### Color Tokens (HSL-based)
```css
--primary: Main brand color
--secondary: Secondary accent
--accent: Highlight color
--muted: Subdued backgrounds
--destructive: Error states
```

### Component Variants
- Buttons: default, destructive, outline, secondary, ghost, link
- Cards: default, elevated, glass (semi-transparent)
- Badges: default, secondary, destructive, outline

### Responsive Design
- Mobile-first approach
- Custom hook: `use-mobile.tsx` for breakpoint detection
- Mobile-optimized components: `MobileOptimizedHero.tsx`

## Key Workflows

### 1. User Onboarding
`OnboardingFlow.tsx` → Profile setup → Goal definition → Device connection

### 2. Health Data Flow
Manual Entry / Photo / Device → Validation → Database (`readings` table) → Real-time updates → Dashboard refresh

### 3. AI Coaching Session
User message → `health-coach-chat` edge function → Lovable AI Gateway → Streaming response → Chat UI

### 4. Weekly Plan Generation
User data analysis → AI recommendation generation → `weekly_plans` table → `WeeklyBioPlan.tsx` display

## API Integration Points

### Supabase Edge Functions
All functions deployed at: `https://heoteyiobtlykkwjwrrv.supabase.co/functions/v1/`

1. **health-coach-chat**: POST `/health-coach-chat`
   - Input: `{ messages, userData }`
   - Output: Streaming AI response

2. **health-voice-coach**: POST `/health-voice-coach`
   - Input: `{ message, userData }`
   - Output: JSON with AI response

3. **voice-to-text**: POST `/voice-to-text`
   - Input: `{ audio: base64 }`
   - Output: `{ text: string }`

4. **text-to-voice**: POST `/text-to-voice`
   - Input: `{ text: string }`
   - Output: Audio file (base64)

5. **extract-lab-results**: POST `/extract-lab-results`
   - Input: Lab document image/PDF
   - Output: Structured lab data

6. **generate-health-recommendations**: POST `/generate-health-recommendations`
   - Input: User health data
   - Output: Personalized recommendations

### External APIs (via Edge Functions)
- **Lovable AI Gateway**: `https://ai.gateway.lovable.dev/v1/chat/completions`
- **OpenAI**: Used via edge functions for AI features

## State Management Patterns

### React Query (TanStack Query)
- **Health Metrics**: `useHealthMetrics()` - Fetch metric definitions
- **Readings**: `useReadings()` - Fetch/add user health readings
- **Health Status**: `useHealthStatus()` - Current health overview
- **User Profile**: `useUserProfile()` - User data and preferences

### Context Providers
- **AuthProvider**: Global auth state (`useAuth` hook)
- **QueryClientProvider**: React Query setup
- **TooltipProvider**: UI tooltip management

## Security Considerations

### Row Level Security (RLS)
- All user data tables have RLS policies
- Users can only access their own data
- Enterprise admins have elevated permissions

### Authentication
- JWT-based session management
- Automatic token refresh
- Secure credential storage (localStorage)

### API Security
- Edge functions validate user sessions
- Service role key used only server-side
- Rate limiting on AI endpoints

## Performance Optimizations

### Code Splitting
- Route-based lazy loading via React Router
- Component-level code splitting opportunities

### Data Fetching
- React Query caching (5-minute stale time typical)
- Optimistic updates for better UX
- Background refetching

### Real-time Updates
- Supabase real-time subscriptions for live data
- Efficient re-render patterns with React Query

## Current Limitations & Areas for Improvement

### Technical Debt
1. **Large Components**: Some components (e.g., `Dashboard.tsx`, `VoiceHealthCoach.tsx`) could be split further
2. **Mock Data**: Several components use hardcoded sample data for demo purposes
3. **Error Handling**: Inconsistent error handling across components
4. **Type Safety**: Some `any` types could be made more specific

### Feature Gaps
1. **Offline Support**: No PWA features or offline data sync
2. **Export/Import**: Limited data export capabilities
3. **Social Features**: No sharing or social comparison features
4. **Advanced Analytics**: Limited deep-dive analysis tools

### Performance
1. **Bundle Size**: Could benefit from more aggressive code splitting
2. **Image Optimization**: Images could use modern formats (WebP, AVIF)
3. **Caching Strategy**: Room for improved cache invalidation

### UX/UI
1. **Loading States**: Inconsistent loading/skeleton patterns
2. **Empty States**: Not all features have polished empty states
3. **Mobile Optimization**: Some complex dashboards need mobile refinement
4. **Accessibility**: ARIA labels and keyboard navigation could be enhanced

## Environment Variables
```
VITE_SUPABASE_URL=https://heoteyiobtlykkwjwrrv.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=[anon key]
VITE_SUPABASE_PROJECT_ID=heoteyiobtlykkwjwrrv
```

## Deployment
- **Preview**: Lovable staging environment
- **Production**: Can be deployed to Vercel, Netlify, or any static host
- **Backend**: Supabase managed infrastructure

## Getting Started for Developers
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up `.env` with Supabase credentials
4. Run dev server: `npm run dev`
5. Deploy edge functions: `npx supabase functions deploy`

## Key Files to Review
- `src/App.tsx` - Main app structure and routing
- `src/pages/BioPrecision.tsx` - Main dashboard page
- `src/components/HealthCoachChat.tsx` - AI chat implementation
- `src/hooks/useHealthData.tsx` - Core data fetching logic
- `src/index.css` - Design system tokens
- `tailwind.config.ts` - Tailwind customization

## Questions to Consider for Improvement
1. How can we reduce component complexity and improve maintainability?
2. What's the best approach for offline-first data sync?
3. How can we improve the AI coaching accuracy and personalization?
4. What analytics would provide the most value to users?
5. How can we make the platform more accessible and inclusive?
6. What's the optimal data architecture for scaling to millions of users?
7. How can we improve the mobile experience without sacrificing features?
8. What security enhancements should be prioritized?