# HackFW MADE Challenge Website

Landing page for the October 2026 HackFW MADE Challenge: Rebuilding System Density.

The event runs October 1-31, 2026 with an in-person Fort Worth kickoff, a
month-long virtual industrial-systems incubation, and an in-person closing
Enterprise Demo Day.

## Files

- `index.html` - Landing-page structure, content, and legacy site styles
- `src/main.tsx` - React entry point for the interactive hero island
- `src/components/ui/` - shadcn-compatible Card, Spotlight, and Spline primitives
- `src/components/hero-spline.tsx` - HackFW-specific Spline composition and fallback
- `src/styles.css` - Tailwind utilities and Spline presentation styles
- `components.json` - shadcn aliases and TypeScript component configuration
- `public/` - FWTX, confirmed partner, crawler, and sitemap assets
- `netlify.toml` - Netlify config

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
```

The Spline scene is lazy-loaded from Spline's hosted runtime. Visitors who
request reduced motion, enable data saving, or cannot load the remote scene see
the local industrial-system fallback instead.

## Deploy

1. Deploy the repository to Netlify. Netlify runs `npm run build` and publishes
   `dist/`.
2. Verify `https://hack.fwtx.city`, the Devpost registration CTA, structured
   event data, social metadata, and public partner claims.

Devpost is managed separately at `https://fwtx.devpost.com`; changes to this
repository do not update Devpost dates, rules, prizes, or sponsors.

## Customize

Edit CSS variables in HTML:
```css
:root {
    --primary: #1a1a2e;
    --secondary: #16213e;
    --accent: #0f4c75;
    --highlight: #3282b8;
}
```

Built for Fort Worth DAO
