# wiki/log.md

Append-only хроника операций harness'а. Формат записи:

```
## [YYYY-MM-DD HH:MM] <op> | <slug> | <status> | <note>
```

где `<op>` ∈ `{ingest, generate, repair, approve, handoff, lint, wiki-sync}`.

**Никогда не редактируйте прошлые записи. Только append.**

---

## [2026-05-15 17:53] wiki-init | — | ok | skeleton M1 создан (AGENTS.md, index.md, log.md, lessons.md, директории-стабы)

## [2026-05-15 21:52] generate | test-kaiten | ok | agent-ingest archetype=saas_landing sections=6 errors=0

## [2026-05-15 22:06] generate | kaiten-support | ok | agent-ingest archetype=saas_landing sections=7 errors=0

## [2026-05-15 22:20] generate | kaiten-support | ok | agent-ingest archetype=saas_landing sections=10 errors=0

## [2026-05-15 22:36] generate | kaiten-support | ok | agent-ingest archetype=saas_landing sections=12 errors=0

## [2026-05-15 22:43] generate | kaiten-support | ok | agent-ingest archetype=saas_landing sections=14 errors=0

## [2026-05-16 07:32] generate | kaiten-support | ok | agent-ingest archetype=saas_landing sections=14 errors=0 audienceScore=79.89/70

## [2026-05-16 08:06] generate | kaiten-platform | ok | agent-ingest archetype=saas_landing sections=14 errors=0

## [2026-05-16 08:08] generate | kaiten-platform | ok | agent-ingest archetype=saas_landing sections=14 errors=0

## [2026-05-16 08:31] generate | kaiten-platform | fail | agent-ingest archetype=saas_landing sections=14 errors=2 audienceScore=84.16/70

## [2026-05-16 08:32] generate | kaiten-platform | fail | agent-ingest archetype=saas_landing sections=14 errors=3 audienceScore=84.16/70

## [2026-05-16 08:33] generate | kaiten-platform | ok | agent-ingest archetype=saas_landing sections=16 errors=0 audienceScore=87.06/70

## [2026-05-16 09:01] generate | crm | ok | agent-ingest archetype=saas_landing sections=18 errors=0

## [2026-05-16 09:30] generate | crm | ok | agent-ingest archetype=saas_landing sections=15 errors=0

## [2026-05-16 09:48] generate | crm | fail | agent-ingest archetype=saas_landing sections=15 errors=1 audienceScore=78.49/70

## [2026-05-16 09:48] generate | crm | fail | agent-ingest archetype=saas_landing sections=15 errors=2 audienceScore=78.49/70

## [2026-05-16 09:48] generate | test-hr | fail | agent-ingest archetype=saas_landing sections=2 errors=1

## [2026-05-16 09:48] generate | crm | ok | agent-ingest archetype=saas_landing sections=15 errors=0

## [2026-05-16 10:02] generate | test-hr | ok | agent-ingest archetype=saas_landing sections=3 errors=0

## [2026-05-16 10:07] generate | test-finance | ok | agent-ingest archetype=saas_landing sections=3 errors=0

## [2026-05-16 10:41] generate | crm | ok | agent-ingest archetype=saas_landing sections=15 errors=0

## [2026-05-16 10:42] generate | crm | fail | agent-ingest archetype=saas_landing sections=15 errors=1

## [2026-05-16 10:42] generate | crm | ok | agent-ingest archetype=saas_landing sections=15 errors=0

## [2026-05-16 10:43] generate | test-hr | ok | agent-ingest archetype=saas_landing sections=3 errors=0

## [2026-05-16 10:43] generate | test-hr | fail | agent-ingest archetype=saas_landing sections=3 errors=1

## [2026-05-16 10:46] generate | knowledge-base | fail | agent-ingest archetype=saas_landing sections=16 errors=3 audienceScore=67.62/70

## [2026-05-16 10:47] generate | knowledge-base | ok | agent-ingest archetype=saas_landing sections=17 errors=0 audienceScore=83.91/70

## [2026-05-27 18:58] generate | kaiten-manufacturing | fail | agent-ingest archetype=saas_landing sections=14 errors=2 audienceScore=83.21/70

## [2026-05-27 18:59] generate | kaiten-manufacturing | ok | agent-ingest archetype=saas_landing sections=14 errors=0 audienceScore=84.65/70

## [2026-06-10 13:13] lint | — | ok | scope=agents files=0 errors=0 warnings=0

## [2026-06-10 13:14] wiki-index | — | ok | pages=69 changed=true

## [2026-06-10 13:23] lint | — | fail | scope=all files=77 errors=8 warnings=69

## [2026-06-10 13:24] lint | — | fail | scope=all files=77 errors=8 warnings=69

## [2026-06-10 13:24] wiki-sync | — | ok | written=8 unchanged=0 missing=0

## [2026-06-10 13:24] lint | — | ok | scope=all files=77 errors=0 warnings=69

## [2026-06-25 00:53] generate | crm | fail | agent-ingest archetype=saas_landing sections=15 errors=1 audienceScore=78.49/70

## [2026-06-25 00:59] generate | crm | ok | agent-ingest archetype=saas_landing sections=15 errors=0 audienceScore=78.49/70

## [2026-07-01 12:26] generate | crm | ok | agent-ingest archetype=saas_landing sections=16 errors=0 audienceScore=78.49/70

## [2026-07-01 13:22] generate | kaiten-finance | ok | agent-ingest archetype=enterprise_landing sections=15 errors=0 audienceScore=85.34/70

## [2026-07-01 14:58] generate | kaiten-finance | ok | agent-ingest archetype=enterprise_landing sections=12 errors=0 audienceScore=85.34/70

## [2026-07-01 15:05] generate | kaiten-finance | ok | agent-ingest archetype=enterprise_landing sections=12 errors=0 audienceScore=85.34/70

## [2026-07-01 15:44] generate | kaiten-finance | fail | agent-ingest archetype=enterprise_landing sections=12 errors=4 audienceScore=85.34/70

## [2026-07-01 15:52] generate | kaiten-finance | fail | agent-ingest archetype=enterprise_landing sections=12 errors=3 audienceScore=85.34/70

## [2026-07-01 15:54] generate | kaiten-finance | ok | agent-ingest archetype=enterprise_landing sections=12 errors=0 audienceScore=85.34/70

## [2026-07-01 16:07] generate | kaiten-finance | ok | agent-ingest archetype=enterprise_landing sections=12 errors=0 audienceScore=85.34/70

## [2026-07-01 16:21] generate | kaiten-finance | fail | agent-ingest archetype=enterprise_landing sections=12 errors=1 audienceScore=85.34/70

## [2026-07-01 16:21] generate | kaiten-finance | ok | agent-ingest archetype=enterprise_landing sections=12 errors=0 audienceScore=85.34/70

## [2026-07-01 23:08] generate | kaiten-finance | ok | agent-ingest archetype=enterprise_landing sections=12 errors=0 audienceScore=85.34/70

## [2026-07-01 23:30] generate | kaiten-finance | ok | agent-ingest archetype=enterprise_landing sections=12 errors=0 audienceScore=85.34/70

## [2026-07-02 00:14] generate | kaiten-finance | ok | agent-ingest archetype=enterprise_landing sections=12 errors=0 audienceScore=85.34/70

## [2026-07-02 00:43] generate | kaiten-finance | ok | agent-ingest archetype=enterprise_landing sections=12 errors=0 audienceScore=85.34/70

## [2026-07-02 01:22] generate | kaiten-retail | ok | agent-ingest archetype=saas_landing sections=12 errors=0 audienceScore=75.2/70

## [2026-07-02 11:10] generate | kaiten-retail | ok | agent-ingest archetype=saas_landing sections=12 errors=0 audienceScore=75.2/70

## [2026-07-02 11:18] generate | kaiten-retail | ok | agent-ingest archetype=saas_landing sections=13 errors=0 audienceScore=87.32/70

## [2026-07-02 11:25] generate | kaiten-retail | ok | agent-ingest archetype=saas_landing sections=13 errors=0 audienceScore=83.35/70

## [2026-07-02 11:43] generate | kaiten-retail | ok | agent-ingest archetype=saas_landing sections=16 errors=0 audienceScore=94.87/70

## [2026-07-02 12:01] generate | kaiten-retail | ok | agent-ingest archetype=saas_landing sections=16 errors=0 audienceScore=94.87/70

## [2026-07-02 12:31] generate | kaiten-retail | ok | agent-ingest archetype=saas_landing sections=16 errors=0 audienceScore=94.87/70

## [2026-07-02 12:44] generate | kaiten-retail | ok | agent-ingest archetype=saas_landing sections=16 errors=0 audienceScore=94.87/70

## [2026-07-02 13:16] generate | kaiten-retail | ok | agent-ingest archetype=saas_landing sections=16 errors=0 audienceScore=94.87/70

## [2026-07-02 13:42] generate | kaiten-retail | ok | agent-ingest archetype=saas_landing sections=16 errors=0 audienceScore=94.87/70

## [2026-07-02 14:28] generate | kaiten-mcp | fail | agent-ingest archetype=saas_landing sections=12 errors=4 audienceScore=60.63/70

## [2026-07-02 14:39] generate | kaiten-mcp | ok | agent-ingest archetype=saas_landing sections=13 errors=0 audienceScore=89.12/70

## [2026-07-02 14:40] generate | kaiten-mcp | ok | agent-ingest archetype=saas_landing sections=13 errors=0 audienceScore=89.12/70

## [2026-07-02 15:39] generate | kaiten-mcp | ok | agent-ingest archetype=saas_landing sections=13 errors=0 audienceScore=89.12/70

## [2026-07-02 16:20] generate | kaiten-retail | ok | agent-ingest archetype=saas_landing sections=16 errors=0 audienceScore=94.87/70

## [2026-07-02 16:39] generate | kaiten-retail | ok | agent-ingest archetype=saas_landing sections=16 errors=0 audienceScore=94.87/70

## [2026-07-02 17:03] generate | kaiten-retail | ok | agent-ingest archetype=saas_landing sections=16 errors=0 audienceScore=94.87/70

## [2026-07-02 17:09] generate | kaiten-finance | ok | agent-ingest archetype=enterprise_landing sections=12 errors=0 audienceScore=85.34/70

## [2026-07-02 18:42] generate | kaiten-mcp | ok | agent-ingest archetype=saas_landing sections=13 errors=0 audienceScore=88.34/70

## [2026-07-15 20:50] generate | kaiten-clickup | ok | agent-ingest archetype=saas_landing sections=14 errors=0 audienceScore=79.31/70

## [2026-07-15 20:50] generate | kaiten-clickup | ok | agent-ingest archetype=saas_landing sections=14 errors=0 audienceScore=79.31/70

## [2026-07-15 21:43] generate | kaiten-clickup | ok | agent-ingest archetype=saas_landing sections=10 errors=0 audienceScore=77.75/70

## [2026-07-15 22:15] generate | kaiten-clickup | ok | agent-ingest archetype=saas_landing sections=10 errors=0 audienceScore=77.75/90

## [2026-07-15 22:15] generate | crm | fail | agent-ingest archetype=saas_landing sections=16 errors=1 audienceScore=78.49/90

## [2026-07-15 22:16] generate | kaiten-clickup | ok | agent-ingest archetype=saas_landing sections=10 errors=0 audienceScore=77.75/70

## [2026-07-15 22:40] generate | kaiten-clickup | ok | agent-ingest archetype=saas_landing sections=10 errors=0 audienceScore=77.75/70

## [2026-07-15 23:08] generate | kaiten-clickup | ok | agent-ingest archetype=saas_landing sections=10 errors=0 audienceScore=77.75/70

## [2026-07-15 23:24] generate | kaiten-clickup | fail | agent-ingest archetype=saas_landing sections=10 errors=1 audienceScore=77.75/70

## [2026-07-15 23:24] generate | kaiten-clickup | fail | agent-ingest archetype=saas_landing sections=10 errors=1 audienceScore=77.75/70

## [2026-07-15 23:25] generate | kaiten-clickup | ok | agent-ingest archetype=saas_landing sections=10 errors=0 audienceScore=77.75/70

## [2026-07-15 23:33] generate | kaiten-clickup | ok | agent-ingest archetype=saas_landing sections=10 errors=0 audienceScore=77.75/70

## [2026-07-16 00:29] generate | kaiten-clickup | ok | agent-ingest archetype=saas_landing sections=10 errors=0 audienceScore=77.75/70

## [2026-07-16 01:08] generate | kaiten-clickup | ok | agent-ingest archetype=saas_landing sections=10 errors=0 audienceScore=77.75/70

## [2026-07-16 21:09] generate | kaiten-clickup | ok | agent-ingest archetype=saas_landing sections=10 errors=0 audienceScore=77.75/70

## [2026-07-16 21:27] generate | kaiten-clickup | ok | agent-ingest archetype=saas_landing sections=10 errors=0 audienceScore=77.28/70

## [2026-07-16 21:34] generate | kaiten-clickup | ok | agent-ingest archetype=saas_landing sections=11 errors=0 audienceScore=77.28/70

## [2026-07-16 21:49] generate | kaiten-clickup | ok | agent-ingest archetype=saas_landing sections=13 errors=0 audienceScore=77.28/70

## [2026-07-16 21:55] generate | kaiten-clickup | ok | agent-ingest archetype=saas_landing sections=13 errors=0 audienceScore=77.28/70

## [2026-07-17 13:11] generate | kaiten-webinar | fail | agent-ingest archetype=waitlist_landing sections=10 errors=1 audienceScore=0/70

## [2026-07-17 13:11] generate | kaiten-webinar | fail | agent-ingest archetype=waitlist_landing sections=10 errors=1 audienceScore=43.5/70

## [2026-07-17 13:13] generate | kaiten-webinar | ok | agent-ingest archetype=waitlist_landing sections=10 errors=0 audienceScore=43.5/70

## [2026-07-17 13:25] generate | kaiten-webinar | ok | agent-ingest archetype=waitlist_landing sections=10 errors=0 audienceScore=43.5/70

## [2026-07-17 13:29] generate | kaiten-webinar | ok | agent-ingest archetype=waitlist_landing sections=10 errors=0 audienceScore=43.5/70

## [2026-07-17 13:34] generate | kaiten-webinar | ok | agent-ingest archetype=waitlist_landing sections=10 errors=0 audienceScore=43.5/70

## [2026-07-17 13:57] generate | kaiten-webinar | ok | agent-ingest archetype=waitlist_landing sections=10 errors=0 audienceScore=46.3/70

## [2026-07-17 16:20] generate | webinar-vnedrenie-kaiten | ok | agent-ingest archetype=waitlist_landing sections=10 errors=0 audienceScore=46.3/70

## [2026-07-17 17:04] generate | webinar-vnedrenie-kaiten | ok | agent-ingest archetype=waitlist_landing sections=10 errors=0 audienceScore=46.3/70

## [2026-07-17 18:20] generate | webinar-vnedrenie-kaiten | ok | agent-ingest archetype=event_landing sections=10 errors=0 audienceScore=46.3/70

## [2026-07-17 18:21] generate | kaiten-clickup | ok | agent-ingest archetype=saas_landing sections=13 errors=0 audienceScore=77.28/70

## [2026-07-17 18:21] generate | kaiten-retail | ok | agent-ingest archetype=saas_landing sections=16 errors=0 audienceScore=94.87/70

## [2026-07-17 18:21] generate | kaiten-finance | ok | agent-ingest archetype=enterprise_landing sections=12 errors=0 audienceScore=85.34/70

## [2026-07-17 18:38] wiki-index | — | ok | pages=82 changed=true

## [2026-07-17 18:40] generate | webinar-vnedrenie-kaiten | ok | agent-ingest archetype=event_landing sections=10 errors=0 audienceScore=46.3/70

## [2026-07-17 18:40] generate | kaiten-clickup | ok | agent-ingest archetype=saas_landing sections=13 errors=0 audienceScore=77.28/70

## [2026-07-17 18:40] generate | kaiten-retail | ok | agent-ingest archetype=saas_landing sections=16 errors=0 audienceScore=94.87/70

## [2026-07-17 18:40] generate | kaiten-finance | ok | agent-ingest archetype=enterprise_landing sections=12 errors=0 audienceScore=85.34/70

## [2026-07-17 19:29] generate | webinar-vnedrenie-kaiten | ok | agent-ingest archetype=event_landing sections=10 errors=0 audienceScore=46.3/70

## [2026-07-17 21:12] generate | kaiten-cli | fail | agent-ingest archetype=saas_landing sections=14 errors=2 audienceScore=44.62/70

## [2026-07-17 21:19] generate | kaiten-cli | ok | agent-ingest archetype=saas_landing sections=15 errors=0 audienceScore=74.67/70

## [2026-07-17 22:20] generate | kaiten-cli | ok | agent-ingest archetype=saas_landing sections=15 errors=0 audienceScore=74.67/70

## [2026-07-17 23:10] generate | webinar-vnedrenie-kaiten | ok | agent-ingest archetype=event_landing sections=10 errors=0 audienceScore=46.3/70

## [2026-07-17 23:19] generate | webinar-vnedrenie-kaiten | ok | agent-ingest archetype=event_landing sections=10 errors=0 audienceScore=46.3/70

## [2026-07-18 00:14] generate | kaiten-cli | ok | agent-ingest archetype=saas_landing sections=15 errors=0 audienceScore=74.67/70
