/* ==========================================================================
   LATINOO MAX — Public site application
   Hash routing, rendering, cart, checkout & WhatsApp ordering.
   All content comes from the DB layer (js/data.js). No hardcoded products.
   ========================================================================== */

(function (global) {
  'use strict';

  /* ---------------- Helpers ---------------- */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function fmt(n) {
    return Number(n || 0).toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  function money(n) {
    return fmt(n) + ' ' + I18N.t('common.egp');
  }

  function loc(obj) { return I18N.loc(obj); }
  function t(key) { return I18N.t(key); }

  var toastTimer = null;
  function toast(msg) {
    var el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2600);
  }

  function badgeLabel(b) {
    if (b === 'new') return t('badge.new');
    if (b === 'best') return t('badge.best');
    if (b === 'special') return t('badge.special');
    return b;
  }

  /* ---------------- Cart engine ---------------- */
  /* Cart line: { key, productId, name, image, unitPrice, originalUnitPrice,
     sizeLabel, extras:[{name,price}], notes, qty, isBundle, bundleTitle } */

  function lineExtrasSum(line) {
    return (line.extras || []).reduce(function (s, e) { return s + (e.price || 0); }, 0);
  }
  function lineGross(line) { /* pre-discount line total (extras at full price) */
    return ((line.originalUnitPrice || line.unitPrice) + lineExtrasSum(line)) * line.qty;
  }
  function lineNet(line) { /* what the customer actually pays */
    return (line.unitPrice + lineExtrasSum(line)) * line.qty;
  }

  function cartTotals(cart, deliveryFee) {
    var subtotal = 0, net = 0, count = 0;
    cart.forEach(function (l) { subtotal += lineGross(l); net += lineNet(l); count += l.qty; });
    var discount = subtotal - net;
    var fee = cart.length ? (deliveryFee || 0) : 0;
    return { subtotal: subtotal, discount: discount, delivery: fee, total: net + fee, count: count };
  }

  function getCart() { return DB.getCart(); }
  function saveCart(cart) { DB.saveCart(cart); updateCartBadge(); }

  function cartKey(productId, sizeLabel, extras, notes, offerId) {
    var ex = (extras || []).map(function (e) { return loc(e.name); }).sort().join('|');
    return [productId, sizeLabel ? loc(sizeLabel) : '', ex, notes || '', offerId || ''].join('::');
  }

  function addToCart(line) {
    var cart = getCart();
    line.key = cartKey(line.productId, line.sizeLabel, line.extras, line.notes, line.offerId);
    var existing = cart.find(function (l) { return l.key === line.key; });
    if (existing) existing.qty += line.qty;
    else cart.push(line);
    saveCart(cart);
    toast(t('product.added'));
  }

  function updateCartBadge() {
    var cart = getCart();
    var totals = cartTotals(cart, 0);
    var countEl = document.getElementById('cartCount');
    if (countEl) countEl.textContent = totals.count;
    var bar = document.getElementById('mobileCartBar');
    var isCartPage = (location.hash || '#/') .indexOf('#/cart') === 0;
    var isCheckout = (location.hash || '').indexOf('#/checkout') === 0;
    if (bar) {
      if (cart.length && !isCartPage && !isCheckout && window.innerWidth <= 640) {
        bar.style.display = 'flex';
        document.getElementById('mobileCartText').textContent = t('nav.cart') + ' (' + totals.count + ')';
        document.getElementById('mobileCartTotal').textContent = money(totals.total);
      } else {
        bar.style.display = 'none';
      }
    }
  }

  /* ---------------- Chrome: header / footer / announcement ---------------- */

  var NAV = [
    { route: '#/', key: 'nav.home' },
    { route: '#/menu', key: 'nav.menu' },
    { route: '#/offers', key: 'nav.offers' },
    { route: '#/about', key: 'nav.about' },
    { route: '#/contact', key: 'nav.contact' }
  ];

  function renderChrome() {
    var s = DB.getSettings();
    var lang = I18N.lang;

    /* Logo: the real logo file (black artwork on transparent background,
       rendered white via .logo-img filter — see style.css). Falls back to
       the text logo if the file is missing. */
    var logo = document.getElementById('siteLogo');
    logo.innerHTML =
      '<img class="logo-img" src="' + esc(s.logoUrl) + '" alt="Latinoo Max" onerror="this.style.display=\'none\'">' +
      '<span class="logo-text">LATINOO MAX<small>' + esc(t('brand.tagline')) + '</small></span>';

    var hash = location.hash || '#/';
    var navHtml = NAV.map(function (n) {
      var active = (n.route === '#/' ? (hash === '#/' || hash === '') : hash.indexOf(n.route) === 0) ? ' class="active"' : '';
      return '<a href="' + n.route + '"' + active + '>' + t(n.key) + '</a>';
    }).join('');
    document.getElementById('mainNav').innerHTML = navHtml;
    document.getElementById('mobileNav').innerHTML = navHtml +
      '<a href="#/admin">' + t('nav.admin') + '</a>';
    document.getElementById('cartLabel').textContent = t('nav.cart');
    document.getElementById('langBtn').textContent = lang === 'ar' ? 'English' : 'العربية';

    /* Announcement bar */
    var ann = document.getElementById('announce');
    if (s.announcement && s.announcement.active && loc(s.announcement)) {
      ann.innerHTML = '<div class="announce">' + esc(loc(s.announcement)) + '</div>';
    } else { ann.innerHTML = ''; }

    /* Footer */
    var cats = DB.getCategories(true).slice(0, 5);
    document.getElementById('siteFooter').innerHTML =
      '<div class="container"><div class="footer-grid">' +
        '<div><img class="logo-img logo-img-lg" src="' + esc(s.logoUrl) + '" alt="Latinoo Max" onerror="this.style.display=\'none\'">' +
        '<div class="logo-text" style="margin-bottom:12px">LATINOO MAX</div>' +
        '<p>' + esc(t('footer.about')) + '</p>' +
        '<div class="social">' +
          '<a href="' + esc(s.social.facebook) + '" target="_blank" rel="noopener" aria-label="Facebook">f</a>' +
          '<a href="' + esc(s.social.instagram) + '" target="_blank" rel="noopener" aria-label="Instagram">◎</a>' +
          '<a href="' + esc(s.social.tiktok) + '" target="_blank" rel="noopener" aria-label="TikTok">♪</a>' +
        '</div></div>' +
        '<div><h4>' + esc(t('footer.links')) + '</h4><ul>' +
          NAV.map(function (n) { return '<li><a href="' + n.route + '">' + t(n.key) + '</a></li>'; }).join('') +
        '</ul></div>' +
        '<div><h4>' + esc(t('nav.menu')) + '</h4><ul>' +
          cats.map(function (c) { return '<li><a href="#/menu?cat=' + c.id + '">' + esc(loc(c.name)) + '</a></li>'; }).join('') +
        '</ul></div>' +
        '<div><h4>' + esc(t('footer.contact')) + '</h4>' +
        '<p>' + esc(loc(s.address)) + '</p>' +
        '<p style="margin-top:8px">' + esc(s.phones.join(' • ')) + '</p>' +
        '<p style="margin-top:8px">' + esc(loc(s.workingHours)) + '</p></div>' +
      '</div>' +
      '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + ' ' + esc(t('footer.made')) + ' — ' + esc(t('footer.rights')) + '</span>' +
      '<span><a href="#/admin">' + esc(t('nav.admin')) + '</a></span></div></div>';

    updateCartBadge();
  }

  /* ---------------- Router ---------------- */

  var view = null;
  var menuState = { cat: 'all', query: '' };
  var heroTimer = null;

  function parseHash() {
    var raw = (location.hash || '#/').replace(/^#/, '');
    var parts = raw.split('?');
    var params = {};
    if (parts[1]) {
      parts[1].split('&').forEach(function (kv) {
        var pair = kv.split('=');
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
      });
    }
    return { path: parts[0] || '/', params: params };
  }

  function route() {
    var r = parseHash();
    var s = DB.getSettings();

    if (heroTimer) { clearInterval(heroTimer); heroTimer = null; }
    document.getElementById('mobileNav').classList.remove('open');

    /* Maintenance mode: public routes show a notice (admin still works) */
    if (s.maintenanceMode && r.path !== '/admin') {
      view.innerHTML = maintenanceView();
      renderChrome();
      window.scrollTo(0, 0);
      return;
    }

    if (r.path === '/' || r.path === '') view.innerHTML = homeView();
    else if (r.path === '/menu') {
      if (r.params.cat) menuState.cat = r.params.cat;
      if (r.params.q !== undefined) menuState.query = r.params.q;
      view.innerHTML = menuView();
    }
    else if (r.path === '/offers') view.innerHTML = offersView();
    else if (r.path === '/cart') view.innerHTML = cartView();
    else if (r.path === '/checkout') view.innerHTML = checkoutView();
    else if (r.path === '/about') view.innerHTML = aboutView();
    else if (r.path === '/contact') view.innerHTML = contactView();
    else if (r.path === '/admin') { Admin.render(r.params); renderChrome(); window.scrollTo(0, 0); return; }
    else view.innerHTML = homeView();

    renderChrome();
    window.scrollTo(0, 0);
    if (r.path === '/' || r.path === '') startHeroSlider();
    bindViewEvents(r.path);
  }

  function maintenanceView() {
    return '<section class="section"><div class="container success-box">' +
      '<div class="tick">◷</div><h2>' + esc(t('maintenance.title')) + '</h2>' +
      '<p>' + esc(t('maintenance.text')) + '</p></div></section>';
  }

  /* ---------------- Shared components ---------------- */

  function productCard(p) {
    var pr = DB.priceFor(p);
    var badges = (p.badges || []).map(function (b) {
      return '<span class="badge badge-' + b + '">' + esc(badgeLabel(b)) + '</span>';
    }).join('');
    if (pr.offer) {
      var off = pr.offer.type === 'percent'
        ? pr.offer.discount + '% OFF'
        : fmt(pr.offer.discount) + ' ' + t('common.egp') + ' OFF';
      badges += '<span class="badge badge-off">' + esc(off) + '</span>';
    }
    var priceHtml = pr.original
      ? '<span class="price-old">' + fmt(pr.original) + '</span><span class="price">' + fmt(pr.price) + '<small>' + t('common.egp') + '</small></span>'
      : '<span class="price">' + fmt(pr.price) + '<small>' + t('common.egp') + '</small></span>';
    return '<article class="product-card">' +
      '<div class="product-media" onclick="App.openProduct(\'' + p.id + '\')">' +
        '<img src="' + esc(p.image) + '" alt="' + esc(loc(p.name)) + '" loading="lazy">' +
        '<div class="badges">' + badges + '</div>' +
        (p.available ? '' : '<div class="unavail-tag">' + esc(t('menu.unavailable')) + '</div>') +
      '</div>' +
      '<div class="product-body">' +
        '<h3 onclick="App.openProduct(\'' + p.id + '\')">' + esc(loc(p.name)) + '</h3>' +
        '<p>' + esc(loc(p.desc)) + '</p>' +
        '<div class="product-foot">' + priceHtml +
          '<button class="add-btn" type="button" onclick="App.quickAdd(\'' + p.id + '\')" ' + (p.available ? '' : 'disabled') + '>' + esc(t('product.add')) + '</button>' +
        '</div>' +
      '</div></article>';
  }

  function offerCard(o) {
    var tag = o.type === 'bundle'
      ? t('offers.save') + ' ' + money((o.originalPrice || 0) - o.bundlePrice)
      : (o.type === 'percent' ? o.discount + '% OFF' : t('offers.save') + ' ' + money(o.discount));
    var priceHtml = o.type === 'bundle'
      ? '<span class="price-old">' + fmt(o.originalPrice) + '</span><span class="price">' + fmt(o.bundlePrice) + '<small>' + t('common.egp') + '</small></span>'
      : '';
    var btn = o.type === 'bundle'
      ? '<button class="btn btn-gold btn-sm" type="button" onclick="App.addBundle(\'' + o.id + '\')">' + esc(t('product.add')) + '</button>'
      : '<a class="btn btn-gold btn-sm" href="#/menu">' + esc(t('hero.cta.menu')) + '</a>';
    return '<article class="offer-card">' +
      '<img src="' + esc(o.image) + '" alt="' + esc(loc(o.title)) + '" loading="lazy">' +
      '<div class="offer-body"><span class="off-tag">' + esc(tag) + '</span>' +
      '<h3>' + esc(loc(o.title)) + '</h3><p>' + esc(loc(o.desc)) + '</p>' +
      '<div class="offer-meta">' + priceHtml +
      '<span>' + esc(t('offers.valid')) + ' ' + esc(o.end) + '</span></div>' + btn +
      '</div></article>';
  }

  /* ---------------- Views ---------------- */

  function homeView() {
    var s = DB.getSettings();
    var cats = DB.getCategories(true);
    var featured = DB.getProducts({ featured: true }).slice(0, 6);
    var offers = DB.getOffers(true).slice(0, 3);
    var heroImgs = (s.hero.images && s.hero.images.length) ? s.hero.images : [s.hero.image];

    var hero = '<section class="hero"><div class="hero-media">' +
      heroImgs.map(function (src, i) {
        return '<img src="' + esc(src) + '" alt="Latinoo Max" class="' + (i === 0 ? 'on' : '') + '" data-hero-img="' + i + '">';
      }).join('') +
      '</div><div class="container"><div class="hero-content">' +
      '<div class="eyebrow">' + esc(t('hero.badge')) + '</div>' +
      '<h1>' + esc(loc(s.hero.title)) + '</h1>' +
      '<p>' + esc(loc(s.hero.subtitle)) + '</p>' +
      '<div class="hero-ctas">' +
      '<a class="btn btn-gold" href="#/menu">' + esc(t('hero.cta.menu')) + '</a>' +
      '<a class="btn btn-outline" href="#/menu">' + esc(t('hero.cta.order')) + '</a></div>' +
      '<div class="hero-dots">' + heroImgs.map(function (_, i) {
        return '<button type="button" data-hero-dot="' + i + '" class="' + (i === 0 ? 'on' : '') + '" aria-label="Slide ' + (i + 1) + '"></button>';
      }).join('') + '</div>' +
      '</div></div></section>';

    var catCards = cats.map(function (c) {
      var count = DB.getProducts({ categoryId: c.id, availableOnly: true }).length;
      return '<a class="cat-card" href="#/menu?cat=' + c.id + '">' +
        '<img src="' + esc(c.image) + '" alt="' + esc(loc(c.name)) + '" loading="lazy">' +
        '<div class="cat-card-body"><div class="count">' + count + ' ' + esc(t('menu.all') === 'All' ? 'items' : 'صنف') + '</div>' +
        '<h3>' + esc(loc(c.name)) + '</h3><p>' + esc(loc(c.desc)) + '</p></div></a>';
    }).join('');

    var offersHtml = offers.length
      ? '<section class="section" style="background:var(--bg-2)"><div class="container">' +
        '<div class="section-head"><div class="eyebrow">— ' + esc(t('offers.title')) + ' —</div>' +
        '<h2>' + esc(t('offers.title')) + '</h2><p>' + esc(t('offers.subtitle')) + '</p></div>' +
        '<div class="offer-grid">' + offers.map(offerCard).join('') + '</div>' +
        '<div style="text-align:center;margin-top:28px"><a class="btn btn-outline" href="#/offers">' + esc(t('offersPage.title')) + ' →</a></div>' +
        '</div></section>' : '';

    return hero +
      '<section class="section"><div class="container">' +
        '<div class="section-head"><div class="eyebrow">— ' + esc(t('cat.title')) + ' —</div>' +
        '<h2>' + esc(t('cat.title')) + '</h2><p>' + esc(t('cat.subtitle')) + '</p></div>' +
        '<div class="cat-grid">' + catCards + '</div></div></section>' +
      '<section class="section" style="background:var(--bg-2);padding-top:56px"><div class="container">' +
        '<div class="section-head"><div class="eyebrow">— ' + esc(t('featured.title')) + ' —</div>' +
        '<h2>' + esc(t('featured.title')) + '</h2><p>' + esc(t('featured.subtitle')) + '</p></div>' +
        '<div class="grid">' + featured.map(productCard).join('') + '</div></div></section>' +
      offersHtml +
      '<section class="section"><div class="container"><div class="split">' +
        '<img src="' + esc(s.about.image) + '" alt="' + esc(loc(s.about.title)) + '" loading="lazy">' +
        '<div><div class="eyebrow">' + esc(t('about.title')) + '</div>' +
        '<h2>' + esc(loc(s.about.title)) + '</h2>' +
        '<p>' + esc(loc(s.about.text)) + '</p>' +
        '<div class="stats">' +
          '<div class="stat"><b>30+</b><span>' + (I18N.lang === 'ar' ? 'طبق مميز' : 'Signature dishes') + '</span></div>' +
          '<div class="stat"><b>45 ' + (I18N.lang === 'ar' ? 'دقيقة' : 'min') + '</b><span>' + (I18N.lang === 'ar' ? 'متوسط التوصيل' : 'Avg. delivery') + '</span></div>' +
          '<div class="stat"><b>4.9 ★</b><span>' + (I18N.lang === 'ar' ? 'تقييم الضيوف' : 'Guest rating') + '</span></div>' +
        '</div>' +
        '<div style="margin-top:26px"><a class="btn btn-outline" href="#/about">' + esc(t('about.cta')) + '</a></div>' +
        '</div></div></div></section>';
  }

  function startHeroSlider() {
    var imgs = document.querySelectorAll('[data-hero-img]');
    var dots = document.querySelectorAll('[data-hero-dot]');
    if (!imgs.length || imgs.length < 2) return;
    var idx = 0;
    function show(i) {
      idx = i;
      imgs.forEach(function (im, j) { im.classList.toggle('on', j === i); });
      dots.forEach(function (d, j) { d.classList.toggle('on', j === i); });
    }
    dots.forEach(function (d) {
      d.addEventListener('click', function () { show(Number(d.dataset.heroDot)); });
    });
    heroTimer = setInterval(function () { show((idx + 1) % imgs.length); }, 5000);
  }

  function menuView() {
    var cats = DB.getCategories(true);
    var q = menuState.query || '';

    var pills = '<button class="pill' + (menuState.cat === 'all' ? ' active' : '') + '" data-cat="all">' + esc(t('menu.all')) + '</button>' +
      cats.map(function (c) {
        return '<button class="pill' + (menuState.cat === c.id ? ' active' : '') + '" data-cat="' + c.id + '">' + esc(loc(c.name)) + '</button>';
      }).join('');

    return '<section class="page-head"><div class="container">' +
      '<h1>' + esc(t('menu.title')) + '</h1><p>' + esc(t('menu.subtitle')) + '</p>' +
      '<div class="search-bar"><span class="icon">🔍</span>' +
      '<input id="menuSearch" type="search" value="' + esc(q) + '" placeholder="' + esc(t('menu.search')) + '" aria-label="' + esc(t('menu.search')) + '"></div>' +
      '</div></section>' +
      '<div class="sticky-cats"><div class="container"><div class="cat-pills">' + pills + '</div></div></div>' +
      '<section class="section section--tight"><div class="container"><div id="menuResults">' + menuResultsHtml() + '</div></div></section>';
  }

  function offersView() {
    var offers = DB.getOffers(true);
    var body = offers.length
      ? '<div class="offer-grid">' + offers.map(offerCard).join('') + '</div>'
      : '<div class="empty"><div class="big">🎁</div><p>' + esc(t('offers.only')) + '</p></div>';
    return '<section class="page-head"><div class="container">' +
      '<h1>' + esc(t('offersPage.title')) + '</h1><p>' + esc(t('offers.subtitle')) + '</p></div></section>' +
      '<section class="section"><div class="container">' + body + '</div></section>';
  }

  function aboutView() {
    var s = DB.getSettings();
    return '<section class="page-head"><div class="container">' +
      '<h1>' + esc(t('aboutPage.title')) + '</h1></div></section>' +
      '<section class="section"><div class="container"><div class="split">' +
      '<img src="' + esc(s.about.image) + '" alt="' + esc(loc(s.about.title)) + '">' +
      '<div><div class="eyebrow">' + esc(t('brand.tagline')) + '</div>' +
      '<h2>' + esc(loc(s.about.title)) + '</h2><p>' + esc(loc(s.about.text)) + '</p>' +
      '<p>' + esc(I18N.lang === 'ar'
        ? 'نستخدم مكونات طازجة كل يوم، ونخبز عجينتنا بأنفسنا، ونحضّر صلصاتنا في المطبخ — لأن الجودة عندنا ليست خياراً، بل وعداً.'
        : 'We use fresh ingredients every day, bake our own dough and craft our sauces in-house — because for us, quality is not an option, it is a promise.') + '</p>' +
      '<div style="margin-top:22px"><a class="btn btn-gold" href="#/menu">' + esc(t('hero.cta.menu')) + '</a></div>' +
      '</div></div></div></section>';
  }

  function contactView() {
    var s = DB.getSettings();
    return '<section class="page-head"><div class="container">' +
      '<h1>' + esc(t('contact.title')) + '</h1></div></section>' +
      '<section class="section"><div class="container"><div class="contact-grid">' +
      '<div class="contact-card"><div class="ic">📍</div><h3>' + esc(t('contact.address')) + '</h3><p>' + esc(loc(s.address)) + '</p></div>' +
      '<div class="contact-card"><div class="ic">🕐</div><h3>' + esc(t('contact.hours')) + '</h3><p>' + esc(loc(s.workingHours)) + '</p></div>' +
      '<div class="contact-card"><div class="ic">📞</div><h3>' + esc(t('contact.phone')) + '</h3><p>' + esc(s.phones.join('<br>')) + '<br>' + esc(s.email) + '</p></div>' +
      '</div>' +
      '<div style="text-align:center;margin-top:36px"><h3 style="margin-bottom:12px">' + esc(t('contact.follow')) + '</h3>' +
      '<div class="social" style="justify-content:center">' +
      '<a href="' + esc(s.social.facebook) + '" target="_blank" rel="noopener">f</a>' +
      '<a href="' + esc(s.social.instagram) + '" target="_blank" rel="noopener">◎</a>' +
      '<a href="' + esc(s.social.tiktok) + '" target="_blank" rel="noopener">♪</a>' +
      '</div></div></div></section>';
  }

  /* ---------------- Menu results (re-rendered by search / filter) ---------------- */

  function menuResultsHtml() {
    var cats = DB.getCategories(true);
    var q = menuState.query || '';
    var list = DB.getProducts({ query: q });
    var body = '';
    if (menuState.cat === 'all' && !q) {
      cats.forEach(function (c) {
        var items = list.filter(function (p) { return p.categoryId === c.id; });
        if (!items.length) return;
        body += '<div class="menu-section-title"><h2>' + esc(loc(c.name)) + '</h2><span>' + esc(loc(c.desc)) + '</span></div>' +
          '<div class="grid">' + items.map(productCard).join('') + '</div>';
      });
    } else {
      var items = menuState.cat === 'all' ? list : list.filter(function (p) { return p.categoryId === menuState.cat; });
      body = items.length
        ? '<div class="grid" style="margin-top:36px">' + items.map(productCard).join('') + '</div>'
        : '<div class="empty"><div class="big">🍽️</div><p>' + esc(t('menu.noResults')) + '</p></div>';
    }
    return body || '<div class="empty"><div class="big">🍽️</div><p>' + esc(t('menu.noResults')) + '</p></div>';
  }

  function refreshMenuResults() {
    var el = document.getElementById('menuResults');
    if (el) el.innerHTML = menuResultsHtml();
    document.querySelectorAll('.cat-pills .pill').forEach(function (b) {
      b.classList.toggle('active', b.dataset.cat === menuState.cat);
    });
  }

  /* ---------------- Product modal ---------------- */

  var modalState = null;

  function modalTotal() {
    if (!modalState) return 0;
    var p = modalState.product;
    var base = (p.sizes && p.sizes.length)
      ? p.sizes[modalState.sizeIdx].price
      : p.price;
    var pr = DB.priceFor(p, base);
    var exSum = 0;
    modalState.extras.forEach(function (i) { exSum += (p.extras[i].price || 0); });
    return { unit: pr.price + exSum, original: pr.original ? pr.original + exSum : null, qty: modalState.qty };
  }

  function renderModal() {
    var m = modalState;
    var p = m.product;
    var pr = DB.priceFor(p, (p.sizes && p.sizes.length) ? p.sizes[m.sizeIdx].price : p.price);
    var tot = modalTotal();

    var sizeHtml = '';
    if (p.sizes && p.sizes.length) {
      sizeHtml = '<div class="opt-group"><label>' + esc(t('product.size')) + '</label>' +
        p.sizes.map(function (s, i) {
          var sp = DB.priceFor(p, s.price);
          var priceTxt = sp.original
            ? '<span class="price-old">' + fmt(sp.original) + '</span> ' + fmt(sp.price) + ' ' + t('common.egp')
            : fmt(s.price) + ' ' + t('common.egp');
          return '<label class="opt-row"><input type="radio" name="m-size" value="' + i + '"' +
            (i === m.sizeIdx ? ' checked' : '') + ' onchange="App.modalSize(' + i + ')">' +
            '<span>' + esc(loc(s.label)) + '</span><span class="opt-price">' + priceTxt + '</span></label>';
        }).join('') + '</div>';
    }

    var extrasHtml = '';
    if (p.extras && p.extras.length) {
      extrasHtml = '<div class="opt-group"><label>' + esc(t('product.extras')) + '</label>' +
        p.extras.map(function (e, i) {
          return '<label class="opt-row"><input type="checkbox" value="' + i + '"' +
            (m.extras.has(i) ? ' checked' : '') + ' onchange="App.modalExtra(' + i + ', this.checked)">' +
            '<span>' + esc(loc(e.name)) + '</span><span class="opt-price">+' + fmt(e.price) + ' ' + t('common.egp') + '</span></label>';
        }).join('') + '</div>';
    }

    var priceHtml = tot.original
      ? '<span class="price-old">' + fmt(tot.original * tot.qty) + '</span><span class="price">' + fmt(tot.unit * tot.qty) + '<small>' + t('common.egp') + '</small></span>'
      : '<span class="price">' + fmt(tot.unit * tot.qty) + '<small>' + t('common.egp') + '</small></span>';

    document.getElementById('modalBox').innerHTML =
      '<div class="modal-grid">' +
        '<div class="modal-media"><img src="' + esc(p.image) + '" alt="' + esc(loc(p.name)) + '"></div>' +
        '<div class="modal-body">' +
          '<button class="modal-close" type="button" onclick="App.closeModal()" aria-label="Close">✕</button>' +
          '<h3>' + esc(loc(p.name)) + '</h3>' +
          '<p class="desc">' + esc(loc(p.desc)) + '</p>' +
          sizeHtml + extrasHtml +
          '<div class="opt-group"><label>' + esc(t('product.notes')) + '</label>' +
          '<textarea id="modalNotes" rows="2" placeholder="' + esc(t('product.notes.ph')) + '">' + esc(m.notes) + '</textarea></div>' +
          '<div class="qty-row"><span style="font-weight:700">' + esc(t('product.qty')) + '</span>' +
          '<span class="qty-ctrl"><button type="button" onclick="App.modalQty(-1)">−</button>' +
          '<span id="modalQtyVal">' + m.qty + '</span>' +
          '<button type="button" onclick="App.modalQty(1)">+</button></span></div>' +
          '<div class="modal-total">' + priceHtml +
          '<button class="btn btn-gold" type="button" onclick="App.modalAdd()" ' + (p.available ? '' : 'disabled') + '>' + esc(t('product.add')) + '</button></div>' +
        '</div></div>';
    document.getElementById('modalBackdrop').classList.add('open');
  }

  function openProduct(id) {
    var p = DB.getProduct(id);
    if (!p) return;
    modalState = { product: p, sizeIdx: 0, extras: new Set(), qty: 1, notes: '' };
    renderModal();
  }

  function closeModal() {
    document.getElementById('modalBackdrop').classList.remove('open');
    modalState = null;
  }

  function modalAdd() {
    if (!modalState) return;
    var m = modalState;
    var p = m.product;
    var notes = (document.getElementById('modalNotes') || {}).value || '';
    var base = (p.sizes && p.sizes.length) ? p.sizes[m.sizeIdx].price : p.price;
    var pr = DB.priceFor(p, base);
    var extras = [];
    m.extras.forEach(function (i) { extras.push(p.extras[i]); });
    addToCart({
      productId: p.id, name: p.name, image: p.image,
      unitPrice: pr.price, originalUnitPrice: pr.original,
      sizeLabel: (p.sizes && p.sizes.length) ? p.sizes[m.sizeIdx].label : null,
      extras: extras, notes: notes.trim(), qty: m.qty, offerId: pr.offer ? pr.offer.id : null
    });
    closeModal();
  }

  function quickAdd(id) {
    var p = DB.getProduct(id);
    if (!p || !p.available) return;
    if ((p.sizes && p.sizes.length) || (p.extras && p.extras.length)) { openProduct(id); return; }
    var pr = DB.priceFor(p);
    addToCart({
      productId: p.id, name: p.name, image: p.image,
      unitPrice: pr.price, originalUnitPrice: pr.original,
      sizeLabel: null, extras: [], notes: '', qty: 1,
      offerId: pr.offer ? pr.offer.id : null
    });
  }

  function addBundle(offerId) {
    var o = DB.getOffer(offerId);
    if (!o || o.type !== 'bundle') return;
    addToCart({
      productId: 'bundle:' + o.id, name: o.title, image: o.image,
      unitPrice: o.bundlePrice, originalUnitPrice: o.originalPrice,
      sizeLabel: null, extras: [], notes: '', qty: 1,
      offerId: o.id, isBundle: true
    });
  }

  /* ---------------- Cart view ---------------- */

  var checkoutArea = null; /* selected delivery zone name (Arabic), shared cart/checkout */

  function deliveryFeeFor(areaName) {
    var s = DB.getSettings();
    if (!areaName) return s.defaultDeliveryFee;
    var z = (s.deliveryFees || []).find(function (d) { return loc(d.area) === areaName || d.area.ar === areaName || d.area.en === areaName; });
    return z ? z.fee : s.defaultDeliveryFee;
  }

  function areaOptionsHtml(selected) {
    var s = DB.getSettings();
    return (s.deliveryFees || []).map(function (d) {
      var name = loc(d.area);
      return '<option value="' + esc(d.area.ar) + '"' + (selected === d.area.ar ? ' selected' : '') + '>' +
        esc(name) + ' — ' + money(d.fee) + '</option>';
    }).join('');
  }

  function cartView() {
    var cart = getCart();
    if (!cart.length) {
      return '<section class="section"><div class="container success-box">' +
        '<div class="tick" style="font-size:1.6rem">🛒</div>' +
        '<h2>' + esc(t('cart.empty')) + '</h2>' +
        '<div style="margin-top:22px"><a class="btn btn-gold" href="#/menu">' + esc(t('cart.empty.cta')) + '</a></div>' +
        '</div></section>';
    }
    var s = DB.getSettings();
    var fee = deliveryFeeFor(checkoutArea);
    var tot = cartTotals(cart, fee);

    var itemsHtml = cart.map(function (l, i) {
      var meta = [];
      if (l.sizeLabel) meta.push(esc(loc(l.sizeLabel)));
      (l.extras || []).forEach(function (e) { meta.push(esc(loc(e.name)) + ' (+' + fmt(e.price) + ')'); });
      if (l.notes) meta.push('“' + esc(l.notes) + '”');
      return '<div class="cart-item">' +
        '<img src="' + esc(l.image) + '" alt="' + esc(loc(l.name)) + '">' +
        '<div><h4>' + esc(loc(l.name)) + '</h4>' +
        (meta.length ? '<div class="meta">' + meta.join(' • ') + '</div>' : '') +
        '<span class="qty-ctrl"><button type="button" onclick="App.cartQty(' + i + ', -1)">−</button>' +
        '<span>' + l.qty + '</span>' +
        '<button type="button" onclick="App.cartQty(' + i + ', 1)">+</button></span>' +
        ' <button class="rm" type="button" onclick="App.cartRemove(' + i + ')">' + esc(t('cart.remove')) + '</button>' +
        (l.isBundle ? '' : ' <button class="rm" type="button" style="color:var(--gold-light)" onclick="App.cartEdit(' + i + ')">' + esc(t('cart.edit')) + '</button>') +
        '</div>' +
        '<div class="line-price">' + money(lineNet(l)) +
        (lineGross(l) > lineNet(l) ? '<div style="font-size:.8rem;color:var(--muted-2);text-decoration:line-through">' + money(lineGross(l)) + '</div>' : '') +
        '</div></div>';
    }).join('');

    var minWarn = tot.total - fee < s.minOrder
      ? '<div class="notice warn">' + esc(t('cart.minOrder')) + ' ' + money(s.minOrder) + '</div>' : '';

    return '<section class="page-head"><div class="container"><h1>' + esc(t('cart.title')) + '</h1></div></section>' +
      '<section class="section section--tight"><div class="container"><div class="cart-layout"><div>' +
      itemsHtml +
      '<button class="btn btn-danger btn-sm" type="button" onclick="App.clearCart()">' + esc(t('cart.clear')) + '</button>' +
      '</div>' +
      '<div class="summary-card"><h3>' + esc(t('checkout.summary')) + '</h3>' +
      '<div class="field"><label>' + esc(t('checkout.area')) + '</label>' +
      '<select id="cartArea" onchange="App.setArea(this.value)">' + areaOptionsHtml(checkoutArea) + '</select></div>' +
      '<div class="sum-row"><span>' + esc(t('cart.subtotal')) + '</span><span>' + money(tot.subtotal) + '</span></div>' +
      (tot.discount > 0 ? '<div class="sum-row discount"><span>' + esc(t('cart.discount')) + '</span><span>− ' + money(tot.discount) + '</span></div>' : '') +
      '<div class="sum-row"><span>' + esc(t('cart.delivery')) + '</span><span>' + money(tot.delivery) + '</span></div>' +
      '<div class="sum-row total"><span>' + esc(t('cart.total')) + '</span><b>' + money(tot.total) + '</b></div>' +
      minWarn +
      '<a class="btn btn-gold btn-block" style="margin-top:14px" href="#/checkout">' + esc(t('cart.checkout')) + '</a>' +
      '</div></div></div></section>';
  }

  /* ---------------- Checkout ---------------- */

  function checkoutView() {
    var cart = getCart();
    if (!cart.length) {
      return '<section class="section"><div class="container success-box">' +
        '<div class="tick" style="font-size:1.6rem">🛒</div>' +
        '<h2>' + esc(t('cart.empty')) + '</h2>' +
        '<div style="margin-top:22px"><a class="btn btn-gold" href="#/menu">' + esc(t('cart.empty.cta')) + '</a></div>' +
        '</div></section>';
    }
    var s = DB.getSettings();
    var fee = deliveryFeeFor(checkoutArea);
    var tot = cartTotals(cart, fee);

    var itemsHtml = cart.map(function (l) {
      var meta = [];
      if (l.sizeLabel) meta.push(loc(l.sizeLabel));
      (l.extras || []).forEach(function (e) { meta.push(loc(e.name)); });
      if (l.notes) meta.push('“' + l.notes + '”');
      return '<div class="sum-row" style="align-items:flex-start"><span>' + l.qty + ' × ' + esc(loc(l.name)) +
        (meta.length ? '<br><small style="color:var(--muted-2)">' + esc(meta.join(' • ')) + '</small>' : '') +
        '</span><span>' + money(lineNet(l)) + '</span></div>';
    }).join('');

    return '<section class="page-head"><div class="container"><h1>' + esc(t('checkout.title')) + '</h1></div></section>' +
      '<section class="section section--tight"><div class="container"><div class="cart-layout"><div>' +
      '<div class="panel" style="margin-bottom:0"><h3>' + esc(t('checkout.details')) + '</h3>' +
      '<div class="form-grid">' +
      '<div class="field"><label>' + esc(t('checkout.name')) + ' <i>*</i></label><input id="coName" type="text" autocomplete="name"></div>' +
      '<div class="field"><label>' + esc(t('checkout.phone')) + ' <i>*</i></label><input id="coPhone" type="tel" autocomplete="tel" placeholder="01xxxxxxxxx"></div>' +
      '</div>' +
      '<div class="field"><label>' + esc(t('checkout.address')) + ' <i>*</i></label><input id="coAddress" type="text" autocomplete="street-address"></div>' +
      '<div class="form-grid">' +
      '<div class="field"><label>' + esc(t('checkout.area')) + ' <i>*</i></label>' +
      '<select id="coArea" onchange="App.setArea(this.value)">' + areaOptionsHtml(checkoutArea) + '</select></div>' +
      '<div class="field"><label>' + esc(t('checkout.instructions')) + '</label><input id="coInstructions" type="text"></div>' +
      '</div>' +
      '<div class="field"><label>' + esc(t('checkout.notes')) + '</label><textarea id="coNotes" rows="2"></textarea></div>' +
      '<div class="field"><label>' + esc(t('checkout.method')) + '</label>' +
      '<label class="opt-row"><input type="radio" name="coMethod" value="whatsapp" checked> <span>💬 ' + esc(t('checkout.whatsapp')) + '</span></label>' +
      (s.codEnabled ? '<label class="opt-row"><input type="radio" name="coMethod" value="cod"> <span>💵 ' + esc(t('checkout.cod')) + '</span></label>' : '') +
      '</div>' +
      '<div class="notice">⚠️ ' + esc(t('checkout.whatsappNote')) + '</div>' +
      '<div id="coError" class="notice warn" style="display:none"></div>' +
      '<button class="btn btn-gold btn-block" type="button" onclick="App.placeOrder()">' + esc(t('checkout.place')) + '</button>' +
      '</div></div>' +
      '<div class="summary-card"><h3>' + esc(t('checkout.summary')) + '</h3>' +
      itemsHtml +
      '<div class="sum-row"><span>' + esc(t('cart.subtotal')) + '</span><span>' + money(tot.subtotal) + '</span></div>' +
      (tot.discount > 0 ? '<div class="sum-row discount"><span>' + esc(t('cart.discount')) + '</span><span>− ' + money(tot.discount) + '</span></div>' : '') +
      '<div class="sum-row"><span>' + esc(t('cart.delivery')) + '</span><span>' + money(tot.delivery) + '</span></div>' +
      '<div class="sum-row total"><span>' + esc(t('cart.total')) + '</span><b>' + money(tot.total) + '</b></div>' +
      '</div></div></div></section>';
  }

  function buildWhatsAppMessage(order) {
    var L = [];
    var s = DB.getSettings();
    L.push('🍽️ *' + s.restaurantName + ' — ' + (I18N.lang === 'ar' ? 'طلب جديد' : 'New Order') + '*');
    L.push((I18N.lang === 'ar' ? 'رقم الطلب' : 'Order') + ': ' + order.number);
    L.push('');
    L.push((I18N.lang === 'ar' ? '👤 الاسم' : '👤 Name') + ': ' + order.customer.name);
    L.push((I18N.lang === 'ar' ? '📞 الهاتف' : '📞 Phone') + ': ' + order.customer.phone);
    L.push((I18N.lang === 'ar' ? '📍 العنوان' : '📍 Address') + ': ' + order.customer.address + ' — ' + order.customer.area);
    if (order.customer.instructions) L.push((I18N.lang === 'ar' ? 'تعليمات التوصيل' : 'Delivery instructions') + ': ' + order.customer.instructions);
    L.push('');
    L.push('— ' + (I18N.lang === 'ar' ? 'الطلب' : 'Order') + ' —');
    order.items.forEach(function (it) {
      var line = '• ' + it.qty + ' × ' + it.name[I18N.lang] + ' — ' + money(it.unitPrice * it.qty);
      L.push(line);
      if (it.sizeLabel) L.push('   ' + (I18N.lang === 'ar' ? 'الحجم' : 'Size') + ': ' + it.sizeLabel[I18N.lang]);
      (it.extras || []).forEach(function (e) { L.push('   + ' + e.name[I18N.lang] + ' (+' + fmt(e.price) + ')'); });
      if (it.notes) L.push('   📝 ' + it.notes);
    });
    L.push('');
    L.push((I18N.lang === 'ar' ? 'المجموع الفرعي' : 'Subtotal') + ': ' + money(order.subtotal));
    if (order.discount > 0) L.push((I18N.lang === 'ar' ? 'الخصم' : 'Discount') + ': − ' + money(order.discount));
    L.push((I18N.lang === 'ar' ? 'التوصيل' : 'Delivery') + ': ' + money(order.delivery));
    L.push('💰 *' + (I18N.lang === 'ar' ? 'الإجمالي' : 'Total') + ': ' + money(order.total) + '*');
    if (order.customer.notes) L.push((I18N.lang === 'ar' ? 'ملاحظات' : 'Notes') + ': ' + order.customer.notes);
    L.push((I18N.lang === 'ar' ? 'طريقة الطلب' : 'Method') + ': ' + (order.method === 'whatsapp' ? 'WhatsApp' : t('checkout.cod')));
    return L.join('\n');
  }

  function placeOrder() {
    var cart = getCart();
    if (!cart.length) { location.hash = '#/menu'; return; }
    var s = DB.getSettings();
    var name = (document.getElementById('coName') || {}).value || '';
    var phone = (document.getElementById('coPhone') || {}).value || '';
    var address = (document.getElementById('coAddress') || {}).value || '';
    var area = checkoutArea || ((s.deliveryFees || [])[0] ? (s.deliveryFees || [])[0].area.ar : '');
    var instructions = (document.getElementById('coInstructions') || {}).value || '';
    var notes = (document.getElementById('coNotes') || {}).value || '';
    var methodEl = document.querySelector('input[name="coMethod"]:checked');
    var method = methodEl ? methodEl.value : 'whatsapp';
    var err = document.getElementById('coError');

    function showErr(msg) {
      err.textContent = msg;
      err.style.display = 'block';
      err.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    name = name.trim(); phone = phone.trim(); address = address.trim();
    if (!name || !phone || !address) { showErr(t('checkout.required')); return; }
    var digits = phone.replace(/[^0-9+]/g, '');
    if (digits.replace('+', '').length < 10) { showErr(t('checkout.phoneInvalid')); return; }

    var fee = deliveryFeeFor(area);
    var tot = cartTotals(cart, fee);
    if (tot.total - fee < s.minOrder) { showErr(t('checkout.minOrder') + ' ' + money(s.minOrder)); return; }

    var areaLabel = (s.deliveryFees || []).find(function (d) { return d.area.ar === area; });
    var order = DB.createOrder({
      customer: { name: name, phone: phone, address: address,
                  area: areaLabel ? loc(areaLabel.area) : area,
                  instructions: instructions.trim(), notes: notes.trim() },
      items: cart.map(function (l) {
        return { productId: l.productId, name: l.name, image: l.image,
                 unitPrice: l.unitPrice, originalUnitPrice: l.originalUnitPrice,
                 sizeLabel: l.sizeLabel, extras: l.extras, notes: l.notes, qty: l.qty };
      }),
      subtotal: tot.subtotal, discount: tot.discount, delivery: fee,
      total: tot.total, method: method
    });

    DB.clearCart();
    updateCartBadge();

    if (method === 'whatsapp') {
      var waNumber = String(s.whatsapp || '').replace(/[^0-9]/g, '');
      var url = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(buildWhatsAppMessage(order));
      window.open(url, '_blank');
    }

    view.innerHTML = '<section class="section"><div class="container success-box">' +
      '<div class="tick">✓</div><h2>' + esc(t('checkout.success')) + '</h2>' +
      '<p>' + esc(t('checkout.orderNo')) + ': <b style="color:var(--gold-light)">' + esc(order.number) + '</b></p>' +
      '<p style="margin-top:8px">' + esc(t('checkout.whatsappNote')) + '</p>' +
      '<div style="margin-top:26px"><a class="btn btn-gold" href="#/">' + esc(t('checkout.backHome')) + '</a></div>' +
      '</div></section>';
    window.scrollTo(0, 0);
  }

  /* ---------------- View event binding ---------------- */

  var searchTimer = null;
  function bindViewEvents(path) {
    if (path === '/menu') {
      var search = document.getElementById('menuSearch');
      if (search) {
        search.addEventListener('input', function () {
          clearTimeout(searchTimer);
          searchTimer = setTimeout(function () {
            menuState.query = search.value;
            refreshMenuResults();
          }, 220);
        });
      }
      document.querySelectorAll('.cat-pills .pill').forEach(function (b) {
        b.addEventListener('click', function () {
          menuState.cat = b.dataset.cat;
          refreshMenuResults();
          var sticky = document.querySelector('.sticky-cats');
          if (sticky) window.scrollTo({ top: sticky.offsetTop - 70, behavior: 'smooth' });
        });
      });
    }
  }

  /* ---------------- Init + public API ---------------- */

  function init() {
    view = document.getElementById('view');
    I18N.init();
    DB.load();
    /* default area = first delivery zone */
    var s = DB.getSettings();
    if (!checkoutArea && s.deliveryFees && s.deliveryFees.length) checkoutArea = s.deliveryFees[0].area.ar;

    document.getElementById('langBtn').addEventListener('click', function () {
      I18N.setLang(I18N.lang === 'ar' ? 'en' : 'ar');
      route();
    });
    document.getElementById('burgerBtn').addEventListener('click', function () {
      document.getElementById('mobileNav').classList.toggle('open');
    });
    document.getElementById('modalBackdrop').addEventListener('click', function (e) {
      if (e.target === this) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
    window.addEventListener('hashchange', route);
    window.addEventListener('resize', updateCartBadge);
    route();
  }

  global.App = {
    init: init, route: route,
    openProduct: openProduct, closeModal: closeModal,
    quickAdd: quickAdd, addBundle: addBundle,
    modalSize: function (i) { if (modalState) { modalState.sizeIdx = i; renderModal(); } },
    modalExtra: function (i, on) {
      if (!modalState) return;
      if (on) modalState.extras.add(i); else modalState.extras.delete(i);
      var notes = (document.getElementById('modalNotes') || {}).value || '';
      modalState.notes = notes;
      renderModal();
      var ta = document.getElementById('modalNotes');
      if (ta) { ta.value = notes; }
    },
    modalQty: function (d) {
      if (!modalState) return;
      modalState.qty = Math.max(1, Math.min(20, modalState.qty + d));
      var notes = (document.getElementById('modalNotes') || {}).value || '';
      modalState.notes = notes;
      renderModal();
      var ta = document.getElementById('modalNotes');
      if (ta) { ta.value = notes; }
    },
    modalAdd: modalAdd,
    cartQty: function (i, d) {
      var cart = getCart();
      if (!cart[i]) return;
      cart[i].qty = Math.max(1, Math.min(20, cart[i].qty + d));
      saveCart(cart);
      route();
    },
    cartRemove: function (i) {
      var cart = getCart();
      cart.splice(i, 1);
      saveCart(cart);
      route();
    },
    cartEdit: function (i) {
      var cart = getCart();
      var line = cart[i];
      if (!line) return;
      cart.splice(i, 1);
      saveCart(cart);
      openProduct(line.productId);
    },
    clearCart: function () { DB.clearCart(); updateCartBadge(); route(); },
    setArea: function (area) {
      checkoutArea = area;
      var path = parseHash().path;
      if (path === '/cart' || path === '/checkout') route();
    },
    placeOrder: placeOrder,
    toast: toast, money: money, esc: esc
  };

  document.addEventListener('DOMContentLoaded', init);
})(typeof window !== 'undefined' ? window : globalThis);
