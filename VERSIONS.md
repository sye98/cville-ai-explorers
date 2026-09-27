# Hosted versions

Both versions remain available independently.

| Version | Website | Source |
| --- | --- | --- |
| V1 — Woven by Curiosity | https://cville-ai-woven.sifanye-ghost.chatgpt.site | This repository's root and dist directory |
| V2 — Focus | https://cville-ai-focus.sifanye-ghost.chatgpt.site | [Download complete V2 source](cville-ai-v2-source.zip) |

V2 reduces the page to a visual introduction, the next event with RSVP, and past-event flashcards. Its next event is read automatically from Meetup's public calendar, with a five-minute cache, update timestamp, and explicit unavailable/stale states. Past cards are curated. V1 is unchanged.

The V2 archive contains readable frontend and Worker source, local preview and build scripts, provenance notes, and tests. Extract it into its own folder, then run `node serve.mjs`. Run `node --test tests/*.test.mjs` and `node scripts/build.mjs` to verify and build. No packages or credentials are required. The hosting manifest identifies this existing V2 Site; use a new Site identity if deploying your own copy.
