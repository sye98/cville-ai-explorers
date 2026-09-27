# Cville AI Explorers — Woven by Curiosity

An independent, pre-event website redesign concept for the September 29, 2026 **AI Design Bake-Off** at Studio IX, Charlottesville. It is not the official Cville AI Explorers website.

**Live concept:** https://cville-ai-woven.sifanye-ghost.chatgpt.site

**Original community:** https://www.cvaiex.org/

## The idea

The Ix neighborhood's textile history inspired an original filament sculpture and three interactive threads: **Build / Learn / Share**. The design puts practical participation alongside a distinctive local visual identity.

## Run locally

Requires Node.js. No package installation or build step.

```sh
node serve.mjs
```

Open http://127.0.0.1:4173 . Deploy the `dist` directory to any static host. All asset paths are relative, so the website also supports GitHub Pages project URLs.

## Included

- Responsive English community homepage and a companion design/process page.
- Original AI-generated artwork, compressed to WebP.
- Keyboard-accessible Build/Learn/Share tabs with a connecting-thread diagram.
- Verified event details, schedule, official RSVP links, and an ICS calendar download.
- Three source-linked past events, venue details, newcomer FAQs, and community links.
- QR sharing dialog and clipboard fallback.
- Reduced-motion support, progressive enhancement, and no application dependencies.
- Automatic archive labels after the featured event ends (September 30, 2026, 00:00 UTC).

## Content and provenance

Public facts were checked on **September 27, 2026**. There is no live Meetup sync. Future events require an editorial update. Read [SOURCES.md](SOURCES.md), or the site's `design-notes.html`, for references and the design story. Original descriptive copy was written for this concept. No existing community website code was copied.

The original abstract artwork was created with OpenAI image generation. It is not a photograph of Studio IX or a reproduction of local art. Google Fonts serves DM Sans and Space Grotesk; system fonts are the fallback. No analytics, accounts, visitor database, or AI API calls are included.

## Structure

```
dist/                  Deployable static website
  index.html           Community homepage
  styles.css           Responsive visual system
  app.js               Interaction and date-state behavior
  design-notes.html    Sources, design process, 60-second tour
  notes.css            Design notes layout
  cville-bake-off.ics   Calendar event
  assets/              WebP hero and QR code
serve.mjs              Dependency-free local preview server
SOURCES.md             Public source trail
DEMO.md                Phone-friendly demo and English speaking notes
```

## Maintenance

Update event text and URLs in `dist/index.html`, timing in `dist/app.js`, and `dist/cville-bake-off.ics` together. If the canonical share URL changes, update it in the sharing dialog, script, README, and regenerate `dist/assets/site-qr.svg`.

Community names and factual references remain associated with their respective owners. This repository is an independent design contribution, not an official endorsement.
