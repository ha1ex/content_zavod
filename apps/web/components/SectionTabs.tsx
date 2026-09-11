'use client';

import { useState, type ReactNode } from 'react';

/**
 * SectionTabs — переключатель разделов дашборда («Лендинги» / «Презентации»).
 *
 * Содержимое вкладок приходит пропсом уже отрендеренным на сервере: списки
 * читают файловую систему, поэтому клиентским здесь остаётся только выбор
 * активной вкладки. Стрелки ←/→ переключают вкладки с клавиатуры.
 */

export interface SectionTab {
  id: string;
  label: string;
  count: number;
  icon: ReactNode;
  content: ReactNode;
}

export function SectionTabs({ tabs }: { tabs: SectionTab[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];
  if (!active) return null;

  const step = (delta: number) => {
    const index = tabs.findIndex((tab) => tab.id === active.id);
    const next = tabs[(index + delta + tabs.length) % tabs.length];
    if (next) setActiveId(next.id);
  };

  return (
    <section>
      <div
        role="tablist"
        aria-label="Разделы"
        className="mb-8 inline-flex items-center gap-2 rounded-(--radius-xl) bg-(--color-action-primary-soft) p-2"
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') step(1);
          else if (event.key === 'ArrowLeft') step(-1);
          else return;
          event.preventDefault();
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              className={`inline-flex items-center gap-2.5 rounded-(--radius-lg) px-5 py-2.5 text-base font-medium transition-colors ${
                isActive
                  ? 'bg-(--color-action-primary) text-(--color-text-inverse)'
                  : 'text-(--color-text-primary) hover:text-(--color-text-accent)'
              }`}
            >
              {tab.icon}
              {tab.label}
              <span className="text-sm font-normal opacity-70">{tab.count}</span>
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id={`panel-${active.id}`} aria-labelledby={`tab-${active.id}`}>
        {active.content}
      </div>
    </section>
  );
}
