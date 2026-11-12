# DOGEstonia M172 — About / Privacy / Contact — specification v2.0

Дата: 2026-10-23. Маршруты: `/about`, `/privacy`, `/contact`.
Артборд: M172 rev 2 — `DOGEstonia-M172-static-pages-copy-RU-EN-ET-spec-v2.0.png` (promoted from raw `exec-bd1d71ec-e58a-4c23-abcd-4aa97d49e8ba.png`).
Иконки (docs shelf, не runtime): [`m172-svg-icons-v1.0/`](m172-svg-icons-v1.0/) · zip [`DOGEstonia-M172-svg-icons-v1.0.zip`](DOGEstonia-M172-svg-icons-v1.0.zip).
Статус: RU-тексты About и Contact и подход к Privacy согласованы оператором. EN/ET — предоставленные в этом пакете переводы, отдельное утверждение их носителями языка не заявляется. Пакет описывает UX и контент; не подтверждает реализацию, API, юридическую готовность или OP PASS.

## 1. Обязательное правило для IDE и локализации

Русские строки ниже — утверждённый источник текста. Использовать ДОСЛОВНО. Не сокращать, не улучшать стиль, не перефразировать, не генерировать заново и не переводить русский обратно из EN/ET. Ответственность за лингвистику НЕ делегируется IDE.
EN и ET уже предоставлены: использовать соответствующие строки, не поручать код-агенту самостоятельный перевод. Если обнаружена языковая неоднозначность — вынести на редакторское согласование, не менять молча.
Ни один перевод не получает статус «утверждён оператором» автоматически.
Сохранить абзацы, заголовки, вопросительные знаки и смысловые акценты. Адаптировать вёрстку к тексту, не текст к растру.
Письменная спека выше PNG: пропуски, сокращения и ошибки текста на изображении не являются правкой контента.
Идентификаторы строк ниже — документационная карта соответствий, не API и не обязательные runtime-ключи.

## 2. Границы и приоритет

- Этот пакет заменяет контентные заглушки M172 v1 и прежние M167-вставки на этих трёх страницах.
- Общие public header/footer наследуются от текущего shell и M169; новая навигация/авторизация не проектируется.
- Brand home → `/next/feed`. Footer: About / Privacy / Contact с реальными маршрутами; без слогана «Civic issues, structured.».
- Нельзя добавлять юрисдикцию, имя контролёра данных, юридические обязательства или политику хранения.
- Указанные контакты предоставлены оператором для публичного показа.
- Open-source, распределённая модель и планы продукта — утверждённый рассказ оператора. Этот документ не аудит лицензии, приватности или блокчейн-интеграции.
- Будущие функции остаются планами: нельзя выдавать объединение нод, альтернативный маркетинг, вознаграждения или токенизацию за уже доступные возможности.
- Идея приватности небольших сообществ не является гарантией анонимности и не заменяет Privacy.

## 3. Структура страниц

### About — /about
Один H1, вводный абзац, затем шесть H2-разделов в указанном порядке: локальная нода; соседи; сеть; маркетинг; вознаграждения; DogeOS. Все абзацы обязательны. Последняя ссылка ведёт на https://www.dogeos.com/.
Не добавлять выдуманный GitHub-адрес, лицензию или кнопку уже работающей токенизации.

### Privacy — /privacy
> **Superseded 2026-10-23 (rev 3):** H1-only / future `.md` body **withdrawn**. Apply tip = [DOGEstonia-M172-privacy-document-downloads-spec-v1.0.md](DOGEstonia-M172-privacy-document-downloads-spec-v1.0.md) — H1 + three PDF download cards; legal text **only** inside OP PDFs (`/docs/privacy.pdf` · `terms.pdf` · `participation_information.pdf`). No invent in-page legal prose. `privacy.title` RU/EN/ET ниже остаётся H1 SSOT.

### Contact — /contact
Один H1 → lead → объяснение роли человека/команды → личное представление Зеи → происхождение первой ноды → приглашение соседям → три контактные ссылки → форма → предупреждение → отдельная подсказка о подаче истории через бота.
Важное смысловое различие: администратор ноды может быть человеком ИЛИ командой. Сейчас это сама основательница; не превращать это в требование персонального администрирования всех нод.
Не добавлять фамилию, аватар, часы работы, адрес, телефон или обещание срока ответа.
Контактная форма — запрос администрации, НЕ Story intake.

## 4. Точные тексты: RU / EN / ET

Каждый ID содержит полную строку. В locale не переносить метки RU/EN/ET и документационные ID.

### About

#### about.title

**RU:** О DOGEstonia

**EN:** About DOGEstonia

**ET:** DOGEstoniast

#### about.intro

**RU:** DOGEstonia — платформа с открытым исходным кодом, которая помогает превращать личный опыт людей в общие темы, полезные связи и совместные действия.

**EN:** DOGEstonia is an open-source platform that helps turn people’s personal experience into shared topics, useful connections and collective action.

**ET:** DOGEstonia on avatud lähtekoodiga platvorm, mis aitab muuta inimeste isiklikud kogemused ühisteks teemadeks, kasulikeks sidemeteks ja ühiseks tegutsemiseks.

#### about.local.title

**RU:** Своя среда для своего сообщества

**EN:** A space shaped by your community

**ET:** Oma kogukonna vajadustele vastav keskkond

#### about.local.p1

**RU:** DOGEstonia задумана как распределённая сеть: район большого города или небольшой населённый пункт может запустить свою площадку — ноду. Сообщество сможет настраивать правила общения и модерирования под свои потребности.

**EN:** DOGEstonia is designed as a distributed network: a city district or a small town or village can set up its own local space—a node. The community will be able to adapt communication and moderation rules to its needs.

**ET:** DOGEstonia on kavandatud hajutatud võrgustikuna: suure linna asum või väike asula saab luua oma keskkonna ehk sõlme. Kogukond saab kohandada suhtlus- ja modereerimisreegleid oma vajaduste järgi.

#### about.local.p2

**RU:** Каждая нода может приносить пользу на своей территории самостоятельно, не дожидаясь появления большой сети.

**EN:** Each node can serve its local area independently, without waiting for a large network to emerge.

**ET:** Iga sõlm saab oma piirkonnale iseseisvalt kasu tuua, ootamata suure võrgustiku tekkimist.

#### about.neighbours.title

**RU:** Начинать лучше с соседей

**EN:** Start with your neighbours

**ET:** Alustada tasub naabritest

#### about.neighbours.p1

**RU:** Мы рекомендуем небольшие местные сообщества. В таком масштабе проще организовать бережную работу с личными данными и донести важную информацию до людей, которые живут рядом.

**EN:** We recommend small local communities. At this scale, it is easier to organise careful handling of personal data and get important information to people who live nearby.

**ET:** Soovitame alustada väikestest kohalikest kogukondadest. Nii on lihtsam korraldada isikuandmete hoolikat käsitlemist ja viia oluline teave läheduses elavate inimesteni.

#### about.neighbours.p2

**RU:** Общая проблема быстрее находит тех, кого она касается. А полезная идея — людей, готовых помочь ей осуществиться.

**EN:** A shared problem can reach the people it affects sooner. A useful idea can find people willing to help make it happen.

**ET:** Ühine probleem jõuab kiiremini inimesteni, keda see puudutab. Kasulik idee leiab inimesed, kes on valmis aitama selle teoks teha.

#### about.network.title

**RU:** Больше связей — больше возможностей

**EN:** More connections, more possibilities

**ET:** Rohkem sidemeid, rohkem võimalusi

#### about.network.p1

**RU:** По мере роста сети ноды смогут объединяться для решения общих экономических задач: находить нужных специалистов, объединять спрос, обмениваться услугами и помогать местным инициативам находить участников.

**EN:** As the network grows, nodes will be able to work together on shared economic needs: finding specialists, pooling demand, exchanging services and helping local initiatives find participants.

**ET:** Võrgustiku kasvades saavad sõlmed teha koostööd ühiste majanduslike ülesannete lahendamiseks: leida spetsialiste, koondada nõudlust, vahetada teenuseid ja aidata kohalikel algatustel osalejaid leida.

#### about.network.p2

**RU:** Мы хотим, чтобы потребности, знания, ресурсы и возможности легче встречались — внутри сообщества и между сообществами.

**EN:** We want needs, knowledge, resources and opportunities to connect more easily—within and between communities.

**ET:** Soovime, et vajadused, teadmised, ressursid ja võimalused leiaksid üksteist lihtsamini nii kogukonna sees kui ka kogukondade vahel.

#### about.marketing.title

**RU:** Маркетинг, которому не нужно вас перебивать

**EN:** Marketing that does not need to interrupt you

**ET:** Turundus, mis ei pea sind katkestama

#### about.marketing.p1

**RU:** Мы строим альтернативу навязчивой рекламе: потребности людей должны встречаться с подходящими предложениями через понятный и честный подбор.

**EN:** We are building an alternative to intrusive advertising: matching people’s needs with suitable offers in a clear and honest way.

**ET:** Loome alternatiivi pealetükkivale reklaamile: inimeste vajadused peaksid kohtuma sobivate pakkumistega arusaadava ja ausa sobitamise kaudu.

#### about.marketing.p2

**RU:** Вместо рекламного давления — прозрачные правила, по которым можно понять, почему предложение подходит человеку. Вместо борьбы за внимание — эффективный поиск по запросу, где нельзя купить себе преимущество и протолкнуть неподходящий результат.

**EN:** Instead of advertising pressure, transparent rules that explain why an offer suits someone. Instead of competing for attention, effective search on request, where no one can buy an advantage to push an unsuitable result.

**ET:** Reklaamisurve asemel läbipaistvad reeglid, mis aitavad mõista, miks pakkumine inimesele sobib. Tähelepanu pärast võistlemise asemel tõhus otsing kasutaja päringu alusel, kus ei saa osta eelist ega suruda ette sobimatut tulemust.

#### about.marketing.p3

**RU:** Это направление развития DOGEstonia: полезность предложения должна значить больше, чем рекламный бюджет.

**EN:** This is a direction for DOGEstonia’s development: an offer’s usefulness should matter more than its advertising budget.

**ET:** See on DOGEstonia arengusuund: pakkumise kasulikkus peaks olema olulisem kui reklaamieelarve.

#### about.rewards.title

**RU:** Вознаграждать полезное — по своим правилам

**EN:** Reward useful contributions on your own terms

**ET:** Tunnusta kasulikku panust oma reeglite järgi

#### about.rewards.p1

**RU:** В планах — инструменты, с которыми сообщества смогут создавать собственные системы вознаграждений и взаимных возможностей: отмечать вклад участников, предоставлять доступ к ресурсам и поддерживать полезные инициативы.

**EN:** We plan to provide tools for communities to create their own systems of rewards and mutual opportunities: recognising contributions, providing access to resources and supporting useful initiatives.

**ET:** Plaanime tööriistu, millega kogukonnad saavad luua oma tasustamise ja vastastikuste võimaluste süsteeme: tunnustada osalejate panust, võimaldada juurdepääsu ressurssidele ja toetada kasulikke algatusi.

#### about.rewards.p2

**RU:** Для этого мы и планируем использовать технологии Web3 — как инструменты для прозрачного учёта и совместных правил.

**EN:** That is why we plan to use Web3 technologies—as tools for transparent record-keeping and shared rules.

**ET:** Just selleks plaanimegi kasutada Web3-tehnoloogiaid — läbipaistva arvestuse ja ühiste reeglite tööriistadena.

#### about.doge.title

**RU:** У каждой истории может быть свой DOGE-день

**EN:** Every story could have its DOGE day

**ET:** Igal lool võib olla oma DOGE-päev

#### about.doge.p1

**RU:** В ближайших планах — токенизация личных историй в сети DogeOS. Ваш жизненный опыт уже имеет значение. Мы хотим дать ему ещё и собственное цифровое представление.

**EN:** Our near-term plans include tokenising personal stories on DogeOS. Your lived experience already matters. We want to give it a digital representation of its own.

**ET:** Lähiaja plaanides on isiklike lugude tokeniseerimine DogeOS-i võrgus. Sinu elukogemus on juba oluline. Soovime anda sellele ka oma digitaalse esituse.

#### about.doge.p2

**RU:** Как именно это будет устроено, расскажем отдельно перед запуском.

**EN:** We will explain how this will work separately before launch.

**ET:** Enne käivitamist selgitame eraldi, kuidas see täpselt toimima hakkab.

#### about.doge.link

**RU:** Познакомиться с DogeOS ↗

**EN:** Meet DogeOS ↗

**ET:** Tutvu DogeOS-iga ↗

### Contact

#### contact.title

**RU:** Контакты

**EN:** Contact

**ET:** Kontakt

#### contact.lead

**RU:** За этой нодой стоят ваши соседи

**EN:** Your neighbours are behind this node

**ET:** Selle sõlme taga on sinu naabrid

#### contact.intro

**RU:** У каждой ноды есть человек или команда, которые помогают ей работать: поддерживают участников, следят за порядком в обсуждениях и развивают местное сообщество.

**EN:** Each node has a person or team helping it run: supporting participants, looking after discussions and developing the local community.

**ET:** Iga sõlme toimimise eest hoolitseb inimene või meeskond: nad toetavad osalejaid, hoiavad aruteludes korda ja arendavad kohalikku kogukonda.

#### contact.admin

**RU:** Сейчас эту ноду администрирую я — Зея.

**EN:** For now, I administer this node myself—I’m Zeya.

**ET:** Praegu haldan seda sõlme mina ise — olen Zeya.

#### contact.story

**RU:** Я разрабатываю DOGEstonia и запускаю здесь её первую ноду. Я сама живу в Уус-Веэренни, поэтому решила начать со своего района — с мест и повседневных ситуаций, которые мне знакомы.

**EN:** I am developing DOGEstonia and launching its first node here. I live in Uus-Veerenni myself, so I chose to start in my own neighbourhood—with places and everyday situations I know.

**ET:** Arendan DOGEstoniat ja käivitan siin selle esimese sõlme. Elan ise Uus-Veerennis, seega otsustasin alustada oma naabruskonnast — paikadest ja igapäevastest olukordadest, mida tunnen.

#### contact.invite

**RU:** На старте я беру администрирование на себя. Но мне хочется собрать местную команду: если вы живёте рядом и хотите участвовать, буду рада познакомиться.

**EN:** I am taking on administration at the start. But I would love to build a local team: if you live nearby and would like to take part, I would be happy to meet you.

**ET:** Alguses võtan haldamise enda peale. Soovin aga kokku tuua kohaliku meeskonna: kui elad läheduses ja tahad kaasa lüüa, oleks mul hea meel sinuga tutvuda.

#### contact.site

**RU:** Мой сайт — zeya888.me

**EN:** My website — zeya888.me

**ET:** Minu veebileht — zeya888.me

#### contact.telegram

**RU:** Telegram — @zeya888

**EN:** Telegram — @zeya888

**ET:** Telegram — @zeya888

#### contact.email

**RU:** Email — zeya.metsapuu@gmail.com

**EN:** Email — zeya.metsapuu@gmail.com

**ET:** E-post — zeya.metsapuu@gmail.com

#### contact.form.title

**RU:** Давайте на связи

**EN:** Let’s keep in touch

**ET:** Hoiame ühendust

#### contact.form.topic

**RU:** О чём вы хотите написать?

**EN:** What would you like to write about?

**ET:** Millest soovid kirjutada?

#### contact.topic.improvement.title

**RU:** Предложить улучшение

**EN:** Suggest an improvement

**ET:** Paku parendust

#### contact.topic.improvement.help

**RU:** Есть идея функции или того, как сделать DOGEstonia удобнее.

**EN:** I have an idea for a feature or a way to make DOGEstonia easier to use.

**ET:** Mul on idee uue funktsiooni jaoks või ettepanek, kuidas DOGEstoniat mugavamaks muuta.

#### contact.topic.team.title

**RU:** Присоединиться к команде ноды

**EN:** Join the node team

**ET:** Liitu sõlme meeskonnaga

#### contact.topic.team.help

**RU:** Хочу помогать с администрированием, модерированием или развитием сообщества.

**EN:** I would like to help with administration, moderation or community development.

**ET:** Soovin aidata haldamise, modereerimise või kogukonna arendamisega.

#### contact.topic.bug.title

**RU:** Сообщить о неполадке

**EN:** Report a problem

**ET:** Teata tõrkest

#### contact.topic.bug.help

**RU:** Что-то не работает или работает непонятно.

**EN:** Something is not working, or I am unsure how it works.

**ET:** Miski ei tööta või selle toimimine on ebaselge.

#### contact.topic.node.title

**RU:** Запустить свою ноду

**EN:** Start your own node

**ET:** Loo oma sõlm

#### contact.topic.node.help

**RU:** Хочу такую площадку для своего района или сообщества.

**EN:** I would like a space like this for my neighbourhood or community.

**ET:** Soovin sellist keskkonda oma naabruskonnale või kogukonnale.

#### contact.topic.other.title

**RU:** Другое

**EN:** Something else

**ET:** Muu

#### contact.topic.other.help

**RU:** Мой вопрос не подходит под остальные темы.

**EN:** My question does not fit the other topics.

**ET:** Minu küsimus ei sobi teiste teemade alla.

#### contact.form.name

**RU:** Как к вам обращаться

**EN:** What should we call you?

**ET:** Kuidas sind kutsuda?

#### contact.form.optional

**RU:** Необязательно

**EN:** Optional

**ET:** Valikuline

#### contact.form.reply

**RU:** Куда вам ответить

**EN:** Where can we reply?

**ET:** Kuhu saame vastata?

#### contact.form.replyHelp

**RU:** Email или Telegram, если нужен ответ.

**EN:** Email or Telegram, if you would like a reply.

**ET:** E-post või Telegram, kui soovid vastust.

#### contact.form.message

**RU:** Ваше сообщение

**EN:** Your message

**ET:** Sinu sõnum

#### contact.form.placeholder

**RU:** Расскажите, что у вас на уме

**EN:** Tell us what is on your mind

**ET:** Kirjuta, mis sul mõttes on

#### contact.form.submit

**RU:** Отправить запрос

**EN:** Send request

**ET:** Saada päring

#### contact.form.safety

**RU:** Пожалуйста, не присылайте пароли, документы и чужие личные данные.

**EN:** Please do not send passwords, documents or other people’s personal data.

**ET:** Palun ära saada paroole, dokumente ega teiste inimeste isikuandmeid.

#### contact.form.storyHint

**RU:** Хотите рассказать о ситуации в районе? Начните интервью с Telegram-ботом — так история попадёт в DOGEstonia.

**EN:** Want to tell us about a situation in your neighbourhood? Start an interview with the Telegram bot to submit your story to DOGEstonia.

**ET:** Soovid rääkida olukorrast oma naabruskonnas? Alusta intervjuud Telegrami botiga — nii jõuab sinu lugu DOGEstoniasse.

### Privacy

#### privacy.title

**RU:** Конфиденциальность

**EN:** Privacy

**ET:** Privaatsus

## 5. Ссылки и адреса — точная привязка

| Элемент | Назначение |
| --- | --- |
| Brand home; Feed | `/next/feed` |
| How it works | `/how-it-works` |
| About | `/about` |
| Privacy | `/privacy` |
| Contact | `/contact` |
| about.doge.link | https://www.dogeos.com/ |
| contact.site | https://zeya888.me |
| contact.telegram | https://t.me/zeya888 |
| contact.email | mailto:zeya.metsapuu@gmail.com |
| Подсказка об интервью | URL/handle interview-бота TBD; @zeya888 — личный контакт, НЕ адрес бота |

Сохранять назначение ссылок при локализации. Не подменять `/next/feed` на `/board`.
Оформление внешней ссылки не означает обязательное новое окно; соблюдать существующее правило shell, без изменения политики в этом пакете.
DogeOS — внешний проект; ссылка не означает партнёрство. Никаких обещаний финансовой доходности, публичного размещения содержимого Stories или готовой mainnet-интеграции.

## 6. Форма Contact

### 6.1 Выбор темы

Пять плиток, одна группа одиночного выбора. Это доступный radio group по семантике, а не пять независимых checkbox. Названия и пояснения — из §4:
1. improvement — идея/лампочка.
2. team — люди/сотрудничество.
3. bug — неисправность.
4. node — рост/новая площадка.
5. other — сообщение.

Символы — визуальная подсказка, не новые утверждённые SVG-мастера; существующие совместимые glyphs переиспользовать. Конкретный новый asset pack не придумывать.
В выбранной плитке мягкая жёлтая подложка и галочка; значение понятно без одного только цвета. Вся плитка кликабельна, hit-area ≥44 CSS px. Keyboard focus видим, выбор доступен стрелками и Space по стандартной radio-семантике.
На артборде team выбрана для демонстрации. Это НЕ утверждение default-выбора первого рендера. Начальное значение и обязательность выбора темы остаются TBD до определения отправки; не подавать запрос с молча выбранной темой.
Desktop — две колонки плиток, other может занимать строку. Narrow — одна колонка. Пояснения сохраняются и на mobile: если растр показывает только названия, это сокращённый визуальный пример, не разрешение удалять текст.

### 6.2 Поля

| Поле | Правило |
| --- | --- |
| Имя | Необязательно; label + отдельный optional cue |
| Канал ответа | Email или Telegram, если нужен ответ; не навязывать email-only формат |
| Сообщение | Многострочное поле, постоянный label, placeholder не заменяет label |
| Кнопка | Локализованная form.submit, минимум 44 CSS px |

Точные лимиты длины, обязательность сообщения, правила проверки контакта, антиспам, согласие на обработку и ошибки не согласованы — TBD. Не создавать юридическое согласие или обещание обработки данных от себя.
Не менять введённый текст при выборе темы.
Не добавлять файлы/документы в форму: такой функционал не запрошен, предупреждение просит документы не присылать.
Подсказка интервью отделена от запроса администрации; при неизвестной ссылке не создавать неработающий CTA или фальшивый bot URL.

### 6.3 Честность отправки

Форма показана на артборде как UX-концепт. Способ доставки, адресат её запросов, хранилище и контракт отправки НЕ заданы. Публичные контакты не равны разрешению автоматически отправлять форму email/Telegram.
Не придумывать POST endpoint, backend, успешную отправку или уведомление «отправлено».
Пока доставка не подключена: в production использовать прямые контактные ссылки; форму разрешено показывать в lab/design preview с явным обозначением демонстрации вне продуктового текста. Не выпускать активную no-op кнопку.
После выбора реального механизма отдельно согласовать loading/success/failure/validation, сохранение черновика и доступные уведомления. Успех только после подтверждённой доставки по контракту.
Для этих ещё не определённых состояний в данном пакете нет строк: IDE не сочиняет их самостоятельно.

## 7. Лейаут и визуальные правила

Общий public shell, спокойная светлая civic-страница, без героя лендинга и декоративных иллюстраций. Типографическая иерархия: H1, lead, H2, абзацы, ссылки.
Палитра: page #F7F6F2; surface #FFFDF8; text #101828; secondary #667085; divider #E7E4DC; link #B54708; selected/accent #F5C542. Без новой violet/green/red палитры.
Ниже — предложения этой ревизии, не измерения текущего кода:
- reading column max-width 720 CSS px; центрирование внутри shell;
- mobile viewport-пример 390 CSS px, боковые поля 20 CSS px;
- header brand visible band около 44 CSS px; footer mark ≥40 CSS px;
- первичные контролы и ссылки: целевая область ≥44 CSS px; сам текст может иметь обычный line-height;
- использовать существующую типографику shell, не создавать второй token register по растру.
Privacy = H1 + download cards ([privacy downloads tip](DOGEstonia-M172-privacy-document-downloads-spec-v1.0.md)); не растягивать выдуманным текстом страницы — юридический текст только в PDF.
Contact на mobile скроллится естественно; не обрезать контактные адреса и согласованные абзацы. Email переносится безопасно; полная строка доступна для чтения/копирования.
Растр D может не показывать footer из-за crop: в реальном документе footer обязателен.
Макет light-first; не отменять установленную пользовательскую тему и не принуждать приложение к light. Dark continuity наследует существующие theme tokens, новый dark-пакет здесь не утверждается.
Фокус, hover и selected не должны менять размеры элементов. Экранный диктор получает смысловую структуру, label полей и состояние radio.

## 8. Локализация shell

Следующие подписи для этих страниц можно использовать при отсутствии уже утверждённого эквивалента shell. Не создавать вторую систему i18n.

| Назначение | RU | EN | ET |
| --- | --- | --- | --- |
| /about | О проекте | About | Projektist |
| /privacy | Конфиденциальность | Privacy | Privaatsus |
| /contact | Контакты | Contact | Kontakt |
| /next/feed | Лента | Feed | Voog |
| /how-it-works | Как это работает | How it works | Kuidas see toimib |

На самих страницах H1 берётся из §4; подпись навигации About может быть короче H1.
Термин «нода» в RU согласован; EN node, ET sõlm. Названия DOGEstonia, DogeOS, Web3, Telegram и контактные адреса не переводить. В ET имя Зеи передано как Zeya; не генерировать иную латинизацию.
На About не менять утверждённый «DOGE-день» на финансовое обещание. EN/ET сохраняют игровой тон и статус плана.
Не добавлять eyebrow-тексты из растра в locale автоматически: они не входят в согласованный текстовый набор.

## 9. Передача в IDE и проверка

- [ ] 3 маршрута используют один публичный shell; brand home /next/feed.
- [ ] RU About: все 22 блока, в исходном порядке, дословно.
- [ ] Фраза сохранена точно: «Для этого мы и планируем использовать технологии Web3 — как инструменты для прозрачного учёта и совместных правил.»
- [ ] RU Contact: все 30 строк из карты; 5 тем + пояснения; контакты точные.
- [ ] EN/ET соответствуют тем же ID; перевод не производится заново код-агентом.
- [ ] Privacy: H1 + три PDF-карточки per [privacy downloads](DOGEstonia-M172-privacy-document-downloads-spec-v1.0.md); нет in-page legal prose / старых OP TBD.
- [ ] Никаких старых About-заглушек.
- [ ] Никакого footer tagline.
- [ ] Будущие возможности не выданы за текущий функционал.
- [ ] Форма не имитирует доставку, direct links работают независимо.
- [ ] Мобильная версия сохраняет полный текст; touch ≥44, доступный выбор темы.
- [ ] Не добавлены gateway HTTP, юридические условия, новый контакт или выдуманный bot URL.
- [ ] PNG используется как визуальная композиция; текст и правила этого .md выше несовершенных пикселей.

## 10. Оставшиеся решения

Privacy downloads: PDF Present в `public/docs/` · RU/ET подписи карточек soft TBD · Apply PH-15 `t02`.
Форма: доставка, получатель, обработка/хранение, проверка полей, обязательность, лимиты, anti-spam, состояния и их редакторские строки.
Interview-бот: точный адрес.
EN/ET: отдельная редакторская правка возможна только новым согласованным изменением; не заявлять её уже состоявшейся.
Репозиторий/лицензия open-source: ссылка не предоставлена; не выдумывать.
