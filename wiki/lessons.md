# wiki/lessons.md

Кумулятивные правила, извлечённые из прошлых генераций, фидбэка ревьюеров и lint-замечаний. Используется repair-loop'ом (M4c): по типу validation-ошибки находятся релевантные записи и подмешиваются в repair-prompt как additional guidance.

## Формат записи

Каждое правило — H2-заголовок (slug-kebab-case), под ним:

```markdown
## <slug>
- **rule:** одна строка с правилом
- **constraint:** machine-readable tag для lessons-loader (например, `subtitle.length`, `hero.headline.tone`)
- **applies_to:** archetype/audience/component, к которым относится
- **reason:** почему это правило важно
- **first_observed:** YYYY-MM-DD slug-первого-инцидента
```

## Правила

_(пока пусто — заполняется по мере фидбэка и repair-инцидентов)_
