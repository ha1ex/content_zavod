import { DarkTerminal, ResultCard, TPrompt, TFlag, TStr, TNum, TOk, TMut } from './DarkTerminal';

/**
 * Главный сценарий Kaiten CLI: карточка или документ открывается там же, где
 * идёт работа. Слева — терминал с командой экспорта документа в Markdown,
 * справа — получившийся файл .md с заголовком, чек-листом и ссылкой на
 * вложение в формате API Kaiten. Терминал — в едином стиле DarkTerminal.
 * Домен: cli-community-edition.
 */
export function CliMarkdownExportMock() {
  return (
    <div
      aria-hidden
      className="mx-auto grid w-full max-w-[760px] items-stretch gap-3 md:grid-cols-[1.05fr_0.95fr]"
    >
      {/* — терминал — */}
      <DarkTerminal title="bash — кайтен@ваш-сервер">
          <div className="ln">
            <TPrompt />
            <TFlag>--json</TFlag>
            <span>documents get</span>
          </div>
          <div className="ln ind">
            <TFlag>--document-uid</TFlag>
            <TNum>d1f7a2</TNum>
          </div>
          <div className="ln ind">
            <TFlag>--markdown</TFlag>
            <TFlag>--output</TFlag>
            <TStr>./reglament.md</TStr>
          </div>
          <TOk>
            <TStr>./reglament-pereezda.md</TStr>
          </TOk>
          <div className="ln ind">
            <TMut>вложения → формат API Kaiten</TMut>
          </div>
        </DarkTerminal>

      {/* — готовый файл .md — */}
      <MarkdownFile />
    </div>
  );
}

function MarkdownFile() {
  return (
    <ResultCard className="flex flex-col">
      {/* документ Kaiten — задний мок из finance-kb-docs (RegulationDoc), контент под переезд */}
      <div className="mb-2 text-2xl leading-none">📦</div>
      <div className="text-[15px] font-semibold leading-snug text-(--color-text-primary)">
        Регламент переезда команды
      </div>
      <div className="mt-1 flex items-center gap-1 text-[10px] text-(--color-text-tertiary)">
        <span className="text-xs leading-none">＋</span> Добавить участников
      </div>
      <div className="mt-3 border-t border-(--color-border-default) pt-3">
        <div className="rounded-lg border-l-2 border-(--color-action-primary) bg-(--color-surface-page) px-3 py-2 text-[11px] leading-snug text-(--color-text-secondary)">
          Порядок переноса досок, задач и участников из прежней системы в Kaiten.
        </div>
        <div className="mt-3 text-[10px] font-medium uppercase text-(--color-text-tertiary)">
          Содержание
        </div>
        <ul className="mt-1.5 space-y-1">
          {TOC.map((t) => (
            <li key={t} className="text-[11.5px] text-(--color-text-accent) underline underline-offset-2">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-3 overflow-hidden rounded-lg border border-(--color-border-default)">
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 bg-(--color-surface-page) px-3 py-1.5 text-[10px] font-medium text-(--color-text-tertiary)">
            <span>Этап</span>
            <span className="text-right">Срок</span>
            <span className="text-right">Ответственный</span>
          </div>
          {STAGES.map(([stage, due, who], i) => (
            <div
              key={stage}
              className={
                'grid grid-cols-[1fr_auto_auto] gap-x-3 px-3 py-1.5 text-[11px] text-(--color-text-primary) ' +
                (i < STAGES.length - 1 ? 'border-b border-(--color-border-default)' : '')
              }
            >
              <span>{stage}</span>
              <span className="text-right tabular-nums text-(--color-text-secondary)">{due}</span>
              <span className="text-right text-(--color-text-secondary)">{who}</span>
            </div>
          ))}
        </div>
      </div>
    </ResultCard>
  );
}

const TOC = [
  'Экспорт из прежней системы',
  'Перенос досок и дорожек',
  'Сверка задач с командой',
  'Назначение ответственных',
];

const STAGES: [string, string, string][] = [
  ['Экспорт досок', 'День 1', 'Teamlead'],
  ['Сверка задач', 'День 2', 'Команда'],
  ['Назначить ответственных', 'День 3', 'PM'],
];
