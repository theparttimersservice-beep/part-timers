# 🌾 The Part-Timer's — Setup Guide

**Empowering Rural Odisha, One Job at a Time**

---

## 📁 Files in this folder

| File | Purpose |
|------|---------|
| `index.html` | Main app (users — customers, workers, vendors, vehicles) |
| `admin.html` | Admin panel (full control dashboard) |
| `sheet-script.js` | Google Apps Script code (for Google Sheets sync) |
| `README.md` | This guide |

---

## 🚀 Step 1 — Upload to GitHub & Go Live

1. Create a new GitHub repository (e.g., `part-timers-app`)
2. Upload all 3 files: `index.html`, `admin.html`, `sheet-script.js`
3. Go to **Settings → Pages → Branch: main → Save**
4. Your app is live at: `https://YOUR-USERNAME.github.io/part-timers-app/`
5. Main app: `https://YOUR-USERNAME.github.io/part-timers-app/index.html`
6. Admin panel: `https://YOUR-USERNAME.github.io/part-timers-app/admin.html`

---

## 🔗 Step 2 — Connect Google Sheets (5 minutes)

### A. Create Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new sheet — name it `PartTimers_Data`
3. Leave it blank (script will create headers automatically)

### B. Open Apps Script
1. In your Google Sheet, click **Extensions → Apps Script**
2. Delete all existing code
3. Open `sheet-script.js` from this folder
4. Copy ALL the code and paste it into Apps Script editor
5. Click **Save** (💾 icon)

### C. Deploy as Web App
1. Click **Deploy → New deployment**
2. Click the gear icon ⚙️ → Select **Web app**
3. Fill in:
   - Description: `Part-Timers API`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Click **Authorize access** → Allow permissions
6. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/XXXX/exec`)

### D. Connect in Admin Panel
1. Open `admin.html` in your browser
2. Login: `admin` / `admin@parttimers123`
3. Go to **Settings → Google Sheets Setup**
4. Paste the Web App URL
5. Click **Save & Test**
6. Status should show: `✅ Connected`

---

## 🔐 Step 3 — Admin Login

| Field | Default Value |
|-------|--------------|
| Username | `admin` |
| Password | `admin@parttimers123` |

**Change password immediately after first login:**
→ Admin Panel → Settings → Admin Password

---

## 👤 Step 4 — User Types

| Type | Icon | What they do |
|------|------|-------------|
| Customer | 👤 | Books services, orders products |
| Worker | 👷 | Lists their skills, gets booked |
| Vendor | 🏪 | Lists products/services for sale |
| Vehicle Owner | 🚜 | Lists vehicles for transport/rent |

---

## 💰 Step 5 — Vendor Plans

| Plan | Fee/Month | Visibility | Items |
|------|-----------|-----------|-------|
| Local Mini | ₹10 | 5 km radius | 5 items |
| Local Plus | ₹20 | 5 km + highlighted | 10 items |
| Block Reach | ₹100 | ~15 km (1 block) | 20 items |
| District Seller | ₹999 | Full district | 50 items |
| Super Vendor | ₹3,999 | Full Odisha | Unlimited |

**No commission on any sale — only flat monthly fee.**
**First 3 months FREE for new vendors.**

---

## ⚙️ Admin Panel Features

### 📊 Dashboard
- Live user count (total, workers, vendors, vehicles)
- Booking and order counts
- Revenue estimate from vendor plans
- Charts: registrations, user types, revenue, top districts
- Recent activity tables

### 👥 Users
- View all registered users
- Filter by type (customer/worker/vendor/vehicle)
- Filter by status (active/blocked)
- Block / Unblock users
- Edit user details
- Delete users
- Export users to CSV

### 👷 Workers
- All worker profiles
- Skills, rates, experience, ratings
- Feature workers on home screen
- Block/unblock

### 🏪 Vendors
- All vendor profiles
- Assign/change vendor plans
- Block/unblock

### 📋 Bookings
- All service bookings
- Update status (pending → confirmed → done)
- Filter by status
- Export to CSV

### 🛒 Orders
- All product/food orders
- Status management
- Export to CSV

### 📦 Listings
- Approve/reject vendor listings
- Approve all pending with one click

### 💰 Revenue
- Revenue breakdown by plan
- 2-year projection chart
- Paid vendors list

### 📈 Analytics
- Category interest chart
- District-wise user breakdown
- Monthly growth chart
- Plan distribution

### 📢 Banners
- Toggle Sunday Haata live banner
- Toggle promo banners
- Edit all banner text
- Broadcast notifications to users
- Maintenance mode toggle

### ⚙️ Settings
- Change admin password
- Google Sheets connection
- App name/info
- Export all data (JSON/CSV)
- Clear all data

---

## 🌐 Languages

- **Primary:** Odia (ଓଡ଼ିଆ) — all UI elements
- **Secondary:** English — toggle with the language button
- Toggle button available on Welcome screen and inside app

---

## 📱 Services Available

| Service | Logic Like |
|---------|-----------|
| 🌾 Crop Farming | Urban Company (worker booking) |
| 🐟 Fish & Aqua | Urban Company + OLX |
| 🐔 Poultry & Livestock | OLX (buy/sell) |
| 🛒 Buy/Sell/Rent | OLX (listings + Sunday Haata) |
| 🚜 Transport | Ola (vehicle booking by type) |
| 🍱 Food Order | Zomato (menu + cart + COD) |
| 🔧 Home Services | Urban Company (book skilled workers) |
| 📸 Photo/Video | Booking platform |
| ⛺ Tent & Events | Event booking |
| 🙏 Pandit & Pooja | Booking platform |
| 🩺 Doctor/Health | On-call doctor booking |
| 📚 Tuition | Coaching inquiry |

---

## 🐛 Troubleshooting

**App not loading?**
→ Make sure GitHub Pages is enabled (Settings → Pages)

**Google Sheet not connecting?**
→ Re-deploy the Apps Script: Deploy → Manage deployments → New version
→ Make sure "Who has access" is set to "Anyone"

**Admin login not working?**
→ Default: `admin` / `admin@parttimers123`
→ If you changed it and forgot, open browser console and run: `localStorage.clear()`

**Data not saving?**
→ Data is in localStorage — same browser only
→ Connect Google Sheets for permanent cloud storage

---

## 📞 Contact & Support

Built for rural Odisha 🌾  
**The Part-Timer's** — Empowering Rural India, One Job at a Time

---

*Version 1.0 | GitHub Pages Ready | No backend required*
