# Appendix to M133 — `/how-it-works` Localized Page Copy

**Related mockup:** M133 — Public How It Works Page  
**Functional code:** PH-T  
**Route:** `/how-it-works`  
**Version:** v1.0  
**Status:** Localization appendix / copy SSOT  
**Locales:** English (`en`), Estonian (`et`), Russian (`ru`)  
**Primary namespace:** `howItWorks.*`

---

## 1. Purpose

This appendix contains the complete approved copy set for the DOGEstonia `/how-it-works` page in English, Estonian and Russian.

The page is a standalone public tutorial inside the DOGEstonia application shell. It explains exactly four steps:

1. what civic issues are;
2. how to read the public dashboard;
3. how to prepare a useful story;
4. how submission works through DOGEstonia GPT.

The page is informational and practical. It is not a marketing landing page or an onboarding wizard.

---

## 2. Localization Rules

- The page structure is identical in all three locales.
- The four-step order must not change.
- `Submit a story` always means an external handoff to DOGEstonia GPT.
- `Go to Dashboard` always routes internally to `/board`.
- Product names, route names, environment variables and IDs are not translated.
- `DOGEstonia GPT` remains unchanged.
- `[TAGLINE_TBD]` remains unchanged until final footer copy is approved.
- CTA meaning must stay consistent even when wording is adapted naturally for each language.
- Text should remain calm, factual and civic-tech oriented.

---

# 3. Page Copy — English

## 3.1 Metadata

```yaml
locale: en
language: English
namespace: howItWorks
route: /how-it-works
```

## 3.2 Header Navigation

| Key | Text |
|---|---|
| `header.nav.dashboard` | Dashboard |
| `header.nav.howItWorks` | How it works |
| `header.nav.submitStory` | Submit a story |
| `header.account.signIn` | Sign in |
| `header.locale.current` | EN |

## 3.3 Page Introduction

| Key | Text |
|---|---|
| `howItWorks.eyebrow` | How DOGEstonia works |
| `howItWorks.title` | How It Works |
| `howItWorks.intro` | DOGEstonia helps people turn real civic experiences into structured public issues that can be understood, reviewed and acted upon. |

## 3.4 Step 1 — Civic Issues

| Key | Text |
|---|---|
| `howItWorks.steps.civicIssues.number` | 01 |
| `howItWorks.steps.civicIssues.title` | Understand Civic Issues |
| `howItWorks.steps.civicIssues.body` | A civic issue is a structured public record of a real need, problem, observation or proposal. It helps turn individual experience into information that others can understand and review. |
| `howItWorks.steps.civicIssues.point1` | Based on real-life experience |
| `howItWorks.steps.civicIssues.point2` | Structured for public understanding |
| `howItWorks.steps.civicIssues.point3` | Connected to place, topic and responsible institutions |
| `howItWorks.steps.civicIssues.point4` | Presented factually rather than as campaign content |

## 3.5 Step 2 — Public Dashboard

| Key | Text |
|---|---|
| `howItWorks.steps.dashboard.number` | 02 |
| `howItWorks.steps.dashboard.title` | Read The Public Dashboard |
| `howItWorks.steps.dashboard.body` | The public dashboard shows civic issues in one structured feed. Each item includes a title, status, labels and available context, and opens into a detailed issue view. |
| `howItWorks.steps.dashboard.point1` | Search and filter the feed |
| `howItWorks.steps.dashboard.point2` | Read status as issue metadata |
| `howItWorks.steps.dashboard.point3` | Open any item for full details |
| `howItWorks.steps.dashboard.point4` | Use labels and context to understand scope |
| `howItWorks.steps.dashboard.inlineAction` | Go to Dashboard |
| `howItWorks.steps.dashboard.inlineActionHint` | Opens `/board` |

## 3.6 Step 3 — Useful Story

| Key | Text |
|---|---|
| `howItWorks.steps.story.number` | 03 |
| `howItWorks.steps.story.title` | Prepare A Useful Story |
| `howItWorks.steps.story.body` | A useful story explains what happened, where it happened, who is affected and why the situation matters. Clear facts and context help DOGEstonia structure the story correctly. |
| `howItWorks.steps.story.point1` | Describe the real situation |
| `howItWorks.steps.story.point2` | Explain the impact |
| `howItWorks.steps.story.point3` | Include location or institution when relevant |
| `howItWorks.steps.story.point4` | Separate facts from assumptions |
| `howItWorks.steps.story.point5` | Avoid sharing unnecessary personal data |
| `howItWorks.steps.story.privacyNote` | Do not include sensitive personal information unless it is necessary and explicitly supported by the submission flow. |

## 3.7 Step 4 — DOGEstonia GPT Submission

| Key | Text |
|---|---|
| `howItWorks.steps.submit.number` | 04 |
| `howItWorks.steps.submit.title` | Submit Through DOGEstonia GPT |
| `howItWorks.steps.submit.body` | DOGEstonia GPT guides you through the story, structures the information and prepares a draft. The submission process starts through the external DOGEstonia GPT experience. |
| `howItWorks.steps.submit.point1` | External service handoff |
| `howItWorks.steps.submit.point2` | Opens DOGEstonia GPT |
| `howItWorks.steps.submit.point3` | Uses an environment-backed URL |
| `howItWorks.steps.submit.warning` | Submit does not open an in-app compose page. |
| `howItWorks.externalHandoff` | Opens DOGEstonia GPT in an external service. |

## 3.8 CTA Row

| Key | Text |
|---|---|
| `howItWorks.cta.dashboard` | Go to Dashboard |
| `howItWorks.cta.dashboardHint` | Internal navigation to `/board` |
| `howItWorks.cta.submit` | Submit a story |
| `howItWorks.cta.submitHint` | Opens DOGEstonia GPT |
| `howItWorks.cta.submitAccessibleLabel` | Submit a story. Opens DOGEstonia GPT in an external service. |

## 3.9 Footer

| Key | Text |
|---|---|
| `footer.brand` | DOGEstonia |
| `footer.tagline` | [TAGLINE_TBD] |
| `footer.about` | About |
| `footer.privacy` | Privacy |
| `footer.contact` | Contact |

---

# 4. Page Copy — Estonian

## 4.1 Metadata

```yaml
locale: et
language: Eesti
namespace: howItWorks
route: /how-it-works
```

## 4.2 Header Navigation

| Key | Text |
|---|---|
| `header.nav.dashboard` | Juhtpaneel |
| `header.nav.howItWorks` | Kuidas see töötab |
| `header.nav.submitStory` | Esita lugu |
| `header.account.signIn` | Logi sisse |
| `header.locale.current` | ET |

## 4.3 Page Introduction

| Key | Text |
|---|---|
| `howItWorks.eyebrow` | Kuidas DOGEstonia töötab |
| `howItWorks.title` | Kuidas see töötab |
| `howItWorks.intro` | DOGEstonia aitab muuta inimeste tegelikud ühiskondlikud kogemused struktureeritud avalikeks teemadeks, mida saab mõista, läbi vaadata ja mille alusel tegutseda. |

## 4.4 Step 1 — Civic Issues

| Key | Text |
|---|---|
| `howItWorks.steps.civicIssues.number` | 01 |
| `howItWorks.steps.civicIssues.title` | Mõista ühiskondlikke teemasid |
| `howItWorks.steps.civicIssues.body` | Ühiskondlik teema on struktureeritud avalik kirjeldus tegelikust vajadusest, probleemist, tähelepanekust või ettepanekust. See aitab muuta isikliku kogemuse teabeks, mida teised saavad mõista ja läbi vaadata. |
| `howItWorks.steps.civicIssues.point1` | Põhineb tegelikul elukogemusel |
| `howItWorks.steps.civicIssues.point2` | On struktureeritud avalikuks mõistmiseks |
| `howItWorks.steps.civicIssues.point3` | On seotud koha, teema ja vastutavate asutustega |
| `howItWorks.steps.civicIssues.point4` | Esitatakse faktiliselt, mitte kampaaniasisuna |

## 4.5 Step 2 — Public Dashboard

| Key | Text |
|---|---|
| `howItWorks.steps.dashboard.number` | 02 |
| `howItWorks.steps.dashboard.title` | Loe avalikku juhtpaneeli |
| `howItWorks.steps.dashboard.body` | Avalik juhtpaneel kuvab ühiskondlikke teemasid ühes struktureeritud voos. Iga kirje sisaldab pealkirja, staatust, silte ja olemasolevat konteksti ning avaneb detailseks teemavaateks. |
| `howItWorks.steps.dashboard.point1` | Otsi ja filtreeri voogu |
| `howItWorks.steps.dashboard.point2` | Käsitle staatust teema metaandmena |
| `howItWorks.steps.dashboard.point3` | Ava iga kirje täieliku info vaatamiseks |
| `howItWorks.steps.dashboard.point4` | Kasuta silte ja konteksti ulatuse mõistmiseks |
| `howItWorks.steps.dashboard.inlineAction` | Ava juhtpaneel |
| `howItWorks.steps.dashboard.inlineActionHint` | Avab `/board` |

## 4.6 Step 3 — Useful Story

| Key | Text |
|---|---|
| `howItWorks.steps.story.number` | 03 |
| `howItWorks.steps.story.title` | Valmista ette kasulik lugu |
| `howItWorks.steps.story.body` | Kasulik lugu selgitab, mis juhtus, kus see juhtus, keda see mõjutab ja miks olukord on oluline. Selged faktid ja kontekst aitavad DOGEstonial loo õigesti struktureerida. |
| `howItWorks.steps.story.point1` | Kirjelda tegelikku olukorda |
| `howItWorks.steps.story.point2` | Selgita mõju |
| `howItWorks.steps.story.point3` | Lisa asukoht või asutus, kui see on asjakohane |
| `howItWorks.steps.story.point4` | Erista faktid oletustest |
| `howItWorks.steps.story.point5` | Väldi ebavajalike isikuandmete jagamist |
| `howItWorks.steps.story.privacyNote` | Ära lisa tundlikke isikuandmeid, välja arvatud juhul, kui need on vajalikud ja esitamisprotsess neid selgesõnaliselt toetab. |

## 4.7 Step 4 — DOGEstonia GPT Submission

| Key | Text |
|---|---|
| `howItWorks.steps.submit.number` | 04 |
| `howItWorks.steps.submit.title` | Esita DOGEstonia GPT kaudu |
| `howItWorks.steps.submit.body` | DOGEstonia GPT juhendab sind loo koostamisel, struktureerib teabe ja valmistab ette mustandi. Esitamisprotsess algab välises DOGEstonia GPT keskkonnas. |
| `howItWorks.steps.submit.point1` | Üleminek välisele teenusele |
| `howItWorks.steps.submit.point2` | Avab DOGEstonia GPT |
| `howItWorks.steps.submit.point3` | Kasutab keskkonnaseadistusest pärinevat URL-i |
| `howItWorks.steps.submit.warning` | Loo esitamine ei ava rakendusesisest koostamislehte. |
| `howItWorks.externalHandoff` | Avab DOGEstonia GPT välises teenuses. |

## 4.8 CTA Row

| Key | Text |
|---|---|
| `howItWorks.cta.dashboard` | Ava juhtpaneel |
| `howItWorks.cta.dashboardHint` | Rakendusesisene navigeerimine aadressile `/board` |
| `howItWorks.cta.submit` | Esita lugu |
| `howItWorks.cta.submitHint` | Avab DOGEstonia GPT |
| `howItWorks.cta.submitAccessibleLabel` | Esita lugu. Avab DOGEstonia GPT välises teenuses. |

## 4.9 Footer

| Key | Text |
|---|---|
| `footer.brand` | DOGEstonia |
| `footer.tagline` | [TAGLINE_TBD] |
| `footer.about` | Meist |
| `footer.privacy` | Privaatsus |
| `footer.contact` | Kontakt |

---

# 5. Page Copy — Russian

## 5.1 Metadata

```yaml
locale: ru
language: Русский
namespace: howItWorks
route: /how-it-works
```

## 5.2 Header Navigation

| Key | Text |
|---|---|
| `header.nav.dashboard` | Доска |
| `header.nav.howItWorks` | Как это работает |
| `header.nav.submitStory` | Подать историю |
| `header.account.signIn` | Войти |
| `header.locale.current` | RU |

## 5.3 Page Introduction

| Key | Text |
|---|---|
| `howItWorks.eyebrow` | Как работает DOGEstonia |
| `howItWorks.title` | Как это работает |
| `howItWorks.intro` | DOGEstonia помогает превращать реальный гражданский опыт людей в структурированные публичные темы, которые можно понять, рассмотреть и использовать как основу для действий. |

## 5.4 Step 1 — Civic Issues

| Key | Text |
|---|---|
| `howItWorks.steps.civicIssues.number` | 01 |
| `howItWorks.steps.civicIssues.title` | Поймите, что такое гражданские темы |
| `howItWorks.steps.civicIssues.body` | Гражданская тема — это структурированное публичное описание реальной потребности, проблемы, наблюдения или предложения. Она помогает превратить личный опыт в информацию, которую другие люди могут понять и рассмотреть. |
| `howItWorks.steps.civicIssues.point1` | Основана на реальном жизненном опыте |
| `howItWorks.steps.civicIssues.point2` | Структурирована для публичного понимания |
| `howItWorks.steps.civicIssues.point3` | Связана с местом, темой и ответственными учреждениями |
| `howItWorks.steps.civicIssues.point4` | Излагается фактически, а не как агитационный материал |

## 5.5 Step 2 — Public Dashboard

| Key | Text |
|---|---|
| `howItWorks.steps.dashboard.number` | 02 |
| `howItWorks.steps.dashboard.title` | Читайте публичную доску |
| `howItWorks.steps.dashboard.body` | На публичной доске гражданские темы представлены в едином структурированном потоке. Каждая запись содержит заголовок, статус, метки и доступный контекст, а также открывается в подробном представлении темы. |
| `howItWorks.steps.dashboard.point1` | Используйте поиск и фильтры |
| `howItWorks.steps.dashboard.point2` | Читайте статус как метаданные темы |
| `howItWorks.steps.dashboard.point3` | Открывайте любую запись для просмотра подробностей |
| `howItWorks.steps.dashboard.point4` | Используйте метки и контекст, чтобы понять охват темы |
| `howItWorks.steps.dashboard.inlineAction` | Перейти к доске |
| `howItWorks.steps.dashboard.inlineActionHint` | Открывает `/board` |

## 5.6 Step 3 — Useful Story

| Key | Text |
|---|---|
| `howItWorks.steps.story.number` | 03 |
| `howItWorks.steps.story.title` | Подготовьте полезную историю |
| `howItWorks.steps.story.body` | Полезная история объясняет, что произошло, где это произошло, кого это затрагивает и почему ситуация важна. Ясные факты и контекст помогают DOGEstonia правильно структурировать историю. |
| `howItWorks.steps.story.point1` | Опишите реальную ситуацию |
| `howItWorks.steps.story.point2` | Объясните её влияние |
| `howItWorks.steps.story.point3` | Укажите место или учреждение, если это уместно |
| `howItWorks.steps.story.point4` | Отделяйте факты от предположений |
| `howItWorks.steps.story.point5` | Не сообщайте лишние персональные данные |
| `howItWorks.steps.story.privacyNote` | Не включайте чувствительные персональные данные, если они не являются необходимыми и их обработка прямо не предусмотрена процессом подачи истории. |

## 5.7 Step 4 — DOGEstonia GPT Submission

| Key | Text |
|---|---|
| `howItWorks.steps.submit.number` | 04 |
| `howItWorks.steps.submit.title` | Подайте историю через DOGEstonia GPT |
| `howItWorks.steps.submit.body` | DOGEstonia GPT проводит вас через процесс создания истории, структурирует информацию и подготавливает черновик. Процесс подачи начинается во внешней среде DOGEstonia GPT. |
| `howItWorks.steps.submit.point1` | Переход во внешний сервис |
| `howItWorks.steps.submit.point2` | Открывает DOGEstonia GPT |
| `howItWorks.steps.submit.point3` | Использует URL из конфигурации окружения |
| `howItWorks.steps.submit.warning` | Подача истории не открывает встроенную страницу редактирования в приложении. |
| `howItWorks.externalHandoff` | Открывает DOGEstonia GPT во внешнем сервисе. |

## 5.8 CTA Row

| Key | Text |
|---|---|
| `howItWorks.cta.dashboard` | Перейти к доске |
| `howItWorks.cta.dashboardHint` | Внутренний переход на `/board` |
| `howItWorks.cta.submit` | Подать историю |
| `howItWorks.cta.submitHint` | Открывает DOGEstonia GPT |
| `howItWorks.cta.submitAccessibleLabel` | Подать историю. Открывает DOGEstonia GPT во внешнем сервисе. |

## 5.9 Footer

| Key | Text |
|---|---|
| `footer.brand` | DOGEstonia |
| `footer.tagline` | [TAGLINE_TBD] |
| `footer.about` | О проекте |
| `footer.privacy` | Конфиденциальность |
| `footer.contact` | Контакты |

---

# 6. Parallel Copy Matrix

## 6.1 Page Header

| Key | English | Eesti | Русский |
|---|---|---|---|
| `howItWorks.eyebrow` | How DOGEstonia works | Kuidas DOGEstonia töötab | Как работает DOGEstonia |
| `howItWorks.title` | How It Works | Kuidas see töötab | Как это работает |
| `howItWorks.intro` | DOGEstonia helps people turn real civic experiences into structured public issues that can be understood, reviewed and acted upon. | DOGEstonia aitab muuta inimeste tegelikud ühiskondlikud kogemused struktureeritud avalikeks teemadeks, mida saab mõista, läbi vaadata ja mille alusel tegutseda. | DOGEstonia помогает превращать реальный гражданский опыт людей в структурированные публичные темы, которые можно понять, рассмотреть и использовать как основу для действий. |

## 6.2 Step Titles

| Step | English | Eesti | Русский |
|---|---|---|---|
| 01 | Understand Civic Issues | Mõista ühiskondlikke teemasid | Поймите, что такое гражданские темы |
| 02 | Read The Public Dashboard | Loe avalikku juhtpaneeli | Читайте публичную доску |
| 03 | Prepare A Useful Story | Valmista ette kasulik lugu | Подготовьте полезную историю |
| 04 | Submit Through DOGEstonia GPT | Esita DOGEstonia GPT kaudu | Подайте историю через DOGEstonia GPT |

## 6.3 CTA Labels

| Key | English | Eesti | Русский |
|---|---|---|---|
| `howItWorks.cta.dashboard` | Go to Dashboard | Ava juhtpaneel | Перейти к доске |
| `howItWorks.cta.submit` | Submit a story | Esita lugu | Подать историю |
| `howItWorks.externalHandoff` | Opens DOGEstonia GPT in an external service. | Avab DOGEstonia GPT välises teenuses. | Открывает DOGEstonia GPT во внешнем сервисе. |

---

# 7. Suggested JSON Structure

```json
{
  "howItWorks": {
    "eyebrow": "",
    "title": "",
    "intro": "",
    "steps": {
      "civicIssues": {
        "number": "01",
        "title": "",
        "body": "",
        "point1": "",
        "point2": "",
        "point3": "",
        "point4": ""
      },
      "dashboard": {
        "number": "02",
        "title": "",
        "body": "",
        "point1": "",
        "point2": "",
        "point3": "",
        "point4": "",
        "inlineAction": "",
        "inlineActionHint": ""
      },
      "story": {
        "number": "03",
        "title": "",
        "body": "",
        "point1": "",
        "point2": "",
        "point3": "",
        "point4": "",
        "point5": "",
        "privacyNote": ""
      },
      "submit": {
        "number": "04",
        "title": "",
        "body": "",
        "point1": "",
        "point2": "",
        "point3": "",
        "warning": ""
      }
    },
    "externalHandoff": "",
    "cta": {
      "dashboard": "",
      "dashboardHint": "",
      "submit": "",
      "submitHint": "",
      "submitAccessibleLabel": ""
    }
  }
}
```

---

# 8. Content QA Checklist

Before implementation, verify:

```text
Exactly four tutorial steps are present.

The order is identical in EN, ET and RU.

No locale describes a status-column board.

Dashboard CTA routes to /board.

Submit CTA opens DOGEstonia GPT through an environment-backed URL.

No locale implies an in-app story editor.

The external handoff is explicit in visible and accessible text.

DOGEstonia GPT remains untranslated.

Header and footer labels use their shared localization namespaces.

[TAGLINE_TBD] remains unchanged until approved.

Text does not contain marketing, campaign or rewards language.
```
