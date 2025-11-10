# Tech Stack Overview
**Date:** November 10, 2025

## Executive Summary

This is a modern, statically-exported Next.js 15 application built with React 19, leveraging cutting-edge web technologies for optimal performance and developer experience. The project emphasizes accessibility, type safety, and a component-driven architecture, deployed to Cloudflare Pages for global edge distribution.

---

## Core Framework & Runtime

### Next.js 15.2.1-canary.1
- **App Router** architecture for modern React patterns
- **Static export mode** (`output: "export"`) for JAMstack deployment
- **Turbopack** enabled for faster development builds
- Image optimization configured for external domains (imgur.com, unsplash.com)

### React 19.0.0
- Latest React version with concurrent features
- React Server Components (RSC) support
- Enhanced performance and developer experience

---

## UI & Component Architecture

### shadcn/ui + Radix UI
- **shadcn/ui** component library (New York style variant)
- Built on **Radix UI primitives** for accessibility-first components:
  - Avatar, Checkbox, Dialog, Label, Navigation Menu
  - Select, Slot, Switch, Tabs
- Headless, unstyled primitives with full keyboard navigation and ARIA support

---

## Styling & Design System

### Tailwind CSS 4
- Utility-first CSS framework with PostCSS integration
- Custom design tokens using CSS variables
- **Dark mode support** (class-based theming via `next-themes`)
- Custom animations and keyframes

### Utility Libraries
- **Class Variance Authority** (CVA) for component variant management
- **clsx** for conditional class names
- **tailwind-merge** for intelligent class merging
- **tailwindcss-animate** for animation utilities

### Typography
- **Geist Sans** - Primary font family
- **Geist Mono** - Monospace font for code

---

## Animation & Interactivity

### Framer Motion 12.4.10
- Production-ready animation library
- Declarative animations for React components
- Gesture support and layout animations

### Icons
- **Lucide React** (v0.476.0) - Modern, consistent icon library with 1000+ icons

---

## Development Tools

### TypeScript 5.8.2
- **Strict mode enabled** for maximum type safety
- Target: ES2017
- Module resolution: bundler
- Path aliases: `@/*` maps to project root
- Full Next.js integration

### Code Quality
- **ESLint 9** with Next.js configuration
- Core Web Vitals preset for performance monitoring
- TypeScript-aware linting rules

---

## Build & Deployment

### Build Tools
- Next.js built-in bundler with **Turbopack** support
- **PostCSS** for CSS processing
- Static asset optimization

### Deployment Platform
- **Cloudflare Pages/Workers** via Wrangler
- SPA routing support for client-side navigation
- Edge-optimized delivery
- Exports to `/out` directory for static hosting

---

## Data Management

### Static Data
- Local TypeScript data file (`lib/projectData.ts`)
- No external database dependency
- Type-safe data structures

### Environment Configuration
- Environment variables for configuration
- Discord integration support

---

## Package Management

- **npm** and **pnpm** supported (lock files for both present)
- Comprehensive dependency management

---

## Key Technical Decisions

1. **Static Generation**: Optimized for performance with pre-rendered pages
2. **Accessibility First**: Radix UI ensures WCAG compliance out of the box
3. **Type Safety**: Full TypeScript coverage with strict mode
4. **Edge Deployment**: Cloudflare Pages for global, low-latency delivery
5. **Component Composition**: Shadcn/ui provides flexible, customizable components
6. **Modern React**: Leverages React 19 features for optimal performance
7. **Utility-First Styling**: Tailwind CSS 4 for rapid UI development
8. **Dark Mode Native**: Built-in theme switching with persistent preferences

---

## Future Considerations

- **Testing Framework**: No testing framework currently configured (consider Vitest + React Testing Library)
- **Database Integration**: Currently static data only
- **API Routes**: Not currently utilized (static export mode)
- **Analytics**: No analytics solution detected

---

## Project Structure

```
/app          - Next.js App Router pages and layouts
/components   - Reusable React components (UI + custom)
/lib          - Utility functions and data
/public       - Static assets
/docs         - Project documentation
```

---

## Development Commands

Based on package.json:
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production (static export)
- `npm run start` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to Cloudflare Pages

---

**Tech Stack Version:** Modern JAMstack
**Architecture:** Static Site Generation (SSG) with Client-Side Interactivity
**Deployment:** Edge (Cloudflare Pages)
