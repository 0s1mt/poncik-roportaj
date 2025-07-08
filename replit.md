# Replit.md

## Overview

This is a modern full-stack web application built with React, Node.js, and TypeScript. The application features a client-server architecture with a React frontend and Express backend, utilizing PostgreSQL for data persistence through Drizzle ORM. The project includes comprehensive UI components from shadcn/ui and is configured for deployment on Replit.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Configured for PostgreSQL session storage
- **Development**: Hot reload with tsx for development server

## Key Components

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Located in `/shared/schema.ts` with user management structure
- **Migrations**: Managed through Drizzle Kit with migrations stored in `/migrations`
- **Connection**: Neon serverless PostgreSQL connection

### Storage Interface
- **Abstract Interface**: `IStorage` in `/server/storage.ts` defines CRUD operations
- **In-Memory Implementation**: `MemStorage` class for development/testing
- **User Management**: Basic user schema with username/password fields

### Frontend Components
- **Routing**: Home page and 404 error handling
- **UI Library**: Comprehensive shadcn/ui components including buttons, cards, dialogs, forms, and data display components
- **Theming**: Light/dark mode support with CSS custom properties
- **Query Client**: Configured TanStack Query for API communication

### API Structure
- **Routes**: Centralized in `/server/routes.ts` with `/api` prefix
- **Error Handling**: Global error middleware for consistent error responses
- **Logging**: Request/response logging for API endpoints
- **CORS**: Configured for cross-origin requests

## Data Flow

1. **Client Requests**: Frontend makes HTTP requests to `/api` endpoints
2. **Route Handling**: Express routes process requests using storage interface
3. **Storage Operations**: Storage layer abstracts database operations
4. **Database Queries**: Drizzle ORM handles SQL generation and execution
5. **Response**: JSON responses sent back to client with error handling

## External Dependencies

### Production Dependencies
- **Database**: `@neondatabase/serverless` for PostgreSQL connection
- **ORM**: `drizzle-orm` and `drizzle-zod` for database operations
- **UI Framework**: Extensive Radix UI components for accessibility
- **Styling**: `tailwindcss`, `class-variance-authority`, and `clsx` for styling
- **State Management**: `@tanstack/react-query` for server state
- **Forms**: `react-hook-form` with `@hookform/resolvers` for form handling
- **Animations**: `framer-motion` for UI animations
- **Utilities**: `date-fns` for date manipulation, `zod` for validation

### Development Dependencies
- **Build Tools**: Vite with React plugin
- **TypeScript**: Full TypeScript support with strict configuration
- **Database Tools**: Drizzle Kit for migrations and schema management
- **Replit Integration**: Vite plugins for Replit development environment

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `/dist/public`
2. **Backend Build**: esbuild bundles server code to `/dist/index.js`
3. **Production Start**: Node.js serves bundled application

### Environment Configuration
- **Development**: Uses tsx for hot reloading and Vite dev server
- **Production**: Serves static files and API from single Express server
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

### Replit Specific
- **Development Banner**: Replit banner integration for development mode
- **Error Overlay**: Runtime error modal for better debugging
- **Cartographer**: Replit code navigation tool integration

## Changelog

```
Changelog:
- July 08, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```