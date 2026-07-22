import { cn } from '../../primitives/cn';
import { Prompt, Flag, OkLine } from './CliTerminalHeroMock';

/**
 * Компактное окно терминала с установкой Kaiten CLI одной командой и проверкой
 * версии. Используется в финальном призыве к действию (правая колонка
 * градиентного блока) и как самостоятельный визуал шага установки.
 * Домен: cli-community-edition.
 */
export function CliInstallMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative mx-auto w-full max-w-[460px] overflow-hidden rounded-(--radius-2xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_24px_60px_-28px_rgba(125,76,207,0.30)]',
      )}
    >
      <div className="space-y-2 bg-(--color-neutral-950) px-4 py-4 font-mono text-[11.5px] leading-relaxed">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <Prompt />
          <span className="text-(--color-neutral-000)">uv tool install</span>
        </div>
        <div className="break-all pl-3 text-(--color-green-100)">
          git+https://github.com/ViktorOgnev/kaiten-cli.git
        </div>
        <div className="pl-1 text-(--color-neutral-500)">Resolved 1 package · Installed kaiten-cli</div>
        <OkLine>установлено</OkLine>

        <div className="flex flex-wrap items-baseline gap-x-2 pt-1.5">
          <Prompt />
          <span className="text-(--color-neutral-000)">kaiten</span>
          <Flag>--version</Flag>
        </div>
        <div className="pl-1 text-(--color-neutral-400)">
          kaiten-cli <span className="text-(--color-blue-100)">0.1.27</span>
        </div>
      </div>
    </div>
  );
}
