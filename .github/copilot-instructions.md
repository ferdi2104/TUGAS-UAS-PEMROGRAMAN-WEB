<!-- Use this file to provide workspace-specific custom instructions to Copilot. -->

## NEON-ACTION CINEMA - Custom Development Instructions

### Project Overview
NEON-ACTION CINEMA is a streaming platform with a neon cyberpunk theme built with Next.js 14.

**Tech Stack**: Next.js 14 + TypeScript + TailwindCSS + Supabase

### Development Conventions

- Use `'use client'` for interactive pages
- TailwindCSS with custom neon color palette (primary: #ff2d78, secondary: #00ffcc, tertiary: #ffe04a)
- API routes in `app/api/` with Supabase backend
- Fallback data when Supabase is unavailable
- All text in Bahasa Indonesia or English (brand names in English)

### Component Patterns
- Pages in `app/` directory with App Router
- Reusable components in `components/`
- Styles in `styles/globals.css` with neon utilities
