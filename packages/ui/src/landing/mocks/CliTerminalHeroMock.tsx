import { cn } from '../../primitives/cn';

/**
 * Сигнатурный визуал лендинга «Kaiten CLI»: окно терминала, в котором инженер
 * открывает карточку Kaiten как файл Markdown и тут же читает её в JSON.
 * Показывает суть инструмента — привычные действия с Kaiten прямо в командной
 * строке. Данные захардкожены (бриф «Kaiten CLI»). Домен: cli-community-edition.
 *
 * Раскладка: светлый window-chrome (в палитре V01) + тёмное тело кода на
 * нейтральных DS-токенах; синтаксис подсвечен акцентами дизайн-системы.
 */
export function CliTerminalHeroMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative mx-auto w-full max-w-[720px] overflow-hidden rounded-(--radius-3xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_30px_80px_-30px_rgba(125,76,207,0.30)]',
      )}
    >
      <TerminalChrome title="kaiten — zsh" />

      <div className="space-y-2.5 bg-(--color-neutral-950) px-5 py-5 font-mono text-[12px] leading-relaxed md:text-[13px]">
        {/* команда: экспорт карточки в Markdown */}
        <div className="flex flex-wrap items-baseline gap-x-2">
          <Prompt />
          <span className="text-(--color-neutral-000)">kaiten cards get</span>
          <Flag>--card-id</Flag>
          <span className="text-(--color-blue-100)">123</span>
          <Flag>--markdown</Flag>
          <Flag>--output</Flag>
          <Path>./card.md</Path>
        </div>
        <OkLine>
          сохранено <Path>./card-123-oformit-pereezd.md</Path>
        </OkLine>

        {/* команда: чтение той же карточки в JSON */}
        <div className="flex flex-wrap items-baseline gap-x-2 pt-1.5">
          <Prompt />
          <Flag>--json</Flag>
          <span className="text-(--color-neutral-000)">kaiten cards get</span>
          <Flag>--card-id</Flag>
          <span className="text-(--color-blue-100)">123</span>
        </div>
        <JsonBlock />

        {/* строка статистики выполнения */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-(--color-neutral-500)">
          <span className="text-(--color-neutral-400)">stats</span>
          <span>·</span>
          <span>http_request_count: <span className="text-(--color-green-100)">1</span></span>
          <span>·</span>
          <span>cache: <span className="text-(--color-green-100)">hit</span></span>
        </div>

        {/* строка ввода с курсором */}
        <div className="flex items-center gap-x-2 pt-1.5">
          <Prompt />
          <span className="inline-block h-[15px] w-[8px] animate-pulse bg-(--color-neutral-000)/80" />
        </div>
      </div>
    </div>
  );
}

function JsonBlock() {
  return (
    <div className="whitespace-pre-wrap break-words pl-1 text-(--color-neutral-400)">
      <span>{'{ '}</span>
      <Jkey>"id"</Jkey>: <span className="text-(--color-blue-100)">123</span>,{' '}
      <Jkey>"title"</Jkey>:{' '}
      <JStr>"Оформить переезд команды"</JStr>,{'\n'}
      {'  '}
      <Jkey>"column"</Jkey>: <JStr>"В работе"</JStr>,{' '}
      <Jkey>"checklist"</Jkey>: <JStr>"3/5"</JStr>,{' '}
      <Jkey>"assignee"</Jkey>: <JStr>"Анна Петрова"</JStr>{' }'}
    </div>
  );
}

/* — переиспользуемые части терминала — */

export function TerminalChrome({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-(--color-border-default) bg-(--color-surface-section) px-4 py-3">
      <span className="h-2.5 w-2.5 rounded-full bg-(--color-red-100)" />
      <span className="h-2.5 w-2.5 rounded-full bg-(--color-lime-100)" />
      <span className="h-2.5 w-2.5 rounded-full bg-(--color-green-100)" />
      <span className="ml-2 inline-flex items-center gap-1.5 text-xs font-medium text-(--color-text-secondary)">
        <TerminalGlyph />
        {title}
      </span>
    </div>
  );
}

export function Prompt() {
  return <span className="select-none text-(--color-green-100)">$</span>;
}

export function Flag({ children }: { children: React.ReactNode }) {
  return <span className="text-(--color-neutral-500)">{children}</span>;
}

export function Path({ children }: { children: React.ReactNode }) {
  return <span className="text-(--color-green-100)">{children}</span>;
}

export function OkLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-2 text-(--color-neutral-400)">
      <CheckGlyph />
      <span>{children}</span>
    </div>
  );
}

function JKeyFactory(className: string) {
  return function J({ children }: { children: React.ReactNode }) {
    return <span className={className}>{children}</span>;
  };
}
const Jkey = JKeyFactory('text-(--color-violet-100)');
const JStr = JKeyFactory('text-(--color-green-100)');

/* — глифы — */
function TerminalGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-(--color-text-accent)">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9l3 3-3 3M13 15h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="shrink-0 translate-y-0.5 text-(--color-green-100)">
      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
