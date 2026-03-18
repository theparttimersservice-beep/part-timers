/**
 * THE PART-TIMERS — Master Config v5
 * Vision: Every person gives & takes service. Every rural person sells anything.
 * Empowering Rural India, One Job at a Time.
 */

const PT_CONFIG = {

  brand: {
    name: "The Part-Timers",
    tagline: "Empowering Rural India, One Job at a Time",
    tagline_odia: "ଗ୍ରାମୀଣ ଭାରତକୁ ଶକ୍ତିଶାଳୀ କରୁ, ଏକ କାମ ଏକ ସ୍ୱପ୍ନ",
    logoEmoji: "🌾",
    logoUrl: "",
    favicon: "🌾",
    email: "hello@theparttimers.in",
    phone: "+91-XXXXXXXXXX",
    whatsapp: "91XXXXXXXXXX",
    address: "Kendrapara, Odisha, India",
    facebook: "", instagram: "", youtube: "", twitter: "",
    heroTitle: "ଗ୍ରାମୀଣ ସେବା — ଆଜି ଖୋଜ, ଆଜି ଦ",
    heroSubtitle: "Find • Hire • Sell • Earn — Everything in your Village",
  },

  colors: {
    primary: "#2E7D32", primaryLight: "#4CAF50", primaryDark: "#1B5E20",
    accent: "#FF6F00", accentLight: "#FFA726",
    bg: "#F1F8E9", surface: "#FFFFFF",
    text: "#1A1A1A", textMuted: "#5D5D5D", textLight: "#9E9E9E",
    border: "#E0E0E0", success: "#2E7D32", warning: "#F57C00",
    danger: "#C62828", info: "#0277BD",
  },

  announcements: [
    "🌾 The Part-Timers — ଗ୍ରାମୀଣ ଭାରତ ପ୍ଲାଟଫର୍ମ | ସ୍ୱାଗତ! — Welcome to Odisha's #1 Rural App",
    "🐟 ମାଛ ଚାଷ, ଚିଙ୍ଗୁଡ଼ି, ବାୟୋଫ୍ଲକ ସ. ଦ. — Fish & Aqua workers available near you",
    "🪡 SHG ମହିଳା ଉତ୍ପାଦ ବିକ — SHG Women products: Papad, Badi, Saree, Honey now listed",
    "🐓 Poultry & Goat ସ. ଦ. — Poultry & Livestock workers & sellers near you",
    "🌾 ଖରିଫ ମୌସୁମ — ଏବ ଟ୍ରାକ୍ଟର, ଶ୍ରମିକ ବୁ. — Kharif season: book tractor & farm labour now",
    "🛒 ₹10/month — Join & sell your products to nearby villages. No commission!",
    "📱 Demo OTP: 1234 | Admin: admin / admin123",
  ],

  // ALL 20 CATEGORIES from the vision document
  categories: [
    { id:"farming",     icon:"🌾", label:"Crop Farming",        label_odia:"ଚାଷ କାମ",         color:"#388E3C", page:"pages/farming/index.html",      active:true  },
    { id:"fish",        icon:"🐟", label:"Fish & Aqua",          label_odia:"ମାଛ ଚାଷ",          color:"#0277BD", page:"pages/fish/index.html",          active:true  },
    { id:"poultry",     icon:"🐓", label:"Poultry & Livestock",  label_odia:"ପୋଲ୍ଟ୍ରି ପଶୁ",    color:"#E65100", page:"pages/poultry/index.html",        active:true  },
    { id:"shg",         icon:"🪡", label:"SHG Women Work",       label_odia:"ମହ. ସ. ଗ.",        color:"#AD1457", page:"pages/shg/index.html",           active:true  },
    { id:"learning",    icon:"📚", label:"Tuition & Coaching",   label_odia:"ଶିକ୍ଷା ଓ ଟ.",      color:"#4527A0", page:"pages/learning/index.html",       active:true  },
    { id:"technician",  icon:"🔧", label:"Construction & Repair",label_odia:"ନ. ଓ ମ.",          color:"#006064", page:"pages/technicians/index.html",    active:true  },
    { id:"vehicle",     icon:"🚗", label:"Transport & Vehicle",  label_odia:"ଯ. ସ.",             color:"#1565C0", page:"pages/vehicle/index.html",        active:true  },
    { id:"contractor",  icon:"🏗️", label:"Contractors",          label_odia:"ଠ. ଦ.",             color:"#4E342E", page:"pages/contractors/index.html",    active:true  },
    { id:"equipment",   icon:"⚙️", label:"Tools & Rentals",      label_odia:"ଯ. ଭ.",             color:"#37474F", page:"pages/equipment/index.html",      active:true  },
    { id:"food",        icon:"🍽️", label:"Food & Tiffin",        label_odia:"ଖା. ଓ ଟ.",          color:"#BF360C", page:"pages/food/index.html",           active:true  },
    { id:"marketplace", icon:"🛒", label:"Buy / Sell / Rent",    label_odia:"କ. ବ. ଭ.",          color:"#6A1B9A", page:"pages/marketplace/index.html",    active:true  },
    { id:"haata",       icon:"🏪", label:"Sunday Haata",         label_odia:"ରବ. ହ.",            color:"#FF6F00", page:"pages/haata/index.html",           active:true  },
    { id:"doctor",      icon:"🏥", label:"Doctor & Health",      label_odia:"ଡ. ଓ ସ.",           color:"#C62828", page:"pages/doctor/index.html",          active:true  },
    { id:"legal",       icon:"⚖️", label:"Legal & Lawyer",       label_odia:"ଆ. ସ.",             color:"#263238", page:"pages/legal-service/index.html",  active:true  },
    { id:"photo",       icon:"📸", label:"Photo & Video",        label_odia:"ଫ. ଓ ଭ.",           color:"#1A237E", page:"pages/photo/index.html",           active:true  },
    { id:"event",       icon:"🎪", label:"Tent & Events",        label_odia:"ତ. ଓ ଇ.",           color:"#880E4F", page:"pages/event/index.html",           active:true  },
    { id:"pandit",      icon:"🙏", label:"Pandit & Pooja",       label_odia:"ପ. ଓ ପ.",           color:"#E65100", page:"pages/pandit/index.html",          active:true  },
    { id:"mushroom",    icon:"🍄", label:"Mushroom & Bees",      label_odia:"ମ. ଓ ମ.",           color:"#558B2F", page:"pages/mushroom/index.html",        active:true  },
    { id:"pharmacy",    icon:"💊", label:"Pharmacy & Medical",   label_odia:"ଔ. ଓ ଚ.",           color:"#00695C", page:"pages/pharmacy/index.html",        active:true  },
    { id:"workid",      icon:"🪪", label:"Digital Work ID",      label_odia:"ଡ. ୱ. ID",          color:"#212121", page:"pages/work-id/index.html",         active:true  },
  ],

  // PRICING PLANS — exactly from the PDF
  plans: [
    { id:"mini",     name:"Local Mini",     name_odia:"ଲ. ମ.",    price:10,   period:"month", visibility:"5 km",        maxItems:5,   salesRange:"₹0–₹1,000/month",   features:["5 product listings","Within 5 km reach","WhatsApp contact","Weekly Haata slot","Basic profile"] },
    { id:"plus",     name:"Local Plus",     name_odia:"ଲ. ପ.",    price:20,   period:"month", visibility:"5 km+",       maxItems:10,  salesRange:"₹1k–₹10k/month",    features:["10 product listings","5 km + Highlighted","Priority in search","Photo gallery","Sunday Haata featured"] },
    { id:"block",    name:"Block Reach",    name_odia:"ବ. ର.",    price:100,  period:"month", visibility:"1 Block ~15km",maxItems:20, salesRange:"₹10k–₹1L/month",    features:["20 listings","Block-level (~15 km)","Featured badge","Analytics dashboard","Tool rental listing"] },
    { id:"district", name:"District Seller",name_odia:"ଜ. ସ.",   price:999,  period:"month", visibility:"Full District", maxItems:50, salesRange:"₹1L–₹10L/month",   features:["50 listings","Full district visibility","Verified badge","Priority support","Ad space in app"] },
    { id:"super",    name:"Super Vendor",   name_odia:"ସ. ଭ.",    price:3999, period:"year",  visibility:"Full State",   maxItems:999,salesRange:"₹10L+/month",      features:["Unlimited listings","State-wide visibility","Custom banner ads","Dedicated support","API access","Export/import tools"] },
  ],

  google: {
    mapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
    sheetsScriptUrl: "YOUR_GOOGLE_APPS_SCRIPT_URL",
    analyticsId: "",
  },

  location: {
    defaultCity: "Kendrapara", defaultState: "Odisha",
    defaultLat: 20.5018, defaultLng: 86.4204, defaultZoom: 11,
  },

  booking: {
    minHours: 1, maxHoursBeforeDaily: 8, maxDailyDays: 30,
    platformFeePercent: 0,  // 0% commission — unique selling point
    currency: "₹", currencyCode: "INR",
  },

  features: {
    showAnnouncements: true, showGoogleMaps: true,
    showSundayHaata: true,   showWorkID: true,
    darkModeToggle: true,    multiLanguage: true,
    whatsappBooking: true,   voiceMode: false,
    zeroCommission: true,
  },
};

window.PT_CONFIG = PT_CONFIG;
