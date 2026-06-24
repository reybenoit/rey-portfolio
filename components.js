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
          '<li><a href="' + root + '#work">Case Studies</a></li>' +
          '<li><a href="' + root + '#about">About</a></li>' +
          '<li><a href="' + root + '#contact">Contact</a></li>' +
        '</ul>' +
        '<button class="nav-toggle" type="button" aria-label="Menu" aria-expanded="false">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
      '</div>';
  }

  // ── MOBILE NAV STYLES (injected so every page stays in sync) ─────────
  var navCss = document.createElement('style');
  navCss.id = 'nav-mobile-css';
  navCss.textContent =
    '.nav-toggle{display:none;background:none;border:0;padding:6px;margin-right:-6px;cursor:pointer;color:var(--text-light);}' +
    'nav.nav--light .nav-toggle{color:var(--text);}' +
    '.nav-toggle span{display:block;width:22px;height:1.5px;border-radius:2px;background:currentColor;' +
      'transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .2s;}' +
    '.nav-toggle span + span{margin-top:5px;}' +
    'nav.nav-open .nav-toggle span:nth-child(1){transform:translateY(6.5px) rotate(45deg);}' +
    'nav.nav-open .nav-toggle span:nth-child(2){opacity:0;}' +
    'nav.nav-open .nav-toggle span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg);}' +
    '@media (max-width:900px){' +
      '.nav-toggle{display:block;}' +
      'nav .nav-links{display:flex;flex-direction:column;gap:0;position:absolute;top:100%;left:0;right:0;' +
        'padding:0 var(--pad);background:var(--bg-dark);' +
        'border-bottom:1px solid rgb(var(--text-light-rgb) / var(--alpha-faint));' +
        'max-height:0;overflow:hidden;opacity:0;visibility:hidden;' +
        'transition:max-height .35s cubic-bezier(.16,1,.3,1),opacity .25s ease,visibility .35s;}' +
      'nav.nav--light .nav-links{background:var(--bg);border-bottom-color:var(--mid);}' +
      'nav.nav-open .nav-links{max-height:70vh;opacity:1;visibility:visible;}' +
      'nav .nav-links li{width:100%;}' +
      'nav .nav-links a{display:block;padding:16px 0;font-size:13px;' +
        'border-bottom:1px solid rgb(var(--text-light-rgb) / var(--alpha-faint));}' +
      'nav .nav-links li:last-child a{border-bottom:none;}' +
      'nav.nav--light .nav-links a{border-bottom-color:var(--mid);}' +
    '}';
  document.head.appendChild(navCss);

  // ── FOOTER ───────────────────────────────────────────────────────────
  var footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.innerHTML =
      '<div class="container footer-inner">' +
        '<div class="footer-name">Rey Benoit</div>' +
        '<ul class="footer-nav">' +
          '<li><a href="' + root + '#work">Case Studies</a></li>' +
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

  // ── MOBILE NAV TOGGLE ────────────────────────────────────────────────
  var navToggle = nav.querySelector('.nav-toggle');
  if (navToggle) {
    var setNavOpen = function (open) {
      nav.classList.toggle('nav-open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    navToggle.addEventListener('click', function () {
      setNavOpen(!nav.classList.contains('nav-open'));
    });
    // Close after picking a destination
    nav.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () { setNavOpen(false); });
    });
  }

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
