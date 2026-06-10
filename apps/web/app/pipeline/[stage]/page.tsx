import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ALL_DOCS, STAGES, getDoc } from '../_content';
import {
  CommandBlock,
  DocSection,
  FileChip,
  InOutGrid,
  PhaseList,
  RuleList,
  StepList,
} from '../_components/doc-blocks';

interface PageProps {
  params: Promise<{ stage: string }>;
}

/** Контент статичный: незнакомый slug — сразу 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_DOCS.map((doc) => ({ stage: doc.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { stage } = await params;
  const doc = getDoc(stage);
  return { title: doc ? `${doc.title} · Конвейер Кайтен` : 'Конвейер Кайтен' };
}

export default async function StagePage({ params }: PageProps) {
  const { stage } = await params;
  const doc = getDoc(stage);
  if (!doc) notFound();

  const stageIndex = STAGES.findIndex((s) => s.slug === doc.slug);
  const prev = stageIndex > 0 ? STAGES[stageIndex - 1] : undefined;
  const next =
    stageIndex >= 0 && stageIndex < STAGES.length - 1 ? STAGES[stageIndex + 1] : undefined;

  return (
    <article className="space-y-5">
      <header className="rounded-(--radius-2xl) border border-(--color-action-primary)/20 bg-(--color-action-primary-soft) p-6">
        <div className="flex items-start gap-4">
          {doc.num && (
            <span
              aria-hidden
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--color-action-primary) text-base font-semibold text-(--color-text-inverse)"
            >
              {doc.num}
            </span>
          )}
          <div>
            <p className="text-xs uppercase tracking-wide text-(--color-text-secondary)">
              {doc.kind === 'stage' ? `Этап ${doc.num}` : 'Сквозной раздел'}
            </p>
            <h1 className="mt-0.5 text-2xl font-semibold tracking-tight">{doc.title}</h1>
            <p className="mt-1 text-sm text-(--color-text-secondary)">{doc.short}</p>
          </div>
        </div>
      </header>

      <DocSection title="Назначение">
        {doc.purpose.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </DocSection>

      {(doc.inputs || doc.outputs) && (
        <DocSection title="Вход → Выход">
          <InOutGrid inputs={doc.inputs} outputs={doc.outputs} />
        </DocSection>
      )}

      {doc.how && doc.how.length > 0 && (
        <DocSection title="Как работает">
          <StepList steps={doc.how} />
        </DocSection>
      )}

      {doc.phases && doc.phases.length > 0 && (
        <DocSection title="Фазы P0–P8">
          <p className="text-xs text-(--color-text-secondary)">
            Раскройте фазу — внутри подробности: что происходит, что фаза читает и пишет, на какие
            материалы опирается. Фиолетовые пути открываются для чтения.
          </p>
          <PhaseList phases={doc.phases} />
        </DocSection>
      )}

      {doc.rules && doc.rules.length > 0 && (
        <DocSection title="Правила и гейты">
          <RuleList rules={doc.rules} />
        </DocSection>
      )}

      {doc.commands && doc.commands.length > 0 && (
        <DocSection title="Команды">
          <div className="space-y-3">
            {doc.commands.map((command) => (
              <CommandBlock key={command.cmd} command={command} />
            ))}
          </div>
        </DocSection>
      )}

      {(doc.artifacts || doc.links) && (
        <DocSection title="Артефакты и материалы">
          <p className="text-xs text-(--color-text-secondary)">
            Фиолетовые пути кликабельны — открывается содержимое файла (только чтение). Серые —
            шаблоны с подстановкой slug или артефакты конкретных прогонов.
          </p>
          {doc.artifacts && doc.artifacts.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                Артефакты этапа
              </p>
              <ul className="space-y-1.5">
                {doc.artifacts.map((link) => (
                  <li key={link.path}>
                    <FileChip {...link} />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {doc.links && doc.links.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                На что опирается
              </p>
              <ul className="space-y-1.5">
                {doc.links.map((link) => (
                  <li key={link.path}>
                    <FileChip {...link} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </DocSection>
      )}

      {doc.kind === 'stage' && (
        <nav className="flex items-center justify-between gap-3" aria-label="Соседние этапы">
          {prev ? (
            <Link
              href={`/pipeline/${prev.slug}`}
              className="rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-page) px-3 py-2 text-sm text-(--color-text-secondary) transition hover:text-(--color-text-accent)"
            >
              ← {prev.num}. {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/pipeline/${next.slug}`}
              className="rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-page) px-3 py-2 text-right text-sm text-(--color-text-secondary) transition hover:text-(--color-text-accent)"
            >
              {next.num}. {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </article>
  );
}
