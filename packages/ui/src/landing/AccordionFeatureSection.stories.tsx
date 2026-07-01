import type { Meta, StoryObj } from '@storybook/react';
import { AccordionFeatureSection } from './AccordionFeatureSection';

const meta: Meta<typeof AccordionFeatureSection> = {
  title: 'Landing/AccordionFeatureSection',
  component: AccordionFeatureSection,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof AccordionFeatureSection>;

export const Manufacturing: Story = {
  args: {
    eyebrow: 'Кайтен для производств',
    title: 'Производство под контролем без планёрок и ручного контроля',
    description:
      'От заявки до отгрузки — каждый этап, отдел и срок в одной системе. Руководитель не собирает картину по звонкам и чатам.',
    items: [
      {
        id: 'orders',
        icon: 'LayoutGrid',
        title: 'Статус каждого заказа виден с доски',
        description:
          'Каждый заказ движется по маршруту: заявка → закупка → производство → ОТК → отгрузка. Руководитель видит весь поток и сразу замечает, где образовалась очередь или задержка — до того, как это стало проблемой.',
        mockVariant: 'order-flow',
      },
      {
        id: 'load',
        icon: 'GanttChart',
        title: 'Загрузка людей и участков понятна на недели вперёд',
        description:
          'Загрузка цеха, участков и инженеров — на одной шкале времени. Пересечения этапов подсвечены: видно эффект задержки одной поставки. Ресурсное планирование на недели вперёд, а не на день.',
        mockVariant: 'production-gantt',
      },
      {
        id: 'data',
        icon: 'Boxes',
        title: 'Снабжение, цех и технологи работают с одними данными',
        description:
          'Чертежи, спецификации и статусы закупок живут внутри карточки заказа. Снабжение, цех и технологи видят одну версию данных — без пересылки файлов по почте.',
        mockVariant: 'production-departments',
      },
      {
        id: 'report',
        icon: 'BarChart3',
        title: 'Отчёт по загрузке и выполнению заказов — без ручной сборки',
        description:
          'Выполнение в срок, загрузка участков и просрочки собираются автоматически. Открыли отчёт перед планёркой — вся картина уже на экране, без выгрузок в таблицы.',
        mockVariant: 'analytics-kpi',
      },
    ],
    primaryCta: { label: 'Попробовать Кайтен бесплатно', href: '/signup' },
    secondaryCta: { label: 'Запросить демонстрацию', href: '/demo' },
  },
};
