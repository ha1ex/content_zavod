'use client';

import { useState } from 'react';
import { ButtonLink } from '../primitives/ButtonLink';
import { Icon } from '../primitives/Icon';
import { Inspect } from '../primitives/Inspect';
import { cn } from '../primitives/cn';
import { AccentText } from '../primitives/AccentText';
import { MockFit } from '../primitives/MockFit';
import { MockVisual, type MockVariant } from './mocks';

export interface TabbedFeatureTabProps {
  id: string;
  label: string;
  icon?: string;
  eyebrow?: string;
  title: string;
  /** Кусок заголовка фирменным фиолетовым, напр. «более 300 сценариев». */
  accentWord?: string;
  description?: string;
  checklist?: { icon?: string; text: string }[];
  primaryCta?: { label: string; href: string };
  mockVariant: MockVariant;
}

export interface TabbedFeatureSectionProps {
  eyebrow?: string;
  title: string;
  /** Кусок заголовка фирменным фиолетовым, напр. «более 300 сценариев». */
  accentWord?: string;
  description?: string;
  tabs: TabbedFeatureTabProps[];
  /**
   * Хендофф-режим: рендерим переключаемые табы БЕЗ JS — на CSS-радио
   * (скрытые `<input type=radio>` + `<label>`-кнопки + `:checked ~`). В разметку
   * попадают моки всех вкладок, но виден только выбранный — верстальщик видит
   * настоящий таб-виджет. Обычный (React) режим остаётся дефолтом.
   */
  staticTabs?: boolean;
  /**
   * 'tabs' (дефолт) — переключаемые вкладки.
   * 'list' — раскрытый список: все сценарии показаны сразу, друг под другом,
   * с чередованием стороны мока. Нужен, когда содержимое читают целиком.
   * 'accordion' — слева заголовок раздела и стопка раскрывающихся строк,
   * справа мок активной строки на лиловой подложке. Шапка секции уезжает
   * в левую колонку, поэтому центрированный заголовок не рендерится.
   * Хендофф-режим (`staticTabs`) аккордеон не поддерживает и падает
   * обратно на табы.
   */
  variant?: 'tabs' | 'list' | 'accordion';
  /**
   * Снять ограничение ширины у описания секции (max-w-2xl → max-w-6xl), чтобы
   * длинный подзаголовок ложился в одну строку на десктопе. Opt-in, старые
   * лендинги не трогаем.
   */
  wideDescription?: boolean;
  /**
   * Убрать нижний отступ секции. Нужно, когда следующая секция сама
   * отбивается сверху и между ними складывается двойной интервал.
   * Opt-in, старые лендинги не трогаем.
   */
  flushBottom?: boolean;
  /**
   * Кнопка под пунктами аккордеона — одна на всю секцию, не зависит
   * от раскрытой строки. Только для `variant: 'accordion'`. Opt-in.
   */
  primaryCta?: { label: string; href: string };
}

/**
 * TabbedFeatureSection — секция с горизонтальными табами по ролям/сегментам
 * (например: Продажи / Сервис / Маркетинг). Под выбранным табом — пара
 * mock + текст с чек-листом. Решает проблему «однообразного MediaCopy×N»:
 * вместо вертикального простыни — одна секция, но с интерактивным
 * переключением между сценариями использования.
 */
export function TabbedFeatureSection({
  eyebrow,
  title,
  accentWord,
  description,
  tabs,
  staticTabs = false,
  variant = 'tabs',
  wideDescription,
  flushBottom,
  primaryCta,
}: TabbedFeatureSectionProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? '');
  const activeIndex = Math.max(
    0,
    tabs.findIndex((t) => t.id === activeId),
  );
  const active = tabs[activeIndex] ?? tabs[0];
  if (!active) return null;

  // Хендофф-режим: переключаемые табы для статики. Обычные кнопки + панели с
  // data-атрибутами; переключение делает крошечный ванильный скрипт, который
  // static-handoff впрыскивает перед </body>. Активная вкладка — [data-active],
  // скрытые панели — inline display:none (панель 0 видна сразу, без вспышки).
  // Раскрытый список: все сценарии сразу, друг под другом. Мок чередует
  // сторону, чтобы вертикаль не читалась как одинаковые полосы.
  if (variant === 'list') {
    return (
      <section
        className={cn(
          'mx-auto w-full max-w-(--container-kaiten)',
          'px-4 py-8 pt-12 md:px-6 md:py-12 xl:px-0 lg:py-16',
          flushBottom && 'pb-0 md:pb-0 lg:pb-0',
        )}
      >
        <div className="mb-10 md:mb-8 md:text-center lg:mb-12">
          {eyebrow && (
            <p
              data-comp="tabbed_feature.eyebrow"
              className="mb-3 text-sm font-medium uppercase tracking-wide text-(--color-text-accent)"
            >
              {eyebrow}
            </p>
          )}
          <h2
            data-comp="tabbed_feature.title"
            className="text-3xl font-semibold leading-tight md:text-4xl lg:whitespace-nowrap"
          >
            <AccentText text={title} accentWord={accentWord} />
          </h2>
          {description && (
            <p
              data-comp="tabbed_feature.description"
              className={cn(
                'mx-auto mt-4 text-base text-(--color-text-primary) md:text-lg',
                wideDescription ? 'max-w-6xl' : 'max-w-2xl',
              )}
            >
              {description}
            </p>
          )}
        </div>

        <div className="space-y-16 lg:space-y-24">
          {tabs.map((t, idx) => (
            <div
              key={t.id}
              className={cn(
                'grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center lg:gap-16',
                idx % 2 === 1 && 'md:[&>div:first-child]:order-2',
              )}
            >
              <div>
                {/* в списке заголовком служит label вкладки, а её title — подзаголовком */}
                <h3
                  data-comp={`tabbed_feature.tabs[${idx}].label`}
                  className="text-xl font-semibold leading-tight md:text-2xl"
                >
                  {t.label}
                </h3>
                <p
                  data-comp={`tabbed_feature.tabs[${idx}].title`}
                  className="mt-3 text-base leading-snug text-(--color-text-primary)"
                >
                  {t.title}
                </p>
                {t.description && (
                  <p
                    data-comp={`tabbed_feature.tabs[${idx}].description`}
                    className="mt-4 text-base leading-relaxed text-(--color-text-primary) md:text-lg"
                  >
                    {t.description}
                  </p>
                )}
                {t.checklist && t.checklist.length > 0 && (
                  <ul className="mt-6 space-y-3 lg:max-w-[92%]">
                    {t.checklist.map((item, i) => (
                      <Inspect
                        as="li"
                        key={i}
                        name={`tabbed_feature.tabs[${idx}].checklist[${i}]`}
                        className="flex items-start gap-3"
                      >
                        <span
                          className={cn(
                            'mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                            'bg-(--color-action-primary-soft) text-(--color-text-accent)',
                          )}
                        >
                          <Icon name={item.icon ?? 'Check'} className="h-3.5 w-3.5" strokeWidth={2.5} />
                        </span>
                        <span className="text-base leading-relaxed text-(--color-text-primary)">
                          {item.text}
                        </span>
                      </Inspect>
                    ))}
                  </ul>
                )}
                {t.primaryCta && (
                  <div className="mt-8">
                    <ButtonLink size="lg" href={t.primaryCta.href}>
                      {t.primaryCta.label}
                    </ButtonLink>
                  </div>
                )}
              </div>
              <Inspect as="div" name={`tabbed_feature.tabs[${idx}].mock`}>
                <MockFit>
                  <MockVisual variant={t.mockVariant} />
                </MockFit>
              </Inspect>
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (staticTabs) {
    const ns = `kt-${(tabs[0]?.id ?? 'x').replace(/[^a-zA-Z0-9_-]/g, '')}`;
    const css =
      `.${ns} .ktl{display:inline-flex;align-items:center;gap:8px;cursor:pointer;border:0;` +
      `background:transparent;font-family:inherit;border-radius:var(--radius-xl);padding:8px 16px;` +
      `font-size:14px;font-weight:500;color:var(--color-text-secondary);` +
      `transition:background .15s ease,color .15s ease}\n` +
      `.${ns} .ktl:hover{color:var(--color-text-primary)}\n` +
      `.${ns} .ktl[data-active]{background:var(--color-surface-page);color:var(--color-text-primary);` +
      `box-shadow:0 1px 2px rgba(0,0,0,.05)}\n` +
      `.${ns} .ktp{display:grid}\n`;

    return (
      <section
        data-kt-tabs=""
        className={cn(
          ns,
          'mx-auto w-full max-w-(--container-kaiten)',
          'px-4 py-8 md:px-6 md:py-12 xl:px-0 lg:py-16',
          flushBottom && 'pb-0 md:pb-0 lg:pb-0',
        )}
      >
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <div className="mb-10 max-w-2xl">
          {eyebrow && (
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-(--color-text-accent)">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
            <AccentText text={title} accentWord={accentWord} />
          </h2>
          {description && (
            <p className="mt-4 text-base text-(--color-text-primary) md:text-lg">{description}</p>
          )}
        </div>

        {/* панель кнопок-вкладок */}
        <div
          className={cn(
            'ktlbar mb-8 inline-flex max-w-full flex-wrap gap-1 rounded-(--radius-2xl)',
            'bg-(--color-surface-section) p-1',
          )}
          role="tablist"
        >
          {tabs.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              className="ktl"
              data-kt-tab={String(i)}
              {...(i === 0 ? { 'data-active': '' } : {})}
            >
              {t.icon && <Icon name={t.icon} className="h-4 w-4" strokeWidth={2} />}
              {t.label}
            </button>
          ))}
        </div>

        {/* панели контента: текст + мок; видна только активная (переключает скрипт) */}
        <div className="ktpanels">
          {tabs.map((t, i) => (
            <div
              key={t.id}
              data-kt-panel={String(i)}
              style={i === 0 ? undefined : { display: 'none' }}
              className="ktp grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-16"
            >
              <div className="order-2 lg:order-1">
                {t.eyebrow && (
                  <p className="mb-3 text-sm font-medium uppercase tracking-wide text-(--color-text-accent)">
                    {t.eyebrow}
                  </p>
                )}
                <h3 className="text-2xl font-semibold leading-tight md:text-3xl">{t.title}</h3>
                {t.description && (
                  <p className="mt-4 text-base leading-relaxed text-(--color-text-primary) md:text-lg">
                    {t.description}
                  </p>
                )}
                {t.checklist && t.checklist.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {t.checklist.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className={cn(
                            'mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                            'bg-(--color-action-primary-soft) text-(--color-text-accent)',
                          )}
                        >
                          <Icon name={item.icon ?? 'Check'} className="h-3.5 w-3.5" strokeWidth={2.5} />
                        </span>
                        <span className="text-base leading-relaxed text-(--color-text-primary)">
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {t.primaryCta && (
                  <div className="mt-8">
                    <ButtonLink size="lg" href={t.primaryCta.href}>
                      {t.primaryCta.label}
                    </ButtonLink>
                  </div>
                )}
              </div>
              <div className="order-1 lg:order-2">
                <MockVisual variant={t.mockVariant} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ── вариант «аккордеон» ────────────────────────────────────────
  // Слева шапка раздела и стопка строк, справа мок активной строки
  // на лиловой подложке. Раскрыта всегда ровно одна строка.
/**
 * Классы строки аккордиона в двух состояниях. Вынесены в константы, потому что
 * их же получают data-атрибуты: по ним статичная выгрузка переключает строки
 * без React (скрипт из scripts/build-static-html.mjs).
 */
const ROW_ON =
  'border-(--color-action-primary) bg-[linear-gradient(180deg,#ece0ff,#cdecff)] md:bg-(--color-surface-page) md:bg-none';
const ROW_OFF = 'border-transparent bg-(--color-surface-section)';
const ACCENT_ON = 'text-(--color-text-accent)';
const ICON_OFF = 'text-(--color-text-secondary)';
const LABEL_OFF = 'text-(--color-text-primary)';
const REVEAL_ON = 'grid-rows-[1fr] opacity-100';
const REVEAL_OFF = 'grid-rows-[0fr] opacity-0';

  if (variant === 'accordion') {
    return (
      <section
        className={cn(
          'mx-auto w-full max-w-(--container-kaiten)',
          'px-4 py-8 md:px-6 md:py-12 xl:px-0 lg:py-16',
          // На мобилке секция начинается ближе к предыдущей.
          'pt-6 md:pt-12 lg:pt-12',
          flushBottom && 'pb-0 md:pb-0 lg:pb-0',
        )}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start md:gap-6 lg:gap-8">
          {/*
            Шапка: на планшете — во всю ширину и по центру над обеими колонками,
            на десктопе возвращается влево, над аккордионом.
          */}
          <div
            className={cn(
              'order-2 md:order-1',
              'md:col-span-2 md:row-start-1 md:text-center',
              'lg:col-span-1 lg:col-start-1 lg:text-left',
            )}
          >
            {eyebrow && (
              <p
                data-comp="tabbed_feature.eyebrow"
                className="mb-3 text-sm font-medium uppercase tracking-wide text-(--color-text-accent)"
              >
                {eyebrow}
              </p>
            )}
            <h2
              data-comp="tabbed_feature.title"
              className="text-2xl font-semibold leading-tight md:text-3xl"
            >
              <AccentText text={title} accentWord={accentWord} />
            </h2>
            {description && (
              <p
                data-comp="tabbed_feature.description"
                className="mt-4 text-base leading-relaxed text-(--color-text-primary) md:text-lg"
              >
                {description}
              </p>
            )}
          </div>

          <div className="order-2 md:order-1 md:col-start-1 md:row-start-2 lg:row-start-2">
            <div className="space-y-3 md:mt-0">
              {tabs.map((t, idx) => {
                const isOpen = t.id === activeId;
                return (
                  <div
                    key={t.id}
                    data-acc-row={t.id}
                    data-acc-on={ROW_ON}
                    data-acc-off={ROW_OFF}
                    className={cn('rounded-(--radius-xl) border transition-colors', isOpen ? ROW_ON : ROW_OFF)}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      // Раскрываем по наведению — строка открывается ещё до клика.
                      // Клик оставлен для тача и клавиатуры, где hover не приходит.
                      onMouseEnter={() => setActiveId(t.id)}
                      onClick={() => setActiveId(t.id)}
                      data-comp={`tabbed_feature.tabs[${idx}].label`}
                      className="flex w-full items-center gap-3 px-5 py-4 text-left"
                    >
                      {t.icon && (
                        <span
                          data-acc-on={ACCENT_ON}
                          data-acc-off={ICON_OFF}
                          className={cn('flex shrink-0', isOpen ? ACCENT_ON : ICON_OFF)}
                        >
                          <Icon name={t.icon} className="h-5 w-5" strokeWidth={2} />
                        </span>
                      )}
                      <span
                        // На мобилке строка крупнее: она тут главный элемент
                        // управления, на десктопе рядом есть мок и заголовок.
                        data-acc-on={ACCENT_ON}
                        data-acc-off={LABEL_OFF}
                        className={cn('flex-1 text-lg font-medium md:text-base', isOpen ? ACCENT_ON : LABEL_OFF)}
                      >
                        {t.label}
                      </span>
                      <span
                        data-acc-on={ACCENT_ON}
                        data-acc-off={ICON_OFF}
                        className={cn('flex shrink-0', isOpen ? ACCENT_ON : ICON_OFF)}
                      >
                        <span data-acc-on="" data-acc-off="hidden" className={cn('flex', !isOpen && 'hidden')}>
                          <Icon name="ChevronUp" className="h-5 w-5" strokeWidth={2} />
                        </span>
                        <span data-acc-on="hidden" data-acc-off="" className={cn('flex', isOpen && 'hidden')}>
                          <Icon name="ChevronDown" className="h-5 w-5" strokeWidth={2} />
                        </span>
                      </span>
                    </button>
                    {/*
                      Раскрытие анимируем сеткой: 0fr -> 1fr плавно тянет высоту
                      без замера в JS. Содержимое рендерится всегда, иначе
                      анимировать было бы нечего.

                      До md мок живёт внутри раскрытой строки: колонки схлопнуты
                      в одну, и отдельная панель сверху отрывала бы картинку
                      от своего пункта. С планшета работает панель справа.
                    */}
                    <div
                      data-acc-on={REVEAL_ON}
                      data-acc-off={REVEAL_OFF}
                      className={cn(
                        'grid transition-[grid-template-rows,opacity] duration-300 ease-(--ease-ui)',
                        isOpen ? REVEAL_ON : REVEAL_OFF,
                      )}
                      aria-hidden={!isOpen}
                    >
                      <div className="min-h-0 overflow-hidden">
                        {t.description && (
                          <p
                            data-comp={`tabbed_feature.tabs[${idx}].description`}
                            className="px-5 pb-6 text-base leading-relaxed text-(--color-text-primary)"
                          >
                            {t.description}
                          </p>
                        )}
                        <div className="md:hidden">
                          <div className="p-4 pt-0">
                            <MockVisual variant={t.mockVariant} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA секции важнее CTA конкретной строки: он не прыгает при переключении */}
            {/* До md колонка одна и кнопка встаёт по центру; в две колонки
                она держится левого края, как в макете. */}
            {(primaryCta ?? active.primaryCta) && (
              <div className="mt-8 flex justify-center md:block">
                <Inspect
                  name={
                    primaryCta
                      ? 'tabbed_feature.primaryCta'
                      : `tabbed_feature.tabs[${activeIndex}].primaryCta`
                  }
                >
                  <ButtonLink size="lg" href={(primaryCta ?? active.primaryCta)!.href}>
                    {(primaryCta ?? active.primaryCta)!.label}
                  </ButtonLink>
                </Inspect>
              </div>
            )}
          </div>

          {/*
            Мок «выезжает» за правый и нижний край подложки и обрезается ею —
            так в макете. Внутренняя обёртка шире панели, поэтому MockFit
            подгоняет мок под неё, а не под видимую ширину; фиксированная
            высота на десктопе держит панель ровной при переключении строк.
          */}
          <Inspect
            as="div"
            name={`tabbed_feature.tabs[${activeIndex}].mockVariant`}
            className={cn(
              // Панель — флекс: мок стоит по центру вертикали.
              'order-1 hidden overflow-hidden md:order-2 md:flex md:items-center',
              'md:col-start-2 md:row-start-2 lg:row-start-1 lg:row-span-2',
              // Вертикальный градиент лиловый -> голубой из макета. Цвета те же,
              // что в `CTAsecondaryMock`; в токенах их нет.
              'rounded-(--radius-xl) bg-[linear-gradient(180deg,#ece0ff,#cdecff)] md:rounded-(--radius-2xl)',
              // Панель тянется на всю высоту блока — вровень с шапкой и
              // колонкой аккордиона; мок внутри ужимается пропорционально.
              'pt-5 pl-5 md:self-stretch md:pt-0 md:pl-7 lg:pl-12',
            )}
          >
            {/*
              Мок нарисован под 500px — столько он и занимает на десктопе
              (92% ширины панели). На планшете те же 92% дают ~287px, и MockFit
              ужимает мок ровно в этой пропорции: раскладка та же, просто мельче.
            */}
            {tabs.map((t) => (
              <div
                key={t.id}
                data-acc-panel={t.id}
                className={cn(
                  'w-[92%] animate-[mock-fade_260ms_var(--ease-ui)]',
                  t.id !== activeId && 'hidden',
                )}
              >
                <MockFit>
                  <div className="w-[500px]">
                    <MockVisual variant={t.mockVariant} />
                  </div>
                </MockFit>
              </div>
            ))}
          </Inspect>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        'mx-auto w-full max-w-(--container-kaiten)',
        'px-4 py-12 md:px-6 md:py-16 xl:px-0 lg:py-24',
        flushBottom && 'pb-0 md:pb-0 lg:pb-0',
      )}
    >
      <div className="mb-6 max-w-2xl text-left md:mx-auto md:mb-8 md:text-center lg:mb-12 lg:max-w-4xl">
        {eyebrow && (
          <p
            data-comp="tabbed_feature.eyebrow"
            className="mb-3 text-sm font-medium uppercase text-(--color-text-accent)"
          >
            {eyebrow}
          </p>
        )}
        <h2
          data-comp="tabbed_feature.title"
          className="text-3xl font-semibold leading-tight md:text-4xl lg:whitespace-nowrap"
        >
          <AccentText text={title} accentWord={accentWord} />
        </h2>
        {description && (
          <p
            data-comp="tabbed_feature.description"
            className={cn(
              'mx-auto mt-4 text-base text-(--color-text-primary) md:text-lg',
              wideDescription ? 'max-w-6xl' : 'max-w-2xl',
            )}
          >
            {description}
          </p>
        )}
      </div>

      {/* tab bar */}
      <div
        className={cn(
          'mb-8 inline-flex max-w-full flex-wrap gap-1 rounded-(--radius-2xl)',
          'bg-(--color-surface-section) p-1',
        )}
        role="tablist"
      >
        {tabs.map((t, idx) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === activeId}
            onClick={() => setActiveId(t.id)}
            data-comp={`tabbed_feature.tabs[${idx}].label`}
            className={cn(
              'inline-flex items-center gap-2 rounded-(--radius-xl) px-4 py-2 text-sm font-medium transition',
              t.id === activeId
                ? 'bg-(--color-surface-page) text-(--color-text-primary) shadow-sm'
                : 'text-(--color-text-secondary) hover:text-(--color-text-primary)',
            )}
          >
            {t.icon && <Icon name={t.icon} className="h-4 w-4" strokeWidth={2} />}
            {t.label}
          </button>
        ))}
      </div>

      {/* content panel */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        {/* левая колонка: все вкладки стопкой в одной grid-ячейке — высота
            равна самой высокой, поэтому при переключении блок не прыгает */}
        <div className="order-2 grid lg:order-1">
          {tabs.map((t, idx) => {
            const isActive = t.id === activeId;
            return (
              <div
                key={t.id}
                aria-hidden={!isActive}
                className={cn('[grid-area:1/1]', !isActive && 'invisible')}
              >
                {t.eyebrow && (
                  <p
                    data-comp={`tabbed_feature.tabs[${idx}].eyebrow`}
                    className="mb-3 text-sm font-medium uppercase text-(--color-text-accent)"
                  >
                    {t.eyebrow}
                  </p>
                )}
                <h3
                  data-comp={`tabbed_feature.tabs[${idx}].title`}
                  className="text-2xl font-semibold leading-tight md:text-3xl"
                >
                  {t.title}
                </h3>
                {t.description && (
                  <p
                    data-comp={`tabbed_feature.tabs[${idx}].description`}
                    className="mt-4 text-base leading-relaxed text-(--color-text-primary) md:text-lg"
                  >
                    {t.description}
                  </p>
                )}
                {t.checklist && t.checklist.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {t.checklist.map((item, i) => (
                      <Inspect
                        as="li"
                        key={i}
                        name={`tabbed_feature.tabs[${idx}].checklist[${i}]`}
                        className="flex items-start gap-3"
                      >
                        <span
                          className={cn(
                            'mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                            'bg-(--color-action-primary-soft) text-(--color-text-accent)',
                          )}
                        >
                          <Icon name={item.icon ?? 'Check'} className="h-3.5 w-3.5" strokeWidth={2.5} />
                        </span>
                        <span
                          data-comp={`tabbed_feature.tabs[${idx}].checklist[${i}].text`}
                          className="text-base leading-relaxed text-(--color-text-primary)"
                        >
                          {item.text}
                        </span>
                      </Inspect>
                    ))}
                  </ul>
                )}
                {t.primaryCta && (
                  <div className="mt-8">
                    <Inspect name={`tabbed_feature.tabs[${idx}].primaryCta`}>
                      <ButtonLink size="lg" href={t.primaryCta.href}>
                        {t.primaryCta.label}
                      </ButtonLink>
                    </Inspect>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <Inspect
          as="div"
          name={`tabbed_feature.tabs[${activeIndex}].mockVariant`}
          className="order-1 lg:order-2"
        >
          <MockVisual variant={active.mockVariant} />
        </Inspect>
      </div>
    </section>
  );
}
