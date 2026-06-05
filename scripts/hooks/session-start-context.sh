#!/usr/bin/env bash
# SessionStart: грузим "горячий" Контент-завод Кайтен-контекст в системное напоминание.
# Цель — заменить дефолтный 47-КБ Vercel-knowledge-graph чем-то по делу.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=_lib.sh
source "$SCRIPT_DIR/_lib.sh"

INPUT="$(read_input)"
SOURCE="$(jq_get "$INPUT" '.source')"

cd "$PROJECT_DIR" 2>/dev/null || exit 0

# Скипаем для compact (контекст уже свежий) и clear (специально стёрто).
if [[ "$SOURCE" == "compact" || "$SOURCE" == "clear" ]]; then
  exit 0
fi

CTX=""

CTX+="# Контент-завод Кайтен session context (auto-loaded by SessionStart hook)\n\n"

# --- Последние коммиты ---
if git rev-parse --git-dir >/dev/null 2>&1; then
  CTX+="## Recent commits\n"
  CTX+="$(git log --oneline -8 2>/dev/null || echo 'n/a')\n\n"
fi

# --- Активные briefs ---
if [[ -d content/briefs ]]; then
  CTX+="## Active briefs (content/briefs/)\n"
  for f in content/briefs/*.json; do
    [[ -e "$f" ]] || continue
    CTX+="- $(basename "$f" .json)\n"
  done
  CTX+="\n"
fi

# --- Уже сгенерированные landings ---
if [[ -d generated/landings ]]; then
  CTX+="## Generated landings\n"
  for d in generated/landings/*/; do
    [[ -e "$d" ]] || continue
    CTX+="- $(basename "$d")\n"
  done
  CTX+="\n"
fi

# --- Последние 3 lesson из wiki ---
if [[ -f wiki/lessons.md ]]; then
  CTX+="## Latest lessons (wiki/lessons.md, top 3)\n"
  # H2-заголовки = правила, берём первые 3 после "## Правила"
  CTX+="$(awk '/^## Правила/{flag=1; next} flag && /^## /{print; count++} count==3{exit}' wiki/lessons.md 2>/dev/null || echo 'n/a')\n\n"
fi

# --- Доступные домены (из registry) ---
if [[ -f packages/harness/src/registry/domain-visual.ts ]]; then
  CTX+="## Covered domains\n"
  CTX+="$(grep -oE "domain: '[a-z]+'" packages/harness/src/registry/domain-visual.ts | sort -u | tr '\n' ' ')\n\n"
fi

CTX+="## Reminders (from memory)\n"
CTX+="- Новый brief → \`pnpm -w run harness agent build landing\` (auto-routing).\n"
CTX+="- Лендинг готов только после Playwright-скриншота, не HTTP 200.\n"
CTX+="- Mocks обязаны быть из своего домена (cross-domain reuse = блокер ревью).\n"
CTX+="- После задачи — commit + push в main, без переспрашивания.\n"

emit_additional_context "SessionStart" "$(printf '%b' "$CTX")"
