#!/usr/bin/env bash
# Общая библиотека для hook-скриптов Buffalo.
# Источник правды: docs/pipeline.md, wiki/lessons.md.

set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
export PROJECT_DIR

# Безопасно читать stdin: при пустом вводе → "{}".
read_input() {
  local raw
  raw="$(cat || true)"
  if [[ -z "$raw" ]]; then
    echo "{}"
  else
    echo "$raw"
  fi
}

# jq-обёртка с graceful fallback на пустую строку.
jq_get() {
  local input="$1"
  local path="$2"
  echo "$input" | jq -r "$path // empty" 2>/dev/null || true
}

# Эмит JSON-ответ с additionalContext (виден агенту).
emit_additional_context() {
  local event="$1"
  local text="$2"
  jq -n \
    --arg event "$event" \
    --arg text "$text" \
    '{hookSpecificOutput:{hookEventName:$event, additionalContext:$text}}'
}

# Эмит system-сообщение (видит пользователь в чате).
emit_system_message() {
  local msg="$1"
  jq -n --arg msg "$msg" '{systemMessage:$msg}'
}

# Извлечь slug из пути / команды (kebab-case, 3-40 chars).
extract_slug() {
  local text="$1"
  echo "$text" | grep -oE '[a-z][a-z0-9-]{2,39}' | head -1 || true
}
