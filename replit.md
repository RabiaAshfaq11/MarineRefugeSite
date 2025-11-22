# Marine Refuge - Climate-Resilient Amphibious Housing

## Overview

Marine Refuge is a landing page and informational website showcasing innovative amphibious housing solutions designed to protect coastal communities from flooding and sea-level rise. The application presents the organization's mission, technical approach, and achievements through a modern, environmentally-themed web interface.

The site features multiple pages including a home page with smooth scrolling sections, detailed information about amphibious housing technology, and dedicated award showcase pages. The design emphasizes clean aesthetics, environmental messaging, and accessibility.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and development server.

**Routing**: Client-side routing implemented with Wouter, a minimalist routing solution. The application uses hash-based or history-based routing without requiring server-side configuration.

**UI Component System**: Built on shadcn/ui (New York style variant), which provides pre-built, customizable React components built on Radix UI primitives. Components are located in `client/src/components/ui/` and use Tailwind CSS for styling.

**Styling Approach**: 
- Tailwind CSS with custom configuration for the Marine Refuge brand
- Design tokens defined in CSS variables (HSL color space)
- DM Sans font family loaded from Google Fonts CDN
- Custom color scheme: Primary (#1D3D3E - dark teal), Accent (#A6FF79 - bright green), Background (#FFFFFF)
- Zero border radius by default for a modern, sharp aesthetic
- Responsive breakpoints following Tailwind conventions

**State Management**: TanStack Query (React Query) for server state management and data fetching, with a custom query client configured in `client/src/lib/queryClient.ts`.

**Design Philosophy**: Reference-based design inspired by environmental templates (specifically "Sunergy"), featuring:
- Smooth scrolling between sections
- Generous whitespace
- Impact-driven layout with large hero images
- Full viewport height sections
- Sticky navigation with backdrop blur effects

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**Development vs Production**:
- Development mode uses Vite middleware for hot module replacement and live reloading
- Production mode serves pre-built static assets from the `dist/public` directory
- Dual entry points: `server/index-dev.ts` and `server/index-prod.ts`

**Storage Layer**: Currently uses an in-memory storage implementation (`MemStorage` class in `server/storage.ts`) that maintains data in Map structures. The interface is designed to be swapped with a database-backed implementation without changing route handlers.

**API Design**: RESTful API endpoints prefixed with `/api`, though the current implementation has minimal backend logic as the site is primarily informational/static content.

**Build Process**: 
- Client built with Vite (outputs to `dist/public`)
- Server bundled with esbuild for production (outputs to `dist/index.js`)
- TypeScript compilation checking without emitting files

### Data Storage Solutions

**Current Implementation**: In-memory storage using JavaScript Map objects for users. This is suitable for development and demonstration but not production-ready for data persistence.

**Database Schema**: Defined using Drizzle ORM with PostgreSQL dialect. The schema includes:
- Users table with UUID primary keys, username, and password fields
- Schema validation using Zod for type safety

**ORM Choice**: Drizzle ORM chosen for its:
- TypeScript-first approach with excellent type inference
- SQL-like query syntax
- Lightweight runtime overhead
- Integration with Zod for schema validation

**Migration Strategy**: Drizzle Kit configured for schema migrations with files output to `./migrations` directory.

### Authentication and Authorization

**Current State**: Basic user schema defined but no authentication implementation visible in the codebase. The storage interface includes user CRUD operations (get by ID, get by username, create user) suggesting future authentication plans.

**Placeholder Implementation**: The user schema includes password field but no hashing, session management, or authentication middleware is currently implemented.

### External Dependencies

**UI Component Libraries**:
- Radix UI primitives (20+ component packages) for accessible, unstyled base components
- Tailwind CSS for utility-first styling
- class-variance-authority (CVA) for component variant management
- clsx and tailwind-merge for conditional class composition

**State Management & Data Fetching**:
- TanStack Query v5 for server state management
- React Hook Form with Zod resolvers for form validation

**Database & ORM**:
- Drizzle ORM for database operations
- Neon Database serverless driver (@neondatabase/serverless)
- PostgreSQL as the target database system
- connect-pg-simple for PostgreSQL session storage (indicates future session management)

**Development Tools**:
- Vite with React plugin for development and building
- Replit-specific plugins (runtime error modal, cartographer, dev banner)
- esbuild for server bundling
- tsx for TypeScript execution in development

**Routing**: Wouter for lightweight client-side routing

**Utilities**:
- date-fns for date manipulation
- nanoid for generating unique identifiers
- Lucide React for icon components

**Design Assets**: Google Fonts (DM Sans family), custom generated images stored in `attached_assets/generated_images/`, and branding configuration JSON defining the color scheme and typography system.