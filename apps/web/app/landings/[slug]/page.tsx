import { notFound } from 'next/navigation';
import { existsSync } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { LandingSpecSchema } from '@kaiten/harness/schemas';
import { RenderLanding } from '@kaiten/harness/render/render-spec-react';
import { InspectorOverlay } from '../../../components/InspectorOverlay';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Прототип-деплой одного лендинга: если задан `PROTO_ONLY` (слаг), собираем и
 * отдаём только его. Локально (без env) — обычное поведение фабрики: все лендинги.
 */
const PROTO_ONLY = process.env.PROTO_ONLY;

/**
 * Все лендинги пре-рендерятся статикой на этапе build (чтение JSON происходит
 * тогда, когда `content/landings` физически доступна). Это нужно для деплоя в
 * монорепо на Vercel: во время запроса файл в бандл функции не попадает, поэтому
 * рантайм-чтение отдало бы 404. В dev статик-параметры пересобираются на каждый
 * build, новые слаги подхватываются.
 */
/**
 * Каталог content/landings независимо от cwd рантайма. Turbopack при авто-
 * рестарте иногда выставляет process.cwd() в корень монорепо вместо apps/web,
 * и жёсткий resolve('..','..') уезжал на два уровня выше репо → ENOENT → 404
 * на всех /landings/*. Идём вверх от cwd и берём первый существующий каталог.
 */
function landingsDir(): string {
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    const candidate = resolve(dir, 'content', 'landings');
    if (existsSync(candidate)) return candidate;
    const parent = resolve(dir, '..');
    if (parent === dir) break; // достигли корня ФС
    dir = parent;
  }
  // Фолбэк — прежнее поведение (apps/web → repo); путь на Vercel не меняется.
  return resolve(process.cwd(), '..', '..', 'content', 'landings');
}

export async function generateStaticParams() {
  if (PROTO_ONLY) return [{ slug: PROTO_ONLY }];
  const dir = landingsDir();
  try {
    const files = await readdir(dir);
    return files
      .filter((f) => f.endsWith('.json'))
      .map((f) => ({ slug: f.replace(/\.json$/, '') }));
  } catch {
    return [];
  }
}

async function loadSpec(slug: string) {
  const path = resolve(landingsDir(), `${slug}.json`);
  try {
    const raw = await readFile(path, 'utf-8');
    const json = JSON.parse(raw);
    return LandingSpecSchema.parse(json);
  } catch (err) {
    if (err && typeof err === 'object' && 'code' in err && (err as { code: string }).code === 'ENOENT') {
      return null;
    }
    throw err;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const spec = await loadSpec(slug);
  if (!spec) return { title: 'Landing not found' };
  return {
    title: spec.seo.title,
    description: spec.seo.description,
  };
}

export default async function LandingPreviewPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const spec = await loadSpec(slug);
  if (!spec) notFound();
  // Хендофф-режим (?handoff=1): статическая выгрузка верстальщику. Рендерим
  // «голый» лендинг — без dev-инспектора — и переводим секции-табы в статический
  // режим (все моки в разметке + переключение маленьким скриптом из static-handoff).
  const handoff = (await searchParams)?.handoff;
  if (handoff === '1' || handoff === 'static') {
    return <RenderLanding spec={spec} expandTabs />;
  }
  // В прототип-деплое dev-инспектор не показываем — только сам лендинг.
  if (PROTO_ONLY) return <RenderLanding spec={spec} />;
  return (
    <InspectorOverlay slug={slug}>
      <RenderLanding spec={spec} />
    </InspectorOverlay>
  );
}
