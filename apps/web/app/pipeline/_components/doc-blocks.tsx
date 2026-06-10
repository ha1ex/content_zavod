import type { ReactNode } from 'react';
import Link from 'next/link';
import type {
  PhaseDoc,
  RepoLink,
  RuleSeverity,
  StageCommand,
  StageRule,
  StageStep,
} from '../_content/types';
import { isViewablePath } from '../_content/file-allowlist';
import { CopyButton } from '../../new/CopyButton';

/** Белая карточка-секция страницы этапа. */
export function DocSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-(--radius-2xl) border border-(--color-border-default) bg-(--color-surface-page) p-6">
      <h2 className="mb-4 border-b border-(--color-border-default) pb-2 text-base font-semibold">
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed">{children}</div>
    </section>
  );
}

/** Бейдж блокирующего (hard) или мягкого (soft) правила. */
export function SeverityBadge({ severity }: { severity: RuleSeverity }) {
  const hard = severity === 'hard';
  return (
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
        hard ? 'bg-(--color-red-12) text-red-700' : 'bg-(--color-orange-12) text-amber-700'
      }`}
      title={hard ? 'Блокирует конвейер до исправления' : 'Предупреждение, конвейер не останавливает'}
    >
      {severity}
    </span>
  );
}

/**
 * Путь в репозитории. Если файл/каталог есть в белом списке просмотрщика —
 * чип кликабелен и открывает содержимое на /pipeline/source/<путь>.
 * Пути с плейсхолдером <slug> остаются текстом.
 */
export function FileChip({ path, note }: RepoLink) {
  const viewable = isViewablePath(path);
  const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;
  const chip = (
    <code
      className={`rounded px-1.5 py-0.5 font-mono text-[11px] ${
        viewable
          ? 'bg-(--color-action-primary-soft) text-(--color-text-accent) group-hover:underline'
          : 'bg-(--color-surface-section) text-(--color-text-primary)'
      }`}
    >
      {path}
      {viewable && <span aria-hidden> ↗</span>}
    </code>
  );
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-1.5">
      {viewable ? (
        <Link
          href={`/pipeline/source/${cleanPath}`}
          className="group"
          title="Открыть содержимое (только чтение)"
        >
          {chip}
        </Link>
      ) : (
        chip
      )}
      {note && <span className="text-xs text-(--color-text-secondary)">— {note}</span>}
    </span>
  );
}

export function CommandBlock({ command }: { command: StageCommand }) {
  return (
    <div className="overflow-hidden rounded-(--radius-lg) border border-(--color-border-default)">
      <div className="flex items-center justify-between gap-3 border-b border-(--color-border-default) bg-(--color-surface-section) px-3 py-1.5">
        <p className="text-xs text-(--color-text-secondary)">{command.note ?? 'Команда'}</p>
        <CopyButton text={command.cmd} />
      </div>
      <pre className="overflow-x-auto p-3 font-mono text-xs leading-relaxed text-(--color-text-primary)">
        {command.cmd}
      </pre>
    </div>
  );
}

export function RuleList({ rules }: { rules: StageRule[] }) {
  return (
    <ul className="space-y-2.5">
      {rules.map((rule, i) => (
        <li key={i} className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <SeverityBadge severity={rule.severity} />
          <span className="text-(--color-text-primary)">{rule.text}</span>
          {rule.source && <FileChip path={rule.source} />}
        </li>
      ))}
    </ul>
  );
}

/** Нумерованные шаги «Как работает» — spine-паттерн как на /new. */
export function StepList({ steps }: { steps: StageStep[] }) {
  return (
    <ol>
      {steps.map((step, i) => (
        <li key={i} className="relative flex gap-4 pb-5 last:pb-0">
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className="absolute left-[15px] top-9 h-[calc(100%-2.25rem)] w-px bg-(--color-border-default)"
            />
          )}
          <span
            aria-hidden
            className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--color-action-primary) text-sm font-semibold text-(--color-text-inverse)"
          >
            {i + 1}
          </span>
          <div className="pt-1">
            <p className="font-medium text-(--color-text-primary)">{step.title}</p>
            {step.detail && (
              <p className="mt-0.5 text-(--color-text-secondary)">{step.detail}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function IoColumn({ label, items }: { label: string; items?: string[] }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">
        {label}
      </p>
      {items && items.length > 0 ? (
        <ul className="list-disc space-y-1.5 pl-5">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-(--color-text-secondary)">—</p>
      )}
    </div>
  );
}

/** «Вход → Выход» в две колонки со стрелкой между ними. */
export function InOutGrid({ inputs, outputs }: { inputs?: string[]; outputs?: string[] }) {
  return (
    <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-[1fr_auto_1fr]">
      <IoColumn label="Вход" items={inputs} />
      <span
        aria-hidden
        className="hidden self-center text-2xl text-(--color-text-secondary) sm:block"
      >
        →
      </span>
      <IoColumn label="Выход" items={outputs} />
    </div>
  );
}

function PhaseIoList({ label, items }: { label: string; items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">
        {label}
      </p>
      <ul className="list-disc space-y-1 pl-5 text-(--color-text-primary)">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Раскрывающиеся карточки фаз P0–P8: в свёрнутом виде — суть и гейт,
 * в раскрытом — что внутри, вход/выход и материалы, на которые фаза опирается.
 */
export function PhaseList({ phases }: { phases: PhaseDoc[] }) {
  return (
    <ul className="space-y-2.5">
      {phases.map((phase) => (
        <li key={phase.id}>
          <details className="group rounded-(--radius-lg) border border-(--color-border-default) open:border-(--color-action-primary)/40">
            <summary className="cursor-pointer list-none p-3 [&::-webkit-details-marker]:hidden">
              <div className="flex items-baseline gap-2">
                <span className="rounded-full bg-(--color-action-primary-soft) px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-(--color-text-accent)">
                  {phase.id}
                </span>
                <span className="font-medium text-(--color-text-primary)">{phase.title}</span>
                {phase.executor && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      phase.executor === 'code'
                        ? 'bg-(--color-surface-section) text-(--color-text-secondary)'
                        : 'bg-(--color-action-primary-soft) text-(--color-text-accent)'
                    }`}
                    title={
                      phase.executor === 'code'
                        ? 'Выполняет детерминированный код, без LLM'
                        : 'Выполняет ассистент (LLM) по заданию конвейера'
                    }
                  >
                    {phase.executor === 'code' ? 'код' : 'ассистент'}
                  </span>
                )}
                <span
                  aria-hidden
                  className="ml-auto shrink-0 text-xs text-(--color-text-secondary) transition group-open:rotate-90"
                >
                  ▸
                </span>
              </div>
              <p className="mt-1 text-(--color-text-secondary)">{phase.summary}</p>
              {phase.gate && (
                <p className="mt-1 text-xs text-(--color-text-secondary)">
                  <span className="font-semibold uppercase tracking-wide">гейт:</span> {phase.gate}
                </p>
              )}
            </summary>

            <div className="space-y-4 border-t border-(--color-border-default) p-3 pt-3 text-sm">
              {phase.details && phase.details.length > 0 && (
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                    Что внутри
                  </p>
                  <ul className="list-disc space-y-1 pl-5 text-(--color-text-primary)">
                    {phase.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <PhaseIoList label="Читает" items={phase.inputs} />
                <PhaseIoList label="Пишет" items={phase.outputs} />
              </div>
              {phase.sources && phase.sources.length > 0 && (
                <div>
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                    На что опирается
                  </p>
                  <ul className="space-y-1.5">
                    {phase.sources.map((source) => (
                      <li key={source.path}>
                        <FileChip {...source} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
