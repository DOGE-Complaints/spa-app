/**
 * M172 / PH-15 — About / Contact / Privacy static pages.
 * About+Contact: RU verbatim · EN/ET from tip (no invent paraphrase).
 * Privacy downloads: EN card/CTA labels from tip · RU/ET = EN fill (no invent RU/ET labels).
 * No invent in-page legal body.
 */

export const STATIC_PAGES_DOCS = Object.freeze({
  privacy: { href: '/docs/privacy.pdf', filename: 'privacy.pdf', icon: 'privacy' },
  terms: { href: '/docs/terms.pdf', filename: 'terms.pdf', icon: 'terms' },
  participation: {
    href: '/docs/participation_information.pdf',
    filename: 'participation_information.pdf',
    icon: 'participation-information',
  },
})

export const STATIC_PAGES_LINKS = Object.freeze({
  dogeos: 'https://www.dogeos.com/',
  site: 'https://zeya888.me',
  telegram: 'https://t.me/zeya888',
  email: 'mailto:zeya.metsapuu@gmail.com',
})

const PRIVACY_DOWNLOADS_EN = Object.freeze({
  privacyNotice: 'Privacy Notice',
  termsOfUse: 'Terms of Use',
  participantInformation: 'Participant Information',
  downloadCta: 'Download PDF',
})

export const STATIC_PAGES_EN = Object.freeze({
  about: {
    title: 'About DOGEstonia',
    intro:
      'DOGEstonia is an open-source platform that helps turn people’s personal experience into shared topics, useful connections and collective action.',
    local: {
      title: 'A space shaped by your community',
      p1: 'DOGEstonia is designed as a distributed network: a city district or a small town or village can set up its own local space—a node. The community will be able to adapt communication and moderation rules to its needs.',
      p2: 'Each node can serve its local area independently, without waiting for a large network to emerge.',
    },
    neighbours: {
      title: 'Start with your neighbours',
      p1: 'We recommend small local communities. At this scale, it is easier to organise careful handling of personal data and get important information to people who live nearby.',
      p2: 'A shared problem can reach the people it affects sooner. A useful idea can find people willing to help make it happen.',
    },
    network: {
      title: 'More connections, more possibilities',
      p1: 'As the network grows, nodes will be able to work together on shared economic needs: finding specialists, pooling demand, exchanging services and helping local initiatives find participants.',
      p2: 'We want needs, knowledge, resources and opportunities to connect more easily—within and between communities.',
    },
    marketing: {
      title: 'Marketing that does not need to interrupt you',
      p1: 'We are building an alternative to intrusive advertising: matching people’s needs with suitable offers in a clear and honest way.',
      p2: 'Instead of advertising pressure, transparent rules that explain why an offer suits someone. Instead of competing for attention, effective search on request, where no one can buy an advantage to push an unsuitable result.',
      p3: 'This is a direction for DOGEstonia’s development: an offer’s usefulness should matter more than its advertising budget.',
    },
    rewards: {
      title: 'Reward useful contributions on your own terms',
      p1: 'We plan to provide tools for communities to create their own systems of rewards and mutual opportunities: recognising contributions, providing access to resources and supporting useful initiatives.',
      p2: 'That is why we plan to use Web3 technologies—as tools for transparent record-keeping and shared rules.',
    },
    doge: {
      title: 'Every story could have its DOGE day',
      p1: 'Our near-term plans include tokenising personal stories on DogeOS. Your lived experience already matters. We want to give it a digital representation of its own.',
      p2: 'We will explain how this will work separately before launch.',
      link: 'Meet DogeOS ↗',
    },
  },
  contact: {
    title: 'Contact',
    lead: 'Your neighbours are behind this node',
    intro:
      'Each node has a person or team helping it run: supporting participants, looking after discussions and developing the local community.',
    admin: 'For now, I administer this node myself—I’m Zeya.',
    story:
      'I am developing DOGEstonia and launching its first node here. I live in Uus-Veerenni myself, so I chose to start in my own neighbourhood—with places and everyday situations I know.',
    invite:
      'I am taking on administration at the start. But I would love to build a local team: if you live nearby and would like to take part, I would be happy to meet you.',
    site: 'My website — zeya888.me',
    telegram: 'Telegram — @zeya888',
    email: 'Email — zeya.metsapuu@gmail.com',
    storyHint:
      'Want to tell us about a situation in your neighbourhood? Start an interview with the Telegram bot to submit your story to DOGEstonia.',
  },
  privacy: {
    title: 'Privacy',
    downloads: PRIVACY_DOWNLOADS_EN,
  },
})

export const STATIC_PAGES_ET = Object.freeze({
  about: {
    title: 'DOGEstoniast',
    intro:
      'DOGEstonia on avatud lähtekoodiga platvorm, mis aitab muuta inimeste isiklikud kogemused ühisteks teemadeks, kasulikeks sidemeteks ja ühiseks tegutsemiseks.',
    local: {
      title: 'Oma kogukonna vajadustele vastav keskkond',
      p1: 'DOGEstonia on kavandatud hajutatud võrgustikuna: suure linna asum või väike asula saab luua oma keskkonna ehk sõlme. Kogukond saab kohandada suhtlus- ja modereerimisreegleid oma vajaduste järgi.',
      p2: 'Iga sõlm saab oma piirkonnale iseseisvalt kasu tuua, ootamata suure võrgustiku tekkimist.',
    },
    neighbours: {
      title: 'Alustada tasub naabritest',
      p1: 'Soovitame alustada väikestest kohalikest kogukondadest. Nii on lihtsam korraldada isikuandmete hoolikat käsitlemist ja viia oluline teave läheduses elavate inimesteni.',
      p2: 'Ühine probleem jõuab kiiremini inimesteni, keda see puudutab. Kasulik idee leiab inimesed, kes on valmis aitama selle teoks teha.',
    },
    network: {
      title: 'Rohkem sidemeid, rohkem võimalusi',
      p1: 'Võrgustiku kasvades saavad sõlmed teha koostööd ühiste majanduslike ülesannete lahendamiseks: leida spetsialiste, koondada nõudlust, vahetada teenuseid ja aidata kohalikel algatustel osalejaid leida.',
      p2: 'Soovime, et vajadused, teadmised, ressursid ja võimalused leiaksid üksteist lihtsamini nii kogukonna sees kui ka kogukondade vahel.',
    },
    marketing: {
      title: 'Turundus, mis ei pea sind katkestama',
      p1: 'Loome alternatiivi pealetükkivale reklaamile: inimeste vajadused peaksid kohtuma sobivate pakkumistega arusaadava ja ausa sobitamise kaudu.',
      p2: 'Reklaamisurve asemel läbipaistvad reeglid, mis aitavad mõista, miks pakkumine inimesele sobib. Tähelepanu pärast võistlemise asemel tõhus otsing kasutaja päringu alusel, kus ei saa osta eelist ega suruda ette sobimatut tulemust.',
      p3: 'See on DOGEstonia arengusuund: pakkumise kasulikkus peaks olema olulisem kui reklaamieelarve.',
    },
    rewards: {
      title: 'Tunnusta kasulikku panust oma reeglite järgi',
      p1: 'Plaanime tööriistu, millega kogukonnad saavad luua oma tasustamise ja vastastikuste võimaluste süsteeme: tunnustada osalejate panust, võimaldada juurdepääsu ressurssidele ja toetada kasulikke algatusi.',
      p2: 'Just selleks plaanimegi kasutada Web3-tehnoloogiaid — läbipaistva arvestuse ja ühiste reeglite tööriistadena.',
    },
    doge: {
      title: 'Igal lool võib olla oma DOGE-päev',
      p1: 'Lähiaja plaanides on isiklike lugude tokeniseerimine DogeOS-i võrgus. Sinu elukogemus on juba oluline. Soovime anda sellele ka oma digitaalse esituse.',
      p2: 'Enne käivitamist selgitame eraldi, kuidas see täpselt toimima hakkab.',
      link: 'Tutvu DogeOS-iga ↗',
    },
  },
  contact: {
    title: 'Kontakt',
    lead: 'Selle sõlme taga on sinu naabrid',
    intro:
      'Iga sõlme toimimise eest hoolitseb inimene või meeskond: nad toetavad osalejaid, hoiavad aruteludes korda ja arendavad kohalikku kogukonda.',
    admin: 'Praegu haldan seda sõlme mina ise — olen Zeya.',
    story:
      'Arendan DOGEstoniat ja käivitan siin selle esimese sõlme. Elan ise Uus-Veerennis, seega otsustasin alustada oma naabruskonnast — paikadest ja igapäevastest olukordadest, mida tunnen.',
    invite:
      'Alguses võtan haldamise enda peale. Soovin aga kokku tuua kohaliku meeskonna: kui elad läheduses ja tahad kaasa lüüa, oleks mul hea meel sinuga tutvuda.',
    site: 'Minu veebileht — zeya888.me',
    telegram: 'Telegram — @zeya888',
    email: 'E-post — zeya.metsapuu@gmail.com',
    storyHint:
      'Soovid rääkida olukorrast oma naabruskonnas? Alusta intervjuud Telegrami botiga — nii jõuab sinu lugu DOGEstoniasse.',
  },
  privacy: {
    title: 'Privaatsus',
    /** EN tip fill — no invent ET download labels (M172 privacy downloads §3). */
    downloads: PRIVACY_DOWNLOADS_EN,
  },
})

export const STATIC_PAGES_RU = Object.freeze({
  about: {
    title: 'О DOGEstonia',
    intro:
      'DOGEstonia — платформа с открытым исходным кодом, которая помогает превращать личный опыт людей в общие темы, полезные связи и совместные действия.',
    local: {
      title: 'Своя среда для своего сообщества',
      p1: 'DOGEstonia задумана как распределённая сеть: район большого города или небольшой населённый пункт может запустить свою площадку — ноду. Сообщество сможет настраивать правила общения и модерирования под свои потребности.',
      p2: 'Каждая нода может приносить пользу на своей территории самостоятельно, не дожидаясь появления большой сети.',
    },
    neighbours: {
      title: 'Начинать лучше с соседей',
      p1: 'Мы рекомендуем небольшие местные сообщества. В таком масштабе проще организовать бережную работу с личными данными и донести важную информацию до людей, которые живут рядом.',
      p2: 'Общая проблема быстрее находит тех, кого она касается. А полезная идея — людей, готовых помочь ей осуществиться.',
    },
    network: {
      title: 'Больше связей — больше возможностей',
      p1: 'По мере роста сети ноды смогут объединяться для решения общих экономических задач: находить нужных специалистов, объединять спрос, обмениваться услугами и помогать местным инициативам находить участников.',
      p2: 'Мы хотим, чтобы потребности, знания, ресурсы и возможности легче встречались — внутри сообщества и между сообществами.',
    },
    marketing: {
      title: 'Маркетинг, которому не нужно вас перебивать',
      p1: 'Мы строим альтернативу навязчивой рекламе: потребности людей должны встречаться с подходящими предложениями через понятный и честный подбор.',
      p2: 'Вместо рекламного давления — прозрачные правила, по которым можно понять, почему предложение подходит человеку. Вместо борьбы за внимание — эффективный поиск по запросу, где нельзя купить себе преимущество и протолкнуть неподходящий результат.',
      p3: 'Это направление развития DOGEstonia: полезность предложения должна значить больше, чем рекламный бюджет.',
    },
    rewards: {
      title: 'Вознаграждать полезное — по своим правилам',
      p1: 'В планах — инструменты, с которыми сообщества смогут создавать собственные системы вознаграждений и взаимных возможностей: отмечать вклад участников, предоставлять доступ к ресурсам и поддерживать полезные инициативы.',
      p2: 'Для этого мы и планируем использовать технологии Web3 — как инструменты для прозрачного учёта и совместных правил.',
    },
    doge: {
      title: 'У каждой истории может быть свой DOGE-день',
      p1: 'В ближайших планах — токенизация личных историй в сети DogeOS. Ваш жизненный опыт уже имеет значение. Мы хотим дать ему ещё и собственное цифровое представление.',
      p2: 'Как именно это будет устроено, расскажем отдельно перед запуском.',
      link: 'Познакомиться с DogeOS ↗',
    },
  },
  contact: {
    title: 'Контакты',
    lead: 'За этой нодой стоят ваши соседи',
    intro:
      'У каждой ноды есть человек или команда, которые помогают ей работать: поддерживают участников, следят за порядком в обсуждениях и развивают местное сообщество.',
    admin: 'Сейчас эту ноду администрирую я — Зея.',
    story:
      'Я разрабатываю DOGEstonia и запускаю здесь её первую ноду. Я сама живу в Уус-Веэренни, поэтому решила начать со своего района — с мест и повседневных ситуаций, которые мне знакомы.',
    invite:
      'На старте я беру администрирование на себя. Но мне хочется собрать местную команду: если вы живёте рядом и хотите участвовать, буду рада познакомиться.',
    site: 'Мой сайт — zeya888.me',
    telegram: 'Telegram — @zeya888',
    email: 'Email — zeya.metsapuu@gmail.com',
    storyHint:
      'Хотите рассказать о ситуации в районе? Начните интервью с Telegram-ботом — так история попадёт в DOGEstonia.',
  },
  privacy: {
    title: 'Конфиденциальность',
    /** EN tip fill — no invent RU download labels (M172 privacy downloads §3). */
    downloads: PRIVACY_DOWNLOADS_EN,
  },
})

export const STATIC_PAGES_FLAT_KEYS = Object.freeze([
  'publicHome.static.about.title',
  'publicHome.static.about.intro',
  'publicHome.static.about.local.title',
  'publicHome.static.about.local.p1',
  'publicHome.static.about.local.p2',
  'publicHome.static.about.neighbours.title',
  'publicHome.static.about.neighbours.p1',
  'publicHome.static.about.neighbours.p2',
  'publicHome.static.about.network.title',
  'publicHome.static.about.network.p1',
  'publicHome.static.about.network.p2',
  'publicHome.static.about.marketing.title',
  'publicHome.static.about.marketing.p1',
  'publicHome.static.about.marketing.p2',
  'publicHome.static.about.marketing.p3',
  'publicHome.static.about.rewards.title',
  'publicHome.static.about.rewards.p1',
  'publicHome.static.about.rewards.p2',
  'publicHome.static.about.doge.title',
  'publicHome.static.about.doge.p1',
  'publicHome.static.about.doge.p2',
  'publicHome.static.about.doge.link',
  'publicHome.static.contact.title',
  'publicHome.static.contact.lead',
  'publicHome.static.contact.intro',
  'publicHome.static.contact.admin',
  'publicHome.static.contact.story',
  'publicHome.static.contact.invite',
  'publicHome.static.contact.site',
  'publicHome.static.contact.telegram',
  'publicHome.static.contact.email',
  'publicHome.static.contact.storyHint',
  'publicHome.static.privacy.title',
  'publicHome.static.privacy.downloads.privacyNotice',
  'publicHome.static.privacy.downloads.termsOfUse',
  'publicHome.static.privacy.downloads.participantInformation',
  'publicHome.static.privacy.downloads.downloadCta',
])
