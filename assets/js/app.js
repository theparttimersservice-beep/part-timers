/**
 * THE PART-TIMERS — Core App Logic
 * Handles: config apply, navigation, search, sheets API, maps, utilities
 */

'use strict';

/* ═══════════════════════════════════════════════════
   1. APPLY CONFIG TO DOM
   ═══════════════════════════════════════════════════ */
function applyConfig() {
  const C = window.PT_CONFIG;
  if (!C) return;

  // CSS variables from config colors
  const r = document.documentElement.style;
  const col = C.colors;
  if (col) {
    r.setProperty('--primary',       col.primary);
    r.setProperty('--primary-light', col.primaryLight);
    r.setProperty('--primary-dark',  col.primaryDark);
    r.setProperty('--accent',        col.accent);
    r.setProperty('--accent-light',  col.accentLight);
    r.setProperty('--bg',            col.bg);
    r.setProperty('--surface',       col.surface);
    r.setProperty('--text',          col.text);
    r.setProperty('--text-muted',    col.textMuted);
    r.setProperty('--border',        col.border);
  }

  // Logo
  const logoIcon = document.querySelector('.logo-icon');
  const logoImg  = document.querySelector('.logo-img');
  if (C.brand.logoUrl && logoImg) {
    logoImg.src = C.brand.logoUrl;
    logoImg.style.display = 'block';
    if (logoIcon) logoIcon.style.display = 'none';
  } else if (logoIcon) {
    logoIcon.textContent = C.brand.logoEmoji || '🌾';
  }

  // Brand name
  document.querySelectorAll('.logo-name').forEach(el => el.textContent = C.brand.name);
  document.querySelectorAll('.logo-sub').forEach(el  => el.textContent = C.brand.tagline);

  // Page title
  document.title = document.title.replace('Part-Timers', C.brand.name);

  // Announcements bar
  renderAnnouncements();

  // Categories (quick grid & sidebar)
  renderCategories();
}

/* ═══════════════════════════════════════════════════
   2. ANNOUNCEMENTS MARQUEE
   ═══════════════════════════════════════════════════ */
function renderAnnouncements() {
  const C = window.PT_CONFIG;
  if (!C || !C.features?.showAnnouncements) {
    document.querySelectorAll('.announcement-bar').forEach(b => b.style.display = 'none');
    return;
  }
  const items = C.announcements || [];
  document.querySelectorAll('.announcement-track').forEach(track => {
    // Duplicate for seamless loop
    const html = [...items, ...items].map(a => `<span class="announcement-item">${a}</span>`).join('');
    track.innerHTML = html;
  });
}

/* ═══════════════════════════════════════════════════
   3. CATEGORIES RENDER
   ═══════════════════════════════════════════════════ */
function renderCategories() {
  const C = window.PT_CONFIG;
  if (!C) return;
  const cats = C.categories.filter(c => c.active);

  // Quick grid on homepage
  const qGrid = document.getElementById('quickGrid');
  if (qGrid) {
    qGrid.innerHTML = cats.slice(0, 12).map(cat => `
      <a class="q-item" href="${getRelPath(cat.page)}" title="${cat.label}">
        <div class="q-icon" style="background:${cat.color}">${cat.icon}</div>
        <div class="q-label">${cat.label}</div>
        <div class="q-odia text-odia">${cat.label_odia}</div>
      </a>`).join('');
  }

  // Full cat grid (services page)
  const catGrid = document.getElementById('catGrid');
  if (catGrid) {
    catGrid.innerHTML = cats.map(cat => `
      <a class="cat-card" href="${getRelPath(cat.page)}">
        <div class="cat-icon-wrap" style="background:${cat.color}">${cat.icon}</div>
        <div class="cat-name">${cat.label}</div>
        <div class="cat-odia text-odia">${cat.label_odia}</div>
        <div class="cat-count">${getCatCount(cat.id)}+ providers</div>
      </a>`).join('');
  }

  // Sidebar categories
  const sidebarCats = document.getElementById('sidebarCats');
  if (sidebarCats) {
    sidebarCats.innerHTML = cats.map(cat => `
      <a class="sidebar-link" href="${getRelPath(cat.page)}">
        <span class="s-icon">${cat.icon}</span> ${cat.label}
      </a>`).join('');
  }
}

function getCatCount(id) {
  const D = window.PT_DATA;
  if (!D) return 0;
  return D.workers.filter(w => w.category === id).length || Math.floor(Math.random()*30 + 10);
}

/* ═══════════════════════════════════════════════════
   4. SEARCH ENGINE
   ═══════════════════════════════════════════════════ */
const PT_SEARCH = {
  results: [],

  run(query, filters = {}) {
    const D = window.PT_DATA;
    if (!D) return [];
    const q = (query || '').toLowerCase().trim();
    const tokens = q ? q.split(/\s+/) : [];

    function matches(text) {
      return !tokens.length || tokens.every(t => text.toLowerCase().includes(t));
    }

    let results = [];

    D.workers.forEach(w => {
      const text = [w.name, w.category, w.subcat, w.village, w.district, (w.tags||[]).join(' '), w.desc].join(' ');
      if (!matches(text)) return;
      if (filters.category && w.category !== filters.category) return;
      if (filters.village && !w.village.toLowerCase().includes(filters.village.toLowerCase())) return;
      if (filters.minRating && w.rating < parseFloat(filters.minRating)) return;
      if (filters.maxPrice && w.price > parseInt(filters.maxPrice)) return;
      results.push({ _type: 'worker', ...w });
    });

    D.vendors.forEach(v => {
      if (!matches([v.name, v.village, v.category, v.desc].join(' '))) return;
      results.push({ _type: 'vendor', ...v });
    });

    D.equipment.forEach(e => {
      if (!matches([e.name, e.village, e.desc].join(' '))) return;
      results.push({ _type: 'equipment', ...e });
    });

    if (filters.sort === 'rating') results.sort((a,b) => (b.rating||0) - (a.rating||0));
    else if (filters.sort === 'price') results.sort((a,b) => (a.price||0) - (b.price||0));

    this.results = results;
    return results;
  },

  renderCard(item, targetEl) {
    const dist = (Math.random()*8 + 0.4).toFixed(1);
    return `
    <div class="worker-card" onclick="location.href='../pages/user/worker-profile.html?id=${item.id}'" style="margin-bottom:14px">
      <div class="wc-head">
        <div class="wc-avatar">
          <span style="font-size:26px">${item.emoji || '🔧'}</span>
          ${item.verified ? '<div class="wc-verified">✓</div>' : ''}
        </div>
        <div class="wc-info">
          <div class="wc-name">${item.name || item.title}</div>
          <div class="wc-sub">📍 ${item.village} • ${item.subcat || item.category}</div>
          ${item.odia ? `<div class="wc-odia">${item.odia}</div>` : ''}
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div style="font-size:16px;font-weight:700;color:var(--accent)">₹${item.price}</div>
          <div style="font-size:11px;color:var(--text-light)">/${item.unit||'visit'}</div>
        </div>
      </div>
      <div class="wc-meta">
        <span class="tag">⭐ ${item.rating}</span>
        <span class="tag tag-orange">${item.badge || 'Available'}</span>
        <span class="tag tag-blue">📏 ~${dist}km</span>
        ${item.trust ? `<span class="tag">🛡️ ${item.trust}% Trust</span>` : ''}
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-primary btn-sm" style="flex:1" onclick="event.stopPropagation();bookNow('${item.id}')">
          📅 Book Now
        </button>
        <button class="btn btn-outline btn-sm" onclick="event.stopPropagation();callWorker('${item.phone}','${item.name}')">
          📞
        </button>
      </div>
    </div>`;
  }
};

/* ═══════════════════════════════════════════════════
   5. GOOGLE SHEETS API
   ═══════════════════════════════════════════════════ */
const SHEETS_API = {
  url: () => window.PT_CONFIG?.google?.sheetsScriptUrl || '',

  async get(action, params = {}) {
    const url = this.url();
    if (!url || url.includes('YOUR_')) {
      console.info('Sheets API not configured. Using local data.');
      return null;
    }
    try {
      const u = new URL(url);
      u.searchParams.set('action', action);
      Object.entries(params).forEach(([k,v]) => u.searchParams.set(k, v));
      const res = await fetch(u.toString());
      return await res.json();
    } catch(e) {
      console.warn('Sheets API error:', e.message);
      return null;
    }
  },

  async post(action, data) {
    const url = this.url();
    if (!url || url.includes('YOUR_')) return null;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...data })
      });
      return await res.json();
    } catch(e) {
      console.warn('Sheets POST error:', e.message);
      return null;
    }
  },

  async registerWorker(formData) {
    const result = await this.post('registerWorker', formData);
    if (!result) {
      // Fallback: save to localStorage for demo
      const workers = JSON.parse(localStorage.getItem('pt_pending_workers') || '[]');
      workers.push({ ...formData, id: 'w' + Date.now(), timestamp: new Date().toISOString() });
      localStorage.setItem('pt_pending_workers', JSON.stringify(workers));
    }
    return result || { success: true, message: 'Saved locally (demo mode)' };
  },

  async submitBooking(bookingData) {
    const result = await this.post('createBooking', bookingData);
    if (!result) {
      const orders = JSON.parse(localStorage.getItem('pt_orders') || '[]');
      orders.unshift({ ...bookingData, id: 'ord' + Date.now(), status: 'confirmed', createdAt: new Date().toISOString() });
      localStorage.setItem('pt_orders', JSON.stringify(orders));
    }
    return result || { success: true, orderId: 'ORD' + Date.now() };
  },

  async submitRating(ratingData) {
    return await this.post('submitRating', ratingData);
  },

  async getWorkers(category) {
    const result = await this.get('getWorkers', { category });
    if (result && result.data) {
      // Merge with local data
      result.data.forEach(w => {
        const idx = PT_DATA.workers.findIndex(x => x.id === w.id);
        if (idx >= 0) PT_DATA.workers[idx] = { ...PT_DATA.workers[idx], ...w };
        else PT_DATA.workers.push(w);
      });
    }
    return PT_DATA.workers.filter(w => !category || w.category === category);
  }
};

/* ═══════════════════════════════════════════════════
   6. GOOGLE MAPS
   ═══════════════════════════════════════════════════ */
const PT_MAPS = {
  map: null,
  markers: [],

  init(containerId, lat, lng) {
    const C = window.PT_CONFIG;
    const apiKey = C?.google?.mapsApiKey;
    const def = C?.location || {};
    lat = lat || def.defaultLat || 20.5018;
    lng = lng || def.defaultLng || 86.4204;

    if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
      // Show placeholder
      const el = document.getElementById(containerId);
      if (el) el.innerHTML = `
        <div style="width:100%;height:100%;background:linear-gradient(135deg,#E8F5E8,#C8E6C9);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;border-radius:12px;padding:20px">
          <div style="font-size:48px">🗺️</div>
          <div style="font-size:14px;font-weight:700;color:#2E7D32">Map View — ${def.defaultCity || 'Odisha'}</div>
          <div style="font-size:12px;color:#555;text-align:center">Add Google Maps API key in data/config.js to enable live maps</div>
          <button onclick="PT_MAPS.getNearMe()" style="padding:9px 20px;background:#4CAF50;color:white;border:none;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer">
            📍 Find Services Near Me
          </button>
        </div>`;
      return;
    }

    // Load Google Maps
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=PT_MAPS._onLoad&loading=async`;
      script.async = true;
      document.head.appendChild(script);
      PT_MAPS._pendingInit = { containerId, lat, lng };
    } else {
      this._initMap(containerId, lat, lng);
    }
  },

  _onLoad() {
    const p = PT_MAPS._pendingInit;
    if (p) PT_MAPS._initMap(p.containerId, p.lat, p.lng);
  },

  _initMap(containerId, lat, lng) {
    this.map = new google.maps.Map(document.getElementById(containerId), {
      center: { lat, lng },
      zoom: window.PT_CONFIG?.location?.defaultZoom || 12,
      styles: [{ featureType:"poi",stylers:[{visibility:"off"}] }]
    });
    this.plotWorkers();
  },

  plotWorkers() {
    if (!this.map || !window.PT_DATA) return;
    PT_DATA.workers.forEach(w => {
      if (!w.lat || !w.lng) return;
      const marker = new google.maps.Marker({
        position: { lat: w.lat, lng: w.lng },
        map: this.map,
        title: w.name,
        icon: { text: w.emoji || '📍', fontSize: '20px' }
      });
      this.markers.push(marker);
    });
  },

  async getNearMe() {
    try {
      const pos = await new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej, { timeout: 8000 });
      });
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      showToast(`📍 Location found! Showing nearby services...`);
      if (this.map) this.map.setCenter({ lat, lng });
      // Filter workers by proximity
      return { lat, lng };
    } catch(e) {
      showToast('📍 Please enter your village name to find services.');
      return null;
    }
  }
};

/* ═══════════════════════════════════════════════════
   7. ORDERS & BOOKING
   ═══════════════════════════════════════════════════ */
function getOrders() {
  try { return JSON.parse(localStorage.getItem('pt_orders') || '[]'); }
  catch(e) { return []; }
}

function saveOrder(order) {
  const orders = getOrders();
  order.id = 'ORD' + Date.now();
  order.createdAt = new Date().toISOString();
  order.status = order.status || 'confirmed';
  orders.unshift(order);
  localStorage.setItem('pt_orders', JSON.stringify(orders));
  return order;
}

function bookNow(workerId) {
  location.href = `${getRelPath('pages/user/booking.html')}?id=${workerId}`;
}

function callWorker(phone, name) {
  showToast(`📞 Calling ${name}...`);
  if (phone && !phone.includes('X')) {
    window.open(`tel:${phone}`);
  }
}

/* ═══════════════════════════════════════════════════
   8. AUTH (localStorage-based demo)
   ═══════════════════════════════════════════════════ */
const PT_AUTH = {
  getUser() {
    try { return JSON.parse(localStorage.getItem('pt_user') || 'null'); }
    catch(e) { return null; }
  },

  isLoggedIn() { return !!this.getUser(); },

  login(userData) {
    localStorage.setItem('pt_user', JSON.stringify(userData));
    this.updateUI();
  },

  logout() {
    localStorage.removeItem('pt_user');
    this.updateUI();
    showToast('👋 Logged out successfully');
    setTimeout(() => location.href = getRelPath('index.html'), 1000);
  },

  updateUI() {
    const user = this.getUser();
    document.querySelectorAll('.auth-name').forEach(el => {
      el.textContent = user ? user.name : 'Guest';
    });
    document.querySelectorAll('.auth-show-loggedin').forEach(el => {
      el.style.display = user ? 'flex' : 'none';
    });
    document.querySelectorAll('.auth-show-loggedout').forEach(el => {
      el.style.display = user ? 'none' : 'flex';
    });
  }
};

/* ═══════════════════════════════════════════════════
   9. ADMIN PANEL
   ═══════════════════════════════════════════════════ */
const PT_ADMIN = {
  isAdmin() {
    const user = PT_AUTH.getUser();
    return user && user.role === 'admin';
  },

  saveConfig(key, value) {
    const config = JSON.parse(localStorage.getItem('pt_admin_config') || '{}');
    config[key] = value;
    localStorage.setItem('pt_admin_config', JSON.stringify(config));
    showToast('✅ Saved successfully!');
  },

  getConfig(key, fallback) {
    try {
      const config = JSON.parse(localStorage.getItem('pt_admin_config') || '{}');
      return key in config ? config[key] : fallback;
    } catch(e) { return fallback; }
  },

  // Update announcement bar without code
  updateAnnouncements(items) {
    this.saveConfig('announcements', items);
    if (window.PT_CONFIG) window.PT_CONFIG.announcements = items;
    renderAnnouncements();
  },

  // Toggle category visibility
  toggleCategory(id, active) {
    if (window.PT_CONFIG) {
      const cat = window.PT_CONFIG.categories.find(c => c.id === id);
      if (cat) { cat.active = active; renderCategories(); }
    }
    this.saveConfig('cat_' + id + '_active', active);
    showToast(active ? `✅ ${id} enabled` : `🚫 ${id} disabled`);
  },

  // Update brand colors
  updateColor(key, value) {
    if (window.PT_CONFIG?.colors) window.PT_CONFIG.colors[key] = value;
    applyConfig();
    this.saveConfig('color_' + key, value);
  },

  // Update brand logo
  updateLogo(url) {
    if (window.PT_CONFIG?.brand) window.PT_CONFIG.brand.logoUrl = url;
    applyConfig();
    this.saveConfig('logoUrl', url);
    showToast('✅ Logo updated!');
  }
};

/* ═══════════════════════════════════════════════════
   10. UTILITIES
   ═══════════════════════════════════════════════════ */
function showToast(msg, duration = 2800) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), duration);
}

function getParam(key) {
  return new URLSearchParams(location.search).get(key);
}

function getRelPath(path) {
  // Count directory depth: /index.html = 0 dirs up, /pages/user/x.html = 2 dirs up
  const parts = location.pathname.split('/').filter(Boolean);
  const dirs = parts.length > 0 ? parts.length - 1 : 0;
  const prefix = dirs > 0 ? '../'.repeat(dirs) : '';
  return prefix + path;
}

function formatCurrency(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return `${Math.floor(hrs/24)} days ago`;
}

function validatePhone(ph) {
  return /^[6-9]\d{9}$/.test(ph.replace(/\s/g,''));
}

// Dark mode
function toggleDarkMode() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('pt_theme', next);
  showToast(next === 'dark' ? '🌙 Dark mode on' : '☀️ Light mode on');
}

function applyTheme() {
  const saved = localStorage.getItem('pt_theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
}

// Mobile menu
function toggleMobileMenu() {
  const overlay = document.getElementById('mobileMenu');
  if (overlay) overlay.classList.toggle('open');
}

// Booking price calc
function calcBookingPrice(rate, unit, quantity) {
  const C = window.PT_CONFIG?.booking || {};
  const feeRate = (C.platformFeePercent || 5) / 100;
  const base = rate * quantity;
  const fee  = Math.round(base * feeRate);
  return { base, fee, total: base + fee };
}

/* ═══════════════════════════════════════════════════
   11. APPS SCRIPT TEMPLATE (reference)
   The actual .gs file is in data/sheets-api.gs
   ═══════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════
   12. INIT
   ═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  applyConfig();
  PT_AUTH.updateUI();

  // Horizontal scroll with mouse wheel
  document.querySelectorAll('.h-scroll').forEach(el => {
    el.addEventListener('wheel', e => { e.preventDefault(); el.scrollLeft += e.deltaY; }, { passive: false });
  });

  // Active sidebar link
  const path = location.pathname;
  document.querySelectorAll('.sidebar-link, .admin-nav-item').forEach(link => {
    if (link.href && link.href.includes(path.split('/').pop())) {
      link.classList.add('active');
    }
  });

  // Bottom nav active
  const page = path.split('/').pop();
  document.querySelectorAll('.bn-item').forEach(item => {
    if (item.href && item.href.endsWith(page)) item.classList.add('active');
  });

  // Apply saved admin config overrides
  const adminConfig = JSON.parse(localStorage.getItem('pt_admin_config') || '{}');
  if (adminConfig.logoUrl && window.PT_CONFIG?.brand) {
    window.PT_CONFIG.brand.logoUrl = adminConfig.logoUrl;
  }
  if (adminConfig.announcements && window.PT_CONFIG) {
    window.PT_CONFIG.announcements = adminConfig.announcements;
  }
  // Reapply with overrides
  Object.keys(adminConfig).forEach(key => {
    if (key.startsWith('color_') && window.PT_CONFIG?.colors) {
      const colorKey = key.replace('color_', '');
      window.PT_CONFIG.colors[colorKey] = adminConfig[key];
    }
    if (key.startsWith('cat_') && key.endsWith('_active') && window.PT_CONFIG?.categories) {
      const catId = key.replace('cat_','').replace('_active','');
      const cat = window.PT_CONFIG.categories.find(c => c.id === catId);
      if (cat) cat.active = adminConfig[key];
    }
  });
  applyConfig();
});

window.PT_SEARCH = PT_SEARCH;
window.PT_MAPS   = PT_MAPS;
window.SHEETS_API= SHEETS_API;
window.PT_AUTH   = PT_AUTH;
window.PT_ADMIN  = PT_ADMIN;
window.showToast = showToast;
window.getParam  = getParam;
window.getOrders = getOrders;
window.saveOrder = saveOrder;
window.bookNow   = bookNow;
window.callWorker= callWorker;
window.toggleDarkMode = toggleDarkMode;
window.formatCurrency = formatCurrency;
window.calcBookingPrice = calcBookingPrice;
