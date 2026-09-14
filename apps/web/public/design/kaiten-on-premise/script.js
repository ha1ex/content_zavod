  // Мобильное меню
  (function(){
    var burger = document.getElementById('burger');
    var menu = document.getElementById('mobileMenu');
    if (burger && menu){
      burger.addEventListener('click', function(){
        var open = menu.classList.toggle('open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      menu.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click', function(){
          menu.classList.remove('open');
          burger.setAttribute('aria-expanded','false');
        });
      });
    }
  })();

  // Тень навбара при скролле
  (function(){
    var bars = document.querySelectorAll('.navbar');
    function upd(){ bars.forEach(function(b){ b.classList.toggle('scrolled', window.scrollY > 8); }); }
    window.addEventListener('scroll', upd, { passive: true });
    upd();
  })();

  // Scroll-reveal: элементы .rv появляются при входе в вьюпорт
  (function(){
    var els = document.querySelectorAll('.rv');
    if (!('IntersectionObserver' in window)){ els.forEach(function(e){ e.classList.add('on'); }); return; }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting){ en.target.classList.add('on'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function(e){ io.observe(e); });
    // Страховка: если observer не сработал (старые webview), раскрываем все
    setTimeout(function(){
      if (!document.querySelector('.rv.on')){
        els.forEach(function(e){ e.classList.add('on'); });
        document.querySelectorAll('.term').forEach(function(t){ t.classList.add('play'); });
        var tl = document.getElementById('tl'); if (tl) tl.classList.add('on');
      }
    }, 2500);
  })();

  // Терминалы: построчный вывод при появлении (все копии)
  (function(){
    var terms = document.querySelectorAll('.term');
    if (!terms.length) return;
    if (!('IntersectionObserver' in window)){ terms.forEach(function(t){ t.classList.add('play'); }); return; }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting){ en.target.classList.add('play'); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    terms.forEach(function(t){ io.observe(t); });
  })();

  // Таймлайн внедрения: прогресс-линия + подсветка шагов
  (function(){
    var tl = document.getElementById('tl');
    if (!tl) return;
    if (!('IntersectionObserver' in window)){ tl.classList.add('on'); return; }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting){ tl.classList.add('on'); io.disconnect(); }
      });
    }, { threshold: 0.3 });
    io.observe(tl);
  })();

  // Flip-плитка модулей: на тач-устройствах — по тапу, с клавиатуры — по Enter
  (function(){
    var grid = document.getElementById('modGrid');
    if (!grid) return;
    // планшет (и любой тач): раскрытие по клику и по зажатию, а не только по наведению
    var tap = window.matchMedia('(hover: none) and (max-width: 1279px), (min-width: 768px) and (max-width: 1023px)');
    grid.querySelectorAll('.flip').forEach(function(card){
      card.addEventListener('click', function(){
        if (!tap.matches) return;
        var was = card.classList.contains('flipped');
        grid.querySelectorAll('.flip.flipped').forEach(function(f){ f.classList.remove('flipped'); });
        if (!was) card.classList.add('flipped');
      });
      card.addEventListener('pointerdown', function(){
        if (!tap.matches) return;
        grid.querySelectorAll('.flip.flipped').forEach(function(f){ if (f !== card) f.classList.remove('flipped'); });
        card.classList.add('flipped');
      });
      card.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); card.classList.toggle('flipped'); }
      });
    });
  })();

  // Карусель отзывов
  (function(){
    var track = document.getElementById('otzivTrack');
    var prev = document.getElementById('otzivPrev');
    var next = document.getElementById('otzivNext');
    var count = document.getElementById('otzivCount');
    var nav = document.querySelector('.otziv-nav');
    if (!track || !prev || !next) return;
    var cards = track.querySelectorAll('.otziv');
    function step(){
      var c = cards[0];
      return c ? c.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 24) : 320;
    }
    // Число позиций листания = число колонок: на планшете сетка в две строки
    function cols(){
      var seen = {}, n = 0;
      cards.forEach(function(c){ var l = Math.round(c.offsetLeft); if (!seen[l]) { seen[l] = 1; n++; } });
      return n || cards.length;
    }
    function update(){
      var maxScroll = track.scrollWidth - track.clientWidth;
      if (nav) nav.style.display = maxScroll > 6 ? '' : 'none';
      var idx = Math.round(track.scrollLeft / step());
      count.innerHTML = '<b>' + (idx + 1) + '</b> / ' + cols();
      prev.disabled = track.scrollLeft <= 6;
      next.disabled = track.scrollLeft >= maxScroll - 6;
    }
    prev.addEventListener('click', function(){ track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function(){ track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', function(){ window.requestAnimationFrame(update); });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    if (window.ResizeObserver) { new ResizeObserver(update).observe(track); }
    update();
  })();

  // FAQ-аккордеон
  document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click', function(){
      var item = q.parentElement;
      var ans = q.nextElementSibling;
      var willOpen = !item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(openItem){
        openItem.classList.remove('open');
        openItem.querySelector('.faq-a').style.maxHeight = '0';
      });
      if (willOpen){
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });

  // ScaleToFit — масштабирует сцену фикс. ширины под контейнер
  (function(){
    var nodes = document.querySelectorAll('.stf');
    if (!nodes.length) return;
    function fit(outer){
      var inner = outer.querySelector('.stf-inner');
      if (!inner) return;
      if (window.matchMedia('(max-width: 767px)').matches){
        inner.style.transform = '';
        outer.style.height = '';
        return;
      }
      var dw = parseFloat(outer.getAttribute('data-dw')) || 1120;
      outer.__stfW = outer.clientWidth;
      var s = outer.hasAttribute('data-up') ? (outer.clientWidth / dw) : Math.min(1, outer.clientWidth / dw);
      inner.style.transform = 'scale(' + s + ')';
      inner.style.transformOrigin = 'top left';
      outer.style.height = (inner.offsetHeight * s) + 'px';
    }
    function fitAll(){ nodes.forEach(fit); }
    fitAll();
    window.addEventListener('resize', fitAll);
    window.addEventListener('load', fitAll);
    if (window.ResizeObserver){
      nodes.forEach(function(n){ new ResizeObserver(function(){ fit(n); }).observe(n); });
    }
    // Страховка: если resize/RO не сработали (встроенный браузер) — следим за фактической шириной
    setInterval(function(){
      nodes.forEach(function(n){ if (n.clientWidth && n.clientWidth !== n.__stfW) fit(n); });
    }, 250);
  })();

  // Прелоадер установки в финальном CTA: бар + счетчик процентов
  (function(){
    var bar = document.querySelector('.ci-bar i');
    var pct = document.querySelector('.ci-meta b');
    if (!bar || !pct) return;
    var title = document.querySelector('.ci-title');
    var TXT_RUN = 'Кайтен <b class="ci-run">установка на&nbsp;сервер</b>';
    var TXT_DONE = 'Кайтен <b class="ci-ok">установлен на&nbsp;ваш сервер</b>';
    var DUR = 5200, HOLD = 7000, TARGET = 100;
    function ease(t){ return 1 - Math.pow(1 - t, 3); }
    function setTitle(html){ if (title && title.innerHTML !== html) title.innerHTML = html; }
    function reset(){
      bar.style.transition = 'none';
      bar.style.width = '0%';
      pct.textContent = '0%';
      bar.classList.remove('done');
      setTitle(TXT_RUN);
      void bar.offsetWidth;
      bar.style.transition = '';
    }
    var start = null;
    function frame(ts){
      if (start === null) start = ts;
      var t = ts - start;
      if (t <= DUR){
        var p = ease(Math.min(1, t / DUR)) * TARGET;
        bar.style.width = p + '%';
        pct.textContent = Math.round(p) + '%';
        setTitle(TXT_RUN);
        bar.classList.remove('done');
      } else if (t > DUR + HOLD){
        start = null;
        reset();
      } else {
        bar.style.width = '100%';
        pct.textContent = '100%';
        setTitle(TXT_DONE);
        bar.classList.add('done');
      }
      window.requestAnimationFrame(frame);
    }
    reset();
    window.requestAnimationFrame(frame);
  
  // Масштабирование анимированной канбан-доски в шоукейсе под ширину контейнера
  (function(){
    var boxes = document.querySelectorAll('.shw3-kb');
    if (!boxes.length) return;
    function fit(b){ var kb=b.querySelector('.kb'); if(!kb) return;
      var w=b.clientWidth, h=b.clientHeight;
      if (!w) return;                      // еще нет раскладки — ждем
      b.__w=w; b.__h=h;
      kb.style.setProperty('--kbs', w/720);
      // вертикальный масштаб — только когда высота уже известна (картинка загружена)
      if (h > 40) kb.style.setProperty('--kbsy', h/433);
      else kb.style.removeProperty('--kbsy'); }
    function all(){ boxes.forEach(fit); }
    all(); window.addEventListener('resize', all); window.addEventListener('load', all);
    document.querySelectorAll('.shw3 img').forEach(function(im){ im.addEventListener('load', all); });
    if (window.ResizeObserver) boxes.forEach(function(b){ new ResizeObserver(function(){ fit(b); }).observe(b); });
    setInterval(function(){ boxes.forEach(function(b){ if(b.clientWidth && (b.clientWidth!==b.__w || b.clientHeight!==b.__h)) fit(b); }); }, 250);
  })();


  // Масштабирование доски «первый экран ClickUp-лендинга» под ширину контейнера
  (function(){
    var vps = document.querySelectorAll('.cufs-vp');
    if (!vps.length) return;
    function fit(vp){ var mod=vp.querySelector('.mod'); if(!mod) return; vp.__w=vp.clientWidth; var s=vp.clientWidth/1360; mod.style.setProperty('--cs', s); vp.style.height=(mod.offsetHeight*s)+'px'; }
    function all(){ vps.forEach(fit); }
    all(); window.addEventListener('resize', all); window.addEventListener('load', all);
    if (window.ResizeObserver) vps.forEach(function(v){ new ResizeObserver(function(){ fit(v); }).observe(v); });
    setInterval(function(){ vps.forEach(function(v){ if(v.clientWidth && v.clientWidth!==v.__w) fit(v); }); }, 250);
  })();


  // Карусель модулей (планшет/мобилка)
  (function(){
    var track = document.getElementById('modGrid');
    var prev = document.getElementById('modPrev');
    var next = document.getElementById('modNext');
    var count = document.getElementById('modCount');
    var nav = document.querySelector('.mod-nav');
    if (!track || !prev || !next) return;
    var cards = track.querySelectorAll('.flip');
    function step(){
      var c = cards[0];
      return c ? c.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 16) : 296;
    }
    // Число позиций листания = число колонок: на планшете сетка в две строки
    function cols(){
      var seen = {}, n = 0;
      cards.forEach(function(c){ var l = Math.round(c.offsetLeft); if (!seen[l]) { seen[l] = 1; n++; } });
      return n || cards.length;
    }
    function update(){
      var maxScroll = track.scrollWidth - track.clientWidth;
      if (nav) nav.style.display = maxScroll > 6 ? '' : 'none';
      var idx = Math.round(track.scrollLeft / step());
      count.innerHTML = '<b>' + (idx + 1) + '</b> / ' + cols();
      prev.disabled = track.scrollLeft <= 6;
      next.disabled = track.scrollLeft >= maxScroll - 6;
    }
    prev.addEventListener('click', function(){ track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function(){ track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', function(){ window.requestAnimationFrame(update); });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    if (window.ResizeObserver) { new ResizeObserver(update).observe(track); }
    update();
  })();


  // Модули на телефоне: раскрытие карточки по клику (аккордеон)
  (function modAccordion(){
    var grid=document.getElementById('modGrid');
    if(!grid) return;
    var mq=window.matchMedia('(max-width:767px)');
    // на телефоне первый модуль раскрыт по умолчанию
    function initOpen(){
      var first=grid.querySelector('.flip');
      if(!first) return;
      if(mq.matches){ if(!grid.querySelector('.flip.open')) first.classList.add('open'); }
      else { grid.querySelectorAll('.flip.open').forEach(function(o){ o.classList.remove('open'); }); }
    }
    initOpen();
    (mq.addEventListener ? mq.addEventListener('change', initOpen) : mq.addListener(initOpen));

    grid.querySelectorAll('.flip').forEach(function(f){
      f.addEventListener('click', function(e){
        if(!mq.matches) return;
        e.stopPropagation();
        var wasOpen=f.classList.contains('open');
        grid.querySelectorAll('.flip.open').forEach(function(o){ if(o!==f) o.classList.remove('open'); });
        f.classList.toggle('open', !wasOpen);
      }, true);
    });
  })();


  // Дорожная карта внедрения: прогресс по мере скроллинга
  (function rmapProgress(){
    var map = document.querySelector('.rmap');
    if (!map) return;
    var items = [].slice.call(map.querySelectorAll('.rmap__item'));
    if (!items.length) return;
    var ticking = false;
    function upd(){
      ticking = false;
      var r = map.getBoundingClientRect(), vh = window.innerHeight || 800;
      // 0 — блок только вошел снизу; 1 — центр блока достиг середины экрана
      var enter = vh * 0.78, mid = vh * 0.5 - r.height / 2;
      var p = (enter - r.top) / Math.max(1, enter - mid);
      p = Math.max(0, Math.min(1, p));
      map.style.setProperty('--p', p.toFixed(4));
      items.forEach(function(it, i){
        var t = i / items.length * 0.85;   // слева направо, последний включается при p≈0.85
        it.classList.toggle('on', p >= t);
      });
    }
    var line = map.querySelector('.rmap__line');
    function layout(){
      if (!line) return;
      if (window.matchMedia('(max-width: 1023px)').matches){
        var dots = map.querySelectorAll('.rmap__dot');
        if (dots.length < 2) return;
        var base = map.getBoundingClientRect();
        var f = dots[0].getBoundingClientRect(), l = dots[dots.length - 1].getBoundingClientRect();
        line.style.left = ''; line.style.right = '';
        line.style.top = (f.top - base.top + f.height / 2) + 'px';
        line.style.bottom = 'auto';
        line.style.height = (l.top - f.top) + 'px';
      } else {
        line.style.top = ''; line.style.bottom = ''; line.style.height = '';
        var dd = map.querySelectorAll('.rmap__dot');
        if (dd.length > 1){
          var b = map.getBoundingClientRect();
          var a1 = dd[0].getBoundingClientRect(), a2 = dd[dd.length - 1].getBoundingClientRect();
          line.style.left  = (a1.left - b.left + a1.width / 2) + 'px';
          line.style.right = (b.right - a2.right + a2.width / 2) + 'px';
        }
      }
    }
    function onScroll(){ if (!ticking){ ticking = true; window.requestAnimationFrame(upd); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', upd);
    // Страховка: во встроенных браузерах scroll-события могут не доходить
    setInterval(function(){ layout(); upd(); }, 100);
    layout(); upd();
  })();


  // Гантт этапов: построчное появление по мере скроллинга
  (function gntProgress(){
    var gnt = document.querySelector('.gnt');
    if (!gnt) return;
    var rows = [].slice.call(gnt.querySelectorAll('.gnt__row'));
    if (!rows.length) return;
    var ticking = false;
    function upd(){
      ticking = false;
      var r = gnt.getBoundingClientRect(), vh = window.innerHeight || 800;
      var start = vh * 1.7, finish = vh * 0.85;
      var p = (start - r.top) / Math.max(1, (start - finish) + r.height);
      p = Math.max(0, Math.min(1, p));
      rows.forEach(function(row, i){
        row.classList.toggle('on', p >= ((i + 0.3) / rows.length) * 0.9);
      });
    }
    function onScroll(){ if (!ticking){ ticking = true; window.requestAnimationFrame(upd); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', upd);
    setInterval(upd, 120);
    upd();
  })();


  // CTA установки: композиция 520x340 масштабируется целиком, пропорции не меняются
  (function ctaInstallScale(){
    var nodes = document.querySelectorAll('.cta-install');
    if (!nodes.length) return;
    var DW = 520, DH = 340;
    function fit(el){
      var host = el.parentElement;
      if (!host) return;
      var avail = host.clientWidth;
      if (!avail) return;
      var s = Math.min(1, avail / DW);
      el.__s = s;
      el.style.transform = s < 1 ? 'scale(' + s + ')' : '';
      host.style.height = s < 1 ? Math.round(DH * s) + 'px' : '';
      host.__w = avail;
    }
    function all(){ nodes.forEach(fit); }
    all();
    window.addEventListener('resize', all);
    window.addEventListener('load', all);
    if (window.ResizeObserver) nodes.forEach(function(n){ new ResizeObserver(function(){ fit(n); }).observe(n.parentElement); });
    setInterval(function(){ nodes.forEach(function(n){ var h=n.parentElement; if (h && h.clientWidth && h.clientWidth !== h.__w) fit(n); }); }, 200);
  })();


  // RFI-схема на мобилке: масштаб так, чтобы боковые зазоры равнялись нижнему (24)
  (function rfiScale(){
    var el = document.querySelector('.duo .rfi-flow');
    if (!el) return;
    var DW = 464, DH = 196, GAP = 24;
    function fit(){
      var card = el.closest('.duo-card');
      if (!card) return;
      var mq = window.matchMedia('(max-width: 767px)');
      if (!mq.matches){ el.style.removeProperty('--rfi-s'); el.style.removeProperty('--rfi-mb'); return; }
      var inner = card.clientWidth - parseFloat(getComputedStyle(card).paddingLeft) * 2;
      var s = Math.min(1, (inner - GAP * 2 + GAP * 2) / DW);   // ширина карточки уже без паддингов
      s = Math.min(1, inner / DW);
      el.style.setProperty('--rfi-s', s.toFixed(4));
      el.style.setProperty('--rfi-mb', Math.round(DH * s - DH) + 'px');
    }
    fit();
    window.addEventListener('resize', fit);
    window.addEventListener('load', fit);
    setInterval(fit, 300);
  })();

})();
