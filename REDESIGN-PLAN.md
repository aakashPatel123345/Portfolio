# Portfolio Redesign — Implementation Plan

Direction: **Ledger Editorial**. Visual reference: https://claude.ai/artifact/MtMzqvqSjanMVmTWi79UUL
(Boards `Main`, `Featured`, `Projects`, `AboutContact`, `Tokens`, `Mobile` — the "Direction A" row.)

This plan is self-contained. Build from it without needing the design conversation.

---

## 1. Goal and constraints

**Positioning.** Aakash is a full-stack engineer (.NET, Angular, Azure, [Graph — CONFIRM: Microsoft
Graph or GraphQL]) targeting **AI engineer** roles. The site must make that transition credible: AI
work leads, the day job appears once as supporting proof that he ships production code.

**Brevity is a hard requirement.** Target ~250 words of body copy across the whole page. A portfolio
is scanned in 30–60 seconds, not read. The depth that doesn't fit goes on a separate case-study route,
never on the front page.

**The thesis.** The differentiator is not "used an LLM API" — it's that the budgeting app's pipeline
assumes the model is wrong: schema-constrained output, retry, independent validation, duplicate
detection, human review, cost logging. Every design decision should serve that claim.

---

## 2. Fix first (existing defects)

| Issue | Detail |
|---|---|
| Tailwind is dead weight | Zero utility classes in any JSX. `src/index.css` uses v3 directives (`@tailwind base`) while `package.json` has Tailwind **v4**, which needs `@import "tailwindcss"`. Remove `tailwindcss`, `@tailwindcss/postcss`, `autoprefixer`, `postcss`; delete `tailwind.config.js` and `postcss.config.js`. |
| Broken asset references | `public/` contains only `aakash-favicon.png`. `Projects.jsx` references `/rag-chatbot-demo.mp4`, `/stock-market-app.jpg`, `/image-classifier.jpg` — none exist. The featured `<video>` silently fails; two cards render empty image blocks. |
| Placeholder links | Projects 2 and 3 link to `https://google.com`. |

---

## 3. Design system → `src/styles/tokens.css`

Define as CSS custom properties on `:root`. This is the single source of truth; no hard-coded hex
anywhere else.

```
--paper:       #FBF8F1   /* page ground, warm off-white */
--panel:       #F4EEE3   /* inset panels */
--ink:         #14110D   /* primary text */
--muted:       #554E43   /* secondary text — 7.3:1 on paper */
--rule:        rgba(20,17,13,0.14)   /* row dividers */
--rule-strong: rgba(20,17,13,0.28)   /* panel borders */
--green:       #14663F   /* credit, links, accepted — 6.6:1 */
--rust:        #A83A22   /* debit, duplicate, needs attention — 6.0:1 */
```

**Colour carries meaning.** Green = credit / accepted / interactive. Rust = debit / flagged.
Never decorative.

**Type.** Three faces, loaded from Google Fonts:
`Instrument Serif` (display) · `Geist` (body) · `Geist Mono` (all numerals + labels).
Geist echoes the budgeting app's own stack.

```
display-xl   76px / 1.04 / -0.015em   hero h1
display-lg   92px / 0.98 / -0.02em    flagship h2
display-md   56px / 1.06              section h2
display-sm   30px / 1.12              card h3
lead         26px / 1.4               serif italic, green
body         16-17px / 1.65
small        13-14px / 1.5
mono-label   10-11px / 0.16-0.18em tracking, uppercase
mono-data    12-15px, font-variant-numeric: tabular-nums
```

Apply `tabular-nums` to **every** numeral on the site.

**Structure.** 12 columns, 24px gutter, 80px page margin (20px mobile), 1280px max content width.
Section padding `64px 80px`.
Rules: `1px solid var(--ink)` under section heads · `--rule` between rows · `--rule-strong` on panels ·
**dashed `--rule-strong` means "model boundary"** — use it only there.

**No `border-radius`. No `box-shadow`.** Structure comes from rules and whitespace.

**Motion.** 200ms hover, 600ms reveal, 1200ms number count-up.
Ease `cubic-bezier(0.2, 0, 0, 1)`. All of it inside `@media (prefers-reduced-motion: no-preference)`.

---

## 4. Page structure and final copy

Use this copy verbatim. `[BRACKETS]` are placeholders that must stay visibly bracketed until real
values arrive — do not invent substitutes.

### Nav rail
Thin bar, hairline bottom rule. Left: `AAKASH PATEL` in mono. Right: `01 WORK` `02 ABOUT`
`03 CONTACT`, then `EMAIL →` with a green underline. Links need ≥44px touch height.

### Hero
- Eyebrow: `SOFTWARE ENGINEER · FULL-STACK & AI`
- H1: **I build AI systems that _assume the model is wrong._**
  (the italic clause in `--green`, Instrument Serif italic)
- One line: *Full-stack by day — .NET, Angular, Azure. LLM pipelines by design: validation, dedup,
  cost, and a human in the loop.*
- Links: `See the work →` (#work) · `Get in touch` (#contact)
- Right column: `<StatementExtractor />` (§5)

No facts strip. The hero is ~55 words total.

### Flagship — `01 — FEATURED`

> **The budgeting app is still in progress.** Present it honestly as active work, not a shipped
> product. Carry a mono status chip (`IN PROGRESS`, hairline border, `--muted`) beside the H2, keep
> both links bracketed until real URLs exist, and render a bracketed link as inert styled text —
> never as an `<a href="[REPO URL]">` that 404s. The section is built to its final shape now so that
> filling in URLs later is a copy change, not a rebuild.

- H2: **Budgeting AI**
- Claim (serif italic, green): *Bank-statement extraction with a validation layer that never trusts
  the model.*
- Seven stages as **bare one-liners** — mono index + title + a short clause. No sub-paragraphs:

```
01  Raw statement text
02  Structured output — strict JSON schema
03  Retry on parse failure — error fed back, once
04  Independent validation — amount, date, category id
05  Duplicate detection — ±3 day window
06  Human review queue — pending / rejected / duplicate
07  Commit & log — tokens and cost per call
```

  Tint rows 03–05 with `rgba(20,102,63,0.05)` — they carry the thesis.
- Stat row (mono, tabular): `extract-v1` · `±3 days` · `10 categories` · `integer cents`
- Links: `Read the code →` `[REPO URL]` · `Full breakdown →` `[/budgeting-ai — deferred]`

~90 words. The three prose paragraphs and the ×100-cents callout from the mockup move to the case
study route, which is **deferred** until the app itself is further along (§7).

### Work — `02 — SELECTED WORK`
Three cards in a plain row. **No scroll-driven filmstrip** — pinned scroll exists to increase dwell
time, which contradicts the brevity goal. One line of description each. Each card gets an abstract
inline-SVG data glyph in place of the missing screenshots (see the mockup's `Projects` board:
retrieval graph / price series / classification matrix).

| # | Title | Line | Tech | Link |
|---|---|---|---|---|
| 01 | RAG-powered digital twin | Retrieval-augmented chatbot grounded in a fixed document set. | React · FastAPI · LangChain · Gemini | `https://github.com/aakashPatel123345/Personal-AI-Chatbot` |
| 02 | Stock market analysis | Trading platform with real-time lookups and an LLM layer over market data. | React · OpenAI · Polygon | `[PROJECT URL]` |
| 03 | Image classifier | Custom convolutional network trained from scratch, 90% held-out accuracy. | Python · PyTorch | `[PROJECT URL]` |

### About + contact — `03 — ABOUT`
Merged section. Portrait left (`src/assets/hero_picture.jpg`, hairline border, no crop tricks),
text right:

> **Aakash Patel**
> Full-time software engineer at `[COMPANY]`, working in .NET, Angular and Azure. Most of my own
> time goes to LLM systems — the seam where a model's output meets a schema, a constraint, and
> someone who has to trust the result.

Then a ledger-style contact table, three rows, mono label + value + green arrow:

```
EMAIL      aakash.patel0377@gmail.com          mailto:aakash.patel0377@gmail.com
LINKEDIN   in/aakash-patel-akp                 https://www.linkedin.com/in/aakash-patel-akp/
GITHUB     aakashPatel123345                   https://github.com/aakashPatel123345
```

Footer: `© 2026 Aakash Patel` · `Set in Instrument Serif, Geist & Geist Mono`

---

## 5. `<StatementExtractor />` — the one interactive element

A **deterministic client-side replay**. It does not call the backend: that runs on localhost, needs
`LLM_API_KEY`, and a public endpoint would cost money per visitor. It must be visibly labelled
`SAMPLE RUN` at all times.

Mirror the real contract from `Budgeting-AI-App/backend/app/llm/extraction.py`:

- Row fields: `date`, `description`, `amount` (**decimal string**, e.g. `"82.30"`), `direction`
  (`debit` | `credit`), `category_id` (`int | null`)
- Row status: `pending` | `rejected` | `duplicate`
- Duplicate window: ±3 days, matched on amount
- Prompt version: `extract-v1`
- The 10 seeded categories: Rent, Groceries, Eating Out, Transportation, Utilities, Debt, Loans,
  Entertainment, Healthcare, Subscriptions

**Sample data** (deliberately includes two failures — the failures are the point):

```
09/14  SQ *BLUE BOTTLE COFFEE      6.75   → Eating Out    −6.75
09/15  TRADER JOE'S #412          82.30   → Groceries    −82.30
09/15  TRADER JOE'S #412          82.30   → DUPLICATE    −82.30  (struck through)
09/16  PAYROLL DIRECT DEP      2,480.00   → —          +2,480.00  (credit, green)
09/17  TERMINAL 9X ////              ——   → REJECTED          —
```

**Animation sequence:** input lines appear → `extract-v1 · strict json schema · 1 retry` divider →
rows stream in one by one → flagged rows tint and receive their chip → footer totals count up.
Under `prefers-reduced-motion: reduce`, render the final state immediately with no animation.

Footer strip: `[TOKENS] tokens · $[COST]` and `2 held for review`.

> ⚠️ The token and cost figures in the mockup (`1,284 tokens · $0.0021`) are **illustrative**.
> Replace them with values from a real recorded run before launch, or leave them bracketed.
> Do not ship plausible-looking invented metrics.

---

## 6. Components

```
src/styles/tokens.css          design tokens (new, replaces all six component CSS files)
src/components/LedgerGrid.jsx  cursor-reactive graph-paper texture, reduced-motion gated
src/components/NavRail.jsx     replaces NavBar.jsx
src/components/SectionHead.jsx shared: mono index + label + 1px ink rule
src/components/sections/Hero.jsx
src/components/StatementExtractor.jsx
src/components/sections/Flagship.jsx
src/components/sections/Work.jsx      + WorkCard
src/components/sections/AboutContact.jsx   (merges About.jsx + Contact.jsx)
src/components/sections/Footer.jsx
```

Delete as each section lands: `src/styles/components/{navbar,hero,about,projects,contact,footer}.css`,
plus `About.jsx`, `Contact.jsx`, `Projects.jsx`, `NavBar.jsx`.

---

## 7. Build order

1. **Foundation** — remove Tailwind (deps + both configs + directives); add `tokens.css`; load the
   three fonts; set `tabular-nums` globally on numerals.
2. **`<LedgerGrid />`** — faint graph-paper rules responding to pointer position, behind everything,
   `prefers-reduced-motion` gated.
3. **Nav rail + Hero + `<StatementExtractor />`** — the highest-value screen; get this right first.
4. **Flagship.**
5. **Work row** (with the SVG glyphs), **About + contact**, **Footer.**
6. **Cleanup** — delete the six old CSS files and four old components; fix the three dead asset
   references and both `google.com` links.
7. **`/budgeting-ai` case study route — DEFERRED, do not build yet.** Waiting on the budgeting app
   itself to progress. When it's time, this holds the depth cut from the front page: the prose
   narrative, the seven stages with full descriptions, and the detail that money is stored as integer
   cents but crosses the model boundary as a decimal string, because models make ×100 errors on raw
   cents. It needs routing, which the app currently has none of — so treat it as its own project,
   not a step to squeeze into this one.

---

## 8. Guardrails

- **No invented facts or metrics.** Anything unknown stays in `[BRACKETS]` and visible.
- **The demo must read as a sample.** Never imply a live model call.
- **Accessibility as drawn:** 4.5:1 text contrast (3:1 at 24px+), real `<a href>` and `<button>`
  elements — never `onClick` on a `div` — `aria-label` on icon-only buttons, ≥44px touch targets,
  visible `:focus-visible` rings, and a working `prefers-reduced-motion` path for every animation.
- **Don't reintroduce Tailwind** or add a CSS framework. Hand-written CSS with tokens is the choice.
- **Don't add dark mode.** Paper-and-ink is the identity; a toggle dilutes it.
- Keep the copy at the stated word counts. If a section grows, cut it or move it to the case study.

---

## 9. Open items

| Item | Status |
|---|---|
| "Graph" — Microsoft Graph or GraphQL? | Confirm before writing the hero line |
| `[COMPANY]` | Name it, or keep generic |
| `[REPO URL]` | Budgeting AI repo / demo — app still in progress, stays bracketed for now |
| `/budgeting-ai` case study | Deferred until the app progresses (§7) |
| `[PROJECT URL]` ×2 | Stock app, image classifier |
| `[TOKENS]` / `[COST]` | From a real recorded extraction run |
| Portrait | `src/assets/hero_picture.jpg` exists and is wired in §4 |
