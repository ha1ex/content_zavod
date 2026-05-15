# wiki/log.md

Append-only хроника операций harness'а. Формат записи:

```
## [YYYY-MM-DD HH:MM] <op> | <slug> | <status> | <note>
```

где `<op>` ∈ `{ingest, generate, repair, approve, handoff, lint, wiki-sync}`.

**Никогда не редактируйте прошлые записи. Только append.**

---

## [2026-05-15 17:53] wiki-init | — | ok | skeleton M1 создан (AGENTS.md, index.md, log.md, lessons.md, директории-стабы)
