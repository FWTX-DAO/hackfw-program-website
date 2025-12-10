# HackFW Landing Page & Brief

This package contains everything you need for the HackFW hackathon event:

## Files Included

1. **hackfw-landing.html** - Static landing page for hack.fwtx.city
2. **HackFW-OnePager-Brief.docx** - Printable 1-pager brief

## Landing Page Features

### Brand Alignment
- Matches fwtx.city brand with Web3/civic tech aesthetic
- Color scheme: Dark blues (#0F4C75, #3282B8) matching Fort Worth DAO
- Clean, modern design with gradient accents
- Fully responsive for mobile, tablet, and desktop

### Fingerprinting Tracking Included
The landing page includes comprehensive browser fingerprinting for analytics:

**Tracked Data Points:**
- User agent & platform
- Screen resolution & color depth
- Browser capabilities (storage, cookies)
- Canvas & WebGL fingerprinting
- Timezone information
- Unique session ID generation

**Event Tracking:**
All CTA buttons track user interactions:
- Challenge submission clicks
- Sponsorship inquiry clicks
- DAO portal visits
- Bounty board views

**Implementation:**
Currently logs to console. To activate full tracking, uncomment the fetch calls in the tracking functions and point to your analytics endpoint:
```javascript
fetch('https://analytics.fwtx.city/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

### Key Sections
- Hero with event details and CTAs
- Mission statement & flywheel concept
- Focus areas (4 cards)
- Key differentiators (6 features)
- Innovation Bounty Board call-to-action
- Get involved section with multiple CTAs

### Links Included
- Submit challenges: https://innovate.fwtx.city
- View bounties: https://dao.fwtx.city/bounties
- Fort Worth DAO: https://dao.fwtx.city
- Main site: https://fwtx.city
- Sponsorship: mailto:sponsors@fwtx.city

## Printable 1-Pager Brief

Professional DOCX document ready for printing, includes:

**Content:**
- Event header with title and tagline
- Quick reference table (dates, location, attendance)
- Mission & intent
- Focus areas (bulleted list)
- Key differentiators
- Innovation Bounty Board details
- Challenge areas
- Fort Worth DAO leadership
- Get involved resources (links table)

**Format:**
- Standard letter size (8.5" x 11")
- 0.5" margins for maximum content
- Arial font throughout
- Brand colors (#0F4C75, #3282B8)
- Professional layout optimized for printing
- Single page design

## Deployment Instructions

### Landing Page (hack.fwtx.city)

1. Upload `hackfw-landing.html` to your web server
2. Configure as index page or rename to `index.html`
3. Set up analytics endpoint for tracking (optional)
4. Test all links work correctly
5. Verify responsive design on multiple devices

### Printable Brief

1. Open `HackFW-OnePager-Brief.docx` in Microsoft Word
2. Print directly or convert to PDF
3. Distribute to sponsors, partners, and stakeholders
4. Use for physical marketing materials

## Customization

### Landing Page
To customize colors, edit CSS variables at the top of the `<style>` section:
```css
:root {
    --primary: #1a1a2e;
    --secondary: #16213e;
    --accent: #0f4c75;
    --highlight: #3282b8;
}
```

### Brief Document
To modify the brief, edit `generate-brief.js` and run:
```bash
node generate-brief.js
```

## Support

For questions or assistance:
- Email: hello@fwtx.city
- Website: https://fwtx.city
- DAO Portal: https://dao.fwtx.city

---

**Built for Fort Worth DAO** • Building the future, together.
