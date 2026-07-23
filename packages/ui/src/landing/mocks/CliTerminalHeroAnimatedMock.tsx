import { ScaleToFit } from './ScaleToFit';

/**
 * Анимированный сигнатурный визуал первого экрана лендинга «Kaiten CLI».
 * Слева — терминал, где посимвольно печатается мини-сессия из четырёх команд;
 * справа — карточка задачи Kaiten (визуальный язык взят из эталонного
 * WindowCardMock: заголовок, метаданные, тулбар с пиллом «→ В работе», блок
 * «Основные параметры» со строками Расположение/Участники/Метки, теги-пиллы),
 * которая логично меняется под каждую команду. Цикл (CSS @keyframes, 15s):
 *   1. `cards create …`      → из скелетона появляется карточка (#123, Доска / Очередь);
 *   2. `members add … Анна`  → в поле «Участники» появляется Анна Петрова;
 *   3. `tags add … --label "переезд"` → в поле «Метки» появляется тег «переезд»;
 *   4. `cards update --column "В работе"` → «Очередь» → «В работе», подсветка;
 *   финал: `✓ карточка #123 обновлена` и `stats · http_request_count: 4`.
 * Команды соответствуют модулям реестра CLI (cards / members / tags).
 * Стили заскоуплены под .cth, разметка статична (dangerouslySetInnerHTML) —
 * без клиентских хуков. Домен: cli-community-edition.
 */
const CSS = `.cth{ --bg:#121212; --w:#ffffff; --fl:#9e9e9e; --mut:#bdbdbd; --grn:#4caf51; --blu:#2196f3; --vio:#7d4ccf; --tp:#2d2d2d; --ts:#757575; --bd:#e0e0e0; --sec:#f5f5f5; --pur12:#f4e8f7; }
.cth *{ box-sizing:border-box; margin:0; padding:0; }
.cth{ font-family:"Inter",system-ui,"Segoe UI",sans-serif; -webkit-font-smoothing:antialiased; }
.cth .wrap{ position:relative; width:700px; height:400px; }

/* — терминал (внахлёст: слева-сверху, сзади) — */
.cth .term{ position:absolute; top:0; left:0; width:580px; z-index:1; overflow:hidden; border-radius:20px; border:1px solid var(--bd); background:#fff; box-shadow:0 30px 80px -30px rgba(125,76,207,.30); }
.cth .body{ background:var(--bg); padding:16px; font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:12px; line-height:1.75; min-height:250px; }
.cth .line{ display:flex; align-items:center; white-space:nowrap; opacity:0; }
.cth .l1{ animation:cthL1 15s linear infinite; }
.cth .l2{ animation:cthL2 15s linear infinite; }
.cth .l3{ animation:cthL3 15s linear infinite; }
.cth .l4{ animation:cthL4 15s linear infinite; }
.cth .p{ color:var(--grn); margin-right:8px; user-select:none; }
.cth .cmd{ display:inline-block; overflow:hidden; white-space:nowrap; vertical-align:bottom; width:0; }
.cth .c1{ animation:cthT1 15s steps(54,end) infinite; }
.cth .c2{ animation:cthT2 15s steps(54,end) infinite; }
.cth .c3{ animation:cthT3 15s steps(47,end) infinite; }
.cth .c4{ animation:cthT4 15s steps(53,end) infinite; }
.cth .cmd .w{ color:var(--w); } .cth .cmd .fl{ color:var(--fl); } .cth .cmd .num{ color:var(--blu); } .cth .cmd .str{ color:var(--grn); }
.cth .cur{ display:inline-block; width:6px; height:14px; margin-left:1px; background:var(--w); opacity:0; }
.cth .u1{ animation:cthBlink 1s steps(1) infinite, cthU1 15s linear infinite; }
.cth .u2{ animation:cthBlink 1s steps(1) infinite, cthU2 15s linear infinite; }
.cth .u3{ animation:cthBlink 1s steps(1) infinite, cthU3 15s linear infinite; }
.cth .u4{ animation:cthBlink 1s steps(1) infinite, cthU4 15s linear infinite; }
.cth .out{ color:var(--mut); margin-top:8px; opacity:0; display:flex; align-items:center; gap:8px; }
.cth .out .grn{ color:var(--grn); } .cth .out .fl2{ color:var(--fl); }
.cth .out svg{ color:var(--grn); }
.cth .ok{ animation:cthOk 15s ease infinite; }
.cth .stats{ animation:cthStats 15s ease infinite; }

/* — карточка задачи (визуальный язык WindowCardMock) — */
.cth .cardwrap{ position:absolute; right:0; bottom:0; width:300px; z-index:2; min-height:200px; }
.cth .skel{ position:absolute; inset:0; display:flex; flex-direction:column; gap:12px; justify-content:center; padding:18px; border:1px dashed var(--bd); border-radius:16px; background:#fbfbfc; animation:cthSkel 15s ease infinite; }
.cth .skel .bar{ height:10px; border-radius:6px; background:#ededf0; }
.cth .skel .hint{ font-size:12px; color:#b0b0b6; font-family:ui-monospace,monospace; }
.cth .card{ position:relative; border:1px solid var(--bd); border-radius:18px; background:#fff; box-shadow:0 16px 38px -20px rgba(45,45,45,.4); padding:18px; opacity:0; animation:cthCard 15s ease infinite; }
.cth .card .ctitle{ font-size:15px; font-weight:600; line-height:1.35; color:var(--tp); }
.cth .card .meta{ margin-top:8px; font-size:12.5px; color:var(--ts); }
.cth .card .cre{ margin-top:4px; display:flex; align-items:center; gap:5px; font-size:11.5px; color:var(--ts); }
.cth .card .cre svg{ flex:none; }
.cth .lnk{ color:var(--vio); text-decoration:underline; text-underline-offset:2px; }
/* тулбар */
.cth .card .toolbar{ margin-top:13px; display:flex; align-items:center; gap:7px; }
.cth .card .tb{ display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:50%; border:1px solid var(--bd); color:var(--tp); background:#fff; }
.cth .card .tb.primary{ background:var(--vio); border-color:var(--vio); color:#fff; }
.cth .card .tb svg{ display:block; }
.cth .card .tdiv{ width:12px; height:1px; background:var(--bd); }
.cth .card .tbpill{ display:inline-flex; align-items:center; height:30px; padding:0 14px; border-radius:999px; border:1px solid var(--bd); background:#fff; font-size:11.5px; font-weight:500; color:var(--tp); }
/* блок параметров */
.cth .card .sec{ margin-top:16px; display:flex; align-items:center; gap:6px; font-size:13px; font-weight:500; color:var(--tp); }
.cth .card .sec svg{ color:var(--ts); }
.cth .card .rows{ margin-top:12px; }
.cth .card .r{ display:grid; grid-template-columns:92px 1fr; align-items:center; gap:10px; font-size:12.5px; }
.cth .card .r dt{ color:var(--ts); }
.cth .card .r dd{ color:var(--tp); min-width:0; }
.cth .card .colwrap{ position:relative; display:inline-block; }
.cth .card .col-b{ animation:cthColB 15s ease infinite; }
.cth .card .col-w{ position:absolute; left:0; top:0; white-space:nowrap; opacity:0; animation:cthColW 15s ease infinite; }
.cth .card .arow{ height:0; overflow:hidden; opacity:0; animation:cthAssignee 15s ease infinite; }
.cth .card .trow{ height:0; overflow:hidden; opacity:0; animation:cthTags 15s ease infinite; }
.cth .card .arow .r, .cth .card .trow .r{ padding-top:14px; }
.cth .card .apill{ display:inline-flex; align-items:center; gap:7px; background:var(--sec); border-radius:999px; padding:3px 11px 3px 4px; font-size:12px; color:var(--tp); }
.cth .card .adot{ width:18px; height:18px; border-radius:50%; background:var(--vio); color:#fff; font-size:9px; font-weight:700; display:flex; align-items:center; justify-content:center; }
.cth .card .tag{ display:inline-flex; align-items:center; border-radius:999px; padding:3px 12px; font-size:12px; }
.cth .card .tpurple{ background:var(--pur12); color:#7b2e8e; }
.cth .card .ring{ position:absolute; inset:-1px; border-radius:18px; pointer-events:none; box-shadow:0 0 0 0 rgba(125,76,207,0); animation:cthRing 15s ease infinite; }

@keyframes cthBlink{ 0%,50%{background:var(--w)} 51%,100%{background:transparent} }

@keyframes cthL1{ 0%,0.9%{opacity:0} 1%,92%{opacity:1} 93%,100%{opacity:0} }
@keyframes cthL2{ 0%,13.9%{opacity:0} 14%,92%{opacity:1} 93%,100%{opacity:0} }
@keyframes cthL3{ 0%,27.9%{opacity:0} 28%,92%{opacity:1} 93%,100%{opacity:0} }
@keyframes cthL4{ 0%,41.9%{opacity:0} 42%,92%{opacity:1} 93%,100%{opacity:0} }

@keyframes cthT1{ 0%,1%{width:0} 11%{width:54ch} 92%{width:54ch} 93%,100%{width:0} }
@keyframes cthT2{ 0%,15%{width:0} 24%{width:55ch} 92%{width:55ch} 93%,100%{width:0} }
@keyframes cthT3{ 0%,29%{width:0} 38%{width:47ch} 92%{width:47ch} 93%,100%{width:0} }
@keyframes cthT4{ 0%,43%{width:0} 52%{width:53ch} 92%{width:53ch} 93%,100%{width:0} }

@keyframes cthU1{ 0%,0.9%{opacity:0} 1%{opacity:1} 13%{opacity:1} 13.1%,100%{opacity:0} }
@keyframes cthU2{ 0%,14.9%{opacity:0} 15%{opacity:1} 27%{opacity:1} 27.1%,100%{opacity:0} }
@keyframes cthU3{ 0%,28.9%{opacity:0} 29%{opacity:1} 41%{opacity:1} 41.1%,100%{opacity:0} }
@keyframes cthU4{ 0%,42.9%{opacity:0} 43%{opacity:1} 90%{opacity:1} 90.1%,100%{opacity:0} }

@keyframes cthOk{ 0%,54%{opacity:0} 57%{opacity:1} 92%{opacity:1} 93%,100%{opacity:0} }
@keyframes cthStats{ 0%,58%{opacity:0} 61%{opacity:1} 92%{opacity:1} 93%,100%{opacity:0} }

@keyframes cthSkel{ 0%,9%{opacity:1} 12%{opacity:0} 92%{opacity:0} 95%,100%{opacity:1} }
@keyframes cthCard{ 0%,9%{opacity:0; transform:scale(.95) translateY(8px)} 12%{opacity:1; transform:none} 92%{opacity:1; transform:none} 94%,100%{opacity:0; transform:scale(.95) translateY(8px)} }
@keyframes cthColB{ 0%,52%{opacity:1} 55%{opacity:0} 100%{opacity:0} }
@keyframes cthColW{ 0%,52%{opacity:0} 55%{opacity:1} 92%{opacity:1} 94%,100%{opacity:0} }
@keyframes cthAssignee{ 0%,25%{height:0; opacity:0} 27%{height:38px; opacity:0} 30%{height:38px; opacity:1} 92%{height:38px; opacity:1} 94%,100%{height:0; opacity:0} }
@keyframes cthTags{ 0%,39%{height:0; opacity:0} 41%{height:38px; opacity:0} 44%{height:38px; opacity:1} 92%{height:38px; opacity:1} 94%,100%{height:0; opacity:0} }
@keyframes cthRing{ 0%,53%{box-shadow:0 0 0 0 rgba(125,76,207,0)} 56%{box-shadow:0 0 0 4px rgba(125,76,207,.35)} 62%,100%{box-shadow:0 0 0 0 rgba(125,76,207,0)} }`;

const CHK = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
const CLOCK = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
const CHEV = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
const PLUS = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';
const PLAY = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';

const MARKUP = `<div class="wrap" aria-hidden="true">
  <div class="term">
    <div class="body">
      <div class="line l1"><span class="p">$</span><span class="cmd c1"><span class="w">kaiten cards create</span> <span class="fl">--title</span> <span class="str">"Оформить переезд команды"</span></span><span class="cur u1"></span></div>
      <div class="line l2"><span class="p">$</span><span class="cmd c2"><span class="w">kaiten members add</span> <span class="fl">--card-id</span> <span class="num">123</span> <span class="fl">--user</span> <span class="str">"Анна Петрова"</span></span><span class="cur u2"></span></div>
      <div class="line l3"><span class="p">$</span><span class="cmd c3"><span class="w">kaiten tags add</span> <span class="fl">--card-id</span> <span class="num">123</span> <span class="fl">--label</span> <span class="str">"переезд"</span></span><span class="cur u3"></span></div>
      <div class="line l4"><span class="p">$</span><span class="cmd c4"><span class="w">kaiten cards update</span> <span class="fl">--card-id</span> <span class="num">123</span> <span class="fl">--column</span> <span class="str">"В работе"</span></span><span class="cur u4"></span></div>
      <div class="out ok"><span>${CHK}</span><span>карточка <span class="grn">#123</span> обновлена</span></div>
      <div class="out stats">stats <span class="fl2">·</span> http_request_count: <span class="grn">4</span></div>
    </div>
  </div>

  <div class="cardwrap">
    <div class="skel">
      <span class="bar" style="width:70%"></span>
      <span class="bar" style="width:90%"></span>
      <span class="bar" style="width:50%"></span>
      <span class="hint">// ожидание команды…</span>
    </div>
    <div class="card">
      <span class="ring"></span>
      <div class="ctitle">Оформить переезд команды</div>
      <div class="meta"><span class="lnk">#123</span> Заказчик <span class="lnk">Teamlead</span></div>
      <div class="cre">${CLOCK}<span>Создана только что</span></div>
      <div class="toolbar">
        <span class="tb primary">${PLUS}</span>
        <span class="tdiv"></span>
        <span class="tb">${PLAY}</span>
        <span class="tbpill">→ В работе</span>
      </div>
      <div class="sec">${CHEV} Основные параметры</div>
      <dl class="rows">
        <div class="r"><dt>Расположение</dt><dd><span class="lnk">Доска / <span class="colwrap"><span class="col-b">Очередь</span><span class="col-w">В работе</span></span></span></dd></div>
        <div class="arow"><div class="r"><dt>Участники</dt><dd><span class="apill"><span class="adot">АП</span>Анна Петрова</span></dd></div></div>
        <div class="trow"><div class="r"><dt>Метки</dt><dd><span class="tag tpurple">переезд</span></dd></div></div>
      </dl>
    </div>
  </div>
</div>`;

export function CliTerminalHeroAnimatedMock() {
  return (
    <div className="cth" aria-hidden>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <ScaleToFit designWidth={700}>
          <div dangerouslySetInnerHTML={{ __html: MARKUP }} />
        </ScaleToFit>
      </div>
    </div>
  );
}
