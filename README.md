# Latinoo Max — Premium Restaurant Website & Digital Menu

A complete static restaurant website (no build step, no backend) ready to
deploy on **GitHub Pages**. Public site + admin dashboard, bilingual
Arabic (RTL) / English (LTR), with a cart, WhatsApp + cash-on-delivery
checkout, and full menu management — all persisted in the browser's
`localStorage`.

## Live demo

After deploying to GitHub Pages the site is available at:

```
https://<github-username>.github.io/latinoo-max/
```

(e.g. `https://mohamedbadran-qodra.github.io/latinoo-max/`)

## What's inside

| File | Purpose |
| --- | --- |
| `index.html` | Single-page app shell, hash routing, SEO meta + JSON-LD |
| `css/style.css` | Premium dark charcoal + champagne gold design system |
| `js/data.js` | Seed data (real menu) + DB layer (localStorage, CRUD, cart, orders) |
| `js/i18n.js` | All UI strings in Arabic + English |
| `js/app.js` | Public site: routing, menu, product modal, cart, checkout, WhatsApp |
| `js/admin.js` | Admin dashboard: login, products, categories, offers, orders, content, settings |
| `assets/logo.png` | Real Latinoo Max logo (black artwork on transparent background) |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

## The real menu

The seed data was generated from the restaurant's real Excel menu
(494 rows):

- **40 categories, 423 products** — exact Arabic names and exact EGP prices
  from the file, with English translations added.
- **23 delivery zones** (8–30 EGP) from the "توصيل" rows — used in the
  checkout area dropdown. Duplicate "الزاوية" entries were merged (kept 10 EGP).
- **34 extras** (اضافات فود / فلفر / بار) are the add-ons pool in the product
  modal, not standalone menu items.
- The 12 "عرض 11/11" rows (0 EGP placeholders) were excluded — no 0 EGP items.
- Product descriptions were written from the item names/categories
  (the Excel descriptions were empty).
- All photos are Unsplash (`images.unsplash.com`), 2–3 per category, rotated
  across items. No images from the Excel/Foodics source are used.

## Routes (hash routing)

| Route | Page |
| --- | --- |
| `#/` | Home — hero slider, categories, featured, offers, about |
| `#/menu` | Full menu — search, category filter, product cards |
| `#/offers` | Active offers & bundles |
| `#/cart` | Cart — quantities, extras, totals, delivery area |
| `#/checkout` | Checkout — customer details, WhatsApp / COD |
| `#/about`, `#/contact` | Brand story, contact details, map link |
| `#/admin` | Admin dashboard (login required) |

## Admin dashboard

- **URL:** `#/admin`
- **Default login:** username `admin`, password `admin123`
  (change it in **Settings → Admin Username / Password**).
- Session lives in `sessionStorage` — closing the tab logs out.
- **Overview:** total/today's orders, revenue, best sellers, recent orders,
  7-day revenue chart (vanilla canvas), best-selling categories.
- **Products / Categories / Offers:** full add/edit/delete. Category delete
  is blocked while products exist. Product form includes sizes/variants and
  extras editors, badges, featured and availability flags.
- **Orders:** list, search by order number/phone, filter by status, detail
  view, status updates (Pending → Confirmed → Preparing → Ready →
  Out for Delivery → Completed / Cancelled).
- **Content:** hero title/description/images, about text, announcement bar.
- **Settings:** restaurant name, logo URL, WhatsApp number, phones, address,
  hours, delivery fees by area, minimum order, COD toggle, social links,
  **maintenance mode** (public site shows a maintenance message).
- Changes save to `localStorage` and reflect on the public site immediately.
  **Settings → Reset Data to Seed** restores the original menu.

## Checkout & WhatsApp

- Checkout collects name, phone, address, area, delivery instructions and
  notes, and shows a full order summary.
- **WhatsApp checkout** opens `wa.me/<number>` with a formatted order
  message. The page clearly states the order is **not confirmed** merely by
  opening WhatsApp — the restaurant must receive and confirm it.
- **Cash on Delivery** is available when enabled in Settings.
- Every placed order is saved locally with a unique number and status
  **Pending**, visible in the admin Orders tab.
- WhatsApp / phone number is configurable in Settings (currently
  **+20 104 058 0225**).

## Logo

The logo file is `assets/logo.png` (1536×1024). It is **black artwork on a
transparent background**, so on the dark header/footer it is rendered white
with CSS:

```css
.logo-img { filter: brightness(0) invert(1); }
```

To replace the logo, overwrite `assets/logo.png` (keep the aspect ratio).
If the replacement logo is **coloured** (not black-on-transparent), remove
the `filter` line from the `.logo-img` rule in `css/style.css`, or the
colours will be inverted.

## Deploy to GitHub Pages

1. Create a repository (e.g. `latinoo-max`) and push this folder's contents
   to the `main` branch (root of the repo).
2. In the repo: **Settings → Pages → Build and deployment → Deploy from a
   branch → `main` / `/ (root)`**.
3. Wait a minute, then open `https://<username>.github.io/latinoo-max/`.
4. No build step is needed — the site is plain HTML/CSS/JS.

## Data & limitations

- All data lives in the visitor's browser (`localStorage`). There is no
  server, so orders placed on one device are only visible in the admin on
  that same device/browser. For multi-device orders, connect a real backend
  later — `js/data.js` is structured as a single DB layer so its
  load/save internals can be swapped for API calls without touching the
  components.
- First visit seeds the database from `js/data.js`. Bumping
  `SEED.version` in that file re-seeds existing visitors on their next visit.
