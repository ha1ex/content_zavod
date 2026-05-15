import Link from 'next/link';

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Buffalo harness</h1>
      <p className="mt-3 text-muted">
        LLM-контур для генерации SaaS-лендингов. Этап 0: bootstrap репозитория.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-medium">Куда дальше</h2>
        <ul className="space-y-2 text-sm">
          <li>
            ◦ Список черновиков лендингов — будет на <code>/landings</code> (этап 1)
          </li>
          <li>
            ◦ Превью одного лендинга — <code>/landings/[slug]</code>
          </li>
          <li>
            ◦ Approve UI — <code>/approve/[slug]</code> (этап 5)
          </li>
          <li>
            ◦ Storybook (registry компонентов) — <code>pnpm storybook</code> на :6006
          </li>
          <li>
            ◦ CLI harness — <code>pnpm harness -- --help</code>
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-2 text-sm">
        <h2 className="text-xl font-medium">Статус MVP</h2>
        <p>Этап 0 — Bootstrap (текущий)</p>
        <p>Положите дизайн-токены и brand-voice в <code>.context/design-system/</code></p>
      </section>

      <footer className="mt-16 border-t border-muted/20 pt-6 text-xs text-muted">
        Полный план — <Link href="/" className="underline">смотрите plan-файл в Claude</Link>
      </footer>
    </main>
  );
}
