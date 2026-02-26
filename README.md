# Knovia - AI-Powered Learning Community Platform

<div align="center">

![Knovia Logo](public/logo.svg)

**An intelligent platform that connects learners in communities through AI-powered matching and meaningful conversations**

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Clerk](https://img.shields.io/badge/Clerk-6.37.5-purple?style=for-the-badge&logo=clerk)](https://clerk.com/)

</div>

## 🌟 Overview

Knovia is a modern learning community platform that leverages artificial intelligence to connect learners with compatible partners based on their learning goals and interests. The platform facilitates meaningful conversations, tracks progress, and provides AI-generated insights to enhance the learning experience.

## 🎯 Key Features

- **🤖 AI-Powered Matching**: Intelligent partner matching based on learning goals using OpenAI GPT-4
- **💬 Real-time Chat**: Secure messaging between matched learning partners
- **🎚️ Tiered Access**: Free and Pro subscription tiers with different feature sets
- **📚 Community Management**: Create and join learning communities
- **🎯 Goal Tracking**: Set and track personal learning goals
- **📊 Conversation Insights**: AI-generated summaries and action items
- **🔐 Secure Authentication**: Enterprise-grade authentication with Clerk

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (Next.js)     │◄──►│   (Next.js)     │◄──►│   (PostgreSQL)  │
│                 │    │   (Hono)        │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   UI Components │    │   AI Services   │    │   Drizzle ORM   │
│   (React)        │    │   (OpenAI)      │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Component Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── (main)/            # Main application routes
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/                # Base UI components (shadcn/ui)
│   ├── chat/              # Chat-related components
│   ├── communities/       # Community management
│   └── header.tsx         # Navigation header
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── ai.ts              # AI integration logic
│   ├── db-helpers.ts      # Database helpers
│   └── user-utils.ts      # User utilities
├── db/                    # Database configuration
│   ├── schema.ts          # Database schema
│   └── seed.ts            # Database seeding
└── server/                # Server-side utilities
```

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 16.1.6 with App Router
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Authentication**: Clerk
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)

### Backend

- **Runtime**: Node.js
- **API**: Next.js API Routes + Hono
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: Clerk
- **AI Integration**: OpenAI GPT-4 via AI SDK

### Database

- **Database**: PostgreSQL 15+
- **ORM**: Drizzle ORM
- **Migrations**: Drizzle Kit
- **Connection**: pg driver

### Development Tools

- **Package Manager**: Bun
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript
- **Database Studio**: Drizzle Studio

## 📊 Database Schema

### Entity Relationship Diagram

```
┌─────────────┐    ┌─────────────────┐    ┌─────────────┐
│    users    │    │ community_members│    │ communities │
├─────────────┤    ├─────────────────┤    ├─────────────┤
│ id (PK)     │◄──►│ userId (FK)     │◄──►│ id (PK)     │
│ clerkId     │    │ communityId (FK)│    │ name        │
│ email       │    │ joinedAt        │    │ description │
│ name        │    └─────────────────┘    │ createdById │
│ imageUrl    │                             │ createdAt   │
│ tier        │                             └─────────────┘
│ createdAt   │
│ updatedAt   │    ┌─────────────────┐
└─────────────┘    │ learning_goals  │
         │         ├─────────────────┤
         │         │ id (PK)         │
         │         │ userId (FK)     │
         │         │ communityId (FK)│
         │         │ title           │
         │         │ description     │
         │         │ tags            │
         │         │ createdAt       │
         │         └─────────────────┘
         │                 │
         ▼                 ▼
┌─────────────┐    ┌─────────────────┐
│   matches   │    │ conversations   │
├─────────────┤    ├─────────────────┤
│ id (PK)     │    │ id (PK)         │
│ user1Id (FK)│◄──►│ matchId (FK)    │
│ user2Id (FK)│    │ lastMessageAt   │
│ communityId │    │ createdAt       │
│ status      │    └─────────────────┘
│ createdAt   │             │
└─────────────┘             │
         │                  ▼
         │         ┌─────────────────┐
         │         │    messages     │
         │         ├─────────────────┤
         │         │ id (PK)         │
         │         │ conversationId  │
         │         │ senderId (FK)   │
         │         │ content         │
         │         │ createdAt       │
         │         └─────────────────┘
         │                  │
         ▼                  ▼
┌─────────────────┐    ┌─────────────────┐
│conversation_sum │    │                 │
│     maries      │    │                 │
├─────────────────┤    │                 │
│ id (PK)         │    │                 │
│ conversationId  │    │                 │
│ summary         │    │                 │
│ actionItems     │    │                 │
│ keyPoints       │    │                 │
│ nextSteps       │    │                 │
│ generatedAt     │    │                 │
└─────────────────┘    │                 │
                       │                 │
                       └─────────────────┘
```

### Table Descriptions

#### Users

- **Purpose**: Store user account information
- **Key Fields**: `clerkId` (auth integration), `subscriptionTier` (free/pro)
- **Relations**: One-to-many with goals, communities, matches, messages

#### Communities

- **Purpose**: Learning communities where users can join and interact
- **Key Fields**: `name`, `description`, `createdById`
- **Relations**: Many-to-many with users via community_members

#### Learning Goals

- **Purpose**: User-defined learning objectives within communities
- **Key Fields**: `title`, `description`, `tags` (JSON array)
- **Relations**: Belongs to user and community

#### Matches

- **Purpose**: AI-generated pairings between users
- **Key Fields**: `user1Id`, `user2Id`, `status` (pending/accepted/declined)
- **Relations**: Connects two users within a community

#### Conversations

- **Purpose**: Chat conversations between matched users
- **Key Fields**: `matchId`, `lastMessageAt`
- **Relations**: One-to-one with matches, one-to-many with messages

#### Messages

- **Purpose**: Individual chat messages
- **Key Fields**: `content`, `senderId`, `conversationId`
- **Relations**: Belongs to conversation and sender

#### Conversation Summaries

- **Purpose**: AI-generated insights from conversations
- **Key Fields**: `summary`, `actionItems`, `keyPoints`, `nextSteps` (JSON arrays)
- **Relations**: Belongs to conversation

## 🤖 AI Integration

### Matching Algorithm

The platform uses OpenAI GPT-4 to analyze user learning goals and generate compatibility scores:

```typescript
// AI Matching Process
1. Collect user goals and potential partner goals
2. Format goals for AI analysis
3. Send to GPT-4 with compatibility prompt
4. Parse AI response for match rankings
5. Create match records in database
```

### Conversation Summaries

AI generates structured insights from conversations:

```json
{
  "summary": "2-3 sentence overview",
  "keyPoints": ["point 1", "point 2"],
  "actionItems": ["action 1", "action 2"],
  "nextSteps": ["step 1", "step 2"]
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL 15+
- OpenAI API key
- Clerk application

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/knovia.git
   cd knovia
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env.local
   # Fill in your environment variables
   ```

4. **Database setup**

   ```bash
   # Generate database schema
   bun run db:generate

   # Push schema to database
   bun run db:push

   # Seed database (optional)
   bun run db:seed
   ```

5. **Start development server**
   ```bash
   bun run dev
   ```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# OpenAI
OPENAI_API_KEY="sk-..."

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
```

## 📱 API Endpoints

### Authentication

- `GET /api/auth/current-user` - Get current user

### Communities

- `GET /api/communities` - List user communities
- `POST /api/communities` - Create community
- `POST /api/communities/join` - Join community

### Learning Goals

- `GET /api/goals?communityId=:id` - Get community goals
- `POST /api/goals` - Create learning goal

### AI Matching

- `POST /api/ai/match` - Generate AI matches
- `POST /api/ai/summary` - Generate conversation summary

## 🧪 Testing

```bash
# Run linting
bun run lint

# Database operations
bun run db:studio  # Open Drizzle Studio
bun run db:seed    # Seed database with test data
```

## 📦 Deployment

### Vercel (Recommended)

1. Connect repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .
RUN bun run build
EXPOSE 3000
CMD ["bun", "start"]
```

## 🔒 Security Features

- **Authentication**: Clerk handles secure user authentication
- **Authorization**: Role-based access control
- **Data Validation**: Zod schemas for API validation
- **SQL Injection Prevention**: Drizzle ORM parameterized queries
- **CORS**: Configured for production domains

## 📈 Performance Optimizations

- **Database Indexing**: Proper indexes on foreign keys and query fields
- **Caching**: React Query for client-side caching
- **Code Splitting**: Next.js automatic code splitting
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Webpack Bundle Analyzer

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Use ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Clerk](https://clerk.com/) - Authentication service
- [OpenAI](https://openai.com/) - AI integration
- [Drizzle](https://orm.drizzle.team/) - Database ORM
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

## 📞 Support

For support and questions:

- 📧 Email: support@knovia.com
- 💬 Discord: [Join our community](https://discord.gg/knovia)
- 📖 Documentation: [docs.knovia.com](https://docs.knovia.com)

---

<div align="center">

**Built with ❤️ by the Knovia Team**

[![GitHub stars](https://img.shields.io/github/stars/your-username/knovia?style=social)](https://github.com/your-username/knovia)
[![GitHub forks](https://img.shields.io/github/forks/your-username/knovia?style=social)](https://github.com/your-username/knovia)

</div>
