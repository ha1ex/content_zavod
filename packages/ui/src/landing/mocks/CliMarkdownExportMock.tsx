import { cn } from '../../primitives/cn';
import { Prompt, Flag, Path, OkLine } from './CliTerminalHeroMock';

/**
 * Главный сценарий Kaiten CLI: карточка или документ открывается там же, где
 * идёт работа. Слева — терминал с командой экспорта документа в Markdown,
 * справа — получившийся файл .md с заголовком, чек-листом и ссылкой на
 * вложение в формате API Kaiten. Домен: cli-community-edition.
 */
export function CliMarkdownExportMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative mx-auto w-full max-w-[760px] overflow-hidden rounded-(--radius-3xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_30px_80px_-30px_rgba(125,76,207,0.28)] p-4 md:p-5',
      )}
    >
      <div className="grid items-stretch gap-4 md:grid-cols-[1.05fr_0.95fr]">
        {/* — терминал — */}
        <div className="overflow-hidden rounded-(--radius-xl) border border-(--color-border-default)">
          <div className="space-y-2 bg-(--color-neutral-950) px-4 py-4 font-mono text-[11.5px] leading-relaxed">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <Prompt />
              <Flag>--json</Flag>
              <span className="text-(--color-neutral-000)">documents get</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-2 pl-3">
              <Flag>--document-uid</Flag>
              <span className="text-(--color-blue-100)">d1f7a2</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-2 pl-3">
              <Flag>--markdown</Flag>
              <Flag>--output</Flag>
              <Path>./reglament.md</Path>
            </div>
            <OkLine>
              <Path>./reglament-pereezda.md</Path>
            </OkLine>
            <div className="pt-0.5 pl-1 text-(--color-neutral-500)">
              вложения → формат API Kaiten
            </div>
          </div>
        </div>

        {/* — готовый файл .md — */}
        <MarkdownFile />
      </div>
    </div>
  );
}

function MarkdownFile() {
  return (
    <div className="flex flex-col overflow-hidden rounded-(--radius-xl) border border-(--color-border-default) bg-(--color-surface-card)">
      {/* вкладка файла */}
      <div className="flex items-center gap-2 border-b border-(--color-border-default) bg-(--color-surface-section) px-3.5 py-2.5">
        <MarkdownGlyph />
        <span className="font-mono text-[11px] font-medium text-(--color-text-primary)">
          reglament-pereezda.md
        </span>
      </div>

      <div className="flex-1 space-y-3 px-4 py-4">
        {/* заголовок markdown */}
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-sm font-bold text-(--color-text-accent)">#</span>
          <span className="text-sm font-semibold text-(--color-text-primary)">
            Регламент переезда команды
          </span>
        </div>

        {/* абзац-плейсхолдер */}
        <div className="space-y-1.5">
          <span className="block h-2 w-full rounded-full bg-(--color-neutral-200)" />
          <span className="block h-2 w-[88%] rounded-full bg-(--color-neutral-200)" />
          <span className="block h-2 w-[64%] rounded-full bg-(--color-neutral-200)" />
        </div>

        {/* чек-лист */}
        <div className="space-y-1.5 pt-0.5">
          <ChecklistRow done>Экспортировать доски из прежней системы</ChecklistRow>
          <ChecklistRow done>Сверить список задач с командой</ChecklistRow>
          <ChecklistRow>Назначить ответственных на дорожки</ChecklistRow>
        </div>

        {/* ссылка на вложение */}
        <div className="rounded-lg border border-(--color-border-default) bg-(--color-surface-section) px-2.5 py-2">
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-(--color-text-secondary)">
            <PaperclipGlyph />
            вложение
          </div>
          <div className="mt-1 break-all font-mono text-[10px] text-(--color-text-accent)">
            /api/documents/d1f7a2/files/9c04e1
          </div>
        </div>
      </div>
    </div>
  );
}

function ChecklistRow({ children, done }: { children: React.ReactNode; done?: boolean }) {
  return (
    <div className="flex items-start gap-2 text-[11px] leading-snug">
      <span
        className={cn(
          'mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[4px] border',
          done
            ? 'border-(--color-green-100) bg-(--color-green-100) text-(--color-neutral-000)'
            : 'border-(--color-border-strong) bg-(--color-surface-card)',
        )}
      >
        {done ? (
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
            <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </span>
      <span className={done ? 'text-(--color-text-secondary) line-through' : 'text-(--color-text-primary)'}>
        {children}
      </span>
    </div>
  );
}

/* — глифы — */
function MarkdownGlyph() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-(--color-text-accent)">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 15V9l3 3 3-3v6M17.5 9v4.5M15.5 12.5l2 2 2-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PaperclipGlyph() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-(--color-text-secondary)">
      <path d="M21 11.5l-8.5 8.5a5 5 0 01-7-7l8.5-8.5a3.3 3.3 0 014.7 4.7l-8.5 8.5a1.7 1.7 0 01-2.4-2.4l7.8-7.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
