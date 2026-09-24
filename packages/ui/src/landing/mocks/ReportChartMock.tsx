'use client';

import { DIAGRAMS_STYLE, DIAGRAM_CARDS } from './Diagram';

/**
 * ReportChartMock — одна диаграмма отчета Кайтена в белой карточке, для
 * карточек фич (FeatureGrid `items[].mockVariant: 'report-chart-*'`).
 *
 * Шесть диаграмм берутся из сетки `Diagrams` (Diagram.tsx), чтобы графики
 * на лендингах не расходились. Две дорисованы здесь в той же манере:
 * время разрешения блокировок (дни в блокировке по причинам) и время цикла
 * (дни на каждом этапе доски, самый долгий этап выделен).
 *
 * Стили — те же scoped-правила `.diagrams-mock`, данные захардкожены.
 */

export type ReportChartKind =
  | 'burndown'
  | 'velocity'
  | 'control'
  | 'cfd'
  | 'spectral'
  | 'throughput'
  | 'blocked'
  | 'cycle-time';

const GRID =
  '<g stroke="#eee" stroke-width="1"><line x1="6" y1="30" x2="274" y2="30"></line><line x1="6" y1="60" x2="274" y2="60"></line><line x1="6" y1="90" x2="274" y2="90"></line><line x1="6" y1="120" x2="274" y2="120"></line></g>';

const swatch = (color: string, label: string) =>
  `<span><i style="width:8px;height:8px;border-radius:2px;background:${color};flex:none"></i>${label}</span>`;

// Дни в блокировке по причинам: самая долгая причина сверху, норма — до 3 дней.
const BLOCKED_ROWS: { reason: string; days: number; color: string }[] = [
  { reason: 'Ждем доступ к серверу', days: 5, color: '#ee6b5f' },
  { reason: 'Нет ответа от заказчика', days: 3.5, color: '#ee6b5f' },
  { reason: 'Зависимая задача', days: 2, color: '#5aa5e8' },
  { reason: 'Ревью безопасности', days: 1, color: '#5aa5e8' },
];

function blockedCard(): string {
  const bars = BLOCKED_ROWS.map((r, i) => {
    const y = 18 + i * 34;
    const w = Math.round((r.days / 5) * 220);
    const days = String(r.days).replace('.', ',');
    return (
      `<text x="6" y="${y}" font-size="10" fill="#757575">${r.reason}</text>` +
      `<rect x="6" y="${y + 5}" width="${w}" height="12" rx="2" fill="${r.color}"></rect>` +
      `<text x="${w + 12}" y="${y + 15}" font-size="10" font-weight="600" fill="#2d2d2d">${days} д</text>`
    );
  }).join('');
  return (
    '<div class="rept"><div class="rept__t">Время разрешения блокировок</div>' +
    `<svg viewBox="0 0 280 150" role="img" aria-label="Время разрешения блокировок">${bars}` +
    '<line x1="6" y1="138" x2="274" y2="138" stroke="#e0e0e0" stroke-width="1"></line></svg>' +
    `<div class="rept__lg">${swatch('#ee6b5f', 'Дольше нормы')}${swatch('#5aa5e8', 'В пределах нормы')}</div></div>`
  );
}

// Среднее число дней на этапе доски; самый долгий этап — узкое место.
const CYCLE_STAGES: { stage: string; days: number }[] = [
  { stage: 'Очередь', days: 1.2 },
  { stage: 'Анализ', days: 1.8 },
  { stage: 'В работе', days: 4.6 },
  { stage: 'Ревью', days: 2.9 },
  { stage: 'Тест', days: 1.4 },
];

function cycleTimeCard(): string {
  const longest = Math.max(...CYCLE_STAGES.map((s) => s.days));
  const bars = CYCLE_STAGES.map((s, i) => {
    const x = 14 + i * 54;
    const h = Math.round(s.days * 21);
    const y = 124 - h;
    const color = s.days === longest ? '#9569d4' : '#5aa5e8';
    const days = String(s.days).replace('.', ',');
    return (
      `<rect x="${x}" y="${y}" width="36" height="${h}" rx="2" fill="${color}"></rect>` +
      `<text x="${x + 18}" y="${y - 5}" font-size="10" font-weight="600" fill="#2d2d2d" text-anchor="middle">${days}</text>` +
      `<text x="${x + 18}" y="140" font-size="9.5" fill="#757575" text-anchor="middle">${s.stage}</text>`
    );
  }).join('');
  return (
    '<div class="rept"><div class="rept__t">Время цикла</div>' +
    `<svg viewBox="0 0 280 150" role="img" aria-label="Время цикла">${GRID}${bars}` +
    '<line x1="6" y1="124" x2="274" y2="124" stroke="#e0e0e0" stroke-width="1"></line></svg>' +
    `<div class="rept__lg">${swatch('#5aa5e8', 'Дней на этапе')}${swatch('#9569d4', 'Самый долгий этап')}</div></div>`
  );
}

const CARDS: Record<ReportChartKind, string> = {
  burndown: DIAGRAM_CARDS[0] ?? '',
  velocity: DIAGRAM_CARDS[1] ?? '',
  // В сетке диаграмма подписана «Время выполнения задач» — на странице отчетов это контрольный график.
  control: (DIAGRAM_CARDS[2] ?? '').replace(
    '<div class="rept__t">Время выполнения задач</div>',
    '<div class="rept__t">Контрольный график</div>',
  ),
  cfd: DIAGRAM_CARDS[3] ?? '',
  spectral: DIAGRAM_CARDS[4] ?? '',
  throughput: DIAGRAM_CARDS[5] ?? '',
  blocked: blockedCard(),
  'cycle-time': cycleTimeCard(),
};

const LOCAL_STYLE = `
.diagrams-mock.report-chart{max-width:440px; margin:0 auto;}
.report-chart .rept{border:0; box-shadow:0 1px 2px rgba(45,45,45,.04), 0 6px 18px -8px rgba(45,45,45,.12);}
.report-chart .rept svg text{font-family:inherit;}
`;

export function ReportChartMock({ kind }: { kind: ReportChartKind }) {
  return (
    <div aria-hidden className="diagrams-mock is-headless report-chart">
      <style dangerouslySetInnerHTML={{ __html: DIAGRAMS_STYLE + LOCAL_STYLE }} />
      <div dangerouslySetInnerHTML={{ __html: CARDS[kind] }} />
    </div>
  );
}

export default ReportChartMock;
