# HackFW October 2026 Website

Landing page for HackFW October 2026: Rebuilding System Density.

The event runs October 1-31, 2026 with an in-person Fort Worth kickoff, a
month-long virtual industrial-systems incubation, and an in-person closing
Enterprise Demo Day.

## Files

- `index.html` - Landing page
- `public/` - FWTX and confirmed partner assets
- `netlify.toml` - Netlify config

## Deploy

1. Deploy the repository to Netlify.
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
