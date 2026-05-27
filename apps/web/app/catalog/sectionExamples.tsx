import {
  BenefitsStrip,
  BentoGrid,
  ComparisonTable,
  CtaBanner,
  FAQAccordion,
  FeatureGrid,
  FinalCta,
  HeroSection,
  IndustryPickerSection,
  LandingFooter,
  LogoCloud,
  MediaCopy,
  MetricsSplit,
  PricingPlans,
  ProcessSteps,
  PromoBanner,
  ScenarioWalkthroughSection,
  SocialProof,
  StatStrip,
  TabbedFeatureSection,
  TestimonialQuote,
  TimelineRoadmap,
} from '@buffalo/ui/landing';

interface SectionExample {
  name: string;
  category: string;
  description: string;
  element: React.ReactElement;
}

export const SECTION_EXAMPLES: SectionExample[] = [
  {
    name: 'HeroSection',
    category: 'hero',
    description: 'Главный hero-блок с заголовком, описанием, CTA и mock-визуалом.',
    element: (
      <HeroSection
        eyebrow="Buffalo · фабрика лендингов"
        title="Превратите бриф в готовый лендинг за минуту"
        accentWord="минуту"
        subtitle="Buffalo собирает страницу из ваших компонентов, проверяет тон и отдаёт TSX-файл."
        primaryCta={{ label: 'Получить демо', href: '/demo' }}
        secondaryCta={{ label: 'Как это работает', href: '#how' }}
        visual={{ type: 'product_screenshot', assetId: 'pm', variant: 'pm-board' }}
        visualPosition="below"
      />
    ),
  },
  {
    name: 'FeatureGrid',
    category: 'features',
    description: 'Grid карточек 2-8 штук с иконкой, заголовком и описанием.',
    element: (
      <FeatureGrid
        eyebrow="Почему Buffalo"
        title="Лендинги, которые остаются в вашем бренде"
        description="Никаких выдуманных компонентов и hype-копирайта."
        columns={3}
        items={[
          { icon: 'Sparkles', title: 'На ваших компонентах', description: 'Модель собирает страницу из утверждённого Storybook-каталога.' },
          { icon: 'Shield', title: 'Tone of voice', description: 'Brand-валидатор отлавливает запрещённые слова.' },
          { icon: 'Zap', title: 'Repair-loop', description: 'Модель исправляет именно проблемные секции.' },
        ]}
      />
    ),
  },
  {
    name: 'PricingPlans',
    category: 'pricing',
    description: 'Тарифы (2-4 шт), с возможностью highlight одного.',
    element: (
      <PricingPlans
        eyebrow="Тарифы"
        title="Платите только за то, что нужно"
        plans={[
          { name: 'Базовый', price: '0 ₽', description: 'Для небольших команд.', features: ['До 10 пользователей', 'Базовые доски'], cta: { label: 'Начать', href: '/signup' } },
          { name: 'Стандарт', price: 'от 430 ₽', pricePeriod: 'чел/мес', description: 'Полный набор.', features: ['Безлимит', 'Интеграции', 'Аналитика'], cta: { label: 'Попробовать', href: '/trial' }, highlighted: true },
          { name: 'Корпоративный', price: 'По запросу', description: 'On-premise и SLA.', features: ['On-premise', 'SLA 99,9%', 'SSO'], cta: { label: 'Связаться', href: '/enterprise' } },
        ]}
      />
    ),
  },
  {
    name: 'FAQAccordion',
    category: 'faq',
    description: 'Accordion FAQ (2-12 пар вопрос/ответ).',
    element: (
      <FAQAccordion
        eyebrow="FAQ"
        title="Частые вопросы"
        items={[
          { question: 'Что такое Buffalo?', answer: 'LLM-харнесс для сборки SaaS-лендингов на ваших компонентах.' },
          { question: 'Нужен ли API-ключ?', answer: 'Нет, в agent-mode хост-агент сам генерирует spec.' },
          { question: 'Какие домены поддерживаются?', answer: 'PM, Support, CRM, HR, Marketing, BPM, Finance, E-commerce, Docs.' },
        ]}
      />
    ),
  },
  {
    name: 'FinalCta',
    category: 'cta',
    description: 'Финальный CTA-блок: заголовок + описание + CTA.',
    element: (
      <FinalCta
        title="Начните управлять продажами в CRM"
        description="Соберите клиентов, сделки, задачи в одной системе."
        primaryCta={{ label: 'Попробовать бесплатно', href: '/signup' }}
        secondaryCta={{ label: 'Запросить консультацию', href: '/contact' }}
      />
    ),
  },
  {
    name: 'LandingFooter',
    category: 'footer',
    description: 'Подвал: бренд + tagline + колонки ссылок + copyright.',
    element: (
      <LandingFooter
        brandName="Buffalo"
        brandTagline="LLM-харнесс для сборки лендингов."
        columns={[
          { title: 'Продукт', links: [{ label: 'Возможности', href: '#features' }, { label: 'FAQ', href: '#faq' }] },
          { title: 'Компания', links: [{ label: 'О продукте', href: '/about' }, { label: 'Контакты', href: '/contact' }] },
        ]}
        copyright="© Buffalo. LLM-харнесс."
      />
    ),
  },
  {
    name: 'SocialProof',
    category: 'social',
    description: 'Карточки клиентских кейсов (2-6 шт).',
    element: (
      <SocialProof
        eyebrow="Кому доверяют"
        title="Российские компании уже работают в Кайтене"
        cases={[
          { brand: 'Газпромбанк', brandInitial: 'Г', quote: 'Перевели проектные команды на Кайтен.', metric: 'Финансовый сектор' },
          { brand: 'X5 Retail Group', brandInitial: 'X5', quote: 'Сотни команд ведут операционные проекты.', metric: 'Ритейл' },
          { brand: 'Норникель', brandInitial: 'Н', quote: 'On-premise развёртывание в собственном контуре.', metric: 'Промышленность' },
        ]}
      />
    ),
  },
  {
    name: 'ProcessSteps',
    category: 'process',
    description: 'Шаги процесса с иконкой и описанием (2-6 шт).',
    element: (
      <ProcessSteps
        eyebrow="Внедрение"
        title="Запустите за день"
        steps={[
          { icon: 'UserPlus', title: 'Регистрация', description: 'Бесплатный доступ ко всем функциям.' },
          { icon: 'Copy', title: 'Шаблон процесса', description: 'Доски настроены под основные сценарии.' },
          { icon: 'Plug', title: 'Интеграции', description: 'Подключите 1С, AmoCRM, Telegram.' },
          { icon: 'Rocket', title: 'Запуск', description: 'Команда начинает работать.' },
        ]}
      />
    ),
  },
  {
    name: 'CtaBanner',
    category: 'banner',
    description: 'Inline CTA-баннер между секциями.',
    element: (
      <CtaBanner
        title="Подключите CRM за один день"
        description="Воронка и автоматизации настраиваются без разработчиков."
        primaryCta={{ label: 'Попробовать', href: '/signup' }}
        secondaryCta={{ label: 'Демо', href: '/demo' }}
      />
    ),
  },
  {
    name: 'MediaCopy',
    category: 'media',
    description: 'Текст с чек-листом по одну сторону + mock продуктового UI по другую.',
    element: (
      <MediaCopy
        eyebrow="Ядро платформы"
        title="Kanban, Scrum, Gantt в одном месте"
        description="Команды разработки, маркетинга, поддержки на одной платформе."
        checklist={[
          { icon: 'Layout', text: 'Несколько досок и swimlanes под ваш процесс' },
          { icon: 'GitBranch', text: 'Иерархия карточек: эпики, истории, задачи' },
          { icon: 'Calendar', text: 'Gantt-диаграммы и спринты Scrum' },
        ]}
        mediaPosition="right"
        mediaVariant="pm-board"
      />
    ),
  },
  {
    name: 'StatStrip',
    category: 'stats',
    description: 'Полоса 2-5 цифровых фактов.',
    element: (
      <StatStrip
        eyebrow="В цифрах"
        title="Платформа в действии"
        stats={[
          { value: '12 лет', label: 'на рынке', description: 'Основана в 2014 году.' },
          { value: 'от 430₽', label: 'на сотрудника', description: 'Модульная цена.' },
          { value: '99,9%', label: 'SLA в облаке', description: 'Гарантированная доступность.' },
        ]}
      />
    ),
  },
  {
    name: 'PromoBanner',
    category: 'promo',
    description: 'Полноширинный акцентный баннер (violet или soft tone).',
    element: (
      <PromoBanner
        eyebrow="Импортозамещение"
        title="Российский сервис в реестре отечественного ПО"
        description="Реестр Минцифры №14347, on-premise в собственный контур."
        primaryCta={{ label: 'Скачать справку', href: '/security' }}
        tone="soft"
      />
    ),
  },
  {
    name: 'BenefitsStrip',
    category: 'banner',
    description: 'Узкая полоса 3-5 преимуществ списком.',
    element: <BenefitsStrip items={['Реестр отечественного ПО', 'Облако и on-premise', 'Модульная цена', 'Интеграции с 1С']} />,
  },
  {
    name: 'MetricsSplit',
    category: 'stats',
    description: 'Метрики слева + описательные буллиты справа.',
    element: (
      <MetricsSplit
        eyebrow="Аналитика"
        title="Готовые отчёты о работе сервиса"
        metrics={[
          { value: '124', label: 'заявки в работе', trend: 'up' },
          { value: '87%', label: 'закрыто в SLA', trend: 'up' },
          { value: '18', label: 'зависли', trend: 'down' },
          { value: '6', label: 'перегружены', trend: 'flat' },
        ]}
        bullets={[
          { title: 'Где сейчас заявки', description: 'Сколько на каждом этапе.' },
          { title: 'Растёт ли нагрузка', description: 'Динамика по неделям.' },
        ]}
      />
    ),
  },
  {
    name: 'TabbedFeatureSection',
    category: 'tabs',
    description: 'Горизонтальные табы по ролям/сегментам с mock-вариантом под каждым.',
    element: (
      <TabbedFeatureSection
        eyebrow="По ролям"
        title="Один интерфейс — под разные команды"
        tabs={[
          {
            id: 'sales',
            label: 'Продажи',
            icon: 'TrendingUp',
            title: 'Карточка клиента с историей',
            description: 'Сделки, переписка и звонки в одной карточке.',
            checklist: [
              { icon: 'Contact2', text: 'Карточка клиента с табами' },
              { icon: 'GitBranch', text: 'Воронка сделок' },
            ],
            mockVariant: 'crm-client-card',
          },
          {
            id: 'service',
            label: 'Сервис',
            icon: 'Headphones',
            title: 'Обращения из любых каналов',
            description: 'Звонки, чат, мессенджеры в одной ленте.',
            checklist: [
              { icon: 'Inbox', text: 'Лента из 8+ каналов' },
              { icon: 'Phone', text: 'Запись разговоров' },
            ],
            mockVariant: 'omnichannel-inbox',
          },
        ]}
      />
    ),
  },
  {
    name: 'ScenarioWalkthroughSection',
    category: 'scenario',
    description: 'Нарративная "день из жизни" — 3-6 шагов с alternating mock layout.',
    element: (
      <ScenarioWalkthroughSection
        eyebrow="Один день в CRM"
        title="День менеджера продаж"
        protagonist="Анна, 22 активные сделки"
        steps={[
          { time: '09:30 · утро', title: 'Открывает inbox', description: 'CRM распределила заявки по приоритету.', icon: 'Inbox', mockVariant: 'omnichannel-inbox' },
          { time: '10:24 · звонок', title: 'Принимает звонок', description: 'Карточка клиента открывается сама.', icon: 'PhoneIncoming', mockVariant: 'call-overlay' },
          { time: '11:48 · карточка', title: 'Обновляет сделку', description: 'Меняет статус, добавляет тег.', icon: 'UserCheck', mockVariant: 'crm-client-card' },
        ]}
      />
    ),
  },
  {
    name: 'IndustryPickerSection',
    category: 'industry',
    description: 'Picker отраслей: список слева, сценарий выбранной справа.',
    element: (
      <IndustryPickerSection
        eyebrow="Для каких бизнесов"
        title="Подходит для разных сфер"
        industries={[
          {
            id: 'b2b',
            icon: 'Building2',
            name: 'B2B-продажи',
            summary: 'Длинные сделки и сложные согласования',
            scenario: 'CRM хранит карточки контактов и компаний, документы и историю встреч.',
            keyFeatures: [
              { icon: 'Building2', text: 'Карточки компаний с иерархией ЛПР' },
              { icon: 'FileText', text: 'Документы и история согласований' },
            ],
            metric: { value: '−25%', label: 'длительность сделки' },
          },
          {
            id: 'services',
            icon: 'Briefcase',
            name: 'Услуги',
            summary: 'Запись клиентов и работа с базой',
            scenario: 'CRM ведёт клиентов через множество разовых заказов.',
            keyFeatures: [
              { icon: 'Calendar', text: 'Онлайн-запись' },
              { icon: 'Repeat', text: 'Сценарии возврата клиентов' },
            ],
            metric: { value: '+38%', label: 'повторных визитов' },
          },
          {
            id: 'education',
            icon: 'GraduationCap',
            name: 'Образование',
            summary: 'Заявки на курсы, оплаты, напоминания',
            scenario: 'Онлайн-школы ведут учеников через цикл оплата → обучение → следующий курс.',
            keyFeatures: [
              { icon: 'Inbox', text: 'Заявки из сайта и соцсетей' },
              { icon: 'CreditCard', text: 'Контроль оплат и рассрочек' },
            ],
            metric: { value: '92%', label: 'доходимость' },
          },
        ]}
      />
    ),
  },
  {
    name: 'ComparisonTable',
    category: 'comparison',
    description: 'Параллельная таблица сравнения "у них / у нас".',
    element: (
      <ComparisonTable
        eyebrow="Сравнение"
        title="Чем Кайтен отличается от зарубежных аналогов"
        columns={[
          { name: 'Jira', badge: 'Зарубежный' },
          { name: 'Trello', badge: 'Зарубежный' },
          { name: 'Кайтен', highlighted: true, badge: 'Российский' },
        ]}
        rows={[
          { label: 'Реестр отечественного ПО', values: [false, false, true] },
          { label: 'On-premise', values: [true, false, true] },
          { label: 'Оплата в рублях', values: [false, false, true] },
        ]}
      />
    ),
  },
  {
    name: 'TimelineRoadmap',
    category: 'timeline',
    description: 'Timeline миграции/roadmap — вертикальный или горизонтальный.',
    element: (
      <TimelineRoadmap
        eyebrow="План перехода"
        title="Миграция с Jira за 4 недели"
        orientation="vertical"
        milestones={[
          { period: 'Неделя 1', title: 'Аудит и подготовка', description: 'Снимаем структуру проектов.', status: 'done', bullets: ['Карта проектов', 'Mapping полей'] },
          { period: 'Неделя 2', title: 'Параллельное использование', description: 'Импорт первых проектов.', status: 'in-progress' },
          { period: 'Неделя 3', title: 'Перевод оставшихся', status: 'planned' },
        ]}
      />
    ),
  },
  {
    name: 'BentoGrid',
    category: 'bento',
    description: 'Bento-grid: ячейки разного размера для overview платформы.',
    element: (
      <BentoGrid
        eyebrow="Платформа"
        title="Что входит в Кайтен"
        cells={[
          { icon: 'ListTodo', title: 'Задачи и проекты', description: 'Kanban, Scrum, Gantt на одной платформе.', size: 'large', accent: true },
          { icon: 'BookOpen', title: 'База знаний', description: 'Документы рядом с задачами.', size: 'small' },
          { icon: 'Headphones', title: 'Поддержка', description: 'Заявки на одной доске.', size: 'small' },
          { icon: 'Workflow', title: 'Бизнес-процессы', description: 'Согласования по шагам.', size: 'wide' },
          { icon: 'BarChart3', title: 'Аналитика', description: 'Дашборды по командам.', size: 'small' },
          { icon: 'Sparkles', title: 'AI-помощник', description: 'Резюме обсуждений.', size: 'small' },
        ]}
      />
    ),
  },
  {
    name: 'LogoCloud',
    category: 'logos',
    description: 'Полоса логотипов клиентов с инициалами как stand-in.',
    element: (
      <LogoCloud
        eyebrow="Кто работает"
        title="Команды российских компаний"
        items={[
          { brand: 'Газпромбанк', brandInitial: 'Г' },
          { brand: 'X5 Retail Group', brandInitial: 'X5' },
          { brand: 'Норникель', brandInitial: 'Н' },
          { brand: 'S7 Airlines', brandInitial: 'S7' },
          { brand: 'ВкусВилл', brandInitial: 'В' },
          { brand: 'СберМаркет', brandInitial: 'СМ' },
        ]}
      />
    ),
  },
  {
    name: 'TestimonialQuote',
    category: 'testimonial',
    description: 'Большая single hero-quote с автором и бренд-инициалом.',
    element: (
      <TestimonialQuote
        eyebrow="Кейс клиента"
        quote="Подключили модуль службы поддержки — заявки клиентов оказались рядом с задачами команды."
        authorName="Александр Морозов"
        authorRole="Руководитель техподдержки"
        brandName="Proctoredu"
        brandInitial="P"
        metric="500 заявок в неделю обрабатывает команда из 5 специалистов"
      />
    ),
  },
];
