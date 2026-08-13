import { cn } from '../primitives/cn';

export interface VideoItem {
  /** id видео RuTube (из /video/<id>/); встраивается через /play/embed/<id>. */
  videoId: string;
  title?: string;
}

export interface VideoGalleryProps {
  eyebrow?: string;
  title: string;
  description?: string;
  columns?: 2 | 3;
  videos: VideoItem[];
}

/**
 * VideoGallery — блок с видеозаписями (RuTube): заголовок + сетка встраиваемых
 * плееров 16:9 с подписями. Встраивание через <iframe> — работает и в статичной
 * выгрузке (JS плеера грузит сам RuTube). На тёмной схеме — на семантических
 * токенах.
 */
export function VideoGallery({
  eyebrow,
  title,
  description,
  columns = 3,
  videos,
}: VideoGalleryProps) {
  return (
    <section className="mx-auto w-full max-w-(--container-kaiten) px-4 py-12 md:px-6 md:py-16 xl:px-0 lg:py-24">
      {(eyebrow || title || description) && (
        <div className="mb-8 flex flex-col gap-3 md:mb-10 lg:mb-12">
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-wide text-(--color-text-accent)">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-3xl font-semibold text-(--color-text-primary) md:text-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="max-w-2xl text-lg text-(--color-text-secondary)">{description}</p>
          )}
        </div>
      )}

      <div
        className={cn(
          'grid grid-cols-1 gap-6',
          columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3',
        )}
      >
        {videos.map((v, i) => (
          <figure key={i} className="flex flex-col gap-3">
            <div className="relative aspect-video overflow-hidden rounded-(--radius-xl) border border-(--color-border-default) bg-(--color-surface-card)">
              <iframe
                src={`https://rutube.ru/play/embed/${v.videoId}`}
                className="absolute inset-0 h-full w-full"
                allow="clipboard-write; autoplay; fullscreen; accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                title={v.title ?? 'Видео'}
              />
            </div>
            {v.title && (
              <figcaption className="text-sm leading-snug text-(--color-text-secondary)">
                {v.title}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
