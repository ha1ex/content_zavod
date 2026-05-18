#!/usr/bin/env bash
# Stop: финальный чек-лист релиза лендинга.
# Не блокирует завершение — только напоминает через systemMessage.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=_lib.sh
source "$SCRIPT_DIR/_lib.sh"

cd "$PROJECT_DIR" 2>/dev/null || exit 0
git rev-parse --git-dir >/dev/null 2>&1 || exit 0

WARN=""

# 1. Uncommitted в критичных директориях.
DIRTY="$(git status --porcelain 2>/dev/null | grep -E ' (generated/|wiki/|content/landings/|packages/ui/|packages/harness/|apps/web/|\.claude/)' || true)"
if [[ -n "$DIRTY" ]]; then
  COUNT="$(echo "$DIRTY" | wc -l | tr -d ' ')"
  WARN+="📦 Uncommitted: $COUNT файлов в критичных директориях. "
  WARN+="Правило: после задачи → commit + push в main без переспрашивания. "
fi

# 2. Pending typecheck.
PENDING="$PROJECT_DIR/.context/typecheck-pending.txt"
if [[ -s "$PENDING" ]]; then
  PKGS="$(awk -F'|' '{print $1}' "$PENDING" | sort -u | tr '\n' ' ')"
  WARN+="🔧 Typecheck pending: $PKGS. Прогоните \`pnpm -r typecheck\`, "
  WARN+="затем очистите: \`> .context/typecheck-pending.txt\`. "
fi

# 3. Изменения в generated/landings/ без визуальной верификации.
GEN_CHANGED="$(git status --porcelain 2>/dev/null | grep 'generated/landings/' || true)"
if [[ -n "$GEN_CHANGED" ]]; then
  WARN+="📸 Лендинг изменён — обязателен Playwright-снимок и сверка с design-system/ перед merge "
  WARN+="(HTTP 200 не критерий, см. memory). "
fi

# 4. Изменён brief, но не обновлён wiki/landings/<slug>.md.
BRIEFS_CHANGED="$(git status --porcelain 2>/dev/null | grep -oE 'content/briefs/[a-z0-9-]+\.json' | sort -u || true)"
for BF in $BRIEFS_CHANGED; do
  SLUG="$(basename "$BF" .json)"
  if ! git status --porcelain 2>/dev/null | grep -q "wiki/landings/${SLUG}.md"; then
    WARN+="📚 Brief $SLUG изменён, но wiki/landings/${SLUG}.md не обновлён. "
  fi
done

[[ -z "$WARN" ]] && exit 0

emit_system_message "Pre-stop checklist: $WARN"
