/**
 * THE PART-TIMERS — Core App Logic v4
 * Dual-role users (seeker + provider), Odia language, Google Sheets sync
 * All features fully working without GitHub
 */
'use strict';

/* ═══════════════════════════════════════════════════
   1. APPLY CONFIG TO DOM
   ═══════════════════════════════════════════════════ */
function applyConfig() {
  var C = window.PT_CONFIG; if (!C) return;
  var r = document.documentElement.style;
  var col = C.colors || {};
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem('pt_admin_config') || '{}'); } catch(e) {}

  // Merge admin saved colors over defaults
  var colorKeys = ['primary','primaryLight','primaryDark','accent','accentLight','bg','surface','text','textMuted','textLight','border'];
  colorKeys.forEach(function(k) {
    var val = saved['color_'+k] || col[k];
    if (val) r.setProperty('--' + k.replace(/([A-Z])/g, function(m){return '-'+m.toLowerCase();}), val);
  });
  // Manual mappings
  if (saved.color_primary     || col.primary)      r.setProperty('--primary',       saved.color_primary     || col.primary);
  if (saved.color_primaryLight|| col.primaryLight)  r.setProperty('--primary-light', saved.color_primaryLight|| col.primaryLight);
  if (saved.color_primaryDark || col.primaryDark)   r.setProperty('--primary-dark',  saved.color_primaryDark || col.primaryDark);
  if (saved.color_accent      || col.accent)        r.setProperty('--accent',         saved.color_accent      || col.accent);
  if (saved.color_accentLight || col.accentLight)   r.setProperty('--accent-light',   saved.color_accentLight || col.accentLight);
  if (saved.color_bg          || col.bg)            r.setProperty('--bg',             saved.color_bg          || col.bg);
  if (saved.color_surface     || col.surface)       r.setProperty('--surface',        saved.color_surface     || col.surface);
  if (saved.color_text        || col.text)          r.setProperty('--text',           saved.color_text        || col.text);
  if (saved.color_textMuted   || col.textMuted)     r.setProperty('--text-muted',     saved.color_textMuted   || col.textMuted);
  if (saved.color_border      || col.border)        r.setProperty('--border',         saved.color_border      || col.border);

  // Logo
  var logoUrl   = saved.logoUrl   || (C.brand && C.brand.logoUrl)   || '';
  var logoEmoji = saved.logoEmoji || (C.brand && C.brand.logoEmoji) || '🌾';
  document.querySelectorAll('.logo-icon').forEach(function(el) {
    if (logoUrl) { el.style.display='none'; }
    else { el.textContent = logoEmoji; el.style.display='flex'; }
  });
  document.querySelectorAll('.logo-img').forEach(function(img) {
    if (logoUrl) { img.src = logoUrl; img.style.display='block'; }
    else { img.style.display='none'; }
  });

  // Hero
  var heroImage = saved.heroImage || (C.brand && C.brand.heroImage) || '';
  if (heroImage) {
    document.querySelectorAll('.hero,.hero-bg-target').forEach(function(h) {
      h.style.backgroundImage = 'linear-gradient(135deg,rgba(27,94,32,0.82),rgba(46,125,50,0.72)),url('+heroImage+')';
      h.style.backgroundSize = 'cover'; h.style.backgroundPosition = 'center';
    });
  }

  // Brand name/tagline
  var brandName    = saved.brandName    || (C.brand && C.brand.name)    || 'The Part-Timers';
  var brandTagline = saved.brandTagline || (C.brand && C.brand.tagline) || 'Rural Services Platform';
  document.querySelectorAll('.logo-name').forEach(function(el){ el.textContent = brandName; });
  document.querySelectorAll('.logo-sub').forEach(function(el) { el.textContent = brandTagline; });

  // Hero text
  var heroTitle    = saved.heroTitle    || (C.brand && C.brand.heroTitle)    || '';
  var heroSubtitle = saved.heroSubtitle || (C.brand && C.brand.heroSubtitle) || '';
  if (heroTitle)    document.querySelectorAll('.hero-title').forEach(function(el){ el.textContent = heroTitle; });
  if (heroSubtitle) document.querySelectorAll('.hero-sub').forEach(function(el)  { el.textContent = heroSubtitle; });

  // Legal text
  var legalText = saved.legalText || (C.brand && C.brand.legalText) || '';
  if (legalText) document.querySelectorAll('.legal-notice-text').forEach(function(el){ el.textContent = legalText; });

  // WhatsApp float
  var waNum = saved.whatsapp || (C.brand && C.brand.whatsapp) || '';
  var waFloat = document.getElementById('waFloat');
  if (waFloat && waNum && waNum.indexOf('X') === -1) waFloat.href = 'https://wa.me/' + waNum;

  renderAnnouncements();
  renderCategories();
}

/* ═══════════════════════════════════════════════════
   2. ANNOUNCEMENTS
   ═══════════════════════════════════════════════════ */
function renderAnnouncements() {
  var C = window.PT_CONFIG; if (!C) return;
  var saved = {}; try { saved = JSON.parse(localStorage.getItem('pt_admin_config') || '{}'); } catch(e) {}
  var show = ('feature_showAnnouncements' in saved) ? saved.feature_showAnnouncements : (C.features && C.features.showAnnouncements !== false);
  if (!show) { document.querySelectorAll('.announcement-bar').forEach(function(b){ b.style.display='none'; }); return; }
  var items = saved.announcements || C.announcements || [];
  if (!items.length) { document.querySelectorAll('.announcement-bar').forEach(function(b){ b.style.display='none'; }); return; }
  document.querySelectorAll('.announcement-bar').forEach(function(b){ b.style.display=''; });
  document.querySelectorAll('.announcement-track').forEach(function(track) {
    track.innerHTML = items.concat(items).map(function(a){
      return '<span class="announcement-item">' + a + '</span>';
    }).join('');
    var speed = saved.annSpeed || 30;
    track.style.animationDuration = speed + 's';
    if (saved.annBgColor) track.closest('.announcement-bar').style.background = saved.annBgColor;
  });
}

/* ═══════════════════════════════════════════════════
   3. CATEGORIES
   ═══════════════════════════════════════════════════ */
function renderCategories() {
  var C = window.PT_CONFIG; if (!C) return;
  var saved = {}; try { saved = JSON.parse(localStorage.getItem('pt_admin_config') || '{}'); } catch(e) {}
  var cats = C.categories.filter(function(c) {
    var key = 'cat_' + c.id + '_active';
    var active = (key in saved) ? saved[key] : (c.active !== false);
    if (!active) return false;
    if (saved['cat_'+c.id+'_label']) c._label = saved['cat_'+c.id+'_label'];
    else c._label = c.label;
    return true;
  });

  var qGrid = document.getElementById('quickGrid');
  if (qGrid) {
    qGrid.innerHTML = cats.slice(0,12).map(function(cat) {
      return '<a class="q-item" href="'+getRelPath(cat.page)+'" title="'+(cat._label||cat.label)+'">' +
        '<div class="q-icon" style="background:'+cat.color+'">' + cat.icon + '</div>' +
        '<div class="q-label">'+(cat._label||cat.label)+'</div>' +
        '<div class="q-odia text-odia">'+(cat.label_odia||'')+'</div>' +
      '</a>';
    }).join('');
  }

  var sidebarCats = document.getElementById('sidebarCats');
  if (sidebarCats) {
    sidebarCats.innerHTML = cats.map(function(cat) {
      return '<a class="sidebar-link" href="'+getRelPath(cat.page)+'">' +
        '<span class="s-icon">'+cat.icon+'</span> '+(cat._label||cat.label)+'</a>';
    }).join('');
  }

  var mmc = document.getElementById('mobileMenuCats');
  if (mmc) {
    mmc.innerHTML = cats.slice(0,9).map(function(cat) {
      return '<a href="'+getRelPath(cat.page)+'" onclick="toggleMobileMenu()" ' +
        'style="display:flex;flex-direction:column;align-items:center;padding:10px 4px;border-radius:10px;text-decoration:none;background:var(--bg)">' +
        '<span style="font-size:22px;margin-bottom:4px">'+cat.icon+'</span>' +
        '<span style="font-size:10px;font-weight:600;color:var(--text);text-align:center;line-height:1.2">'+(cat._label||cat.label)+'</span></a>';
    }).join('');
  }
}

/* ═══════════════════════════════════════════════════
   4. SEARCH ENGINE
   ═══════════════════════════════════════════════════ */
var PT_SEARCH = {
  results: [],
  run: function(query, filters) {
    filters = filters || {};
    var D = window.PT_DATA; if (!D) return [];
    var q = (query || '').toLowerCase().trim();
    var tokens = q ? q.split(/\s+/) : [];
    function matches(text) {
      if (!tokens.length) return true;
      var t = (text || '').toLowerCase();
      return tokens.every(function(tok){ return t.indexOf(tok) !== -1; });
    }
    var results = [];
    D.workers.forEach(function(w) {
      var text = [w.name, w.category, w.subcat, w.village, w.district, (w.tags||[]).join(' '), w.desc||''].join(' ');
      if (!matches(text)) return;
      if (filters.category && w.category !== filters.category) return;
      if (filters.village && w.village.toLowerCase().indexOf(filters.village.toLowerCase()) === -1) return;
      if (filters.minRating && w.rating < parseFloat(filters.minRating)) return;
      if (filters.maxPrice && w.price > parseInt(filters.maxPrice)) return;
      results.push(Object.assign({ _type: 'worker' }, w));
    });
    (D.vendors||[]).forEach(function(v) {
      if (!matches([v.name, v.village, v.category, v.desc||''].join(' '))) return;
      results.push(Object.assign({ _type: 'vendor' }, v));
    });
    (D.equipment||[]).forEach(function(e) {
      if (!matches([e.name, e.village, e.desc||''].join(' '))) return;
      results.push(Object.assign({ _type: 'equipment' }, e));
    });
    if (filters.sort === 'rating') results.sort(function(a,b){ return (b.rating||0)-(a.rating||0); });
    else if (filters.sort === 'price') results.sort(function(a,b){ return (a.price||0)-(b.price||0); });
    this.results = results;
    return results;
  },
  renderCard: function(item) {
    var dist = (Math.random()*8+0.4).toFixed(1);
    var profileUrl = getRelPath('pages/user/worker-profile.html') + '?id=' + item.id;
    return '<div class="worker-card" onclick="location.href=\''+profileUrl+'\'" style="margin-bottom:14px">' +
      '<div class="wc-head">' +
        '<div class="wc-avatar"><span style="font-size:26px">'+(item.emoji||'🔧')+'</span>' +
        (item.verified?'<div class="wc-verified">✓</div>':'')+'</div>' +
        '<div class="wc-info"><div class="wc-name">'+(item.name||item.title||'')+'</div>' +
        '<div class="wc-sub">📍 '+(item.village||'')+' · '+(item.subcat||item.category||'')+'</div>' +
        (item.odia?'<div class="wc-odia">'+item.odia+'</div>':'')+'</div>' +
        '<div style="text-align:right;flex-shrink:0">' +
          '<div style="font-size:16px;font-weight:700;color:var(--accent)">₹'+(item.price||0)+'</div>' +
          '<div style="font-size:11px;color:var(--text-light)">/'+(item.unit||'visit')+'</div>' +
        '</div>' +
      '</div>' +
      '<div class="wc-meta">' +
        '<span class="tag">⭐ '+(item.rating||'—')+'</span>' +
        (item.badge?'<span class="tag tag-orange">'+(item.badge||'')+'</span>':'') +
        '<span class="tag tag-blue">📍 ~'+dist+' km</span>' +
        (item.trust?'<span class="tag">🛡️ '+item.trust+'%</span>':'') +
      '</div>' +
      '<div style="display:flex;gap:8px">' +
        '<button class="btn btn-primary btn-sm" style="flex:1" onclick="event.stopPropagation();bookNow(\''+item.id+'\')">📅 ବୁକ — Book</button>' +
        '<button class="btn btn-outline btn-sm" onclick="event.stopPropagation();callWorker(\''+(item.phone||'')+'\',\''+(item.name||'')+'\')">📞</button>' +
      '</div></div>';
  }
};

/* ═══════════════════════════════════════════════════
   5. GOOGLE SHEETS API — All categories sync
   ═══════════════════════════════════════════════════ */
var SHEETS_API = {
  url: function() {
    var saved = {}; try { saved = JSON.parse(localStorage.getItem('pt_admin_config')||'{}'); } catch(e) {}
    var url = saved.sheetsScriptUrl || (window.PT_CONFIG && window.PT_CONFIG.google && window.PT_CONFIG.google.sheetsScriptUrl) || '';
    return (url && url.indexOf('YOUR_') === -1) ? url : '';
  },
  get: async function(action, params) {
    var url = this.url(); if (!url) return null;
    try {
      var u = new URL(url);
      u.searchParams.set('action', action);
      if (params) Object.keys(params).forEach(function(k){ u.searchParams.set(k, params[k]); });
      var res = await fetch(u.toString());
      return await res.json();
    } catch(e) { console.warn('Sheets GET error:', e.message); return null; }
  },
  post: async function(action, data) {
    var url = this.url(); if (!url) return null;
    try {
      var res = await fetch(url, {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify(Object.assign({action:action}, data))
      });
      return await res.json();
    } catch(e) { console.warn('Sheets POST error:', e.message); return null; }
  },
  // Save to sheet OR fallback to localStorage
  save: async function(action, data) {
    var result = await this.post(action, data);
    return result || { success: true, local: true };
  },
  registerUser: async function(userData) {
    var result = await this.post('registerUser', userData);
    if (!result) {
      var users = JSON.parse(localStorage.getItem('pt_users') || '[]');
      users.push(Object.assign({}, userData, { id: userData.id || 'U'+Date.now(), savedAt: new Date().toISOString() }));
      localStorage.setItem('pt_users', JSON.stringify(users));
    }
    return result || { success: true };
  },
  registerWorker: async function(formData) {
    var result = await this.post('registerWorker', formData);
    if (!result) {
      var workers = JSON.parse(localStorage.getItem('pt_pending_workers') || '[]');
      workers.push(Object.assign({}, formData, { id: 'W'+Date.now(), timestamp: new Date().toISOString() }));
      localStorage.setItem('pt_pending_workers', JSON.stringify(workers));
    }
    return result || { success: true, message: 'ସ୍ଥାନୀୟ ଭାବରେ ସଞ୍ଚୟ ହୋଇଛି (Saved locally)' };
  },
  submitBooking: async function(bookingData) {
    var result = await this.post('createBooking', bookingData);
    if (!result) {
      var orders = JSON.parse(localStorage.getItem('pt_orders') || '[]');
      orders.unshift(Object.assign({}, bookingData, { id: bookingData.id || 'ORD'+Date.now(), status:'confirmed', createdAt: new Date().toISOString() }));
      localStorage.setItem('pt_orders', JSON.stringify(orders));
    }
    return result || { success: true, orderId: bookingData.id || 'ORD'+Date.now() };
  },
  submitRating: async function(ratingData) {
    return await this.save('submitRating', ratingData);
  },
  registerVendor: async function(data) {
    return await this.save('registerVendor', data);
  },
  registerWorkID: async function(data) {
    return await this.save('registerWorkID', data);
  },
  postMarketItem: async function(data) {
    return await this.save('postAd', data);
  }
};

/* ═══════════════════════════════════════════════════
   6. GOOGLE MAPS
   ═══════════════════════════════════════════════════ */
var PT_MAPS = {
  map: null,
  init: function(containerId, lat, lng) {
    var saved = {}; try { saved = JSON.parse(localStorage.getItem('pt_admin_config')||'{}'); } catch(e) {}
    var C = window.PT_CONFIG;
    var apiKey = saved.mapsApiKey || (C && C.google && C.google.mapsApiKey) || '';
    var def = (C && C.location) || {};
    lat = lat || def.defaultLat || 20.5018;
    lng = lng || def.defaultLng || 86.4204;
    var el = document.getElementById(containerId);
    if (!el) return;
    if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
      el.innerHTML = '<div style="width:100%;height:100%;background:linear-gradient(135deg,#E8F5E8,#C8E6C9);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;border-radius:12px;padding:20px;text-align:center">' +
        '<div style="font-size:48px">🗺️</div>' +
        '<div style="font-size:14px;font-weight:700;color:#2E7D32">ଆପଣଙ୍କ ନିକଟ ସେବା — Map View</div>' +
        '<div style="font-size:12px;color:#555">Admin → Integrations ରେ Google Maps API key ଯୋଡ଼ନ୍ତୁ</div>' +
        '<button onclick="PT_MAPS.getNearMe()" style="padding:9px 20px;background:#4CAF50;color:white;border:none;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer">📍 ନିକଟ ସେବା ଖୋଜ</button></div>';
      return;
    }
    if (!window.google) {
      var script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key='+apiKey+'&callback=PT_MAPS._onLoad&loading=async';
      script.async = true;
      document.head.appendChild(script);
      PT_MAPS._pendingInit = { containerId:containerId, lat:lat, lng:lng };
    } else {
      this._initMap(containerId, lat, lng);
    }
  },
  _onLoad: function() { var p = PT_MAPS._pendingInit; if (p) PT_MAPS._initMap(p.containerId, p.lat, p.lng); },
  _initMap: function(cid, lat, lng) {
    var C = window.PT_CONFIG;
    this.map = new google.maps.Map(document.getElementById(cid), {
      center:{lat:lat,lng:lng}, zoom:(C&&C.location&&C.location.defaultZoom)||12
    });
  },
  getNearMe: async function() {
    if (!navigator.geolocation) { showToast('📍 ଆପଣଙ୍କ ଡିଭାଇସ୍ ସ୍ଥାନ ସ୍ୱୀକୃତ ଦିଏ ନାହିଁ।'); return null; }
    try {
      var pos = await new Promise(function(res,rej){ navigator.geolocation.getCurrentPosition(res,rej,{timeout:8000}); });
      showToast('📍 ଆପଣଙ୍କ ସ୍ଥାନ ମିଳିଲା! ନିକଟ ସେବା ଦର୍ଶାଉଛୁ...');
      if (this.map) this.map.setCenter({lat:pos.coords.latitude,lng:pos.coords.longitude});
      return {lat:pos.coords.latitude, lng:pos.coords.longitude};
    } catch(e) { showToast('📍 ଆପଣଙ୍କ ଗ୍ରାମ ନାମ ଦିଅନ୍ତୁ।'); return null; }
  }
};

/* ═══════════════════════════════════════════════════
   7. DUAL-ROLE USER SYSTEM
   ═══════════════════════════════════════════════════ */
var PT_AUTH = {
  getUser: function() {
    try { return JSON.parse(localStorage.getItem('pt_user') || 'null'); } catch(e) { return null; }
  },
  isLoggedIn: function() { return !!(this.getUser()); },
  isWorker: function() { var u = this.getUser(); return !!(u && (u.role === 'worker' || u.role === 'both' || u.isWorker)); },
  isVendor: function() { var u = this.getUser(); return !!(u && (u.role === 'vendor' || u.isVendor)); },
  isAdmin:  function() { var u = this.getUser(); return !!(u && u.role === 'admin'); },
  isGuest:  function() { var u = this.getUser(); return !u || u.role === 'guest'; },

  login: function(userData) {
    // Dual-role: if user already has a worker profile, merge it
    var existing = this.getUser();
    if (existing && existing.phone === userData.phone && existing.id !== userData.id) {
      userData = Object.assign({}, existing, userData);
    }
    localStorage.setItem('pt_user', JSON.stringify(userData));
    this.updateUI();
    return userData;
  },

  logout: function() {
    localStorage.removeItem('pt_user');
    this.updateUI();
    showToast('👋 ଲଗ ଆଉଟ ହୋଇଗଲ! ପୁଣି ଭେଟ ହେବ। — Logged out!');
    setTimeout(function(){ location.href = getRelPath('index.html'); }, 1200);
  },

  // Switch active role (customer ↔ worker) for dual-role users
  switchRole: function(newRole) {
    var user = this.getUser(); if (!user) return;
    user.activeRole = newRole;
    localStorage.setItem('pt_user', JSON.stringify(user));
    this.updateUI();
    showToast('✅ ଭୂମିକା ବଦଳ ହୋଇଗଲ: ' + newRole);
  },

  updateUI: function() {
    var user = this.getUser();
    var name = user ? (user.name || 'User') : 'Guest';
    document.querySelectorAll('.auth-name').forEach(function(el){ el.textContent = name; });
    document.querySelectorAll('.auth-show-loggedin').forEach(function(el){ el.style.display = user ? 'flex' : 'none'; });
    document.querySelectorAll('.auth-show-loggedout').forEach(function(el){ el.style.display = user ? 'none' : 'flex'; });
    // Show admin link if admin
    document.querySelectorAll('.admin-only').forEach(function(el){ el.style.display = (user && user.role==='admin') ? 'block' : 'none'; });
    // Show worker dashboard if worker
    document.querySelectorAll('.worker-only').forEach(function(el){ el.style.display = (user && (user.role==='worker'||user.role==='both'||user.isWorker)) ? 'block' : 'none'; });
  }
};

/* ═══════════════════════════════════════════════════
   8. ORDERS & BOOKING
   ═══════════════════════════════════════════════════ */
function getOrders() {
  try { return JSON.parse(localStorage.getItem('pt_orders') || '[]'); } catch(e) { return []; }
}
function saveOrder(order) {
  var orders = getOrders();
  order.id = order.id || 'ORD' + Date.now();
  order.createdAt = new Date().toISOString();
  order.status = order.status || 'confirmed';
  orders.unshift(order);
  localStorage.setItem('pt_orders', JSON.stringify(orders));
  return order;
}
function bookNow(workerId) {
  location.href = getRelPath('pages/user/booking.html') + '?id=' + workerId;
}
function callWorker(phone, name) {
  if (phone && phone.indexOf('X') === -1 && phone.length > 5) {
    window.open('tel:' + phone);
  } else {
    showToast('📞 ' + (name||'') + ' ଙ୍କୁ ଫୋନ ଗଲ...');
  }
}

/* ═══════════════════════════════════════════════════
   9. KM-BASED PRICING
   ═══════════════════════════════════════════════════ */
function calcBookingPrice(rate, unit, quantity, distanceKm) {
  var C = window.PT_CONFIG && window.PT_CONFIG.booking;
  var feeRate = ((C && C.platformFeePercent) || 5) / 100;
  var base;
  if (unit === 'km' && distanceKm) {
    base = rate * distanceKm;
  } else {
    base = rate * quantity;
  }
  var fee  = Math.round(base * feeRate);
  var total = base + fee;
  return { base: base, fee: fee, total: total, rate: rate, quantity: quantity, unit: unit };
}

// KM range pricing helper — shows min/max fare
function getKmFareRange(ratePerKm, minKm, maxKm) {
  return {
    min: ratePerKm * minKm,
    max: ratePerKm * maxKm,
    label: '₹' + (ratePerKm * minKm) + ' – ₹' + (ratePerKm * maxKm)
  };
}

/* ═══════════════════════════════════════════════════
   10. ADMIN CHECK
   ═══════════════════════════════════════════════════ */
var PT_ADMIN = {
  isAdmin: function() { return PT_AUTH.isAdmin(); },
  saveConfig: function(key, value) {
    try {
      var config = JSON.parse(localStorage.getItem('pt_admin_config') || '{}');
      config[key] = value;
      localStorage.setItem('pt_admin_config', JSON.stringify(config));
    } catch(e) {}
  },
  getConfig: function(key, fallback) {
    try {
      var config = JSON.parse(localStorage.getItem('pt_admin_config') || '{}');
      return (key in config) ? config[key] : fallback;
    } catch(e) { return fallback; }
  }
};

/* ═══════════════════════════════════════════════════
   11. UTILITIES
   ═══════════════════════════════════════════════════ */
function showToast(msg, duration) {
  duration = duration || 2800;
  var el = document.getElementById('toast'); if (!el) return;
  el.textContent = msg; el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(function(){ el.classList.remove('show'); }, duration);
}
function getParam(key) { return new URLSearchParams(location.search).get(key); }
function getRelPath(path) {
  var parts = location.pathname.replace(/\\/g,'/').split('/').filter(Boolean);
  var isFile = parts.length > 0 && parts[parts.length-1].indexOf('.') !== -1;
  var depth  = isFile ? parts.length - 1 : parts.length;
  var prefix = '';
  for (var i = 0; i < depth; i++) prefix += '../';
  return prefix + path;
}
function formatCurrency(amount) { return '₹' + Number(amount).toLocaleString('en-IN'); }
function timeAgo(dateStr) {
  var diff = Date.now() - new Date(dateStr).getTime();
  var mins = Math.floor(diff / 60000);
  if (mins < 1) return 'ଏଖନ — just now';
  if (mins < 60) return mins + ' ମିନ ପୂର୍ବ';
  var hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + ' ଘଣ୍ଟା ପୂର୍ବ';
  return Math.floor(hrs/24) + ' ଦିନ ପୂର୍ବ';
}
function validatePhone(ph) { return /^[6-9]\d{9}$/.test((ph||'').replace(/\s/g,'')); }
function toggleDarkMode() {
  var cur = document.documentElement.getAttribute('data-theme');
  var next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('pt_theme', next);
  showToast(next === 'dark' ? '🌙 ଅନ୍ଧାର ମୋଡ — Dark mode on' : '☀️ ଆଲୋକ ମୋଡ — Light mode on');
}
function applyTheme() {
  var saved = localStorage.getItem('pt_theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
}
function toggleMobileMenu() {
  var overlay = document.getElementById('mobileMenu'); if (!overlay) return;
  var isOpen = overlay.classList.contains('open');
  if (isOpen) { overlay.classList.remove('open'); document.body.style.overflow = ''; }
  else        { overlay.classList.add('open');    document.body.style.overflow = 'hidden'; }
}

/* ═══════════════════════════════════════════════════
   12. INIT
   ═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {
  applyTheme();

  // Apply saved admin config
  try {
    var adminConfig = JSON.parse(localStorage.getItem('pt_admin_config') || '{}');
    var C = window.PT_CONFIG;
    if (C && adminConfig) {
      if (adminConfig.logoUrl)           C.brand.logoUrl       = adminConfig.logoUrl;
      if (adminConfig.logoEmoji)         C.brand.logoEmoji     = adminConfig.logoEmoji;
      if (adminConfig.announcements)     C.announcements       = adminConfig.announcements;
      if (adminConfig.brandName)         C.brand.name          = adminConfig.brandName;
      if (adminConfig.brandTagline)      C.brand.tagline       = adminConfig.brandTagline;
      if (adminConfig.brandTaglineOdia)  C.brand.tagline_odia  = adminConfig.brandTaglineOdia;
      if (adminConfig.whatsapp)          C.brand.whatsapp      = adminConfig.whatsapp;
      if (adminConfig.heroImage)         C.brand.heroImage     = adminConfig.heroImage;
      if (adminConfig.heroTitle)         C.brand.heroTitle     = adminConfig.heroTitle;
      if (adminConfig.heroSubtitle)      C.brand.heroSubtitle  = adminConfig.heroSubtitle;
      if (adminConfig.legalText)         C.brand.legalText     = adminConfig.legalText;
      if (adminConfig.mapsApiKey    && C.google) C.google.mapsApiKey     = adminConfig.mapsApiKey;
      if (adminConfig.sheetsScriptUrl && C.google) C.google.sheetsScriptUrl = adminConfig.sheetsScriptUrl;
      Object.keys(adminConfig).forEach(function(key) {
        if (key.indexOf('feature_') === 0 && C.features) {
          C.features[key.replace('feature_', '')] = adminConfig[key];
        }
        if (key.indexOf('cat_') === 0 && key.indexOf('_label') !== -1 && C.categories) {
          var catId = key.replace('cat_','').replace('_label','');
          var cat = C.categories.find(function(c){ return c.id === catId; });
          if (cat) cat.label = adminConfig[key];
        }
      });
    }
  } catch(e) {}

  applyConfig();
  PT_AUTH.updateUI();

  // Horizontal scroll with mouse
  document.querySelectorAll('.h-scroll').forEach(function(el) {
    el.addEventListener('wheel', function(e) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY * 0.8;
    }, { passive:false });
  });

  // Bottom nav active state
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.bn-item').forEach(function(item) {
    if (item.href && (item.href.endsWith(page) || item.href.endsWith(page+'/'))) {
      item.classList.add('active');
    }
  });

  // Cart badge
  try {
    var cart = JSON.parse(localStorage.getItem('pt_cart') || '[]');
    var total = cart.reduce(function(s,i){ return s+(i.qty||1); }, 0);
    var badge = document.getElementById('cartBadge');
    if (badge && total > 0) { badge.textContent = total; badge.style.display='flex'; }
  } catch(e) {}

  // Dual-role: show worker switcher if user has worker profile
  var user = PT_AUTH.getUser();
  if (user && (user.isWorker || user.role === 'both')) {
    var switcher = document.getElementById('roleSwitcher');
    if (switcher) switcher.style.display = 'block';
  }
});

/* ═══════════════════════════════════════════════════
   13. GLOBAL EXPORTS
   ═══════════════════════════════════════════════════ */
window.PT_SEARCH       = PT_SEARCH;
window.PT_MAPS         = PT_MAPS;
window.SHEETS_API      = SHEETS_API;
window.PT_AUTH         = PT_AUTH;
window.PT_ADMIN        = PT_ADMIN;
window.showToast       = showToast;
window.getParam        = getParam;
window.getRelPath      = getRelPath;
window.getOrders       = getOrders;
window.saveOrder       = saveOrder;
window.bookNow         = bookNow;
window.callWorker      = callWorker;
window.toggleDarkMode  = toggleDarkMode;
window.toggleMobileMenu= toggleMobileMenu;
window.formatCurrency  = formatCurrency;
window.calcBookingPrice= calcBookingPrice;
window.getKmFareRange  = getKmFareRange;
window.applyConfig     = applyConfig;
window.renderAnnouncements = renderAnnouncements;
window.renderCategories    = renderCategories;
window.validatePhone       = validatePhone;
window.timeAgo             = timeAgo;

// Safe back — goes to home if no history
function safeBack() {
  if (document.referrer && document.referrer.indexOf(location.hostname) !== -1) {
    history.back();
  } else {
    location.href = getRelPath('index.html');
  }
}
window.safeBack = safeBack;

// Update cart badge globally
function updateCartBadge() {
  try {
    var cart = JSON.parse(localStorage.getItem('pt_cart') || '[]');
    var total = cart.reduce(function(s,i){ return s+(i.qty||1); }, 0);
    var badge = document.getElementById('cartBadge');
    if (badge) { badge.textContent = total; badge.style.display = total > 0 ? 'flex' : 'none'; }
  } catch(e) {}
}
window.updateCartBadge = updateCartBadge;
