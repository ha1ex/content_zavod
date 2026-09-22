import { Icon } from '../primitives/Icon';
import { cn } from '../primitives/cn';
import { MockVisual, type MockVariant } from './mocks';
import { ProductNavIcon, isProductNavIcon } from './ProductNavIcon';

export interface LinkGroupsLink {
  label: string;
  href: string;
  icon?: string;
}

export interface LinkGroupsProps {
  eyebrow?: string;
  title: string;
  description?: string;
  groups: { title: string; links: LinkGroupsLink[] }[];
  /**
   * Мок интерфейса между двумя группами ссылок (только при двух группах):
   * на десктопе три колонки «группа · мок · группа», ниже — мок над ссылками.
   */
  centerMockVariant?: MockVariant;
}

/**
 * LinkGroups — навигационный блок: центрированный заголовок и белая карточка
 * с колонками ссылок, у каждой колонки подпись группы. Для перелинковки на
 * соседние страницы продукта («Больше возможностей»: функции и модули).
 */
export function LinkGroups({ eyebrow, title, description, groups, centerMockVariant }: LinkGroupsProps) {
  const withMock = Boolean(centerMockVariant) && groups.length === 2;
  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-(--container-kaiten) px-4 py-12 md:px-6 md:py-16 xl:px-0 lg:py-24">
        <div className="mx-auto mb-8 max-w-4xl text-center lg:mb-12">
          {eyebrow && (
            <p data-comp="link_groups.eyebrow" className="mb-3 text-sm font-medium uppercase text-(--color-text-accent)">
              {eyebrow}
            </p>
          )}
          <h2 data-comp="link_groups.title" className="text-3xl font-semibold leading-tight md:text-4xl">
            {title}
          </h2>
          {description && (
            <p data-comp="link_groups.description" className="mx-auto mt-4 max-w-2xl text-base text-(--color-text-primary) md:text-lg">
              {description}
            </p>
          )}
        </div>

        <div
          className={cn(
            'grid w-full grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-2 md:gap-10',
            withMock
              ? 'xl:grid-cols-[max-content_minmax(0,1fr)_max-content] xl:items-center xl:gap-12 xl:pr-16'
              : 'rounded-(--radius-3xl) bg-(--color-surface-card) p-6 md:p-10 lg:px-16 lg:py-12',
          )}
        >
          {groups.map((g, gi) => (
            <div key={g.title} className={cn(withMock && gi === 1 && 'xl:order-3 xl:-ml-12')}>
              <p data-comp={`link_groups.groups[${gi}].title`} className="mb-4 text-sm font-medium uppercase text-(--color-text-accent)">
                {g.title}
              </p>
              <ul className="flex flex-col">
                {g.links.map((l, li) => (
                  <li key={l.href + l.label}>
                    <a
                      href={l.href}
                      data-comp={`link_groups.groups[${gi}].links[${li}]`}
                      className="group -mx-2 flex items-center gap-3 rounded-(--radius-lg) px-2 py-1.5 text-sm text-(--color-text-primary)"
                    >
                      {/* Иконки Landing-DS: серые, при наведении — фирменный фиолетовый вместе с подписью */}
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center text-[#bdbdbd]">
                        {isProductNavIcon(l.icon) ? (
                          <ProductNavIcon name={l.icon} className="h-6 w-6" />
                        ) : (
                          <Icon name={l.icon ?? 'ArrowRight'} className="h-5 w-5" strokeWidth={2} />
                        )}
                      </span>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {withMock && (
            // до 1280px мок над ссылками на всю ширину, шире — в центре между группами
            <div data-comp="link_groups.centerMockVariant" className="order-first mx-auto w-full min-w-0 max-w-[560px] md:col-span-2 xl:order-2 xl:col-span-1 xl:max-w-none xl:translate-x-4 xl:pl-[136px]">
              <MockVisual variant={centerMockVariant} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
