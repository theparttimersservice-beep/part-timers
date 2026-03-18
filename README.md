# 🌾 The Part-Timers — Rural Services Platform
**Odisha's village services marketplace** | v6 — Production Ready

---

## 🚀 Quick Start

1. **Upload to GitHub Pages**
   - Push entire folder to GitHub repo
   - Enable GitHub Pages (Settings → Pages → Branch: main)
   - Site live at: `https://yourusername.github.io/part-timers/`

2. **Admin Panel** → `/pages/admin/index.html`
   - Login with **Admin Demo** button
   - Edit logo, colors, announcements, categories — no coding needed

3. **Google Sheets** → See Legal → Sheets Setup tab
   - Paste `data/sheets-api.gs` in Apps Script
   - Deploy as Web App
   - Add URL in Admin Panel → Integrations

4. **Google Maps**
   - Get API key from console.cloud.google.com
   - Add in Admin Panel → Integrations

---

## 📁 Folder Structure

```
part-timers/
├── splash.html             ← Animated splash/loading screen
├── index.html              ← Homepage
├── data/
│   ├── config.js           ← ALL settings (colors, categories, brand)
│   ├── data.js             ← Workers, vendors, products data
│   └── sheets-api.gs       ← Google Apps Script backend
├── assets/
│   ├── css/main.css        ← Complete design system (mobile-first)
│   └── js/app.js           ← Core app logic
└── pages/
    ├── admin/index.html    ← Admin Panel (no-code management)
    ├── farming/index.html
    ├── fish/index.html
    ├── poultry/index.html
    ├── mushroom/index.html
    ├── learning/index.html
    ├── technicians/index.html
    ├── contractors/index.html
    ├── equipment/index.html
    ├── vehicle/index.html
    ├── food/index.html
    ├── photo/index.html
    ├── pharmacy/index.html
    ├── doctor/index.html
    ├── pandit/index.html
    ├── event/index.html
    ├── legal-service/index.html
    ├── marketplace/index.html
    ├── haata/index.html
    ├── shg/index.html
    ├── work-id/index.html
    ├── search.html
    ├── user/
    │   ├── login.html
    │   ├── register-worker.html
    │   ├── worker-profile.html
    │   ├── booking.html
    │   ├── orders.html
    │   ├── cart.html
    │   └── profile.html
    └── legal/terms.html
```

---

## ⚙️ Admin Panel Features (No Coding Needed)

| Feature | Location |
|---------|----------|
| Change Logo | Admin → Branding |
| Edit Announcement Bar | Admin → Announcements |
| Change Colors / Theme | Admin → Colors |
| Add/Remove Categories | Admin → Categories |
| View Workers | Admin → Workers |
| View Orders | Admin → Orders |
| Edit Pricing Plans | Admin → Plans |
| Add Google Maps Key | Admin → Integrations |
| Add Google Sheets URL | Admin → Integrations |
| Toggle Features | Admin → Features |
| Edit Legal Text | Admin → Legal |

---

## 💰 Business Model

- Workers: **0% commission** (keep 100%)
- Revenue from vendor subscriptions:
  - Local Mini: ₹10/month
  - Local Plus: ₹20/month
  - Block Plan: ₹100/month
  - District Plan: ₹999/month
  - Super Vendor: ₹3999/year

---

## 🌐 Languages Supported

- English
- Odia (ଓଡ଼ିଆ) — all UI has Odia translations

---

## 📱 Mobile Features (v6)

- ✅ viewport-fit=cover — all pages (iPhone notch support)
- ✅ Bottom navigation — all 29 pages
- ✅ Safe-area insets for iPhone X/11/12/13/14/15
- ✅ 16px inputs — prevents iOS auto-zoom
- ✅ touch-action: manipulation — no tap delay
- ✅ Admin panel — horizontal tab bar on mobile
- ✅ All scroll containers — smooth iOS scroll

## 🔧 Other Features

- ✅ Mobile-first responsive design
- ✅ Works on slow internet (minimal JS)
- ✅ GitHub Pages compatible
- ✅ Google Sheets as database
- ✅ Google Maps integration
- ✅ Worker registration
- ✅ Booking system (hourly/daily)
- ✅ Orders tracking
- ✅ Sunday Haata digital market
- ✅ Digital Work ID generator
- ✅ Buy/Sell Marketplace
- ✅ Smart search with filters
- ✅ Dark mode toggle
- ✅ WhatsApp integration

---

Made with ❤️ for rural Odisha
