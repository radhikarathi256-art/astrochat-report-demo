/* AstroChat · "Sell report from Today" demo.
   One router over absolutely-positioned .screen elements, plus the few bits of
   content that are easier to generate than to hand-write nine times over
   (coin ladder, bottom nav, language list, sample body, full report body). */
(function () {
'use strict';

var $  = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

var LANGS = window.LANGS, SAMPLE = window.SAMPLE;

/* ---------------------------------------------------------------- PM spec track
   The product brief as written: the pitch waits 10 minutes after the free chat
   so it never sits on top of the daily reward or the paid-chat decision; three
   reports are offered and the user picks; there is no free chapter, only a
   preview; day 2 re-offers in the free chat and on Today. Kept as its own track
   so the two models can be clicked side by side. */
/* Three reports: finding someone, marrying them, and work. Each one carries
   - `learn`: the questions it answers, written against HER chart. This is the
     sell, so it is phrased as her questions, not as a contents page.
   - `ask`:  the brief's sixth point — what she leaves the report wanting to
     ask the astrologer.
   - `cover`: its own colourway, so three reports do not look like one product.
   - `sample`: the whole report on the demo chart, for the free preview. */

/* The contents-list icons, keyed by `licons[]`. Board 3353:14197 gives every
   line in "What you will get" its own 24px outline mark instead of nine
   identical ticks — a tick only says "included", which the list already says by
   being the list, so nine of them are nine copies of one word. A drawing of the
   thing says which line you are on, which is what makes a list of eight
   scannable.

   Redrawn on Solar Linear. The hand-drawn set was geometrically honest but
   mixed: a hard-cornered calendar next to a true circle next to a 45-degree
   roof, so eight marks down one column read as eight hands. Solar settles all
   of that with one rule — every enclosure is a squircle, every corner carries
   real radius, every terminal is round — which is why the column now scans as
   one family. No <circle>/<rect> primitives left: the squircle has to be
   written as a path, and keeping every key a path means the stroke behaves the
   same on all of them. One viewBox, one 1.5 weight, no fills, no discs: a set,
   not badges. currentColor so the colour is decided in CSS, once.

   One more rule, measured rather than eyeballed: every mark draws inside the
   same ~18.5-unit box centred on (12,12). The svg boxes were always identical —
   it was the artwork inside them that ranged from rings at 10.8 units tall and
   sitting 3.2 low, to shield at 20.3 — and down one column that reads as eight
   icons at eight sizes, which is the thing a set is supposed to stop. Forms
   that are honestly wide and short (chart, arrow, eye, rings) are not stretched
   to square; they are brought up to roughly 13-16 so they hold the line without
   being distorted into something they are not. Circles (block, coin) sit a
   little under the box on purpose: a disc reads larger than a square of the
   same measure, so matching them by number makes them look bigger. */
/* The rating star, written once. Four places drew one next to a number and all
   four used the unicode glyph, which paints at about 0.7em inside its em box —
   so a star set to the size of the figure beside it still came out smaller than
   the figure, and the four of them disagreed on top of that because each had
   been nudged by hand. Sized in CSS off the text it sits in, and centred in its
   own viewBox so nothing has to be nudged at all. */
var STAR_D = 'M12 3.05 14.9 8.95l6.5.95-4.7 4.6 1.1 6.45L12 17.9 6.2 20.95l1.1-6.45-4.7-4.6 6.5-.95z';
var STAR = '<svg class="star" viewBox="0 0 24 24" aria-hidden="true"><path d="' + STAR_D + '"/></svg>';
/* The unearned half of a review score. Same outline as the filled one so a row
   of five reads as five of one thing — the glyph pair did not, because ☆ is not
   ★ hollowed out, it is a separate drawing with its own width, which is what
   made four-star rows sit a little wider than five-star rows. */
var STAR_OFF = '<svg class="star star-off" viewBox="0 0 24 24" aria-hidden="true"><path d="' + STAR_D + '"/></svg>';

var LI_ICON = {
  user:  '<path d="M12 10.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M20.5 17.5c0 2.5-3.8 4-8.5 4s-8.5-1.5-8.5-4 3.8-4 8.5-4 8.5 1.5 8.5 4Z"/>',
  pin:   '<path d="M12 13.1a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Z"/><path d="M3.9 9c1.9-7.9 14.3-7.9 16.2 0 1.15 4.7-1.8 8.6-4.5 11.1a4.9 4.9 0 0 1-7.2 0C5.7 17.6 2.75 13.7 3.9 9Z"/>',
  cup:   '<path d="M6.3 3.4h11.4v4.9c0 3.6-2.6 6.2-5.7 6.2s-5.7-2.6-5.7-6.2z"/><path d="M17.9 4.7h1.3a2.1 2.1 0 0 1 0 4.2h-1.1M6.1 4.7H4.8a2.1 2.1 0 0 0 0 4.2h1.1"/><path d="M12 14.5v3.3M8.2 20.8h7.6a3.1 3.1 0 0 0-3.1-3h-1.4a3.1 3.1 0 0 0-3.1 3Z"/>',
  cal:   '<path d="M7.8 2.5v2.4M16.2 2.5v2.4"/><path d="M2.8 12.6c0-4.1 0-6.1 1.2-7.4C5.2 4 7.2 4 11.2 4h1.6c4 0 6 0 7.2 1.2 1.2 1.3 1.2 3.3 1.2 7.4v.9c0 4.1 0 6.1-1.2 7.4-1.2 1.2-3.2 1.2-7.2 1.2h-1.6c-4 0-6 0-7.2-1.2-1.2-1.3-1.2-3.3-1.2-7.4z"/><path d="M3.2 9h17.6"/>',
  block: '<path d="M12 21.2a9.2 9.2 0 1 0 0-18.4 9.2 9.2 0 0 0 0 18.4Z"/><path d="M5.5 5.5 18.5 18.5"/>',
  rings: '<path d="M8.6 18.2a6.2 6.2 0 1 0 0-12.4 6.2 6.2 0 0 0 0 12.4Z"/><path d="M15.4 18.2a6.2 6.2 0 1 0 0-12.4 6.2 6.2 0 0 0 0 12.4Z"/>',
  shield:'<path d="M3.7 11.4c0-3.4 0-5.1.4-5.7.4-.5 2-1.1 5.2-2.2l.6-.2c1-.4 1.5-.6 2.1-.6s1.1.2 2.1.6l.6.2c3.2 1.1 4.8 1.7 5.2 2.2.4.6.4 2.3.4 5.7 0 .5 0 1.1 0 1.6-.1 6-5.5 8.4-7 9-.4.2-.9.2-1.3 0-1.6-.6-6.9-3-7-9 0-.5 0-1.1 0-1.6Z"/>',
  sun:   '<path d="M16.8 12a4.8 4.8 0 1 1-9.6 0 4.8 4.8 0 0 1 9.6 0Z"/><path d="M12 2.6v1.3M12 20.1v1.3M4.6 12H3.3M20.7 12h-1.3M18.6 5.4l-.9.9M6.3 17.7l-.9.9M18.6 18.6l-.9-.9M6.3 6.3l-.9-.9"/>',
  spark: '<path d="M9.8 3.4c.4 3.4 1.5 5.9 3.2 7.2.8.65 1.85 1 3.2 1.3-1.35.3-2.4.65-3.2 1.3-1.7 1.3-2.8 3.8-3.2 7.2-.4-3.4-1.5-5.9-3.2-7.2-.8-.65-1.85-1-3.2-1.3 1.35-.3 2.4-.65 3.2-1.3 1.7-1.3 2.8-3.8 3.2-7.2Z"/><path d="M18.4 3.6c.3 1.7.9 2.5 2.6 2.8-1.7.3-2.3 1.1-2.6 2.8-.3-1.7-.9-2.5-2.6-2.8 1.7-.3 2.3-1.1 2.6-2.8Z"/>',
  chart: '<path d="M4.8 20.2v-7.4M12 20.2V3.8M19.2 20.2v-4.4"/><path d="M2.5 20.4h19"/>',
  home:  '<path d="M3.7 11c0-1.4 0-2.1.3-2.6.3-.6.9-1 2-1.7l3.7-2.3c1.1-.7 1.6-1 2.3-1s1.2.3 2.3 1l3.7 2.3c1.1.7 1.7 1.1 2 1.7.3.5.3 1.2.3 2.6v4.2c0 2.8 0 4.3-.9 5.2-.9.9-2.3.9-5.1.9h-4.6c-2.8 0-4.2 0-5.1-.9-.9-.9-.9-2.4-.9-5.2z"/><path d="M14.4 21.9v-4.3a2.4 2.4 0 0 0-4.8 0v4.3"/>',
  coin:  '<path d="M12 21.2a9.2 9.2 0 1 0 0-18.4 9.2 9.2 0 0 0 0 18.4Z"/><path d="M14.6 9.3c-.4-.9-1.4-1.5-2.6-1.5-1.5 0-2.8 1-2.8 2.2s1.2 2.2 2.8 2.2 2.8 1 2.8 2.2-1.2 2.2-2.8 2.2c-1.2 0-2.2-.6-2.6-1.5M12 6.4v1.4M12 16.2v1.4"/>',
  case:  '<path d="M2.6 14.2c0-3.4 0-5.1 1-6.1 1-1.1 2.7-1.1 6.1-1.1h4.6c3.4 0 5.1 0 6.1 1.1 1 1 1 2.7 1 6.1 0 3.4 0 5.1-1 6.1-1 1.1-2.7 1.1-6.1 1.1H9.7c-3.4 0-5.1 0-6.1-1.1-1-1-1-2.7-1-6.1Z"/><path d="M16.2 6.8c0-1.4 0-2.1-.4-2.6-.5-.9-1.5-.9-2.4-.9h-2.8c-.9 0-1.9 0-2.4.9-.4.5-.4 1.2-.4 2.6"/><path d="M2.8 12.9h18.4"/>',
  eye:   '<path d="M3.3 13.4c-.4-.6-.6-1-.6-1.4 0-.4.2-.8.6-1.4C4.9 8.3 8.1 4.6 12 4.6s7.1 3.7 8.7 6c.4.6.6 1 .6 1.4 0 .4-.2.8-.6 1.4-1.6 2.3-4.8 6-8.7 6s-7.1-3.7-8.7-6Z"/><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>',
  arrow: '<path d="M3 18.7 9.2 11.5a1.7 1.7 0 0 1 2.4-.1l2 1.8a1.7 1.7 0 0 0 2.4-.1L21 5.6"/><path d="M21.3 10.4V5.3h-5.1"/>',
  people:'<path d="M9 11.2a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Z"/><path d="M15.8 17.6c0 2.1-3 3.4-6.8 3.4s-6.8-1.3-6.8-3.4 3-3.4 6.8-3.4 6.8 1.3 6.8 3.4Z"/><path d="M16.2 4.6a3.6 3.6 0 0 1 0 6M18.2 13.6c2.1.4 3.6 1.4 3.6 2.7 0 1-.9 1.9-2.3 2.4"/>',
  list:  '<path d="M9 6.6h11.6M9 12h11.6M9 17.4h11.6"/><path d="M4.1 7.4a.8.8 0 1 0 0-1.6.8.8 0 0 0 0 1.6ZM4.1 12.8a.8.8 0 1 0 0-1.6.8.8 0 0 0 0 1.6ZM4.1 18.2a.8.8 0 1 0 0-1.6.8.8 0 0 0 0 1.6Z"/>',
  beads: '<path d="M12 18.4a7.4 7.4 0 1 0 0-14.8 7.4 7.4 0 0 0 0 14.8Z" stroke-dasharray="1.4 4.2"/><path d="M12 22.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z"/>'
};
/* `s` is the one line under every cover — on the upsell card, on the picker,
   on the tile, and as the opening of the sell page's lead. Three books wrote it
   three different ways and three different lengths, so side by side one ran to
   three lines and its neighbour to two, and everything below them — rating,
   price, button — stopped lining up. They are all the same promise, so they are
   all the same shape now: the questions the book answers, two or three of them,
   joined by `and`, around 36 characters, no full stop (1844 adds one). */
var REPORTS = [
  {
    id: 'partner', t: 'Partner Prediction', s: 'Who they are, where you meet and when', pages: 38, rating: '4.7', sold: 13000,
    // Read once. The chart it is drawn from does not move, so there is no
    // second edition to sell and every surface that sold it says Read Report
    // from the moment it is hers.
    cadence: 'once',
    // `t2` is the long name, used where the card has room for two lines and the
    // book is sitting right next to it — it has to match the cover she can see.
    t2: 'Your Future Partner Prediction Report',
    // `tl` is the sell page's own headline, Figma 3186:204216 — it names both
    // halves of what the report answers, which "Your Partner Prediction" does
    // not. Reports without one fall back to "Your " + t.
    tl: 'Your Future Partner & Marriage Prediction Report',
    why: 'Learn how Rahu is blocking you from meeting him',
    cover: { a: '#F0668B', b: '#8B2F55', ink: '#FFE4EC', motif: 'heart' },
    // Partner is the one report whose art is photographed rather than painted:
    // Figma 3311:6840 for the cover and 3254:6840 for the open spread, exported
    // straight out of the board. The spread keeps its own board edges on
    // transparency, re-padded to the proportions the hero's hand-placed contact
    // shadow and gutter were measured against. The query strings are the only
    // thing that gets an installed home-screen app to re-fetch art that kept its
    // filename.
    art: {
      closed: 'assets/cover-partner.jpg?v=4',
      open: 'assets/spread-partner.png?v=4',
      // Two reports now have a filmed hero and they share one element, so each
      // has to name its own file — otherwise coming back from Kundali Milan
      // leaves her couple playing over this one.
      video: 'assets/r2-hero.mp4?v=202610271219',
      rate: 1
    },
    // What is in the box, as chips — the one thing unique to this report first.
    // These were briefly three icon rows reading "read from your birth chart",
    // "private forever", "in your language": true of every report we sell and
    // therefore an argument for none of them. The chips say the same terms in
    // a tenth of the height and do not pretend to be a sales point.
    chips: ['Partner image', 'Birth chart analysis'],
    // Quotes that name something the report called before it happened. A quote
    // that only says "very good" proves nothing and sells nothing.
    revs: [
      { s: 5, n: 'Priya S., Jaipur', q: 'It said my partner would be from a creative field. Six months later I got a rishta from a graphic designer.' },
      { s: 5, n: 'Neha K., Indore',  q: 'The part about meeting through people who already know me is exactly how it happened.' },
      { s: 4, n: 'Ritu M., Nashik',  q: 'The wrong-people pattern was uncomfortable to read because it was true. I stopped rushing the first week.' },
      { s: 5, n: 'Sneha V., Kolkata', q: 'I showed the partner image to my mother before the first meeting. She went quiet when she saw him.' }
    ],
    /* Figma 3111:201622 — eight, and the top three said in the frame's own
       words. The chat card shows three and counts "+5"; History counts all
       eight. Both numbers come from this one list, so they cannot drift. */
    learn: [
      'Image of your future partner',
      'How and where you will meet',
      'What your first meeting looks like',
      'When real love arrives in this life',
      'What is blocking that person from reaching you now',
      'Love or arranged, what the chart says',
      'The kind of wrong people you keep attracting',
      'What to do each day so that person comes closer'
    ],
    // Parallel to `learn`, one key per line. Kept as its own list rather than
    // folded into the strings so the copy stays copy and stays translatable.
    licons: ['user', 'pin', 'cup', 'cal', 'block', 'rings', 'shield', 'sun'],
    /* What Hemali says in the chat just before the card. It has to live on the
       report, not in the day's script: the line names a house and a planet, so
       a script that hard-codes "Saturn, your tenth house" while the card under
       it sells Kundli Milan is an astrologer contradicting herself one line
       later. `pitchLong` is the day-1 version, said fifteen minutes after the
       chat ended, which is why it can afford to mention the sample.

       Three lines, not a paragraph, and always the same three:
         1. the reason she is being spoken to at all - something she said in the
            chat, or something the calendar is doing to her right now;
         2. what she will learn, named as specifics rather than as a subject;
         3. what buying gets her, and why it matters.
       A paragraph makes all three the same weight and hides the only one she is
       scanning for, which is the second. Separating them also makes the ask
       readable in the two seconds the bubble is on screen before the card
       underneath takes over. */
    pitch: [
      'Mansi, you asked me about your partner. Rahu sitting on your seventh house is the whole answer, and your Partner Prediction report is built on it.',
      'Learn what they will be like, how the two of you meet, and the months it can actually happen.',
      'Buy the report and get a full reading of your seventh house, with the remedy that breaks the block.'
    ],
    pitchLong: [
      'Mansi, I have kept looking at your chart since we spoke. Rahu on the seventh house is not a small thing, and there is more in it than two minutes allowed, so I have written your Partner Prediction report around it.',
      'Learn what your partner will be like, when you meet them, the years that are good for it, and what the Rahu block really takes to clear.',
      'Buy the report and get all of it read out house by house, remedies included. A complete sample on another chart is open to read first, so you can see how deep it goes.'
    ],
    /* The colour behind the title in the chat card, taken off this report's own
       hero rather than being one magenta for all three. Sampled from the art:
       the deepest saturated pixel in the partner film is a dusty brick, which
       is the curtain light at the edge of the frame. The ramp then opens to the
       card's white on the right, the same shape for every report - only the hue
       moves, so the card is recognisably the same card and still arrives in the
       colour of the book it is selling. */
    /* Sampled off r2-hero.mp4, not picked by eye: the film averages #E0AEAB
       and bottoms out at #7B3B3A, so the card is built from its own darkest
       value and opens toward its average. Darker than it was, because the
       title is white and the old mid-tone had it sitting on a tint rather
       than on ink. */
    tint: 'linear-gradient(94deg,#5A2B2B 0%,#7B3B3A 40%,#C68E8C 74%,#fff 100%)',
    /* The +15 min notification on day 1. Same three beats as the chat pitch,
       squeezed into one line: why now, what she gets, what it costs. */
    push: 'Mansi, Rahu is in your seventh house. That is the block. Your Partner Prediction is \u20b949 today instead of \u20b9499 \ud83d\udcd6',
    /* The ticket stub on Today, day 2. It used to read "Your partner report is
       ready" off the raw id, which named a folder rather than a book. */
    tkt: { t: 'Your Partner Prediction is ready', s: 'Who they are, and when you meet them' },
    /* The keepsake at the top of a bought report: the one finding worth pinning
       to a wall, on the paper it was drawn on. Partner has a face to show, so
       the art box holds the sketch. The other two have no portrait to draw —
       there is no picture of a marriage score or a quarter of a year — so they
       put their headline figure in the same box instead of leaving it empty or
       inventing a stock image. Two facts underneath either way, because the
       point of the card is that it is small enough to screenshot. */
    hero: {
      img: 'assets/sketch.jpg?v=202610221813',
      alt: 'Sketch of your future partner',
      foot: [['7th lord', 'Venus \u00b7 9th house'], ['You meet', 'Mar \u2013 Nov 2027']],
      // What the same card says before she has paid. The labels change too, not
      // just the values: withheld, the job of the line is to name what is
      // coming, and "7th lord" does not do that for anyone.
      hide: [['Your sketch', 'After you buy'], ['You meet', 'In full report']]
    },
    ask: [
      { q: 'Where will I meet them?',        a: 'Your navamsa points to one direction. An introduction through work or study, not alone in some unknown place. It comes through people who already know you.' },
      { q: 'What is the remedy for Rahu?',   a: 'Pray to Durga on Wednesdays and feed one person. And for three weeks, make no new promise about the thing that is stuck.' },
      { q: 'Why do wrong people turn up?',   a: 'Rahu shows whatever is available instantly. Any relationship that moves very fast in the first week is your pattern. Wait three weeks and the pattern breaks.' }
    ]
  },
  {
    // Named for the thing people search for. "Marriage Report" said nothing the
    // subtitle did not already say; Kundli Milan is the word she would use
    // herself, and it is what the cover says.
    id: 'marriage', t: 'Kundli Milan Marriage Compatibility', s: 'How well you match and when you marry', pages: 42, rating: '4.8', sold: 96440,
    cadence: 'once',
    // The one report with a second person in it, so the one report that has to
    // ask. Board 1321:37310 — his four fields empty, hers written in.
    needsMatch: true,
    /* The hook over the buy bar. Mars holding the talks back is a worry, and a
       worry is what the free chat already gave her — it is the reason she is
       on this page, not a reason to pay. The score is the one thing in the
       report she cannot get anywhere else and the thing she would say out loud
       if asked what she wants from it, so the last line before the button
       names it and says it is hers. Out of 36 is in the sentence because 28
       means nothing without the scale. */
    why: 'Add both birth details and get your 36-guna compatibility score',
    cover: { a: '#E8973C', b: '#8A4A12', ink: '#FFEBD4', motif: 'knot' },
    // Figma 3466:13910 for the cover, 3459:22391 for the spread, 3457:6843 for
    // the hero ground.
    art: {
      closed: 'assets/cover-marriage.jpg?v=5',
      open: 'assets/spread-marriage.png?v=3',
      // Filmed, like Partner's. The painted ground below is what Career still
      // uses and what this one fell back to before the clip existed.
      video: 'assets/hero-marriage.mp4?v=1',
      // Run at 0.4, which is the 2.5x slower she asked for: the clip is four
      // seconds of a very small movement, and at speed it reads as a loop
      // catching rather than two people standing still.
      rate: 0.4,
      hero: 'assets/bg-marriage.jpg?v=2',
      // Cropped from the top rather than centred. At 8% the couple sat low
      // enough that the mandap above them was most of the picture and the two
      // faces — the only thing in the frame that is about her — were down
      // level with the book. This lifts them by about a third of the hero.
      heroPos: '50% 70%'
    },
    chips: ['36 guna match', 'Dosha check'],
    revs: [
      { s: 5, n: 'Anjali D., Surat',  q: 'It put the window in late 2027 and that is when my family started the talks. I had told nobody.' },
      { s: 5, n: 'Kavya R., Chennai', q: 'The low-Manglik reading saved me months of panic. Two astrologers had said the opposite.' },
      { s: 4, n: 'Pooja N., Bhopal',  q: 'The first six months of adjustment with in-laws is exactly what happened, almost to the week.' },
      { s: 5, n: 'Isha G., Lucknow',  q: 'The guna count matched what the pandit worked out later. We stopped paying for a second opinion.' }
    ],
    /* Twelve, and the first one is the score. The old eight opened on "Am I
       Manglik" — a dosha check — which is the thing she is afraid of rather
       than the thing she is buying, and it buried the guna count at number
       seven. These lead with the number, then break compatibility into the
       four parts people actually argue about, then name the three doshas
       instead of saying "which doshas you have", because a woman who has been
       told she is Manglik is scanning for that word and will not find it in
       an abstraction.
       More of them on purpose: this is the longest report of the three at 42
       pages, and every surface counts this list out loud — the chat card says
       "+9 more questions answered" off its length, the picker and History say
       "12 questions answered". Eight lines made the longest book look like the
       thinnest. */
    learn: [
      'Your real compatibility score, and what it means for the two of you',
      'How many of the 36 gunas match, and which ones do not',
      'How well you match on temperament and daily life',
      'How you match on money, spending and saving',
      'What the two charts say about closeness and intimacy',
      'How the two families are likely to get along',
      'Whether you are Manglik, and how strongly',
      'Nadi, Kaal Sarp and the other doshas in both charts',
      'Whether those doshas can be cancelled, and what it takes',
      'When the marriage happens, and the best window for it',
      'Whether money changes for you after marriage',
      'The specific remedies that strengthen this match'
    ],
    licons: ['chart', 'list', 'people', 'coin', 'rings', 'home',
             'spark', 'block', 'shield', 'cal', 'arrow', 'beads'],
    /* The trigger for this one is a person, not a planet. Kundli Milan is the
       only report of the three that needs a second chart, so it is only ever
       pitched to someone who has named him in the chat - and saying so out loud
       is what separates it from an ad. She told Hemali about him; Hemali is
       answering about him. */
    pitch: [
      'Mansi, you mentioned him in the chat. Do you want the Kundli Milan report done for the two of you?',
      'Learn how many of the 36 gunas match, whether either of you is Manglik, and the window the marriage can actually happen in.',
      // Not "buy" — the button under this one is free now. Asking for money in
      // the same breath as asking for his birth time makes the typing feel
      // like part of the price.
      'Give me his birth details and I will match the two charts for you now. The full report is there if you want the whole of it.'
    ],
    pitchLong: [
      'Mansi, you mentioned him today, so I put both charts in front of me after we finished and made you the Kundli Milan report.',
      'Learn your real guna score out of 36 and which gunas are missing, what the Mangal dosha does to this match, how the two families sit together, and when the marriage is best done.',
      'Give me his birth details and the match is yours free. The full report, remedies and all, is a complete sample away - open on another chart, so you can see how deep it goes before you decide.'
    ],
    /* The page after the form. Everything here replaces its plain counterpart
       once both charts exist, which is the whole reason the details come
       before the money: the detail page stops being a brochure for a book and
       becomes a reading of her own match that happens to stop halfway.

       The number is 28, so 8 points are missing - and 8 is exactly the weight
       of Nadi, the heaviest koota of the eight and the one families actually
       refuse over. That is not a convenient coincidence to invent, it is what
       a 28 usually means, and it gives every surface on this page the same
       single subject instead of a generic "learn more". The chips show it,
       the hook names the remedy for it, and the pointer list opens on it.

       The hook is the one place a remedy is promised. A locked list says what
       is missing; a remedy says something can be done, and the gap between
       those two is the reason to pay. */
    matched: {
      tl: function (n) { return 'Your Kundli Milan With ' + n; },
      lead: function (n) {
        return '28 of 36 gunas matched with ' + n +
          '. Astro Hemali has read both charts for what the other 8 are doing.';
      },
      /* The number on its own, so the surfaces that only have room for the
         figure - the pay sheet's dial - read it from here instead of each
         keeping its own 28 to fall out of step with. */
      score: { n: 28, of: 36 },
      chips: ['28 of 36 gunas', 'Nadi 0 of 8', 'Nadi dosha present'],
      why: 'All 8 missing points are Nadi. One remedy cancels it, and it is in the report',
      head: 'What Your 28 Does Not Tell You',
      learn: [
        'Why all 8 missing points are Nadi, and what Nadi actually governs',
        'Whether your Nadi dosha is cancelled, and the exact remedy if it is not',
        'Whether he is Manglik, and how strongly',
        'How the two of you match on temperament and daily life',
        'How you match on money, spending and saving',
        'What the two charts say about closeness and intimacy',
        'How your family and his are likely to get along',
        'Kaal Sarp and the other doshas sitting in both charts',
        'When the marriage happens, and the best window for it',
        'Whether money changes for you after marriage',
        'The specific remedies that strengthen this match',
        'What to tell the families when they ask about the guna count'
      ],
      licons: ['block', 'beads', 'spark', 'people', 'coin', 'rings',
               'home', 'shield', 'cal', 'arrow', 'sun', 'list']
    },
    /* The rose this card has always worn. Kundli Milan is the one report whose
       hero art is warmer than its book - the painting is gold and brown, the
       cover is rose - and the cover is what the card is showing, so the cover
       wins. */
    /* Off hero-marriage.mp4 rather than off the cover. The film is lamplight
       and brass - average #AD8965, darkest #532E16 - and the rose this card
       used to wear belonged to the book, which is already in the picture a few
       pixels to the right. Two different warms touching looked like a mistake. */
    tint: 'linear-gradient(94deg,#3E2211 0%,#633618 40%,#A8835F 74%,#fff 100%)',
    push: 'Mansi, I have both charts open. Your 36-guna score is ready \u2014 Kundli Milan is \u20b949 today instead of \u20b9499 \ud83d\udcd6',
    tkt: { t: 'Your Kundli Milan is ready', s: 'The 36-guna score for the two of you' },
    /* Gun Milan is the number this report is bought for, so it is the number on
       the card. Out of 36 under it, because 28 alone means nothing to anyone
       who has not been told the scale. */
    hero: {
      fig: { lbl: 'Gun Milan', big: '28', unit: 'out of 36' },
      foot: [['Mangal dosha', 'In neither chart'], ['Best window', 'Feb \u2013 Aug 2027']],
      hide: [['Your score', 'After you buy'], ['Best window', 'In full report']]
    },
    ask: [
      { q: 'How serious is the Manglik?',    a: 'Mars is in your chart but weakly placed. This is called a low Manglik. With a partner whose chart is similar, it settles on its own.' },
      { q: 'Which is the best month?',       a: 'When Jupiter looks at your seventh house. In that window talks move forward and the family agrees too.' },
      { q: 'What will the in-laws be like?', a: 'The lord of your fourth house is well placed, so the home stays calm. The first six months ask for some adjustment, then it steadies.' }
    ]
  },
  {
    // Money, not just the job, and a window rather than a subject. The cover
    // says Career & Money; what people actually want to know is whether the
    // thing lands soon, so the horizon goes in the name instead of sitting in
    // the subtitle where it read as one more topic.
    id: 'career', t: 'Career, Money & Next 3 Months', s: 'When to switch and when money moves', pages: 34, rating: '4.6', sold: 71250,
    // A quarter at a time. The report is a window rather than a reading, so it
    // runs out: once this one is hers she can read it, and she can also buy the
    // next three months. Every repeat buy is its own row in history.
    cadence: 'quarterly',
    why: 'Learn how Saturn is slowing down your next move',
    cover: { a: '#3E8FD6', b: '#1B4A78', ink: '#DCEBFA', motif: 'arrow' },
    // Figma 3496:13905 cover, 3488:24186 spread, 3492:8493 hero ground.
    art: {
      closed: 'assets/cover-career.jpg?v=3',
      open: 'assets/spread-career.png?v=2',
      // Filmed, like the other two. The crown turns above the stairs — the same
      // climb the cover paints, so the still below is only the fallback now.
      video: 'assets/hero-career.mp4?v=1',
      // Left at speed. This one is already ten seconds of one slow rotation;
      // the 0.4 that Kundali Milan needed was for four seconds of almost no
      // movement, and applying it here would stop the crown rather than calm it.
      rate: 1,
      hero: 'assets/bg-career.jpg?v=2',
      // Anchored to the very top of the painting. This one is a climb, so the
      // thing the picture is about is the space above the stairs — the door,
      // the light coming through it, the sky the coins are stacked against.
      // Cropping into that to lift the figure took away the only part of the
      // frame that says where he is going.
      heroPos: '50% 0%'
    },
    chips: ['Switch timing', 'Raise window'],
    revs: [
      { s: 5, n: 'Shruti B., Pune',   q: 'It named March as the switch month. I got the offer on the 11th of March.' },
      { s: 5, n: 'Meera T., Gurgaon', q: 'The bit about my work being invisible rather than weak changed how I ran my reviews.' },
      { s: 4, n: 'Divya S., Kochi',   q: 'Saturn watching the tenth lord explained a slow year I had been blaming myself for.' },
      { s: 5, n: 'Tanvi A., Jaipur',  q: 'It said job, not business, for this year. I had almost put in my notice to start something.' }
    ],
    learn: [
      'The one big career theme of the next three months',
      'The best dates to ask for a raise or pitch an idea',
      'Business or a job, what the chart says',
      'What your boss actually thinks about you',
      'What to change at work, and how to make your work visible',
      'The right month for a job switch',
      'How likely a raise is in this job',
      'Colours, directions and mantras for success at work'
    ],
    licons: ['spark', 'cal', 'case', 'user', 'eye', 'arrow', 'coin', 'sun'],
    /* Career has no person to name and no question she asked, so its trigger is
       the calendar: the month is running out and nothing has moved. That is the
       one thing about work she is already thinking when the message arrives,
       which makes it the only honest way in. The months are spelled out instead
       of being called "the next three months" because three named months read
       as a forecast and the phrase reads as a category. */
    pitch: [
      'Mansi, October is almost gone and you have been working hard with very little moving. That is Saturn watching your tenth house, not you, and your Career report starts right there.',
      'Learn what November, December and January each hold for your work, month by month.',
      'One move in the right month can change the whole year. The report names that month.'
    ],
    pitchLong: [
      'Mansi, I kept reading your chart after we spoke. October is nearly over and the year has felt slow to you - Saturn aspecting your tenth house is why, and that is where your Career report begins.',
      'Learn what November, December and January hold, the dates worth asking for a raise on, the right month to switch, and what your boss actually sees.',
      'Buy the report and get your tenth house read in full, remedies included. A complete sample on another chart is open to read first, so you can see how deep it goes.'
    ],
    /* Amber, off the stairs and the stacked coins in the career painting. The
       warmest of the three, which is right for the only report that is sold on
       a month rather than on a person. */
    /* Off hero-career.mp4, which is a pale sand #E3D3C5 all the way through.
       Its own average is far too light to put white type on, so the card takes
       the hue and drops the value: the same sand, lit from much further away. */
    tint: 'linear-gradient(94deg,#4A352A 0%,#6B4F3E 40%,#BCA38C 74%,#fff 100%)',
    push: 'Mansi, October is almost gone and nothing has moved. Your next three months, read month by month \u2014 \u20b949 today instead of \u20b9499 \ud83d\udcd6',
    tkt: { t: 'Your Career report is ready', s: 'November, December and January, month by month' },
    /* Career is bought for timing, so the months are the headline. The year
       sits under them rather than inside the range, which keeps the figure to
       four characters and the same weight as the other two cards. */
    hero: {
      fig: { lbl: 'Your switch window', big: 'Apr \u2013 Sep', unit: '2027' },
      foot: [['10th lord', 'Saturn \u00b7 6th house'], ['Money moves', 'Jun 2027']],
      hide: [['Your window', 'After you buy'], ['Money moves', 'In full report']]
    },
    ask: [
      { q: 'When should I change jobs?',     a: 'When Jupiter looks at your tenth house. In that window the offers are better and talks close. Before it, only talk, do not switch.' },
      { q: 'What does my boss think?',       a: 'The Sun is fine but Saturn is watching. He trusts the work, not the show. So he knows your work, he just does not remember it.' },
      { q: 'Will I get a raise?',            a: 'Your tenth lord is exalted, so yes, but only if you ask, not on its own. Ask on the dates named in the report.' }
    ]
  }
];
function reportById(id) {
  for (var i = 0; i < REPORTS.length; i++) if (REPORTS[i].id === id) return REPORTS[i];
  return REPORTS[0];
}

/* Each day names the surfaces it is allowed to use — `surf` is the whole
   schedule, and every renderer reads it rather than guessing from the day
   number. Day 1 stays out of Today entirely: the chat, History and a
   notification carry it, so nothing competes with the daily reward. */
var PM_JOURNEY = {
  1: {
    stamp: 'Just now',
    surf: { chat: true, today: false, guide: false, hist: true },
    msgs: [
      { who: 'sys',    text: 'Astrologer has joined to guide you' },
      { who: 'user',   text: 'Will I have a healthy relationship with my partner?' },
      { who: 'hemali', text: 'Mansi, I have read your chart. Rahu sits in your seventh house. That is why things stop just as they start to work out.' },
      { who: 'hemali', text: 'Do not worry, there is a remedy for it.' },
      { who: 'ended',  text: 'This is an automated message. Your chat ended as you ran out of free minutes. You may recharge and start the chat again. For any issues, contact customer support.' },
      /* The brief's wait, made visible — nothing touches her until it passes. */
      { who: 'gap',    text: '15 minutes later' },
      { who: 'hemali', pitch: 'long' },
      { who: 'offer3' }
    ],
    today: { eyebrow: '', note: '' },
    countdown: '✦ NEXT FREE 2 MIN CHAT IN <b>14h : 23m</b>',
    /* A notification that names her own house and opens that one preview beats
       a storefront ad that makes her choose again on the other side of the tap. */
    lead: 'partner',
    /* The flag only says that day 1 has a notification. What it says is the
       pitched report's business, the same as the chat line directly under it -
       a push hard-coded to Rahu while the card sells Kundli Milan is the same
       contradiction the chat bubble had. */
    push: true
  },
  /* `lead` is the one report each day actually suggests. Day 1 and 2 lead with
     the house she asked about; if that has not landed in two days the
     hypothesis was wrong, so days 3 and 4 change the question instead of
     repeating it. The other two are always one tap away, never stacked. */
  2: {
    stamp: 'Yesterday',
    lead: 'partner',
    surf: { chat: false, today: true, guide: true, hist: false },
    msgs: [
      { who: 'hemali', text: 'Mansi! Yesterday you asked about your partner. What would you like to ask today?' },
      { who: 'ended',  text: 'This is an automated message. Your chat ended as you ran out of free minutes. You may recharge and start the chat again. For any issues, contact customer support.' }
    ],
    today: { eyebrow: '', note: '' },   // PM Today uses the expert card, not this slot
    countdown: '✦ FREE 2 MIN CHAT READY'
  },
  /* Day 3 steps back off the expert card — Today keeps only the personalised
     tile, and the chat carries the ask. Nothing escalates: same three reports,
     same preview, same price. */
  3: {
    stamp: '2 days ago',
    lead: 'career',
    surf: { chat: true, today: false, guide: true, hist: false },
    msgs: [
      { who: 'hemali', pitch: 'short' },
      { who: 'offer3' },
      { who: 'ended',  text: 'This is an automated message. Your chat ended as you ran out of free minutes. You may recharge and start the chat again. For any issues, contact customer support.' }
    ],
    today: { eyebrow: '', note: '' },   // PM Today uses the expert card, not this slot
    countdown: '✦ FREE 2 MIN CHAT READY'
  },
  /* Day 4 is the last ask, and it is quieter than day 3, not louder: the chat
     and the expert card both drop away and the report sits as the first task in
     Personalised Guidance, where she can take it or walk past it. */
  4: {
    stamp: '3 days ago',
    lead: 'marriage',
    lastAsk: true,
    surf: { chat: false, today: false, guide: true, hist: false },
    msgs: [
      { who: 'hemali', pitch: 'short' },
      { who: 'offer3' },
      { who: 'ended',  text: 'This is an automated message. Your chat ended as you ran out of free minutes. You may recharge and start the chat again. For any issues, contact customer support.' }
    ],
    today: { eyebrow: '', note: '' },   // PM Today uses the expert card, not this slot
    countdown: '✦ FREE 2 MIN CHAT READY'
  },
  /* Day 5: the stop. Nothing asks her any more — no push, no chat line, no
     expert card. The report stays on the shelf as a task she can pick up if she
     wants it, which is not the same as being sold to. */
  5: {
    stamp: '4 days ago',
    quiet: true,
    surf: { chat: false, today: false, guide: true, hist: false },
    msgs: [
      { who: 'hemali', text: 'Mansi, tell me, what would you like to ask today?' },
      { who: 'ended',  text: 'This is an automated message. Your chat ended as you ran out of free minutes. You may recharge and start the chat again. For any issues, contact customer support.' }
    ],
    today: { eyebrow: '', note: '' },
    countdown: '✦ FREE 2 MIN CHAT READY'
  }
};

/* Daily-reward coins. The wallet is the habit loop's own currency — the report
   is flat ₹49 (down from ₹499) and never discounts off the wallet. */
var REWARD = { 1: 9, 2: 11, 3: 13, 4: 16, 5: 17 };
var WALLET_AT = { 1: 20, 2: 29, 3: 40, 4: 53, 5: 69 };   // start of each day, pre-answer

var state = {
  day: 1,
  answered: false,
  entry: 'today-a',
  wallet: 20,
  lang: 'en',
  langFrom: 'sample',   // which surface opened the language sheet
  /* `paid` stays what it always was — has she bought anything at all — because
     every post-purchase surface in the app reads it. `owned` is the list that
     makes history mean something: ids in the order they were bought. */
  paid: false,
  owned: [],
  /* One row per purchase, newest first, so a repeat buy of a quarterly report
     leaves its own mark instead of overwriting the first one. */
  buys: [],
  screen: 'today-a',
  stack: [],
  sheet: null,
  introShown: false,
  /* Coins collected on the 7-day ladder. Day 1 starts at 0 because the check-in
     is still unanswered — the intro sheet is asking for that first answer. */
  claimed: 0,
  reminded: false,
  pick: 'partner',  // which of the three reports she is looking at
  /* Which report the app is pitching today — the chat card, the expert ticket,
     the History chapter and the push all read it. Separate from `pick`, which
     is whatever she has tapped into: the pitch is the app's choice, the pick is
     hers. A demo control, not a user one — the real app would pin this to the
     house Hemali just named, which for this script is Partner. */
  lead: 'partner',
  /* His details, and whether they have been given. Kundli Milan is the only
     report that needs a second chart, and the chart now comes before the
     money: the form is free, the guna number it produces is free, and the
     paywall sits after both. Two reasons it is that way round. Most women do
     not know the man's exact birth time, so taking ₹49 first and handing her
     a form she cannot fill is a stuck purchase and a refund; this way the
     same failure is a free walk-away. And four fields about him is real
     effort, so by the time the price appears she has already put something
     in - which is the right order for sunk cost, where paying first and then
     being given homework is a bill after the bill. */
  matched: false,
  /* Who the match was actually run against, and who the chat guessed it would
     be. Two fields, not one, because the guess has to survive her overruling
     it: if she matches against someone else and then comes back to redo it,
     the form should still offer the name Hemali heard rather than the name
     that was just rejected. */
  boy: '',
  suggested: 'Rahul',
  /* The morning's report is waiting in History — the dot on the nav says so,
     and visiting History clears it. */
  histDot: true,
  timers: []
};

function clearTimers() {
  state.timers.forEach(clearTimeout);
  state.timers = [];
}
function later(fn, ms) {
  var t = setTimeout(fn, ms);
  state.timers.push(t);
  return t;
}

/* ---------------------------------------------------------------- router */
var screens = $('#screens');

function screenEl(id) { return $('#' + id); }

/* mode: 'push' (from the right), 'back' (reverse) or 'fade' */
function show(id, mode) {
  var next = screenEl(id), cur = screenEl(state.screen);
  if (!next || id === state.screen) return;

  // Only the outgoing and incoming screens may be painted. Without this a screen
  // left parked at .behind by an earlier push shows through the next fade.
  $$('.screen').forEach(function (s) {
    if (s !== cur && s !== next) s.classList.remove('on', 'behind');
  });

  next.classList.toggle('fade-in', mode === 'fade');

  if (mode === 'back') {
    // The outgoing screen slides back out to the right; the one underneath
    // was already parked at -24%, so just un-park it.
    cur.classList.remove('on');
    next.classList.remove('behind');
    next.classList.add('on');
  } else {
    if (cur && mode === 'push') { cur.classList.add('behind'); cur.classList.remove('on'); }
    else if (cur) { cur.classList.remove('on', 'behind'); }
    // Force a frame so the translateX(100%) start state is actually painted.
    next.offsetHeight;
    next.classList.add('on');
  }

  state.screen = id;
  if (id !== 'timeline') hideReadyPush();
  hidePush();
  var sc = $('[data-scroll]', next);
  if (sc) sc.scrollTop = 0;
  // The scroll went back to the top, so the header has to go back to glass —
  // it does not fire a scroll event for a programmatic reset.
  var rh = $('.rp-head', next);
  if (rh) rh.classList.remove('solid');
  onEnter(id);
}

function go(id, mode) {
  if (mode !== 'back') state.stack.push(state.screen);
  // The knock belongs to Today. Leaving the page is an answer to it either way.
  if (id !== 'today-a') hideRepToast();
  show(id, mode || 'push');
}

function back() {
  var prev = state.stack.pop();
  if (!prev) prev = state.entry;
  show(prev, 'back');
}

function onEnter(id) {
  if (id === 'read') { startAsk(); } else { stopAsk(); }
  // Pay is a sheet, not a screen, so leaving any screen cancels a pay in flight.
  stopPay();
  if (id === 'timeline' && !state.paid) return;
}

/* ---------------------------------------------------------------- wallet */
function paintWallet() {
  $$('[data-wallet]').forEach(function (el) { el.textContent = '₹' + state.wallet; });
}

/* Reveal something that animates in from a parked transform. Reading offsetHeight
   forces the start state to be computed now; requestAnimationFrame is not safe
   here because browsers throttle it while the tab is not painting. */
function reveal(el, cls) {
  el.hidden = false;
  void el.offsetHeight;
  el.classList.add(cls || 'on');
}

/* ---------------------------------------------------------------- toast */
var toastT;
function toast(msg, kind) {
  var el = $('#toast');
  el.textContent = msg;
  el.classList.toggle('success', kind === 'success');
  reveal(el);
  clearTimeout(toastT);
  toastT = setTimeout(function () {
    el.classList.remove('on');
    setTimeout(function () { el.hidden = true; }, 220);
  }, 1600);
}

/* ---------------------------------------------------------------- the report's knock on Today
   Day 1 and Day 3 only, and only once the check-in is answered: that is the
   one moment she has just been handed something, so the ask is a reply rather
   than an interruption. Day 2 is left clear — the same nudge three days running
   stops being a nudge. */
function repToastDays() { return state.day === 1 || state.day === 3; }

function showRepToast() {
  if (state.paid || state.repToastSeen || !repToastDays()) return;
  var el = $('#repToast');
  if (!el) return;
  var r = leadReport();
  $('#repToastLine').textContent = 'Hemali made your ' + r.t + ' Report · ₹49';
  state.repToastSeen = true;
  reveal(el);
}

function hideRepToast() {
  var el = $('#repToast');
  if (!el || el.hidden) return;
  el.classList.remove('on');
  setTimeout(function () { el.hidden = true; }, 260);
}

/* ---------------------------------------------------------------- sheets */
function openSheet(name) {
  var el = $('#sheet-' + name);
  if (!el) return;
  if (state.sheet && state.sheet !== name) {
    var old = $('#sheet-' + state.sheet);
    if (old) { old.classList.remove('on'); old.setAttribute('aria-hidden', 'true'); }
  }
  state.sheet = name;
  if (name === 'lang') renderLangList();
  if (name === 'pay') { paintBought(); paintWallet(); }
  reveal($('#scrim'));
  reveal(el);
  el.setAttribute('aria-hidden', 'false');
}

function closeSheet() {
  var el = state.sheet && $('#sheet-' + state.sheet);
  if (el) { el.classList.remove('on'); el.setAttribute('aria-hidden', 'true'); }
  state.sheet = null;
  var scrim = $('#scrim');
  scrim.classList.remove('on', 'blur');
  setTimeout(function () { if (!state.sheet) scrim.hidden = true; }, 240);
  // The reward sheet covers the page, so the knock waits for it to clear.
  if (state.repToastPending) {
    state.repToastPending = false;
    setTimeout(showRepToast, 420);
  }
}

/* ---------------------------------------------------------------- content: ladder */
var DAYS = [
  { d: 'Day 1', v: 9 },
  { d: 'Day 2', v: 11 },
  { d: 'Day 3', v: 13 },
  { d: 'Day 4', v: 15 },
  { d: 'Day 5', v: 17 },
  { d: 'Day 6', v: 19 },
  { d: 'Day 7', v: 21 }
];
/* Sizes and lifts match the daily-reward prototype. */
var COIN_SIZE = [26, 28, 30, 30, 33, 38, 46];
var COIN_LIFT = [0, 1, 3, 5, 8, 11, 15];
var CHECK = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none">' +
  '<path d="M3.5 8.4l3 3 6-6.3" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function renderLadder() {
  var cols = DAYS.map(function (day, i) {
    var done = i < state.claimed;
    // Today is today whether or not she has collected it — Figma 2640:12298
    // keeps the brand ring and label on day 1 in the answered state, so the
    // strip says where she is rather than what is next.
    var cls = 'col' + (done ? ' done' : '') + (i === state.day - 1 ? ' today' : '') +
      (i === DAYS.length - 1 ? ' goal' : '');
    return '<div class="' + cls + '">' +
             '<span class="ic"><span class="coin' + (done ? ' got' : '') + '" style="width:' +
               COIN_SIZE[i] + 'px;height:' + COIN_SIZE[i] + 'px;margin-bottom:' + COIN_LIFT[i] + 'px">' +
               '<span class="cn-v"><small>₹</small><b>' + day.v + '</b></span></span></span>' +
             '<span class="tr"><i class="dot">' + (done ? CHECK : '') + '</i></span>' +
             '<span class="lb">Day<b>' + (i + 1) + '</b></span>' +
           '</div>';
  }).join('');

  var html = '<div class="ladder" style="--f:' + (Math.max(state.claimed - 1, 0) / 6) + '">' + cols + '</div>';
  $$('[data-ladder]').forEach(function (el) { el.innerHTML = html; });
  // Day 1 keeps the Daily reward block — the check-in is the day's one job —
  // but not the seven coins. On the morning someone arrives, a full streak laid
  // out ahead of them reads as a chore list rather than a reward. The sheets in
  // the reward flow still show it, because there the strip is the subject.
  // ...until she answers: Figma 2640:12298 puts the strip back in the answered
  // state, where it is a receipt for day 1 rather than a list of six chores.
  $('#todayLadder').hidden = state.day === 1 && !state.answered;
}

/* ---------------------------------------------------------------- content: bottom nav */
var NAV_ICONS = {
  today: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  experts: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3.2" stroke="currentColor" stroke-width="1.6"/><path d="M2.8 20c.5-3.3 3.1-5.4 6.2-5.4S14.7 16.7 15.2 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M16.2 5.3a3.2 3.2 0 010 5.6M18 14.9c2 .8 3.2 2.7 3.5 5.1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  timeline: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M7 4v16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="7" cy="8" r="2.2" fill="#fff" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="17" r="2.2" fill="#fff" stroke="currentColor" stroke-width="1.6"/><path d="M12 8h8M12 17h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  explore: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="m15.2 8.8-1.8 4.6-4.6 1.8 1.8-4.6 4.6-1.8z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>'
};
var NAV = [
  { id: 'today', label: 'Today' },
  { id: 'experts', label: 'Experts' },
  { id: 'timeline', label: 'History' },
  { id: 'explore', label: 'Explore' }
];

function renderNav() {
  $$('[data-bnav]').forEach(function (el) {
    var active = el.getAttribute('data-bnav');
    el.innerHTML = NAV.map(function (n) {
      return '<button type="button" class="' + (n.id === active ? 'on' : '') + '"' +
             ' data-nav="' + n.id + '">' + NAV_ICONS[n.id] +
             // The board uses a counter, not a dot: a number says how much is
             // waiting, which is the only part a dot cannot say.
             (n.id === 'timeline' && state.histDot ? '<i class="ncount">1</i>' : '') +
             '<span>' + n.label + '</span></button>';
    }).join('');
  });
  // The chapter is reachable from two doors — the History tab and the chat
  // history icon in the header. Both carry the same counter.
  $$('.ic-btn[data-chat]').forEach(function (b) {
    var d = b.querySelector('.ncount');
    if (state.histDot && !d) {
      d = document.createElement('i');
      d.className = 'ncount';
      d.textContent = '1';
      b.appendChild(d);
    } else if (!state.histDot && d) {
      d.remove();
    }
  });
}

/* ---------------------------------------------------------------- content: language sheet */
function langById(id) {
  for (var i = 0; i < LANGS.length; i++) if (LANGS[i].id === id) return LANGS[i];
  return LANGS[0];
}
function langLabel(id) {
  var l = langById(id);
  return l.native || l.label;
}

/* The sample is only written in two voices, and a nine-row list promised seven
   it could not keep. English and Hinglish are also the two that actually split
   her audience — anything else is a translation request, not a reading choice. */
var READ_LANGS = ['en', 'hinglish'];

function renderLangList() {
  $('#langList').innerHTML = LANGS.filter(function (l) {
    return READ_LANGS.indexOf(l.id) > -1;
  }).map(function (l) {
    var name = l.native ? l.label + ' · ' + l.native : l.label;
    return '<button type="button" data-lang="' + l.id + '"' +
           (l.id === state.lang ? ' class="on"' : '') + '>' +
           '<span>' + name + '</span><span class="rd"></span></button>';
  }).join('');
  paintShowSample();
}

function paintShowSample() {
  var btn = $('#showSample');
  btn.textContent = state.langFrom === 'pay'
    ? 'Use ' + langById(state.lang).label
    : 'Show sample in ' + langById(state.lang).label;
}

/* ---------------------------------------------------------------- content: sample report (R.3 / R.3c) */
function copyFor(id) {
  // Only English and Hindi are written out; everything else borrows the English
  // body and keeps its own chip + buy label, exactly like the Figma flow.
  var base = SAMPLE[id] || SAMPLE.en;
  var l = langById(id);
  return {
    dev: !!base.dev,
    chip: base === SAMPLE[id] ? base.chip : (l.native || l.label),
    navTitle: base.navTitle,
    bandSub: base.bandSub,
    tag: base.tag,
    title: base.title,
    subtitle: base.subtitle,
    name: base.name,
    bpLabel: base.bpLabel,
    bpText: base.bpText,
    scores: base.scores,
    coversLabel: base.coversLabel,
    covers: base.covers,
    footnote: base.footnote,
    buy: 'Buy in ' + l.label
  };
}

/* One section of the reader: a full-width band of paper laid on the arch, with
   a gap above and below so the painting shows through the seams. */
function rsec(label, body) {
  return '<section class="rs">' +
    (label ? '<h3 class="rs-h">' + label + '</h3>' : '') + body + '</section>';
}

/* The evidence block at the foot of each section. One branch per `k` on the
   board — the kind is what makes a section feel written rather than templated,
   so they are not collapsed into a single list renderer. */
function rsEvidence(s) {
  var i;
  if (s.k === 'bars') {
    return '<div class="rs-card"><p class="rs-cl">' + esc(s.label) + '</p>' +
      s.rows.map(function (r) {
        return '<div class="rs-bar"><span>' + esc(r[0]) + '</span>' +
          '<i><b style="width:' + (r[1] * 10) + '%"></b></i>' +
          '<em>' + r[1] + '</em></div>';
      }).join('') + '</div>';
  }
  if (s.k === 'tiles') {
    return '<div class="rs-tiles">' + s.rows.map(function (r) {
      return '<div><small>' + esc(r[0]) + '</small><b>' + esc(r[1]) + '</b></div>';
    }).join('') + '</div>';
  }
  if (s.k === 'rows') {
    return '<div class="rs-rows">' + s.rows.map(function (r) {
      return '<div><small>' + esc(r[0]) + '</small><b>' + esc(r[1]) + '</b></div>';
    }).join('') + '</div>';
  }
  if (s.k === 'chance') {
    return '<div class="rs-card"><p class="rs-cl">' + esc(s.label) + '</p>' +
      '<div class="rs-chart">' + s.rows.map(function (r) {
        // The two tall bars are the answer; the rest are there to make them
        // look like an answer rather than an assertion.
        var hot = r[1] >= 80;
        return '<div' + (hot ? ' class="hot"' : '') + '>' +
          '<i style="height:' + r[1] + '%"></i><small>' + esc(r[0]) + '</small></div>';
      }).join('') + '</div>' +
      '<div class="rs-win"><small>' + esc(s.winLabel) + '</small><b>' + esc(s.win) + '</b></div>' +
    '</div>';
  }
  if (s.k === 'split') {
    return '<div class="rs-card tight">' +
      '<i class="rs-split"><b style="width:' + s.pct + '%"></b></i>' +
      '<p class="rs-sl"><span>' + esc(s.rows[0][0]) + '</span><em>' + esc(s.rows[0][1]) + '</em></p>' +
    '</div>';
  }
  if (s.k === 'tags') {
    return s.rows.map(function (r) {
      return '<div class="rs-tag"><p><b>' + esc(r[0]) + '</b><i>' + esc(r[1]) + '</i></p>' +
        '<small>' + esc(r[2]) + '</small></div>';
    }).join('');
  }
  if (s.k === 'tips') {
    return '<div class="rs-tips">' + s.rows.map(function (r, n) {
      return '<div><i>' + (n + 1) + '</i><span><b>' + esc(r[0]) + '</b><small>' +
        esc(r[1]) + '</small></span></div>';
    }).join('') + '</div>';
  }
  if (s.k === 'kundali') {
    // North Indian square: the diamond and the two diagonals, with the twelve
    // house labels dropped at the anchor points the board uses.
    var pos = [
      [50, 19], [32, 7], [13, 25], [32, 44], [13, 68], [32, 87],
      [50, 76], [68, 87], [87, 68], [68, 44], [87, 25], [68, 7]
    ];
    var cells = '';
    for (i = 0; i < 12; i++) {
      var occ = s.houses[i + 1];
      cells += '<span class="kh" style="left:' + pos[i][0] + '%;top:' + pos[i][1] + '%">' +
        '<em>' + (i + 1) + '</em>' + (occ ? '<b>' + esc(occ) + '</b>' : '') + '</span>';
    }
    return '<div class="rs-kun">' +
      '<div class="kun">' +
        '<svg viewBox="0 0 240 240" aria-hidden="true">' +
          '<rect x="1" y="1" width="238" height="238" rx="4" fill="none" stroke="#EAECF0" stroke-width="1.5"/>' +
          '<path d="M1 1 239 239M239 1 1 239M120 1 239 120 120 239 1 120Z" fill="none" stroke="#EAECF0" stroke-width="1.5" stroke-linejoin="round"/>' +
        '</svg>' + cells +
      '</div>' +
      '<div class="rs-leg">' + s.legend.map(function (l) {
        return '<div><i></i><span><b>' + esc(l[0]) + '</b><small>' + esc(l[1]) + '</small></span></div>';
      }).join('') + '</div>' +
    '</div>';
  }
  return '';
}

/* Every section ends on the same two hills so the bands read as one landscape;
   the motif on top is what tells them apart. They are drawn in the grey ramp,
   not in pink: the only colour the reader should carry is the painted artwork,
   and a pink motif beside it read as a second, competing brand. */
/* Back in pink. In grey the decorations read as chrome — a footer, a divider,
   something structural — when the whole point of them is that the report is a
   warm, hand-made object. `--dec1`/`--dec2` are the pale and deep tones, so
   there is one place to tune all fourteen. */
var DECOR = {
  hearts: '<path d="M262 36c0-8 6-13 12-13s11 5 11 11-9 14-14 18c-5-4-9-10-9-16Z" fill="var(--dec1)"/><path d="M279 24c0-10 8-16 15-16s14 6 14 14-11 18-17 23c-7-5-12-13-12-21Z" fill="var(--dec2)"/>',
  leaf:   '<path d="M268 48c0-18 14-32 32-32 0 18-14 32-32 32Z" fill="var(--dec2)"/><path d="M300 48V22" stroke="var(--dec1)" stroke-width="2"/>',
  pin:    '<path d="M288 10c9 0 16 7 16 16 0 12-16 26-16 26s-16-14-16-26c0-9 7-16 16-16Z" fill="var(--dec2)"/><circle cx="288" cy="26" r="6" fill="#fff"/>',
  orbit:  '<circle cx="288" cy="32" r="16" fill="var(--dec1)"/><ellipse cx="288" cy="32" rx="30" ry="11" fill="none" stroke="var(--dec2)" stroke-width="2"/>',
  moon:   '<path d="M298 12a22 22 0 1 0 0 42 26 26 0 0 1 0-42Z" fill="var(--dec2)"/>',
  lights: '<path d="M258 16h62" stroke="var(--dec1)" stroke-width="2"/><circle cx="268" cy="26" r="7" fill="var(--dec2)"/><circle cx="288" cy="30" r="7" fill="var(--dec1)"/><circle cx="308" cy="26" r="7" fill="var(--dec2)"/>',
  cups:   '<path d="M270 18h36l-5 22h-26Z" fill="var(--dec2)"/><path d="M282 40h12v12h-12Z" fill="var(--dec1)"/>',
  rings:  '<circle cx="280" cy="32" r="14" fill="none" stroke="var(--dec2)" stroke-width="4"/><circle cx="300" cy="32" r="14" fill="none" stroke="var(--dec1)" stroke-width="4"/>',
  house:  '<path d="M288 12l24 18v24h-48V30Z" fill="var(--dec1)"/><path d="M280 54V40h16v14" fill="var(--dec2)"/>',
  lamp:   '<path d="M266 44c0-8 10-12 22-12s22 4 22 12-10 10-22 10-22-2-22-10Z" fill="var(--dec1)"/><path d="M288 32c0-10 8-14 8-20-10 3-16 10-16 20Z" fill="var(--dec2)"/>',
  plant:  '<path d="M288 54V24" stroke="var(--dec2)" stroke-width="3"/><path d="M288 34c-12 0-18-8-18-16 12 0 18 7 18 16Zm0-4c12 0 18-8 18-16-12 0-18 7-18 16Z" fill="var(--dec1)"/>',
  lotus:  '<path d="M288 14c7 8 7 22 0 32-7-10-7-24 0-32Z" fill="var(--dec2)"/><path d="M288 46c-10 0-20-6-24-14 11-3 20 3 24 14Zm0 0c10 0 20-6 24-14-11-3-20 3-24 14Z" fill="var(--dec1)"/>',
  mala:   '<circle cx="288" cy="32" r="18" fill="none" stroke="var(--dec1)" stroke-width="3" stroke-dasharray="2 6" stroke-linecap="round"/><circle cx="288" cy="52" r="5" fill="var(--dec2)"/>',
  stars:  '<path d="M288 12l5 13 13 5-13 5-5 13-5-13-13-5 13-5Z" fill="var(--dec2)"/><circle cx="262" cy="24" r="3" fill="var(--dec1)"/><circle cx="314" cy="40" r="4" fill="var(--dec1)"/>'
};

function rsDecor(k) {
  return '<div class="rs-dec" aria-hidden="true">' +
    '<svg viewBox="0 0 360 96" preserveAspectRatio="none">' +
      '<path d="M0 56c60-18 120-18 180 0s120 18 180 0v40H0Z" fill="var(--decw1)"/>' +
      '<path d="M0 73c70-14 140-14 210 0s100 10 150 0v23H0Z" fill="var(--decw2)"/>' +
    '</svg>' +
    '<svg class="rs-dec-m" viewBox="0 0 360 96">' + (DECOR[k] || '') + '</svg>' +
  '</div>';
}

/* The report body, Figma 3366:6885. `sample` is the only difference between the
   two copies now that the locks are gone: it adds the demo-chart banner, the
   jump index and the two CTA cards. The answers themselves are identical, which
   is the point — the sample is the product, not a trailer for it. */
function renderSecs(sample) {
  var out = sample ? rsIndex() : '';
  RSECS.forEach(function (s, i) {
    // Only the sample carries the ids: it is the only copy with an index to
    // jump from, and both copies sit in the DOM at the same time.
    out += '<section class="rs"' + (sample ? ' id="rs-' + i + '"' : '') + '>' +
      '<h3 class="rs-h"><i aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
          'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
          (LI_ICON[s.ic] || '') +
        '</svg></i>' + esc(s.e) + '</h3>' +
      '<p class="rs-t">' + esc(s.h) + '</p>' +
      (s.p ? '<p class="rs-p">' + esc(s.p) + '</p>' : '') +
      rsEvidence(s) +
      rsDecor(s.dec) +
    '</section>';
    if (!sample) return;
    RCTAS.forEach(function (c) {
      if (c.after !== i) return;
      out += '<div class="rsc">' +
        '<h3>' + esc(c.h) + '</h3>' +
        '<p>' + esc(c.p) + '</p>' +
        '<button class="btn primary rsc-go" type="button">Get my report \u00b7 \u20b9' + PRICE + '</button>' +
      '</div>';
    });
  });
  return out;
}

/* Fifteen answers is more than anyone scrolls past twice, so the sample opens
   with a way in. The banner above it is doing the harder job: saying out loud
   that these are Riya's answers, which is what makes the CTA cards' promise —
   yours will read differently — land as a fact rather than a sales line. */
function rsIndex() {
  return '<div class="rs-idx">' +
    '<div class="rs-demo"><b>' + esc(RINDEX.h) + '</b><span>' + esc(RINDEX.p) + '</span></div>' +
    '<p class="rs-jump">' + esc(RINDEX.jump) + '</p>' +
    '<div class="rs-chips">' + RSECS.map(function (s, i) {
      return '<button type="button" data-jump="' + i + '">' + esc(s.c) + '</button>';
    }).join('') + '</div>' +
  '</div>';
}

/* The arch behind the reader takes the colour of the book being read: the
   gradient stops and the hue the PNG is rotated into both hang off this one
   attribute, on both reader screens at once. */
function paintArch() {
  $$('.rp').forEach(function (s) { s.setAttribute('data-rep', state.pick); });
}

function renderSample() {
  var c = copyFor(state.lang);
  var sec = $('#sample');

  paintArch();
  sec.classList.toggle('dev', c.dev);
  $('#langChipLabel').textContent = 'Read in ' + c.chip;
  paintPaper($('#samplePaper'), true);
  $('#sampleWhy').textContent = reportById(state.pick).why;
  $('#sampleBody').innerHTML = renderSecs(true);
}

/* Paints the keepsake card for whichever report was bought. `preview` keeps the
   sample page's blur-and-badge treatment; the bought page passes nothing. */
function paintPaper(host, preview) {
  if (!host) return;
  var r = reportById(state.pick), h = r.hero || {};
  var art = h.img
    ? '<img src="' + h.img + '" alt="' + esc(h.alt || '') + '">'
    // No portrait to draw, so the box holds the finding instead. Same height as
    // the sketch, so all three cards are one object at one size.
    : '<div class="paper-fig"><small>' + esc(h.fig.lbl) + '</small>' +
      '<b>' + esc(h.fig.big) + '</b><em>' + esc(h.fig.unit) + '</em></div>';
  host.innerHTML =
    '<div class="paper-art">' + art +
      (preview ? '<span class="pv-badge">Preview</span>' : '') +
    '</div>' +
    '<div class="paper-foot">' +
      ((preview ? h.hide : h.foot) || []).map(function (f, i) {
        return (i ? '<i></i>' : '') +
          '<div><small>' + esc(f[0]) + '</small><b>' + esc(f[1]) + '</b></div>';
      }).join('') +
    '</div>' +
    '<span class="paper-fold" aria-hidden="true"></span>' +
    '<span class="tape t" aria-hidden="true"></span>';
}

function renderRead() {
  paintArch();
  paintPaper($('#readPaper'), false);
  /* The same fifteen answers the sample shows, minus the demo-chart banner, the
     jump index and the two CTA cards. The sample is a window onto this page, so
     a bought report laid out differently read as a different product. */
  $('#readBody').innerHTML = renderSecs(false) +
      // The end of the report is a door, not a full stop: the other two
      // reports, then the chat where the questions it raised get spent.
      '<div class="carousel-wrap">' +
        '<p class="lbl">MORE ON YOUR CHART</p>' +
        // Two cards, so they split the row the way the sell page's do rather
        // than sitting at a fixed width with nothing to scroll to.
        '<div class="carousel fill">' +
          REPORTS.filter(function (x) { return x.id !== state.pick; })
            .map(upsellCard).join('') +
        '</div>' +
      '</div>';
  // No "Continue with Astro Hemali" button under it: the ask bar is pinned to
  // the bottom of this same screen with her face, her rate and a composer in
  // it, so a second button for the identical action only competed with the one
  // that is always on screen.
}


/* ---------------------------------------------------------------- timeline: making -> ready */
function resetTimeline() {
  // The "report being made / ready" card only exists after the purchase.
  $('#tlReport').hidden = !state.paid;
  $('#tlReportTime').textContent = '10:42 AM';
  $('#repStatus').textContent = 'Your report is being made';
  $('#repStatus').classList.remove('green');
  $('#repSteps').hidden = false;
  $('#repNotify').hidden = false;
  $('#repActs').hidden = true;
  $$('#repSteps .step').forEach(function (s) { s.classList.remove('done', 'now'); });
  hideReadyPush();
}

/* The switcher's "Report bought" entry lands with the report already made —
   the timeline card sits in its settled "Ready to read" state, no animation. */
function applyPaidTimeline() {
  if (!state.paid) return;
  $('#tlReport').hidden = false;
  $('#tlReportTime').textContent = '12:10 PM';
  var st = $('#repStatus');
  st.textContent = 'Ready to read';
  st.classList.add('green');
  $('#repSteps').hidden = true;
  $('#repNotify').hidden = true;
  $('#repActs').hidden = false;
}

function runMaking() {
  var steps = $$('#repSteps .step');
  steps.forEach(function (s) { s.classList.remove('done', 'now'); });

  function tick(i) {
    for (var k = 0; k < i; k++) { steps[k].classList.add('done'); steps[k].classList.remove('now'); }
    if (steps[i]) steps[i].classList.add('now');
  }
  tick(0);
  later(function () { tick(1); }, 900);
  later(function () { tick(2); }, 1800);
  later(function () { tick(3); }, 2700);
  later(markReady, 3400);
}

function markReady() {
  $$('#repSteps .step').forEach(function (s) { s.classList.add('done'); s.classList.remove('now'); });
  later(function () {
    // The stamp the payment recorded, not a fixed one — a second purchase sat
    // directly above the first at the same minute, which made one timeline
    // read as a duplicate rather than two things bought.
    $('#tlReportTime').textContent = state.buys.length ? state.buys[0].time : '12:10 PM';
    var st = $('#repStatus');
    st.textContent = 'Ready to read';
    st.classList.add('green');
    $('#repSteps').hidden = true;
    $('#repNotify').hidden = true;
    $('#repActs').hidden = false;
    showReadyPush();
  }, 500);
}

function showReadyPush() {
  // If the user already opened the report the banner is stale, so drop it.
  if (state.screen !== 'timeline') return;
  reveal($('#push'));
}
function hideReadyPush() {
  var p = $('#push');
  p.classList.remove('on');
  setTimeout(function () { if (!p.classList.contains('on')) p.hidden = true; }, 440);
}

/* ---------------------------------------------------------------- book opening (R.6b / R.6c) */
function openBook() {
  hideReadyPush();
  go('book', 'fade');
  var bk = $('#bookEl'), cap = $('#bookCap'), stage = $('#bookStage'),
      bz = $('#blaze'), r = reportById(state.pick);
  // The painted cover is the picture; what is inside is paper. Printing the
  // spread on the page is what made the open book twice the width of the shut
  // one, and that resize is what tore the two halves apart on the way.
  $('#bookCover img').src = r.art ? r.art.closed : 'assets/book.svg';
  // The spine takes the cover's darker tint, so the 18mm she sees edge-on
  // during the turn belongs to the book she just bought.
  $('#bookEl .spine').style.backgroundColor = r.cover ? r.cover.b : '';
  bk.classList.remove('turn', 'open');
  stage.classList.remove('gone', 'lit');
  bz.className = 'blaze';
  cap.textContent = 'Your report is ready';
  // 1. Shut, square on, for long enough to be seen as an object — this is the
  //    first time the thing she paid for is in front of her at full size.
  // 2. The turn. Three-quarters is the angle a book is held at when it is
  //    being handed over, and it is the only angle that shows the spine, which
  //    is the one part that says this is a volume and not a picture of one.
  later(function () { bk.classList.add('turn'); }, 420);
  // 3. The board comes off the spine and the inside starts to light.
  later(function () {
    bk.classList.add('open');
    stage.classList.add('lit');
    cap.textContent = 'Opening your report…';
  }, 1180);
  // 4. The light wins. It is the same glow from inside the book, scaled past
  //    the edges of the phone, and it is deliberately overexposed: a white
  //    screen is the only thing that can carry the swap underneath it.
  later(function () { bz.classList.add('on'); }, 1620);
  // 5. The swap happens inside the white, where there is nothing to see.
  later(function () { stage.classList.add('gone'); enterRead(true); }, 2240);
}

/* The opening is a curtain, not a toll booth: the second time she sees it a tap
   takes her straight in. */
function enterRead(lit) {
  if (state.screen !== 'book') return;
  clearTimers();
  state.stack = [state.entry];        // the report is now "read", so back lands on Today
  show('read', 'fade');
  var bz = $('#blaze');
  // `lit` is only true when the sequence called this from inside the white.
  // The click handler passes a MouseEvent, which is why this is an identity
  // test and not a truthiness one — a tap to skip must not flash the screen.
  if (lit !== true) { bz.className = 'blaze'; return; }
  // One frame of white over the report, then the light pulls back off it. The
  // report is revealed by the glow going, which is the point of putting the
  // glow outside the screens in the first place.
  later(function () { bz.classList.add('off'); }, 110);
  later(function () { bz.className = 'blaze'; }, 800);
}

/* Reading one she already owns. No book opening: that beat is the report being
   handed over for the first time, and replaying it on every visit would turn a
   moment into a loading screen. The page just opens, at the top, on the right
   report — she can own three now, so which one has to be set before it paints. */
function openRep(id) {
  state.pick = id;
  paintBought();
  renderRead();
  renderReport();
  $('#read [data-scroll]').scrollTop = 0;
  go('read', 'fade');
}

/* ---------------------------------------------------------------- the reader's composer
   The report answers what she asked and raises what she did not. This bar is
   where those go, so it types the open question for her — a live composer reads
   as the next line of the report, where a banner reads as an ad. */
/* Every question names something the report just told her. A general question
   could have been asked before she paid; one that quotes her own report only
   exists because she read it, which is the whole reason this bar is here. */
var ASKS = {
  partner: [
    'My report says north-west — how far is that?',
    'The image in my report, is that how he looks?',
    'Chapter 3 says Rahu is blocking it. For how long?',
    'My report gives a 2027 window. Can I move it?'
  ],
  marriage: [
    'My report says low Manglik — does that need a remedy?',
    '28 of 36 gunas in my report. Is that enough?',
    'My report puts the window in late 2027. Why then?',
    'The in-laws chapter says six months. Six months of what?'
  ],
  career: [
    'My report says March for the switch. Which week?',
    'It says my work is invisible, not weak. How do I fix that?',
    'My report says job, not business, this year. Why?',
    'Saturn on my tenth lord — is that the slow year it means?'
  ]
};

var askT = null, askN = 0;
function stopAsk() { clearTimeout(askT); askT = null; }

function startAsk() {
  stopAsk();
  var el = $('#askIn');
  if (!el) return;
  var list = ASKS[state.pick] || ASKS.partner;
  var msg = list[askN % list.length], i = 0;
  // A sentence appearing letter by letter is motion; reduced motion gets the
  // whole question at once and no loop.
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    el.placeholder = msg;
    return;
  }
  el.placeholder = '';
  function type() {
    el.placeholder = msg.slice(0, ++i);
    askT = setTimeout(i < msg.length ? type : erase, i < msg.length ? 36 : 1900);
  }
  function erase() {
    el.placeholder = msg.slice(0, --i);
    if (i > 0) { askT = setTimeout(erase, 14); return; }
    askN++;
    askT = setTimeout(startAsk, 260);
  }
  type();
}

/* ---------------------------------------------------------------- payment */
/* Figma 3339:208658. The report is a flat ₹49 off a ₹499 list price and the
   wallet is not in the way any more — the only thing left to decide is the
   language, so the screen shows the book, the arithmetic and one button. */
var payT = [];
var LIST_PRICE = 499, PRICE = 49, GST = 0.18;

/* Opens over whatever she is on. No screen change and no stack push: the
   ground is the live detail page or the live sample, and closing puts her back
   on it mid-scroll rather than navigating her somewhere. */
function openPay() {
  var r = reportById(state.pick);

  // Open and still: the spread is a finished painting of an open book, so it
  // needs no swing and no frame. Only a report without art falls back to the
  // built one.
  $('#paysBook').innerHTML = r.art
    ? '<img src="' + r.art.open + '" alt="">'
    : book3d(r);

  // The sheet names the purchase. `tl` is the long sell-page headline, so the
  // title here is the same one she tapped Buy Now under.
  $('#paysName').textContent = r.tl || 'Your ' + r.t + ' Report';
  $('#paysMeta').textContent = r.pages + ' pages · One-time payment · Made for your chart';

  /* The score strip. It needs a report that has a matched state and a match
     that has actually been run - before that there is no number, and a dial
     reading 0 of 36 next to a Buy button is the sheet arguing against itself. */
  var m = state.matched && r.matched;
  var guna = $('#paysGuna');
  guna.hidden = !m;
  if (m) {
    $('#paysGunaN').textContent = m.score.n;
    $('#paysGunaOf').textContent = 'of ' + m.score.of;
    // Her name first, off the form rather than a constant, because the form
    // let her correct it and a sheet that has forgotten the correction is the
    // one place she will not forgive it.
    var her = ($('#gName').value || '').trim().split(' ')[0] || 'You';
    $('#paysGunaWho').textContent = her + ' \u0026 ' + state.boy;
    // The same sentence the Buy bar was carrying. She is mid-tap on that
    // button, so changing the argument underneath her would read as a
    // different offer.
    $('#paysGunaWhy').textContent = m.why;
  }

  $('#paysLangName').textContent = langById(state.lang).label;
  paintPaySum();
  openSheet('pay');
  // Dim is not enough behind a page made of artwork; the board blurs it.
  $('#scrim').classList.add('blur');
}

/* 18% GST on the ₹49 actually charged. The board's button said ₹118, which is
   18% on ₹100 — a number from an older price that no longer exists anywhere on
   this screen. */
function payGst() { return Math.round(PRICE * GST); }
function payTotal() { return PRICE + payGst(); }
/* The wallet comes off the bill, capped at it — the daily-reward coins are what
   make the report nearly free, so the arithmetic has to show them doing it. */
function payUsed() { return Math.min(state.wallet, payTotal()); }
function payDue() { return payTotal() - payUsed(); }

function paintPaySum() {
  var due = payDue();
  $('#payGst').textContent = '+\u20b9' + payGst();
  $('#payWal').textContent = '\u2212\u20b9' + payUsed();
  // Struck list price first, then what she pays — the board's order, and the
  // one that reads as a markdown rather than as a price with a footnote.
  $('#payDue').innerHTML = '<s>\u20b9' + LIST_PRICE + '</s> \u20b9' + due;
  // Nothing left to charge means nothing left to say about GST — and "Pay ₹0"
  // is not a sentence, so the wallet gets the credit on the button too.
  $('.pg-l').innerHTML = due === 0
    ? 'Get it with wallet \u2022 <b>\u20b90</b>'
    : 'Pay <b>\u20b9' + due + '</b>';
}

function stopPay() {
  payT.forEach(clearTimeout);
  payT = [];
  var btn = $('#paySubmit');
  if (btn) btn.classList.remove('pressed', 'busy');
}

/* ------------------------------------------------------------- what she owns
   `owned` answers "can she read it", which is what the buttons need; `buys` is
   the record, one entry per payment, so a quarterly report bought twice leaves
   two rows in history rather than quietly replacing itself. */
function owns(id) { return state.owned.indexOf(id) > -1; }
/* The quarter a Career edition covers, counted off how many she already has.
   Nothing here is a real date — it only has to read as a window that moves. */
var QUARTERS = ['Oct – Dec 2026', 'Jan – Mar 2027', 'Apr – Jun 2027', 'Jul – Sep 2027'];
function editionLabel(r) {
  if (r.cadence !== 'quarterly') return '';
  var n = state.buys.filter(function (b) { return b.id === r.id; }).length;
  return QUARTERS[Math.min(n, QUARTERS.length - 1)];
}

function pay() {
  stopPay();
  closeSheet();
  var r = reportById(state.pick);
  state.paid = true;
  // The edition is read before the buy is recorded, so the row says the window
  // this payment just bought rather than the one after it.
  var ed = editionLabel(r);
  if (!owns(r.id)) state.owned.push(r.id);
  state.buys.unshift({ id: r.id, ed: ed, time: nowStamp() });
  state.wallet -= payUsed();
  paintWallet();
  paintBought();
  // Every sell surface retires into the follow-up: read, chat, remedies, other reports.
  renderDayToday(); renderChat(); renderHistCard(); renderTpTabs(); renderRead();
  renderReport(); renderBuys();
  toast('Payment successful', 'success');
  // Matching needs a second chart before anything can be written, so it stops
  // here for his details. The other two are read off a chart the app already
  // holds and go straight to being made.
  later(function () {
    state.stack = [state.entry];
    // Nothing stops here any more. Matching collects its second chart before
    // the payment now, so by the time money has changed hands every report
    // has everything it needs and goes straight to being made.
    startMaking();
  }, 900);
}

/* The one door into paying. Every sell surface used to call openPay directly,
   which was right while all three reports were the same shape — read off a
   chart the app already holds, and buyable in one tap. Kundli Milan is not
   that shape: it needs his birth details, and those are worth more before the
   price than after it. So the gate sits here rather than in six places. */
function startBuy() {
  var r = reportById(state.pick);
  if (r.needsMatch && !owns(r.id)) { openMatch(); return; }
  openPay();
}

/* The form, every time Buy is tapped — not only the first time. Skipping it
   once the details are in looks like efficiency and is actually the one place
   this flow can take money for the wrong chart: the guna score is computed off
   four fields about a man, and the man can change between one tap and the
   next. A family puts a second rishta in front of her, she comes back, taps
   Buy, and a flow that remembers too well sells her a report about the
   previous one. Letting her see the four values before the price costs one
   extra tap and is the whole difference between a form and a receipt.

   So it is prefilled, never blank twice. The first open takes the chat's guess
   at his name, labelled as a guess; every open after that takes what she last
   typed, labelled as the thing she is confirming. */
function openMatch() {
  clearMatchErr();
  var hint = $('#mtHint');
  if (state.matched) {
    // Her own values, left exactly where she put them. Nothing is cleared:
    // changing one name should not cost her his birth time as well.
    hint.hidden = false;
    hint.textContent = 'These are the details you entered last time. ' +
      'Check them, or change them to match someone else.';
  } else {
    ['bName', 'bDob', 'bPlace', 'bTime'].forEach(function (id) { $('#' + id).value = ''; });
    $('#bName').value = state.suggested || '';
    hint.hidden = !state.suggested;
    hint.textContent = 'We have filled in ' + state.suggested +
      ' from your chat with Hemali. Change it if you meant someone else.';
  }
  show('match', 'fade');
}

/* The making run, pulled out of pay() so the matching form can call it when it
   is done rather than duplicating the sequence. */
function startMaking() {
  state.stack = [state.entry];
  show('timeline', 'fade');
  resetTimeline();
  later(runMaking, 350);
}

/* ---------------------------------------------------------------- R.4b matching form
   The button never greys out. A disabled CTA makes her hunt the page for what
   is missing; a live one can be the thing that finds it — and it marks one
   field, not four, because four red boxes is a page saying everything is wrong
   instead of a form saying look here. */
/* Reading order, not form order: the error lands on the first box she can see
   is empty, so date and time come before place now that they share a row. */
var MATCH_FIELDS = ['bName', 'bDob', 'bTime', 'bPlace', 'gName', 'gDob', 'gTime', 'gPlace'];
function clearMatchErr() {
  MATCH_FIELDS.forEach(function (id) { $('#' + id).closest('.fld').classList.remove('err'); });
}
function submitMatch() {
  clearMatchErr();
  for (var i = 0; i < MATCH_FIELDS.length; i++) {
    var el = $('#' + MATCH_FIELDS[i]);
    if (!el.value.trim()) {
      el.closest('.fld').classList.add('err');
      el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      el.focus({ preventScroll: true });
      toast('Fill this in to continue');
      return;
    }
  }
  // His name is used by name from here on. Everything downstream is about the
  // two of them, and "your match" where a name could stand is the app
  // forgetting what she just typed.
  state.boy = $('#bName').value.trim().split(' ')[0] || 'him';
  state.matched = true;
  /* Straight through to the sheet, with the score on it. Sending her back to
     the detail page first would make her tap Buy on a page that has nothing
     new on it, which reads as the form having done nothing. The detail page is
     restored underneath so the back gesture lands somewhere sensible, but what
     she sees is the number she just earned sitting above the price. */
  state.pick = 'marriage';
  renderReport();
  show('report', 'fade');
  later(openPay, 260);
}

/* ------------------------------------------------------------- journey */
function dayData() { return PM_JOURNEY[state.day]; }
/* The ask is live for four days and then retires for good, so the ₹49 price
   "ends tonight" on day 4. */
function lastDay() { return 4; }
function pmQuiet() { return !!dayData().quiet; }
/* Which surfaces today is allowed to use — renderers read this rather than
   guessing from the day number. */
function pmSurf() { return dayData().surf || {}; }
/* What she actually owns: whichever of the three she picked. */
function boughtTitle() { return reportById(state.pick).t; }
/* Five surfaces name the report she owns — detail page, "ready" push, sample
   cover, timeline card, book cover and the reader's own header. They used to
   be hard-coded to Marriage Yog, so picking Money and paying handed her
   somebody else's report. One writer keeps them honest. */
/* A clock for the history rows. Not the real time of day: the rest of this
   timeline is a scripted morning, so a live clock would be the one entry
   disagreeing with the others. It steps forward with each purchase instead. */
var BUY_TIMES = ['12:10 PM', '12:41 PM', '1:16 PM', '2:05 PM', '3:22 PM'];
function nowStamp() {
  return BUY_TIMES[Math.min(state.buys.length, BUY_TIMES.length - 1)];
}

/* Every purchase before the newest one. The newest keeps the card above, which
   is the one that animates from being made to being ready; these are settled,
   so they are the report, what it covers, and the way back into it. */
function renderBuys() {
  var host = $('#tlBuys');
  if (!host) return;
  host.innerHTML = state.buys.slice(1).map(function (b) {
    var r = reportById(b.id);
    return '<div class="tl-item">' +
      '<time>' + esc(b.time) + '</time>' +
      '<div class="card tl-card">' +
        '<div class="rep-top">' + book3d(r) +
          '<div>' +
            '<p class="eyebrow">Made by Astro Hemali for you</p>' +
            '<b>' + esc(r.t2 || 'Your ' + r.t + ' Report') + '</b>' +
            '<p class="rep-status green">' + (b.ed ? esc(b.ed) : 'Ready to read') + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="rep-acts">' +
          '<button class="btn outline" type="button" data-toast="Sharing is not part of this demo">Share</button>' +
          '<button class="btn primary" type="button" data-open-rep="' + r.id + '">Read Report</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

/* One <video> element serves every report that has a filmed hero, so the file
   and its speed are swapped rather than a second player being stacked behind
   the first. The id also rides on the element as a class, because each clip is
   framed differently and the crop belongs to the footage, not to the slot. */
function paintHeroVideo(r, src) {
  var v = $('.r2-vid');
  v.hidden = !src;
  REPORTS.forEach(function (x) { v.classList.toggle('vid-' + x.id, x.id === r.id && !!src); });
  if (!src) { v.pause(); return; }
  // Only re-point it when the file actually changes. Re-setting the same src
  // restarts the clip every time she opens the page, which on a slow loop
  // reads as a stutter on arrival.
  // No load() here: setting src already starts one, and the explicit call
  // resets the element a tick later — which paused the clip the play() below
  // had just started, leaving a still frame that looked like a broken video.
  if (v.getAttribute('src') !== src) v.setAttribute('src', src);
  // There is no attribute for playback rate, and the element forgets it each
  // time it loads a new file, so it is set on arrival as well as now.
  var rate = r.art.rate || 1;
  var start = function () {
    // She can pick a second report before the first file has arrived, which
    // leaves this waiting on a clip that is no longer on screen — and it would
    // wake up and set that one's speed on whatever is playing now.
    if (v.getAttribute('src') !== src) return;
    v.playbackRate = rate;
    var p = v.play();
    // Autoplay can still be refused; a held frame is what shows then.
    if (p && p.catch) p.catch(function () {});
  };
  if (v.readyState >= 1) start();
  else v.addEventListener('loadedmetadata', start, { once: true });
}

function paintBought() {
  var r = reportById(state.pick);
  var t = boughtTitle();
  $('#r2Title').textContent   = r.tl || 'Your ' + t + ' Report';
  $('#pushReadyTitle').textContent = 'Your ' + t + ' Report is ready';
  // The timeline card is the one surface with room for the report's full name,
  // and it is the card she taps to read — so it says the whole thing.
  $('#repTitle').textContent  = r.t2 || 'Your ' + t + ' Report';
  $('#repThumb').innerHTML    = book3d(r);
  $('#bookTitle').textContent = t;
}

function esc(s) {
  return String(s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
}

/* The one report today suggests. A three-row menu makes her choose before she
   has any reason to care; a single report tied to a house Hemali already named
   is a recommendation, and the other two stay one tap away. */
/* Pinned to one report rather than rotating a different one each day: one
   report, nudged until she takes it. Day 1 shows none of this — the free chat
   is the whole of day 1.
   Which one is now a demo switch rather than a constant, because the pitch
   reads differently depending on the book behind it: Partner has a face to
   promise, Kundli Milan has a score, Career has months. Reading them in the
   chat was the only way to tell whether the card works for all three or only
   for the one it was written against. The app still picks one and sticks to
   it — the switch just says which. */
function leadReport() { return reportById(state.lead); }

/* The pointers ARE the sell. A title and a house name tell her nothing; the
   list of questions tells her whether her own question is answered. So the
   same list rides every surface — chat, History, Today — cut to the top few
   with the remainder counted, so the report reads finite and worth ₹49. */
/* Same glyphs as "What you will get" on the detail page, off the same
   `licons`. The tick on a disc was the same mark four times over, which made
   the list read as terms and conditions — four identical boxes being ticked —
   when each line is a different question. The drawing is what tells them
   apart, and it is the one the detail page will show her next. */
function pointers(r, n) {
  var top = r.learn.slice(0, n), rest = r.learn.length - top.length;
  return '<ul class="pts">' +
    top.map(function (x, i) {
      var k = (r.licons || [])[i];
      return '<li><i aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
          'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
          (LI_ICON[k] || '<path d="M4.5 12.5 9.5 17.5 19.5 6.5"/>') +
        '</svg></i>' + esc(x) + '</li>';
    }).join('') +
    (rest > 0 ? '<li class="pts-more">+' + rest + ' more questions answered</li>' : '') +
  '</ul>';
}

/* The countdown and the live-buyer count are gone. A clock under a ₹49 report
   makes the report look like the thing that needs rescuing, and a number that
   climbs while you watch is the one element on the page nobody believes. */

/* 49 against 499, and what the 49 buys you forever. Said once per surface,
   directly under the list of questions it pays for. */
function priceRow() {
  return '<p class="of3-price"><s>₹499</s><b>₹49</b><i>90% OFF</i>' +
    '<em>one-time · yours forever</em></p>';
}

/* 1,28,880 -> "1,28,880". Indian grouping: last three, then pairs. */
function inr(n) {
  var s = String(n), last3 = s.slice(-3), rest = s.slice(0, -3);
  return rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3 : last3;
}

/* A closed book, turned so its spine faces her and carries the title the way a
   real one does. The open book was the wrong object to show: an open book is
   something already being read, and nothing about it says "not yours yet". */
/* Each report gets its own cover instead of all three sharing one book icon —
   on a shelf of three, the colourway is what tells them apart at a glance. */
var MOTIFS = {
  heart: '<path fill="currentColor" d="M20 30c-5.7-4.2-10-7.8-10-12.6 0-3 2.3-5.4 5.1-5.4 2 0 3.7 1.1 4.9 2.8 1.2-1.7 2.9-2.8 4.9-2.8 2.8 0 5.1 2.4 5.1 5.4C30 22.2 25.7 25.8 20 30z"/>',
  knot:  '<g fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="16" cy="21" r="6.4"/><circle cx="24" cy="21" r="6.4"/></g>',
  arrow: '<g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 27l6.5-6.5 4 4L30 15"/><path d="M23.5 15H30v6.5"/></g>'
};

/* The flat cover, for the places that only need the report's face at a glance —
   the chat bubble's thumbnail and the picker's row. */
function coverArt(r, cls) {
  var c = r.cover;
  // All three reports are painted now, so the drawn motif is only a fallback.
  if (r.art) {
    return '<span class="cv cv-art-on' + (cls ? ' ' + cls : '') + '" aria-hidden="true">' +
      '<img src="' + r.art.closed + '" alt="">' +
    '</span>';
  }
  return '<span class="cv' + (cls ? ' ' + cls : '') + '" aria-hidden="true"' +
    ' style="--cva:' + c.a + ';--cvb:' + c.b + ';--cvi:' + c.ink + '">' +
    '<svg class="cv-art" viewBox="0 0 40 52">' +
      '<circle class="cv-star" cx="9" cy="10" r="1"/>' +
      '<circle class="cv-star" cx="32" cy="14" r="1.5"/>' +
      '<circle class="cv-star" cx="29" cy="43" r="1"/>' +
      '<g transform="translate(0,5)">' + MOTIFS[c.motif] + '</g>' +
    '</svg>' +
  '</span>';
}

/* The drawn cover's face, for the reports with no painted artwork yet: the
   wash is the element's own background, the motif and its stars ride on top.
   Shared by the standing book and the History card's hinged one. */
function drawnFace(r, cls) {
  var c = r.cover;
  return '<span class="' + cls + '"' +
    ' style="--cva:' + c.a + ';--cvb:' + c.b + ';--cvi:' + c.ink + '">' +
    '<svg class="bk3-art" viewBox="0 0 40 52">' +
      '<circle class="cv-star" cx="9" cy="10" r="1"/>' +
      '<circle class="cv-star" cx="32" cy="14" r="1.5"/>' +
      '<circle class="cv-star" cx="29" cy="43" r="1"/>' +
      '<g transform="translate(0,5)">' + MOTIFS[c.motif] + '</g>' +
    '</svg>' +
  '</span>';
}

function book3d(r) {
  // The cover's own tint, carried on the root so the back board and the cast
  // shadow can both be mixed from it. A grey rim and a grey shadow under a
  // honey or periwinkle cover read as dirt rather than as a book.
  var tint = '--cva:' + r.cover.a + ';--cvb:' + r.cover.b;
  // Where the painted cover and its spread exist, show those instead: the art
  // is the argument, and a drawing of a book cannot make it.
  if (r.art) {
    return '<span class="bkt" aria-hidden="true" style="' + tint + '">' +
      // Everything that makes the case an object lives inside one preserve-3d
      // stage: back board, page block, then the cover in front of both.
      '<span class="bkt-in">' +
        '<span class="bkt-board"></span>' +
        '<span class="bkt-pages"></span>' +
        // The right-hand page of the spread, sitting under the cover.
        '<span class="bkt-leaf" style="background-image:url(' + r.art.open + ')"></span>' +
        // Loose leaves standing between the boards, each one deeper than the
        // last. Only the surfaces that open the cover show them; shut, they are
        // hidden behind it and the fore-edge block does the work instead.
        '<span class="bkt-pg" style="--i:3"></span>' +
        '<span class="bkt-pg" style="--i:2"></span>' +
        '<span class="bkt-pg" style="--i:1"></span>' +
        // The cover and the first leaf turn together: painted board on the
        // front, the spread's left-hand page on the back, so when it swings
        // the full 180 the book is lying open flat rather than ajar.
        '<span class="bkt-cov">' +
          '<span class="bkt-face" style="background-image:url(' + r.art.closed + ')"></span>' +
          '<span class="bkt-back" style="background-image:url(' + r.art.open + ')"></span>' +
        '</span>' +
      '</span>' +
      '<span class="bkt-sh"></span>' +
    '</span>';
  }
  return '<span class="bk3" aria-hidden="true" style="' + tint + '">' +
    '<span class="bk3-in">' +
      '<span class="bk3-board"></span>' +
      '<span class="bk3-pages"></span>' +
      // The leaf sits a hair behind the cover so that when the cover swings
      // open on the tease loop there is paper underneath, not a hole.
      '<span class="bk3-leaf"></span>' +
      '<span class="bk3-cov">' + drawnFace(r, 'bk3-face') + '</span>' +
    '</span>' +
    '<span class="bk3-sh"></span>' +
  '</span>';
}

/* Figma 3169:202620 — the upsell card, one component used both at the foot of
   the report page and at the end of the reader. Cover, title, the one-line
   promise, price with the saving as its own chip, then Buy now on the bottom
   edge. Both call sites render the identical card; only the list differs. */
function upsellCard(x) {
  // An owned card opens the report rather than its sales page. The label says
  // Read Report, and a button that says read and then shows a cover with a
  // price under it has not read anything.
  return '<button class="pcard" type="button" ' +
      (owns(x.id) ? 'data-open-rep="' : 'data-pick="') + x.id + '">' +
    book3d(x) +
    // Everything but the cover, in one column beside it. The card lies on its
    // side now: two books stacked one above the other, each a cover with its
    // own facts to the right, instead of two narrow columns side by side.
    // Side by side, a title as long as "Kundli Milan Marriage Compatibility"
    // had 159px to live in and took three lines, which pushed its rating, its
    // promise and its price out of step with the card next to it. Full width
    // the same title takes two, and the two cards cannot disagree about
    // heights because they no longer share a row.
    '<span class="pc-txt">' +
    // The long name, because the book is right above it. Partner is the only
    // report whose short name is shorter than its cover — the other two put
    // their whole title on the jacket — so this card was the one place the
    // artwork said "Your Future Partner" and the line under it said something
    // else. Everywhere else a cover sits beside a name already uses t2.
    '<b>' + esc(x.t2 || x.t + ' Report') + '</b>' +
    // The one number that decides between two books nobody has heard of. The
    // card showed a title, a promise and a price — the same three things on
    // both — so there was nothing on it to choose by.
    // The star is its own element so it can take the rating gold. Sharing the
    // line's colour made it ink-black here while the same star was gold on the
    // sell page and in the reviews.
    '<span class="pc-rt">' + STAR + ' ' + esc(x.rating) +
      ' <s>\u00b7 ' + inr(x.sold) + ' reads</s></span>' +
    // No promise line. This card is a cross-sell at the foot of a page that
    // has already sold one of these books, so its job is to name the other
    // two and price them, not to pitch them a second time — the pitch is one
    // tap away on the page it opens. Two lines of grey between the rating and
    // the price only pushed the price down and made the card a paragraph.
    // Once it is hers the card stops selling. The price row goes — a discount
    // beside a book she has already paid for is the page asking a second
    // time — and the button becomes the way back into it. Career keeps a price
    // because its quarter runs out, so there is a real next edition to buy.
      // Price and button on one line, because the column is wide enough to
      // hold both now. Stacked, they made a card on its side as tall as the
      // upright one was and gave the row no footing.
      '<span class="pc-foot">' +
        (owns(x.id) && x.cadence !== 'quarterly' ? '' :
          '<span class="pc-pr">' +
            // Struck price first, then what it costs. Read left to right that
            // is the sentence the discount actually makes — it was 499, it is
            // 49 — and the number she pays is the one the eye stops on,
            // because it is the last and the largest. The other way round the
            // 499 trailed the 49 like a footnote.
            '<i><s>\u20b9499</s><em>\u20b949</em></i>' +
            '<span class="pc-off">90% OFF</span>' +
          '</span>') +
        '<span class="pc-btn">' + (owns(x.id) ? 'Read Report' : 'Buy now') + '</span>' +
      '</span>' +
    '</span>' +
  '</button>';
}

/* The report's own artwork as the backdrop, the closed book standing in it, the
   title and the numbers beside it — composed as a card, not as a miniature of
   the report page. */
function sellCard(r) {
  return '<button class="sell-hit" type="button" data-pick="' + r.id + '">' +
    '<span class="sell-hero">' +
      book3d(r) +
      '<span class="sell-hd">' +
        '<b class="sell-t">' + esc(r.t) + '</b>' +
        '<span class="sell-stats">' +
          '<em><b>' + r.rating + '</b>' + STAR + ' · ' + r.pages + ' pages</em>' +
          '<em><b>' + inr(r.sold) + '</b> readers</em>' +
        '</span>' +
      '</span>' +
    '</span>' +
    '<span class="sell-body">' +
      '<span class="sell-why">' + esc(r.why) + '</span>' +
    '</span>' +
  '</button>';
}

/* The PM brief's offer as it lands in the chat, built to the board at
   3088:160535: a 288-wide bubble, the painted banner carrying the title and
   the rating, the book standing proud of the top-right corner, then the
   pointers and one price row. */
function offer3Card() {
  // Once she owns one, the offer leaves the thread entirely — segueCard() is
  // the follow-up, and two follow-ups in a row is one too many.
  if (state.paid) return '';
  var r = leadReport();
  // The whole card is the link to the detail page; only Buy Now jumps the
  // queue straight to payment.
  return '<div class="of3" role="button" tabindex="0" data-pick="' + r.id + '">' +
    // Inline, because the colour belongs to the report rather than to the card
    // and there is exactly one of these on screen at a time.
    '<div class="of3-head" style="background:' + r.tint + '">' +
      '<div class="of3-ttl">' + esc(r.t2 || r.t + ' Report') + '</div>' +
      // The green dot is switched off in the frame, and rightly so: it says
      // "live" next to a rating, which is the one thing a rating is not.
      '<div class="of3-badge">' +
        // Star inside the `b`, not beside it. As a sibling it took the badge's
        // 8px gap — the same distance as the separator — so 4.7 and its star
        // looked no more related to each other than to the reader count.
        '<b>' + r.rating + STAR + '</b>' +
        '<i class="of3-sep"></i>' +
        '<b>' + inr(r.sold) + ' readers</b>' +
      '</div>' +
    '</div>' +
    // Stands proud of the top-right corner and hinges on its spine, so the
    // card has one thing moving and it is the thing being sold.
    '<span class="of3-bkw" aria-hidden="true">' +
      '<span class="of3-leaf"' +
        (r.art ? ' style="background-image:url(' + r.art.open + ')"' : '') + '></span>' +
      '<span class="of3-cov">' +
        '<img class="of3-bk" src="' + (r.art ? r.art.closed : '') + '" alt="">' +
        '<span class="of3-back"' +
          (r.art ? ' style="background-image:url(' + r.art.open + ')"' : '') + '></span>' +
      '</span>' +
    '</span>' +
    '<div class="of3-pts">' + pointers(r, 3) + '</div>' +
    // Kundli Milan asks before it sells. It is the one report that cannot be
    // written off a chart the app already holds, so the first thing it needs
    // from her is his birth details - and a price next to a Buy Now is the
    // wrong way to ask for twenty seconds of typing. The foot becomes the
    // question instead: calculate the match, free, and the number comes back
    // on the other side of it. The price arrives once there is something to
    // put it against.
    '<div class="of3-foot' + (matchFirst(r) ? ' of3-foot-ask' : '') + '">' +
      (matchFirst(r)
        ? '<button class="of3-go wide" type="button" data-buy="' + r.id + '">' +
            'Calculate Guna Match \u00b7 Free</button>'
        : '<div class="of3-price"><span><b>₹49</b><s>₹499</s></span><i>90% OFF</i></div>' +
          '<button class="of3-go" type="button" data-buy="' + r.id + '">Buy Now</button>') +
    '</div>' +
  '</div>';
}

/* True while a report still owes a second chart. Every sell surface asks it,
   because the question they put to her changes shape: the other two are a
   price and a Buy Now, this one is a free calculation she has not run yet. */
function matchFirst(r) { return !!r.needsMatch && !state.matched && !owns(r.id); }

/* The same offer where History shows it, per 3077:159093 — not the chat card
   shrunk down, but a message from Hemali: her face, her rate, and the pitch
   in a peach bubble with the book leaning out of it. */
function histCard(r) {
  // The rate pills are off in 3111:201206 — this card sells the report, and a
  // per-minute price next to her name sells the chat instead.
  return '<div class="hw" role="button" tabindex="0" data-pick="' + r.id + '">' +
    '<div class="hw-top">' +
      '<span class="hw-av"><img src="assets/hemali.png" alt=""><i></i></span>' +
      '<span class="hw-who">' +
        '<span class="hw-line"><b>Astro Hemali</b></span>' +
        '<small>Made from your birth chart</small>' +
      '</span>' +
    '</div>' +
    '<div class="hw-bub">' +
      '<div class="hw-row">' +
        '<span class="hw-tx">' +
          '<b>Mansi, ' + esc(r.t2 || r.t + ' Report') + '</b>' +
          '<small>' + r.learn.length + ' questions answered</small>' +
        '</span>' +
        // Shut, with its page block showing on the right — the same object the
        // chat offer sells, at rest.
        '<span class="hw-bkw" aria-hidden="true">' +
          '<span class="hw-leaf"' +
            (r.art ? ' style="background-image:url(' + r.art.open + ')"' : '') + '></span>' +
          '<span class="hw-cov">' +
            (r.art
              ? '<img class="hw-bk" src="' + r.art.closed + '" alt="">'
              // No painted cover yet: the drawn one stands in, so the hinge
              // never swings an empty frame over the leaf.
              : drawnFace(r, 'hw-bk bk3-face')) +
            '<span class="hw-back"' +
              (r.art ? ' style="background-image:url(' + r.art.open + ')"' : '') + '></span>' +
          '</span>' +
        '</span>' +
      '</div>' +
      '<button class="hw-go" type="button" data-pick="' + r.id + '">Learn More</button>' +
    '</div>' +
  '</div>';
}

/* Figma 3203:205266 — on Today the report rides the expert card as a ticket
   stub: a dashed perforation, a notch bitten out of each edge of the white
   card, then one row. The History widget used to be dropped in here whole,
   which put Hemali's face and name on the card twice and ran it to 383px. */
function exTicket(r) {
  return '<button class="ex-tkt" type="button" data-pick="' + r.id + '">' +
    '<i class="tk-n tk-l" aria-hidden="true"></i>' +
    '<i class="tk-n tk-r" aria-hidden="true"></i>' +
    (r.art
      ? '<img class="tk-bk" src="' + r.art.closed + '" alt="">'
      : drawnFace(r, 'tk-bk bk3-face')) +
    '<span class="tk-t">' +
      // Off the report, not off its id. "Your marriage report is ready" named a
      // folder; the line under it said who made it, which the card already says
      // twice. Now the stub names the book and tells her what is inside it.
      '<b>' + esc(r.tkt.t) + '</b>' +
      '<small>' + esc(r.tkt.s) + '</small>' +
    '</span>' +
    '<i class="tk-go" aria-hidden="true">' +
      '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.9 7h8.2m-3.3-3.3L11.1 7l-3.3 3.3" stroke="#F28761" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
    '</i>' +
  '</button>';
}

function renderChat() {
  $('#chatThread').innerHTML = dayData().msgs.map(function (m) {
    if (m.who === 'sys')    return '<p class="c-sys">' + esc(m.text) + '</p>';
    if (m.who === 'ended')  return '<p class="c-end">' + esc(m.text) + '</p>';
    if (m.who === 'gap')    return '<p class="c-gap"><span>' + esc(m.text) + '</span></p>';
    if (m.who === 'offer3') return offer3Card();
    if (m.who === 'remind') return remindCard();
    // A bubble that pitches takes its words off the report being pitched, so
    // the sentence and the card under it always name the same house. Pitches
    // arrive as three lines - why now, what you learn, what buying gets you -
    // and each becomes its own paragraph inside the one bubble, because this
    // is one message from Hemali, not three pings.
    var txt = m.pitch ? leadReport()[m.pitch === 'long' ? 'pitchLong' : 'pitch'] : m.text;
    var body = [].concat(txt).map(function (line) { return '<p>' + esc(line) + '</p>'; }).join('');
    return '<div class="c-b ' + m.who + '">' + body + '<time>02:24 PM</time></div>';
  }).join('') + (state.paid ? segueCard() : '');
}

/* Live thread helpers — only the post-purchase follow-up appends to the chat
   after render, so they stay small and local to it. */
function bubble(who, text) {
  var el = document.createElement('div');
  el.className = 'c-b ' + who;
  el.innerHTML = '<p>' + esc(text) + '</p><time>02:41 PM</time>';
  return el;
}
function scrollChat() {
  var sc = $('#chat [data-scroll]');
  if (sc) requestAnimationFrame(function () { sc.scrollTop = sc.scrollHeight; });
}
function typing(done) {
  var el = document.createElement('div');
  el.className = 'c-b hemali c-typing';
  el.innerHTML = '<span></span><span></span><span></span>';
  $('#chatThread').insertBefore(el, $('#sgChips'));
  scrollChat();
  later(function () { el.remove(); done(); }, 900);
}

/* Brief point 6: the report has to end in a conversation, not a full stop.
   Once she owns one, the thread picks up where the report left off and hands
   her the three questions that report actually leaves people with. */
function segueCard() {
  var r = reportById(state.pick);
  return '<div class="c-b hemali"><p>Mansi, your <b>' + esc(r.t) +
      '</b> report is open. If any part needs explaining, or you want the remedies, ask me right here.</p>' +
      // The way back in, said here too. The thread is where she left the report
      // to come and ask, so the one thing it should be able to do is give it
      // back — the offer that used to sit in this spot was selling a book she
      // has already paid for.
      '<button class="sg-read" type="button" data-open-rep="' + r.id + '">Read Report</button>' +
      '<time>02:41 PM</time></div>' +
    '<div class="sg" id="sgChips">' +
      '<p class="sg-h">Ask beyond the report</p>' +
      r.ask.map(function (x, i) {
        return '<button class="sg-q" type="button" data-ask="' + i + '">' + esc(x.q) + '</button>';
      }).join('') +
    '</div>';
}

/* History is the brief's third surface — the same three reports, and once
   bought the purchased report stays here for good (tlReport). */
function renderHistCard() {
  // Once the nudging stops the reports do not disappear — they become a
  // shelf. Nothing asks; the row is simply still there when the problem
  // arrives, which for a report is often weeks later.
  var shelf = !state.paid && pmQuiet();
  var show3 = !state.paid && !!pmSurf().hist;
  $('#tlChap').hidden = !(show3 || shelf);
  if (shelf) {
    $('#tlChapCard').innerHTML =
      '<div class="rep-top quiet">' +
        '<img src="assets/book.svg" alt="">' +
        '<div>' +
          '<p class="eyebrow">Saved on your chart</p>' +
          '<b>3 reports</b>' +
          '<p class="rep-status">' + REPORTS.map(function (x) { return x.t; }).join(' · ') + '</p>' +
        '</div>' +
        '<button class="lnk-btn" type="button" data-go="picker">View</button>' +
      '</div>';
    return;
  }
  if (!show3) return;
  // The board at 3077:159093 shows this as a message from Hemali, not a second
  // storefront: her face, her rate, and the pitch in a peach bubble.
  $('#tlChapCard').innerHTML = histCard(leadReport());
}

/* Tomorrow's reason to return: the free chat and the next coin. */
function remindCard() {
  if (state.reminded) {
    return '<div class="rm-card done"><p>🔔 Done. We will tell you the moment tomorrow\'s free chat is ready.</p></div>';
  }
  return '<div class="rm-card">' +
    '<p>Tomorrow you get <b>2 minutes free chat</b> again, and ₹11 on the check-in. Shall we remind you?</p>' +
    '<button class="btn sm primary" type="button" data-remind>🔔 Yes, remind me</button>' +
  '</div>';
}

/* Every day lands unanswered, per the daily reward board: the check-in is the
   day's one job, and Hemali's reply (with the report in it) is what answering
   buys. Until then the chapter sits on the expert card — the one surface that
   is already hers and already on screen. */
function renderDayToday() {
  var day = state.day, r = REWARD[day];
  $('#countdownLine').innerHTML = dayData().countdown;
  $('#checkinCard').hidden  = state.answered;
  $('#answeredCard').hidden = !state.answered;
  // Two lines by hand, as in Figma: the break keeps "wallet" clear of the
  // coin stack parked in the title row's top-right corner.
  $('#checkinTitle').innerHTML =
    'Day ' + day + ' · Answer to get<br><span class="amt">₹' + r + '</span> in your wallet';
  $('#answeredTitle').innerHTML =
    'Day ' + day + ' · <span class="amt">₹' + r + '</span> added to your wallet';
  // The ladder has to agree with the card: today is not collected until she answers.
  state.claimed = state.answered ? day : day - 1;
  renderLadder();

  // Today carries the offer in the expert card on every nudging day (the brief
  // puts it there alongside Chat and History), with the guidance tile from
  // day 2. Day 5 is the stop — every surface goes quiet.
  var sf = pmSurf();
  if (!state.paid) {
    $('#expertSlot').hidden = !sf.today;
    // The guidance tile is the one permanent surface: it is a tile among tiles,
    // not a nudge, so it stays put all five days while the louder cards come
    // and go.
    $('#guideSlot').hidden = false;
    renderGuideTile();
    // Hiding the slot is not enough — yesterday's countdown would survive in
    // the DOM and reappear the moment anything unhid it.
    if (!sf.today) { $('#expertSlot').innerHTML = ''; return; }
    $('#expertSlot').innerHTML = exTicket(leadReport());
    return;
  }

  // Bought: the expert card goes back to being only the expert. The report she
  // owns already has a row of its own in Personalised Guidance, with the same
  // title, the same Ready pill and the same destination — two of them on one
  // screen was the same tap offered twice.
  $('#expertSlot').hidden = true;
  $('#expertSlot').innerHTML = '';
  $('#guideSlot').hidden  = false;
  renderGuideTile();
}

/* The report as one tile among her guidance — same object as the tarot and
   prediction tiles. */
function renderGuideTile() {
  // Personalised Guidance is always two tasks. From day 2 the first of them is
  // the report; on day 1, which carries no report anywhere, kundli matching
  // stands in so the section is never a single lonely tile.
  var report = state.paid || state.day > 1;
  $('#guideAlt').hidden = report;
  $('#guideSlot').hidden = !report;
  if (!state.paid) {
    // Clearing as well as hiding: switching back from a later day would
    // otherwise leave that day's tile sitting in the DOM.
    if (state.day === 1) { $('#guideSlot').hidden = true; $('#guideSlot').innerHTML = ''; return; }
    // From day 2 the tile sells the one report, Partner Prediction — not a
    // "2 more reports" bundle. No price chip: the tarot and prediction tiles
    // carry a title, a line and a chevron, and this is the same object.
    var lead = leadReport();
    $('#guideSlot').innerHTML =
      '<button class="tile" type="button" data-pick="' + lead.id + '">' +
        book3d(lead) +
        '<span class="tt"><b>' + esc(lead.t) + '</b><small>' + esc(lead.s) + '</small></span>' +
        '<svg class="arr" width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3.5 8h8.5M8.5 4.2 12.3 8l-3.8 3.8" stroke="#475467" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</button>';
    return;
  }
  $('#guideSlot').innerHTML =
    '<button class="tile" type="button" data-go="read">' +
      book3d(reportById(state.pick)) +
      '<span class="tt"><b>' + esc(boughtTitle()) + '</b>' +
        '<small>Full report open \u2713 \u2014 ask Hemali for the remedies</small></span>' +
      '<i class="tag green">Ready</i>' +
      '<svg class="arr" width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3.5 8h8.5M8.5 4.2 12.3 8l-3.8 3.8" stroke="#475467" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
    '</button>';
}

/* ---------------------------------------------------------------- PM: picker + preview */
/* The brief's shop front: three reports, she picks. */
function renderPicker() {
  // All three cost the same, so repeating ₹49 three times only flattens the
  // choice. Price moves to one strip above the list; the cards are then about
  // which problem she has, and the chevron is the only thing on the right.
  $('#pkList').innerHTML = REPORTS.map(function (r) {
    return '<button class="pk-card" type="button" data-pick="' + r.id + '">' +
      coverArt(r, 'cv-md pk-bk') +
      '<span class="pk-t">' +
        '<b>' + esc(r.t) + '</b>' +
        '<small>' + esc(r.s) + '</small>' +
        '<span class="pk-meta"><i class="pk-n">' + r.learn.length + ' questions answered</i>' +
          r.pages + ' pages</span>' +
      '</span>' +
      '<em class="pk-chev" aria-hidden="true">›</em>' +
    '</button>';
  }).join('');
}

/* The sell page. The hero GIF and the cover swinging open off its spine are
   this page's entire first impression. Nothing is locked: the pointers say what
   the report answers, and then the ENTIRE report follows, rendered on a demo
   chart. She learns the depth from the sample and that it is about her from the
   pointers. */
function renderReport() {
  var r = reportById(state.pick);
  /* Generic, always, including after the match has been run. This page used to
     rewrite itself around her 28 and it was the wrong place for it: a detail
     page is the shop window, and a shop window that has already handed over
     the headline number has nothing left to sell. It is also the one surface
     she can reach without having said anything to Hemali - from Timeline, from
     a push, from History - so personalising it meant the app naming a man she
     had not named to it yet.

     So the number moves to the pay sheet, where it is read with a price next
     to it, and this page keeps one job: tell her what a milan answers, and
     point at the form. See `paysGuna` in openPay. */
  // The pick has just changed, so every surface that names the report she is
  // buying — this title included — has to be rewritten with it.
  paintBought();
  // The hero is the closed cover of the report she is looking at — the same
  // object the chat bubble and the upsells show, just larger.
  // The sample door, on the book rather than in the header. As a Preview pill
  // in the nav it was a word floating over artwork, naming nothing she could
  // see; sitting on the open spread it points at the exact pages it opens, and
  // the book stops being a picture and becomes the thing you tap. It is a
  // sibling of the spread inside the same wrapper, so it moves with the book.
  $('#r2Book').innerHTML = book3d(r) +
    '<button class="r2-bk-samp" type="button" id="r2BookSample">' +
      '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
        '<path d="M1 8s2.6-4.5 7-4.5S15 8 15 8s-2.6 4.5-7 4.5S1 8 1 8Z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<circle cx="8" cy="8" r="1.9" stroke="currentColor" stroke-width="1.4"/></svg>' +
      'Sample report</button>';
  // Partner's hero moves; the other two are painted stills out of the same
  // board. `has-bg` is what stops the couple's clip and its rose wash from
  // showing through a ground that is neither pink nor about a couple.
  var hero = $('#r2Hero');
  var vid = r.art && r.art.video;
  // A painted ground only where there is no film. Career still has one.
  hero.classList.toggle('has-bg', !!(r.art && r.art.hero && !vid));
  hero.style.backgroundImage = r.art && r.art.hero && !vid ? 'url(' + r.art.hero + ')' : '';
  // Each still is framed on its own subject, so the crop is part of the art
  // rather than one rule for all of them. Blank falls back to the CSS default.
  hero.style.backgroundPosition = (r.art && r.art.heroPos) || '';
  paintHeroVideo(r, vid);
  // Was hard-coded, so picking Money or Marriage still showed the Partner
  // report's reader count. One number, read off the report being shown.
  $('#r2Reads').textContent = inr(r.sold);
  /* The one line that changes on this page, and it changes by report and not
     by state: Kundli Milan needs two charts, so saying so here is the page
     being honest about what the button is going to ask for rather than a
     form appearing out of nowhere after the tap. */
  $('#r2Lead').textContent = r.needsMatch
    ? r.s + '. Add both sets of birth details and Astro Hemali reads the two charts together.'
    : r.s + '. Astro Hemali makes it from your birth chart.';
  // Two kinds of chip, drawn as one until now. The first are what only this
  // report has; the last three are true of everything we sell. Flat grey pills
  // made "36 guna match" look like the word "Private", so the report's own
  // terms take the brand tint and a star, and the standard three stay quiet
  // with the drawing that says which of them it is.
  var CHIP_IC = {
    key:   '<path d="M6 1 7.3 4.5 10.8 5.8 7.3 7.1 6 10.6 4.7 7.1 1.2 5.8 4.7 4.5z"/>',
    pages: '<path d="M2 2.2h3c.7 0 1 .4 1 1V10c0-.5-.4-.9-.9-.9H2zM10 2.2H7c-.7 0-1 .4-1 1V10c0-.5.4-.9.9-.9H10z"/>',
    share: '<path d="M9 1.6a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8M3 4.6a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8M9 7.6a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8M4.3 5.4l3.4-1.7M4.3 6.6l3.4 1.7"/>',
    lock:  '<path d="M2.7 5.3h6.6v5H2.7zM4.3 5.3V3.7a1.7 1.7 0 0 1 3.4 0v1.6"/>'
  };
  function chip(label, kind) {
    return '<span class="' + (kind === 'key' ? 'ch-key' : 'ch-std') + '">' +
      '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1" ' +
        'stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">' +
        CHIP_IC[kind] + '</svg>' + esc(label) + '</span>';
  }
  $('#r2Chips').innerHTML =
    r.chips.map(function (c) { return chip(c, 'key'); }).join('') +
    chip(r.pages + ' pages', 'pages') + chip('Shareable', 'share') + chip('Private', 'lock');
  var learn  = r.learn;
  var licons = r.licons;
  $('#r2Learn').innerHTML =
    '<h2 class="r2-h">' + esc(r.needsMatch ? 'What The Milan Answers' : 'What You Will Get') + '</h2>' +
    '<ul class="r2-learn">' +
      learn.map(function (x, i) {
        // Falls back to the tick if a report is ever short an icon key, so a
        // missing entry costs a drawing rather than a blank left column.
        var k = (licons || [])[i];
        return '<li><i aria-hidden="true">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
            (LI_ICON[k] || '<path d="M4.5 12.5 9.5 17.5 19.5 6.5"/>') +
          '</svg></i>' + esc(x) + '</li>';
      }).join('') +
    '</ul>';
  $('#r2Revs').innerHTML = r.revs.map(function (v) {
    return '<div class="review">' +
      '<i class="rv-stars">' + STAR.repeat(v.s) + STAR_OFF.repeat(5 - v.s) + '</i>' +
      '<p>\u201c' + esc(v.q) + '\u201d</p>' +
      '<b>' + esc(v.n) + '</b></div>';
  }).join('');
  // The strip starts parked on the first card, so that one is already snapped.
  markSnappedReview($('#r2Revs'));
  $('#r2AlsoList').innerHTML = REPORTS.filter(function (x) { return x.id !== r.id; })
    .map(upsellCard).join('');
  $('#r2Why').textContent = r.why;
  // The board says "Buy Now" and nothing else. The price is already sitting
  // beside the button, so repeating ₹49 inside it only crowds the line.
  // Once it is hers the bar stops being a shop. A price next to a book she has
  // already paid for is the page asking a second time, so the whole price
  // block goes and the button becomes the way back in. Career is the one that
  // can still sell: the window it covers runs out, so the next edition is a
  // real thing to buy and it goes beside Read rather than instead of it.
  var mine = owns(r.id);
  var repeat = mine && r.cadence === 'quarterly';
  $('.buy-row', $('#report')).classList.toggle('owned', mine);
  $('#r2Price').hidden = mine;
  $('#r2Again').hidden = !repeat;
  $('#r2Again').textContent = 'Buy ' + editionLabel(r);
  /* Buy Now on its own is a lie on a button that opens a form, but dropping it
     is the other mistake: a button that only promises a form reads as one more
     step before the real one, and she is being asked to pay the price sitting
     next to it. So the button says both, in the order they happen. */
  /* Enter the first time, Confirm after. The same screen is doing a different
     job once her answers are in it, and a button still saying Enter would read
     as the app having lost them. */
  $('#r2Cta').textContent = mine ? 'Read Report'
    : !r.needsMatch ? 'Buy Now'
    : state.matched ? 'Confirm Details \u0026 Buy Now'
    : 'Enter Details \u0026 Buy Now';
  $('#r2Cta').classList.toggle('outline', repeat);
  $('#r2Cta').classList.toggle('primary', !repeat);
}

/* Per the board's J1: answering opens the reward sheet — coin, ladder with
   today claimed, tomorrow's amount as the comeback reason. Day 3 swaps the
   comeback line for the deadline. */
function openRewardSheet() {
  $('#rewardTitle').textContent = '₹' + REWARD[state.day] + ' added to your wallet!';
  if (state.day < lastDay()) {
    $('#rewardSub').textContent = 'Your wallet is now ₹' + state.wallet +
      '. Come back tomorrow for ₹' + REWARD[state.day + 1] + ' more.';
    $('#rewardCta').textContent = 'Remind me for tomorrow';
  } else {
    $('#rewardSub').textContent = 'One more thing. The ₹49 price on the report ends tonight. Back to ₹499 tomorrow.';
    $('#rewardCta').textContent = 'Unlock full report · ₹49';
  }
  openSheet('reward');
}

/* The intro sheet fires once, on the scroll past the free-chat section, exactly
   as the daily reward board specifies. Day 1 only — by day 2 she has seen it. */
function armIntroSheet() {
  var sc = $('#today-a [data-scroll]'), experts = $('#today-a .expert-card');
  if (!sc || !experts) return;
  sc.removeEventListener('scroll', onTodayScroll);
  state.introShown = state.day !== 1;
  if (state.day === 1) sc.addEventListener('scroll', onTodayScroll);
}
/* "Past the free chat section" in practice means the check-in has come into
   view — waiting for the expert card to leave the screen entirely needs another
   full screen of scrolling, by which point she is already somewhere else. */
function onTodayScroll() {
  // state.answered: once she has answered, the intro has nothing left to sell —
  // and it must not steal the reward sheet that is opening at the same moment.
  if (state.introShown || state.answered || state.screen !== 'today-a') return;
  var card = $('#checkinCard'), sc = $('#today-a [data-scroll]');
  if (card.getBoundingClientRect().top > sc.getBoundingClientRect().bottom - 80) return;
  state.introShown = true;
  openSheet('intro');
}

/* Demo chrome: the selected day's touchpoints, as chips docked right under its
   card in the switcher — tap one to jump the phone to that surface. */
function renderTpTabs() {
  var old = $('.switcher .tp-wrap');
  if (old) old.parentNode.removeChild(old);
  $$('.switcher .has-tp').forEach(function (b) { b.classList.remove('has-tp'); });
  var host = $('.switcher [data-day].on');
  if (!host) return;

  var tabs;
  if (state.paid) {
    // Post-purchase: every sell surface has retired into the follow-up.
    tabs = [
      { id: 'today',   l: 'Today \u00b7 read your report' },
      { id: 'chat',    l: 'Chat \u00b7 continue chat' },
      { id: 'read',    l: 'Full report' },
      { id: 'upsell',  l: 'Report end \u00b7 upsell' },
      { id: 'history', l: 'History \u00b7 report ready' }
    ];
  } else {
    // The tabs ARE the schedule: only the surfaces today actually uses, named
    // so a PM can see at a glance what day 1 does and day 2 does not.
    var sf = pmSurf();
    tabs = [];
    if (dayData().push) tabs.push({ id: 'push', l: 'Notification \u00b7 +15 min' });
    if (sf.chat)  tabs.push({ id: 'chat',    l: state.day === 1 ? 'Chat \u00b7 offer at +15 min' : 'Chat \u00b7 offer' });
    if (sf.today) tabs.push({ id: 'today',   l: 'Today \u00b7 expert card' });
    if (sf.guide) tabs.push({ id: 'guide',   l: 'Today \u00b7 personalised' });
    // History, the picker and the report page are deliberately not listed:
    // they are destinations, and jumping straight to one skips the only thing
    // the demo is meant to show — how she gets there.
    if (!tabs.length) tabs.push(
      { id: 'today',   l: 'Today \u00b7 nothing asks' },
      { id: 'chat',    l: 'Chat \u00b7 nothing asks' });
    // No "Daily reward · answered" chip: the check-in card is right there on
    // Today and answering it by hand is the honest way to see that state.
    if (repToastDays()) tabs.push({ id: 'toast', l: 'Toast \u00b7 Hemali\u2019s knock' });
    if (state.day === 1) tabs.push({ id: 'counter', l: 'Counter \u00b7 header + History' });
  }

  var wrap = document.createElement('div');
  wrap.className = 'tp-wrap';
  wrap.innerHTML =
    '<p class="tp-note">Touchpoints: ' +
      (state.paid ? 'report bought · every surface is the follow-up'
        : pmQuiet() ? 'nudging has stopped, the report only sits in her guidance'
        : 'one report a day · ₹49, sample on a demo chart') + '</p>' +
    '<div class="tp-tabs">' + tabs.map(function (t) {
      return '<button type="button" data-tp="' + t.id + '">' + t.l + '</button>';
    }).join('') + '</div>';
  host.classList.add('has-tp');
  host.insertAdjacentElement('afterend', wrap);
}

/* Answering flips the card to the replied state — the moment Hemali gets a
   bubble and the report moves into it — and pays the day's reward. Idempotent,
   because the demo chips can call it on a day she has already answered. */
function answerCheckin() {
  if (state.answered) return;
  state.answered = true;
  state.wallet += REWARD[state.day];
  paintWallet();
  renderDayToday();
  renderChat();
}

/* Picking a day rewinds the whole demo to that morning: day 1 starts in the
   chat that just ran out, later days start on Today the way she would land. */
function setDay(n) {
  state.day = n;
  $$('.switcher [data-day]').forEach(function (b) {
    b.classList.toggle('on', +b.getAttribute('data-day') === n);
  });
  restart();
}

/* Swapping the pitched report rewinds the same way picking a day does. It has
   to: the push line, the expert ticket, the History chapter and the chat card
   are all written in the day's script and half of them are already on screen by
   the time this is tapped, so re-rendering in place would leave one surface
   selling Kundli Milan and the next still selling Partner. */
function setLead(id) {
  state.lead = id;
  $$('.switcher [data-lead]').forEach(function (b) {
    b.classList.toggle('on', b.getAttribute('data-lead') === id);
  });
  restart();
}

/* A demo control, not a feature. The wallet is normally whatever the daily
   reward has added up to by the day being shown, so there is no way to stand
   on the pay sheet and watch the three endings it has - pays the whole bill,
   pays part of it, pays none of it - without replaying five days three times.
   Set in place rather than through restart(), because the point of it is to
   change the number on a sheet that is already open. */
function setWallet(n) {
  state.wallet = n;
  $$('.switcher [data-wset]').forEach(function (b) {
    b.classList.toggle('on', +b.getAttribute('data-wset') === n);
  });
  paintWallet();
  paintPaySum();
}

/* ---------------------------------------------------------------- reset */
function restart() {
  clearTimers();
  closeSheet();
  hidePush();
  state.answered = false;
  state.wallet = WALLET_AT[state.day];
  // The day owns the balance again, so the override stops being highlighted.
  $$('.switcher [data-wset]').forEach(function (b) { b.classList.remove('on'); });
  state.lang = 'en';
  state.langFrom = 'sample';
  state.paid = false;
  // The shelf empties with everything else. A leftover "Read Report" on a day
  // that has not been paid for is the demo contradicting itself.
  state.owned = [];
  state.buys = [];
  state.reminded = false;
  state.repToastSeen = false;
  state.repToastPending = false;
  hideRepToast();
  state.pick = 'partner';
  // The counter is day 1 only — that is the morning the chapter lands in
  // History. After that the badge has nothing new to count.
  state.histDot = state.day === 1;
  state.stack = [];
  renderNav();
  $('#notifDlg').hidden = true;
  paintWallet();
  paintBought();
  renderSample();
  renderRead();
  renderChat();
  renderPicker();
  renderReport();
  renderDayToday();
  renderTpTabs();
  renderHistCard();
  renderBuys();
  armIntroSheet();
  resetTimeline();
  applyPaidTimeline();
  $('#bookEl').classList.remove('turn', 'open');
  $('#bookStage').classList.remove('gone', 'lit');
  $('#blaze').className = 'blaze';
  show(state.entry, 'fade');
  // The notification no longer fires on load. It is a touchpoint, not a page
  // state, so it belongs to its own chip — otherwise it lands on top of
  // whatever surface the chips were actually opened to look at.
}

/* ---------------------------------------------------------------- push note */
function showPush() {
  var el = $('#pushNote');
  $('#pushText').textContent = leadReport().push;
  el.hidden = false;
  requestAnimationFrame(function () { el.classList.add('on'); });
  later(hidePush, 6000);
}
function hidePush() {
  var el = $('#pushNote');
  el.classList.remove('on');
  setTimeout(function () { if (!el.classList.contains('on')) el.hidden = true; }, 300);
}

/* ---------------------------------------------------------------- wiring */
document.addEventListener('click', function (e) {
  var t = e.target.closest('[data-go],[data-back],[data-sheet],[data-toast],[data-close-sheet],[data-day],[data-lead],[data-wset],[data-lang],[data-nav],[data-mood],[data-remind],#answerNow,#restart,#showSample,#r2ViewSample,#r2BookSample,#repToastSee,#repToastX,#r2Cta,#r2Again,#mtGo,#paySubmit,#paysLang,#buyInLang,[data-chat],#push,#pushNote,#scrim,#rewardCta,#notifYes,#notifNo,[data-tp],[data-pick],[data-buy],[data-open-rep],[data-ask],[data-jump],.rsc-go');
  if (!t) return;

  /* The jump index. scrollIntoView does nothing here — the sample scrolls
     inside its own [data-scroll] and the whole phone is under a transform, so
     the browser resolves the target against the wrong box and moves no one.
     Measured by hand instead, with the floating header's height taken off the
     top so the eyebrow does not land underneath it. */
  if (t.hasAttribute('data-jump')) {
    var sec = $('#rs-' + t.getAttribute('data-jump'));
    var sc = $('#sample [data-scroll]');
    if (sec && sc) {
      var head = $('#sampleHead');
      // Assigned, not animated: `behavior:'smooth'` silently does nothing on
      // this container, and a jump index that sometimes moves is worse than one
      // that always does. An anchor link lands instantly too.
      sc.scrollTop = sc.scrollTop + sec.getBoundingClientRect().top -
        sc.getBoundingClientRect().top - (head ? head.offsetHeight : 0) - 12;
      // The header and the arch colour both hang off the scroll listener, and a
      // jump has to leave them in the state the same position reached by thumb
      // would.
      sc.dispatchEvent(new Event('scroll'));
    }
    return;
  }

  if (t.classList.contains('rsc-go')) { startBuy(); return; }
  // Back to an empty form carrying the chat's guess again, not the name she
  // is in the middle of replacing.

  if (t.id === 'mtGo') { submitMatch(); return; }

  // A report she owns opens. Everywhere else a card is a shop window and goes
  // to the detail page to make its case; these have already made it.
  if (t.hasAttribute('data-open-rep')) { openRep(t.getAttribute('data-open-rep')); return; }

  // Buy Now skips the detail page. It sits inside a [data-pick] card, and
  // closest() stops at whichever matches first — the button — so this has to
  // be tested before the pick branch below.
  if (t.hasAttribute('data-buy')) {
    state.pick = t.getAttribute('data-buy');
    renderReport();
    startBuy();
    return;
  }

  // PM track: picking one of the three reports opens it on the report page.
  if (t.hasAttribute('data-pick')) {
    state.pick = t.getAttribute('data-pick');
    renderReport();
    // The rail at the foot of this page picks too, so it can already be the
    // current screen. `go` would push it onto its own back stack, so only the
    // scroll comes back to the hero — otherwise she lands mid-way down a
    // report she has not seen the cover of.
    $('#report [data-scroll]').scrollTop = 0;
    if (state.screen !== 'report') go('report');
    return;
  }

  if (t.id === 'push')    { openBook(); return; }

  // The push is the door back in: it lands in the chat, where the chapter is.
  if (t.id === 'pushNote') {
    hidePush();
    // The notification names one report, so it has to land on that report's
    // page. Dropping her on the picker would ask her to make the same choice
    // twice.
    if (!state.paid && dayData().lead) {
      state.pick = dayData().lead;
      renderReport();
      $('#report [data-scroll]').scrollTop = 0;
      if (state.screen !== 'report') go('report');
      return;
    }
    if (state.screen !== 'chat') go('chat');
    return;
  }

  // The report's own follow-up questions, answered in the thread.
  if (t.hasAttribute('data-ask')) {
    var qa = reportById(state.pick).ask[+t.getAttribute('data-ask')];
    var thread = $('#chatThread'), chips = $('#sgChips');
    t.remove();
    thread.insertBefore(bubble('user', qa.q), chips);
    scrollChat();
    typing(function () { thread.insertBefore(bubble('hemali', qa.a), chips); scrollChat(); });
    if (!chips.querySelector('.sg-q')) chips.remove();
    return;
  }

  if (t.hasAttribute('data-remind')) {
    state.reminded = true;
    renderChat();
    var sc = $('#chat [data-scroll]');
    if (sc) sc.scrollTop = sc.scrollHeight;
    toast('Reminder set for tomorrow\u2019s free chat', 'success');
    return;
  }
  if (t.id === 'scrim')   { closeSheet(); return; }
  if (t.id === 'restart') { restart(); return; }

  if (t.hasAttribute('data-day'))  { setDay(+t.getAttribute('data-day')); return; }
  if (t.hasAttribute('data-lead')) { setLead(t.getAttribute('data-lead')); return; }
  if (t.hasAttribute('data-wset')) { setWallet(+t.getAttribute('data-wset')); return; }

  // "Answer now" scrolls to the card and rings it for 2.6s, per the focus rule
  // on the daily reward board. Your Experts stays on screen above it.
  if (t.id === 'answerNow') {
    closeSheet();
    var card = $('#checkinCard');
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.add('focus');
    later(function () { card.classList.remove('focus'); }, 2600);
    return;
  }

  if (t.hasAttribute('data-mood')) {
    answerCheckin();
    // Queued, not shown: the reward sheet is about to cover the page.
    if (repToastDays() && !state.repToastSeen && !state.paid) state.repToastPending = true;
    openRewardSheet();
    return;
  }

  // The knock is from Hemali, so it opens Hemali — the chat, where the chapter
  // and the offer already sit. Sending her straight to the report page would
  // skip the person doing the asking.
  if (t.id === 'repToastSee') {
    hideRepToast();
    if (state.histDot) { state.histDot = false; renderNav(); }
    renderChat();
    if (state.screen !== 'chat') go('chat');
    var rtc = $('#chat [data-scroll]');
    if (rtc) requestAnimationFrame(function () { rtc.scrollTop = rtc.scrollHeight; });
    return;
  }
  if (t.id === 'repToastX') { hideRepToast(); return; }

  // The reward sheet's CTA: before day 3 it asks the OS for notifications;
  // on day 3 the wallet covers ₹49, so it goes straight to the pay sheet.
  if (t.id === 'rewardCta') {
    if (state.day >= lastDay()) startBuy();
    else $('#notifDlg').hidden = false;
    return;
  }
  if (t.id === 'notifYes') {
    $('#notifDlg').hidden = true;
    closeSheet();
    state.reminded = true;
    renderChat();
    toast('Reminder on, tomorrow ₹' + REWARD[Math.min(state.day + 1, 3)] + ' + free chat ready', 'success');
    return;
  }
  if (t.id === 'notifNo') { $('#notifDlg').hidden = true; closeSheet(); return; }

  if (t.hasAttribute('data-lang')) {
    state.lang = t.getAttribute('data-lang');
    renderLangList();
    return;
  }

  // The sample is a whole report, so it gets its own screen rather than being
  // inlined under About, where it buried every section after it.
  if (t.id === 'r2ViewSample' || t.id === 'r2BookSample') {
    renderSample();
    if (state.screen !== 'sample') go('sample');
    return;
  }

  if (t.id === 'showSample') {
    // Picking a language from inside the pay sheet is a change to the thing
    // being bought, not a detour — so it goes straight back to the receipt.
    if (state.langFrom === 'pay') {
      renderSample();
      openPay();
    } else {
      closeSheet();
      renderSample();
      if (state.screen !== 'sample') go('sample');
    }
    return;
  }

  if (t.id === 'paysLang') { state.langFrom = 'pay'; openSheet('lang'); return; }

  // Every route to the money lands on the same sheet: Buy Now on the detail
  // page, Buy Now at the foot of the sample, and the last day's reward.
  // The one button whose job changes. Before the payment it opens the sheet;
  // after it, it is the door into the report, because the bar it sits in has
  // stopped being a shop.
  if (t.id === 'r2Cta' && owns(state.pick)) { openRep(state.pick); return; }
  if (t.id === 'buyInLang' || t.id === 'r2Cta' || t.id === 'r2Again') { startBuy(); return; }
  // Her tap, her spinner: a short busy beat so the pay reads as processing
  // rather than as a screen that swapped under her thumb.
  if (t.id === 'paySubmit') {
    stopPay();
    t.classList.add('busy');
    payT.push(later(pay, 700));
    return;
  }
  // Touchpoint tabs in the demo sidebar: jump the phone to that surface.
  if (t.hasAttribute('data-tp')) {
    var tp = t.getAttribute('data-tp');
    closeSheet();
    if (tp === 'chat') {
      renderChat();
      if (state.screen !== 'chat') go('chat');
      var tsc = $('#chat [data-scroll]');
      if (tsc) requestAnimationFrame(function () { tsc.scrollTop = tsc.scrollHeight; });
    } else if (tp === 'report') {
      renderReport();
      $('#report [data-scroll]').scrollTop = 0;
      if (state.screen !== 'report') go('report');
    } else if (tp === 'guide') {
      state.stack = [];
      show(state.entry, 'fade');
      var gs = $('#guideSlot');
      if (gs) later(function () { gs.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 380);
    } else if (tp === 'picker') {
      if (state.screen !== 'picker') go('picker');
    } else if (tp === 'read') {
      if (state.screen !== 'read') { state.stack = [state.entry]; show('read', 'fade'); }
    } else if (tp === 'upsell') {
      if (state.screen !== 'read') { state.stack = [state.entry]; show('read', 'fade'); }
      // The read body has inline ask-Hemali cards too — the carousel + closing
      // upsell sit at the end, so jump to the last one.
      var ups = $$('#read .upsell');
      var up = ups[ups.length - 1];
      if (up) later(function () { up.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 420);
    } else if (tp === 'history') {
      state.stack = []; show('timeline', 'fade');
    } else if (tp === 'push') {
      if (state.screen === 'chat') show(state.entry, 'fade');
      showPush();
    } else if (tp === 'reward' || tp === 'toast') {
      // Answer on her behalf — the reward sheet is skipped, because the chip is
      // asking for the state the sheet leaves behind, not the sheet itself.
      answerCheckin();
      state.stack = [];
      show(state.entry, 'fade');
      var cc = $('#answeredCard');
      if (cc) later(function () { cc.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 380);
      if (tp === 'toast') {
        state.repToastSeen = false;
        later(showRepToast, 700);
      }
    } else if (tp === 'counter') {
      // The counter is already live on day 1; the chip just puts both doors
      // that carry it back on screen and blinks them.
      state.histDot = true;
      renderNav();
      state.stack = [];
      hideRepToast();
      show(state.entry, 'fade');
      // show() only resets the scroll when the screen actually changes, and the
      // header counter has to be in frame for the blink to mean anything.
      var tsc2 = $('#today-a [data-scroll]');
      if (tsc2) tsc2.scrollTop = 0;
      later(function () {
        $$('.ncount').forEach(function (n) {
          n.classList.remove('lit'); void n.offsetHeight; n.classList.add('lit');
        });
      }, 360);
    } else {
      state.stack = [];
      show(state.entry, 'fade');
      var slot = $(state.day === 1 ? '#expertSlot' : '#guideSlot');
      if (slot) later(function () { slot.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 380);
    }
    return;
  }

  // Every chat door — Continue Chat, the header icon, Ask Hemali — lands in
  // the real thread, scrolled to its end, where the day's pitch sits.
  if (t.hasAttribute('data-chat')) {
    // The chapter has been seen either way, so the dot clears from both doors.
    if (state.histDot) { state.histDot = false; renderNav(); }
    renderChat();
    if (state.screen !== 'chat') go('chat');
    var cs = $('#chat [data-scroll]');
    if (cs) requestAnimationFrame(function () { cs.scrollTop = cs.scrollHeight; });
    return;
  }

  if (t.hasAttribute('data-close-sheet')) { closeSheet(); return; }

  if (t.hasAttribute('data-sheet')) {
    var name = t.getAttribute('data-sheet');
    if (name === 'lang') state.langFrom = state.sheet === 'pay' ? 'pay' : 'sample';
    openSheet(name);
    return;
  }

  if (t.hasAttribute('data-back')) { back(); return; }

  if (t.hasAttribute('data-go')) {
    var dest = t.getAttribute('data-go');
    if (dest === 'book') openBook();
    else go(dest, 'push');
    return;
  }

  if (t.hasAttribute('data-nav')) {
    var nav = t.getAttribute('data-nav');
    if (nav === 'today')    { state.stack = []; show(state.entry, 'fade'); return; }
    if (nav === 'timeline') { state.stack = []; state.histDot = false; renderNav(); show('timeline', 'fade'); return; }
    toast(t.textContent.trim() + ' is not part of this demo');
    return;
  }

  if (t.hasAttribute('data-toast')) { toast(t.getAttribute('data-toast')); return; }
}, false);

/* The Today header sits transparently over the hero. Once the page scrolls the
   hero away, give it a solid backdrop so content doesn't run under the icons. */
$$('.screen').forEach(function (s) {
  var head = $('.head.hero-head', s), sc = $('[data-scroll]', s);
  if (!head || !sc) return;
  sc.addEventListener('scroll', function () {
    head.classList.toggle('scrolled', sc.scrollTop > 40);
  }, { passive: true });
});

/* Figma 3169:202696 — the review the strip has snapped to sits at full size and
   its neighbours sit back. The quote is the evidence, so the one she is reading
   is the one that gets the weight. "Snapped" is the card whose left edge is
   nearest the strip's own left edge, which is where scroll-snap parks it. */
function markSnappedReview(strip) {
  var cards = $$('.review', strip);
  if (!cards.length) return;
  var edge = strip.getBoundingClientRect().left + 16, best = 0, bestD = Infinity;
  cards.forEach(function (c, i) {
    var d = Math.abs(c.getBoundingClientRect().left - edge);
    if (d < bestD) { bestD = d; best = i; }
  });
  cards.forEach(function (c, i) { c.classList.toggle('is-snap', i === best); });
}
$$('.revs').forEach(function (strip) {
  strip.addEventListener('scroll', function () { markSnappedReview(strip); },
    { passive: true });
});

/* The bought reader wears the sample's header. Cloning it beats a second copy
   of the same forty lines of SVG, which is how the two drifted apart before. */
$$('[data-head-clone]').forEach(function (slot) {
  slot.innerHTML = $('#sampleHead .rp-head-r').innerHTML;
});

$('#bookStage').addEventListener('click', enterRead);

/* The two report readers do the same thing: the header starts transparent on
   the painted arch and only takes a white surface once prose is under it. */
$$('.rp').forEach(function (s) {
  var head = $('.rp-head', s), sc = $('[data-scroll]', s);
  if (!head || !sc) return;
  sc.addEventListener('scroll', function () {
    var moved = sc.scrollTop > 24;
    head.classList.toggle('solid', moved);
    // And the ground inside the arch warms from paper-white to the report's own
    // pink. White is right at the top, where the arch is the whole picture and
    // the sketch has to sit on paper; once she is reading, white ground under
    // white cards leaves the sections with no edges at all.
    s.classList.toggle('scrolled', moved);
  }, { passive: true });
});

/* The report page's nav does the same, but it only goes white once the hero's
   artwork has actually left — turning it white over the couple looked broken. */
(function () {
  var nav = $('#r2Nav'), sc = $('#report [data-scroll]');
  sc.addEventListener('scroll', function () {
    nav.classList.toggle('solid', sc.scrollTop > 150);
  }, { passive: true });
})();

/* ---------------------------------------------------------------- fit */
/* Small laptops: the frame is 360x800; when the window is shorter, zoom the
   whole phone down so the mobile aspect ratio holds instead of squashing.
   On real phones (<=600px) the frame is the viewport and must stay unzoomed. */
function fitPhone() {
  var ph = $('#phone');
  if (window.innerWidth <= 600) { ph.style.zoom = ''; return; }
  var s = Math.min(1, (window.innerHeight - 48) / 800);
  ph.style.zoom = s < 1 ? s : '';
}
window.addEventListener('resize', fitPhone);

/* ---------------------------------------------------------------- boot */
fitPhone();
renderLadder();
renderNav();
renderSample();
renderRead();
paintWallet();
resetTimeline();

// Deep link, so a day can be shared: #day1 .. #day5.
var hash = (location.hash || '').replace('#', '');
var linked = /^day([1-5])$/.exec(hash);
state.screen = 'today-a';
if (linked) {
  state.day = +linked[1];
  $$('.switcher [data-day]').forEach(function (b) {
    b.classList.toggle('on', +b.getAttribute('data-day') === state.day);
  });
}
state.pick = 'partner';
// Same rule as setDay(): the counter belongs to day 1 only. Deep links skip
// setDay entirely, so without this the badge boots on for every day.
state.histDot = state.day === 1;
renderNav();
state.wallet = WALLET_AT[state.day];
paintWallet();
paintBought();
renderRead();
renderChat();
renderPicker();
renderReport();
renderDayToday();
renderTpTabs();
renderHistCard();
armIntroSheet();
applyPaidTimeline();
})();
