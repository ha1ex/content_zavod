import { ScaleToFit } from './ScaleToFit';

/**
 * Анимированный визуал финального CTA лендинга «Kaiten CLI». Такой же принцип,
 * что и в hero (терминал + живая карточка задачи в стиле WindowCardMock), но
 * компактная стековая раскладка (терминал сверху, карточка снизу) под узкий
 * слот CTA и ДРУГАЯ мини-сессия команд с другими изменениями карточки.
 * Цикл (CSS @keyframes, 15s):
 *   1. `cards create …`      → появляется карточка «Починить flaky-тесты в CI» (#482, Бэклог);
 *   2. `cards update --priority "Высокий"` → в поле «Приоритет» появляется тег «Высокий»;
 *   3. `checklists add … --item "Стабилизировать тест"` → появляется пункт чек-листа;
 *   4. `cards update --column "Готово"` → «Бэклог» → «Готово» (зелёным), подсветка;
 *   финал: `✓ карточка #482 закрыта` и `stats · http_request_count: 4`.
 * Команды соответствуют модулям реестра CLI (cards / checklists). Домен:
 * cli-community-edition. Стили заскоуплены под .ctf, без клиентских хуков.
 */
const CSS = `.ctf{ --bg:#121212; --w:#ffffff; --fl:#9e9e9e; --mut:#bdbdbd; --grn:#4caf51; --blu:#2196f3; --vio:#7d4ccf; --tp:#2d2d2d; --ts:#757575; --bd:#e0e0e0; --sec:#f5f5f5; --red12:#fde8e6; --grn12:#e9f5ea; }
.ctf *{ box-sizing:border-box; margin:0; padding:0; }
.ctf{ font-family:"Inter",system-ui,"Segoe UI",sans-serif; -webkit-font-smoothing:antialiased; }
.ctf .wrap{ position:relative; width:660px; height:360px; }

/* — терминал (внахлёст: справа-сверху, спереди) — */
.ctf .term{ position:absolute; top:0; right:0; width:440px; z-index:2; overflow:hidden; border-radius:16px; border:1px solid var(--bd); background:#fff; box-shadow:0 24px 60px -28px rgba(125,76,207,.30); }
.ctf .body{ background:var(--bg); padding:14px; font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:11.5px; line-height:1.7; }
.ctf .line{ display:flex; align-items:center; white-space:nowrap; opacity:0; }
.ctf .l1{ animation:ctfL1 15s linear infinite; }
.ctf .l2{ animation:ctfL2 15s linear infinite; }
.ctf .l3{ animation:ctfL3 15s linear infinite; }
.ctf .l4{ animation:ctfL4 15s linear infinite; }
.ctf .p{ color:var(--grn); margin-right:7px; user-select:none; }
.ctf .cmd{ display:inline-block; overflow:hidden; white-space:nowrap; vertical-align:bottom; width:0; }
.ctf .c1{ animation:ctfT1 15s steps(55,end) infinite; }
.ctf .c2{ animation:ctfT2 15s steps(53,end) infinite; }
.ctf .c3{ animation:ctfT3 15s steps(59,end) infinite; }
.ctf .c4{ animation:ctfT4 15s steps(51,end) infinite; }
.ctf .cmd .w{ color:var(--w); } .ctf .cmd .fl{ color:var(--fl); } .ctf .cmd .num{ color:var(--blu); } .ctf .cmd .str{ color:var(--grn); }
.ctf .cur{ display:inline-block; width:5px; height:13px; margin-left:1px; background:var(--w); opacity:0; }
.ctf .u1{ animation:ctfBlink 1s steps(1) infinite, ctfU1 15s linear infinite; }
.ctf .u2{ animation:ctfBlink 1s steps(1) infinite, ctfU2 15s linear infinite; }
.ctf .u3{ animation:ctfBlink 1s steps(1) infinite, ctfU3 15s linear infinite; }
.ctf .u4{ animation:ctfBlink 1s steps(1) infinite, ctfU4 15s linear infinite; }
.ctf .out{ color:var(--mut); margin-top:7px; opacity:0; display:flex; align-items:center; gap:7px; }
.ctf .out .grn{ color:var(--grn); } .ctf .out .fl2{ color:var(--fl); }
.ctf .out svg{ color:var(--grn); }
.ctf .ok{ animation:ctfOk 15s ease infinite; }
.ctf .stats{ animation:ctfStats 15s ease infinite; }

/* — карточка задачи (визуальный язык WindowCardMock) — */
.ctf .cardwrap{ position:absolute; top:100px; left:0; width:300px; z-index:1; min-height:150px; }
.ctf .skel{ position:absolute; inset:0; display:flex; flex-direction:column; gap:11px; justify-content:center; padding:16px; border:1px dashed var(--bd); border-radius:16px; background:#fbfbfc; animation:ctfSkel 15s ease infinite; }
.ctf .skel .bar{ height:9px; border-radius:6px; background:#ededf0; }
.ctf .skel .hint{ font-size:11.5px; color:#b0b0b6; font-family:ui-monospace,monospace; }
.ctf .card{ position:relative; border:1px solid var(--bd); border-radius:16px; background:#fff; box-shadow:0 14px 34px -20px rgba(45,45,45,.4); padding:16px; opacity:0; animation:ctfCard 15s ease infinite; }
.ctf .card .ctitle{ font-size:14.5px; font-weight:600; line-height:1.35; color:var(--tp); }
.ctf .card .meta{ margin-top:7px; display:flex; align-items:center; gap:5px; font-size:11.5px; color:var(--ts); }
.ctf .card .meta svg{ flex:none; }
.ctf .lnk{ color:var(--vio); text-decoration:underline; text-underline-offset:2px; }
.ctf .card .toolbar{ margin-top:12px; display:flex; align-items:center; gap:6px; }
.ctf .card .tb{ display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:50%; border:1px solid var(--bd); color:var(--tp); background:#fff; }
.ctf .card .tb.primary{ background:var(--vio); border-color:var(--vio); color:#fff; }
.ctf .card .tb svg{ display:block; }
.ctf .card .tdiv{ width:10px; height:1px; background:var(--bd); }
.ctf .card .tbpill{ display:inline-flex; align-items:center; height:28px; padding:0 13px; border-radius:999px; border:1px solid var(--bd); background:#fff; font-size:11px; font-weight:500; color:var(--tp); }
.ctf .card .tbpill.done{ animation:ctfPill 15s ease infinite; }
.ctf .card .sec{ margin-top:14px; display:flex; align-items:center; gap:6px; font-size:12.5px; font-weight:500; color:var(--tp); }
.ctf .card .sec svg{ color:var(--ts); }
.ctf .card .rows{ margin-top:11px; }
.ctf .card .r{ display:grid; grid-template-columns:88px 1fr; align-items:center; gap:10px; font-size:12px; }
.ctf .card .r dt{ color:var(--ts); }
.ctf .card .r dd{ color:var(--tp); min-width:0; }
.ctf .card .colwrap{ position:relative; display:inline-block; }
.ctf .card .col-b{ animation:ctfColB 15s ease infinite; }
.ctf .card .col-w{ position:absolute; left:0; top:0; white-space:nowrap; opacity:0; color:#2f7a3f; font-weight:600; animation:ctfColW 15s ease infinite; }
.ctf .card .prow{ height:0; overflow:hidden; opacity:0; animation:ctfPrio 15s ease infinite; }
.ctf .card .crow{ height:0; overflow:hidden; opacity:0; animation:ctfCheck 15s ease infinite; }
.ctf .card .prow .r, .ctf .card .crow .r{ padding-top:12px; }
.ctf .card .tag{ display:inline-flex; align-items:center; border-radius:999px; padding:3px 11px; font-size:11.5px; }
.ctf .card .tred{ background:var(--red12); color:#c0392b; }
.ctf .card .cbox{ display:inline-flex; align-items:center; gap:8px; }
.ctf .card .cbox .box{ width:16px; height:16px; border-radius:5px; border:1.5px solid var(--bd); background:#fff; flex:none; }
.ctf .card .ring{ position:absolute; inset:-1px; border-radius:16px; pointer-events:none; box-shadow:0 0 0 0 rgba(76,175,80,0); animation:ctfRing 15s ease infinite; }

@keyframes ctfBlink{ 0%,50%{background:var(--w)} 51%,100%{background:transparent} }

@keyframes ctfL1{ 0%,0.9%{opacity:0} 1%,92%{opacity:1} 93%,100%{opacity:0} }
@keyframes ctfL2{ 0%,13.9%{opacity:0} 14%,92%{opacity:1} 93%,100%{opacity:0} }
@keyframes ctfL3{ 0%,27.9%{opacity:0} 28%,92%{opacity:1} 93%,100%{opacity:0} }
@keyframes ctfL4{ 0%,41.9%{opacity:0} 42%,92%{opacity:1} 93%,100%{opacity:0} }

@keyframes ctfT1{ 0%,1%{width:0} 11%{width:55ch} 92%{width:55ch} 93%,100%{width:0} }
@keyframes ctfT2{ 0%,15%{width:0} 24%{width:53ch} 92%{width:53ch} 93%,100%{width:0} }
@keyframes ctfT3{ 0%,29%{width:0} 38%{width:59ch} 92%{width:59ch} 93%,100%{width:0} }
@keyframes ctfT4{ 0%,43%{width:0} 52%{width:51ch} 92%{width:51ch} 93%,100%{width:0} }

@keyframes ctfU1{ 0%,0.9%{opacity:0} 1%{opacity:1} 13%{opacity:1} 13.1%,100%{opacity:0} }
@keyframes ctfU2{ 0%,14.9%{opacity:0} 15%{opacity:1} 27%{opacity:1} 27.1%,100%{opacity:0} }
@keyframes ctfU3{ 0%,28.9%{opacity:0} 29%{opacity:1} 41%{opacity:1} 41.1%,100%{opacity:0} }
@keyframes ctfU4{ 0%,42.9%{opacity:0} 43%{opacity:1} 90%{opacity:1} 90.1%,100%{opacity:0} }

@keyframes ctfOk{ 0%,54%{opacity:0} 57%{opacity:1} 92%{opacity:1} 93%,100%{opacity:0} }
@keyframes ctfStats{ 0%,58%{opacity:0} 61%{opacity:1} 92%{opacity:1} 93%,100%{opacity:0} }

@keyframes ctfSkel{ 0%,9%{opacity:1} 12%{opacity:0} 92%{opacity:0} 95%,100%{opacity:1} }
@keyframes ctfCard{ 0%,9%{opacity:0; transform:scale(.96) translateY(6px)} 12%{opacity:1; transform:none} 92%{opacity:1; transform:none} 94%,100%{opacity:0; transform:scale(.96) translateY(6px)} }
@keyframes ctfColB{ 0%,52%{opacity:1} 55%{opacity:0} 100%{opacity:0} }
@keyframes ctfColW{ 0%,52%{opacity:0} 55%{opacity:1} 92%{opacity:1} 94%,100%{opacity:0} }
@keyframes ctfPrio{ 0%,25%{height:0; opacity:0} 27%{height:34px; opacity:0} 30%{height:34px; opacity:1} 92%{height:34px; opacity:1} 94%,100%{height:0; opacity:0} }
@keyframes ctfCheck{ 0%,39%{height:0; opacity:0} 41%{height:34px; opacity:0} 44%{height:34px; opacity:1} 92%{height:34px; opacity:1} 94%,100%{height:0; opacity:0} }
@keyframes ctfPill{ 0%,54%{background:#fff; border-color:var(--bd); color:var(--tp)} 57%{background:var(--grn12); border-color:#bfe3c4; color:#2f7a3f} 92%{background:var(--grn12); border-color:#bfe3c4; color:#2f7a3f} 94%,100%{background:#fff; border-color:var(--bd); color:var(--tp)} }
@keyframes ctfRing{ 0%,53%{box-shadow:0 0 0 0 rgba(76,175,80,0)} 56%{box-shadow:0 0 0 4px rgba(76,175,80,.35)} 62%,100%{box-shadow:0 0 0 0 rgba(76,175,80,0)} }`;

const CHK = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
const CLOCK = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
const CHEV = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
const PLUS = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';
const PLAY = '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';

const MARKUP = `<div class="wrap" aria-hidden="true">
  <div class="term">
    <div class="body">
      <div class="line l1"><span class="p">$</span><span class="cmd c1"><span class="w">kaiten cards create</span> <span class="fl">--title</span> <span class="str">"Починить flaky-тесты в CI"</span></span><span class="cur u1"></span></div>
      <div class="line l2"><span class="p">$</span><span class="cmd c2"><span class="w">kaiten cards update</span> <span class="fl">--card-id</span> <span class="num">482</span> <span class="fl">--priority</span> <span class="str">"Высокий"</span></span><span class="cur u2"></span></div>
      <div class="line l3"><span class="p">$</span><span class="cmd c3"><span class="w">kaiten checklists add</span> <span class="fl">--card-id</span> <span class="num">482</span> <span class="fl">--item</span> <span class="str">"Стабилизировать тест"</span></span><span class="cur u3"></span></div>
      <div class="line l4"><span class="p">$</span><span class="cmd c4"><span class="w">kaiten cards update</span> <span class="fl">--card-id</span> <span class="num">482</span> <span class="fl">--column</span> <span class="str">"Готово"</span></span><span class="cur u4"></span></div>
      <div class="out ok"><span>${CHK}</span><span>карточка <span class="grn">#482</span> закрыта</span></div>
      <div class="out stats">stats <span class="fl2">·</span> http_request_count: <span class="grn">4</span></div>
    </div>
  </div>

  <div class="cardwrap">
    <div class="skel">
      <span class="bar" style="width:72%"></span>
      <span class="bar" style="width:92%"></span>
      <span class="bar" style="width:48%"></span>
      <span class="hint">// ожидание команды…</span>
    </div>
    <div class="card">
      <span class="ring"></span>
      <div class="ctitle">Починить flaky-тесты в CI</div>
      <div class="meta"><span class="lnk">#482</span><span>·</span>${CLOCK}<span>Создана только что</span></div>
      <div class="toolbar">
        <span class="tb primary">${PLUS}</span>
        <span class="tdiv"></span>
        <span class="tb">${PLAY}</span>
        <span class="tbpill done">→ Готово</span>
      </div>
      <div class="sec">${CHEV} Основные параметры</div>
      <dl class="rows">
        <div class="r"><dt>Расположение</dt><dd><span class="lnk">Разработка / <span class="colwrap"><span class="col-b">Бэклог</span><span class="col-w">Готово</span></span></span></dd></div>
        <div class="prow"><div class="r"><dt>Приоритет</dt><dd><span class="tag tred">Высокий</span></dd></div></div>
        <div class="crow"><div class="r"><dt>Чек-лист</dt><dd><span class="cbox"><span class="box"></span>Стабилизировать тест</span></dd></div></div>
      </dl>
    </div>
  </div>
</div>`;

export function CliTerminalFinalAnimatedMock() {
  return (
    <div className="ctf" aria-hidden>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <ScaleToFit designWidth={660}>
        <div dangerouslySetInnerHTML={{ __html: MARKUP }} />
      </ScaleToFit>
    </div>
  );
}
