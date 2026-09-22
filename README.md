# Portfolio Site

Aakash Patel's portfolio — a single-page site in a "Ledger Editorial" style: paper-and-ink
palette, mono/serif type, and a live mock of the Budgeting AI app's spending assistant. Built with
React and Vite, styled with hand-written CSS driven by a single design-token file (no CSS
framework).

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## 🛠️ Built With

- **React 19** — UI library
- **Vite** — build tool and dev server
- **Hand-written CSS** — no framework; every color, type size, and spacing value is a CSS custom
  property defined in `src/styles/tokens.css`

## 📁 Project Structure

```
src/
├── components/
│   ├── LedgerGrid.jsx           # Cursor-reactive graph-paper background
│   ├── NavRail.jsx              # Sticky nav bar (section links, dark-mode toggle)
│   ├── Reveal.jsx               # Scroll-in/out reveal wrapper (IntersectionObserver)
│   ├── SectionHead.jsx          # Shared "01 — LABEL" section heading
│   ├── SpendingRoast.jsx        # Hero widget: mock chat with the budgeting app's spending assistant
│   └── sections/
│       ├── Hero.jsx             # Hero copy + SpendingRoast
│       ├── Flagship.jsx         # Budgeting AI feature walkthrough
│       ├── Work.jsx             # Selected work grid
│       ├── WorkCard.jsx         # Individual project card
│       ├── AboutContact.jsx     # Bio + ledger-style contact table
│       └── Footer.jsx
├── hooks/
│   ├── useScrollReveal.js       # Powers Reveal — toggles visibility on viewport enter/exit
│   ├── useParallax.js           # Subtle scroll-linked parallax (portrait)
│   └── useTheme.js              # Light/dark theme state + persistence
├── styles/
│   ├── tokens.css               # Design tokens: color, type, spacing, motion; light/dark palettes
│   └── components/              # One stylesheet per component, imported by that component
├── assets/
│   └── hero_picture.jpg
├── App.jsx                      # Section order
└── main.jsx                     # Entry point
```

## 🎨 Customization

- **Colors, type, spacing, motion**: all defined once in `src/styles/tokens.css` under `:root`
  (light) and `:root[data-theme='dark']` (dark) — change a value there and it propagates
  everywhere.
- **Copy and content**: each section's text lives directly in its component under
  `src/components/sections/`.
- **Bracketed placeholders** (e.g. `[COMPANY]`, `[PROJECT URL]`) mark facts that are intentionally
  unfilled — replace them once the real values exist rather than guessing.
- **Dark mode**: the palette is defined in `tokens.css`; the toggle and system-preference detection
  live in `src/hooks/useTheme.js` and the inline script in `index.html` (prevents a flash of the
  wrong theme on load).

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

To build for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 📝 Notes

- Fully responsive, with layouts verified down to 375px.
- Every animation (scroll reveals, cursor-reactive grid, parallax) respects
  `prefers-reduced-motion` and drops to an instant final state when set.
- Accessibility: real `<a>`/`<button>` elements, `aria-label`s on icon-only controls, 44px touch
  targets, visible focus rings, and AA-contrast-checked palettes in both themes.
- The Budgeting AI project is in progress — its section is labeled accordingly, and the
  spending-assistant widget in the hero is an illustrative mockup, not a live model call.
