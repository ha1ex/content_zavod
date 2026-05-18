#!/usr/bin/env bash
# PreCompact: сохраняем снимок состояния pipeline перед компактом,
# чтобы постcompact-агент мог быстро восстановить контекст.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=_lib.sh
source "$SCRIPT_DIR/_lib.sh"

cd "$PROJECT_DIR" 2>/dev/null || exit 0

TS="$(date +%Y%m%d-%H%M%S)"
DUMP_DIR="$PROJECT_DIR/.context/resume"
mkdir -p "$DUMP_DIR"
DUMP="$DUMP_DIR/$TS.md"

{
  echo "# Resume snapshot — $TS"
  echo "Saved by PreCompact hook before context compaction."
  echo ""

  echo "## Git status"
  echo '```'
  git status --short 2>/dev/null | head -40 || echo "n/a"
  echo '```'
  echo ""

  echo "## Recent commits"
  echo '```'
  git log --oneline -5 2>/dev/null || echo "n/a"
  echo '```'
  echo ""

  if [[ -d .context/pipeline ]]; then
    echo "## Pipeline artefacts in flight"
    for slug_dir in .context/pipeline/*/; do
      [[ -e "$slug_dir" ]] || continue
      slug="$(basename "$slug_dir")"
      echo "### $slug"
      echo '```'
      ls -1t "$slug_dir" 2>/dev/null | head -10
      echo '```'
    done
    echo ""
  fi

  PENDING="$PROJECT_DIR/.context/typecheck-pending.txt"
  if [[ -s "$PENDING" ]]; then
    echo "## Pending typecheck"
    echo '```'
    cat "$PENDING"
    echo '```'
  fi
} > "$DUMP"

# Ротация: храним только последние 10 снимков.
ls -1t "$DUMP_DIR"/*.md 2>/dev/null | tail -n +11 | xargs rm -f 2>/dev/null || true

emit_additional_context "PreCompact" "💾 State snapshot: .context/resume/$TS.md (для постcompact-восстановления)"
