# DOGEstonia — M171 How It Works: Approved Content and Visual Specification v1.0

**Date:** 2026-10-23  
**Page:** `/how-it-works`  
**Artboard:** M171, rev 3 — `DOGEstonia-M171-how-it-works-approved-copy-spec-v1.0.png` (promoted from raw `exec-0d1eb194-e8be-4c00-9360-11c9c750cf08.png`)  
**Candidate step illustrations (docs-only soft):** [`m171-step-illustrations/`](m171-step-illustrations/)  
**Scope:** four-step explanatory page, English desktop/~390 px artboard, exact approved Russian source and supplied English translation.  
**Status:** Russian four-step copy explicitly approved by the operator. English translation and artboard supplied in this handoff. No implementation, privacy audit or OP PASS is claimed.

## 1. Binding editorial instruction for the IDE agent

**Russian copy in §3 is the approved localization source of truth. Copy it verbatim into the Russian locale. Do not paraphrase, shorten, polish, simplify, retranslate from English or change its meaning. Linguistic/editorial responsibility is NOT delegated to the IDE agent.**

Use the English strings in §4 exactly for the English locale. They are the authored translation delivered with this spec; do not generate a different English variant during implementation. The approval record belongs specifically to Russian; delivery of English does not invent a separate operator acceptance event.

ET is not supplied. Do not machine-translate or fabricate Estonian copy in the IDE. Obtain an editorially reviewed translation from the approved RU source. Use the application's existing documented missing-locale policy if needed; if no policy exists, leave release handling TBD rather than inventing it.

If a string does not fit, change layout/wrapping, not the approved text. Raise editorial issues to the operator instead of editing them. Keep paragraph boundaries, punctuation, capitalization, Story/Issues terminology and meaning. Do not infer missing words from generated PNG pixels.

## 2. Conceptual order and supersession

| Step | Purpose | Visual explanation |
|---|---|---|
| 01 | A lived observation starts a Story | Ordinary civic setting and a thought/idea |
| 02 | Telegram interview submits a private, structured Story saved to the account | Chat → private story document + account association |
| 03 | Similar private stories contribute to public Issues without exposing personal details | Private documents → public Issue |
| 04 | Submitted stories inform personal profile metrics and access to related discussions | Profile/topic cues → discussion |

This supersedes M171 rev1/rev2 and the earlier M168 content order where the feed came before the interview and GPT appeared as a submission destination. There is no custom GPT handoff in this revision. Feed discovery follows the explanation of private Story submission.

These are explanatory steps, not mandatory application navigation gates or newly imposed completion requirements. No new backend clustering, profile algorithm or access-control schema is defined here.

## 3. APPROVED RUSSIAN COPY — VERBATIM

### 01 · Заметьте то, что важно

Проблема, с которой вы столкнулись. То, чего не хватает рядом. Идея, которая могла бы сделать жизнь лучше. Всё начинается с вашего наблюдения — даже если пока трудно подобрать слова.

### 02 · Расскажите свою историю Telegram-боту

Бот задаст вопросы, поможет разобраться в деталях и отправить историю. Не нужно заранее готовить идеальный текст — достаточно рассказать своими словами.

Ваша история останется приватной: другие пользователи её не увидят. Она сохранится в понятном, упорядоченном виде в вашем аккаунте, чтобы вы могли к ней вернуться.

### 03 · Посмотрите, как личный опыт становится общей темой

Похожие истории объединяются в публичные темы — Issues. В ленте можно увидеть, что ваша проблема знакома другим или ваша идея отвечает общей потребности.

Публичная тема показывает суть проблемы или предложения, сохраняя анонимность авторов и не раскрывая личные детали их историй. Так важное становится заметным: проблемы можно обсуждать и решать, а идеи — развивать и воплощать.

### 04 · Участвуйте там, где у вас есть опыт

Ваши истории постепенно помогают сформировать профиль: какие темы вам близки и с какими ситуациями вы сталкивались. На этой основе рассчитываются показатели профиля и открывается доступ к обсуждению связанных Issues.

Так ваш опыт помогает не только обозначить тему, но и включиться в разговор о том, что с ней делать дальше.

## 4. ENGLISH COPY — SUPPLIED TRANSLATION

### 01 · Notice what matters

A problem you have faced. Something missing nearby. An idea that could make life better. It starts with something you notice—even if you do not yet know how to put it into words.

### 02 · Tell your story to the Telegram bot

The bot asks questions, helps you work through the details and submit your story. You do not need a perfect draft—just tell it in your own words.

Your story stays private: other users cannot see it. It is saved in a clear, organised form in your account, so you can return to it.

### 03 · See how personal experience becomes a shared topic

Similar stories are brought together into public topics called Issues. In the feed, you may discover that others face the same problem, or that your idea meets a shared need.

A public topic shows the problem or proposal while keeping its authors anonymous and their personal details private. This makes important things visible: problems can be discussed and addressed, and ideas developed and put into practice.

### 04 · Take part where you have experience

Your stories gradually help shape your profile: the topics you know and the situations you have experienced. They inform your profile metrics and open access to discussions of related Issues.

Your experience helps both bring a topic into view and contribute to the conversation about what to do next.

## 5. Shell and auxiliary copy

Retain the public shell, M169 light brand/no-tagline footer direction and M168 route contracts except the explicitly replaced GPT handoff. No theme-default or shell-control redesign is authorized.

The four-step RU approval does not imply approval of previously unseen Russian header/CTA translations. Reuse already approved locale strings for shell/actions. If none exist, request editorial copy rather than inventing it in the IDE.

English page strings supplied here:

| Role | Exact EN string |
|---|---|
| Eyebrow | `HOW DOGESTONIA WORKS` |
| H1 | `How It Works` |
| Lead | `Your experience can help bring shared problems and ideas into view.` |
| Telegram CTA | `Start interview in Telegram` |
| Feed CTA | `Go to Feed` |
| Landing CTA | `Concept & FAQ on landing` |
| Private document illustration label | `Private story` |
| Grouped documents illustration label | `Private stories` |
| Public document illustration label | `Public Issue` |

No extra prose is added inside the step sections. Illustration labels supplement, rather than replace, the approved paragraphs. Any additional illustrative topic tags are schematic and noninteractive, not a new profile taxonomy. Use existing approved localized equivalents or obtain editorial translations for such labels.

## 6. CTA destinations and placement

| Placement | Action | Destination |
|---|---|---|
| Step 02, after its paragraphs | Start interview in Telegram | External Telegram bot; exact URL/handle TBD |
| Step 03, after its paragraphs | Go to Feed | Internal `/next/feed` |
| Final group after step 04 | Go to Feed | Internal `/next/feed` |
| Final group after step 04 | Concept & FAQ on landing | `https://uus-veerenni-civic.dogestonia.me/#how-it-works` |

Group the final two actions toward the **left** edge of the content column, with a compact gap. Do not use space-between placement that pushes the landing CTA to the far right. On narrow layouts stack within the same left-aligned group as necessary.

Telegram and landing use existing external-link indicators/behavior. Do not fabricate a bot handle, t.me URL, Custom GPT fallback or redirect target. Exact bot destination and missing-configuration behavior must be resolved before enabling an integrated CTA; M171 does not invent them. Existing external-link tab policy applies or remains TBD.

Remove old `Opens /board` and similar implementation hints from resident UI. URLs, arrows and notes on the sheet are outside-product annotations.

## 7. Layout and four explanatory visuals

Desktop: one continuous editorial page, four numbered sections in order, compact number/title headings, text and a restrained explanatory visual per step. Keep every paragraph in §§3/4, allowing height to grow rather than clipping copy.

At approximately 390 CSS px, keep the same complete content/order. Wrap long titles; stack visuals after the relevant copy. Do not hide paragraphs or reduce type to force the page into the artwork's height. Final CTA group remains visibly associated and left aligned.

| Step | Visual intent | Forbidden inference |
|---|---|---|
| 01 | Local situation / observation; a neutral schematic person may represent anyone | No named user, author avatar or second feed-reading step |
| 02 | Guided chat, private document and account association | No public publication, actual chat transcript, real account data or invented bot link |
| 03 | Multiple protected stories contribute to a public Issue | No exposure of source-story details or names; no automatic-publication transaction specified |
| 04 | Profile themes and discussion access | No invented scores, percentages, ranking, taxonomy IDs or access algorithm |

Warm civic line scenes, restrained yellow backing, no stock photo collage, violet glow or new mascot style. The visuals are explanatory assets, not product screenshots, APIs or new clickable controls. No fake story/Issue IDs or identity records.

Individual illustration files were not exported by this task. M171 is a full-page PNG reference. Asset naming, export dimensions, mobile art direction and repository placement remain a separate handoff; do not commission unrelated visuals or crop UI text into image assets.

## 8. Data and privacy statements — product content boundary

The operator-approved copy establishes intended behavior: original stories are private to other users, stored in the account, related stories contribute to anonymous public Issues, and submitted stories inform profile metrics/access to related discussions.

These statements are requirements/content, not proof that every backend path has been audited or implemented. Do not silently weaken, expand or rewrite them in the IDE. If actual capability or policy conflicts, report the mismatch and block an unsupported readiness claim for operator resolution.

Do not extrapolate the copy into claims about no service/operator processing, no Telegram data handling, encryption method, retention, legal basis, a quantified anonymity guarantee or unmentioned access criteria. No legal/privacy policy is authored here. No new endpoints, schemas, metric formulas or permission algorithms are supplied.

## 9. Implementation handoff and localization integrity

Use existing i18n infrastructure and preserve one content record per step: stable order/number, title, ordered paragraphs and illustration association. These are documentation roles, not mandatory code identifiers or a new schema.

RU strings come directly from §3, never from EN or the artwork. EN strings come directly from §4. ET requires editorial handoff. The IDE agent may wire rendering and locale loading; it may not assume linguistic responsibility or automatically “improve” approved text.

Keep approved paragraphs as real selectable text. Do not embed body copy into pictures or replace it with skeleton bars. Exact wording and paragraphs in this file override raster omissions, antialiasing and line wrapping.

The narrow PNG may compress/miss part of the final step's second paragraph; implementation must still render **both complete paragraphs** on all viewports. This is a raster limit, not approval of a shorter mobile version.

Keep existing theme palette, semantic headings, visible focus, minimum interactive targets and localization accessibility. Illustrations can use concise approved alt descriptions or be decorative where text fully supplies the meaning; any new translated alt copy also needs editorial handling. No exact new font/spacing tokens or breakpoints are invented by the PNG.

## 10. Superseded content

- Earlier step 01 about reading/understanding public Issue cards.
- Feed exploration before explaining private Story submission.
- A separate preparation checklist as step 03.
- GPT/Custom GPT submission and its configured URL annotation.
- Step 04 limited to interview rather than profile metrics/discussion access.
- Any brief EN text from M171 rev1/rev2 that omits approved privacy/profile paragraphs.

Current source: this spec plus M171 rev3 PNG. M168 held route/grouping rules remain except where changed above; M169 no-tagline footer and asset-status boundaries remain.

## 11. Open items

| Item | Current handling |
|---|---|
| Telegram bot URL / handle | TBD, not fabricated |
| Auxiliary RU/ET strings if absent from existing approved locales | Editorial handoff required; no IDE-authored translations |
| Final EN operator review | Supplied faithful translation; no separate acceptance event invented |
| Individual illustration exports | Not delivered; asset handoff TBD |
| Exact unprovided typography/spacing | Existing confirmed system; no raster sampling |
| Runtime/privacy-capability verification | Separate implementation check; no OP PASS claimed |

## 12. Acceptance checklist

- [ ] RU step titles and all seven body paragraphs match §3 verbatim.
- [ ] EN titles and all seven body paragraphs match §4 on desktop and mobile.
- [ ] No IDE paraphrase, auto-shortening or retranslation changes the RU source.
- [ ] ET is not invented by implementation; auxiliary copy follows editorial ownership.
- [ ] Four steps follow observation → private Telegram story → public Issues → profile/discussion participation.
- [ ] Telegram CTA appears at step 02 and uses a confirmed configured target when integrated.
- [ ] Feed CTAs use `/next/feed`; landing retains the supplied FAQ URL.
- [ ] Final CTA pair stays grouped left; no obsolete route helpers or GPT references remain.
- [ ] Four visuals explain the approved content without creating fake data/screens/permissions.
- [ ] All text is selectable, readable and complete at ~390 px, without clipping or copy reduction.
- [ ] No footer tagline, new mascot or unrelated shell redesign is introduced.
- [ ] Capability mismatches are escalated rather than hidden by editorial rewriting.
- [ ] No invented HTTP, legal terms, deployed integration or OP PASS is inferred.
