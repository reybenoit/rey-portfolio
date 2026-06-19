// ── IN-PAGE SECTION NAV (shared across case studies) ──
// Auto-builds the nav from [data-section] elements, then wires up:
//   1. visibility — reveals once the hero (.cs-hero) scrolls out of view
//   2. scrollspy  — highlights the section crossing the viewport's vertical centre
//   3. dark adapt — switches the rail to light text while overlapping [data-section-dark]
// All driven by IntersectionObserver — no scroll listeners.
(function () {
  var targets = Array.prototype.slice.call(document.querySelectorAll('[data-section]'));
  if (!targets.length) return;

  function slugify(s) {
    return s.toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // Build the nav markup from the tagged sections.
  var nav = document.createElement('nav');
  nav.className = 'section-nav';
  nav.id = 'section-nav';
  nav.setAttribute('aria-label', 'Sections');
  var list = document.createElement('ul');
  list.className = 'section-nav-list';

  var links = [];
  targets.forEach(function (section) {
    var label = section.getAttribute('data-section');
    if (!section.id) section.id = slugify(label);
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#' + section.id;
    a.setAttribute('data-target', section.id);
    a.textContent = label;
    li.appendChild(a);
    list.appendChild(li);
    links.push(a);
  });
  nav.appendChild(list);
  document.body.appendChild(nav);

  // 1. Reveal once the hero has scrolled out of view.
  var hero = document.querySelector('.cs-hero');
  if (hero) {
    var heroVis = new IntersectionObserver(function (entries) {
      nav.classList.toggle('is-visible', !entries[0].isIntersecting);
    }, { threshold: 0, rootMargin: '-60px 0px 0px 0px' });
    heroVis.observe(hero);
  } else {
    nav.classList.add('is-visible');
  }

  // 2. Scrollspy — section crossing the viewport's vertical centre wins.
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var id = entry.target.id;
      links.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('data-target') === id);
      });
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
  targets.forEach(function (section) { spy.observe(section); });

  // 3. Adapt rail colour while overlapping a dark section (rail mode only).
  var darkSections = document.querySelectorAll('[data-section-dark]');
  if (darkSections.length) {
    var darkActive = new Set();
    var darkSpy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) darkActive.add(entry.target);
        else darkActive.delete(entry.target);
      });
      nav.classList.toggle('on-dark', darkActive.size > 0);
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
    darkSections.forEach(function (section) { darkSpy.observe(section); });
  }
})();
