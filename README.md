# Lactosense website

Single-page marketing website for [Lactosense](https://www.linkedin.com/company/lactosense), a Cambridge biotechnology company developing rapid at-home diagnostics to improve postnatal care outcomes, starting with mastitis.

**Live site:** https://david14higgins.github.io/Lactosense/

Built with React, TypeScript and Vite.

## Getting started

```bash
npm install
npm run dev       # start the dev server with hot reload
npm run build     # type-check and build to dist/
npm run preview   # preview the production build
npm run lint      # run Oxlint
```

## Structure

The whole site is one page. The menu links smooth-scroll to each section, and the active menu item follows the scroll position.

| Section | id | Notes |
| --- | --- | --- |
| Home (hero) | `#home` | General postnatal-care framing; mastitis is the first product |
| About | `#about` | Our story and mission |
| Our Team | `#team` | Founders, advisors and supporters |
| Waitlist | `#waitlist` | Newsletter and product waitlist band |
| News | `#news` | Awards, outreach and events |
| The Product | `#product` | Mastitis, statistics, the science, how the test works, the Lactosense aim |
| Support | `#support` | NHS, NCT and Breastfeeding Network links, plus breastfeeding facts |
| Contact | `#contact` | Enquiry form, email, address and social links |

The newsletter and product waitlist signup appears in three places: the hero button, the band after the team section, and a card after the support section.

```
src/
  App.tsx      all sections and components
  App.css      site styles
  index.css    design tokens (colours, fonts) and base styles
  assets/      logo
public/        favicon
```

## Design

- **Palette** (from the brand swatch): dark green `#22402a`, cream `#f5f5dc`, brown `#6d5851`, plus a sage `#7a8b6f` taken from the logo. Colours are defined as CSS variables in `src/index.css`.
- **Type:** Fraunces (headings) and Inter (body), loaded from Google Fonts in `index.html`.
- **Tone:** warm and welcoming, with a professional, science-led feel.

## Content guidelines

These come from the website vision document and apply to any new copy or imagery:

- No images of milk bottles, including stickers or emojis.
- No images of formula or formula promotion, and never describe formula as "bad".
- No links to Nestlé-funded products.
- Use positive language about UK breastfeeding rates, for example "meet" rather than "achieve" ("only 1% of mothers meet this").

## To do before launch

- **Forms:** neither form has a backend yet.
  - The waitlist form (`WaitlistForm` in `src/App.tsx`) shows a thank-you message but does not store the email. Connect it to a newsletter provider.
  - The contact form opens the visitor's mail app addressed to `contact@lactosense.org`. Replace this with a proper submission service if wanted.
- **Instagram:** set the real handle in the `INSTAGRAM` constant in `src/App.tsx`.
- **Advisors:** confirm roles and titles for Nick Passey, Ameen Mirjan and Shirley Choo.
- **Founders:** add photos in place of the initials avatars.
- **News:** replace the placeholder outreach and newsletter cards with real content.
- **How it works:** the four steps in the product section are indicative; update them as the test design is finalised.
- **Domain:** point the chosen domain (the vision document lists several, including `lactosense.org`) at the deployed site.
