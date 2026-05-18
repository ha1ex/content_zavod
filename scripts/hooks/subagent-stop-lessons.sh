#!/usr/bin/env bash
# SubagentStop: после завершения сабагента (особенно Plan / Explore) —
# напоминаем top-3 lessons из wiki/lessons.md, чтобы основной агент мог
# свериться с накопленными правилами до того, как примет план в работу.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=_lib.sh
source "$SCRIPT_DIR/_lib.sh"

INPUT="$(read_input)"
AGENT_TYPE="$(jq_get "$INPUT" '.agent_type')"

cd "$PROJECT_DIR" 2>/dev/null || exit 0
[[ -f wiki/lessons.md ]] || exit 0

# Реагируем только на Plan/Explore/general-purpose — где результат
# влияет на дальнейшую генерацию.
case "$AGENT_TYPE" in
  Plan|Explore|general-purpose|"") ;;
  *) exit 0 ;;
esac

# Берём первые 3 правила (H2 после "## Правила"), только rule-line.
LESSONS="$(awk '
  /^## Правила/{section=1; next}
  section && /^## /{name=$0; count++; getline; while($0 !~ /^- \*\*rule:/ && NF) getline; if($0 ~ /^- \*\*rule:/) print name "\n  " $0; if(count==3) exit}
' wiki/lessons.md 2>/dev/null || true)"

[[ -n "$LESSONS" ]] || exit 0

CTX="🧠 Свериться с lessons перед применением плана сабагента (${AGENT_TYPE:-?}):\n\n${LESSONS}\n\nПолный список: wiki/lessons.md"

emit_additional_context "SubagentStop" "$(printf '%b' "$CTX")"
