import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

const TOOLBAR = [
  { icon: 'Heading1', label: 'H1' },
  { icon: 'Heading2', label: 'H2' },
  { icon: 'List', label: 'Список' },
  { icon: 'ListChecks', label: 'Чек-лист' },
  { icon: 'Table2', label: 'Таблица' },
  { icon: 'Quote', label: 'Цитата' },
  { icon: 'Code2', label: 'Код' },
  { icon: 'Image', label: 'Картинка' },
];

const OUTLINE = [
  { text: 'Что считать инцидентом', active: true },
  { text: 'Шаги реакции', active: false },
  { text: 'Чек-лист дежурного', active: false },
  { text: 'Команды и контакты', active: false },
  { text: 'Что писать в постмортеме', active: false },
];

/**
 * Mock редактора документа с разнотипными блоками (H1, текст, чек-лист, таблица,
 * цитата, блок кода) и боковым оглавлением. Тон: «документ из разных блоков
 * собирается под задачу — текст, таблица, код, чек-лист в одном месте».
 */
export function DocEditorRichMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-(--radius-3xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_30px_80px_-30px_rgba(125,76,207,0.30)]',
      )}
    >
      {/* window chrome */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-(--color-border-default) bg-(--color-surface-section) px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-red-300" />
        <span className="h-2 w-2 rounded-full bg-yellow-300" />
        <span className="h-2 w-2 rounded-full bg-green-300" />
        <div className="ml-2 flex flex-wrap items-center gap-3 text-[11px] text-(--color-text-secondary)">
          <span className="font-medium text-(--color-text-primary)">Документ · Регламент реакции на инцидент</span>
          <span>Версия от 14 мая</span>
        </div>
      </div>

      {/* toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-(--color-border-default) bg-(--color-surface-page) px-3 py-2">
        {TOOLBAR.map((t, i) => (
          <span
            key={i}
            className={cn(
              'inline-flex h-6 items-center gap-1 rounded-(--radius-md) border border-transparent px-1.5 text-[10px] text-(--color-text-secondary)',
              i === 3 && 'border-(--color-border-default) bg-(--color-surface-card) text-(--color-text-primary)',
            )}
          >
            <Icon name={t.icon} className="h-3 w-3" strokeWidth={2} />
            <span className="hidden md:inline">{t.label}</span>
          </span>
        ))}
        <span className="ml-auto inline-flex h-6 items-center gap-1 rounded-full bg-(--color-green-12) px-2 text-[10px] font-medium text-green-700">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-green-600" />
          3 редактируют
        </span>
      </div>

      <div className="grid grid-cols-[1fr] gap-0 md:grid-cols-[1fr_180px]">
        {/* document */}
        <div className="space-y-3 bg-(--color-surface-page) p-4 md:p-5">
          <div className="text-[16px] font-semibold text-(--color-text-primary)">
            Регламент реакции на инцидент
          </div>
          <div className="text-[11.5px] text-(--color-text-secondary)">
            Документ описывает, как команда поддержки и дежурный инженер действуют, когда у
            клиента возникает критичная ошибка в рабочее или нерабочее время.
          </div>

          {/* checklist block */}
          <div className="space-y-1.5 rounded-(--radius-lg) border border-(--color-action-primary)/20 bg-(--color-action-primary-soft)/30 p-3">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-(--color-text-accent)">
              Чек-лист дежурного
            </div>
            {[
              { text: 'Подтвердить инцидент в течение 5 минут', done: true },
              { text: 'Завести карточку с описанием и пострадавшими модулями', done: true },
              { text: 'Назначить ответственного и собрать команду в чате', done: false },
              { text: 'Сообщить клиенту статус и сроки восстановления', done: false },
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-2">
                <span
                  className={cn(
                    'mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-(--radius-sm) border text-[10px]',
                    c.done
                      ? 'border-(--color-action-primary) bg-(--color-action-primary) text-white'
                      : 'border-(--color-border-default) bg-(--color-surface-card)',
                  )}
                >
                  {c.done && '✓'}
                </span>
                <span
                  className={cn(
                    'text-[11px]',
                    c.done ? 'text-(--color-text-secondary) line-through' : 'text-(--color-text-primary)',
                  )}
                >
                  {c.text}
                </span>
              </div>
            ))}
          </div>

          {/* table block */}
          <div className="overflow-hidden rounded-(--radius-lg) border border-(--color-border-default)">
            <div className="grid grid-cols-[1fr_70px_90px] gap-2 border-b border-(--color-border-default) bg-(--color-surface-section) px-2.5 py-1.5 text-[9.5px] uppercase tracking-wide text-(--color-text-secondary)">
              <span>Уровень</span>
              <span>SLA</span>
              <span>Ответственный</span>
            </div>
            {[
              { lvl: 'P1 · недоступен сервис', sla: '15 мин', owner: 'Дежурный SRE' },
              { lvl: 'P2 · сломан критичный сценарий', sla: '1 час', owner: 'Тимлид поддержки' },
              { lvl: 'P3 · мелкая ошибка', sla: '1 день', owner: 'Очередь поддержки' },
            ].map((r, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_70px_90px] gap-2 px-2.5 py-1.5 text-[11px] text-(--color-text-primary) odd:bg-(--color-surface-page) even:bg-(--color-surface-section)"
              >
                <span className="truncate">{r.lvl}</span>
                <span className="tabular-nums text-(--color-text-secondary)">{r.sla}</span>
                <span className="truncate text-(--color-text-secondary)">{r.owner}</span>
              </div>
            ))}
          </div>

          {/* quote block */}
          <div className="rounded-(--radius-lg) border-l-2 border-(--color-action-primary) bg-(--color-surface-section) px-3 py-2 text-[11px] italic text-(--color-text-secondary)">
            «Главное правило — никогда не молчать. Лучше написать клиенту, что мы разбираемся,
            чем оставить его без ответа на час.»
          </div>

          {/* code block */}
          <div className="overflow-hidden rounded-(--radius-lg) bg-(--color-text-primary)">
            <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5 text-[9.5px] text-white/60">
              <span>shell · восстановление сервиса</span>
              <span className="inline-flex items-center gap-1">
                <Icon name="Copy" className="h-3 w-3" strokeWidth={2} />
                Скопировать
              </span>
            </div>
            <pre className="overflow-hidden whitespace-pre-wrap px-3 py-2 font-mono text-[10.5px] leading-relaxed text-white/85">
{`# проверить статус
sudo systemctl status app
# перезапустить и проверить логи
sudo systemctl restart app
journalctl -u app -n 100 --no-pager`}
            </pre>
          </div>
        </div>

        {/* outline */}
        <div className="hidden border-l border-(--color-border-default) bg-(--color-surface-section) p-3 md:block">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-(--color-text-secondary)">
            Содержание
          </div>
          <div className="mt-2 space-y-1">
            {OUTLINE.map((o, i) => (
              <div
                key={i}
                className={cn(
                  'truncate rounded-(--radius-md) px-2 py-1 text-[10.5px]',
                  o.active
                    ? 'bg-(--color-action-primary-soft) font-medium text-(--color-text-accent)'
                    : 'text-(--color-text-secondary)',
                )}
              >
                {o.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
