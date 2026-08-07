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

  // Карусель фич (Features)
  (function(){
    var track = document.getElementById('scrumGrid');
    var prev = document.getElementById('featPrev');
    var next = document.getElementById('featNext');
    var count = document.getElementById('featCount');
    var nav = document.getElementById('featNav');
    if (!track || !prev || !next) return;
    var cards = track.querySelectorAll('.scard-f');
    function step(){ var c = cards[0]; return c ? c.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 24) : 320; }
    function update(){
      var maxScroll = track.scrollWidth - track.clientWidth;
      if (nav) nav.style.display = maxScroll > 6 ? 'flex' : 'none';
      var idx = Math.round(track.scrollLeft / step());
      count.innerHTML = '<b>' + (idx + 1) + '</b> / ' + cards.length;
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

  // Карусель кейсов (Reviews)
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
    function update(){
      var maxScroll = track.scrollWidth - track.clientWidth;
      var hasNav = maxScroll > 6;
      if (nav) nav.style.display = hasNav ? '' : 'none';
      // Класс на секции нужен CSS: со стрелками нижний отступ равен отступу над стрелками,
      // без стрелок — равен верхнему отступу секции.
      var sec = track.closest('section');
      if (sec) sec.classList.toggle('has-nav', hasNav);
      var idx = Math.round(track.scrollLeft / step());
      count.innerHTML = '<b>' + (idx + 1) + '</b> / ' + cards.length;
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
  (function(){document.querySelectorAll(".acc .acc-head").forEach(function(h){h.addEventListener("click",function(){var it=h.parentElement,op=it.classList.contains("open");it.parentElement.querySelectorAll(".acc-item.open").forEach(function(o){o.classList.remove("open")});if(!op)it.classList.add("open")})})})();
  (function(){document.querySelectorAll('.acc-wrap').forEach(function(w){var a=w.querySelector('.acc');if(!a)return;var items=a.querySelectorAll('.acc-item');var panels=w.querySelectorAll('.acc-media .acc-panel');if(!panels.length)return;a.querySelectorAll('.acc-head').forEach(function(h){h.addEventListener('click',function(){var idx=0;items.forEach(function(it,i){if(it.classList.contains('open'))idx=i});panels.forEach(function(pn,i){pn.classList.toggle('on',i===idx)})})})})})();

  // Таблица сравнения — раскрытие/сворачивание разделов
  (function(){
    var table = document.getElementById('cmpTable');
    if (!table) return;
    table.querySelectorAll('.cmp__sec').forEach(function(sec){
      sec.addEventListener('click', function(){
        var open = sec.getAttribute('aria-expanded') === 'true';
        sec.setAttribute('aria-expanded', open ? 'false' : 'true');
        var g = sec.getAttribute('data-sec');
        table.querySelectorAll('.cmp__cell[data-g="' + g + '"]').forEach(function(cell){
          cell.classList.toggle('cmp__cell--hidden', open);
        });
      });
    });
  })();

  // Таблица сравнения — стартовое состояние: на десктопе и планшете раскрыты все
  // разделы, на мобиле только первый (иначе таблица уезжает на несколько экранов).
  // Пересчитывается при смене брейкпоинта, ручные клики внутри брейкпоинта не трогаем.
  (function(){
    var table = document.getElementById('cmpTable');
    if (!table) return;
    var mq = window.matchMedia('(min-width:768px)');
    function apply(){
      var wide = mq.matches;
      table.querySelectorAll('.cmp__sec').forEach(function(sec, i){
        var open = wide || i === 0;
        sec.setAttribute('aria-expanded', open ? 'true' : 'false');
        var g = sec.getAttribute('data-sec');
        table.querySelectorAll('.cmp__cell[data-g="' + g + '"]').forEach(function(cell){
          cell.classList.toggle('cmp__cell--hidden', !open);
        });
      });
    }
    apply();
    if (mq.addEventListener) mq.addEventListener('change', apply);
    else if (mq.addListener) mq.addListener(apply);
  })();

  // ScaleToFit — масштабирует доску фикс. ширины под контейнер (HeroScreenInterface)
  (function(){
    var nodes = document.querySelectorAll('.stf');
    if (!nodes.length) return;
    function fit(outer){
      var inner = outer.querySelector('.stf-inner');
      if (!inner) return;
      var dw = parseFloat(outer.getAttribute('data-dw')) || 1360;
      outer.__stfW = outer.clientWidth;
      var s = Math.min(1, outer.clientWidth / dw);
      inner.style.transform = 'scale(' + s + ')';
      outer.style.height = (inner.offsetHeight * s) + 'px';
    }
    function fitAll(){ nodes.forEach(fit); }
    fitAll();
    window.addEventListener('resize', fitAll);
    window.addEventListener('load', fitAll);
    if (window.ResizeObserver){
      nodes.forEach(function(n){ new ResizeObserver(function(){ fit(n); }).observe(n); });
    }
    // Страховка: если resize/RO не сработали (эмуляция вьюпорта, iframe) — следим за фактической шириной
    setInterval(function(){
      nodes.forEach(function(n){ if (n.clientWidth && n.clientWidth !== n.__stfW) fit(n); });
    }, 250);
  })();

  // На мобиле заголовок занимает всю ширину шапки — фоновые колонки начинаются под ним
  (function(){
    var table = document.getElementById('cmpTable');
    if (!table) return;
    var head = table.querySelector('.cmp__hcell--label');
    function upd(){
      table.style.setProperty('--cmp-bg-top', (window.innerWidth < 768 ? head.offsetHeight : 0) + 'px');
    }
    upd();
    window.addEventListener('resize', upd);
    setInterval(upd, 400);
  })();

  // TabsGallery (команды): вкладки + стрелки-счетчик
  (function(){
    var root=document.getElementById('teamTabs'); if(!root) return;
    var tabs=[].slice.call(root.querySelectorAll('.stabs__tab'));
    var panels=[].slice.call(root.querySelectorAll('.stp'));
    var cur=root.querySelector('.stabs__cur');
    var prev=root.querySelector('[data-nav="prev"]');
    var next=root.querySelector('[data-nav="next"]');
    var n=panels.length, i=0;
    function show(k){
      var prev_i=i;
      i=((k%n)+n)%n;
      tabs.forEach(function(t,j){t.classList.toggle('on',j===i);t.setAttribute('aria-selected',j===i?'true':'false');});
      if(prev_i!==i){
        var op=panels[prev_i];
        op.classList.add('leaving');
        clearTimeout(op._lt);
        op._lt=setTimeout(function(){op.classList.remove('leaving');},450);
      }
      panels.forEach(function(p,j){p.classList.toggle('on',j===i);if(j!==prev_i)p.classList.remove('leaving');});
      if(cur) cur.textContent=String(i+1);
    }
    tabs.forEach(function(t,j){t.addEventListener('click',function(){show(j);});});
    if(prev) prev.addEventListener('click',function(){show(i-1);});
    if(next) next.addEventListener('click',function(){show(i+1);});
    show(0);
  })();

  // Аккордеон: переключение по наведению (только устройства с курсором)
  (function(){
    if (!window.matchMedia('(hover:hover)').matches) return;
    document.querySelectorAll('.acc-wrap').forEach(function(w){
      var a = w.querySelector('.acc'); if (!a) return;
      var items = [].slice.call(a.querySelectorAll('.acc-item'));
      var panels = w.querySelectorAll('.acc-media .acc-panel');
      items.forEach(function(it, i){
        it.addEventListener('mouseenter', function(){
          if (it.classList.contains('open')) return;
          items.forEach(function(o){ o.classList.remove('open'); });
          it.classList.add('open');
          panels.forEach(function(pn, j){ pn.classList.toggle('on', j === i); });
        });
      });
    });
  })();
