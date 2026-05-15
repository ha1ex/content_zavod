#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { HARNESS_VERSION } from './index.js';

const program = new Command();

program
  .name('harness')
  .description('LLM harness CLI — генерация SaaS-лендингов из brief')
  .version(HARNESS_VERSION);

program
  .command('generate')
  .description('Сгенерировать артефакт из brief')
  .argument('<kind>', 'тип артефакта: landing | illustration')
  .option('-b, --brief <path>', 'путь к brief.json')
  .option('-s, --slug <slug>', 'slug черновика')
  .action(async (kind: string, opts: { brief?: string; slug?: string }) => {
    console.log(chalk.cyan(`[harness] generate ${kind}`));
    console.log(chalk.dim(`  brief: ${opts.brief ?? '(none)'}`));
    console.log(chalk.dim(`  slug:  ${opts.slug ?? '(auto)'}`));
    console.log(
      chalk.yellow(
        '⏳ Пайплайн ещё не подключён — это skeleton (этап 0). Следующий шаг: этап 1.',
      ),
    );
  });

program
  .command('validate')
  .description('Валидировать существующий spec')
  .argument('<slug>', 'slug черновика')
  .action((slug: string) => {
    console.log(chalk.cyan(`[harness] validate ${slug}`));
    console.log(chalk.yellow('⏳ Validators будут добавлены на этапе 4.'));
  });

program
  .command('handoff')
  .description('Собрать ZIP-пакет для передачи разработчикам')
  .argument('<slug>', 'slug черновика')
  .action((slug: string) => {
    console.log(chalk.cyan(`[harness] handoff ${slug}`));
    console.log(chalk.yellow('⏳ Handoff pipeline будет добавлен на этапе 6.'));
  });

program
  .command('registry')
  .description('Перегенерировать component registry из Storybook stories')
  .action(() => {
    console.log(chalk.cyan('[harness] registry'));
    console.log(chalk.yellow('⏳ Registry extractor будет добавлен на этапе 1.'));
  });

program.parseAsync(process.argv).catch((err) => {
  console.error(chalk.red('[harness] fatal:'), err);
  process.exit(1);
});
