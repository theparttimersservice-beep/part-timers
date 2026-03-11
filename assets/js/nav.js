// nav.js — Global navigation fix for all pages
// Automatically fixes back button + adds top nav on every page

(function() {

  // ── BACK BUTTON FIX ──
  // Replace all links going to index.html with history.back()
  document.querySelectorAll('a[href="../index.html"], a[href="./index.html"]').forEach(function(link) {
    // Only change back buttons, not the logo
    if (link.classList.contains('back-btn')) {
      link.href = 'javascript:void(0)';
      link.onclick = function(e) {
        e.preventDefault();
        if (document.referrer && document.referrer !== window.location.href) {
          history.back();
        } else {
          window.location.href = '../index.html';
        }
      };
    }
  });

  // ── ACTIVE NAV ITEM ──
  // Highlight current page in bottom nav
  var currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-item').forEach(function(item) {
    var href = item.getAttribute('href');
    if (href && href.includes(currentPage)) {
      item.classList.add('active');
    }
  });

  // ── TOAST FUNCTION ── (global fallback)
  if (typeof showToast === 'undefined') {
    window.showToast = function(msg) {
      var t = document.getElementById('toast');
      if (!t) {
        t = document.createElement('div');
        t.id = 'toast';
        t.className = 'toast';
        document.body.appendChild(t);
      }
      t.textContent = msg;
      t.classList.add('show');
      setTimeout(function() { t.classList.remove('show'); }, 2500);
    };
  }

})();
