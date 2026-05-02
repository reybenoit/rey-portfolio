(function () {
  var path   = window.location.pathname;
  var isHome = path === '/' || path.endsWith('/index.html') || path.endsWith('/');
  var root   = isHome ? '' : 'index.html';

  // ── NAV ──────────────────────────────────────────────────────────────
  var navEl = document.getElementById('site-nav');
  if (navEl) {
    navEl.innerHTML =
      '<div class="nav-inner">' +
        '<a class="nav-logo" href="' + (root || '#') + '">Rey Benoit</a>' +
        '<ul class="nav-links">' +
          '<li><a href="' + root + '#work">Work</a></li>' +
          '<li><a href="' + root + '#about">About</a></li>' +
          '<li><a href="' + root + '#contact">Contact</a></li>' +
        '</ul>' +
      '</div>';
  }

  // ── FOOTER ───────────────────────────────────────────────────────────
  var footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.innerHTML =
      '<div class="container footer-inner">' +
        '<div class="footer-name">Rey Benoit</div>' +
        '<ul class="footer-nav">' +
          '<li><a href="' + root + '#work">Work</a></li>' +
          '<li><a href="' + root + '#about">About</a></li>' +
          '<li><a href="' + root + '#contact">Contact</a></li>' +
        '</ul>' +
        '<div class="footer-right">Portfolio · 2026</div>' +
      '</div>';
  }

  // ── PASSWORD OVERLAY ─────────────────────────────────────────────────
  var pwDiv = document.createElement('div');
  pwDiv.id = 'pw-overlay';
  pwDiv.style.cssText = [
    'position:fixed;inset:0;z-index:99999',
    'background:#F7F6F2',
    'display:flex;align-items:center;justify-content:center',
    "font-family:'Inter',sans-serif"
  ].join(';');
  pwDiv.innerHTML =
    '<div style="text-align:center;width:100%;max-width:340px;padding:0 24px;">' +
      "<p style=\"font-family:'Epilogue',sans-serif;font-size:13px;font-weight:600;" +
          "letter-spacing:.12em;text-transform:uppercase;color:#1A1A2E;margin-bottom:32px;\">" +
        'Rey Benoit' +
      '</p>' +
      '<input id="pw-input" type="password" placeholder="Enter password"' +
        ' style="width:100%;padding:14px 16px;border:1.5px solid #D0CEC8;border-radius:4px;' +
            "background:#fff;font-family:'Inter',sans-serif;font-size:15px;color:#1A1A2E;" +
            'outline:none;transition:border-color .2s;"' +
        " onkeydown=\"if(event.key==='Enter')checkPw()\"" +
        " onfocus=\"this.style.borderColor='#3A6BC4'\"" +
        " onblur=\"this.style.borderColor='#D0CEC8'\"" +
      '/>' +
      '<p id="pw-error" style="color:#c0392b;font-size:13px;margin-top:10px;min-height:18px;"></p>' +
      '<button onclick="checkPw()"' +
        ' style="margin-top:8px;width:100%;padding:14px;background:#1A1A2E;color:#F7F6F2;' +
            "border:none;border-radius:4px;font-family:'Epilogue',sans-serif;" +
            'font-size:14px;font-weight:600;letter-spacing:.06em;cursor:pointer;transition:opacity .2s;"' +
        " onmouseover=\"this.style.opacity='.8'\" onmouseout=\"this.style.opacity='1'\">" +
        'Enter' +
      '</button>' +
    '</div>';
  document.body.appendChild(pwDiv);

  if (localStorage.getItem('pw_ok') === '1') {
    pwDiv.style.display = 'none';
  }

  window.checkPw = function () {
    var val = document.getElementById('pw-input').value;
    if (val === 'portfolio2026') {
      localStorage.setItem('pw_ok', '1');
      document.getElementById('pw-overlay').style.display = 'none';
    } else {
      var err = document.getElementById('pw-error');
      err.textContent = 'Incorrect password.';
      document.getElementById('pw-input').value = '';
      document.getElementById('pw-input').focus();
    }
  };

  // ── NAV SCROLL BEHAVIOUR ─────────────────────────────────────────────
  var nav  = document.querySelector('nav');
  if (!nav) return;

  var hero = document.querySelector('.hero');
  if (hero) {
    // Home page: track when hero leaves viewport
    var heroObserver = new IntersectionObserver(function (entries) {
      nav.classList.toggle('nav--light', !entries[0].isIntersecting);
      if (!entries[0].isIntersecting) nav.classList.remove('nav--scrolled');
    }, { threshold: 0, rootMargin: '-60px 0px 0px 0px' });
    heroObserver.observe(hero);

    window.addEventListener('scroll', function () {
      if (!nav.classList.contains('nav--light')) {
        nav.classList.toggle('nav--scrolled', window.scrollY > 20);
      }
    }, { passive: true });
  } else {
    // Case study pages: start in light state immediately
    nav.classList.add('nav--light');
  }
})();
