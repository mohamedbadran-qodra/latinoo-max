/* ==========================================================================
   LATINOO MAX — Admin dashboard
   --------------------------------------------------------------------------
   Hash route: #/admin (tabs via ?tab=products etc.). The router in app.js
   calls Admin.render(params) and the dashboard renders into #view itself.

   Login gate: username/password from settings.adminUser / adminPass
   (defaults admin / admin123, changeable in Settings). Session flag in
   sessionStorage, so
   closing the tab logs out. All edits write through the same DB layer as
   the public site, so changes show up immediately.
   ========================================================================== */

(function (global) {
  'use strict';

  var I18N = global.I18N;
  var DB = global.DB;
  var SESSION_KEY = 'latinoo_admin_session';

  var ADMIN = { tab: 'overview', prodQuery: '', prodCat: 'all', orderStatus: 'all', orderQuery: '' };

  function t(k) { return I18N.t(k); }
  function loc(o) { return I18N.loc(o); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmt(n) { return Number(n || 0).toLocaleString('en-US', { maximumFractionDigits: 2 }); }
  function money(n) { return fmt(n) + ' ' + t('common.egp'); }
  function isAuthed() { try { return sessionStorage.getItem(SESSION_KEY) === '1'; } catch (e) { return false; } }
  function toast(msg) { if (global.App && global.App.toast) global.App.toast(msg); }
  function val(id) { var el = document.getElementById(id); return el ? el.value : ''; }
  function checked(id) { var el = document.getElementById(id); return el ? el.checked : false; }

  /* ---------------- Login ---------------- */

  function loginHtml(err) {
    var s = DB.getSettings();
    return '<section class="section"><div class="container"><div class="login-card">' +
      '<img class="logo-img" src="' + esc(s.logoUrl) + '" alt="Latinoo Max" style="height:72px;width:auto;margin-bottom:6px" onerror="this.style.display=\'none\'">' +
      '<h2>LATINOO MAX</h2><p style="color:var(--muted-2)">' + esc(t('admin.title')) + '</p>' +
      (err ? '<div class="notice warn" style="text-align:start;margin-top:16px">' + esc(err) + '</div>' : '') +
      '<div class="field" style="margin-top:18px"><label>' + esc(t('admin.user')) + '</label>' +
      '<input id="adUser" type="text" autocomplete="username"></div>' +
      '<div class="field"><label>' + esc(t('admin.pass')) + '</label>' +
      '<input id="adPass" type="password" autocomplete="current-password" onkeydown="if(event.key===\'Enter\')Admin.login()"></div>' +
      '<button class="btn btn-gold btn-block" type="button" onclick="Admin.login()">' + esc(t('admin.login')) + '</button>' +
      '</div></div></section>';
  }

  function login() {
    var s = DB.getSettings();
    var u = val('adUser').trim();
    var p = val('adPass');
    if (u === s.adminUser && p === s.adminPass) {
      try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (e) { /* ignore */ }
      location.hash = '#/admin';
    } else {
      document.getElementById('view').innerHTML = loginHtml(t('admin.loginError'));
    }
  }

  function logout() {
    try { sessionStorage.removeItem(SESSION_KEY); } catch (e) { /* ignore */ }
    location.hash = '#/';
  }

  /* ---------------- Shell ---------------- */

  var TABS = [
    ['overview', 'admin.overview'],
    ['products', 'admin.products'],
    ['categories', 'admin.categories'],
    ['offers', 'admin.offers'],
    ['orders', 'admin.orders'],
    ['content', 'admin.content'],
    ['settings', 'admin.settings']
  ];

  function shellHtml(body) {
    var s = DB.getSettings();
    var nav = TABS.map(function (tb) {
      return '<a class="side-link' + (ADMIN.tab === tb[0] ? ' active' : '') + '" href="#/admin?tab=' + tb[0] + '">' + esc(t(tb[1])) + '</a>';
    }).join('');
    return '<section class="admin-wrap"><div class="container"><div class="admin-layout">' +
      '<aside class="admin-side"><div style="display:flex;align-items:center;gap:10px;margin-bottom:18px">' +
      '<img class="logo-img" src="' + esc(s.logoUrl) + '" alt="Latinoo Max" style="height:36px;width:auto" onerror="this.style.display=\'none\'">' +
      '<b style="color:var(--gold-light);letter-spacing:.08em">ADMIN</b></div>' +
      nav +
      '<button class="side-link" type="button" onclick="Admin.logout()" style="color:#e08a8a;text-align:start;width:100%">' + esc(t('admin.logout')) + '</button>' +
      '<a class="side-link" href="#/">' + esc(t('nav.home')) + ' ↗</a></aside>' +
      '<main class="admin-main">' + body + '</main></div></div></section>';
  }

  /* ---------------- Overview ---------------- */

  function overviewHtml() {
    var orders = DB.getOrders();
    var today = new Date().toISOString().slice(0, 10);
    var todays = orders.filter(function (o) { return o.createdAt && new Date(o.createdAt).toISOString().slice(0, 10) === today; });
    var revenue = orders.filter(function (o) { return o.status !== 'Cancelled'; })
      .reduce(function (sum, o) { return sum + (o.total || 0); }, 0);
    var products = DB.getProducts();
    var unavailable = products.filter(function (p) { return !p.available; }).length;
    var activeOffers = DB.getOffers(true).length;

    /* best sellers by quantity across orders */
    var sold = {};
    orders.forEach(function (o) {
      (o.items || []).forEach(function (it) {
        sold[it.productId] = sold[it.productId] || { qty: 0, name: it.name };
        sold[it.productId].qty += it.qty;
      });
    });
    var best = Object.keys(sold).map(function (k) { return sold[k]; })
      .sort(function (a, b) { return b.qty - a.qty; }).slice(0, 5);
    var bestHtml = best.length ? best.map(function (b) {
      return '<div class="sum-row"><span>' + esc(loc(b.name)) + '</span><b>× ' + b.qty + '</b></div>';
    }).join('') : '<p style="color:var(--muted-2)">' + esc(t('admin.noOrders')) + '</p>';

    var recent = orders.slice(0, 5).map(function (o) {
      return '<tr><td><a href="#/admin?tab=orders&order=' + o.id + '" style="color:var(--gold-light)">' + esc(o.number) + '</a></td>' +
        '<td>' + esc(o.customer.name) + '</td><td>' + money(o.total) + '</td>' +
        '<td><span class="badge ' + statusClass(o.status) + '">' + esc(t('admin.status.' + o.status)) + '</span></td></tr>';
    }).join('');

    return '<div class="admin-head"><h2>' + esc(t('admin.overview')) + '</h2></div>' +
      '<div class="stat-grid">' +
      statCard(t('admin.stat.orders'), orders.length) +
      statCard(t('admin.stat.today'), todays.length) +
      statCard(t('admin.stat.revenue'), money(revenue)) +
      statCard(t('admin.stat.products'), products.length) +
      statCard(t('admin.stat.unavailable'), unavailable) +
      statCard(t('admin.stat.offers'), activeOffers) +
      '</div>' +
      '<div class="panel"><h3>' + esc(t('admin.chart.revenue')) + '</h3>' +
      '<canvas id="revChart" width="640" height="200" style="width:100%;height:auto"></canvas></div>' +
      '<div class="two-col">' +
      '<div class="panel"><h3>' + esc(t('admin.bestSellers')) + '</h3>' + bestHtml + '</div>' +
      '<div class="panel"><h3>' + esc(t('admin.chart.categories')) + '</h3><div id="catBars"></div></div>' +
      '</div>' +
      '<div class="panel"><h3>' + esc(t('admin.recentOrders')) + '</h3>' +
      (orders.length ? '<table class="table"><thead><tr><th>' + esc(t('admin.orderNo')) + '</th><th>' + esc(t('admin.customer')) + '</th><th>' + esc(t('admin.total')) + '</th><th>' + esc(t('admin.status')) + '</th></tr></thead><tbody>' + recent + '</tbody></table>'
        : '<p style="color:var(--muted-2)">' + esc(t('admin.noOrders')) + '</p>') +
      '</div>';
  }

  function statCard(label, value) {
    return '<div class="stat-card"><span>' + esc(label) + '</span><b>' + esc(String(value)) + '</b></div>';
  }

  function statusClass(s) {
    return { 'Pending': 'warn', 'Confirmed': 'info', 'Preparing': 'info', 'Ready': 'ok',
             'Out for Delivery': 'info', 'Completed': 'ok', 'Cancelled': 'bad' }[s] || '';
  }

  /* Simple vanilla-canvas bar chart: revenue per day for the last 7 days */
  function drawCharts() {
    var cv = document.getElementById('revChart');
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext('2d');
    var orders = DB.getOrders().filter(function (o) { return o.status !== 'Cancelled'; });
    var days = [];
    for (var i = 6; i >= 0; i--) {
      var d = new Date(Date.now() - i * 86400000);
      days.push({ key: d.toISOString().slice(0, 10), label: d.toLocaleDateString(I18N.lang === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'short' }) });
    }
    var sums = days.map(function (dy) {
      return orders.filter(function (o) { return o.createdAt && new Date(o.createdAt).toISOString().slice(0, 10) === dy.key; })
        .reduce(function (s, o) { return s + (o.total || 0); }, 0);
    });
    var max = Math.max.apply(null, sums.concat([1]));
    var W = cv.width, H = cv.height, pad = 34, bw = (W - pad * 2) / 7;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#8b8578';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    sums.forEach(function (v, i) {
      var h = (H - pad * 2) * (v / max);
      var x = pad + i * bw + bw * 0.2;
      var y = H - pad - h;
      ctx.fillStyle = '#c9a45c';
      ctx.fillRect(x, y, bw * 0.6, h);
      ctx.fillStyle = '#d8d3c8';
      ctx.fillText(fmt(v), x + bw * 0.3, y - 6);
      ctx.fillStyle = '#8b8578';
      ctx.fillText(days[i].label, x + bw * 0.3, H - 12);
    });

    /* best-selling categories as CSS bars */
    var catBox = document.getElementById('catBars');
    if (catBox) {
      var prodCat = {};
      DB.getProducts().forEach(function (p) { prodCat[p.id] = p.categoryId; });
      var catSold = {};
      orders.forEach(function (o) {
        (o.items || []).forEach(function (it) {
          var cid = prodCat[it.productId];
          if (!cid) return;
          catSold[cid] = (catSold[cid] || 0) + it.qty;
        });
      });
      var top = Object.keys(catSold).map(function (k) { return { id: k, qty: catSold[k] }; })
        .sort(function (a, b) { return b.qty - a.qty; }).slice(0, 5);
      var maxQ = top.length ? top[0].qty : 1;
      catBox.innerHTML = top.length ? top.map(function (c) {
        var cat = DB.getCategory(c.id);
        var name = cat ? loc(cat.name) : c.id;
        return '<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:.85rem"><span>' +
          esc(name) + '</span><b>' + c.qty + '</b></div>' +
          '<div style="background:#24221e;height:8px;border-radius:4px;margin-top:4px"><div style="background:#c9a45c;height:8px;border-radius:4px;width:' +
          Math.round(c.qty / maxQ * 100) + '%"></div></div></div>';
      }).join('') : '<p style="color:var(--muted-2)">' + esc(t('admin.noOrders')) + '</p>';
    }
  }

  /* ---------------- Products ---------------- */

  function productsHtml(params) {
    if (params && (params.edit || params.new)) return productFormHtml(params.edit || null);
    var cats = DB.getCategories();
    var catOpts = '<option value="all">' + esc(t('menu.all')) + '</option>' +
      cats.map(function (c) {
        return '<option value="' + c.id + '"' + (ADMIN.prodCat === c.id ? ' selected' : '') + '>' + esc(loc(c.name)) + '</option>';
      }).join('');
    return '<div class="admin-head"><h2>' + esc(t('admin.products')) + '</h2>' +
      '<a class="btn btn-gold btn-sm" href="#/admin?tab=products&new=1">＋ ' + esc(t('admin.addProduct')) + '</a></div>' +
      '<div class="form-grid" style="margin-bottom:16px">' +
      '<div class="field"><input id="prodSearch" type="search" placeholder="' + esc(t('menu.search')) + '" value="' + esc(ADMIN.prodQuery) + '" oninput="Admin.filterProducts()"></div>' +
      '<div class="field"><select id="prodCat" onchange="Admin.filterProducts()">' + catOpts + '</select></div>' +
      '</div>' +
      '<div class="panel" style="padding:0;overflow:auto"><table class="table"><thead><tr>' +
      '<th></th><th>' + esc(t('admin.name')) + '</th><th>' + esc(t('admin.category')) + '</th>' +
      '<th>' + esc(t('admin.price')) + '</th><th>' + esc(t('admin.available')) + '</th><th>' + esc(t('admin.featured')) + '</th><th></th>' +
      '</tr></thead><tbody id="prodRows"></tbody></table></div>' +
      '<p id="prodCount" style="color:var(--muted-2);font-size:.85rem;margin-top:10px"></p>';
  }

  function filterProducts() {
    ADMIN.prodQuery = val('prodSearch');
    ADMIN.prodCat = val('prodCat') || 'all';
    var list = DB.getProducts({ query: ADMIN.prodQuery });
    if (ADMIN.prodCat !== 'all') list = list.filter(function (p) { return p.categoryId === ADMIN.prodCat; });
    var shown = list.slice(0, 100);
    var rows = shown.map(function (p) {
      var cat = DB.getCategory(p.categoryId);
      return '<tr><td><img src="' + esc(p.image) + '" alt="" style="width:48px;height:36px;object-fit:cover;border-radius:6px"></td>' +
        '<td>' + esc(loc(p.name)) + '<br><small style="color:var(--muted-2)">' + esc(p.name[I18N.lang === 'ar' ? 'en' : 'ar'] || '') + '</small></td>' +
        '<td>' + (cat ? esc(loc(cat.name)) : '') + '</td>' +
        '<td>' + money(p.price) + '</td>' +
        '<td><input type="checkbox" ' + (p.available ? 'checked' : '') + ' onchange="Admin.toggleProduct(\'' + p.id + '\', \'available\', this.checked)"></td>' +
        '<td><input type="checkbox" ' + (p.featured ? 'checked' : '') + ' onchange="Admin.toggleProduct(\'' + p.id + '\', \'featured\', this.checked)"></td>' +
        '<td style="white-space:nowrap"><a class="btn btn-outline btn-sm" href="#/admin?tab=products&edit=' + p.id + '">' + esc(t('admin.edit')) + '</a> ' +
        '<button class="btn btn-danger btn-sm" type="button" onclick="Admin.deleteProduct(\'' + p.id + '\')">' + esc(t('admin.delete')) + '</button></td></tr>';
    }).join('');
    var tbody = document.getElementById('prodRows');
    if (tbody) tbody.innerHTML = rows || '<tr><td colspan="7" style="text-align:center;color:var(--muted-2)">' + esc(t('menu.noResults')) + '</td></tr>';
    var cnt = document.getElementById('prodCount');
    if (cnt) cnt.textContent = list.length + ' ' + t('admin.products') + (list.length > 100 ? ' — ' + t('admin.showingFirst100') : '');
  }

  function toggleProduct(id, field, on) {
    var p = DB.getProduct(id);
    if (!p) return;
    p[field] = on;
    DB.saveProduct(p);
    toast(t('admin.saved'));
  }

  function deleteProduct(id) {
    var p = DB.getProduct(id);
    if (!p) return;
    if (!confirm(t('admin.confirmDelete') + '\n' + loc(p.name))) return;
    DB.deleteProduct(id);
    render({ tab: 'products' });
    toast(t('admin.saved'));
  }

  function sizeRowHtml(s, idx) {
    s = s || { label: { en: '', ar: '' }, price: '' };
    return '<div class="dyn-row" data-row="size"><input type="text" name="szEn" placeholder="Label EN" value="' + esc(s.label.en) + '">' +
      '<input type="text" name="szAr" placeholder="الاسم" value="' + esc(s.label.ar) + '">' +
      '<input type="number" name="szPrice" placeholder="EGP" min="0" step="0.5" value="' + esc(s.price) + '" style="max-width:110px">' +
      '<button class="btn btn-danger btn-sm" type="button" onclick="this.closest(\'.dyn-row\').remove()">✕</button></div>';
  }

  function extraRowHtml(e, idx) {
    e = e || { name: { en: '', ar: '' }, price: '' };
    return '<div class="dyn-row" data-row="extra"><input type="text" name="exEn" placeholder="Name EN" value="' + esc(e.name.en) + '">' +
      '<input type="text" name="exAr" placeholder="الاسم" value="' + esc(e.name.ar) + '">' +
      '<input type="number" name="exPrice" placeholder="EGP" min="0" step="0.5" value="' + esc(e.price) + '" style="max-width:110px">' +
      '<button class="btn btn-danger btn-sm" type="button" onclick="this.closest(\'.dyn-row\').remove()">✕</button></div>';
  }

  function productFormHtml(id) {
    var p = id ? DB.getProduct(id) : null;
    var cats = DB.getCategories();
    var catOpts = cats.map(function (c) {
      return '<option value="' + c.id + '"' + (p && p.categoryId === c.id ? ' selected' : '') + '>' + esc(loc(c.name)) + '</option>';
    }).join('');
    var badge = p ? (p.badge || '') : '';
    return '<div class="admin-head"><h2>' + esc(p ? t('admin.editProduct') : t('admin.addProduct')) + '</h2>' +
      '<a class="btn btn-outline btn-sm" href="#/admin?tab=products">' + esc(t('admin.backList')) + '</a></div>' +
      '<div class="panel"><input type="hidden" id="pfId" value="' + (p ? p.id : '') + '">' +
      '<div class="form-grid">' +
      '<div class="field"><label>' + esc(t('admin.nameEn')) + ' <i>*</i></label><input id="pfNameEn" type="text" value="' + esc(p ? p.name.en : '') + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.nameAr')) + ' <i>*</i></label><input id="pfNameAr" type="text" value="' + esc(p ? p.name.ar : '') + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.descEn')) + '</label><textarea id="pfDescEn" rows="2">' + esc(p ? p.desc.en : '') + '</textarea></div>' +
      '<div class="field"><label>' + esc(t('admin.descAr')) + '</label><textarea id="pfDescAr" rows="2">' + esc(p ? p.desc.ar : '') + '</textarea></div>' +
      '<div class="field"><label>' + esc(t('admin.price')) + ' (EGP) <i>*</i></label><input id="pfPrice" type="number" min="0" step="0.5" value="' + esc(p ? p.price : '') + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.category')) + '</label><select id="pfCategory">' + catOpts + '</select></div>' +
      '</div>' +
      '<div class="field"><label>' + esc(t('admin.imageUrl')) + '</label><input id="pfImage" type="text" value="' + esc(p ? p.image : '') + '"></div>' +
      '<div class="form-grid">' +
      '<div class="field"><label>' + esc(t('admin.badge')) + '</label><select id="pfBadge">' +
      '<option value="">—</option>' +
      '<option value="new"' + (badge === 'new' ? ' selected' : '') + '>' + esc(t('badge.new')) + '</option>' +
      '<option value="best"' + (badge === 'best' ? ' selected' : '') + '>' + esc(t('badge.best')) + '</option>' +
      '<option value="special"' + (badge === 'special' ? ' selected' : '') + '>' + esc(t('badge.special')) + '</option>' +
      '</select></div>' +
      '<div class="field" style="display:flex;gap:22px;align-items:flex-end;padding-bottom:10px">' +
      '<label><input id="pfAvailable" type="checkbox"' + (!p || p.available ? ' checked' : '') + '> ' + esc(t('admin.available')) + '</label>' +
      '<label><input id="pfFeatured" type="checkbox"' + (p && p.featured ? ' checked' : '') + '> ' + esc(t('admin.featured')) + '</label>' +
      '</div></div>' +
      '<div class="field"><label>' + esc(t('admin.sizes')) + '</label><div id="pfSizes">' +
      ((p && p.sizes) ? p.sizes.map(sizeRowHtml).join('') : '') + '</div>' +
      '<button class="btn btn-outline btn-sm" type="button" onclick="Admin.addSizeRow()">＋ ' + esc(t('admin.addSize')) + '</button></div>' +
      '<div class="field"><label>' + esc(t('admin.extras')) + '</label><div id="pfExtras">' +
      ((p && p.extras) ? p.extras.map(extraRowHtml).join('') : '') + '</div>' +
      '<button class="btn btn-outline btn-sm" type="button" onclick="Admin.addExtraRow()">＋ ' + esc(t('admin.addExtra')) + '</button></div>' +
      '<button class="btn btn-gold" type="button" onclick="Admin.saveProduct()">' + esc(t('admin.save')) + '</button>' +
      '</div>';
  }

  function addSizeRow() {
    var box = document.getElementById('pfSizes');
    if (box) box.insertAdjacentHTML('beforeend', sizeRowHtml(null));
  }

  function addExtraRow() {
    var box = document.getElementById('pfExtras');
    if (box) box.insertAdjacentHTML('beforeend', extraRowHtml(null));
  }

  function collectRows(containerId, kind) {
    var box = document.getElementById(containerId);
    var out = [];
    if (!box) return out;
    box.querySelectorAll('.dyn-row').forEach(function (row) {
      var en = row.querySelector('[name="' + kind + 'En"]');
      var ar = row.querySelector('[name="' + kind + 'Ar"]');
      var pr = row.querySelector('[name="' + kind + 'Price"]');
      var price = parseFloat(pr ? pr.value : 0) || 0;
      var labelEn = en ? en.value.trim() : '';
      var labelAr = ar ? ar.value.trim() : '';
      if (!labelEn && !labelAr) return;
      if (kind === 'sz') out.push({ label: { en: labelEn, ar: labelAr || labelEn }, price: price });
      else out.push({ name: { en: labelEn, ar: labelAr || labelEn }, price: price });
    });
    return out;
  }

  function saveProduct() {
    var id = val('pfId');
    var nameEn = val('pfNameEn').trim();
    var nameAr = val('pfNameAr').trim();
    var price = parseFloat(val('pfPrice')) || 0;
    if (!nameEn || !nameAr || price <= 0) { toast(t('admin.fillRequired')); return; }
    var existing = id ? DB.getProduct(id) : null;
    var p = {
      id: id || ('p' + Date.now()),
      categoryId: val('pfCategory'),
      name: { en: nameEn, ar: nameAr },
      desc: { en: val('pfDescEn').trim(), ar: val('pfDescAr').trim() },
      price: price,
      image: val('pfImage').trim() || (existing ? existing.image : 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'),
      badge: val('pfBadge') || null,
      available: checked('pfAvailable'),
      featured: checked('pfFeatured'),
      sizes: collectRows('pfSizes', 'sz'),
      extras: collectRows('pfExtras', 'ex')
    };
    DB.saveProduct(p);
    location.hash = '#/admin?tab=products';
    toast(t('admin.saved'));
  }

  /* ---------------- Categories ---------------- */

  function categoriesHtml(params) {
    if (params && (params.edit || params.new)) return categoryFormHtml(params.edit || null);
    var cats = DB.getCategories();
    var rows = cats.map(function (c, i) {
      var count = DB.getProducts().filter(function (p) { return p.categoryId === c.id; }).length;
      return '<tr><td><img src="' + esc(c.image) + '" alt="" style="width:48px;height:36px;object-fit:cover;border-radius:6px"></td>' +
        '<td>' + esc(loc(c.name)) + '<br><small style="color:var(--muted-2)">' + count + ' ' + esc(t('admin.products')) + '</small></td>' +
        '<td>' + (i + 1) + '</td>' +
        '<td><input type="checkbox" ' + (c.visible !== false ? 'checked' : '') + ' onchange="Admin.toggleCategory(\'' + c.id + '\', this.checked)"></td>' +
        '<td style="white-space:nowrap">' +
        '<button class="btn btn-outline btn-sm" type="button" onclick="Admin.moveCategory(\'' + c.id + '\', -1)" ' + (i === 0 ? 'disabled' : '') + '>↑</button> ' +
        '<button class="btn btn-outline btn-sm" type="button" onclick="Admin.moveCategory(\'' + c.id + '\', 1)" ' + (i === cats.length - 1 ? 'disabled' : '') + '>↓</button> ' +
        '<a class="btn btn-outline btn-sm" href="#/admin?tab=categories&edit=' + c.id + '">' + esc(t('admin.edit')) + '</a> ' +
        '<button class="btn btn-danger btn-sm" type="button" onclick="Admin.deleteCategory(\'' + c.id + '\')">' + esc(t('admin.delete')) + '</button></td></tr>';
    }).join('');
    return '<div class="admin-head"><h2>' + esc(t('admin.categories')) + '</h2>' +
      '<a class="btn btn-gold btn-sm" href="#/admin?tab=categories&new=1">＋ ' + esc(t('admin.addCategory')) + '</a></div>' +
      '<div class="panel" style="padding:0;overflow:auto"><table class="table"><thead><tr>' +
      '<th></th><th>' + esc(t('admin.name')) + '</th><th>' + esc(t('admin.order')) + '</th><th>' + esc(t('admin.visible')) + '</th><th></th>' +
      '</tr></thead><tbody>' + rows + '</tbody></table></div>';
  }

  function toggleCategory(id, on) {
    var c = DB.getCategory(id);
    if (!c) return;
    c.visible = on;
    DB.saveCategory(c);
    toast(t('admin.saved'));
  }

  function moveCategory(id, dir) {
    var cats = DB.getCategories();
    var idx = cats.findIndex(function (c) { return c.id === id; });
    var j = idx + dir;
    if (idx < 0 || j < 0 || j >= cats.length) return;
    var tmp = cats[idx].order; cats[idx].order = cats[j].order; cats[j].order = tmp;
    DB.saveCategory(cats[idx]);
    DB.saveCategory(cats[j]);
    render({ tab: 'categories' });
  }

  function deleteCategory(id) {
    var c = DB.getCategory(id);
    if (!c) return;
    var count = DB.getProducts().filter(function (p) { return p.categoryId === id; }).length;
    if (count > 0) { toast(t('admin.catHasProducts').replace('{n}', count)); return; }
    if (!confirm(t('admin.confirmDelete') + '\n' + loc(c.name))) return;
    DB.deleteCategory(id);
    render({ tab: 'categories' });
    toast(t('admin.saved'));
  }

  function categoryFormHtml(id) {
    var c = id ? DB.getCategory(id) : null;
    return '<div class="admin-head"><h2>' + esc(c ? t('admin.editCategory') : t('admin.addCategory')) + '</h2>' +
      '<a class="btn btn-outline btn-sm" href="#/admin?tab=categories">' + esc(t('admin.backList')) + '</a></div>' +
      '<div class="panel"><input type="hidden" id="cfId" value="' + (c ? c.id : '') + '">' +
      '<div class="form-grid">' +
      '<div class="field"><label>' + esc(t('admin.nameEn')) + ' <i>*</i></label><input id="cfNameEn" type="text" value="' + esc(c ? c.name.en : '') + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.nameAr')) + ' <i>*</i></label><input id="cfNameAr" type="text" value="' + esc(c ? c.name.ar : '') + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.descEn')) + '</label><textarea id="cfDescEn" rows="2">' + esc(c ? c.desc.en : '') + '</textarea></div>' +
      '<div class="field"><label>' + esc(t('admin.descAr')) + '</label><textarea id="cfDescAr" rows="2">' + esc(c ? c.desc.ar : '') + '</textarea></div>' +
      '</div>' +
      '<div class="field"><label>' + esc(t('admin.imageUrl')) + '</label><input id="cfImage" type="text" value="' + esc(c ? c.image : '') + '"></div>' +
      '<div class="field"><label><input id="cfVisible" type="checkbox"' + (!c || c.visible !== false ? ' checked' : '') + '> ' + esc(t('admin.visible')) + '</label></div>' +
      '<button class="btn btn-gold" type="button" onclick="Admin.saveCategory()">' + esc(t('admin.save')) + '</button></div>';
  }

  function saveCategory() {
    var id = val('cfId');
    var nameEn = val('cfNameEn').trim();
    var nameAr = val('cfNameAr').trim();
    if (!nameEn || !nameAr) { toast(t('admin.fillRequired')); return; }
    var existing = id ? DB.getCategory(id) : null;
    var c = {
      id: id || ('c' + Date.now()),
      name: { en: nameEn, ar: nameAr },
      desc: { en: val('cfDescEn').trim(), ar: val('cfDescAr').trim() },
      image: val('cfImage').trim() || (existing ? existing.image : 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'),
      order: existing ? existing.order : (DB.getCategories().length + 1),
      visible: checked('cfVisible')
    };
    DB.saveCategory(c);
    location.hash = '#/admin?tab=categories';
    toast(t('admin.saved'));
  }

  /* ---------------- Offers ---------------- */

  var OFFER_STATUSES = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Completed', 'Cancelled'];

  function offersHtml(params) {
    if (params && (params.edit || params.new)) return offerFormHtml(params.edit || null);
    var offers = DB.getOffers();
    var rows = offers.map(function (o) {
      var target = o.type === 'bundle' ? (o.bundlePrice ? money(o.bundlePrice) : '—')
        : (o.type === 'percent' ? o.discount + '%' : money(o.discount));
      return '<tr><td><img src="' + esc(o.image) + '" alt="" style="width:48px;height:36px;object-fit:cover;border-radius:6px"></td>' +
        '<td>' + esc(loc(o.title)) + '<br><small style="color:var(--muted-2)">' + esc(o.type) + ' • ' + esc(o.start) + ' → ' + esc(o.end) + '</small></td>' +
        '<td>' + target + '</td>' +
        '<td><input type="checkbox" ' + (o.active ? 'checked' : '') + ' onchange="Admin.toggleOffer(\'' + o.id + '\', this.checked)"></td>' +
        '<td style="white-space:nowrap"><a class="btn btn-outline btn-sm" href="#/admin?tab=offers&edit=' + o.id + '">' + esc(t('admin.edit')) + '</a> ' +
        '<button class="btn btn-danger btn-sm" type="button" onclick="Admin.deleteOffer(\'' + o.id + '\')">' + esc(t('admin.delete')) + '</button></td></tr>';
    }).join('');
    return '<div class="admin-head"><h2>' + esc(t('admin.offers')) + '</h2>' +
      '<a class="btn btn-gold btn-sm" href="#/admin?tab=offers&new=1">＋ ' + esc(t('admin.addOffer')) + '</a></div>' +
      '<div class="panel" style="padding:0;overflow:auto"><table class="table"><thead><tr>' +
      '<th></th><th>' + esc(t('admin.name')) + '</th><th>' + esc(t('admin.discount')) + '</th><th>' + esc(t('admin.active')) + '</th><th></th>' +
      '</tr></thead><tbody>' + rows + '</tbody></table></div>';
  }

  function toggleOffer(id, on) {
    var o = DB.getOffer(id);
    if (!o) return;
    o.active = on;
    DB.saveOffer(o);
    toast(t('admin.saved'));
  }

  function deleteOffer(id) {
    var o = DB.getOffer(id);
    if (!o) return;
    if (!confirm(t('admin.confirmDelete') + '\n' + loc(o.title))) return;
    DB.deleteOffer(id);
    render({ tab: 'offers' });
    toast(t('admin.saved'));
  }

  function offerFormHtml(id) {
    var o = id ? DB.getOffer(id) : null;
    var prods = DB.getProducts();
    var prodOpts = prods.map(function (p) {
      var sel = o && o.productIds && o.productIds.indexOf(p.id) !== -1;
      return '<option value="' + p.id + '"' + (sel ? ' selected' : '') + '>' + esc(loc(p.name)) + ' — ' + fmt(p.price) + '</option>';
    }).join('');
    var type = o ? o.type : 'percent';
    return '<div class="admin-head"><h2>' + esc(o ? t('admin.editOffer') : t('admin.addOffer')) + '</h2>' +
      '<a class="btn btn-outline btn-sm" href="#/admin?tab=offers">' + esc(t('admin.backList')) + '</a></div>' +
      '<div class="panel"><input type="hidden" id="ofId" value="' + (o ? o.id : '') + '">' +
      '<div class="form-grid">' +
      '<div class="field"><label>' + esc(t('admin.nameEn')) + ' <i>*</i></label><input id="ofTitleEn" type="text" value="' + esc(o ? o.title.en : '') + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.nameAr')) + ' <i>*</i></label><input id="ofTitleAr" type="text" value="' + esc(o ? o.title.ar : '') + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.descEn')) + '</label><textarea id="ofDescEn" rows="2">' + esc(o ? o.desc.en : '') + '</textarea></div>' +
      '<div class="field"><label>' + esc(t('admin.descAr')) + '</label><textarea id="ofDescAr" rows="2">' + esc(o ? o.desc.ar : '') + '</textarea></div>' +
      '<div class="field"><label>' + esc(t('admin.offerType')) + '</label><select id="ofType" onchange="Admin.toggleOfferFields()">' +
      '<option value="percent"' + (type === 'percent' ? ' selected' : '') + '>' + esc(t('admin.typePercent')) + '</option>' +
      '<option value="fixed"' + (type === 'fixed' ? ' selected' : '') + '>' + esc(t('admin.typeFixed')) + '</option>' +
      '<option value="bundle"' + (type === 'bundle' ? ' selected' : '') + '>' + esc(t('admin.typeBundle')) + '</option>' +
      '</select></div>' +
      '<div class="field" id="ofDiscountWrap" style="display:' + (type === 'bundle' ? 'none' : 'block') + '"><label>' + esc(t('admin.discountValue')) + '</label>' +
      '<input id="ofDiscount" type="number" min="0" step="0.5" value="' + esc(o ? (o.discount || 0) : 0) + '"></div>' +
      '</div>' +
      '<div id="ofBundleFields" style="display:' + (type === 'bundle' ? 'block' : 'none') + '">' +
      '<div class="form-grid">' +
      '<div class="field"><label>' + esc(t('admin.bundlePrice')) + ' (EGP)</label><input id="ofBundlePrice" type="number" min="0" step="0.5" value="' + esc(o ? (o.bundlePrice || '') : '') + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.originalPrice')) + ' (EGP)</label><input id="ofOriginalPrice" type="number" min="0" step="0.5" value="' + esc(o ? (o.originalPrice || '') : '') + '"></div>' +
      '</div></div>' +
      '<div class="field"><label>' + esc(t('admin.offerProducts')) + '</label><select id="ofProductIds" multiple size="8" style="height:auto">' + prodOpts + '</select></div>' +
      '<div class="form-grid">' +
      '<div class="field"><label>' + esc(t('admin.startDate')) + '</label><input id="ofStart" type="date" value="' + esc(o ? o.start : '') + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.endDate')) + '</label><input id="ofEnd" type="date" value="' + esc(o ? o.end : '') + '"></div>' +
      '</div>' +
      '<div class="field"><label>' + esc(t('admin.imageUrl')) + '</label><input id="ofImage" type="text" value="' + esc(o ? o.image : '') + '"></div>' +
      '<div class="field"><label><input id="ofActive" type="checkbox"' + (!o || o.active ? ' checked' : '') + '> ' + esc(t('admin.active')) + '</label></div>' +
      '<button class="btn btn-gold" type="button" onclick="Admin.saveOffer()">' + esc(t('admin.save')) + '</button></div>';
  }

  function toggleOfferFields() {
    var isBundle = val('ofType') === 'bundle';
    var box = document.getElementById('ofBundleFields');
    if (box) box.style.display = isBundle ? 'block' : 'none';
    var dw = document.getElementById('ofDiscountWrap');
    if (dw) dw.style.display = isBundle ? 'none' : 'block';
  }

  function saveOffer() {
    var id = val('ofId');
    var titleEn = val('ofTitleEn').trim();
    var titleAr = val('ofTitleAr').trim();
    if (!titleEn || !titleAr) { toast(t('admin.fillRequired')); return; }
    var sel = document.getElementById('ofProductIds');
    var productIds = [];
    if (sel) { for (var i = 0; i < sel.options.length; i++) if (sel.options[i].selected) productIds.push(sel.options[i].value); }
    var type = val('ofType');
    var o = {
      id: id || ('off' + Date.now()),
      type: type,
      title: { en: titleEn, ar: titleAr },
      desc: { en: val('ofDescEn').trim(), ar: val('ofDescAr').trim() },
      discount: type === 'bundle' ? 0 : (parseFloat(val('ofDiscount')) || 0),
      productIds: productIds,
      bundlePrice: type === 'bundle' ? (parseFloat(val('ofBundlePrice')) || 0) : null,
      originalPrice: type === 'bundle' ? (parseFloat(val('ofOriginalPrice')) || 0) : null,
      start: val('ofStart') || new Date().toISOString().slice(0, 10),
      end: val('ofEnd') || new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
      image: val('ofImage').trim() || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
      active: checked('ofActive')
    };
    DB.saveOffer(o);
    location.hash = '#/admin?tab=offers';
    toast(t('admin.saved'));
  }

  /* ---------------- Orders ---------------- */

  function ordersHtml(params) {
    if (params && params.order) return orderDetailHtml(params.order);
    var orders = DB.getOrders();
    if (ADMIN.orderStatus !== 'all') orders = orders.filter(function (o) { return o.status === ADMIN.orderStatus; });
    var q = (ADMIN.orderQuery || '').trim().toLowerCase();
    if (q) {
      orders = orders.filter(function (o) {
        return (o.number || '').toLowerCase().indexOf(q) !== -1 ||
          (o.customer.phone || '').replace(/[^0-9]/g, '').indexOf(q.replace(/[^0-9]/g, '')) !== -1 ||
          (o.customer.name || '').toLowerCase().indexOf(q) !== -1;
      });
    }
    var statusOpts = '<option value="all">' + esc(t('admin.filterStatus')) + '</option>' +
      OFFER_STATUSES.map(function (st) {
        return '<option value="' + st + '"' + (ADMIN.orderStatus === st ? ' selected' : '') + '>' + esc(t('admin.status.' + st)) + '</option>';
      }).join('');
    var rows = orders.map(function (o) {
      var d = o.createdAt ? new Date(o.createdAt) : null;
      return '<tr><td><a href="#/admin?tab=orders&order=' + o.id + '" style="color:var(--gold-light)">' + esc(o.number) + '</a></td>' +
        '<td>' + esc(o.customer.name) + '<br><small style="color:var(--muted-2)">' + esc(o.customer.phone) + '</small></td>' +
        '<td>' + esc(o.customer.area || '') + '</td>' +
        '<td>' + (d ? d.toLocaleString(I18N.lang === 'ar' ? 'ar-EG' : 'en-US') : '') + '</td>' +
        '<td>' + money(o.total) + '</td>' +
        '<td><span class="badge ' + statusClass(o.status) + '">' + esc(t('admin.status.' + o.status)) + '</span></td></tr>';
    }).join('');
    return '<div class="admin-head"><h2>' + esc(t('admin.orders')) + '</h2></div>' +
      '<div class="form-grid" style="margin-bottom:16px">' +
      '<div class="field"><input id="ordSearch" type="search" placeholder="' + esc(t('admin.searchOrder')) + '" value="' + esc(ADMIN.orderQuery) + '" oninput="Admin.filterOrders()"></div>' +
      '<div class="field"><select id="ordStatus" onchange="Admin.filterOrders()">' + statusOpts + '</select></div>' +
      '</div>' +
      '<div class="panel" style="padding:0;overflow:auto"><table class="table"><thead><tr>' +
      '<th>' + esc(t('admin.orderNo')) + '</th><th>' + esc(t('admin.customer')) + '</th><th>' + esc(t('admin.area')) + '</th>' +
      '<th>' + esc(t('admin.date')) + '</th><th>' + esc(t('admin.total')) + '</th><th>' + esc(t('admin.status')) + '</th>' +
      '</tr></thead><tbody id="ordRows">' + rows + '</tbody></table></div>' +
      (orders.length ? '' : '<p style="color:var(--muted-2);margin-top:12px">' + esc(t('admin.noOrders')) + '</p>');
  }

  function filterOrders() {
    ADMIN.orderQuery = val('ordSearch');
    ADMIN.orderStatus = val('ordStatus') || 'all';
    render({ tab: 'orders' });
    var inp = document.getElementById('ordSearch');
    if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
  }

  function orderDetailHtml(orderId) {
    var o = DB.getOrder(orderId);
    if (!o) return '<div class="admin-head"><h2>' + esc(t('admin.orderDetail')) + '</h2></div><p style="color:var(--muted-2)">' + esc(t('admin.noOrders')) + '</p>';
    var d = o.createdAt ? new Date(o.createdAt) : null;
    var itemsHtml = (o.items || []).map(function (it) {
      var meta = [];
      if (it.sizeLabel) meta.push(loc(it.sizeLabel));
      (it.extras || []).forEach(function (e) { meta.push(loc(e.name) + ' (+' + fmt(e.price) + ')'); });
      if (it.notes) meta.push('“' + it.notes + '”');
      return '<div class="sum-row" style="align-items:flex-start"><span>' + it.qty + ' × ' + esc(loc(it.name)) +
        (meta.length ? '<br><small style="color:var(--muted-2)">' + esc(meta.join(' • ')) + '</small>' : '') +
        '</span><span>' + money(it.unitPrice * it.qty) + '</span></div>';
    }).join('');
    var statusOpts = OFFER_STATUSES.map(function (st) {
      return '<option value="' + st + '"' + (o.status === st ? ' selected' : '') + '>' + esc(t('admin.status.' + st)) + '</option>';
    }).join('');
    return '<div class="admin-head"><h2>' + esc(t('admin.orderDetail')) + ' — ' + esc(o.number) + '</h2>' +
      '<a class="btn btn-outline btn-sm" href="#/admin?tab=orders">' + esc(t('admin.backList')) + '</a></div>' +
      '<div class="two-col"><div class="panel"><h3>' + esc(t('admin.customer')) + '</h3>' +
      '<div class="sum-row"><span>' + esc(t('checkout.name')) + '</span><b>' + esc(o.customer.name) + '</b></div>' +
      '<div class="sum-row"><span>' + esc(t('admin.phone')) + '</span><b><a href="tel:' + esc(o.customer.phone) + '" style="color:var(--gold-light)">' + esc(o.customer.phone) + '</a></b></div>' +
      '<div class="sum-row"><span>' + esc(t('admin.address')) + '</span><span>' + esc(o.customer.address) + '</span></div>' +
      '<div class="sum-row"><span>' + esc(t('admin.area')) + '</span><span>' + esc(o.customer.area || '') + '</span></div>' +
      (o.customer.instructions ? '<div class="sum-row"><span>' + esc(t('admin.instructions')) + '</span><span>' + esc(o.customer.instructions) + '</span></div>' : '') +
      (o.customer.notes ? '<div class="sum-row"><span>' + esc(t('admin.notes')) + '</span><span>' + esc(o.customer.notes) + '</span></div>' : '') +
      '<div class="sum-row"><span>' + esc(t('admin.date')) + '</span><span>' + (d ? d.toLocaleString(I18N.lang === 'ar' ? 'ar-EG' : 'en-US') : '') + '</span></div>' +
      '<div class="sum-row"><span>' + esc(t('admin.method')) + '</span><span>' + esc(o.method === 'whatsapp' ? 'WhatsApp' : t('checkout.cod')) + '</span></div>' +
      '<div class="field" style="margin-top:14px"><label>' + esc(t('admin.updateStatus')) + '</label>' +
      '<select id="ordStatusSel">' + statusOpts + '</select></div>' +
      '<button class="btn btn-gold btn-sm" type="button" onclick="Admin.updateOrderStatus(\'' + o.id + '\')">' + esc(t('admin.save')) + '</button>' +
      '</div><div class="panel"><h3>' + esc(t('admin.items')) + '</h3>' + itemsHtml +
      '<div class="sum-row"><span>' + esc(t('admin.subtotal')) + '</span><span>' + money(o.subtotal) + '</span></div>' +
      (o.discount > 0 ? '<div class="sum-row discount"><span>' + esc(t('admin.discount')) + '</span><span>− ' + money(o.discount) + '</span></div>' : '') +
      '<div class="sum-row"><span>' + esc(t('admin.delivery')) + '</span><span>' + money(o.delivery) + '</span></div>' +
      '<div class="sum-row total"><span>' + esc(t('admin.total')) + '</span><b>' + money(o.total) + '</b></div>' +
      '</div></div>';
  }

  function updateOrderStatus(id) {
    DB.updateOrderStatus(id, val('ordStatusSel'));
    toast(t('admin.saved'));
    render({ tab: 'orders', order: id });
  }

  /* ---------------- Content ---------------- */

  function contentHtml() {
    var s = DB.getSettings();
    var heroImgs = ((s.hero && s.hero.images) || []).concat(['', '', '']).slice(0, 3);
    var imgsHtml = heroImgs.map(function (u, i) {
      return '<div class="field"><label>' + esc(t('admin.heroImages')) + ' ' + (i + 1) + '</label>' +
        '<input id="ctHeroImg' + i + '" type="text" value="' + esc(u) + '"></div>';
    }).join('');
    return '<div class="admin-head"><h2>' + esc(t('admin.content')) + '</h2></div>' +
      '<div class="panel"><div class="form-grid">' +
      '<div class="field"><label>' + esc(t('admin.heroTitle')) + ' (EN)</label><input id="ctHeroEn" type="text" value="' + esc(s.hero.title.en) + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.heroTitle')) + ' (AR)</label><input id="ctHeroAr" type="text" value="' + esc(s.hero.title.ar) + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.heroDesc')) + ' (EN)</label><textarea id="ctHeroDescEn" rows="2">' + esc(s.hero.subtitle.en) + '</textarea></div>' +
      '<div class="field"><label>' + esc(t('admin.heroDesc')) + ' (AR)</label><textarea id="ctHeroDescAr" rows="2">' + esc(s.hero.subtitle.ar) + '</textarea></div>' +
      '</div>' + imgsHtml +
      '<div class="form-grid">' +
      '<div class="field"><label>' + esc(t('admin.aboutTitle')) + ' (EN)</label><input id="ctAboutEn" type="text" value="' + esc(s.about.title.en) + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.aboutTitle')) + ' (AR)</label><input id="ctAboutAr" type="text" value="' + esc(s.about.title.ar) + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.aboutText')) + ' (EN)</label><textarea id="ctAboutTextEn" rows="3">' + esc(s.aboutText.en) + '</textarea></div>' +
      '<div class="field"><label>' + esc(t('admin.aboutText')) + ' (AR)</label><textarea id="ctAboutTextAr" rows="3">' + esc(s.aboutText.ar) + '</textarea></div>' +
      '<div class="field"><label>' + esc(t('admin.announcement')) + ' (EN)</label><input id="ctAnnEn" type="text" value="' + esc(s.announcement.en) + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.announcement')) + ' (AR)</label><input id="ctAnnAr" type="text" value="' + esc(s.announcement.ar) + '"></div>' +
      '</div>' +
      '<div class="field"><label><input id="ctAnnActive" type="checkbox"' + (s.announcement.active ? ' checked' : '') + '> ' + esc(t('admin.announcementActive')) + '</label></div>' +
      '<button class="btn btn-gold" type="button" onclick="Admin.saveContent()">' + esc(t('admin.save')) + '</button></div>';
  }

  function saveContent() {
    var s = DB.getSettings();
    s.hero.title = { en: val('ctHeroEn').trim(), ar: val('ctHeroAr').trim() };
    s.hero.subtitle = { en: val('ctHeroDescEn').trim(), ar: val('ctHeroDescAr').trim() };
    s.hero.images = [val('ctHeroImg0'), val('ctHeroImg1'), val('ctHeroImg2')].map(function (u) { return u.trim(); }).filter(Boolean);
    if (s.hero.images.length) s.hero.image = s.hero.images[0];
    s.about.title = { en: val('ctAboutEn').trim(), ar: val('ctAboutAr').trim() };
    s.about.text = { en: val('ctAboutTextEn').trim(), ar: val('ctAboutTextAr').trim() };
    s.announcement = { en: val('ctAnnEn').trim(), ar: val('ctAnnAr').trim(), active: checked('ctAnnActive') };
    DB.saveSettings(s);
    toast(t('admin.saved'));
  }

  /* ---------------- Settings ---------------- */

  function zoneRowHtml(z) {
    z = z || { area: { en: '', ar: '' }, fee: '' };
    return '<div class="dyn-row" data-row="zone"><input type="text" name="znEn" placeholder="Area EN" value="' + esc(z.area.en) + '">' +
      '<input type="text" name="znAr" placeholder="المنطقة" value="' + esc(z.area.ar) + '">' +
      '<input type="number" name="znFee" placeholder="EGP" min="0" step="0.5" value="' + esc(z.fee) + '" style="max-width:110px">' +
      '<button class="btn btn-danger btn-sm" type="button" onclick="this.closest(\'.dyn-row\').remove()">✕</button></div>';
  }

  function settingsHtml() {
    var s = DB.getSettings();
    var zonesHtml = (s.deliveryFees || []).map(zoneRowHtml).join('');
    return '<div class="admin-head"><h2>' + esc(t('admin.settings')) + '</h2></div>' +
      '<div class="panel"><div class="form-grid">' +
      '<div class="field"><label>' + esc(t('admin.restaurantName')) + '</label><input id="stName" type="text" value="' + esc(s.restaurantName) + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.logoUrl')) + '</label><input id="stLogo" type="text" value="' + esc(s.logoUrl) + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.whatsapp')) + '</label><input id="stWa" type="text" value="' + esc(s.whatsapp) + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.phones')) + '</label><input id="stPhones" type="text" value="' + esc((s.phones || []).join(', ')) + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.address')) + ' (EN)</label><input id="stAddrEn" type="text" value="' + esc(s.address.en) + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.address')) + ' (AR)</label><input id="stAddrAr" type="text" value="' + esc(s.address.ar) + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.hours')) + ' (EN)</label><input id="stHoursEn" type="text" value="' + esc(s.hours.en) + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.hours')) + ' (AR)</label><input id="stHoursAr" type="text" value="' + esc(s.hours.ar) + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.minOrder')) + '</label><input id="stMin" type="number" min="0" step="1" value="' + esc(s.minOrder) + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.defaultFee')) + '</label><input id="stFee" type="number" min="0" step="0.5" value="' + esc(s.defaultDeliveryFee) + '"></div>' +
      '<div class="field"><label>Facebook</label><input id="stFb" type="text" value="' + esc(s.social.facebook || '') + '"></div>' +
      '<div class="field"><label>Instagram</label><input id="stIg" type="text" value="' + esc(s.social.instagram || '') + '"></div>' +
      '<div class="field"><label>TikTok</label><input id="stTk" type="text" value="' + esc(s.social.tiktok || '') + '"></div>' +
      '<div class="field"><label>Google Maps</label><input id="stMap" type="text" value="' + esc(s.social.maps || '') + '"></div>' +
      '</div>' +
      '<div class="field"><label><input id="stCod" type="checkbox"' + (s.codEnabled ? ' checked' : '') + '> ' + esc(t('admin.codEnabled')) + '</label></div>' +
      '<div class="field"><label><input id="stMaint" type="checkbox"' + (s.maintenanceMode ? ' checked' : '') + '> ' + esc(t('admin.maintenance')) + '</label></div>' +
      '<div class="field"><label>' + esc(t('admin.deliveryFees')) + '</label><div id="stZones">' + zonesHtml + '</div>' +
      '<button class="btn btn-outline btn-sm" type="button" onclick="Admin.addZoneRow()">＋ ' + esc(t('admin.addZone')) + '</button></div>' +
      '<div class="form-grid">' +
      '<div class="field"><label>' + esc(t('admin.adminUser')) + '</label><input id="stAdminUser" type="text" value="' + esc(s.adminUser) + '"></div>' +
      '<div class="field"><label>' + esc(t('admin.newPass')) + '</label><input id="stAdminPass" type="password" autocomplete="new-password"></div>' +
      '</div>' +
      '<button class="btn btn-gold" type="button" onclick="Admin.saveSettings()">' + esc(t('admin.save')) + '</button> ' +
      '<button class="btn btn-danger btn-sm" type="button" onclick="Admin.resetData()" style="margin-inline-start:10px">' + esc(t('admin.resetData')) + '</button>' +
      '</div>';
  }

  function addZoneRow() {
    var box = document.getElementById('stZones');
    if (box) box.insertAdjacentHTML('beforeend', zoneRowHtml(null));
  }

  function saveSettings() {
    var s = DB.getSettings();
    s.restaurantName = val('stName').trim() || s.restaurantName;
    s.logoUrl = val('stLogo').trim() || s.logoUrl;
    s.whatsapp = val('stWa').trim() || s.whatsapp;
    s.phones = val('stPhones').split(',').map(function (x) { return x.trim(); }).filter(Boolean);
    s.address = { en: val('stAddrEn').trim(), ar: val('stAddrAr').trim() };
    s.hours = { en: val('stHoursEn').trim(), ar: val('stHoursAr').trim() };
    s.minOrder = parseFloat(val('stMin')) || 0;
    s.defaultDeliveryFee = parseFloat(val('stFee')) || 0;
    s.social = { facebook: val('stFb').trim(), instagram: val('stIg').trim(), tiktok: val('stTk').trim(), maps: val('stMap').trim() };
    s.codEnabled = checked('stCod');
    s.maintenanceMode = checked('stMaint');
    var zones = [];
    var box = document.getElementById('stZones');
    if (box) {
      box.querySelectorAll('.dyn-row').forEach(function (row) {
        var en = row.querySelector('[name="znEn"]');
        var ar = row.querySelector('[name="znAr"]');
        var fee = row.querySelector('[name="znFee"]');
        var nameEn = en ? en.value.trim() : '';
        var nameAr = ar ? ar.value.trim() : '';
        if (!nameEn && !nameAr) return;
        zones.push({ area: { en: nameEn, ar: nameAr || nameEn }, fee: parseFloat(fee ? fee.value : 0) || 0 });
      });
    }
    s.deliveryFees = zones;
    var newUser = val('stAdminUser').trim();
    if (newUser) s.adminUser = newUser;
    var newPass = val('stAdminPass');
    if (newPass) s.adminPass = newPass;
    DB.saveSettings(s);
    toast(t('admin.saved'));
  }

  function resetData() {
    if (!confirm(t('admin.resetConfirm'))) return;
    DB.seed();
    render({ tab: 'overview' });
    toast(t('admin.saved'));
  }

  /* ---------------- Render + public API ---------------- */

  function render(params) {
    params = params || {};
    var view = document.getElementById('view');
    if (!view) return;
    if (!isAuthed()) {
      ADMIN.tab = 'overview';
      view.innerHTML = loginHtml();
      return;
    }
    ADMIN.tab = params.tab || ADMIN.tab || 'overview';
    var body = '';
    if (ADMIN.tab === 'products') body = productsHtml(params);
    else if (ADMIN.tab === 'categories') body = categoriesHtml(params);
    else if (ADMIN.tab === 'offers') body = offersHtml(params);
    else if (ADMIN.tab === 'orders') body = ordersHtml(params);
    else if (ADMIN.tab === 'content') body = contentHtml();
    else if (ADMIN.tab === 'settings') body = settingsHtml();
    else body = overviewHtml();
    view.innerHTML = shellHtml(body);
    if (ADMIN.tab === 'overview') drawCharts();
    if (ADMIN.tab === 'products' && !(params.edit || params.new)) filterProducts();
  }

  global.Admin = {
    render: render, login: login, logout: logout,
    filterProducts: filterProducts, toggleProduct: toggleProduct,
    deleteProduct: deleteProduct, saveProduct: saveProduct,
    addSizeRow: addSizeRow, addExtraRow: addExtraRow,
    toggleCategory: toggleCategory, moveCategory: moveCategory,
    deleteCategory: deleteCategory, saveCategory: saveCategory,
    toggleOffer: toggleOffer, deleteOffer: deleteOffer,
    toggleOfferFields: toggleOfferFields, saveOffer: saveOffer,
    filterOrders: filterOrders, updateOrderStatus: updateOrderStatus,
    saveContent: saveContent, addZoneRow: addZoneRow,
    saveSettings: saveSettings, resetData: resetData
  };
})(typeof window !== 'undefined' ? window : globalThis);
