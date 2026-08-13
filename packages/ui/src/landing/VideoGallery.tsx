'use client';

import { useState } from 'react';
import { cn } from '../primitives/cn';

export interface VideoItem {
  /** id видео RuTube (из /video/<id>/); встраивается через /play/embed/<id>. */
  videoId: string;
  title?: string;
  /** Постер-превью (локальная картинка). Показывается до клика — плеер грузится по клику. */
  poster?: string;
}

export interface VideoGalleryProps {
  eyebrow?: string;
  title: string;
  description?: string;
  columns?: 2 | 3;
  videos: VideoItem[];
}

/**
 * VideoGallery — блок с видеозаписями (RuTube). Чтобы страница не тормозила, по
 * умолчанию рендерим лёгкий постер-превью с кнопкой play (facade / lite-embed);
 * тяжёлый <iframe> плеера подгружается только по клику. Без JS (статичная
 * выгрузка) постер — это ссылка на страницу ролика на RuTube (graceful fallback).
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
          <VideoFacade key={i} video={v} />
        ))}
      </div>
    </section>
  );
}

/** Одна карточка: постер → по клику подгружается iframe плеера. */
function VideoFacade({ video }: { video: VideoItem }) {
  const [active, setActive] = useState(false);
  const embed = `https://rutube.ru/play/embed/${video.videoId}`;
  const page = `https://rutube.ru/video/${video.videoId}/`;

  return (
    <figure className="flex flex-col gap-3">
      <div className="relative aspect-video overflow-hidden rounded-(--radius-xl) border border-(--color-border-default) bg-(--color-surface-card)">
        {active ? (
          <iframe
            src={`${embed}?autoStart=true`}
            className="absolute inset-0 h-full w-full"
            allow="clipboard-write; autoplay; fullscreen; accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title ?? 'Видео'}
          />
        ) : (
          <a
            href={page}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              setActive(true);
            }}
            className="group absolute inset-0 block"
            aria-label={video.title ? `Смотреть: ${video.title}` : 'Смотреть видео'}
          >
            {video.poster && (
              <img
                src={video.poster}
                alt={video.title ?? ''}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            )}
            <span className="absolute inset-0 bg-black/25 transition group-hover:bg-black/15" />
            <span
              className={cn(
                'absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2',
                'items-center justify-center rounded-(--radius-full) bg-white/95 text-[#221a2e]',
                'shadow-[0_8px_28px_rgba(0,0,0,0.35)] transition duration-300',
                'group-hover:scale-110 group-hover:bg-white',
              )}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="ml-0.5 h-7 w-7">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </a>
        )}
      </div>
      {video.title && (
        <figcaption className="text-sm leading-snug text-(--color-text-secondary)">
          {video.title}
        </figcaption>
      )}
    </figure>
  );
}
