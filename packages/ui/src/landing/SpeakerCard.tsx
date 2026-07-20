import { cn } from '../primitives/cn';
import { GradientPanel } from './GradientPanel';

export interface SpeakerCardProps {
  eyebrow?: string;
  title?: string;
  name: string;
  role: string;
  /** 1–2 строки экспертизы: сколько внедрений за плечами, чем полезен зрителю. */
  bio?: string;
  /** Портрет. Пока ассет не передан — рендерится заглушка с инициалами. */
  photoSrc?: string;
  photoAlt?: string;
  initials?: string;
}

/**
 * Блок ведущего: портрет, имя, роль в Kaiten и пара строк экспертизы (ТЗ, блок 6).
 * Фон спокойный, в стиле бренда — блок работает на доверие, а не на конверсию.
 */
export function SpeakerCard({
  eyebrow,
  title,
  name,
  role,
  bio,
  photoSrc,
  photoAlt,
  initials,
}: SpeakerCardProps) {
  return (
    <section className="px-4 py-12 md:px-6 xl:px-0 md:py-16 lg:py-24">
      <div className="mx-auto flex w-full max-w-(--container-kaiten) flex-col gap-6 md:gap-8 lg:gap-12">
        {(eyebrow || title) && (
          <div className="flex flex-col gap-3 text-left md:items-center md:text-center">
            {eyebrow && (
              <p className="text-sm font-medium text-(--color-text-secondary)">{eyebrow}</p>
            )}
            {title && (
              <h2 className="text-3xl font-semibold text-(--color-text-primary) md:text-4xl">
                {title}
              </h2>
            )}
          </div>
        )}

        <GradientPanel className="mx-auto w-full max-w-3xl px-6 py-10 md:px-12 md:py-12">
          <div
            className={cn(
              'flex flex-col items-center gap-6 text-center',
              'sm:flex-row sm:items-center sm:gap-8 sm:text-left',
            )}
          >
            <Portrait src={photoSrc} alt={photoAlt} name={name} initials={initials} />
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold text-(--color-text-primary) md:text-2xl">{name}</p>
              <p className="text-base font-medium text-(--color-text-accent)">{role}</p>
              {bio && <p className="text-base text-(--color-text-secondary) md:text-lg">{bio}</p>}
            </div>
          </div>
        </GradientPanel>
      </div>
    </section>
  );
}

/**
 * Портрет в круге. Фиолетовая заливка — всегда, и под фото тоже: портреты
 * спикеров вырезаны с прозрачным фоном, поэтому круг остаётся фоном снимка.
 * Нет фото — на той же заливке инициалы.
 */
function Portrait({
  src,
  alt,
  name,
  initials,
}: {
  src?: string;
  alt?: string;
  name: string;
  initials?: string;
}) {
  return (
    <div
      className={cn(
        'h-28 w-28 shrink-0 overflow-hidden rounded-full md:h-32 md:w-32',
        'flex items-center justify-center ring-4 ring-(--color-surface-card)',
        'bg-(--color-action-primary) text-3xl font-semibold text-(--color-text-inverse)',
      )}
    >
      {src ? (
        // object-top — чтобы кадрировать по голове, а не по центру снимка.
        <img src={src} alt={alt ?? name} className="h-full w-full object-cover object-top" />
      ) : (
        <span aria-hidden>{initials ?? name.slice(0, 1)}</span>
      )}
    </div>
  );
}
