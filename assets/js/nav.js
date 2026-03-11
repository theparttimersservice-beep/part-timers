// AUTO back button fix — works on ALL pages
document.addEventListener('DOMContentLoaded', function() {

  // Fix ALL ← back buttons
  document.querySelectorAll('a').forEach(function(a) {
    var txt = a.textContent.trim();
    var href = a.getAttribute('href') || '';
    if (txt === '←' || a.classList.contains('back-btn')) {
      a.href = 'javascript:void(0)';
      a.onclick = function(e) {
        e.preventDefault();
        if (window.history.length > 1) {
          history.back();
        } else {
          window.location.href = '../index.html';
        }
      };
    }
  });

  // Highlight active nav item
  var page = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-item, .sidebar-item').forEach(function(el) {
    if ((el.getAttribute('href') || '').includes(page)) {
      el.classList.add('active');
    }
  });

  // Global toast
  window.showToast = window.showToast || function(msg) {
    var t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    setTimeout(function(){ t.classList.remove('show'); }, 2500);
  };

});
