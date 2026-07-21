#!/usr/bin/env bash
# PreToolUse (Edit|Write): briefs IMMUTABLE.
# Блокируем перезапись существующего brief'а. Новые версии — отдельным файлом.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=_lib.sh
source "$SCRIPT_DIR/_lib.sh"

INPUT="$(read_input)"
TOOL="$(jq_get "$INPUT" '.tool_name')"
PATH_ARG="$(jq_get "$INPUT" '.tool_input.file_path')"

# Только Edit/Write/MultiEdit интересны.
case "$TOOL" in
  Edit|Write|MultiEdit|NotebookEdit) ;;
  *) exit 0 ;;
esac

[[ -n "$PATH_ARG" ]] || exit 0

# Нормализуем путь: убираем PROJECT_DIR в начале если есть.
REL="${PATH_ARG#$PROJECT_DIR/}"
REL="${REL#./}"

# Триггерится только на content/briefs/*.json
if [[ "$REL" != content/briefs/*.json ]]; then
  exit 0
fi

# Если файла ещё нет — это создание нового brief'а, разрешаем.
if [[ ! -f "$PROJECT_DIR/$REL" ]]; then
  exit 0
fi

# Исключение (правило operator-section-order): правка ТОЛЬКО поля sectionOrder
# в существующем брифе разрешена. Для Write доступен полный новый контент —
# сверяем точно. Для Edit/MultiEdit итог заранее не вычислить — пропускаем с
# предупреждением (authoritative-проверку сделает agent apply и pre-commit).
if command -v jq >/dev/null 2>&1; then
  if [[ "$TOOL" == "Write" ]]; then
    NEW_CONTENT="$(jq_get "$INPUT" '.tool_input.content')"
    OLD_N="$(jq -S 'del(.sectionOrder)' "$PROJECT_DIR/$REL" 2>/dev/null || echo '__ERR_O__')"
    NEW_N="$(printf '%s' "$NEW_CONTENT" | jq -S 'del(.sectionOrder)' 2>/dev/null || echo '__ERR_N__')"
    if [[ "$OLD_N" != '__ERR_O__' && "$NEW_N" != '__ERR_N__' && "$OLD_N" == "$NEW_N" ]]; then
      exit 0  # изменён только sectionOrder — разрешено
    fi
  else
    echo "⚠ briefs: в существующем брифе разрешена правка ТОЛЬКО поля sectionOrder (operator-section-order). Прочие изменения будут отклонены на agent apply / pre-commit." >&2
    exit 0
  fi
fi

# Существующий brief → блок.
SLUG="$(basename "$REL" .json)"
cat >&2 <<EOF
🛑 BLOCKED: content/briefs/ — IMMUTABLE (см. docs/pipeline.md, README.md).

Файл $REL уже существует. Бриф нельзя перезаписывать — это исходник, на
который ссылаются LandingSpec, approvals и diversity-audit.

Что делать:
  • Если нужна новая итерация — создай content/briefs/${SLUG}-v2.json.
  • Если нужно поменять копию/SEO — правь LandingSpec (content/landings/${SLUG}.json),
    а не brief.
  • Если действительно нужно править исходник — обсуди с пользователем
    и временно отключи hook через --no-hooks или .claude/settings.local.json.
EOF
exit 2
