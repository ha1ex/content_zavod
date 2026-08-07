'use client';

/**
 * IllustrationCTA — три анимированных мокапа лендинга «Кайтен on-premise»
 * в одном файле. Каждый самодостаточен: стили лежат рядом с разметкой,
 * контент задаётся пропсами, токены DS зашиты литералами.
 *
 * - RfiEnvelopeMock   — конверт с письмом-списком требований (RFI): письмо
 *   выезжает из конверта, пункты по очереди отмечаются галками (цикл 17,5 с).
 * - SupportChatMock   — окно линии поддержки: сообщения всплывают снизу, между
 *   ними индикатор набора; по наведению анимация встаёт на паузу (цикл 20 с).
 * - ServerInstallMock — установка на сервер: прогресс-бар с процентами,
 *   заголовок «установка → установлен», серверные юниты с бегущими диодами.
 *
 * - IllustrationCTA   — композиция финального CTA: карточка установки плюс
 *   коробка продукта справа на градиентной подложке.
 *
 * Все они уважают prefers-reduced-motion: анимации выключаются, содержимое
 * показывается в конечном состоянии.
 */
import React, { useEffect, useRef } from 'react';

/* ------------------------------------------------------------------ конверт */

export type RfiEnvelopeMockProps = {
  /** Заголовок письма */
  title?: string;
  /** Бейдж рядом с заголовком */
  tag?: string;
  /** Длины строк-пунктов в процентах: сколько чисел — столько пунктов (макс. 5) */
  rows?: number[];
};

const cssRfi = `.opm-rfi .env{position:relative;width:250px;height:280px;overflow:hidden;border-radius:22px;filter:drop-shadow(0 16px 30px -22px rgba(45,45,45,.45))}
.opm-rfi .env__flap{position:absolute;top:0;left:0;width:100%;height:104px;z-index:0}
.opm-rfi .env__back{position:absolute;left:0;right:0;bottom:0;height:176px;background:#e9e9e9;border-radius:0 0 22px 22px;z-index:0}
.opm-rfi .env__letter{position:absolute;left:8%;right:8%;top:118px;
  background:#fff;border-radius:8px 8px 0 0;padding:11px 13px 64px;display:flex;flex-direction:column;gap:6px;z-index:1;
  box-shadow:0 -2px 10px -6px rgba(45,45,45,.18);
  animation:envRise 17.5s cubic-bezier(.3,0,.2,1) infinite}
.opm-rfi .env__front{position:absolute;left:0;right:0;bottom:0;width:100%;height:176px;z-index:2;pointer-events:none}
.opm-rfi .env__letter .rf-t{font-size:12px;font-weight:600;color:#2d2d2d;display:flex;align-items:center;gap:8px;margin-bottom:2px}
.opm-rfi .rf-tag{background:#efe9f9;color:#7d4ccf;font-size:10px;line-height:1;font-weight:600;padding:4px 8px;border-radius:9999px;flex:none}
.opm-rfi .env-row{display:flex;align-items:center;gap:7px}
.opm-rfi .env-box{position:relative;width:16px;height:16px;border-radius:5px;flex:none;display:inline-flex;align-items:center;justify-content:center;background:#efe9f9}
.opm-rfi .env-num{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:600;font-style:normal;color:#7d4ccf;line-height:1}
.opm-rfi .env-tick{width:9px;height:9px;color:#fff;opacity:0}
.opm-rfi .env-ln{flex:1;height:5px;border-radius:3px;background:#eee}
.opm-rfi .env-row:nth-of-type(1) .env-box{animation:envBox1 17.5s ease infinite}
.opm-rfi .env-row:nth-of-type(1) .env-num{animation:envNum1 17.5s ease infinite}
.opm-rfi .env-row:nth-of-type(1) .env-tick{animation:envTick1 17.5s ease infinite}
.opm-rfi .env-row:nth-of-type(2) .env-box{animation:envBox2 17.5s ease infinite}
.opm-rfi .env-row:nth-of-type(2) .env-num{animation:envNum2 17.5s ease infinite}
.opm-rfi .env-row:nth-of-type(2) .env-tick{animation:envTick2 17.5s ease infinite}
.opm-rfi .env-row:nth-of-type(3) .env-box{animation:envBox3 17.5s ease infinite}
.opm-rfi .env-row:nth-of-type(3) .env-num{animation:envNum3 17.5s ease infinite}
.opm-rfi .env-row:nth-of-type(3) .env-tick{animation:envTick3 17.5s ease infinite}
.opm-rfi .env-row:nth-of-type(4) .env-box{animation:envBox4 17.5s ease infinite}
.opm-rfi .env-row:nth-of-type(4) .env-num{animation:envNum4 17.5s ease infinite}
.opm-rfi .env-row:nth-of-type(4) .env-tick{animation:envTick4 17.5s ease infinite}
.opm-rfi .env-row:nth-of-type(5) .env-box{animation:envBox5 17.5s ease infinite}
.opm-rfi .env-row:nth-of-type(5) .env-num{animation:envNum5 17.5s ease infinite}
.opm-rfi .env-row:nth-of-type(5) .env-tick{animation:envTick5 17.5s ease infinite}
@keyframes envBox1{0%,26%{background:#efe9f9}30%,86%{background:#7d4ccf}90%,100%{background:#efe9f9}}
@keyframes envNum1{0%,26%{opacity:1}29%,86%{opacity:0}90%,100%{opacity:1}}
@keyframes envTick1{0%,27%{opacity:0;transform:scale(.4)}30%,86%{opacity:1;transform:scale(1)}89%,100%{opacity:0;transform:scale(.4)}}
@keyframes envBox2{0%,30%{background:#efe9f9}34%,86%{background:#7d4ccf}90%,100%{background:#efe9f9}}
@keyframes envNum2{0%,30%{opacity:1}33%,86%{opacity:0}90%,100%{opacity:1}}
@keyframes envTick2{0%,31%{opacity:0;transform:scale(.4)}34%,86%{opacity:1;transform:scale(1)}89%,100%{opacity:0;transform:scale(.4)}}
@keyframes envBox3{0%,34%{background:#efe9f9}38%,86%{background:#7d4ccf}90%,100%{background:#efe9f9}}
@keyframes envNum3{0%,34%{opacity:1}37%,86%{opacity:0}90%,100%{opacity:1}}
@keyframes envTick3{0%,35%{opacity:0;transform:scale(.4)}38%,86%{opacity:1;transform:scale(1)}89%,100%{opacity:0;transform:scale(.4)}}
@keyframes envBox4{0%,38%{background:#efe9f9}42%,86%{background:#7d4ccf}90%,100%{background:#efe9f9}}
@keyframes envNum4{0%,38%{opacity:1}41%,86%{opacity:0}90%,100%{opacity:1}}
@keyframes envTick4{0%,39%{opacity:0;transform:scale(.4)}42%,86%{opacity:1;transform:scale(1)}89%,100%{opacity:0;transform:scale(.4)}}
@keyframes envBox5{0%,42%{background:#efe9f9}46%,86%{background:#7d4ccf}90%,100%{background:#efe9f9}}
@keyframes envNum5{0%,42%{opacity:1}45%,86%{opacity:0}90%,100%{opacity:1}}
@keyframes envTick5{0%,43%{opacity:0;transform:scale(.4)}46%,86%{opacity:1;transform:scale(1)}89%,100%{opacity:0;transform:scale(.4)}}
@media (prefers-reduced-motion:reduce){.opm-rfi .env__letter{animation:none;transform:none}.opm-rfi .env-box{background:#7d4ccf}.opm-rfi .env-num{opacity:0}.opm-rfi .env-tick{opacity:1;transform:none}}
@media (max-width:1023px){.opm-rfi .env{width:224px;height:227px}}
@keyframes envRise{0%,8%{transform:translateY(0)}25%,86%{transform:translateY(-105px)}96%,100%{transform:translateY(0)}}
@media (max-width:1023px){.opm-rfi .env{width:224px;height:251px}.opm-rfi .env__flap{height:93px}.opm-rfi .env__back,.opm-rfi .env__front{height:158px}.opm-rfi .env__letter{top:106px}}
.opm-rfi .env__at{position:absolute;left:50%;top:70%;bottom:auto;transform:translate(-50%,-50%);z-index:4;
  width:56px;height:56px;border-radius:50%;background:#EFE9F9;
  display:flex;align-items:center;justify-content:center;
  font-size:32px;line-height:0;font-weight:600;color:#7d4ccf;padding-bottom:2px;
  box-shadow:inset 0 1px 3px rgba(0,0,0,.1)}
@media (max-width:1023px){.opm-rfi .env__at{width:48px;height:48px;font-size:27px}}
.opm-rfi .env__letter .rf-t,.opm-rfi .env__letter .env-row{animation:envContent 17.5s ease infinite}
@keyframes envContent{0%,14%{opacity:0}24%,88%{opacity:1}93%,100%{opacity:0}}
@media (prefers-reduced-motion:reduce){.opm-rfi .env__letter .rf-t,.opm-rfi .env__letter .env-row{animation:none;opacity:1}}`;

const Tick = () => (
  <svg
    className="env-tick"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export function RfiEnvelopeMock({
  title = 'Список требований:',
  tag = 'RFI',
  rows = [86, 70, 78, 62, 74],
}: RfiEnvelopeMockProps) {
  return (
    <div className="opm-rfi" aria-hidden>
      <style dangerouslySetInnerHTML={{ __html: cssRfi }} />
      <div className="env">
        <svg className="env__flap" viewBox="0 0 250 104" preserveAspectRatio="none" aria-hidden>
          <path d="M0 104 L113 17 Q125 6 137 17 L250 104 Z" fill="#ededed" />
          <path
            d="M0 104 L113 17 Q125 6 137 17 L250 104"
            fill="none"
            stroke="#e3e3e3"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
        <span className="env__back" />
        <span className="env__at" aria-hidden>
          @
        </span>
        <div className="env__letter">
          <div className="rf-t">
            {title} <span className="rf-tag">{tag}</span>
          </div>
          {rows.slice(0, 5).map((w, i) => (
            <span className="env-row" key={i}>
              <b className="env-box">
                <i className="env-num">{i + 1}</i>
                <Tick />
              </b>
              <i className="env-ln" style={{ width: `${w}%` }} />
            </span>
          ))}
        </div>
        <svg className="env__front" viewBox="0 0 250 176" preserveAspectRatio="none" aria-hidden>
          <path d="M0 36 L125 101 L0 176 Z" fill="#f5f5f5" />
          <path d="M250 36 L125 101 L250 176 Z" fill="#f5f5f5" />
          <path d="M0 176 L125 101 L250 176 Z" fill="#f2f2f2" />
          <path d="M0 36 L125 101 L250 36" fill="none" stroke="#e4e4e4" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M0 176 L125 101 L250 176" fill="none" stroke="#e9e9e9" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- чат линии поддержки */

export type SupportChatMessage = {
  /** 'me' — реплика пользователя справа, 'op' — ответ оператора слева */
  from: 'me' | 'op';
  text: React.ReactNode;
};

export type SupportChatMockProps = {
  /** Имя в шапке окна */
  operatorName?: string;
  /** Подпись под именем */
  operatorStatus?: string;
  /** Аватар оператора */
  avatar?: { src: string; alt?: string };
  /** До 4 сообщений — появляются по очереди, затем цикл повторяется */
  messages?: SupportChatMessage[];
  /** Плейсхолдер поля ввода */
  placeholder?: string;
};

const cssChat = `@media (max-width:1279px){.opm-chat .sup2__win{border-radius:12px}}
.opm-chat .sup2__win{background:#fff;border-radius:12px;padding:20px;box-shadow:0 0 14px 0 rgba(125,76,207,.2)}
.opm-chat .sup2__bar{display:flex;align-items:center;gap:12px;padding-bottom:16px;border-bottom:1px solid #f5f5f5}
.opm-chat .sup2__op{position:relative;display:inline-flex;width:40px;height:40px;flex:none}
.opm-chat .sup2__op img{width:100%;height:100%;object-fit:cover;display:block;border-radius:50%}
.opm-chat .sup2__on{position:absolute;right:0;bottom:0;width:11px;height:11px;border-radius:50%;background:#4caf51;border:2px solid #fff}
.opm-chat .sup2__meta b{display:block;font-size:16px;line-height:1.3}
.opm-chat .sup2__meta span{font-size:14px;color:#757575}
.opm-chat .sup2__input{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #e0e0e0;border-radius:10px;padding:4px 4px 4px 16px;margin-top:8px}
.opm-chat .sup2__ph{flex:1;font-size:14px;color:#bdbdbd}
.opm-chat .sup2__send{display:inline-flex;width:30px;height:30px;border-radius:8px;background:#f5f5f5;color:#757575;align-items:center;justify-content:center;flex:none}
.opm-chat .sup2__send svg{width:18px;height:18px}
@media (max-width:1023px){.opm-chat .sup2__win{max-width:500px;margin-inline:auto}}
.opm-chat .sc-view{height:210px;overflow:hidden}
.opm-chat .sc-feed{display:flex;flex-direction:column;justify-content:flex-end;min-height:100%}
.opm-chat .sc-row{display:flex;align-items:flex-start;gap:8px;overflow:hidden;opacity:0;max-height:0;padding-bottom:9px;transform:translateY(9px)}
.opm-chat .sc-row--out{justify-content:flex-end}
.opm-chat .sc-av{display:inline-flex;width:26px;height:26px;border-radius:50%;align-items:center;justify-content:center;flex:none}
.opm-chat .sc-av svg{width:15px;height:15px}
.opm-chat .sc-av--op{overflow:hidden}
.opm-chat .sc-av--op img{width:100%;height:100%;object-fit:cover;display:block}
.opm-chat .sc-av--me{background:linear-gradient(150deg,#9b6ee6,#7d4ccf 55%,#6a3bb8);color:#fff;
  box-shadow:0 0 0 2px #fff,0 2px 6px -2px rgba(125,76,207,.55)}
.opm-chat .sc-av--me svg{width:13px;height:13px;opacity:.95}
.opm-chat .sc-av--op{box-shadow:0 0 0 2px #fff,0 2px 6px -3px rgba(45,45,45,.3)}
.opm-chat .sc-bub{max-width:74%;font-size:12.5px;line-height:1.35;padding:8px 11px;border-radius:12px}
.opm-chat .sc-bub--in{background:#f5f5f5;color:#2d2d2d}
.opm-chat .sc-bub--out{background:#efe9f9;color:#2d2d2d}
.opm-chat .sc-bub.sc-bub--in{border-top-left-radius:0}
.opm-chat .sc-bub.sc-bub--out{border-top-right-radius:0}
.opm-chat .sc-typing{display:inline-flex;align-items:center;gap:4px;height:30px;padding:0 12px;border-radius:12px;background:#f5f5f5;border-bottom-left-radius:4px}
.opm-chat .sc-typing i{width:5px;height:5px;border-radius:50%;background:#757575;animation:scDot 1.2s ease-in-out infinite}
.opm-chat .sc-typing i:nth-child(2){animation-delay:.15s}
.opm-chat .sc-typing i:nth-child(3){animation-delay:.3s}
@keyframes scDot{0%,60%,100%{opacity:.35}30%{opacity:1}}
.opm-chat .sc-feed .m1{animation:scM1 20s ease infinite}
.opm-chat .sc-feed .ty{animation:scTy 20s ease infinite}
.opm-chat .sc-feed .m2{animation:scM2 20s ease infinite}
.opm-chat .sc-feed .m3{animation:scM3 20s ease infinite}
.opm-chat .sc-feed .m4{animation:scM4 20s ease infinite}
.opm-chat .sup2__win:hover .sc-feed .sc-row{animation-play-state:paused}
@keyframes scM1{0%,3%{opacity:0;max-height:0;transform:translateY(9px)}6%,93%{opacity:1;max-height:90px;transform:none}97%{opacity:0;max-height:90px;transform:none}99%,100%{opacity:0;max-height:0;transform:translateY(9px)}}
@keyframes scTy{0%,11%{opacity:0;max-height:0;transform:translateY(9px)}14%,21%{opacity:1;max-height:44px;transform:none}24%,100%{opacity:0;max-height:0;transform:translateY(9px)}}
@keyframes scM2{0%,22%{opacity:0;max-height:0;transform:translateY(9px)}26%,93%{opacity:1;max-height:90px;transform:none}97%{opacity:0;max-height:90px;transform:none}99%,100%{opacity:0;max-height:0;transform:translateY(9px)}}
@keyframes scM3{0%,32%{opacity:0;max-height:0;transform:translateY(9px)}36%,93%{opacity:1;max-height:90px;transform:none}97%{opacity:0;max-height:90px;transform:none}99%,100%{opacity:0;max-height:0;transform:translateY(9px)}}
@keyframes scM4{0%,42%{opacity:0;max-height:0;transform:translateY(9px)}46%,93%{opacity:1;max-height:100px;transform:none}97%{opacity:0;max-height:100px;transform:none}99%,100%{opacity:0;max-height:0;transform:translateY(9px)}}
@media (prefers-reduced-motion:reduce){.opm-chat .sc-feed .sc-row{animation:none;opacity:1;max-height:100px;transform:none}.opm-chat .sc-feed .ty{display:none}}
@media (max-width:767px){.opm-chat .sup2__win{padding:16px}.opm-chat .sup2__op{width:34px;height:34px}.opm-chat .sup2__on{width:9px;height:9px}.opm-chat .sup2__bar{gap:8px;padding-bottom:12px}.opm-chat .sup2__meta b{font-size:14px}.opm-chat .sup2__meta span{font-size:12px}.opm-chat .sc-view{height:224px}.opm-chat .sc-row{gap:6px;padding-bottom:7px;align-items:flex-start}.opm-chat .sc-av{width:22px;height:22px}.opm-chat .sc-av svg{width:13px;height:13px}.opm-chat .sc-bub{max-width:74%;font-size:11.5px;line-height:1.32;padding:6px 9px;border-radius:10px;max-width:78%}.opm-chat .sc-typing{height:26px;padding:0 10px}.opm-chat .sup2__input{padding:3px 3px 3px 12px;border-radius:9px}.opm-chat .sup2__ph{font-size:12px}.opm-chat .sup2__send{width:27px;height:27px;border-radius:7px}.opm-chat .sup2__send svg{width:15px;height:15px}}`;

const MeAvatar = () => (
  <span className="sc-av sc-av--me">
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0z" />
    </svg>
  </span>
);

export function SupportChatMock({
  operatorName = 'Линия поддержки',
  operatorStatus = 'Оператор на связи',
  avatar,
  messages = [],
  placeholder = 'Напишите сообщение',
}: SupportChatMockProps) {
  const list = messages.slice(0, 4);
  const opAvatar = (
    <span className="sc-av sc-av--op">{avatar ? <img src={avatar.src} alt={avatar.alt ?? ''} /> : null}</span>
  );
  return (
    <div className="opm-chat">
      <style dangerouslySetInnerHTML={{ __html: cssChat }} />
      <div className="sup2__win">
        <div className="sup2__bar">
          <span className="sup2__op">
            {avatar ? <img src={avatar.src} alt={avatar.alt ?? ''} /> : null}
            <i className="sup2__on" />
          </span>
          <div className="sup2__meta">
            <b>{operatorName}</b>
            <span>{operatorStatus}</span>
          </div>
        </div>
        <div className="sc-view">
          <div className="sc-feed">
            {list.map((m, i) => (
              <React.Fragment key={i}>
                <div className={`sc-row sc-row--${m.from === 'me' ? 'out' : 'in'} m${i + 1}`}>
                  {m.from === 'me' ? (
                    <>
                      <span className="sc-bub sc-bub--out">{m.text}</span>
                      <MeAvatar />
                    </>
                  ) : (
                    <>
                      {opAvatar}
                      <span className="sc-bub sc-bub--in">{m.text}</span>
                    </>
                  )}
                </div>
                {/* индикатор набора — перед первым ответом оператора */}
                {i === 0 && list[1]?.from === 'op' ? (
                  <div className="sc-row sc-row--in ty">
                    {opAvatar}
                    <span className="sc-typing">
                      <i />
                      <i />
                      <i />
                    </span>
                  </div>
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="sup2__input">
          <span className="sup2__ph">{placeholder}</span>
          <b className="sup2__send">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </b>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- установка на сервер */

export type ServerInstallMockProps = {
  /** Первое слово заголовка — обычно название продукта */
  product?: string;
  /** Продолжение заголовка, пока идёт установка */
  runningLabel?: string;
  /** Продолжение заголовка после 100% */
  doneLabel?: string;
  /** Адрес под прогресс-баром */
  host?: string;
  /** Сколько серверных юнитов рисовать под карточкой */
  units?: number;
  /** Длительность заливки, мс */
  duration?: number;
  /** Пауза на 100% перед перезапуском, мс */
  hold?: number;
};

const cssInstall = `.opm-install .op-unit{display:flex;align-items:center;gap:5px;background:#f5f5f5;border:1px solid #eee;border-radius:8px;padding:8px 10px;margin-bottom:6px}
.opm-install .op-led{width:7px;height:7px;border-radius:50%}
.opm-install .op-led{opacity:.35;animation:ledWave 2.4s cubic-bezier(.4,0,.2,1) infinite}
.opm-install .op-unit .op-led:nth-child(1){animation-delay:0s}
.opm-install .op-unit .op-led:nth-child(2){animation-delay:calc(0s + .25s)}
.opm-install .op-unit .op-led:nth-child(3){animation-delay:calc(0s + .5s)}
.opm-install .op-unit + .op-unit{--row:.12s}
.opm-install .op-unit + .op-unit + .op-unit{--row:.24s}
@keyframes ledWave{0%,100%{opacity:.5}
  45%{opacity:.95}
  70%{opacity:.65}}
.opm-install .op-vent{flex:1;height:4px;border-radius:2px;background:#e0e0e0}
.opm-install .op-vent:first-of-type{margin-left:6px}
.opm-install .op-unit:last-of-type{margin-bottom:0}
@media (max-width:1279px){.opm-install .ci-server{border-radius:12px}}
.opm-install .cta-install{position:relative;margin:auto}
.opm-install .ci-server{width:270px;background:#fff;border-radius:16px;padding:24px;
  box-shadow:none}
.opm-install .ci-head{display:flex;align-items:center;justify-content:center;gap:8px;font-size:14px;font-weight:600;margin-bottom:12px}
.opm-install .ci-card{margin-bottom:16px}
.opm-install .ci-title{font-size:13px;font-weight:600;line-height:1.35;margin-bottom:10px}
.opm-install .ci-title .ci-ok{color:#7d4ccf;font-weight:inherit}
.opm-install .ci-bar{height:8px;border-radius:4px;background:#efe9f9;overflow:hidden}
.opm-install .ci-bar i{display:block;height:100%;width:0;border-radius:4px;background:#7d4ccf}
.opm-install .ci-meta{display:flex;justify-content:space-between;align-items:center;margin-top:8px;font-size:11px;color:#757575}
.opm-install .ci-meta b{color:#7d4ccf;font-weight:600}
@media (min-width:1024px){.opm-install .ci-server{width:290px}}
.opm-install .ci-server{position:relative;flex:none}
.opm-install .ci-bar i{transition:width .18s linear,background-color .5s ease}
.opm-install .ci-bar i.done{background:#7d4ccf}
.opm-install .ci-title .ci-run{color:#7d4ccf;font-weight:inherit}`;

export function ServerInstallMock({
  product = 'Кайтен',
  runningLabel = 'установка на сервер',
  doneLabel = 'установлен на ваш сервер',
  host = 'kaiten.company.local',
  units = 3,
  duration = 5200,
  hold = 7000,
}: ServerInstallMockProps) {
  const barRef = useRef<HTMLElement>(null);
  const pctRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const pct = pctRef.current;
    const label = labelRef.current;
    if (!bar || !pct || !label) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      bar.style.width = '100%';
      bar.classList.add('done');
      pct.textContent = '100%';
      label.textContent = doneLabel;
      label.className = 'ci-ok';
      return;
    }

    let start: number | null = null;
    let raf = 0;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    // сброс без транзишена, чтобы полоса начиналась ровно с 0%
    const reset = () => {
      bar.style.transition = 'none';
      bar.style.width = '0%';
      bar.classList.remove('done');
      pct.textContent = '0%';
      label.textContent = runningLabel;
      label.className = 'ci-run';
      void bar.offsetWidth;
      bar.style.transition = '';
    };

    const frame = (ts: number) => {
      if (start === null) start = ts;
      const t = ts - start;
      if (t <= duration) {
        const p = ease(Math.min(1, t / duration)) * 100;
        bar.style.width = `${p}%`;
        pct.textContent = `${Math.round(p)}%`;
        label.textContent = runningLabel;
        label.className = 'ci-run';
        bar.classList.remove('done');
      } else if (t > duration + hold) {
        start = null;
        reset();
      } else {
        bar.style.width = '100%';
        pct.textContent = '100%';
        label.textContent = doneLabel;
        label.className = 'ci-ok';
        bar.classList.add('done');
      }
      raf = window.requestAnimationFrame(frame);
    };

    reset();
    raf = window.requestAnimationFrame(frame);
    return () => window.cancelAnimationFrame(raf);
  }, [runningLabel, doneLabel, duration, hold]);

  return (
    <div className="opm-install" aria-hidden>
      <style dangerouslySetInnerHTML={{ __html: cssInstall }} />
      <div className="cta-install">
        <div className="ci-server">
          <div className="ci-card">
            <div className="ci-title">
              {product} <b className="ci-run" ref={labelRef} />
            </div>
            <div className="ci-bar">
              <i ref={barRef} />
            </div>
            <div className="ci-meta">
              <span>{host}</span>
              <b ref={pctRef}>0%</b>
            </div>
          </div>
          {Array.from({ length: units }, (_, i) => (
            <div className="op-unit" key={i}>
              <span className="op-led" />
              <span className="op-led" />
              <span className="op-led" />
              <i className="op-vent" />
              <i className="op-vent" />
              <i className="op-vent" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------- композиция финального CTA */

/**
 * KaitenBox — коробка продукта «Кайтен» с прозрачным фоном.
 * Готовое значение для пропа `box` компонента IllustrationCTA.
 * Файл лежит в apps/web/public/brand — путь абсолютный от корня сайта.
 */
export const KaitenBox = {
  src: '/brand/kaiten-box.png',
  alt: 'Коробочная версия Кайтен',
} as const;

export type IllustrationCTAProps = ServerInstallMockProps & {
  /** Коробка продукта — PNG/WebP с прозрачным фоном */
  box: { src: string; alt?: string };
  /** Фон подложки; null — без подложки, если блок уже на градиенте */
  background?: string | null;
};

const cssCta = `.opm-cta{position:relative;display:flex;align-items:center;justify-content:flex-start;
  width:560px;max-width:100%;min-height:360px;padding:24px;border-radius:24px;
  font-family:'Roboto',system-ui,sans-serif}
.opm-cta .opm-cta__server{position:relative;z-index:2;width:290px;flex:none}
.opm-cta .opm-install .ci-server{width:290px}
.opm-cta .opm-cta__box{position:absolute;right:8px;top:50%;transform:translateY(-50%);width:340px;height:auto;
  display:block;z-index:1;filter:drop-shadow(0 20px 34px -20px rgba(45,45,45,.42))}
@media (max-width:767px){
  .opm-cta{min-height:280px;padding:16px;border-radius:16px}
  .opm-cta .opm-cta__server{width:230px}
  .opm-cta .opm-install .ci-server{width:230px}
  .opm-cta .opm-cta__box{width:180px}
}`;

/**
 * Карточка установки слева и коробка продукта справа поверх неё.
 * Эталон — блок «Готовы развернуть Кайтен на своём сервере»
 * лендинга kaiten-on-premise.
 */
export default function IllustrationCTA({
  box,
  background = 'linear-gradient(90deg,#ece0ff,#cdecff)',
  ...server
}: IllustrationCTAProps) {
  return (
    <div className="opm-cta" style={background ? { background } : undefined}>
      <style dangerouslySetInnerHTML={{ __html: cssCta }} />
      <div className="opm-cta__server">
        <ServerInstallMock {...server} />
      </div>
      <img className="opm-cta__box" src={box.src} alt={box.alt ?? ''} aria-hidden={!box.alt} />
    </div>
  );
}
