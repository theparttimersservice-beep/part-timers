/* =============================================
   THE PART-TIMERS — Dummy Data + Utilities
   =============================================*/

// ---- GOOGLE SHEETS CONFIG ----
const SHEETS_CONFIG = {
  // Replace with your Apps Script Web App URL
  apiUrl: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
  sheetId: 'YOUR_GOOGLE_SHEET_ID'
};

// ---- VILLAGES IN ODISHA ----
const VILLAGES = [
  'Bhubaneswar','Cuttack','Kendrapara','Aul','Puri','Berhampur',
  'Sambalpur','Balasore','Baripada','Jajpur','Jagatsinghpur',
  'Paradeep','Dhenkanal','Angul','Keonjhar','Phulbani','Rayagada'
];

// ---- DUMMY: WORKERS ----
const WORKERS = [
  { id:'w1', name:'Rabindra Nayak', village:'Kendrapara', category:'farming', subcat:'Tractor Operator', price:800, unit:'hr', rating:4.8, reviews:124, trust:92, phone:'verified', radius:10, emoji:'🚜', badge:'Popular', desc:'Experienced tractor operator with 8 years of field experience. Expert in plowing, harvesting & transportation.', odia:'ଅଭିଜ୍ଞ ଟ୍ରାକ୍ଟର ଅପରେଟର। ୮ ବର୍ଷ ଅନୁଭବ।' },
  { id:'w2', name:'Sushanta Behera', village:'Aul', category:'farming', subcat:'Farm Labourer', price:300, unit:'day', rating:4.6, reviews:87, trust:85, phone:'verified', radius:5, emoji:'🌾', badge:'Trusted', desc:'Hardworking farm labourer available for rice, wheat and vegetable cultivation.', odia:'ଧାନ, ଗହମ ଓ ପନିପରିବା ଚାଷ ପାଇଁ ଉପଲବ୍ଧ।' },
  { id:'w3', name:'Priya Das', village:'Bhubaneswar', category:'technician', subcat:'Electrician', price:400, unit:'visit', rating:4.9, reviews:203, trust:96, phone:'verified', radius:15, emoji:'⚡', badge:'Top Rated', desc:'Certified electrician. Wiring, motor repair, inverter installation. Available 24/7 for emergencies.', odia:'ସାର୍ଟିଫାଇଡ ଇଲେକ୍ଟ୍ରିସିଆନ। ୨୪/୭ ଜରୁରୀ ସେବା।' },
  { id:'w4', name:'Manoj Patel', village:'Cuttack', category:'technician', subcat:'Plumber', price:350, unit:'visit', rating:4.7, reviews:156, trust:88, phone:'verified', radius:10, emoji:'🔧', badge:'Verified', desc:'Expert plumber for all domestic and commercial plumbing needs. Pipe fitting, bore well repair.', odia:'ଘରୋଇ ଓ ବ୍ୟବସାୟିକ ପ୍ଲମ୍ବିଂ ସେବା।' },
  { id:'w5', name:'Suresh Sahoo', village:'Jagatsinghpur', category:'fish', subcat:'Fish Farm Worker', price:280, unit:'day', rating:4.5, reviews:64, trust:80, phone:'verified', radius:8, emoji:'🐟', badge:'Local', desc:'Expert in pond management, fish feeding, harvesting and aquaculture maintenance.', odia:'ମାଛ ଚାଷ, ଖୁଆଇବା, ମାଛ ଧରିବା ଅଭିଜ୍ଞ।' },
  { id:'w6', name:'Anita Mohanty', village:'Puri', category:'poultry', subcat:'Poultry Worker', price:250, unit:'day', rating:4.4, reviews:41, trust:78, phone:'verified', radius:6, emoji:'🐓', badge:'Local', desc:'Experienced poultry farm worker. Hen/duck farming, egg collection, vaccination assistance.', odia:'ମୁର୍ଗୀ ଚାଷ, ଅଣ୍ଡା ସଂଗ୍ରହ, ଟୀକା ଦେବା ଅଭିଜ୍ଞ।' },
  { id:'w7', name:'Dipak Jena', village:'Kendrapara', category:'contractor', subcat:'Local Contractor', price:1500, unit:'day', rating:4.3, reviews:78, trust:82, phone:'verified', radius:20, emoji:'🏗️', badge:'Local', desc:'Home construction, renovation and repair work. Masonry, plastering, tiles. 10 years experience.', odia:'ଘର ନିର୍ମାଣ, ମରାମତି। ୧୦ ବର୍ଷ ଅଭିଜ୍ଞ।' },
  { id:'w8', name:'Rohit Kumar', village:'Bhubaneswar', category:'contractor', subcat:'Verified Contractor', price:2500, unit:'day', rating:4.8, reviews:312, trust:95, phone:'verified', radius:30, emoji:'🏢', badge:'Verified Pro', desc:'Licensed civil contractor with portfolio of 50+ completed projects. Residential & commercial.', odia:'ଲାଇସେନ୍ସ ପ୍ରାପ୍ତ ଠିକାଦାର। ୫୦+ ପ୍ରୋଜେକ୍ଟ।' },
  { id:'w9', name:'Sanjay Mishra', village:'Cuttack', category:'vehicle', subcat:'Auto Driver', price:15, unit:'km', rating:4.6, reviews:234, trust:90, phone:'verified', radius:25, emoji:'🛺', badge:'Trusted', desc:'Auto-rickshaw available for village transport, market trips and outstation travel.', odia:'ଗ୍ରାମ ପରିବହନ, ବଜାର ଯାତ୍ରା ପାଇଁ ଉପଲବ୍ଧ।' },
  { id:'w10', name:'Bijay Pradhan', village:'Balasore', category:'vehicle', subcat:'Pickup Truck', price:12, unit:'km', rating:4.7, reviews:98, trust:87, phone:'verified', radius:40, emoji:'🚚', badge:'Verified', desc:'Pickup truck for goods transportation, shifting and agricultural produce delivery.', odia:'ଦ୍ରବ୍ୟ ପରିବହନ ଓ କୃଷି ଉତ୍ପାଦ ଡେଲିଭରୀ।' },
  { id:'w11', name:'Kavita Nanda', village:'Bhubaneswar', category:'learning', subcat:'Math & Science Tutor', price:500, unit:'month', rating:4.9, reviews:189, trust:94, phone:'verified', radius:5, emoji:'📚', badge:'Top Rated', desc:'BSc graduate. Class 6–10 Math, Science and English. Online and home tuition available.', odia:'ଷଷ୍ଠ–ଦଶମ ଶ୍ରେଣୀ ଗଣିତ, ବିଜ୍ଞାନ ଟ୍ୟୁସନ।' },
  { id:'w12', name:'Prakash Dash', village:'Puri', category:'learning', subcat:'Music Teacher', price:800, unit:'month', rating:4.8, reviews:67, trust:91, phone:'verified', radius:10, emoji:'🎵', badge:'Certified', desc:'Harmonium & tabla teacher. 15 years experience. Classical music lessons for all ages.', odia:'ହାରମୋନିୟମ ଓ ତବଲା ଶିକ୍ଷକ। ଶାସ୍ତ୍ରୀୟ ସଙ୍ଗୀତ।' }
];

// ---- DUMMY: VENDORS (Food) ----
const VENDORS = [
  {
    id:'v1', name:'Amma Kitchen', village:'Kendrapara', category:'instant',
    emoji:'🍛', badge:'Popular', rating:4.8, reviews:234,
    desc:'Authentic Odia home-cooked food. Dalma, rice, fish curry prepared fresh daily.',
    odia:'ଖାଁଟି ଓଡ଼ିଆ ଘର ଖାଦ୍ୟ। ଡାଲ୍‌ମା, ଭାତ, ମାଛ ତରକାରି।',
    products:[
      {name:'Dalma + Rice Thali', price:80, desc:'Traditional Odia dalma with steamed rice, pickle and papad'},
      {name:'Fish Curry Thali', price:120, desc:'Fresh fish curry with rice, dal and vegetable'},
      {name:'Pakhala Bhata', price:40, desc:'Fermented rice with curd and fried items — classic summer meal'}
    ]
  },
  {
    id:'v2', name:'Green Harvest Vegetables', village:'Aul', category:'vegetables',
    emoji:'🥦', badge:'Fresh Daily', rating:4.9, reviews:312,
    desc:'Farm-fresh vegetables delivered from fields to your doorstep every morning.',
    odia:'ଖାଳ ଓ ଜମିରୁ ସିଧା ତଜ ପନିପରିବା।',
    products:[
      {name:'Tomato 1kg', price:30, desc:'Fresh tomatoes, naturally grown'},
      {name:'Potato 5kg', price:90, desc:'Premium quality potatoes'},
      {name:'Seasonal Mix Box', price:120, desc:'Mixed seasonal vegetables basket — 3kg variety box'}
    ]
  },
  {
    id:'v3', name:'Jagannath Grocery Store', village:'Puri', category:'grocery',
    emoji:'🛒', badge:'Trusted', rating:4.7, reviews:178,
    desc:'Complete grocery items — rice, dal, oil, spices, flour — delivered to villages.',
    odia:'ଚାଉଳ, ଡାଲ, ତେଲ, ମସଲା — ସବୁ ଗ୍ରୋସରୀ।',
    products:[
      {name:'Rice 10kg', price:480, desc:'Sona Masoori quality rice'},
      {name:'Mustard Oil 1L', price:170, desc:'Pure mustard oil, cold pressed'},
      {name:'Dal Pack (3 types)', price:220, desc:'Toor, Moong and Chana dal — 1kg each'}
    ]
  },
  {
    id:'v4', name:'Morning Dew Farm', village:'Cuttack', category:'vegetables',
    emoji:'🌽', badge:'Organic', rating:4.6, reviews:89,
    desc:'Certified organic vegetables. No pesticides. Grown with natural compost.',
    odia:'ଜୈବିକ ପ୍ରମାଣିତ ପନିପରିବା। ରାସାୟନିକ ସାର ନାହିଁ।',
    products:[
      {name:'Organic Spinach', price:25, desc:'Fresh organic spinach bundle'},
      {name:'Organic Brinjal 1kg', price:35, desc:'Pesticide-free brinjal'},
      {name:'Organic Combo Box', price:200, desc:'5kg mixed organic vegetables'}
    ]
  }
];

// ---- DUMMY: EQUIPMENT RENTAL ----
const EQUIPMENT = [
  { id:'e1', name:'Mahindra Tractor 35HP', village:'Kendrapara', price:800, unit:'hr', rating:4.8, reviews:87, emoji:'🚜', desc:'Well-maintained tractor with multiple implements. Plowing, seeding, harvesting.' },
  { id:'e2', name:'Power Tiller', village:'Aul', price:350, unit:'hr', rating:4.6, reviews:54, emoji:'⚙️', desc:'Compact power tiller ideal for small farms and vegetable gardens.' },
  { id:'e3', name:'Threshing Machine', village:'Bhubaneswar', price:600, unit:'day', rating:4.7, reviews:43, emoji:'🌾', desc:'Electric threshing machine for rice and wheat. High capacity output.' },
  { id:'e4', name:'Water Pump 3HP', village:'Cuttack', price:200, unit:'day', rating:4.5, reviews:76, emoji:'💧', desc:'Diesel water pump for irrigation. 3HP capacity.' },
  { id:'e5', name:'Mini Excavator', village:'Bhubaneswar', price:3500, unit:'day', rating:4.9, reviews:32, emoji:'🏗️', desc:'Small excavator for pond digging, foundation work and land levelling.' }
];

// ---- DUMMY: HAATA PRODUCTS (Sunday Market) ----
const HAATA_PRODUCTS = [
  { id:'h1', name:'Bamboo Basket', seller:'Priyanka Devi', village:'Dhenkanal', price:120, category:'handicraft', emoji:'🧺', desc:'Hand-woven bamboo basket, traditional Odia craft' },
  { id:'h2', name:'Organic Turmeric 500g', seller:'Gouranga Sahu', village:'Kendrapara', price:80, category:'spices', emoji:'🌿', desc:'Farm-fresh organic turmeric powder' },
  { id:'h3', name:'Mud Pot Set', seller:'Ramkrishna Kumbhar', village:'Puri', price:350, category:'pottery', emoji:'🏺', desc:'Traditional clay pot set, 3 pieces' },
  { id:'h4', name:'Handloom Saree', seller:'Sunita Weaver', village:'Sambalpur', price:2200, category:'clothing', emoji:'👘', desc:'Authentic Sambalpur handloom ikat saree' },
  { id:'h5', name:'Forest Honey 500ml', seller:'Tribal Cooperative', village:'Rayagada', price:280, category:'food', emoji:'🍯', desc:'Pure wild forest honey collected by tribal community' },
  { id:'h6', name:'Brass Lamp (Diyo)', seller:'Metalcraft Odisha', village:'Cuttack', price:450, category:'handicraft', emoji:'🪔', desc:'Traditional brass diyo, hand-crafted' },
  { id:'h7', name:'Dried Mango Slices', seller:'Sundar Orchard', village:'Ganjam', price:60, category:'food', emoji:'🥭', desc:'Sun-dried mango slices, no preservatives, 200g' },
  { id:'h8', name:'Wooden Toy Set', seller:'Folk Art Odisha', village:'Pipili', price:180, category:'handicraft', emoji:'🪆', desc:'Traditional painted wooden toys for children' }
];

// ---- UTILITY: Show Toast ----
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast'; t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ---- UTILITY: Format Price ----
function fmtPrice(p, unit='') {
  return '₹' + p.toLocaleString('en-IN') + (unit ? '/'+unit : '');
}

// ---- UTILITY: Stars HTML ----
function starsHtml(r) {
  const full = Math.floor(r), half = r % 1 >= 0.5;
  let s = '';
  for(let i=0;i<full;i++) s+='⭐';
  if(half) s+='✨';
  return `<span class="stars">${s}</span> <span style="font-size:12px;color:#666">${r} (${Math.floor(Math.random()*200+20)})</span>`;
}

// ---- UTILITY: Render Bottom Nav ----
function renderNav(active) {
  const items = [
    {icon:'🏠', label:'Home\nଘର', href:'../index.html'},
    {icon:'🔍', label:'Search\nଖୋଜନ୍ତୁ', href:'search.html'},
    {icon:'📋', label:'My Orders\nମୋ ଅର୍ଡର', href:'orders.html'},
    {icon:'💬', label:'Chat\nଚାଟ୍', href:'#'},
    {icon:'👤', label:'Profile\nପ୍ରୋଫାଇଲ', href:'profile.html'}
  ];
  return `<nav class="bottom-nav">
    ${items.map((it,i)=>`<a href="${it.href}" class="nav-item${i===active?' active':''}">
      <div class="nav-icon">${it.icon}</div>
      <div class="nav-label">${it.label.replace('\n','<br>')}</div>
    </a>`).join('')}
  </nav>`;
}

// ---- GOOGLE SHEETS API ----
async function sheetsRead(sheet) {
  try {
    const res = await fetch(`${SHEETS_CONFIG.apiUrl}?action=read&sheet=${sheet}`);
    return await res.json();
  } catch(e) { console.warn('Sheets offline, using local data'); return null; }
}
async function sheetsWrite(sheet, data) {
  try {
    const res = await fetch(SHEETS_CONFIG.apiUrl, {
      method:'POST',
      body: JSON.stringify({action:'write', sheet, data})
    });
    return await res.json();
  } catch(e) { console.warn('Sheets write failed'); return null; }
}

// ---- GEOLOCATION ----
function getUserLocation(cb) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => cb({lat: pos.coords.latitude, lng: pos.coords.longitude}),
      () => cb({lat: 20.2961, lng: 85.8246}) // Default: Bhubaneswar
    );
  } else cb({lat: 20.2961, lng: 85.8246});
}

// ---- SMART SEARCH ----
function smartSearch(query, items) {
  query = query.toLowerCase().trim();
  if (!query) return items;
  return items.filter(item => {
    const text = JSON.stringify(item).toLowerCase();
    return query.split(' ').every(word => text.includes(word));
  });
}
