#!/usr/bin/env bash
# PreToolUse (Write|Edit): новый mock — напомнить про domain-fit ритуал.
# Mocks-папка плоская, поэтому жёстко блокировать по пути нельзя.
# Этот хук — warning + чек-лист, что обновить, чтобы избежать pm-board-в-CRM.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=_lib.sh
source "$SCRIPT_DIR/_lib.sh"

INPUT="$(read_input)"
TOOL="$(jq_get "$INPUT" '.tool_name')"
PATH_ARG="$(jq_get "$INPUT" '.tool_input.file_path')"

case "$TOOL" in
  Write|Edit|MultiEdit) ;;
  *) exit 0 ;;
esac

[[ -n "$PATH_ARG" ]] || exit 0
REL="${PATH_ARG#$PROJECT_DIR/}"
REL="${REL#./}"

# Триггер: создание Mock.tsx в packages/ui/src/landing/mocks/.
if [[ "$REL" != packages/ui/src/landing/mocks/*Mock.tsx ]]; then
  exit 0
fi

# Если файл уже существует — это правка, не создание. Скип.
if [[ -f "$PROJECT_DIR/$REL" && "$TOOL" != "Write" ]]; then
  exit 0
fi

MOCK_NAME="$(basename "$REL" .tsx)"

# Это warning (exit 0 с additionalContext), не блокер.
CTX=$(cat <<EOF
⚠️ Создаётся новый mock: ${MOCK_NAME}

Чтобы избежать инцидента «pm-board в CRM-лендинге» (см. wiki/lessons.md),
обнови вместе с mock'ом всю триаду:

1. **wiki/references/domain-mock-matrix.md** — добавь mock в раздел домена.
2. **packages/harness/src/registry/domain-visual.ts** — зеркало matrix
   (DOMAIN_REGISTRY → mocks с variant + sections + description).
3. **wiki/landings/<domain>-reference.md** — упомяни новый mock как пример
   в reference-документе домена.
4. **packages/ui/src/landing/index.ts** — re-export.
5. (опц.) **packages/ui/.storybook** — story для нового mock'а.

Hard-validator illustration-domain-match физически блокирует cross-domain
reuse, но только если matrix актуальна.
EOF
)

emit_additional_context "PreToolUse" "$CTX"
