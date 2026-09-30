# Darwin Auto Drive — Buy | Sell | Rent

A responsive **frontend prototype** for Darwin Auto Drive, a local automotive marketplace and rental service in Darwin, Northern Territory.

Built with **React 18 + Vite + React Router**. Icons from `lucide-react`. No backend — all submissions, uploads and emails are simulated in the browser.

## Run it locally (VS Code)

Requires **Node.js 18+** (check with `node -v`).

```bash
# 1. Open this folder in VS Code, then open the terminal (Ctrl + `)
npm install
npm run dev
```

The site opens at **http://localhost:5173**.

Other commands:

```bash
npm run build     # production build into /dist
npm run preview   # serve the built site locally
```

> Vehicle photos are loaded from Unsplash, so you need an internet connection to see them. If an image can't load, a branded placeholder is shown instead.

## Pages & flows

| Route | Page |
|---|---|
| `/` | Home — hero, service cards, featured vehicles, how it works |
| `/buy` | Marketplace (PLP) — search, filters, sort, vehicle cards |
| `/buy/:id` | Vehicle detail — gallery + video placeholder, specs, enquiry form |
| `/sell` | Sell Your Car — 5-step form with drag-and-drop uploads |
| `/rent` | Rent a Car — request form → availability check → result → request |
| `/about` | About Us |
| `/contact` | Contact form, details, map placeholder |

**Flow A — Sell:** Home → Sell Your Car → Customer → Vehicle → Condition → Photos → Documents → Submit → *Request Received* (Under Review) + email preview.

**Flow B — Buy:** Home → Browse Cars → Filter/Search → View Details → Enquire → *Enquiry Received* + email preview.

**Flow C — Rent:** Home → Rent a Car → Details → Vehicle type → Dates → Check Availability (simulated) → Result → Request This Vehicle → *Rental Request Submitted* (Pending Confirmation) + email preview.

## Project structure

```
src/
  data/vehicles.js          Mock vehicles, rental fleet, placeholder business details
  components/
    Navbar, Footer, Logo    Layout (hamburger menu on mobile, Get Started modal)
    Hero (Hero, PageHero)   Homepage and inner-page heroes
    ServiceCard, VehicleCard, VehicleGallery, FilterPanel
    FormFields              TextInput, SelectInput, TextArea, Segmented, ToggleRow, Checkbox + validation helpers
    FileUpload              Prototype drag-and-drop upload (browser memory only)
    Modal, ConfirmationModal, StatusBadge, StatusTimeline, EmailPreview
    AvailabilityCard, ContactForm, Toast, SmartImage
  pages/                    Home, BuyCar, VehicleDetail, SellCar, RentCar, About, Contact, NotFound
  index.css                 Design tokens + all styles (orange #F97316 / dark #111827 / bg #F8FAFC)
```

## Customising

- **Vehicles / prices / rental rates:** edit `src/data/vehicles.js`.
- **Contact details:** `BUSINESS` in `src/data/vehicles.js` (currently placeholders).
- **Colours & fonts:** CSS variables at the top of `src/index.css`.
- **Your own photos:** drop images in `/public/images/` and reference them as `/images/your-photo.jpg` in the data file.

## Prototype constraints

No real backend, payments, authentication, inventory, document verification or email service. Uploaded files are held in browser memory only for previews and are discarded on refresh.
