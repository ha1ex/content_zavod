'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * InspectorOverlay — «hover → copy context» для preview лендинга.
 *
 * - hover на элемент с `data-comp` подсвечивает зелёной обводкой;
 * - клик копирует в буфер обмена prompt-сниппет для chat claude/codex;
 * - Esc выключает inspector;
 * - toggle в правом нижнем углу включает/выключает (default OFF).
 *
 * Поддерживает fallback copy через document.execCommand если clipboard API заблокирован.
 */

interface Props {
  slug: string;
  children: ReactNode;
}

interface HoverState {
  rect: DOMRect;
  path: string;
  text: string | null;
}

function buildPath(el: Element): string | null {
  const chain: string[] = [];
  let current: Element | null = el;
  while (current) {
    if (current instanceof HTMLElement && current.dataset.comp) {
      const comp = current.dataset.comp;
      const key = current.dataset.compKey;
      chain.unshift(key ? `${comp}[${key}]` : comp);
    }
    current = current.parentElement;
  }
  return chain.length ? chain.join(' > ') : null;
}

function buildCopyPayload(slug: string, path: string, text: string | null): string {
  const lines = [
    `Лендинг: ${slug}`,
    `Путь: ${path}`,
    `Файл: content/landings/${slug}.json`,
  ];
  if (text) lines.push('', `Текущий текст: """${text.trim().slice(0, 400)}"""`);
  lines.push(
    '',
    'Что сделать:',
    `1. Открой content/landings/${slug}.json`,
    `2. Найди секцию по пути выше (sections[N] по component из пути; key вида "2:hero" даёт индекс N=2)`,
    `3. Поправь нужное поле`,
    `4. Запусти: pnpm -w run harness agent apply landing --slug ${slug} --brief content/briefs/${slug}.json`,
    `5. Открой http://localhost:3000/landings/${slug} проверить результат`,
  );
  return lines.join('\n');
}

async function copyToClipboard(text: string): Promise<{ ok: boolean; via: string }> {
  // 1. Modern API (требует HTTPS или localhost + focus)
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return { ok: true, via: 'clipboard-api' };
    } catch {
      // fall through to fallback
    }
  }
  // 2. Legacy execCommand fallback
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.left = '0';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return { ok, via: 'execCommand' };
  } catch {
    return { ok: false, via: 'none' };
  }
}

export function InspectorOverlay({ slug, children }: Props) {
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState<HoverState | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [fallbackText, setFallbackText] = useState<string | null>(null);
  const [taggedCount, setTaggedCount] = useState<number>(0);
  const rafRef = useRef<number | null>(null);

  // Подсчёт data-comp при включении (для пользователя — видеть «работает ли вообще»)
  useEffect(() => {
    if (!active) return;
    const count = document.querySelectorAll('[data-comp]').length;
    setTaggedCount(count);
    // eslint-disable-next-line no-console
    console.info(
      `[Inspector] активен. Найдено элементов с data-comp: ${count}. Hover на блок → подсветка. Клик → copy.`,
    );
  }, [active]);

  useEffect(() => {
    if (!active) {
      setHover(null);
      return;
    }

    function onMouseMove(e: MouseEvent) {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (!el) {
          setHover(null);
          return;
        }
        const tagged = el.closest<HTMLElement>('[data-comp]');
        if (!tagged || tagged.closest('[data-inspector]')) {
          setHover(null);
          return;
        }
        const path = buildPath(tagged);
        if (!path) {
          setHover(null);
          return;
        }
        const rect = tagged.getBoundingClientRect();
        const text = tagged.innerText?.trim().slice(0, 400) || null;
        setHover({ rect, path, text });
      });
    }

    function onClick(e: MouseEvent) {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;
      const tagged = el.closest<HTMLElement>('[data-comp]');
      if (!tagged || tagged.closest('[data-inspector]')) return;
      const path = buildPath(tagged);
      if (!path) return;
      e.preventDefault();
      e.stopPropagation();
      const text = tagged.innerText?.trim() || null;
      const payload = buildCopyPayload(slug, path, text);
      // eslint-disable-next-line no-console
      console.info('[Inspector] click → копирую путь:', path);

      void copyToClipboard(payload).then((res) => {
        if (res.ok) {
          setToast(`✓ Скопировано через ${res.via}: ${path}`);
          setTimeout(() => setToast(null), 3000);
        } else {
          // eslint-disable-next-line no-console
          console.warn('[Inspector] clipboard заблокирован, открываю модал для ручного копирования');
          setFallbackText(payload);
        }
      });
    }

    function onScroll() {
      setHover(null);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (fallbackText) {
          setFallbackText(null);
        } else {
          setActive(false);
        }
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('click', onClick, true);
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('keydown', onKey);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, slug, fallbackText]);

  return (
    <>
      {children}

      {active && hover && (
        <>
          <div
            data-inspector="outline"
            style={{
              position: 'fixed',
              left: hover.rect.left - 3,
              top: hover.rect.top - 3,
              width: hover.rect.width + 6,
              height: hover.rect.height + 6,
              border: '3px solid #10b981',
              borderRadius: 8,
              boxShadow: '0 0 0 4px rgba(16,185,129,0.15)',
              pointerEvents: 'none',
              zIndex: 9990,
            }}
          />
          <div
            data-inspector="label"
            style={{
              position: 'fixed',
              left: hover.rect.left,
              top: Math.max(8, hover.rect.top - 32),
              background: '#10b981',
              color: 'white',
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              padding: '4px 10px',
              borderRadius: 6,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              pointerEvents: 'none',
              maxWidth: '70vw',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              zIndex: 9991,
            }}
          >
            {hover.path}
          </div>
        </>
      )}

      {toast && (
        <div
          data-inspector="toast"
          style={{
            position: 'fixed',
            top: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#10b981',
            color: 'white',
            fontSize: 14,
            fontWeight: 500,
            padding: '12px 20px',
            borderRadius: 8,
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            zIndex: 9999,
          }}
        >
          {toast}
        </div>
      )}

      <button
        data-inspector="toggle"
        type="button"
        onClick={() => setActive((v) => !v)}
        title={
          active
            ? 'Inspector ON — клик по блоку копирует промпт. Esc — выкл.'
            : 'Включить Inspector: hover на блок → подсветка → клик копирует контекст для CLI'
        }
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          background: active ? '#10b981' : '#1e293b',
          color: 'white',
          fontSize: 14,
          fontWeight: 600,
          padding: '12px 18px',
          borderRadius: 999,
          boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
          zIndex: 9998,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span
          aria-hidden
          style={{
            display: 'inline-block',
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: active ? '#a7f3d0' : '#94a3b8',
            boxShadow: active ? '0 0 8px #a7f3d0' : 'none',
          }}
        />
        Inspector {active ? `ON · ${taggedCount} блоков` : 'OFF'}
      </button>

      {active && (
        <div
          data-inspector="hint"
          style={{
            position: 'fixed',
            bottom: 72,
            right: 16,
            background: '#0f172a',
            color: 'white',
            fontSize: 12,
            padding: '10px 14px',
            borderRadius: 8,
            maxWidth: 320,
            lineHeight: 1.4,
            zIndex: 9998,
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}
        >
          Hover на любой из {taggedCount} блоков → зелёная подсветка. Клик копирует
          контекст в буфер для chat claude/codex. Esc — выкл.
        </div>
      )}

      {fallbackText && (
        <div
          data-inspector="fallback-modal"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            zIndex: 10000,
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: 12,
              padding: 20,
              maxWidth: 720,
              width: '100%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <strong style={{ fontSize: 15 }}>Скопируй текст вручную</strong>
              <button
                type="button"
                onClick={() => setFallbackText(null)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: 18,
                  cursor: 'pointer',
                  color: '#64748b',
                }}
              >
                ✕
              </button>
            </div>
            <p style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>
              Браузер заблокировал автоматическое копирование. Выдели Cmd+A → скопируй Cmd+C →
              вставь в чат claude/codex.
            </p>
            <textarea
              readOnly
              value={fallbackText}
              autoFocus
              onFocus={(e) => e.currentTarget.select()}
              style={{
                width: '100%',
                minHeight: 240,
                fontSize: 12,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                padding: 12,
                border: '1px solid #cbd5e1',
                borderRadius: 6,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
