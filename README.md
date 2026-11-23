# AstroChat Reports demo: deploy package

This is a working, mobile-first prototype of selling a paid report on Day 1, Day 2 and Day 3. It replaces the original `astrochat-report-demo` zip. The structure is the same: days, a "report pitched" switch and the demo controls under the hamburger. Every screen is rebuilt from the current Figma.

- **Figma:** Hackfest 2026, page "📚 Reports · day-wise flow".
- **Source of truth:** Figma. Don't restyle anything or rewrite copy here. Change it in Figma first.
- **How it's built:** plain HTML, CSS and JS with no framework and no build step. Every screen is real HTML: text, buttons, sheets, scrolling rails, form fields and animations. Images are only used for artwork and icons exported from Figma.

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

To update the existing project from the original zip, delete that project's files first, then copy this folder in. The old files are not used: `assets/`, `img/`, `data.js`, `styles.css`, `mobile.js`, `mobile.css`, `tools/` and `*-variations.html`.

## Files

```
index.html             app shell (phone + demo controls)
app.css                all styles
app.js                 all screens, data and the day scripts
reports.html           the four live report pages (sample + bought), opened inside the app
a/                     art and icons exported from Figma (2x/3x)
img/                   images used by reports.html
icons/, manifest.webmanifest   app icon and add-to-home-screen
vercel.json            cache headers
```

The only external request is Google Fonts (Inter, Cormorant Infant).

## Using it

**Choosing a day and report**
- On a phone, tap the **hamburger** (top left of Today). It opens Day 1, Day 2, Day 3, the "Report pitched" choice (Marriage Prediction, Kundli Milan, Monthly Wealth, Monthly Relationship) and Restart.
- On a laptop, the same controls sit beside the phone.
- You can also deep link, for example `/#1/m`, `/#2/k`, `/#3/w` or `/#1/r`.

**Day 1**
1. The "Answer & Earn" sheet opens. Use Answer now or Maybe Later.
2. A few seconds later Hemali replies: the chat icon gets a badge and a toast appears ("Hemali made your … · ₹49").
3. Then the push slides down. Tap it to open the report page.
4. The chat (top right icon) has the pitch message and the report card.

**Day 2:** no push and no pitch in chat. The report is pitched only in the Personalised Guidance tile.

**Day 3**
- The 10 am push arrives.
- Answering the check-in adds the reward to the wallet and shows the toast.
- The chat shows the report card again.

**Report page**
- See Sample / View Sample Report opens the real report page.
- Buy Now there, or on the report page, opens the pay sheet.
- In the pay sheet:
  - Edit opens "Almost there".
  - Change opens the language sheet.
  - The bill uses the actual wallet balance (₹49 + ₹9 GST, minus the wallet).

**After paying**
1. Payment Successful, then the 12-step loader, then "report is ready", then the full report.
2. Leave the loader with back, and Today shows the tile as "Writing your report". When it's done you get the ready push, and the tile, chat card, report page and My Reports all switch to Ready.

**Kundli Milan**
- His birth details come first. The button stays disabled until his details are filled in, and the city field suggests places as you type.
- After that the report page shows the 28 of 36 score card.
- "All 8 areas" opens the compatibility sheet, with an English / Sanskrit toggle.

**Other screens**
- **My Reports:** the book icon in the header. It shows the reports you've bought, plus the shelf of others.
- **History tab:** has the report card. It's marked "Not in Phase 1" in Figma and kept here as asked.
- **Experts and Explore tabs, Astro Mala, tarot and Continue Chat:** these show "Not part of this demo".

## Copy not taken from Figma

Figma has these pieces only for Marriage Prediction, or not at all. They were written in the same style and should be checked:
- **Day 1 / Day 3 push** for Kundli Milan, Monthly Wealth and Monthly Relationship. The Marriage push is the Figma copy.
- **"Ready" push second line** for Kundli Milan, Monthly Wealth and Monthly Relationship.
- **Answered check-in card:** "₹N added to your wallet · You answered “…”. Hemali will use it in today’s guidance."
- **History card subtitle** for Kundli Milan, Monthly Wealth and Monthly Relationship.
