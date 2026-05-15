#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { HARNESS_VERSION } from './index.js';
import { BriefSchema, IllustrationSpecSchema, LandingSpecSchema } from './schemas/index.js';
import {
  generateIllustrationTSXWithRepair,
  generateLandingSpecWithRepair,
  landingSpecFromBrief,
  pascalCase,
  renderIllustrationStory,
  renderIllustrationStub,
} from './pipeline/index.js';
import { renderLandingToTSX } from './render/index.js';
import { describeRegistry } from './registry/index.js';
import { describeActiveProvider, hasLLMCredentials } from './providers/index.js';
import {
  formatIllustrationErrors,
  formatLandingBrandErrors,
  formatLandingBusinessErrors,
  validateIllustrationTSX,
  validateLandingBrand,
  validateLandingBusiness,
} from './validators/index.js';
import { listApprovals, readApproval } from './approvals/index.js';
import type { ApprovalStatus } from './schemas/approval.js';
import { buildHandoff } from './handoff/index.js';

const ROOT = resolve(process.cwd());

async function findRepoRoot(start: string): Promise<string> {
  // Ищем pnpm-workspace.yaml вверх по дереву; CLI могут вызывать из подпакета.
  let dir = start;
  for (let i = 0; i < 10; i++) {
    try {
      await readFile(resolve(dir, 'pnpm-workspace.yaml'));
      return dir;
    } catch {
      // not found here, go up
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return start;
}

const program = new Command();

program
  .name('harness')
  .description('LLM harness CLI — генерация SaaS-лендингов из brief')
  .version(HARNESS_VERSION);

program
  .command('generate')
  .description('Сгенерировать артефакт из brief или illustration-spec')
  .argument('<kind>', 'тип артефакта: landing | illustration')
  .option('-b, --brief <path>', 'для landing: путь к brief.json')
  .option('-S, --spec <path>', 'для illustration: путь к IllustrationSpec.json')
  .option('-s, --slug <slug>', 'slug черновика (только для landing)', 'draft')
  .option('--no-llm', 'детерминированный fallback вместо LLM (для тестов/CI)')
  .option(
    '--strict',
    'при ошибках валидатора падать (без --strict — печатает и пишет файл)',
    false,
  )
  .option(
    '--max-repair-attempts <n>',
    'сколько попыток LLM с фидбеком ошибок валидатора (включая первую)',
    '2',
  )
  .action(
    async (
      kind: string,
      opts: {
        brief?: string;
        spec?: string;
        slug: string;
        llm: boolean;
        strict: boolean;
        maxRepairAttempts: string;
      },
    ) => {
      const root = await findRepoRoot(ROOT);
      const maxAttempts = Math.max(1, Number.parseInt(opts.maxRepairAttempts, 10) || 1);

      if (kind === 'landing') {
        await runGenerateLanding(root, { ...opts, maxAttempts });
        return;
      }
      if (kind === 'illustration') {
        await runGenerateIllustration(root, { ...opts, maxAttempts });
        return;
      }
      console.error(chalk.red(`[harness] kind=${kind} не поддерживается (landing | illustration)`));
      process.exit(1);
    },
  );

async function runGenerateLanding(
  root: string,
  opts: { brief?: string; slug: string; llm: boolean; strict: boolean; maxAttempts: number },
) {
  if (!opts.brief) {
    console.error(chalk.red('[harness] --brief обязателен для landing'));
    process.exit(1);
  }

  const briefPath = resolve(root, opts.brief);
  console.log(chalk.cyan(`[harness] read brief: ${briefPath}`));

  const briefRaw = await readFile(briefPath, 'utf-8');
  const brief = BriefSchema.parse(JSON.parse(briefRaw));

  const wantLLM = opts.llm !== false;
  const canLLM = hasLLMCredentials();
  const useLLM = wantLLM && canLLM;

  let spec;
  if (useLLM) {
    console.log(chalk.cyan(`[harness] provider: ${describeActiveProvider()}`));
    console.log(chalk.dim(`[harness] LLM + repair-loop (max ${opts.maxAttempts} attempts)…`));
    const repair = await generateLandingSpecWithRepair(brief, { maxAttempts: opts.maxAttempts });
    if (repair.ok) {
      console.log(chalk.green(`[harness] ✓ landing valid after ${repair.attempts.length} attempt(s)`));
    } else {
      console.log(chalk.red(`[harness] ✗ landing has ${repair.finalErrors.length} unresolved error(s) after ${repair.attempts.length} attempt(s):`));
      const brandErrs = repair.finalErrors.filter((e) => e.kind === 'brand');
      const bizErrs = repair.finalErrors.filter((e) => e.kind === 'business');
      if (brandErrs.length) console.log(formatLandingBrandErrors({ ok: false, errors: brandErrs }));
      if (bizErrs.length) console.log(formatLandingBusinessErrors({ ok: false, errors: bizErrs }));
      if (opts.strict || !repair.result) {
        console.error(chalk.red('[harness] aborting (--strict или нет кандидата).'));
        process.exit(1);
      }
      console.log(chalk.yellow('[harness] пишу последнего кандидата (без --strict).'));
    }
    spec = repair.result;
  } else {
    const reason = !wantLLM ? '--no-llm' : 'no API key';
    console.log(chalk.yellow(`[harness] deterministic fallback (${reason})`));
    spec = landingSpecFromBrief(brief);
    // и пост-валидация для отчёта
    const brand = validateLandingBrand(spec);
    const biz = validateLandingBusiness(spec, brief);
    if (!brand.ok) console.log(formatLandingBrandErrors(brand));
    if (!biz.ok) console.log(formatLandingBusinessErrors(biz));
  }

  if (!spec) {
    console.error(chalk.red('[harness] нет финального spec — выход.'));
    process.exit(1);
  }

  const specPath = resolve(root, 'content', 'landings', `${opts.slug}.json`);
  await mkdir(dirname(specPath), { recursive: true });
  await writeFile(specPath, JSON.stringify(spec, null, 2) + '\n', 'utf-8');
  console.log(chalk.green(`[harness] ✓ spec  → ${specPath}`));

  const tsx = renderLandingToTSX(spec, opts.slug);
  const tsxPath = resolve(root, 'generated', 'landings', opts.slug, 'page.tsx');
  await mkdir(dirname(tsxPath), { recursive: true });
  await writeFile(tsxPath, tsx, 'utf-8');
  console.log(chalk.green(`[harness] ✓ tsx   → ${tsxPath}`));

  console.log(chalk.dim(`\nПревью: http://localhost:3000/landings/${opts.slug}`));
}

async function runGenerateIllustration(
  root: string,
  opts: { spec?: string; llm: boolean; strict: boolean; maxAttempts: number },
) {
  if (!opts.spec) {
    console.error(chalk.red('[harness] --spec <path> обязателен для illustration'));
    process.exit(1);
  }

  const specPath = resolve(root, opts.spec);
  console.log(chalk.cyan(`[harness] read spec: ${specPath}`));
  const specRaw = await readFile(specPath, 'utf-8');
  const spec = IllustrationSpecSchema.parse(JSON.parse(specRaw));

  const wantLLM = opts.llm !== false;
  const canLLM = hasLLMCredentials();
  const useLLM = wantLLM && canLLM;

  let tsx: string;
  let validatorPassed = true;
  if (useLLM) {
    console.log(chalk.cyan(`[harness] provider: ${describeActiveProvider()}`));
    console.log(chalk.dim(`[harness] LLM + repair-loop (max ${opts.maxAttempts} attempts)…`));
    const repair = await generateIllustrationTSXWithRepair(spec, { maxAttempts: opts.maxAttempts });
    if (repair.ok && repair.result) {
      console.log(chalk.green(`[harness] ✓ AST clean after ${repair.attempts.length} attempt(s)`));
      tsx = repair.result;
    } else {
      validatorPassed = false;
      console.log(chalk.red(`[harness] ✗ AST: ${repair.finalErrors.length} unresolved error(s) after ${repair.attempts.length} attempt(s)`));
      console.log(formatIllustrationErrors({ ok: false, errors: repair.finalErrors }));
      if (opts.strict || !repair.result) {
        console.error(chalk.red('[harness] aborting (--strict или нет кандидата). Файл не записан.'));
        process.exit(1);
      }
      console.log(chalk.yellow('[harness] продолжаю запись последнего кандидата (без --strict).'));
      tsx = repair.result;
    }
  } else {
    const reason = !wantLLM ? '--no-llm' : 'no API key';
    console.log(chalk.yellow(`[harness] deterministic stub (${reason})`));
    tsx = renderIllustrationStub(spec);
    const result = validateIllustrationTSX(tsx);
    if (result.ok) {
      console.log(chalk.green('[harness] ✓ AST validator passed (stub)'));
    } else {
      validatorPassed = false;
      console.log(chalk.red(`[harness] ✗ stub AST violations: ${result.errors.length}`));
      console.log(formatIllustrationErrors(result));
      if (opts.strict) {
        console.error(chalk.red('[harness] aborting (--strict).'));
        process.exit(1);
      }
    }
  }
  void validatorPassed;

  const Name = pascalCase(spec.id);
  const outDir = resolve(root, 'packages', 'ui', 'src', 'illustrations');
  const tsxPath = resolve(outDir, `${Name}.tsx`);
  const storyPath = resolve(outDir, `${Name}.stories.tsx`);
  await mkdir(outDir, { recursive: true });
  await writeFile(tsxPath, tsx, 'utf-8');
  console.log(chalk.green(`[harness] ✓ tsx   → ${tsxPath}`));
  await writeFile(storyPath, renderIllustrationStory(spec), 'utf-8');
  console.log(chalk.green(`[harness] ✓ story → ${storyPath}`));

  await upsertIllustrationBarrel(outDir, Name);
  console.log(chalk.dim(`\nStorybook: http://localhost:6006/?path=/story/illustrations-${Name.toLowerCase()}--light`));
}

async function upsertIllustrationBarrel(outDir: string, Name: string) {
  const barrelPath = resolve(outDir, 'index.ts');
  let body = '';
  try {
    body = await readFile(barrelPath, 'utf-8');
  } catch {
    body = '';
  }
  const exportLine = `export { default as ${Name} } from './${Name}.js';`;
  if (body.includes(exportLine)) return;
  const stripped = body.replace(/^\/\/ Этап 3:.*$/m, '').replace(/^export \{\};\s*$/m, '').trim();
  const next = `// Auto-maintained barrel for generated SVG illustrations.\n${stripped ? stripped + '\n' : ''}${exportLine}\n`;
  await writeFile(barrelPath, next, 'utf-8');
}

program
  .command('validate')
  .description('Валидировать существующий spec')
  .argument('<slug>', 'slug черновика')
  .action(async (slug: string) => {
    const root = await findRepoRoot(ROOT);
    const path = resolve(root, 'content', 'landings', `${slug}.json`);
    const raw = await readFile(path, 'utf-8');
    const parsed = LandingSpecSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) {
      console.error(chalk.red(`[harness] ✗ spec invalid`));
      console.error(parsed.error.format());
      process.exit(1);
    }
    console.log(chalk.green(`[harness] ✓ spec valid (${parsed.data.sections.length} sections)`));
  });

program
  .command('registry')
  .description('Показать component registry (для system prompt LLM)')
  .action(() => {
    console.log(describeRegistry());
  });

program
  .command('providers')
  .description('Показать активный LLM-провайдер и наличие ключей')
  .action(() => {
    console.log(`[harness] ${describeActiveProvider()}`);
    if (!hasLLMCredentials()) {
      console.log(
        chalk.yellow(
          '\nLLM недоступен. Положите ключ в .env.local:\n' +
            '  AI_GATEWAY_API_KEY=...   (рекомендуется)\n' +
            '  ANTHROPIC_API_KEY=...    (direct fallback)\n' +
            '  OPENAI_API_KEY=...       (direct fallback)\n',
        ),
      );
    }
  });

const approvals = program.command('approvals').description('Работа с approval-статусами лендингов');

approvals
  .command('list')
  .description('Список всех approval-файлов со статусами')
  .action(async () => {
    const root = await findRepoRoot(ROOT);
    const items = await listApprovals(root);
    if (items.length === 0) {
      console.log(chalk.yellow('[harness] нет approval-файлов в content/approvals/'));
      return;
    }
    const STATUS_COLOR: Record<ApprovalStatus, (s: string) => string> = {
      pending: chalk.dim,
      changes_requested: chalk.yellow,
      approved: chalk.green,
      rejected: chalk.red,
    };
    for (const a of items) {
      const tag = STATUS_COLOR[a.status](`[${a.status}]`);
      const reviewer = a.reviewer ? ` · ${a.reviewer}` : '';
      console.log(`${tag} ${a.slug}${reviewer} · ${a.updatedAt}`);
    }
  });

approvals
  .command('status')
  .description('Подробный статус для конкретного slug')
  .argument('<slug>', 'slug черновика')
  .action(async (slug: string) => {
    const root = await findRepoRoot(ROOT);
    const a = await readApproval(root, slug);
    console.log(JSON.stringify(a, null, 2));
  });

approvals
  .command('check')
  .description('CI-проверка: все ли указанные slug одобрены (exit≠0 если нет)')
  .argument('<slugs...>', 'один или несколько slug')
  .action(async (slugs: string[]) => {
    const root = await findRepoRoot(ROOT);
    let bad = 0;
    for (const slug of slugs) {
      const a = await readApproval(root, slug);
      if (a.status === 'approved') {
        console.log(chalk.green(`✓ ${slug} approved`));
      } else {
        console.log(chalk.red(`✗ ${slug} status=${a.status}`));
        bad++;
      }
    }
    if (bad > 0) process.exit(1);
  });

program
  .command('handoff')
  .description('Собрать ZIP-пакет для передачи разработчикам')
  .argument('<slug>', 'slug черновика')
  .option('--require-approved', 'отказать если approval.status != approved', false)
  .option('-o, --out <path>', 'путь к ZIP (по умолчанию <root>/out/landing-<slug>.zip)')
  .action(async (slug: string, opts: { requireApproved: boolean; out?: string }) => {
    const root = await findRepoRoot(ROOT);

    if (opts.requireApproved) {
      const approval = await readApproval(root, slug);
      if (approval.status !== 'approved') {
        console.error(
          chalk.red(
            `[harness] handoff blocked: approval.status="${approval.status}" (требуется "approved"). ` +
              `Открой /approve/${slug} в Next.js или сними флаг --require-approved.`,
          ),
        );
        process.exit(1);
      }
      console.log(chalk.green(`[harness] ✓ approval check passed (${approval.reviewer ?? 'unknown'})`));
    }

    console.log(chalk.cyan(`[harness] handoff ${slug}…`));
    const t0 = Date.now();
    const manifest = await buildHandoff(slug, { root, outPath: opts.out });
    const ms = Date.now() - t0;
    const kb = (manifest.bytes / 1024).toFixed(1);
    console.log(chalk.green(`[harness] ✓ ZIP → ${manifest.zipPath} (${kb} KB, ${manifest.files.length} files, ${ms}ms)`));
    console.log(chalk.dim(`         components: ${manifest.components.join(', ') || '(none)'}`));
    if (manifest.illustrations.length) {
      console.log(chalk.dim(`         illustrations: ${manifest.illustrations.join(', ')}`));
    }
  });

program.parseAsync(process.argv).catch((err) => {
  console.error(chalk.red('[harness] fatal:'), err);
  process.exit(1);
});
