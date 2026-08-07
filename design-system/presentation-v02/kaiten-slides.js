/* Навигация по деку: стрелки, пробел, Home/End, клик по слайду, точки.
   Подключается любым файлом, у которого есть .deck и .slide. */
(function () {
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  if (!slides.length) return;

  /* Запасная листалка нужна только там, где скрипт не выполнился.
     Раз мы здесь — убираем ее и строим полноценную. */
  var fallback = document.querySelector('.nav-fallback');
  if (fallback) fallback.remove();

  var nav = document.createElement('nav');
  nav.className = 'nav';
  nav.setAttribute('aria-label', 'Навигация по слайдам');
  nav.innerHTML =
    '<button data-prev aria-label="Предыдущий слайд">←</button>' +
    '<div class="dots"></div>' +
    '<button data-next aria-label="Следующий слайд">→</button>' +
    '<span data-counter class="mono"></span>';
  document.body.appendChild(nav);

  var dotsBox = nav.querySelector('.dots');
  var counter = nav.querySelector('[data-counter]');
  var prevBtn = nav.querySelector('[data-prev]');
  var nextBtn = nav.querySelector('[data-next]');
  var index = 0;

  slides.forEach(function (_, i) {
    var dot = document.createElement('button');
    dot.className = 'dot';
    dot.setAttribute('aria-label', 'Слайд ' + (i + 1));
    dot.addEventListener('click', function () { go(i); });
    dotsBox.appendChild(dot);
  });
  var dots = Array.prototype.slice.call(dotsBox.children);

  function go(next) {
    index = Math.max(0, Math.min(slides.length - 1, next));
    slides.forEach(function (s, i) { s.classList.toggle('is-active', i === index); });
    dots.forEach(function (d, i) { d.setAttribute('aria-current', String(i === index)); });
    counter.textContent = (index + 1) + ' / ' + slides.length;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === slides.length - 1;
    location.hash = 's' + (index + 1);
  }

  prevBtn.addEventListener('click', function () { go(index - 1); });
  nextBtn.addEventListener('click', function () { go(index + 1); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); go(index + 1); }
    if (e.key === 'ArrowLeft'  || e.key === 'PageUp')                    { e.preventDefault(); go(index - 1); }
    if (e.key === 'Home') go(0);
    if (e.key === 'End')  go(slides.length - 1);
  });

  var deck = document.querySelector('.deck');
  deck.addEventListener('click', function (e) {
    var rect = deck.getBoundingClientRect();
    go(e.clientX - rect.left < rect.width / 3 ? index - 1 : index + 1);
  });

  var m = location.hash.match(/^#s(\d+)$/);
  go(m ? parseInt(m[1], 10) - 1 : 0);

  /* Печать: класс is-print включает печатные правила только на время печати.
     Без него @media print не срабатывает — см. комментарий в kaiten-slides.css. */
  window.addEventListener('beforeprint', function () {
    document.documentElement.classList.add('is-print');
  });
  window.addEventListener('afterprint', function () {
    document.documentElement.classList.remove('is-print');
  });

  /* Переключатель стилей — панель сверху, по кнопке на каждый стиль.
     Включается атрибутом на <html>:
       data-themes="light:Light dark:Dark comparison:Сравнение"
     Подпись после двоеточия необязательна — без нее берется само имя. */
  var themes = (document.documentElement.dataset.themes || '').trim().split(/\s+/)
    .filter(Boolean)
    .map(function (t) {
      var p = t.split(':');
      return { name: p[0], label: p[1] || p[0].charAt(0).toUpperCase() + p[0].slice(1) };
    });

  if (themes.length > 1) {
    var bar = document.createElement('div');
    bar.className = 'theme-bar';
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', 'Стиль презентации');

    var buttons = themes.map(function (t) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = t.label;
      b.addEventListener('click', function (e) { e.stopPropagation(); setTheme(t.name); });
      bar.appendChild(b);
      return b;
    });

    function setTheme(name) {
      document.documentElement.dataset.theme = name;
      themes.forEach(function (t, i) {
        var on = t.name === name;
        buttons[i].setAttribute('aria-pressed', String(on));
      });
      try { localStorage.setItem('kaiten-slides-theme', name); } catch (err) {}
    }

    document.body.appendChild(bar);

    var saved;
    try { saved = localStorage.getItem('kaiten-slides-theme'); } catch (err) {}
    var start = themes.some(function (t) { return t.name === saved; })
      ? saved
      : (document.documentElement.dataset.theme || themes[0].name);
    setTheme(start);
  }
})();
