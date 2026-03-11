/* ============================================================
   THE PART-TIMERS — Shared JS
   Data store, search, navigation helpers
   ============================================================ */

/* ── Dummy Data ── */
const PT_DATA = {
  workers: [
    { id:'w1', name:'Ramesh Sahu', odia:'ରମେଶ ସାହୁ', village:'Kendrapara', category:'farming', price:'₹350/day', rating:4.8, reviews:42, trust:88, radius:10, phone:'9861XXXXXX', emoji:'🌾', verified:true, tags:['Rice Harvest','Plowing','Weeding'] },
    { id:'w2', name:'Binod Pradhan', odia:'ବିନୋଦ ପ୍ରଧାନ', village:'Aul', category:'farming', price:'₹300/day', rating:4.6, reviews:30, trust:75, radius:15, phone:'9437XXXXXX', emoji:'🌾', verified:false, tags:['Transplanting','Irrigation'] },
    { id:'w3', name:'Sushil Behera', odia:'ସୁଶୀଳ ବେହେରା', village:'Rajnagar', category:'fishing', price:'₹400/day', rating:4.9, reviews:61, trust:92, radius:20, phone:'7978XXXXXX', emoji:'🐟', verified:true, tags:['Net Fishing','Boat Operator'] },
    { id:'w4', name:'Pradeep Das', odia:'ପ୍ରଦୀପ ଦାସ', village:'Bhubaneswar', category:'technician', price:'₹500/visit', rating:4.7, reviews:88, trust:90, radius:15, phone:'8763XXXXXX', emoji:'⚡', verified:true, tags:['Electrician','Wiring','Solar'] },
    { id:'w5', name:'Santosh Nayak', odia:'ସନ୍ତୋଷ ନାୟକ', village:'Cuttack', category:'technician', price:'₹400/visit', rating:4.5, reviews:55, trust:82, radius:20, phone:'9040XXXXXX', emoji:'🔧', verified:true, tags:['Plumber','Motor Repair'] },
    { id:'w6', name:'Suresh Patra', odia:'ସୁରେଶ ପାତ୍ର', village:'Puri', category:'contractor', price:'₹800/day', rating:4.8, reviews:34, trust:85, radius:25, phone:'7008XXXXXX', emoji:'🏗️', verified:true, tags:['House Construction','Renovation'] },
    { id:'w7', name:'Mamata Jena', odia:'ମମତା ଜେନା', village:'Baripada', category:'teacher', price:'₹200/hr', rating:4.9, reviews:72, trust:95, radius:5, phone:'9439XXXXXX', emoji:'📚', verified:true, tags:['Maths','Science','English'] },
    { id:'w8', name:'Gopal Mohanty', odia:'ଗୋପାଳ ମହାନ୍ତି', village:'Rourkela', category:'teacher', price:'₹150/hr', rating:4.7, reviews:48, trust:88, radius:8, phone:'8260XXXXXX', emoji:'🎵', verified:false, tags:['Harmonium','Tabla','Music'] },
    { id:'w9', name:'Deepak Mishra', odia:'ଦୀପକ ମିଶ୍ର', village:'Sambalpur', category:'poultry', price:'₹400/day', rating:4.6, reviews:22, trust:78, radius:12, phone:'9778XXXXXX', emoji:'🐔', verified:false, tags:['Poultry Care','Egg Collection'] },
    { id:'w10',name:'Bikash Swain', odia:'ବିକାଶ ସ୍ୱାଇଁ', village:'Berhampur', category:'fishing', price:'₹350/day', rating:4.5, reviews:39, trust:80, radius:18, phone:'8018XXXXXX', emoji:'🦐', verified:true, tags:['Aquaculture','Pond Management'] },
  ],
  equipment: [
    { id:'e1', name:'Mahindra Tractor', odia:'ଟ୍ରାକ୍ଟର', village:'Kendrapara', price:'₹800/hr', rating:4.8, emoji:'🚜', radius:20, tags:['Plowing','Harvesting','Transport'] },
    { id:'e2', name:'Power Tiller', odia:'ପାୱାର ଟିଲ୍ଲର', village:'Aul', price:'₹400/hr', rating:4.6, emoji:'🚜', radius:10, tags:['Small Farms','Gardens'] },
    { id:'e3', name:'Thresher Machine', odia:'ଥ୍ରେଶର', village:'Rajnagar', price:'₹600/day', rating:4.7, emoji:'⚙️', radius:15, tags:['Rice','Wheat'] },
    { id:'e4', name:'Water Pump', odia:'ଜଳ ପମ୍ପ', village:'Bhubaneswar', price:'₹200/day', rating:4.5, emoji:'💧', radius:10, tags:['Irrigation','Flood Control'] },
    { id:'e5', name:'Mini JCB', odia:'ଜେସିବି', village:'Cuttack', price:'₹2500/day', rating:4.9, emoji:'🏗️', radius:30, tags:['Excavation','Foundation'] },
    { id:'e6', name:'Concrete Mixer', odia:'ସିମେଣ୍ଟ ମିକ୍ସର', village:'Puri', price:'₹500/day', rating:4.6, emoji:'🔩', radius:20, tags:['Construction','Renovation'] },
  ],
  vehicles: [
    { id:'v1', name:'Mahindra Bolero', village:'Bhubaneswar', price:'₹15/km', rating:4.9, emoji:'🚗', seats:7, type:'SUV' },
    { id:'v2', name:'TATA Ace Mini Truck', village:'Cuttack', price:'₹800/trip', rating:4.7, emoji:'🚛', seats:2, type:'Goods' },
    { id:'v3', name:'Motorcycle (Hero)', village:'Kendrapara', price:'₹300/day', rating:4.6, emoji:'🏍️', seats:1, type:'Bike' },
    { id:'v4', name:'Auto Rickshaw', village:'Puri', price:'₹12/km', rating:4.8, emoji:'🛺', seats:3, type:'Auto' },
    { id:'v5', name:'Tractor Trolley', village:'Aul', price:'₹500/trip', rating:4.5, emoji:'🚜', seats:10, type:'Goods' },
    { id:'v6', name:'Electric Scooty', village:'Bhubaneswar', price:'₹200/day', rating:4.7, emoji:'🛵', seats:1, type:'Bike' },
  ],
  food_vendors: [
    { id:'f1', name:'Maa Tarini Kitchen', odia:'ମାଁ ତାରିଣୀ ରୋଷେଇ', village:'Kendrapara', rating:4.9, emoji:'🍛', category:'instant', products:[
      { name:'Odia Thali', price:'₹120', desc:'Traditional rice, dal, sabji, fish curry & papad. Authentic homemade taste. Served fresh daily.' },
      { name:'Pakhala Bhata', price:'₹60', desc:'Fermented rice with onion, fried fish, badi chura. Classic Odia comfort food.' },
      { name:'Dalma', price:'₹80', desc:'Lentils cooked with mixed vegetables, ghee tadka. A staple Odia delicacy.' },
    ]},
    { id:'f2', name:'Shiva Vegetable Hub', odia:'ଶିବ ପରିବା ଦୋକାନ', village:'Aul', rating:4.7, emoji:'🥬', category:'vegetables', products:[
      { name:'Mixed Veg Pack 1kg', price:'₹45', desc:'Seasonal fresh vegetables: tomato, brinjal, pumpkin, beans. Harvested daily from local farms.' },
      { name:'Green Leafy Bundle', price:'₹25', desc:'Spinach, methi, amaranth leaves. Pesticide-free, farm fresh, cleaned & packed.' },
      { name:'Potato 5kg', price:'₹80', desc:'Fresh local potatoes, no cold storage. Direct from Kendrapara farms.' },
    ]},
    { id:'f3', name:'Rajesh Grocery Store', odia:'ରାଜେଶ ଗ୍ରୋସେରୀ', village:'Rajnagar', rating:4.8, emoji:'🛒', category:'grocery', products:[
      { name:'Rice 10kg', price:'₹350', desc:'Premium HMT Arwa rice, locally grown in Odisha. Clean, no stones, sealed packaging.' },
      { name:'Mustard Oil 1L', price:'₹150', desc:'Cold-pressed kachi ghani mustard oil. Pure, aromatic, traditional. No adulteration.' },
      { name:'Dal Combo Pack', price:'₹120', desc:'Arhar + Moong + Chana 500g each. Best quality sourced from local traders.' },
    ]},
    { id:'f4', name:'Deepa Fast Food', odia:'ଦୀପା ଫଷ୍ଟ ଫୁଡ', village:'Bhubaneswar', rating:4.6, emoji:'🍲', category:'instant', products:[
      { name:'Chhena Poda', price:'₹50', desc:'Authentic Odia sweet made with homemade chhena, caramelized crust. Freshly baked daily.' },
      { name:'Pakoda Platter', price:'₹40', desc:'Crispy mixed vegetable and onion pakodas with green chutney. Made on order.' },
      { name:'Chuda Ghuguni', price:'₹35', desc:'Flattened rice with black pea curry, coconut, onion. Classic Odia street food.' },
    ]},
  ],
  marketplace: [
    { id:'m1', title:'Honda Shine 2019 – Good Condition', price:'₹42,000', village:'Cuttack', category:'vehicles', emoji:'🏍️', desc:'40,000km, single owner, all documents clear.' },
    { id:'m2', title:'Samsung TV 32" Smart', price:'₹8,500', village:'Bhubaneswar', category:'electronics', emoji:'📺', desc:'3 years old, works perfect, remote included.' },
    { id:'m3', title:'Paddy Land For Lease', price:'₹12,000/season', village:'Kendrapara', category:'land', emoji:'🌾', desc:'2 acre fertile land near river. Irrigation available.' },
    { id:'m4', title:'Goat Pair (Male+Female)', price:'₹8,000', village:'Aul', category:'animals', emoji:'🐐', desc:'Healthy Black Bengal goats, vaccinated, 2 years old.' },
    { id:'m5', title:'Welding Machine', price:'₹6,000', village:'Puri', category:'tools', emoji:'🔧', desc:'Arc welder, 200A, barely used, with rods.' },
    { id:'m6', title:'Study Table & Chair Set', price:'₹1,800', village:'Berhampur', category:'furniture', emoji:'🪑', desc:'Solid wood, minor scratches, very sturdy.' },
  ],
  haata_items: [
    { id:'h1', name:'Fresh Pomfret Fish', price:'₹280/kg', vendor:'Sukanta Fisheries', village:'Rajnagar', emoji:'🐠', qty:'50 kg available' },
    { id:'h2', name:'Organic Turmeric', price:'₹180/kg', vendor:'Priya Spices', village:'Kendrapara', emoji:'🌿', qty:'20 kg available' },
    { id:'h3', name:'Handloom Saree', price:'₹1,200', vendor:'Meera Weaves', village:'Nuapatna', emoji:'👘', qty:'15 pieces' },
    { id:'h4', name:'Desi Chicken', price:'₹350/kg', vendor:'Ram Poultry', village:'Aul', emoji:'🐔', qty:'Live birds available' },
    { id:'h5', name:'Village Honey', price:'₹500/kg', vendor:'Forest Honey Co.', village:'Mayurbhanj', emoji:'🍯', qty:'10 kg available' },
    { id:'h6', name:'Banana Bunch', price:'₹80', vendor:'Sanjay Farms', village:'Cuttack', emoji:'🍌', qty:'100 bunches' },
    { id:'h7', name:'Earthen Pots', price:'₹120 set', vendor:'Kumhar Ghar', village:'Puri', emoji:'🏺', qty:'Handmade, limited' },
    { id:'h8', name:'Neem Sticks Bundle', price:'₹30', vendor:'Herbal Village', village:'Sambalpur', emoji:'🌱', qty:'200 bundles' },
  ],
  villages: ['Bhubaneswar','Cuttack','Kendrapara','Aul','Rajnagar','Puri','Berhampur','Sambalpur','Baripada','Rourkela','Balasore','Dhenkanal','Angul','Jajpur','Koraput','Mayurbhanj','Nuapatna','Jeypore','Paralakhemundi','Sundargarh'],
};

/* ── Google Sheets API (placeholder — replace SHEET_ID and API endpoint) ── */
const SHEETS_CONFIG = {
  // Replace with your deployed Google Apps Script Web App URL
  apiUrl: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
  sheetId: 'YOUR_GOOGLE_SHEET_ID',
};

async function sheetsGet(action, params = {}) {
  try {
    const url = new URL(SHEETS_CONFIG.apiUrl);
    url.searchParams.set('action', action);
    Object.entries(params).forEach(([k,v]) => url.searchParams.set(k, v));
    const res = await fetch(url.toString());
    return await res.json();
  } catch(e) {
    console.warn('Sheets API unavailable, using local data:', e.message);
    return null;
  }
}

async function sheetsPost(action, data) {
  try {
    const res = await fetch(SHEETS_CONFIG.apiUrl, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ action, ...data }),
    });
    return await res.json();
  } catch(e) {
    console.warn('Sheets API unavailable:', e.message);
    return null;
  }
}

/* ── Smart Search Engine ── */
function searchWorkers(query, filters = {}) {
  query = (query || '').toLowerCase();
  let results = PT_DATA.workers.filter(w => {
    const text = `${w.name} ${w.category} ${w.village} ${w.tags.join(' ')}`.toLowerCase();
    const matchQuery = !query || text.includes(query);
    const matchCat = !filters.category || w.category === filters.category;
    const matchVillage = !filters.village || w.village.toLowerCase().includes(filters.village.toLowerCase());
    const matchRating = !filters.minRating || w.rating >= parseFloat(filters.minRating);
    const matchRadius = !filters.radius || w.radius <= parseInt(filters.radius);
    return matchQuery && matchCat && matchVillage && matchRating && matchRadius;
  });
  if (filters.sort === 'price') results.sort((a,b) => parseInt(a.price) - parseInt(b.price));
  else if (filters.sort === 'rating') results.sort((a,b) => b.rating - a.rating);
  return results;
}

function searchAll(query) {
  query = query.toLowerCase();
  const results = [];
  PT_DATA.workers.forEach(w => {
    const t = `${w.name} ${w.category} ${w.village} ${w.tags.join(' ')}`.toLowerCase();
    if (t.includes(query)) results.push({ type:'worker', ...w });
  });
  PT_DATA.equipment.forEach(e => {
    const t = `${e.name} ${e.village} ${e.tags.join(' ')}`.toLowerCase();
    if (t.includes(query)) results.push({ type:'equipment', ...e });
  });
  PT_DATA.food_vendors.forEach(v => {
    const t = `${v.name} ${v.village} ${v.category}`.toLowerCase();
    if (t.includes(query)) results.push({ type:'food', ...v });
  });
  PT_DATA.marketplace.forEach(m => {
    const t = `${m.title} ${m.village} ${m.category}`.toLowerCase();
    if (t.includes(query)) results.push({ type:'market', ...m });
  });
  return results;
}

/* ── Local cart / booking state ── */
const PT_CART = { items: [], total: 0 };
function addToCart(item) {
  PT_CART.items.push({ ...item, qty: 1 });
  PT_CART.total += parseInt((item.price || '0').replace(/[^\d]/g,''));
  updateCartBadge();
}
function updateCartBadge() {
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = PT_CART.items.length;
    el.style.display = PT_CART.items.length ? 'flex' : 'none';
  });
}

/* ── Geolocation helper ── */
function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) { reject('Geolocation not supported'); return; }
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      err => reject(err.message)
    );
  });
}

/* ── Google Maps loader ── */
function initMap(containerId, lat = 20.2961, lng = 85.8245, zoom = 12) {
  // Placeholder — real Maps API key needed
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
    <div style="width:100%;height:100%;background:linear-gradient(135deg,#e8f5e9,#c8e6c9);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;border-radius:12px;">
      <div style="font-size:40px;">🗺️</div>
      <div style="font-size:13px;font-weight:700;color:#388E3C;">Map View — Odisha</div>
      <div style="font-size:11px;color:#666;text-align:center;padding:0 16px;">
        📍 ${lat.toFixed(4)}, ${lng.toFixed(4)}<br>
        Add Google Maps API key to enable live maps
      </div>
      <button onclick="findNearMe()" style="padding:8px 20px;background:#4CAF50;color:white;border:none;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;">📍 Find Services Near Me • ନିକଟ ସେବା</button>
    </div>
  `;
}

async function findNearMe() {
  try {
    const loc = await getUserLocation();
    alert(`📍 Location found!\nLat: ${loc.lat.toFixed(4)}, Lng: ${loc.lng.toFixed(4)}\n\nShowing nearest services...`);
  } catch(e) {
    alert('📍 Location permission denied.\nPlease enter your village name in search to find nearby services.\n\nଆପଣଙ୍କ ଗ୍ରାମ ନାମ ଖୋଜ ବାକ୍ସରେ ଲିଖନ୍ତୁ।');
  }
}

/* ── Navigation helper ── */
function goTo(page) { window.location.href = page; }

/* ── Form helpers ── */
function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `position:fixed;bottom:100px;left:50%;transform:translateX(-50%);
    background:${type==='success'?'#4CAF50':'#f44336'};color:white;padding:10px 20px;
    border-radius:24px;font-size:13px;font-weight:600;z-index:99999;
    box-shadow:0 4px 20px rgba(0,0,0,0.2);white-space:nowrap;`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2800);
}

function validatePhone(ph) { return /^[6-9]\d{9}$/.test(ph.replace(/\s/g,'')); }

/* ── Render helpers ── */
function renderWorkerCard(w) {
  return `
    <div class="worker-card" onclick="goTo('pages/worker-profile.html?id=${w.id}')">
      <div class="worker-avatar">${w.emoji}</div>
      <div class="worker-info">
        <div class="worker-name">${w.name} ${w.verified?'✅':''}</div>
        <div style="font-size:10px;color:#aaa;">${w.odia}</div>
        <div class="worker-meta">📍 ${w.village} · ⭐ ${w.rating} (${w.reviews})</div>
        <div class="worker-badges">
          ${w.tags.slice(0,2).map(t=>`<span class="badge badge-green">${t}</span>`).join('')}
          ${w.verified?'<span class="badge badge-blue">✅ Verified</span>':''}
        </div>
        <div class="trust-bar">
          <span class="trust-label">Trust ${w.trust}%</span>
          <div class="trust-track"><div class="trust-fill" style="width:${w.trust}%"></div></div>
        </div>
        <div class="worker-price">${w.price}</div>
      </div>
    </div>`;
}

function renderStars(r) {
  return '⭐'.repeat(Math.floor(r)) + (r%1>=0.5?'✨':'');
}

/* ── Auto-init on DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {
  // Update clock
  const timeEls = document.querySelectorAll('.time');
  const now = new Date();
  const t = now.getHours().toString().padStart(2,'0')+':'+now.getMinutes().toString().padStart(2,'0');
  timeEls.forEach(el => el.textContent = t);

  // Filter chips toggle
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const group = chip.dataset.group;
      if (group) {
        document.querySelectorAll(`.filter-chip[data-group="${group}"]`).forEach(c => c.classList.remove('active'));
      }
      chip.classList.toggle('active');
    });
  });

  // Page tabs
  document.querySelectorAll('.page-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      const parent = tab.closest('.page-tabs').parentElement;
      parent.querySelectorAll('.page-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      parent.querySelectorAll('.tab-panel').forEach(p => {
        p.style.display = p.dataset.panel === target ? 'block' : 'none';
      });
    });
  });

  // Action items bounce
  document.querySelectorAll('.action-item').forEach(item => {
    item.addEventListener('click', function() {
      this.style.transform = 'scale(0.92)';
      setTimeout(() => this.style.transform = '', 150);
    });
  });

  // Horizontal scroll via mouse wheel
  document.querySelectorAll('.horizontal-scroll').forEach(el => {
    el.addEventListener('wheel', e => { e.preventDefault(); el.scrollLeft += e.deltaY; }, {passive:false});
  });
});
