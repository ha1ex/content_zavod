import { Inspect } from '../primitives/Inspect';
import { cn } from '../primitives/cn';

export interface FeatureRowProps {
  title: string;
  description: string;
  image: { src: string; alt?: string };
  /**
   * 'edge' (дефолт) — скриншот прижат к внешнему краю плашки и выходит в него.
   * 'center' — стоит по центру своей колонки. Для вертикальных кадров, которые
   * не заполняют колонку по ширине и у края висят криво.
   */
  imageAlign?: 'edge' | 'center';
  /**
   * Поведение кадра на мобилке:
   * 'bleed' (дефолт) — выходит в оба края экрана, самый крупный;
   * 'right' — выходит только вправо, слева остаётся поле плашки;
   * 'inset' — поля с обеих сторон, самый мелкий.
   */
  imageMobile?: 'bleed' | 'right' | 'inset';
}

/**
 * Заливки плашек по порядку строк: бренд, SeaBlue, Grass, Yellow — все на 8%.
 * Дальше четвёртой строки палитра повторяется по кругу.
 */
const ROW_TINTS = [
  'bg-[rgba(125,76,207,0.08)]',
  'bg-[rgba(33,150,243,0.08)]',
  'bg-[rgba(76,175,81,0.08)]',
  'bg-[rgba(255,161,0,0.08)]',
];

export interface FeatureRowsProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: FeatureRowProps[];
}

/**
 * FeatureRows — раскрытая («шахматная») альтернатива аккордеону: те же
 * разделы, но все видны сразу, каждый со своим скриншотом продукта.
 * Картинка чередует сторону: нечётные строки — справа, чётные — слева.
 * Подложки под скриншотом нет (правило DS «Иллюстрации без подложки»).
 */
export function FeatureRows({ eyebrow, title, description, items }: FeatureRowsProps) {
  return (
    <section
      className={cn(
        'mx-auto w-full max-w-(--container-kaiten)',
        // Снизу отступа нет: следующая секция несёт свой верхний.
        'px-4 pt-12 md:px-6 md:pt-16 xl:px-0 lg:pt-24',
      )}
    >
      <div className="mb-12 max-w-2xl text-left md:mx-auto md:mb-16 md:text-center lg:mb-24 lg:max-w-4xl">
        {eyebrow && (
          <p
            data-comp="feature_rows.eyebrow"
            className="mb-3 text-sm font-medium uppercase text-(--color-text-accent)"
          >
            {eyebrow}
          </p>
        )}
        <h2
          data-comp="feature_rows.title"
          className="text-3xl font-semibold leading-tight md:text-4xl"
        >
          {title}
        </h2>
        {description && (
          <p
            data-comp="feature_rows.description"
            className="mt-4 text-lg text-(--color-text-primary)"
          >
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-12 md:gap-16 lg:gap-24">
        {items.map((item, i) => (
          <Inspect
            as="div"
            key={i}
            name={`feature_rows.items[${i}]`}
            className={cn(
              'grid items-center gap-6 md:grid-cols-2 md:gap-8 lg:gap-12',
              // Серая плашка на всю ширину строки. Внутренние отступы и радиус —
              // по шкале DS для блоков (24/32/48 и 12/16).
              'rounded-(--radius-xl) p-6 md:p-8 lg:rounded-(--radius-2xl) lg:p-12',
              ROW_TINTS[i % ROW_TINTS.length],
            )}
          >
            {/* Текст всегда первым в разметке — на мобилке читается раньше
                картинки; сторону меняет сетка начиная с планшета. */}
            <div className={i % 2 ? 'md:order-2' : 'md:order-1'}>
              <h3
                data-comp={`feature_rows.items[${i}].title`}
                // Перенос строки задаётся в спеке символом \n — заголовки
                // тут короткие, и место разрыва решает редактор, а не поток.
                className="text-lg font-semibold leading-snug whitespace-pre-line lg:text-xl"
              >
                {item.title}
              </h3>
              <p
                data-comp={`feature_rows.items[${i}].description`}
                className="mt-4 text-base leading-relaxed text-(--color-text-primary) lg:text-lg"
              >
                {item.description}
              </p>
            </div>
            {/* Скриншоты разного формата (широкая доска и вертикальная карточка)
                держим в одном ритме по высоте — иначе портретный кадр раздувает
                строку и ломает шахматку. */}
            {/* Скриншот выходит в край плашки: гасим её паддинг снизу и с той
                стороны, где стоит картинка. На мобилке — в оба края. */}
            <div
              className={cn(
                // Снизу картинка ложится ровно на границу плашки (отступ гасит
                // её паддинг), сверху — отрицательный отступ больше паддинга:
                // плашка становится ниже картинки, и та выступает над ней.
                // На мобилке подъёма нет: там картинка стоит под текстом
                // и отрицательный отступ наехал бы на него.
                'min-w-0 self-end -mb-6 md:mx-0 md:-mt-16 md:-mb-8 lg:-mt-24 lg:-mb-12',
                item.imageMobile === 'inset'
                  ? ''
                  : item.imageMobile === 'right'
                    ? '-mr-6'
                    : '-mx-6',
                i % 2 ? 'md:order-1' : 'md:order-2',
                // Выход в боковой край плашки — только для кадров по краю.
                item.imageAlign !== 'center' &&
                  (i % 2 ? 'md:-ml-8 lg:-ml-12' : 'md:-mr-8 lg:-mr-12'),
              )}
            >
              <img
                src={item.image.src}
                alt={item.image.alt ?? ''}
                loading="lazy"
                className={cn(
                  // Высота плашки задаётся картинкой — она в строке самый
                  // высокий элемент, текст в неё вписывается.
                  'block h-auto w-full object-contain',
                  // На мобилке потолок высоты выше ширины колонки: там кадр
                  // должен упираться в края экрана, а не в лимит по высоте.
                  'max-h-[440px] md:max-h-[380px] lg:max-h-[460px]',
                  // Скругление минимальное: у самих скриншотов уже скруглены
                  // собственные углы, второй радиус поверх читается как обводка.
                  'rounded-(--radius-base)',
                  // На мобилке кадр всегда прижат вправо (или по центру, если
                  // так задано); сторону по макету включает уже планшет.
                  item.imageAlign === 'center'
                    ? 'object-center'
                    : i % 2
                      ? 'object-right md:object-left'
                      : 'object-right',
                  // Углы внешней стороны — по радиусу плашки: снизу скриншот
                  // ложится в её угол, сверху выходит за неё, и квадратные
                  // углы там читаются как обрез.
                  item.imageAlign !== 'center' &&
                    (i % 2
                      ? 'rounded-l-(--radius-xl) lg:rounded-l-(--radius-2xl)'
                      : 'rounded-r-(--radius-xl) lg:rounded-r-(--radius-2xl)'),
                )}
                // Тень без смещения (X=0, Y=0) — правило DS: мокап лежит
                // в плоскости страницы, а не «висит» над ней. У картинки
                // прозрачные поля, поэтому тень вешаем на пиксели, а не на бокс.
                style={{ filter: 'drop-shadow(0 0 10px rgba(45,45,45,.10))' }}
              />
            </div>
          </Inspect>
        ))}
      </div>
    </section>
  );
}
