#!/usr/bin/env bash
# PostToolUse (Edit|Write): после правки TSX в критичных местах —
# отметить файл в .context/typecheck-pending и напомнить агенту запустить typecheck.
#
# Сам typecheck не запускаем (5-30s, заблокирует следующие действия). Вместо
# этого ведём очередь грязных файлов; pre-commit / Stop-хук может прогнать
# pnpm typecheck по затронутым пакетам.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=_lib.sh
source "$SCRIPT_DIR/_lib.sh"

INPUT="$(read_input)"
TOOL="$(jq_get "$INPUT" '.tool_name')"
PATH_ARG="$(jq_get "$INPUT" '.tool_input.file_path')"

case "$TOOL" in
  Edit|Write|MultiEdit) ;;
  *) exit 0 ;;
esac

[[ -n "$PATH_ARG" ]] || exit 0
REL="${PATH_ARG#$PROJECT_DIR/}"
REL="${REL#./}"

# Триггерим только на .tsx/.ts в критичных путях.
PACKAGE=""
case "$REL" in
  packages/ui/src/*.tsx|packages/ui/src/**/*.tsx|packages/ui/src/*.ts|packages/ui/src/**/*.ts)
    PACKAGE="@buffalo/ui" ;;
  apps/web/app/*.tsx|apps/web/app/**/*.tsx|apps/web/app/*.ts|apps/web/app/**/*.ts)
    PACKAGE="@buffalo/web" ;;
  packages/harness/src/*.ts|packages/harness/src/**/*.ts)
    PACKAGE="@buffalo/harness" ;;
  generated/landings/*.tsx|generated/landings/**/*.tsx)
    PACKAGE="@buffalo/web" ;;
  *)
    exit 0 ;;
esac

PENDING_FILE="$PROJECT_DIR/.context/typecheck-pending.txt"
mkdir -p "$(dirname "$PENDING_FILE")"
echo "$PACKAGE|$REL" >> "$PENDING_FILE"

# Считаем уникальные пакеты в очереди для напоминания.
PKGS_PENDING="$(awk -F'|' '{print $1}' "$PENDING_FILE" 2>/dev/null | sort -u | tr '\n' ' ')"

CTX="📝 Typecheck pending: ${REL} → ${PACKAGE}\n"
CTX+="Очередь пакетов: ${PKGS_PENDING}\n"
CTX+="Перед коммитом прогони: \`pnpm -r typecheck\` (или per-package).\n"
CTX+="Очередь чистится автоматически Stop-хуком после успешного typecheck."

emit_additional_context "PostToolUse" "$(printf '%b' "$CTX")"
