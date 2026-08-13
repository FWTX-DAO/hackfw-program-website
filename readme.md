# HackFW MADE Challenge Website

Landing page for the October 2026 HackFW MADE Challenge: Rebuilding System Density.

The event runs October 1-30, 2026 with an in-person Fort Worth kickoff, a
month-long virtual industrial-systems incubation, and an in-person closing
Enterprise Demo Day.

## Files

- `src/routes/__root.tsx` - TanStack Start document shell, metadata, and schema
- `src/routes/index.tsx` - File-based landing route and progressive motion
- `src/landing.html` - Campaign content rendered into the server route
- `src/landing.css` - Campaign layout and visual system
- `src/router.tsx` - TanStack Router configuration
- `src/components/ui/` - shadcn-compatible Card, Spotlight, and Spline primitives
- `src/components/hero-spline.tsx` - HackFW-specific Spline composition and fallback
- `src/app.css` - Tailwind utilities and Spline presentation styles
- `components.json` - shadcn aliases and TypeScript component configuration
- `public/` - FWTX, confirmed partner, crawler, and sitemap assets
- `netlify.toml` - TanStack Start Netlify build and publish config

The `@` alias resolves to `src`, so shadcn's conventional
`@/components/ui/*` imports live at `src/components/ui/*`. Keeping shared UI
primitives there lets the shadcn CLI, TypeScript, and local imports resolve the
same canonical component path.

## Local development

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
npm run typecheck
```

TanStack Start renders the campaign content on the server, then hydrates the
interactive Spline hero in the browser. The scene is lazy-loaded from Spline's
hosted runtime. Visitors who request reduced motion, enable data saving, or
cannot load the remote scene see the local industrial-system fallback instead.

## Deploy

1. Deploy the repository to Netlify. The official Netlify TanStack Start Vite
   plugin emits the SSR function, and Netlify publishes `dist/client`.
2. Verify `https://hack.fwtx.city`, the Devpost registration CTA, structured
   event data, social metadata, and public partner claims.

Devpost is managed separately at `https://fwtx.devpost.com`; changes to this
repository do not update Devpost dates, rules, prizes, or sponsors.

Built for Fort Worth DAO
