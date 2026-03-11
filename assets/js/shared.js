/* ============================================
   THE PART-TIMERS - Shared JavaScript
   Dummy Data + Smart Search + Sheets API
   ============================================ */

// ---- Google Sheets API Config ----
// Replace with your deployed Google Apps Script Web App URL
const SHEETS_API_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

// ---- Sheets API Helper ----
const SheetsAPI = {
  async get(sheet) {
    try {
      const res = await fetch(`${SHEETS_API_URL}?action=get&sheet=${sheet}`);
      return await res.json();
    } catch (e) {
      console.warn('Sheets API not connected – using dummy data');
      return null;
    }
  },
  async post(sheet, data) {
    try {
      const res = await fetch(SHEETS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'post', sheet, data })
      });
      return await res.json();
    } catch (e) {
      console.warn('Sheets API not connected');
      return { success: false };
    }
  }
};

// ---- Dummy Workers Data ----
const WORKERS = [
  { id: 1, name: 'Ramesh Behera', emoji: '👨‍🌾', category: 'Farming Work', village: 'Aul', block: 'Kendrapara', price: 500, priceUnit: '/day', rating: 4.8, reviews: 76, distance: 1.2, radius: 10, phone: '9876543210', experience: '8 years', trust: 'Village Verified', verified: true, tags: ['Plowing','Sowing','Harvesting'] },
  { id: 2, name: 'Sujata Das', emoji: '👩‍🏫', category: 'Learning & Coaching', village: 'Rajkanika', block: 'Kendrapara', price: 300, priceUnit: '/hr', rating: 4.9, reviews: 102, distance: 3.5, radius: 15, phone: '9876543211', experience: '5 years', trust: 'Verified', verified: true, tags: ['Maths','Science','English'] },
  { id: 3, name: 'Bijay Sahoo', emoji: '🔧', category: 'Technicians', village: 'Pattamundai', block: 'Kendrapara', price: 400, priceUnit: '/visit', rating: 4.6, reviews: 55, distance: 5.1, radius: 20, phone: '9876543212', experience: '6 years', trust: 'Village Verified', verified: false, tags: ['Electrician','Motor Repair'] },
  { id: 4, name: 'Priya Mohanty', emoji: '🐟', category: 'Fish & Aqua Work', village: 'Mahakalapada', block: 'Kendrapara', price: 450, priceUnit: '/day', rating: 4.7, reviews: 38, distance: 7.8, radius: 10, phone: '9876543213', experience: '10 years', trust: 'Village Verified', verified: true, tags: ['Fish Farming','Shrimp Culture'] },
  { id: 5, name: 'Kishore Nayak', emoji: '🚛', category: 'Vehicle Booking', village: 'Aul', block: 'Kendrapara', price: 1200, priceUnit: '/trip', rating: 4.5, reviews: 89, distance: 2.3, radius: 50, phone: '9876543214', experience: '7 years', trust: 'Verified', verified: true, tags: ['Pickup','Tempo','Truck'] },
  { id: 6, name: 'Saroj Panda', emoji: '🏗️', category: 'Contractors', village: 'Cuttack', block: 'Cuttack', price: 15000, priceUnit: '/project', rating: 4.4, reviews: 23, distance: 12, radius: 30, phone: '9876543215', experience: '12 years', trust: 'Local Contractor', verified: false, tags: ['House Construction','Repair'] },
  { id: 7, name: 'Mamata Swain', emoji: '🐓', category: 'Poultry & Livestock', village: 'Tirtol', block: 'Jagatsinghpur', price: 350, priceUnit: '/day', rating: 4.3, reviews: 17, distance: 8.5, radius: 10, phone: '9876543216', experience: '4 years', trust: 'Village Verified', verified: false, tags: ['Poultry','Goat Rearing'] },
  { id: 8, name: 'Deepak Kumar', emoji: '🎵', category: 'Learning & Coaching', village: 'Bhubaneswar', block: 'Khurda', price: 500, priceUnit: '/session', rating: 4.9, reviews: 67, distance: 4.2, radius: 20, phone: '9876543217', experience: '9 years', trust: 'Verified', verified: true, tags: ['Harmonium','Tabla','Music'] },
  { id: 9, name: 'Laxmi Rath', emoji: '🌾', category: 'Farming Work', village: 'Nimapara', block: 'Puri', price: 420, priceUnit: '/day', rating: 4.6, reviews: 44, distance: 9.3, radius: 15, phone: '9876543218', experience: '15 years', trust: 'Village Verified', verified: true, tags: ['Paddy Farming','Organic'] },
  { id: 10, name: 'Rakesh Tripathy', emoji: '🚜', category: 'Equipment Rental', village: 'Bhubaneswar', block: 'Khurda', price: 800, priceUnit: '/hr', rating: 4.8, reviews: 91, distance: 1.8, radius: 25, phone: '9876543219', experience: '5 years', trust: 'Verified', verified: true, tags: ['Tractor','Rotavator','Harvester'] },
];

// ---- Dummy Vendors (Food) ----
const VENDORS = [
  { id: 1, name: 'Maa Durga Vegetables', emoji: '🥦', category: 'Fresh Vegetables', village: 'Aul Bazar', rating: 4.7, reviews: 88, delivery: '30 min', minOrder: 100, products: [
    { name: 'Fresh Tomato', price: 30, unit: 'kg', img: '🍅', desc: 'Locally grown tomatoes, fresh from the farm. No pesticides.' },
    { name: 'Brinjal / Baingan', price: 25, unit: 'kg', img: '🍆', desc: 'Purple brinjal, very fresh. Great for curries and sabzi.' },
    { name: 'Lady Finger / Bhindi', price: 40, unit: 'kg', img: '🫛', desc: 'Tender okra from local farms. Best quality guaranteed.' },
    { name: 'Potato', price: 20, unit: 'kg', img: '🥔', desc: 'Clean washed potatoes. Good storage quality.' },
  ]},
  { id: 2, name: 'Puri Wala Dhaba', emoji: '🍛', category: 'Instant Food', village: 'Rajkanika', rating: 4.5, reviews: 134, delivery: '45 min', minOrder: 80, products: [
    { name: 'Puri + Sabzi', price: 50, unit: 'plate', img: '🍽️', desc: 'Crispy puris served with seasonal sabzi. Classic Odia style.' },
    { name: 'Khichdi', price: 60, unit: 'plate', img: '🥘', desc: 'Comforting rice and dal khichdi with ghee and pickle.' },
    { name: 'Dosa + Chutney', price: 70, unit: 'plate', img: '🥞', desc: 'Crispy dosa with coconut chutney and sambar. Ready in 15 min.' },
  ]},
  { id: 3, name: 'Grama Kiraniaa', emoji: '🛒', category: 'Grocery Delivery', village: 'Pattamundai', rating: 4.6, reviews: 62, delivery: '1 hour', minOrder: 200, products: [
    { name: 'Tata Salt 1kg', price: 22, unit: 'pack', img: '🧂', desc: 'Iodized salt. Tata brand. Regular pack.' },
    { name: 'Sunflower Oil 1L', price: 150, unit: 'bottle', img: '🫙', desc: 'Fortune sunflower refined oil 1 litre bottle.' },
    { name: 'Parle-G Biscuit', price: 10, unit: 'pack', img: '🍪', desc: 'Parle-G glucose biscuit 100g family pack.' },
    { name: 'Ariel Powder 1kg', price: 180, unit: 'pack', img: '🧴', desc: 'Ariel detergent 1kg pack for washing clothes.' },
  ]},
];

// ---- Dummy Jobs ----
const JOBS = [
  { id: 1, title: 'Farm Labour Needed', employer: 'Ashok Kumar Farm', village: 'Aul', pay: '₹500/day', type: 'Daily Wage', deadline: '2 days left', category: 'Farming Work' },
  { id: 2, title: 'Electrician Wanted', employer: 'Rajesh Constructions', village: 'Kendrapara', pay: '₹600/day', type: 'Part Time', deadline: '5 days left', category: 'Technicians' },
  { id: 3, title: 'Tutor for Class 10', employer: 'Private Family', village: 'Puri', pay: '₹4000/month', type: 'Part Time', deadline: '1 week', category: 'Learning' },
  { id: 4, title: 'Tractor Operator', employer: 'Sunita Agri Firm', village: 'Bhubaneswar', pay: '₹700/day', type: 'Seasonal', deadline: '3 days left', category: 'Farming Work' },
];

// ---- Dummy Products (Marketplace) ----
const PRODUCTS = [
  { id: 1, title: 'Second-hand Bicycle', price: 2500, seller: 'Mohan Das', village: 'Aul', condition: 'Good', emoji: '🚲', category: 'Buy/Sell' },
  { id: 2, title: 'Baby Goat (2 months)', price: 3500, seller: 'Laxmi Rath', village: 'Nimapara', condition: 'New', emoji: '🐐', category: 'Livestock' },
  { id: 3, title: 'Rice (Sona Masoori) 50kg', price: 2800, seller: 'Ramesh Behera', village: 'Aul', condition: 'Fresh', emoji: '🌾', category: 'Agriculture' },
  { id: 4, title: 'Mobile Phone (Samsung A13)', price: 8000, seller: 'Santosh Sahoo', village: 'Kendrapara', condition: 'Used', emoji: '📱', category: 'Electronics' },
];

// ---- Smart Village Search ----
const SmartSearch = {
  // Keyword to category mappings
  keywords: {
    'tractor': 'Equipment Rental', 'plowing': 'Farming Work', 'farming': 'Farming Work',
    'paddy': 'Farming Work', 'rice': 'Farming Work', 'harvest': 'Farming Work',
    'fish': 'Fish & Aqua Work', 'shrimp': 'Fish & Aqua Work', 'aqua': 'Fish & Aqua Work',
    'poultry': 'Poultry & Livestock', 'chicken': 'Poultry & Livestock', 'goat': 'Poultry & Livestock',
    'tutor': 'Learning & Coaching', 'teacher': 'Learning & Coaching', 'coaching': 'Learning & Coaching',
    'music': 'Learning & Coaching', 'dance': 'Learning & Coaching', 'harmonium': 'Learning & Coaching',
    'electrician': 'Technicians', 'plumber': 'Technicians', 'mechanic': 'Technicians', 'repair': 'Technicians',
    'contractor': 'Contractors', 'construction': 'Contractors', 'building': 'Contractors',
    'vehicle': 'Vehicle Booking', 'auto': 'Vehicle Booking', 'taxi': 'Vehicle Booking', 'truck': 'Vehicle Booking',
    'food': 'Food Delivery', 'vegetable': 'Fresh Vegetables', 'sabzi': 'Fresh Vegetables',
    'grocery': 'Grocery Delivery', 'kiraniaa': 'Grocery Delivery',
  },

  search(query, radiusKm = 20) {
    if (!query || query.trim().length < 2) return [];
    const q = query.toLowerCase().trim();
    let results = [...WORKERS, ...VENDORS.map(v => ({ ...v, category: v.category, isVendor: true }))];

    // Extract location from query (e.g. "near Aul", "in Kendrapara")
    let locationFilter = null;
    const nearMatch = q.match(/near\s+(\w+)/i) || q.match(/in\s+(\w+)/i);
    if (nearMatch) locationFilter = nearMatch[1].toLowerCase();

    // Extract keyword category
    let categoryFilter = null;
    for (const [kw, cat] of Object.entries(this.keywords)) {
      if (q.includes(kw)) { categoryFilter = cat; break; }
    }

    results = results.filter(r => {
      const villageMatch = locationFilter ? (r.village || '').toLowerCase().includes(locationFilter) || (r.block || '').toLowerCase().includes(locationFilter) : true;
      const categoryMatch = categoryFilter ? (r.category || '').includes(categoryFilter) : true;
      const textMatch = !categoryFilter && !locationFilter ? 
        (r.name + r.category + (r.village||'')).toLowerCase().includes(q) : true;
      const radiusMatch = (r.distance || 0) <= radiusKm;
      return (villageMatch || categoryMatch || textMatch) && radiusMatch;
    });

    // Sort by distance then rating
    return results.sort((a, b) => (a.distance || 99) - (b.distance || 99));
  }
};

// ---- Navigation Helper ----
function goTo(page) { window.location.href = page; }

// ---- Bottom Nav Highlight ----
function setActiveNav(id) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

// ---- Render Worker Card ----
function renderWorkerCard(w, container) {
  const div = document.createElement('div');
  div.className = 'worker-card';
  div.innerHTML = `
    <div class="worker-avatar">${w.emoji || '👤'}</div>
    <div class="worker-info">
      <div class="worker-name">${w.name}</div>
      <div class="worker-category">${w.category}</div>
      <div class="worker-location">📍 ${w.village}, ${w.block || ''}</div>
      <div class="worker-meta">
        <span class="stars">⭐</span><span class="worker-rating">${w.rating} (${w.reviews})</span>
        <span class="worker-price">₹${w.price}${w.priceUnit}</span>
        <span class="worker-distance">${w.distance} km</span>
        <span class="trust-badge ${w.verified ? 'verified' : ''}">${w.trust}</span>
      </div>
      <div class="feed-tags" style="margin-top:6px">
        ${(w.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}
      </div>
    </div>
  `;
  div.onclick = () => {
    sessionStorage.setItem('selectedWorker', JSON.stringify(w));
    window.location.href = 'worker-profile.html';
  };
  container.appendChild(div);
}

// ---- Render Vendor Card ----
function renderVendorCard(v, container) {
  const div = document.createElement('div');
  div.className = 'feed-item';
  div.innerHTML = `
    <div class="feed-header">
      <div class="feed-avatar">${v.emoji}</div>
      <div class="feed-info">
        <div class="feed-name">${v.name}</div>
        <div class="feed-time">📍 ${v.village} • 🚚 Delivery in ${v.delivery} • Min ₹${v.minOrder}</div>
      </div>
    </div>
    <div class="rating-row"><span class="stars">⭐</span><span>${v.rating} (${v.reviews} reviews)</span></div>
    <div class="feed-tags" style="margin-top:8px">
      ${v.products.map(p=>`<span class="tag">${p.img} ${p.name} – ₹${p.price}/${p.unit}</span>`).join('')}
    </div>
    <button class="btn-primary" style="margin-top:10px" onclick="event.stopPropagation();sessionStorage.setItem('selectedVendor',JSON.stringify(${JSON.stringify(v).replace(/"/g,'&quot;')}));window.location.href='vendor-detail.html'">
      🛒 Order Now • ଅର୍ଡର କରନ୍ତୁ
    </button>
  `;
  container.appendChild(div);
}

// ---- Toast Notification ----
function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `
    position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%);
    background: ${type === 'success' ? '#4CAF50' : '#FF5722'};
    color: white; padding: 10px 20px; border-radius: 20px;
    font-size: 14px; z-index: 9999; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    white-space: nowrap; font-family: -apple-system, sans-serif;
  `;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ---- Cart (session storage) ----
const Cart = {
  get() { return JSON.parse(sessionStorage.getItem('cart') || '[]'); },
  add(item) {
    const cart = this.get();
    const existing = cart.find(c => c.name === item.name);
    if (existing) existing.qty = (existing.qty || 1) + 1;
    else cart.push({ ...item, qty: 1 });
    sessionStorage.setItem('cart', JSON.stringify(cart));
    showToast(`✅ ${item.name} added to cart`);
  },
  count() { return this.get().reduce((s, i) => s + (i.qty || 1), 0); },
  total() { return this.get().reduce((s, i) => s + (i.price * (i.qty || 1)), 0); },
  clear() { sessionStorage.removeItem('cart'); }
};

// ---- Update time in status bar ----
function updateTime() {
  const el = document.querySelector('.status-bar .time');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
}
setInterval(updateTime, 60000);
document.addEventListener('DOMContentLoaded', updateTime);
