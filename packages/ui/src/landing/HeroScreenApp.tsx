import React from 'react';
import type { HsiCard, HsiColumnHeader, HsiLane } from './HeroScreenInterface';

/** Ширина, на которой нарисован интерфейс Кайтена целиком (экран 1920). */
export const APP_DESIGN_WIDTH = 1920;

/**
 * HsiApp — режим `appShell` первого экрана: интерфейс Кайтена целиком, как в
 * продукте (эталон — пространство «Работа команды», экран 1920×1080).
 * Шапка, рельс разделов, «Дерево», панель видов, доска, рельс инструментов.
 * Иконки — Material Icons (как в продукте), значки карточек — в стиле Twemoji.
 * Размеры и цвета сняты с эталона попиксельно. Хром и дерево зашиты, доска
 * приходит пропсами. Стили заскоуплены под `.hsi .app`.
 */

/* ─── Material Icons (24×24, заливка) ─────────────────────────────────── */
export const APP_ICONS = {
  mail: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z',
  folderShared: 'M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 8h-8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z',
  star: 'M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
  accountTree: 'M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3z',
  send: 'M2.01 21 23 12 2.01 3 2 10l15 2-15 2z',
  viewWeek: 'M4 5h3v14H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1zm5 0h6v14H9zm8 0h3c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1h-3z',
  adminShield: 'M17 11c.34 0 .67.04 1 .09V6.27L10.5 3 3 6.27v4.91c0 4.54 3.2 8.79 7.5 9.82.55-.13 1.08-.32 1.6-.55A5.97 5.97 0 0 1 11 17c0-3.31 2.69-6 6-6zm0 2c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 1.38c.62 0 1.12.51 1.12 1.12s-.51 1.12-1.12 1.12-1.12-.51-1.12-1.12.5-1.12 1.12-1.12zm0 5.37c-.93 0-1.74-.46-2.24-1.17.05-.72 1.51-1.08 2.24-1.08s2.19.36 2.24 1.08c-.5.71-1.31 1.17-2.24 1.17z',
  spaceDashboard: 'M9 21H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h4v18zm2 0h8c1.1 0 2-.9 2-2v-7H11v9zm10-11V5c0-1.1-.9-2-2-2h-8v7h10z',
  article: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
  folder: 'M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z',
  assessment: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z',
  public: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
  groups: 'M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58A2.01 2.01 0 0 0 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85A6.95 6.95 0 0 0 20 14c-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24v-1.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z',
  chevronRight: 'M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
  search: 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  settings: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z',
  moreVert: 'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
  add: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  help: 'M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z',
  sidebar: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 19H5V5h4v14zm10 0h-8V5h8v14z',
  dashboardO: 'M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z',
  /* Значок «Доски» в рельсе разделов: залитый квадрат, колонки вырезаны (10/5/8). */
  boards: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7 7h2v10H7zm4 0h2v5h-2zm4 0h2v8h-2z',
  kanbanO: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 7h2v8H7zm4 0h2v5h-2zm4 0h2v8h-2z',
  grid: 'M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z',
  sort: 'M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z',
  calendarO: 'M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z',
  sync: 'M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z',
  folderO: 'M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z',
  insights: 'M3 3h2v16h16v2H3V3zm4 11.6 4.3-5.4 3.2 2.9L19.3 6l1.6 1.2-6.2 7.9-3.2-2.9-3.9 4.9L7 14.6zM7 3h13v2H7z',
  archive: 'M20 2H4c-1.1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-.9-2-2-2zm-1 18H5V9h14v11zm1-13H4V4h16v3zM15 12H9v2h6v-2z',
  archiveDown: 'M20 2H4c-1.1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-.9-2-2-2zm-1 18H5V9h14v11zm1-13H4V4h16v3zm-8 12 4-4h-3v-4h-2v4H8z',
  filter: 'M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z',
  cards: 'M20.1 6.3 13.5 3.6c-1-.4-2.2.1-2.6 1.1L6 16.8c-.4 1 .1 2.2 1.1 2.6l6.6 2.7c1 .4 2.2-.1 2.6-1.1l4.9-12.1c.4-1-.1-2.2-1.1-2.6zm-5.7 13.9L7.9 17.5l4.9-12.1 6.5 2.7-4.9 12.1zM3.9 18.4l-.8-2.1 3-7.3.8.3-3 9.1zm1.8 1.4-1 .1 3-8.5.4.2-2.4 8.2z',
  dblUp: 'M6 17.59 7.41 19 12 14.42 16.59 19 18 17.59l-6-6zM6 11l1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6z',
  starO: 'M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z',
  peopleO: 'M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.57-3.47-6.33-3.87zM15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24zm-6 0c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1z',
  avTimer: 'M11 17c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm0-14v4h2V5.08c3.39.49 6 3.39 6 6.92 0 3.87-3.13 7-7 7s-7-3.13-7-7c0-1.68.59-3.22 1.58-4.42L12 13l1.41-1.41-6.8-6.8v.02C4.42 6.45 3 9.05 3 12c0 4.97 4.02 9 9 9a9 9 0 0 0 0-18h-1zm7 9c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1zM6 12c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1z',
  brightnessAutoO: 'M10.85 12.65h2.3L12 9l-1.15 3.65zM20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM11 7l-3.2 9h1.9l.7-2h3.2l.7 2h1.9L13 7h-2z',
  shareO: 'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z',
  schema: 'M14 9v2h-3V9H8.5V7H11V1H4v6h2.5v2H4v6h2.5v2H4v6h7v-6H8.5v-2H11v-2h3v2h7V9h-7z',
  history: 'M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.95 8.95 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z',
  filterNone: 'M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z',
  block: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9A7.9 7.9 0 0 1 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1A7.9 7.9 0 0 1 20 12c0 4.42-3.58 8-8 8z',
  camera: 'M14.25 2.26l-.08-.04-.01.02C13.46 2.09 12.74 2 12 2 6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-4.75-3.31-8.72-7.75-9.74zM19.41 9h-7.99l2.71-4.7c2.4.66 4.35 2.42 5.28 4.7zM13.1 4.08 10.27 9l-1.15 2L6.4 6.3C7.84 4.88 9.82 4 12 4c.37 0 .74.03 1.1.08zM5.7 7.09 8.54 12l1.15 2H4.26C4.1 13.36 4 12.69 4 12c0-1.85.64-3.55 1.7-4.91zM4.59 15h7.98l-2.71 4.7A8.02 8.02 0 0 1 4.59 15zm6.31 4.91L14.89 13l2.72 4.7C16.16 19.12 14.18 20 12 20c-.38 0-.74-.04-1.1-.09zm7.4-3-4-6.91h5.43c.17.64.27 1.31.27 2 0 1.85-.64 3.55-1.7 4.91z',
  expandLess: 'M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z',
  check: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  event: 'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z',
  fire: 'M19.48 12.35c-1.57-4.08-7.16-4.3-5.81-10.23.1-.44-.37-.78-.75-.55C9.29 3.71 6.68 8 8.87 13.62c.18.46-.36.89-.75.59-1.81-1.37-2-3.34-1.84-4.75.06-.52-.62-.77-.91-.34C4.69 10.16 4 11.84 4 14.37c.38 5.6 5.11 7.32 6.81 7.54 2.43.31 5.06-.14 6.95-1.87 2.08-1.93 2.84-5.01 1.72-7.69z',
  attach: 'M2 12.5C2 9.46 4.46 7 7.5 7H18c2.21 0 4 1.79 4 4s-1.79 4-4 4H9.5a2.5 2.5 0 0 1 0-5H17v2H9.41c-.55 0-.55 1 0 1H18c1.1 0 2-.9 2-2s-.9-2-2-2H7.5a3.5 3.5 0 1 0 0 7H17v2H7.5C4.46 18 2 15.54 2 12.5z',
  split: 'M11 3h2v6.6l4.3 4.3 1.4-1.4V17h-4.5l1.4-1.4L12 12l-3.6 3.6L9.8 17H5.3v-4.5l1.4 1.4L11 9.6z',
  comment: 'M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z',
};

const I = ({ d, size = 24, className }: { d: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d={d} /></svg>
);

/** Знак Кайтена: красный круг, мятный ромб, фиолетовый центр (brand/kaiten-mark). */
const KaitenMark = () => (
  <svg width="26" height="26" viewBox="-0.5 -0.5 27 27" aria-hidden="true">
    <circle cx="13" cy="13" r="13" fill="#F11F24" />
    <path d="M11.17 5.63 5.63 11.17a2.58 2.58 0 0 0 0 3.65l5.55 5.55a2.58 2.58 0 0 0 3.65 0l5.55-5.55a2.58 2.58 0 0 0 0-3.65l-5.55-5.55a2.58 2.58 0 0 0-3.65 0z" fill="#78FFC7" />
    <circle cx="13" cy="13" r="4" fill="#7D4CCF" />
  </svg>
);

/* ─── значки в стиле Twemoji ─────────────────────────────────────────── */
const Books = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden="true">
    <path d="M5 30h26v4H5z" fill="#DD2E44" /><path d="M4 23h28v6H4z" fill="#744EAA" /><path d="M6 16h24v6H6z" fill="#55ACEE" /><path d="M4 9h27v6H4z" fill="#FFAC33" /><path d="M7 3h22v5H7z" fill="#CCD6DD" />
  </svg>
);
const TwFolder = () => (
  <svg width="24" height="24" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M0 29a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V12a4 4 0 0 0-4-4H17l-3-4H4a4 4 0 0 0-4 4z" fill="#226699" />
    <path d="M36 29a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4z" fill="#55ACEE" />
  </svg>
);
const TwNews = () => (
  <svg width="24" height="24" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M32 6H8a3 3 0 0 0-3 3v21a3 3 0 0 1-3-3V13H1v14a4 4 0 0 0 4 4h26a4 4 0 0 0 4-4V9a3 3 0 0 0-3-3z" fill="#99AAB5" />
    <path d="M6 9a3 3 0 0 1 3-3h22a3 3 0 0 1 3 3v18a4 4 0 0 1-4 4H5V9z" fill="#CCD6DD" />
    <path d="M9 10h9v8H9z" fill="#55ACEE" />
    <path d="M20 10h10v2H20zm0 4h10v2H20zM9 20h21v2H9zm0 4h21v2H9z" fill="#99AAB5" />
  </svg>
);
const TwChart = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4z" fill="#CCD6DD" />
    <path d="M5 5h26v26H5z" fill="#E1E8ED" />
    <path d="M8 18h5v11H8z" fill="#5C913B" /><path d="M16 9h5v20h-5z" fill="#3B88C3" /><path d="M24 14h5v15h-5z" fill="#DD2E44" />
  </svg>
);

/* ─── дерево пространств ──────────────────────────────────────────────── */
type TreeKind = 'board' | 'doc' | 'folder' | 'chart' | 'books' | 'emoji';
type TreeItem = { kind: TreeKind; emoji?: string; chev?: boolean; access?: 'globe' | 'team'; extra?: 'books' | 'puzzle'; active?: boolean; label: string };
const TREE: TreeItem[] = [
  { kind: 'emoji', emoji: '😍', chev: true, label: 'Справочный центр «Smart»' },
  { kind: 'board', access: 'globe', label: 'Дашборд руководителя' },
  { kind: 'books', chev: true, access: 'team', label: 'Справочный центр' },
  { kind: 'doc', access: 'team', label: 'Документ' },
  { kind: 'folder', chev: true, access: 'team', extra: 'books', label: 'База знаний' },
  { kind: 'doc', access: 'globe', label: 'Программа на семестры 1-4 Онлайн' },
  { kind: 'board', chev: true, access: 'globe', label: 'Техподдержка' },
  { kind: 'board', label: 'Канбан для разработки' },
  { kind: 'doc', access: 'team', label: 'Знакомство с Kaiten' },
  { kind: 'doc', access: 'team', label: 'Знакомство с Kaiten' },
  { kind: 'board', active: true, label: 'Задачи команды' },
  { kind: 'board', label: 'Бухгалтерия' },
  { kind: 'doc', access: 'globe', label: 'Карта пользовательских сценариев' },
  { kind: 'board', access: 'globe', label: 'Юридический отдел' },
  { kind: 'chart', access: 'team', label: 'Домохозяйство' },
  { kind: 'chart', access: 'team', label: 'Продукт X' },
  { kind: 'folder', chev: true, access: 'team', label: 'Информация' },
  { kind: 'board', access: 'globe', label: 'HR-отдел' },
  { kind: 'board', chev: true, label: 'Инженерная разработка' },
  { kind: 'board', label: 'Руководитель проектов' },
  { kind: 'board', extra: 'puzzle', label: 'Разработка — демо' },
];

function TreeIcon({ it }: { it: TreeItem }) {
  switch (it.kind) {
    case 'emoji': return <span className="app__emoji">{it.emoji}</span>;
    case 'books': return <Books />;
    case 'board': return <I d={APP_ICONS.spaceDashboard} size={22} />;
    case 'doc': return <I d={APP_ICONS.article} size={22} />;
    case 'folder': return <I d={APP_ICONS.folder} size={22} />;
    case 'chart': return <I d={APP_ICONS.assessment} size={22} />;
  }
}

function Tree({ activeLabel }: { activeLabel?: string }) {
  return (
    <aside className="app__tree">
      <div className="app__tree-hd"><span>Дерево</span><I d={APP_ICONS.sidebar} size={22} /></div>
      <div className="app__tree-search">
        <span className="app__tree-input"><I d={APP_ICONS.search} size={26} />Найти..</span>
        <I d={APP_ICONS.add} size={26} />
      </div>
      <div className="app__tree-list">
        {TREE.map((it, i) => (
          <div className={it.active ? 'app__tree-it is-active' : 'app__tree-it'} key={i}>
            <span className="app__tree-ic"><TreeIcon it={it} /></span>
            {it.chev && <I d={APP_ICONS.chevronRight} size={22} className="app__chev" />}
            {it.access && <I d={it.access === 'globe' ? APP_ICONS.public : APP_ICONS.groups} size={it.access === 'globe' ? 21 : 20} className="app__acc" />}
            {it.extra === 'books' && <Books size={18} />}
            {it.extra === 'puzzle' && <span className="app__emoji app__emoji--sm">🧩</span>}
            <span className="app__tree-lbl">{it.active && activeLabel ? activeLabel : it.label}</span>
            {it.active && (
              <span className="app__tree-act"><I d={APP_ICONS.add} size={24} /><I d={APP_ICONS.settings} size={22} /><I d={APP_ICONS.moreVert} size={22} /></span>
            )}
          </div>
        ))}
      </div>
      <span className="app__scroll" aria-hidden="true"><b /><i /></span>
    </aside>
  );
}

/* ─── карточка ───────────────────────────────────────────────────────── */
/** Аватар-портрет на цветном фоне (вместо фотографий сотрудников). */
const Avatar = ({ color }: { color: string }) => (
  <span className="app__av" style={{ background: color }}>
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <path d="M5 28c1-5.2 4.6-8 9-8s8 2.8 9 8z" fill="#fff" opacity=".85" />
      <circle cx="14" cy="12" r="5.2" fill="#f3c9a8" />
      <path d="M8.6 11.6C8.6 7.9 11 6 14 6s5.4 1.9 5.4 5.6c-1.3-1.8-3.4-2.7-5.4-2.7s-4.1.9-5.4 2.7z" fill="#5d4037" />
    </svg>
  </span>
);

function TypeIcon({ icon }: { icon: NonNullable<HsiCard['icon']> }) {
  if (icon === 'dot') return <span className="app__dot" />;
  if (icon === 'folder') return <TwFolder />;
  if (icon === 'chart') return <TwChart />;
  return <TwNews />;
}

function AppCard({ card }: { card: HsiCard }) {
  const c = card.counters;
  return (
    <div className={card.active ? 'app__card is-open' : 'app__card'}>
      {card.blocker && <div className="app__blocker"><span className="app__hand">✋</span><span>{card.blocker.replace(/ /g, ' ')}</span></div>}
      {card.parent && <div className="app__parent">{card.parent}</div>}
      {card.accent && <span className="app__accent" style={{ background: card.accent }} />}
      <div className="app__ct-row">
        {/* типограф склеивает предлоги неразрывным пробелом, а в продукте строки рвутся по обычным */}
        <div className="app__ct">{typeof card.title === 'string' ? card.title.replace(/ /g, ' ') : card.title}</div>
        {card.icon && <span className="app__ti"><TypeIcon icon={card.icon} /></span>}
      </div>
      {c && (
        <div className="app__meta">
          {c.children != null && (
            <span><I d={APP_ICONS.split} size={17} />{c.childrenDone != null ? `${c.childrenDone}/${c.children}` : c.children || ''}</span>
          )}
          {c.attachments != null && <span><I d={APP_ICONS.attach} size={19} />{c.attachments}</span>}
          {c.comments != null && <span><I d={APP_ICONS.comment} size={16} />{c.comments}</span>}
        </div>
      )}
      {card.tags && card.tags.length > 0 && (
        <div className="app__tags">
          {card.tags.map((t, i) => <span key={i} className={`app__tag g-${t.variant ?? 'prod'}`}>{t.label}</span>)}
        </div>
      )}
      {card.checklist && (
        <div className="app__prog"><span>{card.checklist.label}</span><span>{card.checklist.done}/{card.checklist.total}</span></div>
      )}
      <div className="app__foot">
        <span className="app__avs">
          {card.assignees?.map((col, i) => <Avatar key={i} color={col} />)}
          {card.extraAssignee && <span className="app__plus">{card.extraAssignee}</span>}
        </span>
        <span className="app__badges">
          {card.due && (
            <span className={card.dueTone ? `app__due app__due--${card.dueTone}` : 'app__due'}>
              <I d={APP_ICONS.event} size={17} />{card.due}
            </span>
          )}
          {card.urgent && <span className="app__due app__due--red"><I d={APP_ICONS.fire} size={17} />Срочно</span>}
        </span>
      </div>
    </div>
  );
}

/* ─── окно целиком ───────────────────────────────────────────────────── */
export function HsiApp({
  boardTitle,
  spaceTitle,
  columns,
  lanes,
  rightPanel,
  tree = true,
}: {
  boardTitle: string;
  spaceTitle?: string;
  columns: HsiColumnHeader[];
  lanes: HsiLane[];
  /** Окно карточки, пришвартованное к правому краю интерфейса на всю высоту. */
  rightPanel?: React.ReactNode;
  /** Колонка «Дерево» слева. Свернута — доска занимает всю ширину. */
  tree?: boolean;
}) {
  // Доска в режиме appShell — одна дорожка: карточки всех дорожек сводятся в колонки.
  const cols = columns.map((_, ci) => lanes.flatMap((l) => l.columns[ci] ?? []));
  const views = [APP_ICONS.kanbanO, APP_ICONS.grid, APP_ICONS.sort, APP_ICONS.calendarO, APP_ICONS.sync, APP_ICONS.folderO];
  return (
    <div className="app">
      <style dangerouslySetInnerHTML={{ __html: APP_CSS }} />
      <header className="app__top">
        <span className="app__logo"><KaitenMark />Kaiten</span>
        <span className="app__space"><I d={APP_ICONS.spaceDashboard} size={24} />{spaceTitle ?? boardTitle}</span>
        <span className="app__search">Найти<I d={APP_ICONS.search} size={26} /></span>
        <span className="app__ai">Kaiten - AI</span>
        <span className="app__help"><I d={APP_ICONS.help} size={28} /><i /></span>
        <span className="app__me">З<i /></span>
      </header>
      <div className="app__body">
        <nav className="app__rail">
          <span className="app__rail-it"><I d={APP_ICONS.mail} size={26} /><b>36</b></span>
          <span className="app__rail-it"><I d={APP_ICONS.folderShared} size={26} /></span>
          <span className="app__rail-it"><I d={APP_ICONS.star} size={26} /></span>
          <span className="app__rail-it is-active"><I d={APP_ICONS.accountTree} size={26} /></span>
          <span className="app__rail-it"><I d={APP_ICONS.send} size={26} /></span>
          <span className="app__rail-sp" />
          <span className="app__rail-it"><I d={APP_ICONS.boards} size={24} /></span>
          <span className="app__rail-it"><I d={APP_ICONS.adminShield} size={24} /></span>
        </nav>
        {tree && <Tree activeLabel={boardTitle} />}
        <div className="app__main">
          <div className="app__bar">
            <span className="app__seg">
              <span className="app__btn is-on"><I d={APP_ICONS.dashboardO} size={22} />Доски</span>
              {views.map((d, i) => <span className="app__vbtn" key={i}><I d={d} size={24} /></span>)}
            </span>
            <span className="app__btn app__btn--g"><I d={APP_ICONS.insights} size={22} />Отчеты</span>
            <span className="app__btn app__btn--g"><I d={APP_ICONS.archiveDown} size={20} />Архив</span>
            <span className="app__btn app__btn--add"><I d={APP_ICONS.add} size={24} />Добавить</span>
            <span className="app__bar-r">
              <span className="app__btn app__btn--g"><I d={APP_ICONS.filter} size={22} />Фильтры</span>
              <span className="app__btn app__btn--g app__btn--ic"><I d={APP_ICONS.cards} size={22} /></span>
              <span className="app__btn app__btn--g app__btn--ic"><I d={APP_ICONS.dblUp} size={22} /></span>
              <span className="app__btn app__btn--g app__btn--ic"><I d={APP_ICONS.starO} size={22} /></span>
            </span>
          </div>
          <div className="app__work">
            <div className="app__area">
              <section className="app__board">
                <div className="app__bhd">
                  <span className="app__grip"><i /><i /><i /><i /><i /><i /></span>
                  <span className="app__bnm">{boardTitle}</span>
                  <I d={APP_ICONS.expandLess} size={24} className="app__bchev" />
                </div>
                <div className="app__cols">
                  {columns.map((col, ci) => (
                    <div className="app__col" key={ci}>
                      <div className="app__chd">
                        {col.done && <I d={APP_ICONS.check} size={20} className="app__chk" />}
                        <span className="app__cnm">{col.label}</span>
                        {col.count != null && <span className="app__cnt">{col.count}</span>}
                      </div>
                      <div className="app__cards">
                        {(cols[ci] ?? []).map((card, ki) => <AppCard card={card} key={ki} />)}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <nav className="app__rail app__rail--r">
              {[APP_ICONS.peopleO, APP_ICONS.avTimer, APP_ICONS.history, APP_ICONS.filterNone, APP_ICONS.brightnessAutoO, APP_ICONS.block, APP_ICONS.camera, APP_ICONS.shareO, APP_ICONS.schema].map((d, i) => (
                <span className="app__rail-it" key={i}><I d={d} size={24} /></span>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {rightPanel && <aside className="app__cw">{rightPanel}</aside>}
    </div>
  );
}

/* Цвета и размеры сняты с эталонного экрана 1920×1080. */
const APP_CSS = `
.hsi.hsi--app{zoom:.6333333}
@media(max-width:1279px){.hsi.hsi--app{zoom:.48}}
@media(max-width:980px){.hsi.hsi--app{zoom:.354}}
@media(max-width:767px){.hsi.hsi--app{zoom:.3}}
@media(max-width:600px){.hsi.hsi--app{zoom:.24}}
@media(max-width:480px){.hsi.hsi--app{zoom:.18}}
@media(max-width:384px){.hsi.hsi--app{zoom:.14}}
.hsi .app{--chrome:#ebefef;--line:#ced2d2;--ink:#1e1f1f;--ic:#6c6e6e;--brand:#9c27b0;--btn:#d1d4d4;
  position:relative;width:1920px;height:1000px;flex:0 0 auto;display:flex;flex-direction:column;background:var(--chrome);border:1px solid #dcdfdf;border-radius:16px;overflow:hidden;
  box-shadow:0 2px 12px rgba(45,45,45,.10);font-family:'Roboto',system-ui,-apple-system,'Segoe UI',sans-serif;color:var(--ink);font-size:15px;line-height:1.35;letter-spacing:.15px}
.hsi .app svg{flex:none;display:block}
/* окно карточки у правого края: на всю высоту под шапкой, как выехавшая панель в продукте */
/* Окно карточки крупнее доски в --cw-k раз и масштабируется ВМЕСТЕ с ней:
   zoom задан относительно интерфейса, а не экрана, поэтому на узких
   ширинах окно ужимается пропорционально. Раскладка внутри считается от width.
   Отступы делим на --cw-k, чтобы остались в единицах интерфейса. */
/* карточка, открытая в окне справа, подсвечена фиолетовой обводкой */
.hsi .app__card.is-open{border-color:#7d4ccf}
.hsi .app__cw{--cw-k:1.232;position:absolute;zoom:var(--cw-k);
  top:calc(108px / var(--cw-k));right:calc(57px / var(--cw-k));bottom:0;
  width:486px;display:flex;z-index:5;box-shadow:-18px 0 44px -24px rgba(45,45,45,.28)}
/* окно приходит двухколоночным — в узкой панели складываем в один столбик */
.hsi .app__cw>*{width:100%;height:100%;border-radius:0;box-shadow:none;
  grid-template-columns:1fr;grid-auto-rows:max-content;align-content:start;
  overflow-y:scroll;overflow-x:hidden}
/* полоса прокрутки у правой кромки окна — контент длиннее панели */
.hsi .app__cw>*::-webkit-scrollbar{width:13px}
.hsi .app__cw>*::-webkit-scrollbar-track{background:#f1f1f1}
.hsi .app__cw>*::-webkit-scrollbar-thumb{background:#c3c3c3;border-radius:7px;border:3px solid #f1f1f1}
.hsi .app__cw>*>:first-child{border-right:0;border-bottom:1px solid var(--line)}
/* поля и лента идут во всю ширину панели — держим одинаковые поля по бокам */
.hsi .app__cw>*>*{padding-left:24px;padding-right:24px}
/* подпись под именем файла — на 2px ниже */
.hsi .app__cw .min-w-0>div+div{margin-top:2px}
/* в ленте тот же зазор чуть больше: пузырь под именем автора */
.hsi .app__cw>*>:last-child .min-w-0>div+div{margin-top:4px}
/* поле «Напишите комментарий» — текст не липнет к рамке */
.hsi .app__cw>*>:last-child [class*="flex-1"][class*="h-8"]{padding-left:16px}
/* лента комментариев дышит: между репликами и вокруг строки фильтра */
.hsi .app__cw>*>:last-child [class*="space-y-3.5"]>div+div{margin-top:20px}
.hsi .app__cw>*>:last-child [class*="space-y-3.5"]{margin-top:20px}
.hsi .app__cw>*>:last-child [class*="mb-3"]{margin-bottom:16px}
/* пузыри реплик — просторнее внутри */
.hsi .app__cw>*>:last-child [class*="space-y-3.5"] [class*="px-3"]{padding:9px 12px}
/* вертикальные отступы — родные, как в самом окне карточки */
.hsi .app__cw>*>:last-child{padding-top:0;padding-bottom:0}
/* заголовок карточки: помельче и с воздухом над ним */
.hsi .app__cw h3{font-size:17px;line-height:1.3;font-weight:500}
/* подзаголовки под названием — номер карточки и «создана / перемещена» — мельче */
.hsi .app__cw>*>:first-child>div[class*="mt-1.5"]{font-size:12px}
.hsi .app__cw>*>:first-child{padding-top:24px;padding-bottom:22px}
/* группы карточки — «Описание», «Файлы», «Подготовка», «Связи» — разделяем воздухом */
.hsi .app__cw>*>:first-child>.mt-4{margin-top:20px}
/* содержимое групп — описание, файл, прогресс, чек-боксы — отодвигаем от заголовка группы */
.hsi .app__cw>*>:first-child>[class*="mt-2"]{margin-top:12px}
/* заголовки групп сдвинуты левее, чтобы шевроны сворачивания выступали */
.hsi .app__cw>*>:first-child>[class*="-ml-"]{margin-left:-13px}
/* фильтр и кнопки режимов в строке «Связи» — к правому краю */
.hsi .app__cw>*>:first-child>[class*="-ml-"]>span:last-child{margin-left:auto}
/* пункты чек-листа — чуть свободнее друг от друга */
.hsi .app__cw>*>:first-child>ul>li+li{margin-top:9px}
/* строки параметров разной высоты (плашка «Материал», аватарки) — ровняем,
   иначе шаг между «Расположение / Тип / Участники / Срок / Метки» гуляет */
.hsi .app__cw dl>*{min-height:29px}
/* строка действий («+ … На согласовании») — отодвигаем от подзаголовка */
.hsi .app__cw>*>:first-child>.mt-3{margin-top:22px}
/* кнопка «Скрыть отмеченные» в строке прогресса — пошире */
.hsi .app__cw>*>:first-child>div.mt-2>span:last-child{padding-left:14px;padding-right:14px}
/* плашки «Материал» и «Маркетинг» — пошире (чип «Ответственный» не трогаем:
   у него аватарка прижата к левой кромке) */
.hsi .app__cw dl dd span[class*="px-2.5"]{padding-left:12px;padding-right:12px}
/* плашка статуса «На согласовании» — пошире */
.hsi .app__cw>*>:first-child>.mt-3>span[class*="px-4"]{padding-left:15px;padding-right:15px}
/* шапка */
.hsi .app__top{position:relative;height:54px;flex:none;border-bottom:1px solid var(--line)}
.hsi .app__top>*{position:absolute;top:0;height:53px;display:flex;align-items:center}
.hsi .app__logo{left:13px;gap:9px;font-size:23px;font-weight:500;letter-spacing:0;color:var(--ink)}
.hsi .app__space{left:132px;gap:15px;font-size:15.5px;font-weight:500;letter-spacing:.3px}
.hsi .app__space svg{color:var(--ic)}
.hsi .app__search{left:788px;top:9px;width:344px;height:35px;justify-content:space-between;padding:0 16px 0 14px;background:#dde1e1;border-radius:4px;font-size:18px;color:#585a5a;letter-spacing:.3px}
.hsi .app__ai{left:1702px;top:9px;width:93px;height:35px;justify-content:center;border-radius:4px;background:linear-gradient(90deg,#b26cc9,#31c5db);color:#fff;font-size:15.5px;font-weight:500;letter-spacing:.2px}
.hsi .app__help{left:1816px;color:var(--ic)}
.hsi .app__help i{position:absolute;left:23px;top:8px;width:9px;height:9px;border-radius:50%;background:var(--brand)}
.hsi .app__me{left:1874px;top:9px;width:35px;height:35px;border-radius:50%;background:#ccc;color:#fff;justify-content:center;font-size:21px;font-weight:300}
.hsi .app__me i{position:absolute;right:-2px;top:-2px;width:10px;height:10px;border-radius:50%;background:#f44336}
/* тело */
.hsi .app__body{flex:1;min-height:0;display:flex}
.hsi .app__rail{width:57px;flex:none;display:flex;flex-direction:column;align-items:center;gap:11px;padding:3px 0 8px;border-right:1px solid var(--line);color:var(--ic)}
.hsi .app__rail-it{position:relative;width:42px;height:42px;display:flex;align-items:center;justify-content:center;border-radius:8px}
.hsi .app__rail-it.is-active{background:#e1d7e7;color:var(--brand)}
.hsi .app__rail-it b{position:absolute;left:21px;top:0;min-width:24px;height:16px;padding:0 5px;border-radius:8px;background:var(--brand);color:#fff;font-size:11.5px;font-weight:700;letter-spacing:0;display:flex;align-items:center;justify-content:center}
.hsi .app__rail-sp{flex:1}
.hsi .app__rail--r{width:57px;border-right:0;border-left:1px solid var(--line);gap:15px;padding-top:18px}
/* дерево */
.hsi .app__tree{position:relative;width:375px;flex:none;display:flex;flex-direction:column;border-right:1px solid var(--line);padding:11px 0 0 13px;overflow:hidden}
.hsi .app__tree-hd{height:26px;display:flex;align-items:center;justify-content:space-between;padding-right:20px;font-size:18px;font-weight:500;color:#2d2d2d;letter-spacing:.2px}
.hsi .app__tree-hd svg{color:var(--ic)}
.hsi .app__tree-search{display:flex;align-items:center;gap:15px;margin:20px 20px 10px 0;color:var(--ic)}
.hsi .app__tree-input{width:302px;height:43px;display:flex;align-items:center;gap:12px;padding:0 10px;background:#d7dada;border-radius:4px;font-size:17px;color:#939595;letter-spacing:.3px}
.hsi .app__tree-list{flex:1;overflow:hidden;padding-right:34px}
.hsi .app__tree-it{height:44px;display:flex;align-items:center;padding-left:9px;font-size:15.5px;color:var(--ink);white-space:nowrap;letter-spacing:.3px}
.hsi .app__tree-ic{width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;color:var(--ic);margin-right:9px}
.hsi .app__chev{color:var(--ic);margin:0 5px 0 -3px}
.hsi .app__acc{color:var(--ic);margin-right:5px}
.hsi .app__tree-it>svg+svg:not(.app__chev):not(.app__acc){margin-right:8px}
.hsi .app__emoji{font-size:20px;line-height:1}
.hsi .app__emoji--sm{font-size:17px;margin-right:6px}
.hsi .app__tree-lbl{overflow:hidden;text-overflow:ellipsis}
/* Открытое пространство в дереве: плашка на всю строку и действия справа */
.hsi .app__tree-it.is-active{background:#e1d7e7;border-radius:6px;margin-right:-4px}
.hsi .app__tree-act{margin-left:auto;display:flex;align-items:center;gap:12px;padding:0 8px 0 12px;color:#1e1f1f}
.hsi .app__scroll{position:absolute;right:14px;top:111px;bottom:0;width:12px;background:#dcdfdf}
.hsi .app__scroll b{position:absolute;left:2px;top:4px;border:4px solid transparent;border-bottom:5px solid #a3a5a5;border-top:0}
.hsi .app__scroll i{position:absolute;left:2px;right:2px;top:232px;height:588px;border-radius:4px;background:#b3b5b5}
/* основная область */
.hsi .app__main{flex:1;min-width:0;display:flex;flex-direction:column}
.hsi .app__bar{height:53px;flex:none;display:flex;align-items:center;gap:6px;padding:0 11px 1px 8px;border-bottom:1px solid #d1d3d3}
.hsi .app__seg{height:46px;display:flex;align-items:center;padding:0 3px 0 6px;border:1px solid #d6dada;border-radius:14px}
.hsi .app__vbtn{position:relative;width:49px;height:34px;display:flex;align-items:center;justify-content:center;color:var(--ink)}
.hsi .app__vbtn+.app__vbtn::before{content:"";position:absolute;left:0;top:7px;bottom:7px;border-left:1px solid #d1d4d4}
.hsi .app__btn{height:35px;display:inline-flex;align-items:center;gap:5px;padding:0 10px 0 8px;border-radius:8px;font-size:16.5px;color:#1b1b1b;white-space:nowrap;letter-spacing:.5px}
.hsi .app__btn svg{color:var(--ink)}
.hsi .app__btn.is-on{width:98px;padding:0 12px 0 9px;background:var(--btn)}
.hsi .app__btn--g{background:#d0d4d4}
.hsi .app__seg+.app__btn{width:99px;margin-left:0}
.hsi .app__seg+.app__btn+.app__btn{width:92px;margin-left:1px}
.hsi .app__btn--add{width:122px;margin-left:0;background:var(--brand);color:#fff;font-weight:500;padding:0 12px 0 8px;gap:3px;letter-spacing:.3px}
.hsi .app__btn--add svg{color:#fff}
.hsi .app__btn--ic{width:34px;padding:0;justify-content:center}
.hsi .app__bar-r{margin-left:auto;display:flex;gap:8px}
.hsi .app__bar-r .app__btn:first-child{width:112px}
.hsi .app__work{flex:1;min-height:0;display:flex}
.hsi .app__area{flex:1;min-width:0;background:#f0f0f3;padding:8px 0 0 9px}
/* доска */
.hsi .app__board{margin-right:9px;height:100%;display:flex;flex-direction:column;background:#f8f9fb;border:1px solid #e4e7ec;border-bottom:0;border-radius:8px 8px 0 0}
.hsi .app__bhd{height:40px;flex:none;display:flex;align-items:center;gap:14px;padding:0 24px 0 11px}
.hsi .app__grip{display:grid;grid-template-columns:repeat(2,3.5px);gap:3.5px}
.hsi .app__grip i{width:3.5px;height:3.5px;border-radius:50%;background:var(--ic);display:block}
.hsi .app__bnm{font-size:18.5px;font-weight:500;color:#202020;letter-spacing:.2px}
.hsi .app__bchev{margin-left:auto;color:#636464}
/* Доска растянута на всю рабочую область: колонки делят ширину поровну */
.hsi .app__cols{flex:1;min-height:0;display:flex;padding:0 9px 0 23px}
.hsi .app__col{flex:1 1 0;min-width:0;padding:0 14px;display:flex;flex-direction:column}
.hsi .app__col:first-child{padding-left:0}
.hsi .app__col:last-child{padding-right:14px}
.hsi .app__col+.app__col{border-left:1px solid #dadbdc}
.hsi .app__chd{height:26px;flex:none;display:flex;align-items:center;gap:5px;padding-left:8px;margin-top:0}
.hsi .app__cnm{font-size:15.5px;font-weight:500;color:#202020;letter-spacing:.3px}
.hsi .app__chk{color:#202020;margin-left:-4px}
.hsi .app__cnt{margin-left:auto;min-width:26px;height:21px;padding:.6px 6px 0;border-radius:4px;background:#757575;color:#fff;font-size:14px;font-weight:700;line-height:1;display:inline-flex;align-items:center;justify-content:center}
.hsi .app__cards{display:flex;flex-direction:column;gap:10px;padding-top:9px}
.hsi .app__card{position:relative;background:#fff;border:1px solid #e0e0e0;border-radius:4px;padding:9px 9px 12px;display:flex;flex-direction:column;gap:12px}
.hsi .app__accent{display:block;width:52px;height:4px;border-radius:2px;margin:1px 0 -7px}
.hsi .app__ct-row{display:flex;align-items:flex-start;gap:10px}
.hsi .app__ct{flex:1;font-size:15.5px;line-height:20.5px;color:#212121;letter-spacing:.2px}
.hsi .app__ti{display:inline-flex;margin:0 5px 0 0}
.hsi .app__dot{width:22px;height:22px;border-radius:50%;background:#78b159;flex:none;margin-top:0}
.hsi .app__meta{display:flex;gap:10px;color:#9e9e9e;font-size:13.5px;margin:-4px 0 -2px;letter-spacing:.3px}
.hsi .app__meta span{display:inline-flex;align-items:center;gap:4px}
.hsi .app__tags{display:flex;gap:6px;flex-wrap:wrap}
.hsi .app__tag{height:25px;display:inline-flex;align-items:center;padding:0 13px;border-radius:13px;font-size:14.5px;color:#424242;letter-spacing:.4px}
.hsi .g-peach{background:#ffe0b2}
.hsi .g-lime,.hsi .g-ok{background:#dcedc8}
.hsi .g-pink,.hsi .g-urg{background:#f8bbd0}
.hsi .g-sky,.hsi .g-blue{background:#b3e5fc}
.hsi .g-prod{background:#eeeeee}
.hsi .g-cx{background:#fff9c4}
.hsi .g-big,.hsi .g-jud{background:#e1bee7}
.hsi .app__prog{display:flex;justify-content:space-between;background:#f5f5f5;padding:2px 4px 3px;margin:-4px 0 -2px;font-size:13.5px;color:#757575;letter-spacing:.5px}
.hsi .app__foot{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:28px}
.hsi .app__avs{display:flex;align-items:center;gap:7px}
.hsi .app__av{width:28px;height:28px;border-radius:50%;overflow:hidden;display:inline-flex;box-shadow:0 0 0 1.5px #c792d8}
.hsi .app__av svg{width:28px;height:28px}
.hsi .app__plus{font-size:13.5px;color:#666;margin-left:1px;letter-spacing:.3px}
.hsi .app__badges{display:flex;gap:4px}
.hsi .app__due{display:inline-flex;align-items:center;gap:5px;font-size:13.5px;font-weight:500;color:#9e9e9e;letter-spacing:.6px}
.hsi .app__due--red,.hsi .app__due--orange{height:25px;padding:0 7px 0 6px;border-radius:6px;color:#fff;font-weight:700;letter-spacing:.4px}
.hsi .app__due--red{background:#e57373}
.hsi .app__due--orange{background:#ff9800}
.hsi .app__blocker{display:flex;align-items:center;gap:8px;background:#e53935;color:#fff;border-radius:6px;padding:8px 5px 9px 10px;margin-bottom:-2px;font-size:13px;font-weight:700;line-height:18px;letter-spacing:0}
.hsi .app__hand{font-size:20px;line-height:1}
.hsi .app__parent{border:1px solid #e0e0e0;border-radius:4px;padding:13px 9px;margin-bottom:-2px;font-size:15.5px;letter-spacing:.35px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
`;
