/**
 * ========================================================
 * THE PART-TIMERS — MASTER CONFIG
 * Edit this file to customize the entire website
 * No coding knowledge needed for basic changes
 * ========================================================
 */

const PT_CONFIG = {

  // ─── BRANDING ───────────────────────────────────────────
  brand: {
    name: "The Part-Timers",
    tagline: "Odisha's Rural Services Platform",
    tagline_odia: "ଓଡ଼ିଶାର ଗ୍ରାମୀଣ ସେବା ମଞ୍ଚ",
    // Logo: use emoji OR set logoUrl to an image path
    logoEmoji: "🌾",
    logoUrl: "", // e.g. "assets/images/logo.png"
    // Favicon emoji
    favicon: "🌾",
    // Contact
    email: "hello@theparttimers.in",
    phone: "+91-XXXXXXXXXX",
    whatsapp: "91XXXXXXXXXX",
    address: "Kendrapara, Odisha, India",
    // Social links (leave blank to hide)
    facebook: "",
    instagram: "",
    youtube: "",
    twitter: "",
  },

  // ─── COLORS (change here, entire site updates) ──────────
  colors: {
    primary: "#2E7D32",       // Main green
    primaryLight: "#4CAF50",
    primaryDark: "#1B5E20",
    accent: "#FF6F00",        // Orange accent
    accentLight: "#FFA726",
    bg: "#F1F8E9",
    surface: "#FFFFFF",
    text: "#1A1A1A",
    textMuted: "#5D5D5D",
    textLight: "#9E9E9E",
    border: "#E0E0E0",
    success: "#2E7D32",
    warning: "#F57C00",
    danger: "#C62828",
    info: "#0277BD",
  },

  // ─── ANNOUNCEMENTS / MARQUEE BAR ────────────────────────
  // Admin can edit these from the Admin Panel too
  announcements: [
    "🌾 Kharif season is here! Book tractor services now | ଖରିଫ ମୌସୁମ ଆସିଲା! ଏବେ ଟ୍ରାକ୍ଟର ବୁକ୍ ବ।",
    "🐟 Fresh fish available in Kendrapara Sunday Haata | ରବି. ହାଟ — ताजा माछ",
    "📚 New tutors registered in Cuttack district | ନୂଆ ଶିକ୍ଷକ ଯୋଗ ଦେଲେ",
    "🔧 Free registration for all technicians this month | ଏ ମାସ ମୁଫ ରଜ.",
    "🚜 Tractor available in Aul, Rajnagar areas | ଅଉଳ, ରାଜ. — ଟ୍ରାକ୍ଟର ଉ.",
  ],

  // ─── CATEGORIES (edit, add, remove, reorder) ────────────
  categories: [
    { id: "farming",     icon: "🌾", label: "Farming Work",          label_odia: "ଚାଷ କାମ",         color: "#388E3C", page: "pages/farming/index.html",     active: true  },
    { id: "fish",        icon: "🐟", label: "Fish & Aqua",           label_odia: "ମାଛ ଚାଷ",          color: "#0277BD", page: "pages/fish/index.html",         active: true  },
    { id: "poultry",     icon: "🐓", label: "Poultry & Livestock",   label_odia: "ପୋଲ୍ଟ୍ରି",         color: "#E65100", page: "pages/poultry/index.html",      active: true  },
    { id: "learning",    icon: "📚", label: "Learning & Coaching",   label_odia: "ଶିକ୍ଷା",           color: "#4527A0", page: "pages/learning/index.html",     active: true  },
    { id: "technicians", icon: "🔧", label: "Technicians",           label_odia: "ଟେ.",              color: "#006064", page: "pages/technicians/index.html",  active: true  },
    { id: "contractors", icon: "🏗️", label: "Contractors",           label_odia: "ଠିକ.",             color: "#4E342E", page: "pages/contractors/index.html",  active: true  },
    { id: "equipment",   icon: "⚙️", label: "Equipment Rental",      label_odia: "ଯ. ଭ.",            color: "#37474F", page: "pages/equipment/index.html",    active: true  },
    { id: "vehicle",     icon: "🚗", label: "Vehicle Booking",       label_odia: "ଯ. ବ.",            color: "#1565C0", page: "pages/vehicle/index.html",      active: true  },
    { id: "food",        icon: "🍽️", label: "Food Delivery",         label_odia: "ଖ. ଡ.",            color: "#BF360C", page: "pages/food/index.html",         active: true  },
    { id: "marketplace", icon: "🛒", label: "Buy / Sell",            label_odia: "କ. ବ.",            color: "#6A1B9A", page: "pages/marketplace/index.html",  active: true  },
    { id: "haata",       icon: "🏪", label: "Sunday Haata",          label_odia: "ରବ. ହ.",           color: "#FF6F00", page: "pages/haata/index.html",        active: true  },
    { id: "workid",      icon: "🪪", label: "Digital Work ID",       label_odia: "ଡ. କ. ID",         color: "#263238", page: "pages/work-id/index.html",      active: true  },
  ],

  // ─── SUBSCRIPTION PLANS ─────────────────────────────────
  plans: [
    { id: "mini",    name: "Local Mini",     price: 10,   period: "month", features: ["1 product listing", "Basic profile", "WhatsApp contact"] },
    { id: "plus",    name: "Local Plus",     price: 20,   period: "month", features: ["5 product listings", "Photo gallery", "Priority listing", "WhatsApp contact"] },
    { id: "block",   name: "Block Plan",     price: 100,  period: "month", features: ["20 listings", "Block-level visibility", "Featured badge", "Analytics"] },
    { id: "district",name: "District Plan",  price: 999,  period: "month", features: ["Unlimited listings", "District visibility", "Featured + verified badge", "Priority support"] },
    { id: "super",   name: "Super Vendor",   price: 3999, period: "year",  features: ["Everything in District", "State-wide visibility", "Custom banner ads", "Dedicated support", "API access"] },
  ],

  // ─── GOOGLE INTEGRATION (add your keys here) ────────────
  google: {
    mapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
    sheetsScriptUrl: "YOUR_GOOGLE_APPS_SCRIPT_URL",
    analyticsId: "",
  },

  // ─── LOCATION DEFAULTS ───────────────────────────────────
  location: {
    defaultCity: "Kendrapara",
    defaultState: "Odisha",
    defaultLat: 20.5018,
    defaultLng: 86.4204,
    defaultZoom: 12,
  },

  // ─── BOOKING RULES ───────────────────────────────────────
  booking: {
    minHours: 1,
    maxHoursBeforeDaily: 8,
    maxDailyDays: 30,
    platformFeePercent: 5,
    currency: "₹",
    currencyCode: "INR",
  },

  // ─── FEATURES TOGGLES ────────────────────────────────────
  features: {
    showAnnouncements: true,
    showGoogleMaps: true,
    showSundayHaata: true,
    showWorkID: true,
    darkModeToggle: true,
    multiLanguage: true,   // EN + Odia
    whatsappBooking: true,
  },

};

// Make globally available
window.PT_CONFIG = PT_CONFIG;
