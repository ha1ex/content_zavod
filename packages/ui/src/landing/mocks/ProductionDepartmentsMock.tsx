import { cn } from '../../primitives/cn';

/**
 * Mock «Вся компания в одной системе» (manufacturing-домен). Mockup ноутбука
 * с производственной доской и плавающими лейблами департаментов:
 * Бухгалтерия и финансы, Оценка рисков и планирование, Логистика и закупки,
 * Проектирование, Коммерческий отдел, Производство.
 *
 * Источник визуала — скриншот Кайтена,
 * apps/web/public/landings/kaiten-manufacturing/departments.png.
 * Используется в MediaCopy mediaVariant='production-departments'.
 */
export function ProductionDepartmentsMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative mx-auto w-full max-w-[640px]',
      )}
    >
      <img
        src="/landings/kaiten-manufacturing/departments.png"
        alt=""
        className="block w-full"
        loading="lazy"
      />
    </div>
  );
}
