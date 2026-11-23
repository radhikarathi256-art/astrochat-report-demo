# AstroChat Reports demo: deploy package

A static clickable prototype. There's no build step. Deploy the folder as it is.

This **replaces the original `astrochat-report-demo` zip** (the October "Sell report from Today" demo). The Day 1, Day 2, Day 3 and later flows are kept, but every screen is now exported from the current Figma file. None of the old code or assets are reused. Only the app icons carry over.

- **Figma:** Hackfest 2026, page "📚 Reports · day-wise flow (19 Nov)". Figma is the source of truth.
- Don't redraw, restyle or rewrite any screen here. To change a screen, change it in Figma and export it again.

## Files

```
index.html            prototype shell (flow list, phone, steps panel)
app.js / app.css      prototype logic and layout
flows.js              every flow: screens, tap areas, auto steps (generated)
screens/              137 screens exported from Figma, 720px wide webp (2x)
reports.html          live report reader (four reports, sample + bought)
img/                  images used by reports.html
icons/, manifest.webmanifest   app icons, add-to-home-screen
vercel.json           cache headers
```

The only external request is the Inter font from Google Fonts.

## Deploy on Vercel

```bash
cd astrochat-report-demo
npx vercel --prod
```

Settings:
- **Framework preset:** Other
- **Build command:** none
- **Output directory:** `.`
- **Install command:** none

To update the existing Vercel project from the original zip, replace that project's files with this folder, then redeploy. Delete the old files first: `assets/`, `img/`, `data.js`, `styles.css`, `mobile.js`, `mobile.css`, `tools/` and `*-variations.html` are no longer used.

## How it works

- **Desktop:**
  - Flow list on the left.
  - Phone in the middle.
  - Steps panel on the right: next steps, Back, Restart, and thumbnails of every screen in the flow.
- **Phones:** the screen fills the display. Open flows and steps from the small tab on the right edge.
- **Tap areas** come from the Figma connectors. Tapping anywhere else briefly flashes them. "Show tap areas" keeps them on.
- **Auto steps** (the "Auto · …" connectors) advance by themselves after about 1.2–3 seconds. An orange bar on top shows the timer.
- **Long screens** (report pages, detail pages) scroll inside the phone, and their bottom bar stays pinned.
- **Report screens** (sample and bought) open the live reader, `reports.html`. Tap the screen, or use "Open the full report". Buy Now in the reader goes to that report's pay sheet. The back arrow returns to the flow.
- **Keyboard:** → follows the first next step, ← and Esc go back.
- **Deep links:** `#<flow>` or `#<flow>/<figma node id>`, for example `#day1/4080:3421`. Node ids match the Figma frames.
- **The reader on its own:** open `reports.html#marriage-sample`, `#kundli-bought`, `#career-bought` or `#relationships-sample`. Add `-desktop` for the desktop layout.

## Flows

**Selling a report**

| Flow | Link | Screens |
|---|---|---|
| Day 1 · 10 min after the chat | `#day1` | 14 |
| Day 2 · No purchase yet | `#day2` | 3 |
| Day 3 · Tile, toast, push and chat | `#day3` | 4 |
| Day 4 · Pitch only in Personalised Guidance | `#day4` | 1 |
| Kundli Milan · on the side | `#kundli` | 10 |
| Monthly Wealth · on the side | `#wealth` | 5 |
| Monthly Relationship · on the side | `#relationship` | 5 |
| Report pitch on Explore & Experts | `#explore` | 2 |

**Buying**

| Flow | Link | Screens |
|---|---|---|
| P1 · Payment successful | `#p1` | 12 |
| P2 · Payment processing | `#p2` | 4 |
| P3 · Payment failed | `#p3` | 4 |
| P4 · Different wallet balance | `#p4` | 4 |
| P5 · No UPI app → QR code | `#p5` | 5 |

**After buying**

| Flow | Link | Screens |
|---|---|---|
| P6 · Report on the header after back | `#p6` | 3 |
| P7 · Day 2 after purchase | `#p7` | 5 |
| P8 · Taking longer and failed | `#p8` | 5 |
| P9 · Monthly edition · new month | `#p9` | 4 |
| Kundli Milan · already generated | `#kb` | 6 |

**Pages**

| Flow | Link | Screens |
|---|---|---|
| Detail page · every state | `#detail` | 23 |
| Report page · states | `#reportpages` | 9 |
| My Reports · page states | `#myreports` | 5 |
| Rating and sharing a report | `#endofreport` | 4 |

## How this differs from the original zip

- **Every screen is new.** It's exported from the current Figma, with the final copy and art for all four reports: Marriage Prediction Report, Kundli Milan Report, Monthly Wealth Report and Monthly Relationship Report.
- **Removed:** the old "Your Future Partner" / Riya sample report, the old Marriage Yog report and the offer and rail variation pages.
- **Report names are the same everywhere,** with no "Your" before a name and no "chapters" wording.
- **New flows:**
  - Day 4.
  - The three other reports.
  - Explore & Experts pitch.
  - Every payment outcome (P1–P5) and after-purchase state (P6–P9).
  - Detail, report, My Reports and rating/sharing page states.
- **The report reader is the real page,** not screenshots. It includes the typing "Ask Hemali" bar and the Free chat variant.
- **The chat report card and History report card are included** as designed. They're marked "Not in Phase 1" in Figma.

## Updating screens later

`screens/<node id with _ instead of :>.webp` holds each screen as a 2x export of the Figma frame. For a copy or visual change, re-export that frame at 2x as webp (720px wide) and overwrite the file. To change tap areas or steps, edit `flows.js`. Each edge is `f` from, `t` to, `l` label, `r` tap area `[x, y, w, h]` in 360-wide Figma units, and `kind` tap / auto / step.
