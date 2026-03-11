# 🌾 The Part-Timers — Rural Services Marketplace
### Made for Villages of Odisha, India

## 📁 Project Structure
```
part-timers/
├── index.html              ← Main app (original prototype + extensions)
├── README.md
├── assets/
│   ├── css/shared.css      ← Shared styles (preserves original design)
│   └── js/
│       ├── data.js         ← Dummy data + utility functions
│       └── sheets-api.js   ← Google Sheets API (Apps Script code)
└── pages/
    ├── search.html         ← Smart Village Search
    ├── farming.html        ← Farming Work
    ├── fish.html           ← Fish & Aqua Work
    ├── poultry.html        ← Poultry & Livestock
    ├── learning.html       ← Learning & Coaching
    ├── technicians.html    ← Technicians
    ├── contractors.html    ← Contractors (Local + Verified)
    ├── equipment.html      ← Equipment Rental
    ├── vehicle.html        ← Vehicle Booking
    ├── food.html           ← Food Delivery (Veg + Instant + Grocery)
    ├── marketplace.html    ← Buy/Sell Marketplace
    ├── haata.html          ← Sunday Digital Haata
    ├── work-id.html        ← Digital Work ID
    ├── register.html       ← Registration (Worker/Vendor/Teacher/Tech/Contractor)
    ├── booking.html        ← Service Booking
    ├── checkout.html       ← Checkout & Payment
    ├── orders.html         ← My Orders
    ├── map.html            ← Map & Nearby Services
    └── profile.html        ← User Profile
```

## 🚀 Deploy on GitHub Pages
1. Upload this folder to a GitHub repo
2. Settings → Pages → Deploy from main branch
3. Done! Access at: https://yourusername.github.io/part-timers/

## 🗄️ Google Sheets Database Setup
1. Create a Google Sheet with tabs: users, workers, vendors, bookings, products, ratings
2. Open Extensions → Apps Script → paste code from `assets/js/sheets-api.js`
3. Deploy as Web App (Execute as Me, Anyone)
4. Copy URL → paste in `assets/js/data.js` → `SHEETS_CONFIG.apiUrl`

## 🗺️ Google Maps Setup
Replace the map placeholder in `pages/map.html`:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
```

## 📱 Features
- ✅ Bilingual: English + ଓଡ଼ିଆ (Odia)
- ✅ 12 Service Categories
- ✅ Smart Village Search with filters
- ✅ Food Delivery (3 sections)
- ✅ Service Radius System
- ✅ Worker/Vendor Profiles with Trust Score
- ✅ Digital Work ID
- ✅ Sunday Digital Haata
- ✅ Registration forms with T&C + Legal Notice
- ✅ Google Sheets API integration
- ✅ Mobile-first, lightweight (no frameworks)
- ✅ GitHub Pages ready

## ⚖️ Legal Notice
If any user violates platform rules, provides false information, commits fraud, or behaves illegally, The Part-Timers team reserves the right to suspend accounts or take action according to applicable law.
