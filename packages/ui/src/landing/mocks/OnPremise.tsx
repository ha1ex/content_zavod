'use client';

/**
 * OnPremise — «закрытый контур компании»: сервер в центре, вокруг него
 * карточки модулей, между ними пунктирные связи с бегущими импульсами.
 *
 * Эталон — первый экран лендинга «Кайтен on-premise».
 *
 * Композиция (не менять, наполнять новым контентом через пропсы):
 * - Сцена 1120×472, светло-фиолетовая подложка со скруглением и плашкой
 *   «Закрытый контур компании», надетой на верхнюю границу.
 * - Сервер по центру: шапка с логотипом, три юнита с мигающими диодами,
 *   подпись со способом развертывания.
 * - Шесть карточек по краям — слева задачи, команда, проекты, справа документы,
 *   заявки, продажи — и седьмая под сервером, коммуникации.
 * - Связи нарисованы фиксированными путями в системе координат 1120×472,
 *   по каждой раз в 3.6с пробегает импульс. Пути жестко привязаны к позициям
 *   карточек, поэтому геометрия сцены не параметризуется — меняется только текст.
 * - Ниже 768px связи скрываются, сцена перестраивается в сетку по две карточки.
 * - Сцена ужимается под ширину контейнера, но не растягивается выше 1:1:
 *   дробное увеличение размывает текст. Ниже 768px масштаб гасится в CSS,
 *   потому что там сцена перестраивается в сетку.
 * - prefers-reduced-motion: импульсы и диоды замирают.
 */
import React, { useEffect, useRef, useState } from 'react';

/** Аватар участника в карточке «Команда». */
export type OnPremiseAvatar = {
  /** Одна буква — инициал. */
  letter: string;
  /** Цвет кружка. */
  color: string;
};

/** Строка заявки: точка приоритета, полоса-заглушка и время реакции. */
export type OnPremiseRequest = {
  /** Цвет точки слева — приоритет. */
  color: string;
  /** Время справа, например «2ч 56м». */
  time: string;
  /** Цвет времени; по умолчанию совпадает с цветом точки. */
  timeColor?: string;
  /** Длина полосы-заглушки, % от строки. */
  width: number;
};

export type OnPremiseProps = {
  /** Текст плашки на верхней границе контура. */
  label?: React.ReactNode;
  /** Заголовок карточки сервера. */
  serverTitle?: React.ReactNode;
  /** Подпись под юнитами — как разворачивается. */
  serverFoot?: React.ReactNode;
  /** Заголовки карточек; порядок задан композицией. */
  titles?: {
    tasks?: React.ReactNode;
    team?: React.ReactNode;
    projects?: React.ReactNode;
    docs?: React.ReactNode;
    requests?: React.ReactNode;
    sales?: React.ReactNode;
    chat?: React.ReactNode;
  };
  /** Аватары в карточке «Команда», обычно четыре. */
  avatars?: OnPremiseAvatar[];
  /** Счетчик остальных участников, например «+26»; пустая строка убирает кружок. */
  avatarsMore?: string;
  /** Строки в карточке заявок, обычно три. */
  requests?: OnPremiseRequest[];
  /** Сумма в карточке продаж. */
  salesTotal?: React.ReactNode;
  /** Подпись для скринридеров. */
  ariaLabel?: string;
};

const ICONS: Record<string, string> = {"tasks": "<svg preserveAspectRatio=\"none\"   overflow=\"visible\" style=\"display: block;\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"Icon\"> <path id=\"Vector\" d=\"M8.99609 20V4M8.99609 20H16.7992C17.9171 20 18.4761 20 18.9035 19.7822C19.2798 19.5905 19.5866 19.2837 19.7783 18.9074C19.9961 18.48 19.9961 17.921 19.9961 16.8031V7.19691C19.9961 6.07899 19.9961 5.5192 19.7783 5.0918C19.5866 4.71547 19.2798 4.40973 18.9035 4.21799C18.4757 4 17.9164 4 16.7963 4H8.99609M8.99609 20H7.19302C6.0751 20 5.5153 20 5.08789 19.7822C4.71157 19.5905 4.40583 19.2837 4.21408 18.9074C3.99609 18.4796 3.99609 17.9203 3.99609 16.8002V7.2002C3.99609 6.08009 3.99609 5.51962 4.21408 5.0918C4.40583 4.71547 4.71157 4.40973 5.08789 4.21799C5.51571 4 6.07618 4 7.19629 4H8.99609\" stroke=\"#7D4CCF\" stroke-width=\"2.03175\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/> </g> </svg>", "team": "<svg preserveAspectRatio=\"none\"   overflow=\"visible\" style=\"display: block;\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <circle cx=\"9\" cy=\"8.5\" r=\"3.0625\" stroke=\"#7D4CCF\" stroke-width=\"1.875\"/> <path d=\"M3.5 19C4.1 16 6.3 14.25 9 14.25C11.7 14.25 13.9 16 14.5 19\" stroke=\"#7D4CCF\" stroke-width=\"1.875\" stroke-linecap=\"round\"/> <path d=\"M15.5 5.6C16.1 5.2 16.8 5 17.5 5C19.4 5 20.9 6.5 20.9 8.4C20.9 10.3 19.4 11.8 17.5 11.8\" stroke=\"#7D4CCF\" stroke-width=\"1.875\" stroke-linecap=\"round\"/> <path d=\"M17 14.4C19.1 14.9 20.3 16.4 20.8 18.5\" stroke=\"#7D4CCF\" stroke-width=\"1.875\" stroke-linecap=\"round\"/> </svg>", "projects": "<svg preserveAspectRatio=\"none\"   overflow=\"visible\" style=\"display: block;\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"File / Folder_Document\"> <path id=\"Vector\" d=\"M9 15H15M9 12H15M3 6V16.8C3 17.9201 3 18.4796 3.21799 18.9074C3.40973 19.2837 3.71547 19.5905 4.0918 19.7822C4.5192 20 5.07899 20 6.19691 20H17.8037C18.9216 20 19.4806 20 19.908 19.7822C20.2843 19.5905 20.5905 19.2841 20.7822 18.9078C21.0002 18.48 21.0002 17.9199 21.0002 16.7998L21.0002 9.19978C21.0002 8.07967 21.0002 7.51962 20.7822 7.0918C20.5905 6.71547 20.2837 6.40973 19.9074 6.21799C19.4796 6 18.9201 6 17.8 6H12M3 6H12M3 6C3 4.89543 3.89543 4 5 4H8.67452C9.1637 4 9.40915 4 9.63933 4.05526C9.8434 4.10425 10.0379 4.18526 10.2168 4.29492C10.4186 4.41856 10.5918 4.59183 10.9375 4.9375L12 6\" stroke=\"#7D4CCF\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/> </g> </svg>", "docs": "<svg preserveAspectRatio=\"none\"   overflow=\"visible\" style=\"display: block;\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"icon\"> <path id=\"Vector\" d=\"M12 9.7998V19.9998M12 19.9998L11.4185 19.1277C10.9017 18.3526 10.6426 17.9638 10.2998 17.6821C9.99512 17.4317 9.64306 17.2441 9.26569 17.1295C8.83942 17 8.36994 17 7.43073 17H4.59797C4.03901 17 3.7596 17 3.5459 16.8911C3.35774 16.7952 3.20487 16.6419 3.10899 16.4537C3 16.2398 3 15.9601 3 15.4001V6.6001C3 6.04004 3 5.75981 3.10899 5.5459C3.20487 5.35774 3.35774 5.20487 3.5459 5.10899C3.75981 5 4.03956 5 4.59961 5H7.19961C8.87977 5 9.72004 5 10.3618 5.32698C10.9263 5.6146 11.3852 6.0737 11.6729 6.63818C11.9998 7.27992 12 8.11965 12 9.7998C12 8.11965 12 7.27992 12.327 6.63818C12.6146 6.0737 13.0732 5.6146 13.6377 5.32698C14.2794 5 15.1196 5 16.7998 5H19.3998C19.9599 5 20.2401 5 20.454 5.10899C20.6422 5.20487 20.7948 5.35774 20.8906 5.5459C20.9996 5.75981 21 6.04004 21 6.6001V15.4001C21 15.9601 20.9996 16.2398 20.8906 16.4537C20.7948 16.6419 20.6425 16.7952 20.4543 16.8911C20.2406 17 19.961 17 19.402 17H16.5693C15.6301 17 15.1597 17 14.7334 17.1295C14.356 17.2441 14.0057 17.4317 13.701 17.6821C13.3568 17.965 13.096 18.3557 12.575 19.1372L12 19.9998Z\" stroke=\"#7D4CCF\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/> </g> </svg>", "support": "<svg preserveAspectRatio=\"none\"   overflow=\"visible\" style=\"display: block;\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"Basa\"> <path id=\"Vector\" d=\"M9.52536 2.33901C10.9597 2.01953 11.8896 1.8965 13.3563 2.09824C13.6402 2.1501 14.0613 2.21932 14.3354 2.29076C15.7046 2.60851 16.7041 3.02796 17.8234 3.88051C18.2568 4.24432 18.5851 4.63551 18.977 5.01856C19.6942 5.90665 20.2332 6.65534 20.5313 7.7536C20.6857 8.32225 20.7522 8.50378 20.7979 9.11837C20.8292 9.5388 20.7818 10.3633 20.8577 10.7134C21.4992 10.9693 21.9371 11.388 21.9739 12.0919C22.0034 12.6561 22.0057 13.2554 21.9917 13.8265C21.9752 14.4996 22.0709 15.3445 21.8425 15.9845C21.6813 16.436 21.0545 16.5794 20.7516 16.8799C20.6774 16.9566 20.5398 17.704 20.482 17.8999C20.1351 19.075 19.0046 20.1142 17.863 20.5728C17.193 20.8419 16.4878 20.9565 15.7711 20.952C15.5657 20.9508 15.0639 20.9643 14.8864 21.0073C14.5842 21.433 14.4117 21.865 13.7259 21.9491C13.254 22.0069 11.6196 22.0253 11.2314 21.9517C11.0002 21.9085 10.7806 21.8194 10.5864 21.6904C10.3542 21.5353 10.1326 21.2521 10.1097 20.9721C10.0252 19.9414 10.0263 19.3351 11.0116 18.7975C11.4242 18.6606 13.5072 18.6326 13.9314 18.7688C14.5243 18.9605 14.6356 19.159 14.8883 19.6912C14.9804 19.8851 15.368 19.7857 15.5442 19.7706C15.7375 19.7515 15.939 19.7092 16.1324 19.6965C17.4488 19.6101 18.7814 18.7852 19.1289 17.503C19.1931 17.2659 19.2099 17.0102 19.2642 16.7661C18.6983 16.7559 18.0265 16.6553 17.6037 16.2647C17.2268 15.9165 17.2313 15.4648 17.2298 14.9972C17.2273 14.1835 17.2464 13.372 17.237 12.5584C17.2335 11.995 17.2133 11.573 17.6592 11.1475C18.1634 10.6665 18.6785 10.6497 19.3354 10.6441C19.3748 10.3182 19.3262 10.036 19.3134 9.71388C19.2031 6.93828 17.1203 4.50162 14.3851 3.73885C13.9199 3.60909 13.4701 3.51739 12.9811 3.45208C11.0779 3.20747 9.1523 3.70439 7.62667 4.83382C6.01867 6.01647 5.29975 7.30568 5.03043 9.21316C4.95833 9.85255 4.97538 10.0144 4.99352 10.6341C5.6812 10.6752 6.13694 10.7276 6.65389 11.2615C6.73009 11.3402 6.83696 11.5426 6.8699 11.5766C6.99729 11.9251 6.96157 12.6887 6.95953 13.0874L6.94753 14.7729C6.94382 15.0402 6.92524 15.3827 6.93077 15.6426C6.71605 16.5286 6.02672 16.706 5.20332 16.7447C4.54409 16.7237 3.86238 16.7657 3.21515 16.717C2.64926 16.6744 2.106 16.2093 2.05289 15.6528C2.00101 15.1095 1.99308 14.5797 2.00463 14.0358C2.01913 13.3536 1.98181 12.64 2.0719 11.9654C2.20924 11.3968 2.42098 11.142 2.95435 10.8408C3.12818 10.7427 3.26426 10.7036 3.43358 10.5819C3.47391 10.3706 3.49899 9.55172 3.5141 9.27652C3.55397 8.55029 3.67983 8.28484 3.84135 7.64343L3.84504 7.62836C3.94813 7.41889 4.01351 7.01034 4.14581 6.74841C4.55328 5.94171 5.14609 5.11605 5.78221 4.45964C5.95922 4.27699 6.45813 3.88843 6.66931 3.70679C6.82295 3.65342 7.66722 3.09765 7.85745 2.97873C8.17255 2.82242 9.20946 2.39032 9.52536 2.33901Z\" fill=\"#7D4CCF\"/> </g> </svg>", "crm": "<svg   viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <g transform=\"translate(3.09 6.09)\"> <path d=\"M16.9103 0.909831L11.0641 6.84733C10.9591 6.95397 10.906 7.0074 10.859 7.04947C10.0997 7.72914 8.95142 7.72915 8.19206 7.04948C8.14505 7.0074 8.09156 6.95402 7.98651 6.84732C7.88146 6.74063 7.82891 6.68726 7.7819 6.64518C7.02254 5.96551 5.8738 5.96551 5.11444 6.64518C5.06754 6.68716 5.01515 6.74036 4.91061 6.84654L0.909831 10.9098M10.9098 0.909831H16.9103L16.9098 6.90983\" stroke=\"#7D4CCF\" stroke-width=\"1.81966\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/> </g> </svg>", "chat": "<svg preserveAspectRatio=\"none\"   overflow=\"visible\" style=\"display: block;\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"Frame 2147224666\"> <path id=\"Vector (Stroke)\" d=\"M10.0429 20C10.0429 19.3338 10.4465 18.6081 11.3502 18.0034C12.247 17.4034 13.5434 17 15.025 17C16.5066 17 17.803 17.4034 18.6998 18.0034C19.6036 18.6081 20.0072 19.3338 20.0072 20C20.0072 20.5523 20.4533 21 21.0036 21C21.5539 21 22 20.5523 22 20C22 18.457 21.0653 17.1824 19.8052 16.3393C18.5382 15.4917 16.8452 15 15.025 15C13.2049 15 11.5118 15.4917 10.2448 16.3393C8.98478 17.1824 8.05006 18.457 8.05006 20C8.05006 20.5523 8.49618 21 9.04649 21C9.5968 21 10.0429 20.5523 10.0429 20ZM3.99285 8.99995C3.99285 8.20328 4.14986 7.41381 4.45408 6.6767C4.75809 5.94012 5.20356 5.27071 5.7653 4.70696C6.15442 4.31644 6.15442 3.68342 5.7653 3.29289C5.37617 2.90237 4.74542 2.90237 4.35629 3.29289C3.60956 4.04231 3.01719 4.93193 2.61303 5.91107C2.2091 6.88976 2 7.93946 2 8.99995C2.00002 10.0601 2.2085 11.1099 2.61255 12.0888C3.01677 13.0682 3.60972 13.9577 4.35629 14.707C4.74542 15.0975 5.37617 15.0975 5.7653 14.707C6.15435 14.3165 6.1544 13.6834 5.7653 13.2929C5.20345 12.7291 4.75751 12.0596 4.4536 11.3232C4.14955 10.5865 3.99287 9.79687 3.99285 8.99995ZM12.0358 8.99995C12.0358 7.34309 13.3741 5.99994 15.025 5.99994C16.676 5.99994 18.0143 7.34309 18.0143 8.99995C18.0143 10.6568 16.676 12 15.025 12C13.3741 12 12.0358 10.6568 12.0358 8.99995ZM7.05364 9.00044C7.05366 8.60668 7.13107 8.21609 7.28134 7.852C7.43156 7.48806 7.65185 7.15739 7.9294 6.87885C8.31853 6.48832 8.31853 5.8553 7.9294 5.46478C7.54028 5.07425 6.90953 5.07425 6.5204 5.46478C6.05776 5.92907 5.69066 6.48022 5.44029 7.08686C5.19001 7.69328 5.06081 8.34372 5.06079 9.00044C5.06079 9.65745 5.19007 10.3068 5.44029 10.913C5.69056 11.5194 6.05761 12.0712 6.5204 12.5356C6.90951 12.926 7.54029 12.926 7.9294 12.5356C8.31851 12.1451 8.31847 11.5121 7.9294 11.1215C7.65201 10.8432 7.43167 10.5116 7.28134 10.1474C7.131 9.78311 7.05364 9.39396 7.05364 9.00044ZM10.0429 8.99995C10.0429 11.7614 12.2735 14 15.025 14C17.7766 14 20.0072 11.7614 20.0072 8.99995C20.0072 6.23851 17.7766 3.99993 15.025 3.99993C12.2735 3.99993 10.0429 6.23851 10.0429 8.99995Z\" fill=\"#7D4CCF\"/> </g> </svg>"};

const DEFAULT_AVATARS: OnPremiseAvatar[] = [
  { letter: 'А', color: '#7d4ccf' },
  { letter: 'М', color: '#2196f3' },
  { letter: 'Д', color: '#ffa100' },
  { letter: 'К', color: '#4caf51' },
];

const DEFAULT_REQUESTS: OnPremiseRequest[] = [
  { color: '#f44336', time: '2ч 56м', width: 46 },
  { color: '#ffa100', time: '2ч', timeColor: '#b87400', width: 38 },
  { color: '#4caf51', time: '32м', timeColor: '#2f7d33', width: 42 },
];

/** Ширина сцены в макете; высоту держит aspect-ratio обертки. */
const SCENE_W = 1120;
/** Пути связей в координатах сцены; порядок совпадает с импульсами p1…p7. */
const LINKS: string[] = ["M216 96 L476 96", "M216 235 L340 235 Q350 235 350 225 L350 156 Q350 146 360 146 L476 146", "M216 374 L410 374 Q420 374 420 364 L420 206 Q420 196 430 196 L476 196", "M904 96 L644 96", "M904 235 L780 235 Q770 235 770 225 L770 156 Q770 146 760 146 L644 146", "M904 374 L710 374 Q700 374 700 364 L700 206 Q700 196 690 196 L644 196", "M560 340 L560 238"];

const css = `
.onp{width:100%}
/* пропорция держит высоту до того, как отработает скрипт, и режет вылет сцены */
.onp .onp__fit{width:100%;overflow:hidden;aspect-ratio:1120/472}
.onp .onp__scene{transform-origin:top left;width:1120px}
@media(max-width:767px){
  .onp .onp__fit{aspect-ratio:auto;overflow:visible}
  /* !important гасит инлайновый масштаб: на мобилке сцена перестраивается, а не ужимается */
  .onp .onp__scene{width:auto!important;transform:none!important}
}
@media(prefers-reduced-motion:reduce){
  .onp .op-pulse,.onp .op-led{animation:none}
  .onp .op-pulse{opacity:0}
  .onp .op-led{opacity:.6}
}
.onp .dot{width:8px;height:8px;border-radius:50%}
.onp .op-contour{background:#F6F2FC;position:relative;width:1120px;max-width:100%;height:472px;margin:0 auto;border-radius:var(--radius-3xl,24px);
  background:rgba(239,233,249,.28)}
.onp .op-contour::before{content:"";position:absolute;inset:0;border-radius:var(--radius-3xl,24px);pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='1.5' y='1.5' width='calc(100%25 - 3px)' height='calc(100%25 - 3px)' rx='24' fill='none' stroke='%237d4ccf' stroke-width='2' stroke-dasharray='10 8'/%3E%3C/svg%3E")}
.onp .op-contour{background:#F6F2FC;border:1px solid #EBE1F9}
.onp .op-contour::before{display:none}
.onp .op-lock{position:absolute;top:-16px;left:50%;transform:translateX(-50%);display:inline-flex;align-items:center;gap:6px;
  background:#e6dcf8;color:var(--brand-100,#7d4ccf);font-size:var(--fs-sm,14px);line-height:1;font-weight:var(--fw-med,500);
  padding:8px 14px;border-radius:9999px;white-space:nowrap;box-shadow:0 10px 24px -14px rgba(125,76,207,.45);z-index:3}
.onp .op-lock svg{width:14px;height:14px}
.onp .op-links{position:absolute;inset:0;width:100%;height:100%;z-index:0;opacity:1}
.onp .op-links path{fill:none;stroke:rgba(125,76,207,.24);stroke-width:2;stroke-dasharray:5 6}
.onp .op-pulse{fill:url(#onpGrad);opacity:0;offset-rotate:auto}
.onp .p1{offset-path:path("M216 96 L476 96")}
.onp .p2{offset-path:path("M216 235 L340 235 Q350 235 350 225 L350 156 Q350 146 360 146 L476 146")}
.onp .p3{offset-path:path("M216 374 L410 374 Q420 374 420 364 L420 206 Q420 196 430 196 L476 196")}
.onp .p4{offset-path:path("M904 96 L644 96")}
.onp .p5{offset-path:path("M904 235 L780 235 Q770 235 770 225 L770 156 Q770 146 760 146 L644 146")}
.onp .p6{offset-path:path("M904 374 L710 374 Q700 374 700 364 L700 206 Q700 196 690 196 L644 196")}
.onp .p7{offset-path:path("M560 340 L560 238")}
.onp .op-pulse{animation:onpPulse 3.6s cubic-bezier(.4,0,.6,1) infinite}
.onp .op-server{position:absolute;left:50%;top:48px;transform:translateX(-50%);width:196px;z-index:2;
  background:#fff;border:1px solid #D9C9F3;border-radius:var(--radius-2xl,16px);padding:var(--sp-4,16px);
  box-shadow:0 10px 22px -14px rgba(125,76,207,.25)}
.onp .op-server__head{display:flex;align-items:center;justify-content:center;gap:8px;font-size:var(--fs-sm,14px);font-weight:400;margin-bottom:var(--sp-3,12px)}
.onp .op-unit{display:flex;align-items:center;gap:5px;background:var(--k100,#f5f5f5);border:1px solid var(--k200,#eee);border-radius:var(--radius-lg,8px);padding:8px 10px;margin-bottom:6px}
.onp .op-led{width:7px;height:7px;border-radius:50%}
.onp .led-g{background:#B49BE6;color:#B49BE6}
.onp .op-led{opacity:.35;animation:onpLed 2.4s cubic-bezier(.4,0,.2,1) infinite}
.onp .op-unit .op-led:nth-child(1){animation-delay:var(--row,0s)}
.onp .op-unit .op-led:nth-child(2){animation-delay:calc(var(--row,0s) + .25s)}
.onp .op-unit .op-led:nth-child(3){animation-delay:calc(var(--row,0s) + .5s)}
.onp .op-unit + .op-unit{--row:.12s}
.onp .op-unit + .op-unit + .op-unit{--row:.24s}
.onp .op-vent{flex:1;height:4px;border-radius:2px;background:var(--k300,#e0e0e0)}
.onp .op-vent:first-of-type{margin-left:6px}
.onp .op-unit:last-of-type{margin-bottom:0}
.onp .op-server__foot{font-size:11px;color:var(--text-secondary,#757575);text-align:center;margin-top:var(--sp-4,16px)}
.onp .op-card{position:absolute;z-index:1;background:#fff;border:1px solid var(--k200,#eee);border-radius:var(--radius-xl,12px);
  padding:var(--sp-3,12px);width:190px;height:104px;display:flex;flex-direction:column;justify-content:flex-start;
  box-shadow:none}
.onp .op-card > :last-child{margin-top:auto;margin-bottom:auto}
.onp .op-card__t + *{margin-top:0}
.onp .op-card__t{font-size:var(--fs-sm,14px);font-weight:400;margin-bottom:8px;display:flex;align-items:center;gap:6px}
.onp .op-ci{width:18px;height:18px;flex:none}
.onp .op-card--team{left:40px;top:48px}
.onp .op-card--tasks{left:40px;top:187px}
.onp .op-card--proj{left:40px;top:326px}
.onp .op-card--docs{right:40px;top:48px}
.onp .op-card--sd{right:40px;top:187px}
.onp .op-card--sales{right:40px;top:326px}
.onp .op-card--chat{left:50%;transform:translateX(-50%);top:326px}
.onp .op-kan{display:flex;gap:5px}
.onp .op-kcol{flex:1;display:flex;flex-direction:column;gap:4px}
.onp .op-kcol + .op-kcol{border-left:1px solid var(--k200,#eee);padding-left:6px}
.onp .kc{height:16px;border-radius:4px}
.onp .kc-v{background:#F0F0F2}
.onp .kc-o{background:var(--orange-12,#fff3e0)}
.onp .kc-g{background:#F0F0F2}
.onp .kc-b{background:var(--green-12,#e9f5ea)}
.onp .kc-n{background:#FDE8E6}
.onp .kc-g2{background:var(--orange-12,#fff3e0)}
.onp .op-avs{display:flex;align-items:center}
.onp .op-avs .av{width:24px;height:24px;border-radius:50%;border:2px solid #fff;margin-left:-6px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#fff}
.onp .op-avs .av:first-child{margin-left:0}
.onp .op-avs .av--plus{background:var(--k200,#eee);color:var(--text-secondary,#757575);border:2px solid #fff}
.onp .op-gantt{position:relative;height:44px}
.onp .op-gantt i{position:absolute;height:6px;border-radius:3px;top:1px}
.onp .op-docx{display:flex;gap:8px}
.onp .op-docx__side{width:46px;flex:none;display:flex;flex-direction:column;gap:5px;border-right:1px solid var(--k200,#eee);padding-right:7px}
.onp .dxr{display:flex;align-items:center;gap:3px}
.onp .dxr .dot{width:5px;height:5px;border-radius:2px;background:var(--k300,#e0e0e0);flex:none}
.onp .dxr .ln{flex:1;height:5px;border-radius:3px;background:var(--k200,#eee)}
.onp .op-docx__page{flex:1;min-width:0;display:flex;flex-direction:column;gap:5px}
.onp .dx-t{height:6px;width:62%;border-radius:3px;background:var(--k300,#e0e0e0)}
.onp .dx-callout{background:var(--blue-12,#e4f2fd);border-radius:4px;padding:4px 5px;display:flex;flex-direction:column;gap:3px}
.onp .dx-callout i{display:block;height:4px;border-radius:2px;background:#c4ddf5}
.onp .dx-l{height:5px;border-radius:3px;background:var(--k200,#eee)}
.onp .op-sd{display:flex;flex-direction:column;width:100%}
.onp .sd-row{display:flex;align-items:center;gap:5px;padding:5px 0;border-bottom:1px solid var(--k100,#f5f5f5)}
.onp .sd-row:first-child{padding-top:1px}
.onp .sd-row:last-child{border-bottom:0;padding-bottom:1px}
.onp .sd-row .d{width:5px;height:5px;border-radius:50%;flex:none}
.onp .sd-row .ln{height:5px;border-radius:3px;background:var(--k200,#eee)}
.onp .sd-row b{margin-left:auto;font-size:8px;font-weight:600;line-height:1;white-space:nowrap}
.onp .op-funnel{display:flex;flex-direction:column;gap:4px}
.onp .op-funnel i{height:8px;border-radius:4px;background:var(--brand-12,#efe9f9)}
.onp .op-funnel i:nth-child(2){background:var(--blue-12,#e4f2fd)}
.onp .op-funnel i:nth-child(3){background:var(--green-12,#e9f5ea)}
.onp .op-funnel b{font-size:10px;font-weight:var(--fw-reg,400);color:var(--text-title,#2d2d2d);margin-top:2px}
.onp .op-chat{display:flex;flex-direction:column;gap:6px}
.onp .bub-line{display:flex;align-items:flex-end;gap:6px}
.onp .bub-av{width:18px;height:18px;border-radius:50%;border:2px solid #fff;color:#fff;font-size:9px;font-weight:600;display:inline-flex;align-items:center;justify-content:center;flex:none}
.onp .bub-line .bub--in{width:60%}
.onp .bub{height:16px;border-radius:5px;position:relative}
.onp .bub::before, .onp .bub::after{content:"";position:absolute;height:3px;border-radius:2px}
.onp .bub::before{left:7px;right:7px;top:4px}
.onp .bub::after{left:7px;right:45%;top:9px}
.onp .bub--in::before, .onp .bub--in::after{background:#dedee1}
.onp .bub--out::before, .onp .bub--out::after{background:#d9c5f5}
.onp .bub--in{width:70%;background:var(--k100,#f5f5f5);border-top-left-radius:2px}
.onp .bub--out{width:56%;background:var(--brand-12,#efe9f9);align-self:flex-end;border-top-right-radius:2px}
@media(max-width:767px){
  .onp .op-contour{height:auto;padding:var(--sp-10,40px) var(--sp-4,16px) var(--sp-4,16px)}
  .onp .op-links{display:none}
  .onp .op-server{position:static;transform:none;margin:0 auto}
  .onp .op-card{position:static;width:auto;transform:none;animation:none !important}
  .onp .op-card--chat{transform:none}
  .onp .op-contour{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:auto;gap:var(--sp-3,12px);align-items:start}
  .onp .op-server{grid-column:1/-1;width:min(320px,100%);margin-inline:auto}
  .onp .op-card{width:auto;height:104px;min-height:0}
  .onp .op-lock{top:-15px}
}
@media(max-width:767px){
}
@media(max-width:1279px){
  .onp .op-contour, .onp .op-card, .onp .op-server{border-radius:var(--radius-xl,12px)}
}
.onp .bub-line--out{justify-content:flex-end}
.onp .bub-line--out .bub--out{width:56%}
@media(max-width:767px){
  .onp .op-card, .onp .op-server{box-shadow:none}
}
@media(max-width:767px){
}
@media(max-width:767px){
  .onp .op-contour{grid-template-columns:repeat(2,minmax(0,1fr))}
  .onp .op-card{height:auto;aspect-ratio:190/104}
}
@media(min-width:560px) and (max-width:767px){
  .onp .op-contour{grid-template-columns:1fr 1fr}
}
@media(max-width:559px){
  .onp .op-card{width:100%;max-width:360px;margin-inline:auto}
}
@media(max-width:767px){
  .onp .op-contour{align-items:stretch;grid-auto-rows:auto}
  .onp .op-card{aspect-ratio:190/104;height:auto;min-height:100px;padding:10px}
  .onp .op-card__t{margin-bottom:6px;font-size:12px}
  .onp .op-ci{width:14px;height:14px}
  .onp .op-server{margin-bottom:var(--sp-2,8px);align-self:start}
}
.onp .op-gantt::before, .onp .op-gantt::after{content:"";position:absolute;top:0;bottom:0;width:1px;background:#e8e8ec;z-index:0}
.onp .op-gantt::before{left:33%}
.onp .op-gantt::after{left:66%}
.onp .op-gantt i{z-index:1}
@media(min-width:768px) and (max-width:1279px){
}
@media(max-width:767px){
  .onp .op-server__head span{white-space:nowrap}
}
.onp .op-kcol::before{content:"";display:block;height:4px;border-radius:2px;background:var(--k200,#eee);margin-bottom:2px}
.onp .op-kcol:nth-child(1)::before{width:70%}
.onp .op-kcol:nth-child(2)::before{width:60%}
.onp .op-kcol:nth-child(3)::before{width:78%}
.onp .op-kcol:nth-child(4)::before{width:56%}
.onp .op-links{will-change:transform}
@keyframes onpPulse{0%{offset-distance:0%;opacity:0}12%{opacity:1}72%{opacity:1}88%{offset-distance:100%;opacity:0}100%{offset-distance:100%;opacity:0}}
@keyframes onpLed{0%,100%{opacity:.5}
  45%{opacity:.95}
  70%{opacity:.65}}`;

function Icon({ name }: { name: string }) {
  return <span className="op-ci" aria-hidden dangerouslySetInnerHTML={{ __html: ICONS[name] }} />;
}

/** Разворот «список слева, страница справа» — общий для документов и проектов. */
function Docx({ lines, children }: { lines: (number | undefined)[]; children?: React.ReactNode }) {
  return (
    <div className="op-docx">
      <div className="op-docx__side">
        {lines.map((w, i) => (
          <span className="dxr" key={i}>
            <i className="dot" />
            <i className="ln" style={w ? { width: `${w}%` } : undefined} />
          </span>
        ))}
      </div>
      <div className="op-docx__page">{children}</div>
    </div>
  );
}

export default function OnPremise({
  label = 'Закрытый контур компании',
  serverTitle = 'Сервер компании',
  serverFoot = <>Docker&nbsp;Compose&nbsp;· Kubernetes</>,
  titles,
  avatars = DEFAULT_AVATARS,
  avatarsMore = '+26',
  requests = DEFAULT_REQUESTS,
  salesTotal = <>1&nbsp;200&nbsp;000&nbsp;₽</>,
  ariaLabel = 'Закрытый контур компании: сервер и модули Кайтен',
}: OnPremiseProps) {
  const fitRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = fitRef.current;
    if (!el) return;

    function upd() {
      if (!el) return;
      // вверх не тянем: дробный апскейл мылит текст
      setScale(Math.min(1, (el.clientWidth || SCENE_W) / SCENE_W));
    }

    upd();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(upd) : null;
    if (ro) ro.observe(el);
    window.addEventListener('resize', upd);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', upd);
    };
  }, []);

  const t = {
    tasks: 'Задачи',
    team: 'Команда',
    projects: 'Проекты',
    docs: 'Документы',
    requests: 'Заявки',
    sales: 'Продажи',
    chat: 'Коммуникации',
    ...titles,
  };

  return (
    <div className="onp" aria-label={ariaLabel}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="onp__fit" ref={fitRef}>
        <div
          className="onp__scene"
          style={{ transform: `scale(${scale})` }}
        >
          <div className="op-contour">
            <span className="op-lock">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              {label}
            </span>

            <svg className="op-links" viewBox="0 0 1120 472" preserveAspectRatio="none" aria-hidden>
              <defs>
                <linearGradient id="onpGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#7D4CCF" stopOpacity="0" />
                  <stop offset=".5" stopColor="#7D4CCF" stopOpacity="1" />
                  <stop offset="1" stopColor="#7D4CCF" stopOpacity="0" />
                </linearGradient>
              </defs>
              {LINKS.map((d, i) => (
                <path d={d} key={i} />
              ))}
              {LINKS.map((_, i) => (
                <rect className={`op-pulse p${i + 1}`} x="-9" y="-1" width="18" height="2" rx="1" key={i} />
              ))}
            </svg>

            <div className="op-server">
              <div className="op-server__head">
                <svg width="22" height="22" viewBox="0 0 44 44" aria-hidden>
                  <path d="M32.5 0h-21C5.15 0 0 5.15 0 11.5v21C0 38.85 5.15 44 11.5 44h21C38.85 44 44 38.85 44 32.5v-21C44 5.15 38.85 0 32.5 0Z" fill="#F11F24" />
                  <path d="M17.52 4.8 4.8 17.52c-2.45 2.45-2.45 6.41 0 8.86L17.52 39.1c2.45 2.45 6.41 2.45 8.86 0L39.1 26.38c2.45-2.45 2.45-6.41 0-8.86L26.38 4.8c-2.45-2.45-6.41-2.45-8.86 0Z" fill="#78FFC7" />
                  <circle cx="21.9" cy="21.9" r="10.9" fill="#7D4CCF" />
                </svg>
                <span>{serverTitle}</span>
              </div>
              {[0, 1, 2].map((row) => (
                <div className="op-unit" key={row} style={{ ['--row' as string]: `${row * 0.35}s` }}>
                  <span className="op-led led-g" />
                  <span className="op-led led-g" />
                  <span className="op-led led-g" />
                  <i className="op-vent" />
                  <i className="op-vent" />
                  <i className="op-vent" />
                </div>
              ))}
              <div className="op-server__foot">{serverFoot}</div>
            </div>

            <div className="op-card op-card--tasks">
              <div className="op-card__t"><Icon name="tasks" />{t.tasks}</div>
              <div className="op-kan">
                <div className="op-kcol"><i className="kc kc-v" /><i className="kc kc-n" /></div>
                <div className="op-kcol"><i className="kc kc-o" /><i className="kc kc-b" /></div>
                <div className="op-kcol"><i className="kc kc-g" /><i className="kc kc-g2" /></div>
                <div className="op-kcol"><i className="kc kc-b" /><i className="kc kc-v" /></div>
              </div>
            </div>

            <div className="op-card op-card--team">
              <div className="op-card__t"><Icon name="team" />{t.team}</div>
              <div className="op-avs">
                {avatars.map((a, i) => (
                  <span className="av" key={i} style={{ background: a.color }}>
                    {a.letter}
                  </span>
                ))}
                {avatarsMore ? <span className="av av--plus">{avatarsMore}</span> : null}
              </div>
            </div>

            <div className="op-card op-card--proj">
              <div className="op-card__t"><Icon name="projects" />{t.projects}</div>
              <Docx lines={[undefined, 70, undefined, 80, undefined]}>
                <div className="op-gantt">
                  <i style={{ left: 0, width: '30%', background: '#c9b6ec' }} />
                  <i style={{ left: '23%', width: '32%', background: '#a7cdf6', top: 12 }} />
                  <i style={{ left: '47%', width: '30%', background: '#ffd9a1', top: 24 }} />
                  <i style={{ left: '70%', width: '30%', background: '#b7e0b9', top: 36 }} />
                </div>
              </Docx>
            </div>

            <div className="op-card op-card--docs">
              <div className="op-card__t"><Icon name="docs" />{t.docs}</div>
              <Docx lines={[undefined, undefined, undefined, 70, undefined]}>
                <i className="dx-t" />
                <span className="dx-callout">
                  <i />
                  <i style={{ width: '55%' }} />
                </span>
                <i className="dx-l" style={{ width: '92%' }} />
                <i className="dx-l" style={{ width: '70%' }} />
              </Docx>
            </div>

            <div className="op-card op-card--sd">
              <div className="op-card__t"><Icon name="support" />{t.requests}</div>
              <div className="op-sd">
                {requests.map((r, i) => (
                  <span className="sd-row" key={i}>
                    <i className="d" style={{ background: r.color }} />
                    <i className="ln" style={{ width: `${r.width}%` }} />
                    <b style={{ color: r.timeColor ?? r.color }}>{r.time}</b>
                  </span>
                ))}
              </div>
            </div>

            <div className="op-card op-card--sales">
              <div className="op-card__t"><Icon name="crm" />{t.sales}</div>
              <div className="op-funnel">
                <i style={{ width: '100%' }} />
                <i style={{ width: '72%' }} />
                <i style={{ width: '46%' }} />
                <b>{salesTotal}</b>
              </div>
            </div>

            <div className="op-card op-card--chat">
              <div className="op-card__t"><Icon name="chat" />{t.chat}</div>
              <div className="op-chat">
                <span className="bub-line">
                  <span className="bub-av" style={{ background: '#2196f3' }}>М</span>
                  <span className="bub bub--in" />
                </span>
                <span className="bub-line bub-line--out">
                  <span className="bub bub--out" />
                  <span className="bub-av" style={{ background: '#4caf51' }}>К</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
