# DOGEstonia — next-feed component design system v1.0

> **Persistent SSOT:** `spa-app/docs/UX/next/feed/` · **As-of:** 2026-10-12  
> **Primary surface:** web `#/next/feed*` (spa-app). RN notes in §12 = **platform-translate later**, not web invent.  
> **Artboards:** [M149–M160](artboards/) · [INDEX](INDEX.md)  
> **Gap map (post-VL SSOT):** [`analysis-next-feed-ds-component-implementation-gaps-2026-10-12.md`](../../analysis/analysis-next-feed-ds-component-implementation-gaps-2026-10-12.md)  
> **Gap map (history / pre-VL):** [`analysis-next-feed-ux-ds-element-mapping-and-gaps-2026-10-12.md`](../../analysis/analysis-next-feed-ux-ds-element-mapping-and-gaps-2026-10-12.md)  
> **Story package:** [`next-feed-vl`](../../tasks/backlog-stories/next-feed-vl/INDEX.md) · EPIC-SPA-21 · VL-01…12 Done (wave 2026-10-12)  
> **Moved from:** `docs/analysis/ux-next-feed-design-system.md` (stub redirect)

## 0) Anti-mixing / dual presentation plane (mandatory)

| Plane | Routes | Component set | Status |
|-------|--------|---------------|--------|
| **Classic** | `#/board`, classic mounts | `BoardIssuePost`, `IssueThreadBlock`, `ReactionControls`, Filters `SearchInput`, … | **Remain** for old dashboard — do **not** break / force-migrate |
| **Next-feed DS** | `#/next/feed*` | Named surfaces in **this** catalog (`IssueCardChrome`, `BoardSearchField`, `DiscussionHeader`, …) under `features/feed/` | **Done chrome** for next-feed; classic modules ≠ Done presentation |

**Rules:**

1. Classic board chrome stays classic. Changes for VL must not regress `#/board`.  
2. Next-feed Done requires **DS-named** surfaces matching this catalog + artboards — not unre-skinned classic chrome wrapped in feed CSS.  
3. Closed **data/semantics** (gateway issues, threads client, reaction catalog) may be shared behind adapters; **presentation chrome** for next-feed is separate.  
4. Package [next-feed](../../tasks/backlog-stories/next-feed/INDEX.md) NF-01…12 = wiring/composition Done; [next-feed-vl](../../tasks/backlog-stories/next-feed-vl/INDEX.md) = visual-language / DS atoms. Do not reopen NF-01…12 bodies.  
5. Tracker: [`ARCH-DELTA-visual-language-plane-2026-10-12.md`](../../tasks/backlog-stories/next-feed-vl/ARCH-DELTA-visual-language-plane-2026-10-12.md).

### Inherited foundations (classic DS pointer only)

Global theme key `dogestonia.theme`, default dark boot, and EPIC-01 color foundations remain documented in [`../design-system.md`](../design-system.md) (**Deprecated for `#/next/feed*` product chrome**). Next-feed light-first tokens: [design-tokens pack](DOGEstonia-design-tokens-package-v1.0.md) + M160. Do not duplicate classic DS body here.

---

Каталог элементов: что каждый элемент делает, из чего состоит и где переиспользуется.

Главный принцип структуры: **страницы собираются из лейаутов и компонентов; состояния оформляются как варианты компонентов**. Например, загрузка Discussion — состояние Discussion block, а modal и sheet — способы размещения общего содержимого Issue.

Существующие имена из спек сохраняю. Дополнительные имена ниже — разделение для **next-feed** постановки (пакет VL).

## 1. Pages / Screens — страницы приложения

В React Native страницу регистрируем в навигации как `Screen`. Содержимое страницы можно назвать `Page`, чтобы отделить его от настройки navigator и deep links.

| Элемент | Текстовое описание |
|---|---|
| **`BoardPage` / `BoardScreen`** | Главная публичная доска активной ноды. Содержит заголовок, фильтры, переключатель List/Map и область результатов. Управляет выбранным представлением и контекстом доски. Сама не рисует внутреннее содержимое Issue и комментариев. |
| **`IssueDetailPage` / `IssueDetailScreen`** | Отдельная страница Issue, открываемая прямой ссылкой или навигацией. Показывает полный civic-контент и ту же Discussion, что используется в ленте и overlay. Имеет самостоятельные loading, not found и error состояния. |
| **Существующий `VerifyScreen`** | Внешняя для этого пакета страница проверки личности. Дизайн-система описывает переход к ней и возвращение с сохранённым черновиком. Внутренние методы проверки здесь не проектируются. |
| **Страницы Profile, My stories, Tell a story** | В этих артбордах представлены только навигационными входами. Их внутренние страницы не входят в эту дизайн-систему. |

`IssueModal`, `IssueSheet`, Reaction Picker и списки реакторов **не становятся отдельными Pages**. Это контекстные поверхности поверх текущего экрана.

## 2. Layouts — размещение, прокрутка и адаптация

Лейаут определяет размеры областей, расположение слотов, safe area и владельца прокрутки. Он не интерпретирует API-поля.

| Лейаут | Назначение |
|---|---|
| **`AppShellLayout`** | Общая оболочка: верхняя панель, основное содержимое, навигация и область overlay. Учитывает safe area. На узком экране использует app bar и нижнюю навигацию; на широком — header и боковую навигацию. |
| **`BoardLayout`** | Размещает основную доску и необязательные боковые области. Имеет варианты `compact`, `medium`, `wide`. Отсутствие бокового модуля не оставляет пустую колонку. |
| **`PageContentLayout`** | Ограничивает ширину обычной страницы, задаёт боковые отступы и вертикальный ритм. Используется для Board и прямого Issue detail. |
| **`IssuePresentationLayout`** | Размещает одно общее содержимое Issue в вариантах `page`, `modal`, `fullScreenSheet`. Управляет header, close/back, прокруткой и областью composer. |
| **`DiscussionLayout`** | Вертикальное размещение заголовка Discussion, summary или дерева, composer и invitation stub. Не создаёт отдельную прокрутку каждой ветки комментариев. |
| **`KeyboardComposerLayout`** | Удерживает composer и reply context над клавиатурой. Учитывает keyboard inset и safe area; скрывает мешающую нижнюю навигацию. |
| **`OverlayLayout`** | Общая геометрия для anchored popover, centered dialog и bottom sheet: фон, header, ограничение высоты, scrollable body и footer. |
| **`OverlayHost`** | Управляет открытыми поверхностями и их порядком. Back/Escape закрывает верхнюю поверхность; закрытие возвращает пользователя к исходному элементу. |

### Адаптивная геометрия

Размеры из веб-спек становятся отправными логическими размерами RN, а не физическими пикселями экрана.

| Доступная ширина | Размещение |
|---|---|
| **320–479** | Одна колонка; app bar 56; bottom navigation 64 плюс safe area. Боковые отступы 12 при 320 и 16 при 360/390. |
| **480–767** | Одна центрированная колонка, отступы 20, максимальная ширина контента 720. |
| **768–1023** | Центрированная колонка, отступы 24, максимальная ширина feed 760. Контекстные модули идут после основного содержимого либо доступны отдельно. |
| **1024–1199** | Возможна левая rail шириной 216, если для feed остаётся минимум 640. Постоянная правая колонка отсутствует. |
| **От 1200** | Широкая композиция. В эталоне 1440: левая rail 240, feed около 824, правая rail 280, промежутки 20, внешние отступы 28. |

Ширина окна и контейнера определяет вариант. Название устройства не определяет лейаут.

## 3. Общая оболочка и навигация

| Компонент | Описание |
|---|---|
| **`PublicHeader`** | Широкая верхняя панель: бренд, активная нода, навигационные и пользовательские controls. |
| **`MobileAppBar`** | Компактная версия верхней панели. Показывает квадратный знак, активную ноду, меню и доступные utility actions. |
| **`BrandMark` / `BrandWordmark`** | Квадратный знак и горизонтальный логотип из утверждённых ассетов. Сохраняют пропорции; изображения с артбордов не используются вместо исходных ассетов. |
| **`ActiveNodeSummary`** | Имя текущей ноды и, где предусмотрено, компактная поясняющая информация. |
| **`NodeSwitcherTrigger`** | Доступный вход в переключение ноды. Его наличие не определяет внутреннюю структуру будущего node picker. |
| **`NavigationItem`** | Иконка, текст, выбранное состояние и действие перехода. |
| **`SidebarNavigation`** | Вертикальная навигация широкого экрана. |
| **`BottomNavigation`** | Нижняя мобильная навигация: Board, My stories, Tell a story, Profile. Подписи остаются видимыми. |
| **`TellStoryAction`** | Выделенный навигационный вход в существующий сценарий Story. |
| **`ProfileRail`** | Составная левая область: пользовательский summary, навигация, действие Story и активная нода. |
| **`UserSummary`** | Имя, аватар и подтверждённое состояние текущего пользователя, когда эти данные доступны. |
| **`StoryActivitySummary`** | Компактные подтверждённые метрики или status/date собственных Stories. |
| **`LocaleSelector`** | Выбор ET/RU/EN с видимым названием языка и выбранным состоянием. |
| **`ThemeControl`** | Пользовательское переключение dark/light. Сохраняет уже закреплённое правило: default dark, ключ `dogestonia.theme`. |
| **Utility controls** | Account, notifications и другие показанные в header входы. Дизайн описывает control; наличие и данные конкретного действия определяются его контрактом. |

Правая область оформляется как **`NodeContextRail`** со слотами:

- **`NodeSummaryCard`** — изображение/имя ноды, описание и ссылка о ноде.
- **`BoardExplainerCard`** — короткие пронумерованные шаги о работе доски.
- **`ParticipationCard`** — объяснение участия и ссылки на правила/приватность.

Эти элементы входят в визуальный каталог. Их включение в конкретный релиз зависит от утверждённого содержимого и источника данных.

## 4. Доска: toolbar, фильтры и результаты

| Компонент | Описание |
|---|---|
| **`BoardHeading`** | Заголовок доски и поясняющая строка. |
| **`BoardToolbar`** | Собирает query controls, фильтры, reset, контекст результатов и List/Map. Сохраняет положение при loading/error. |
| **`BoardSearchField`** | Поле поиска с label, текущим значением и clear action. В каталоге существует как утверждённый визуальный элемент; активируется при наличии поискового контракта. |
| **`FilterChipGroup`** | Группа фильтров с управляемым выбранным состоянием. На мобильном прокручивается горизонтально. |
| **`FilterChip`** | Один фильтр: текст, selected/disabled состояние и touch target. |
| **`ClearFiltersAction`** | Сбрасывает фильтры доски. Доступен и при заполненном результате, и при пустом. |
| **`ResultsContext`** | Подтверждённый контекст набора результатов, обновления или stale-состояния. |
| **`ListMapToggle`** | Два варианта представления одного набора Issues. Недоступность Map сопровождается объяснением. |
| **`BoardFeed`** | Список `BoardIssuePost`. В RN — кандидат для `FlatList` с устойчивыми ключами и отдельными состояниями начальной загрузки и обновления. |
| **`BoardFeedState`** | Составной блок для loading, filtered empty, error и retry. |
| **`StaleResultsNotice`** | Показывает, что читаемый набор сохранён, а обновление не удалось. |

**Пустой результат, ошибка и stale — разные состояния.** Компонент не заменяет ошибку сообщением «ничего не найдено» и не очищает читаемые карточки при фоновом обновлении.

## 5. Issue — общий civic-компонент

Предлагаю ввести **`IssueContent`** как общую композицию civic-контента и Discussion.

- `BoardIssuePost` размещает её внутри карточки feed.
- `IssueModal` и `IssueSheet` размещают её внутри overlay.
- `IssueDetailPage` размещает её в полноценной странице.

### Civic-часть

| Компонент | Описание |
|---|---|
| **`BoardIssuePost`** | Непрерывная карточка в ленте: `IssueCardChrome` сверху и `IssueThreadBlock` непосредственно под ним. |
| **`IssueCardChrome`** | Civic-часть Issue: identity, текст, labels, необязательные details/media и action strip. |
| **`IssueIdentityHeader`** | Civic-иконка, identifier, подтверждённые status/type, metadata и overflow action. |
| **`IssueTypeIcon`** | Визуальное обозначение civic-категории; не пользовательский аватар. |
| **`IssueStatusBadge`** | Текстовый status с семантическим оформлением. Примеры OPEN/CLOSED на PNG не добавляют новые API enum. |
| **`IssueMetadataRow`** | Доступные location/date/type. Отсутствующие значения не оставляют фиктивную строку. |
| **`IssueTextContent`** | Title, summary и полный description в detail-варианте. Title переносится; summary в feed может сокращаться только при доступном переходе к полному тексту. |
| **`IssueLabelGroup`** | Переносящаяся группа тематических labels. |
| **`OpenIssueAction`** | Явный переход к полному Issue. |
| **`IssueOverflowMenu`** | Меню только существующих разрешённых действий. |

### Необязательные расширения

**`SchemaCardOverlay`** сохраняет имя из спек, но визуально это встроенная секция `Additional details`, а не всплывающая поверхность.

Она содержит `SchemaFieldRow` и disclosure:

- компактный вариант показывает до трёх утверждённых строк;
- detail-вариант показывает полный разрешённый набор;
- на узком экране label располагается над value;
- отсутствие данных удаляет всю секцию вместе с её heading и отступами.

**`PostMedia`** — одиночное изображение под civic-текстом. Сохраняет геометрию загрузки, имеет локальное состояние ошибки и не удаляет текст Issue при сбое. Carousel для одного изображения не появляется. Компонент остаётся зависимым от публичного media-контракта.

### `PostActionStrip`

Постоянный набор четырёх действий:

**React · Comment · Share · Reactions**

Каждое действие — `PostActionButton` с подписью, иконкой и состоянием доступности.

- React открывает picker.
- Comment открывает Discussion или переводит фокус к composer.
- Share передаёт публичную ссылку с обратной связью.
- Reactions открывает доступное представление реакций; люди появляются только при наличии соответствующих данных.

Базовая высота strip — 56 на широком экране и 52 на мобильном. При увеличенном тексте высота может расти, а действия — переходить на две строки.

## 6. Discussion и комментарии

| Компонент | Описание |
|---|---|
| **`IssueThreadBlock`** | Общая Discussion для feed, modal, sheet и detail. Имеет варианты loading, empty, populated, unavailable и collapsed/expanded. |
| **`DiscussionHeader`** | Название секции и доступный подтверждённый контекст. |
| **`ThreadSummary`** | Компактное представление Discussion с реальными preview bodies и подтверждённым aggregate. |
| **`CommentPreview`** | Сокращённый читаемый текст комментария. |
| **`ViewDiscussionAction`** | Открывает или раскрывает ту же Discussion. |
| **`ComposerEntry`** | Вход «Write a comment». В компактном состоянии может быть `Pressable`, визуально похожим на поле; полноценный ввод принадлежит composer. |
| **`CommentTree`** | Представление родительских связей и раскрытия веток. |
| **`CommentNode`** | Один комментарий: body, действия, aggregate и контекст дочерней ветки. |
| **`CommentBody`** | Буквальный selectable-текст полученного `body`. |
| **`CommentActionRow`** | React и допустимый Reply. |
| **`RepliesDisclosure`** | Раскрывает уже известные ответы; число показывает только при наличии основания его вычислить. |
| **`ThreadConnector`** | Тонкие линии и отступы, визуально показывающие ancestry. |
| **`ReplyDepthNotice`** | Объясняет достижение настроенного ограничения глубины. |
| **`CommentTombstone`** | Будущий вариант removed/unavailable, сохраняющий место родителя и детей при наличии публичного backend-состояния. |

Вложенность имеет два независимых ограничения:

- **визуальное:** максимум три уровня отступа;
- **функциональное:** разрешение Reply по `max_depth`.

После визуального предела дальнейшие ответы используют ту же колонку и явный parent context. Сам визуальный предел не запрещает Reply.

Если всё дерево уже загружено, раскрытие ветки происходит локально без искусственного loader. Loading/error отдельной ветки нужны только при реальной операции.

## 7. Composer и черновик

| Компонент | Описание |
|---|---|
| **`ThreadComposer`** | Один общий composer для root comment и reply. Управляет draft, target, submit и feedback. |
| **`ReplyContext`** | Содержит excerpt родительского body, подпись Replying to this comment и Cancel reply. |
| **`CommentTextInput`** | Multiline-поле, поддерживающее масштабирование текста и рост содержимого. |
| **`ComposerActionRow`** | Secondary actions и одно primary submit action. |
| **`SubmitCommentAction`** | Post comment / Post reply; имеет disabled, submitting и доступное состояние. |
| **`ComposerFeedback`** | Локальная ошибка или неопределённый результат с сохранением текста. |
| **`DraftDiscardDialog`** | Подтверждение действия, которое действительно может потерять или неверно привязать dirty draft. |

Отправка блокирует повторное нажатие. Черновик очищается после подтверждённого успеха. Неизвестный результат требует сверки перед повтором.

В будущую attachment-группу входят:

- **`AttachmentControl`** — выбор файла;
- **`AttachmentRefChip`** — локальный выбранный/готовый/отклонённый элемент и Remove;
- **`AttachmentFeedback`** — отказ или техническая ошибка конкретного элемента.

Дизайн chip не доказывает, что файл опубликован или доступен читателям. Эти элементы сохраняются в каталоге с отметкой зависимости от media-контракта.

## 8. Реакции

### Выбор и агрегаты

| Компонент | Описание |
|---|---|
| **`ReactionAggregateStrip`** | Компактные подтверждённые marks/count. Имеет empty/loading/error состояния независимо от текста комментария. |
| **`ReactionMark`** | Иконка или знак реакции с её доступным названием. |
| **`ReactionPicker`** | Общее содержимое выбора для root или comment. |
| **`ReactionLayerGroup`** | Именованная группа Emotional, Epistemic или Moderation. |
| **`ReactionOption`** | Label, вспомогательная иконка, selected indicator и состояние доступности. |
| **`ReactionSelectionFooter`** | Лимит, количество выбранных и явное действие завершения выбора. |
| **`ReactionScopeHint`** | Объяснение ограничения target или node-enabled набора. |

Picker на мобильном размещается в bottom sheet, на широком экране — в popover. Каталог остаётся одним.

Правила: enabled-набор из knobs, лимит из knobs, взаимоисключение agree/disagree, Moderation только на комментариях. React не добавляет реакцию по умолчанию.

### Люди в реакциях

| Компонент | Описание |
|---|---|
| **`ReactorsPopover`** | Компактное представление всех реакторов: одна общая list, без tabs и Connect. На мобильном имеет compact sheet-представление. |
| **`ReactionsDialog`** | Полное представление: header, tabs, people list и условные person actions. На мобильном — full bottom sheet. |
| **`ReactionTabs`** | All и разрешённые типы реакций, с горизонтальной прокруткой. |
| **`ReactorsList`** | Виртуализируемый список с loading/empty/error состояниями. |
| **`ReactorRow`** | Имя, avatar с reaction badge и допустимая secondary action. |
| **`AvatarWithReactionBadge`** | Badge накладывается на край avatar; не превращается в отдельную кнопку справа. |
| **`ConnectAction`** | Будущее person-level действие только в полном представлении. |
| **Self-вариант строки** | Показывает You без Connect. |

Все person-level элементы остаются future-contract, пока нет необходимых данных и правил приватности.

## 9. Карта

| Компонент | Описание |
|---|---|
| **`BoardMap`** | Показывает географически допустимое подмножество того же результата, что использует List. |
| **`IssueMapPin`** | Issue marker с rest, selected и focus состояниями. |
| **`MapSubsetNotice`** | Объясняет, что часть Issues остаётся только в List. |
| **`MapIssuePreview`** | Краткая civic-карточка выбранного pin: title, доступный public context, close и Open issue. |
| **`MapControls`** | Явные доступные controls карты, если они предусмотрены выбранной реализацией. |
| **`MapAttribution`** | Отдельный незакрываемый другими элементами слот attribution. |
| **`MapStatePanel`** | Локальные loading/error и Return to List. |

Мобильный preview располагается над bottom navigation. List остаётся полной альтернативой карте. Реализация карты изолируется за компонентом/адаптером; конкретную map-библиотеку артборды не выбирают.

## 10. Verification и invitation stub

**`VerifyWriteGate`** — компактный блок или sheet, который объясняет подтверждённое ограничение записи и предлагает Go to verification / Not now.

**`VerifyReturnFeedback`** — verified, cancelled, failed или changed-origin feedback с сохранением draft. Успешный возврат не отправляет комментарий автоматически.

**`WriteDeniedNotice`** — отдельное представление отказа с неизвестной причиной. Оно не утверждает, что пользователь не верифицирован.

**`EscalationStub`** — secondary Invite organization внутри Discussion.

Его варианты:

- idle;
- информационное сообщение после активации;
- soon/unavailable с постоянным объяснением.

**`CollaborationFeedback`** содержит смысл: handoff пока не подключён, приглашение не отправлено. Stub не становится пятым действием post strip.

## 11. Базовые элементы дизайн-системы

Доменные компоненты выше собираются из небольшого общего набора.

| Базовый элемент | Варианты и назначение |
|---|---|
| **`AppText`** | Heading, body, secondary, caption, action; системное масштабирование текста. |
| **`Surface` / `CardSurface`** | Page, обычная, warm, subtle, elevated поверхности. |
| **`Button`** | Primary, secondary, tertiary; normal, pressed, focused, disabled, loading. |
| **`IconButton`** | Close, back, overflow и utility actions с доступным названием. |
| **`Icon`** | Общая система размеров и семантических цветов. |
| **`Badge`** | Status и capability labels. |
| **`Chip`** | Label или selectable filter-вариант. |
| **`TextField`** | Single-line и multiline, label, hint, error, disabled. |
| **`Divider`** | Граница областей и строк без отдельной карточки. |
| **`DisclosureControl`** | Expand/collapse с явным состоянием. |
| **`InlineNotice`** | Info, success, warning, error; icon плюс текст и доступные действия. |
| **`StatusPanel`** | Loading, empty, unavailable, error, ineligible, stale. |
| **`Skeleton` / `LoadingIndicator`** | Только реально ожидающее содержимое. |
| **`OverlayHeader`** | Heading, close/back и необязательный contextual subtitle. |
| **`Avatar`** | Отображение подтверждённой identity; использование зависит от источника данных. |

Каждая подпись или иконка в карточке не требует отдельного React-компонента. Выделяем компонент там, где есть повторное использование, собственное поведение или устойчивый визуальный контракт.

## 12. Визуальная основа и особенности RN

Семантические цвета из M160:

| Роль | Light | Dark |
|---|---|---|
| Page | `#F7F6F2` | `#141417` |
| Surface | `#FFFFFF` | `#1B1C1F` |
| Warm surface | `#FFFDF8` | `#202125` |
| Subtle surface | `#F1EFE9` | `#25262B` |
| Primary text | `#101828` | `#F2F2F2` |
| Secondary text | `#667085` | `#B7BAC2` |
| Border | `#E7E4DC` | `#34353B` |
| Focus | `#B54708` | `#F5C542` |

Основной yellow accent — `#F5C542`, текст на нём — `#101828`.

Геометрические ориентиры: радиус Issue card 12 на широком экране и 10 на мобильном; внутренние отступы 20/16/12; civic icon 48/40; touch targets минимум 44, основные мобильные — 48. Типографические примеры: board heading 24/32, мобильный Issue title 18/24, body 14/20. Полную шкалу и гарнитуру закрепим по token pack при подготовке финальной спеки.

Для RN каталог дополнительно требует:

- `View`, `Text`, `Pressable`, `TextInput` как основу примитивов;
- `FlatList` для feed и больших lists; одного владельца вертикальной прокрутки в Issue;
- адаптации к safe area и клавиатуре без фиксированных «пустых» отступов;
- сохранения text scaling вместо уменьшения шрифта ради размещения;
- явного цвета иконок из theme tokens — native не зависит от CSS `currentColor`;
- native accessibility labels, roles и states вместо механического переноса DOM/ARIA;
- обработки system Back и скрытия фоновых элементов от accessibility при активном modal;
- pressed/focus состояний на native; hover и forced-colors правил там, где платформа их поддерживает.

**Основа:** Pages/Screen → Layouts → составные civic/social компоненты → базовые элементы → tokens. Вложения, schema details и people surfaces остаются в полном каталоге с явными отметками готовности контракта; при этом одна и та же система компонентов обслуживает feed, detail, modal и mobile sheet.