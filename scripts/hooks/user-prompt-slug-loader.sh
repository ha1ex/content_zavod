#!/usr/bin/env bash
# UserPromptSubmit: ищем в промпте slug существующего brief'а
# и подгружаем компактную сводку (brief + последний spec + статус approval).

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=_lib.sh
source "$SCRIPT_DIR/_lib.sh"

INPUT="$(read_input)"
PROMPT="$(jq_get "$INPUT" '.prompt')"

cd "$PROJECT_DIR" 2>/dev/null || exit 0
[[ -d content/briefs ]] || exit 0

# Ищем slug, который совпадает с существующим brief.
FOUND_SLUG=""
for f in content/briefs/*.json; do
  [[ -e "$f" ]] || continue
  SLUG="$(basename "$f" .json)"
  # Точное совпадение со словом (word boundary).
  if echo "$PROMPT" | grep -qE "(^|[^a-z0-9-])${SLUG}([^a-z0-9-]|$)"; then
    FOUND_SLUG="$SLUG"
    break
  fi
done

[[ -n "$FOUND_SLUG" ]] || exit 0

CTX="# Auto-loaded context for slug: \`${FOUND_SLUG}\`\n\n"

# Brief summary (product / audience / pain / promise)
BRIEF="content/briefs/${FOUND_SLUG}.json"
if [[ -f "$BRIEF" ]]; then
  CTX+="## Brief (content/briefs/${FOUND_SLUG}.json)\n"
  CTX+="\`\`\`json\n"
  CTX+="$(jq '{product, market, audience, mainPain, mainPromise, primaryGoal}' "$BRIEF" 2>/dev/null || cat "$BRIEF")\n"
  CTX+="\`\`\`\n\n"
fi

# LandingSpec (если есть)
SPEC="content/landings/${FOUND_SLUG}.json"
if [[ -f "$SPEC" ]]; then
  CTX+="## LandingSpec exists: content/landings/${FOUND_SLUG}.json\n"
  CTX+="Sections: $(jq -r '.sections | length' "$SPEC" 2>/dev/null || echo '?')\n\n"
fi

# Approval status
APPROVAL="content/approvals/${FOUND_SLUG}.json"
if [[ -f "$APPROVAL" ]]; then
  STATUS="$(jq -r '.status // "unknown"' "$APPROVAL" 2>/dev/null)"
  CTX+="## Approval status: ${STATUS}\n\n"
fi

# Pipeline artifacts
PIPELINE_DIR=".context/pipeline/${FOUND_SLUG}"
if [[ -d "$PIPELINE_DIR" ]]; then
  CTX+="## Pipeline artifacts (.context/pipeline/${FOUND_SLUG}/)\n"
  CTX+="$(ls -1 "$PIPELINE_DIR" 2>/dev/null | head -10)\n\n"
fi

# Generated landing
GEN="generated/landings/${FOUND_SLUG}/page.tsx"
if [[ -f "$GEN" ]]; then
  LINES="$(wc -l < "$GEN" | tr -d ' ')"
  CTX+="## Generated TSX: ${GEN} (${LINES} lines)\n"
fi

emit_additional_context "UserPromptSubmit" "$(printf '%b' "$CTX")"
