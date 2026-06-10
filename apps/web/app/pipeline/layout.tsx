import Link from 'next/link';
import { PipelineNav } from './_components/PipelineNav';

export const metadata = {
  title: 'Как устроен конвейер · Контент-завод Кайтен',
  description:
    'Read-only справочник по этапам конвейера: что на входе и выходе, правила, гейты, команды.',
};

export default function PipelineLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-(--color-surface-section)">
      <header className="border-b border-(--color-border-default) bg-(--color-surface-page) px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-(--color-text-secondary)">
              Справочник для маркетинга
            </p>
            <h1 className="text-xl font-semibold">Как устроен конвейер</h1>
          </div>
          <Link href="/" className="text-sm text-(--color-text-secondary) hover:underline">
            ← Дашборд
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <PipelineNav />
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
