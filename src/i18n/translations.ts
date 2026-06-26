export type Locale = "pt" | "en";

export type OccasionKey =
  | "weddingGuest"
  | "blackTie"
  | "summerEvent"
  | "party"
  | "dinner"
  | "holiday";

export type DressSlug =
  | "the-bias-slip"
  | "the-poplin-shirt-dress"
  | "the-burgundy-gown"
  | "the-olive-linen"
  | "the-tuxedo-mini"
  | "the-tiered-sun-dress"
  | "the-champagne-slip"
  | "the-cacao-wrap";

export type Translation = {
  meta: {
    siteTitle: string;
    siteDescription: string;
  };
  nav: {
    browse: string;
    howItWorks: string;
    about: string;
    faq: string;
    reserve: string;
    reserveWhatsApp: string;
    menu: string;
    closeMenu: string;
    mobileNavLabel: string;
    homeAria: string;
  };
  ticker: string[];
  footer: {
    tagline1: string;
    tagline2: string;
    explore: string;
    contact: string;
    legal: string;
    privacyPolicy: string;
    termsAndConditions: string;
    location: string;
    copyright: string;
    moments: string;
  };
  cta: {
    browseCollection: string;
    browseCollectionArrow: string;
    viewAll: string;
    viewFullCollection: string;
    readStory: string;
    allAnswers: string;
    seeAllQuestions: string;
    reserveWhatsApp: string;
    reserveOnWhatsApp: string;
    reserveWhatsAppUpper: string;
    noCheckout: string;
    backToCollection: string;
  };
  home: {
    metaTitle: string;
    metaDescription: string;
    heroImageAlt: string;
    heroLine1: string;
    heroLine2: string;
    heroLine3: string;
    heroLine4: string;
    heroBody: string;
    favouritesEyebrow: string;
    favouritesTitle: string;
    howEyebrow: string;
    howTitle1: string;
    howTitle2: string;
    steps: { n: string; title: string; description: string }[];
    whyRentEyebrow: string;
    whyRentTitle: string;
    whyRentItems: string[];
    editorialImageAlt: string;
    aboutEyebrow: string;
    aboutTitle1: string;
    aboutTitle2: string;
    aboutBody: string;
    faqEyebrow: string;
    faqTitle: string;
    faqPreview: { q: string; a: string }[];
    finalTitle1: string;
    finalTitle2: string;
    finalBody: string;
    aboutTeaserImageAlt: string;
  };
  collection: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title1: string;
    title2: string;
    intro: string;
    curatedCollection: string;
    size: string;
    all: string;
    emptyTitle: string;
    emptyBody: string;
    reserved: string;
  };
  dress: {
    perRental: string;
    retail: string;
    sizes: string;
    occasions: string;
    availability: string;
    availabilityHelper: string;
    availabilityChangeHelper: string;
    rentalSummaryLabel: string;
    legendAvailable: string;
    legendReserved: string;
    legendSelected: string;
    calendarPreviousMonth: string;
    calendarNextMonth: string;
    calendarPast: string;
    calendarSelectDay: string;
    rentalDateRange: (start: string, end: string) => string;
    rentalPeriodError: string;
    viewReservedDates: string;
    changeDates: string;
    useTheseDates: string;
    closeModal: string;
    requestShowroomVisit: string;
    showroomVisitTitle: string;
    showroomVisitDescription: string;
    showroomVisitNote: string;
    details: string;
    relatedTitle: string;
    notFoundEyebrow: string;
    notFoundTitle: string;
    errorTitle: string;
  };
  about: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title1: string;
    title2: string;
    imageAlt: string;
    lead: string;
    body1: string;
    body2: string;
    values: { title: string; description: string }[];
    ctaEyebrow: string;
    ctaTitle1: string;
    ctaTitle2: string;
  };
  howItWorks: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title1: string;
    title2: string;
    steps: { n: string; title: string; description: string }[];
    ctaTitle1: string;
    ctaTitle2: string;
  };
  faq: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title1: string;
    title2: string;
    ctaEyebrow: string;
    ctaTitle: string;
    items: { q: string; a: string }[];
  };
  occasions: Record<OccasionKey, string>;
  dresses: Record<
    DressSlug,
    { name: string; description: string; details: string[] }
  >;
  whatsapp: {
    general: string;
    navReserve: string;
    dress: (name: string) => string;
    dressWithDates: (name: string, start: string, end: string) => string;
  };
  errors: {
    notFoundTitle: string;
    notFoundHeading: string;
    notFoundBody: string;
    goHome: string;
    errorTitle: string;
    errorBody: string;
    tryAgain: string;
  };
  privacyPolicy: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title1: string;
    title2: string;
    updated: string;
    sections: { title: string; body: string }[];
  };
  termsAndConditions: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title1: string;
    title2: string;
    updated: string;
    sections: { title: string; body: string }[];
  };
};

const pt: Translation = {
  meta: {
    siteTitle: "Na Curva — Aluguer de Vestidos de Designer",
    siteDescription:
      "Um guarda-roupa de aluguer com vestidos excecionais para casamentos, celebrações e noites especiais. Com sede em Portugal.",
  },
  nav: {
    browse: "Coleção",
    howItWorks: "Como Funciona",
    about: "Sobre",
    faq: "FAQ",
    reserve: "Reservar",
    reserveWhatsApp: "Reservar via WhatsApp →",
    menu: "Menu",
    closeMenu: "Fechar menu",
    mobileNavLabel: "Navegação principal",
    homeAria: "Na Curva — início",
  },
  ticker: ["Casamentos", "Eventos de empresa", "Festas", "Celebrações"],
  footer: {
    tagline1: "Veste o vestido.",
    tagline2: "Vive o momento.",
    explore: "Explorar",
    contact: "Contacto",
    legal: "Legal",
    privacyPolicy: "Política de Privacidade",
    termsAndConditions: "Termos e Condições",
    location: "Lisboa · Portugal",
    copyright: "Na Curva — Selecionado em Portugal",
    moments: "Para os momentos que importam",
  },
  cta: {
    browseCollection: "Ver a coleção",
    browseCollectionArrow: "Ver a coleção →",
    viewAll: "Ver tudo →",
    viewFullCollection: "Ver a coleção completa →",
    readStory: "Ler a nossa história →",
    allAnswers: "Todas as respostas →",
    seeAllQuestions: "Ver todas as perguntas →",
    reserveWhatsApp: "Reservar via WhatsApp",
    reserveOnWhatsApp: "Reservar no WhatsApp",
    reserveWhatsAppUpper: "RESERVAR VIA WHATSAPP →",
    noCheckout: "Sem checkout. Uma pessoa real confirma a reserva.",
    backToCollection: "Voltar à coleção",
  },
  home: {
    metaTitle: "Na Curva — Aluguer de Vestidos de Designer para Cada Celebração",
    metaDescription:
      "Vestidos de designer alugados por noite. Para casamentos de verão, jantares de aniversário, eventos de moda e momentos que quer recordar.",
    heroImageAlt: "Mulher com vestido fluido numa quinta portuguesa ao sol",
    heroLine1: "veste o",
    heroLine2: "vestido.",
    heroLine3: "vive o",
    heroLine4: "momento.",
    heroBody:
      "Vestidos de designer, alugados por noite. Para os casamentos, aniversários, jantares e fins de semana que pedem algo um pouco mais ousado do que o teu guarda-roupa.",
    favouritesEyebrow: "Os Nossos Favoritos",
    favouritesTitle: "Peças selecionadas.",
    howEyebrow: "Como funciona",
    howTitle1: "Quatro passos,",
    howTitle2: "zero fricção.",
    steps: [
      { n: "01", title: "Escolhe", description: "Explora a seleção. Guarda o que te fala." },
      { n: "02", title: "Reserva", description: "Envia-nos mensagem. Confirmamos em minutos." },
      { n: "03", title: "Usa", description: "Chega engomado e pronto. Teu por quatro noites." },
      { n: "04", title: "Devolve", description: "Mete no saco. Nós tratamos do resto." },
    ],
    whyRentEyebrow: "Porquê alugar",
    whyRentTitle: "Um guarda-roupa que vive com mais do que uma mulher.",
    whyRentItems: [
      "Usa peças que de outro modo ficariam paradas no guarda-roupa de alguém.",
      "Uma seleção pequena e intencional — nunca um marketplace, nunca um mar.",
      "Uma forma mais consciente — e muito mais divertida — de te vestires para os momentos que contam.",
    ],
    editorialImageAlt: "Mulher com vestido fluido num caminho costeiro português ao sol",
    aboutEyebrow: "Sobre a Na Curva",
    aboutTitle1: "Selecionado em Lisboa.",
    aboutTitle2: "Usado em todo o lado.",
    aboutBody:
      "A Na Curva nasceu de uma ideia: roupa excecional deve ser vivida, não guardada. Escolhemos cada vestido pela silhueta, pelo ofício e pelo tipo de noite que merece.",
    faqEyebrow: "Perguntas",
    faqTitle: "Bom saber.",
    faqPreview: [
      {
        q: "Quanto tempo dura o aluguer?",
        a: "Quatro dias, porta a porta. Estadias mais longas disponíveis a pedido.",
      },
      {
        q: "E se o vestido for danificado?",
        a: "Desgaste ligeiro fica por nossa conta. Para o resto, falamos caso a caso — sem pânico.",
      },
      {
        q: "Como funcionam as reservas?",
        a: "Tudo via WhatsApp. Respondemos pessoalmente — normalmente dentro de uma hora.",
      },
    ],
    finalTitle1: "o vestido está pronto",
    finalTitle2: "quando tu estiveres.",
    finalBody:
      "Conta-nos a ocasião — casamento, aniversário, inauguração, fim de semana em Comporta. Ajudamos-te a encontrar o vestido.",
    aboutTeaserImageAlt: "Vestido de seda dobrado em linho com flores silvestres secas",
  },
  collection: {
    metaTitle: "Coleção — Na Curva",
    metaDescription:
      "Uma seleção de vestidos de designer disponíveis para aluguer em Portugal.",
    eyebrow: "A Coleção",
    title1: "vestidos,",
    title2: "por noite.",
    intro:
      "Uma seleção pequena e intencional para as celebrações que pedem algo um pouco mais ousado — casamentos, jantares, inaugurações, fins de semana com as pessoas certas.",
    curatedCollection: "Coleção Curada",
    size: "Tamanho",
    all: "Todos",
    emptyTitle: "Ainda não há correspondências.",
    emptyBody: "Experimenta outro tamanho.",
    reserved: "Reservado",
  },
  dress: {
    perRental: "por aluguer",
    retail: "retail",
    sizes: "Tamanhos",
    occasions: "Ocasiões",
    availability: "Datas de aluguer",
    availabilityHelper:
      "Consulta as datas indisponíveis antes de pedires uma visita.",
    availabilityChangeHelper:
      "Consulta as datas indisponíveis antes de pedires uma visita.",
    rentalSummaryLabel: "Datas selecionadas",
    legendAvailable: "Disponível",
    legendReserved: "Reservado",
    legendSelected: "Período selecionado",
    calendarPreviousMonth: "Mês anterior",
    calendarNextMonth: "Mês seguinte",
    calendarPast: "data passada",
    calendarSelectDay: "Selecionar como data de início do aluguer",
    rentalDateRange: (start, end) => `${start} → ${end}`,
    rentalPeriodError:
      "Este período de aluguer não está disponível. Escolhe outra data de início.",
    viewReservedDates: "Ver datas indisponíveis",
    changeDates: "Alterar datas",
    useTheseDates: "Usar estas datas",
    closeModal: "Fechar",
    requestShowroomVisit: "Pedir visita ao showroom",
    showroomVisitTitle: "Visita ao showroom",
    showroomVisitDescription:
      "Marca uma prova no nosso showroom em Lisboa. Podes experimentar várias peças da coleção numa única visita.",
    showroomVisitNote: "Confirmamos a visita contigo pessoalmente.",
    details: "Detalhes",
    relatedTitle: "Também na seleção",
    notFoundEyebrow: "Não encontrado",
    notFoundTitle: "Este vestido já não está aqui.",
    errorTitle: "Algo correu mal.",
  },
  about: {
    metaTitle: "Sobre — Na Curva",
    metaDescription:
      "A Na Curva é uma marca de aluguer de vestidos com sede em Portugal — construída sobre estilo, ofício e uma forma mais consciente de vestir.",
    eyebrow: "A nossa história",
    title1: "um guarda-roupa de",
    title2: "beleza emprestada.",
    imageAlt: "Fundadora num apartamento em Lisboa",
    lead:
      "A Na Curva começou com um armário cheio de vestidos usados uma vez, e a calma realização de que a beleza é para ser vivida.",
    body1:
      "Criámos a Na Curva em Lisboa para tornar vestidos excecionais acessíveis — sem o peso da propriedade. Cada peça é escolhida à mão pela silhueta, pelo ofício e pelo tipo de noite que merece.",
    body2:
      "Acreditamos em menos coisas, melhores. Em vestir para o momento em vez do guarda-roupa. Num relação mais honesta com a moda — onde um único vestido pode carregar muitas histórias.",
    values: [
      {
        title: "Curadoria",
        description: "Uma seleção pequena e intencional. Dizemos não muito mais vezes do que dizemos sim.",
      },
      {
        title: "Acesso",
        description: "Vestidos de designer, por noite. Como a roupa excecional deve sentir-se.",
      },
      {
        title: "Consciência",
        description: "Uma forma mais ponderada de vestir — um vestido, muitas mulheres, muitas histórias.",
      },
    ],
    ctaEyebrow: "Começar",
    ctaTitle1: "conta-nos",
    ctaTitle2: "a ocasião.",
  },
  howItWorks: {
    metaTitle: "Como Funciona — Na Curva",
    metaDescription:
      "Escolhe, reserva, usa, devolve. Alugar um vestido com a Na Curva é simples e pessoal.",
    eyebrow: "Como funciona",
    title1: "quatro passos,",
    title2: "sem fricção.",
    steps: [
      {
        n: "01",
        title: "Escolhe o teu vestido",
        description:
          "Explora a nossa seleção e guarda as peças que te falam. Cada vestido é escolhido à mão — não há milhares de opções, apenas as que adoramos.",
      },
      {
        n: "02",
        title: "Reserva via WhatsApp",
        description:
          "Envia-nos uma mensagem com o vestido e a data. Respondemos pessoalmente — normalmente dentro de uma hora — para confirmar disponibilidade e tamanho.",
      },
      {
        n: "03",
        title: "Usa-o",
        description:
          "O vestido chega no dia anterior ao evento, engomado e pronto num saco reutilizável. Usa-o. Vive-o. Tira fotografias que vales a pena guardar.",
      },
      {
        n: "04",
        title: "Devolve-o",
        description:
          "Mete o vestido de volta no saco e entrega no dia seguinte ao evento. Tratamos da limpeza. Tu ficas com a memória.",
      },
    ],
    ctaTitle1: "pronta para encontrar",
    ctaTitle2: "o teu vestido?",
  },
  faq: {
    metaTitle: "FAQ — Na Curva",
    metaDescription:
      "Respostas a perguntas frequentes sobre alugar um vestido com a Na Curva — alugueres, devoluções, tamanhos, danos e cuidados.",
    eyebrow: "Perguntas",
    title1: "bom ",
    title2: "saber.",
    ctaEyebrow: "Ainda com dúvidas?",
    ctaTitle: "envia-nos mensagem.",
    items: [
      {
        q: "Como funciona o aluguer?",
        a: "Escolhes um vestido da nossa seleção e reservas via WhatsApp. Confirmamos disponibilidade, organizamos entrega e recolha à volta do teu evento, e tratamos da limpeza quando o vestido regressa.",
      },
      {
        q: "Quanto tempo dura o aluguer?",
        a: "O aluguer padrão é de quatro dias, porta a porta — normalmente o dia anterior, o dia do evento e dois dias depois. Alugueres mais longos disponíveis a pedido.",
      },
      {
        q: "O que acontece se o vestido for danificado?",
        a: "Desgaste ligeiro é esperado e está incluído — um copo de vinho derramado, uma bainha solta. Para algo mais significativo, falamos caso a caso e só cobramos se for necessária uma reparação.",
      },
      {
        q: "Como funcionam as reservas?",
        a: "Todas as reservas são feitas via WhatsApp. Respondemos pessoalmente — normalmente dentro de uma hora — para confirmar o vestido, o tamanho e as datas. Sem checkout, sem carrinho de compras.",
      },
      {
        q: "Como funcionam as devoluções?",
        a: "Incluímos uma etiqueta de devolução pré-paga e um saco reutilizável. Entrega o vestido no ponto de recolha mais próximo no dia seguinte ao evento. É só isso.",
      },
      {
        q: "Que tamanhos têm?",
        a: "A nossa seleção atual vai do XS ao L. Estamos a alargar a gama de tamanhos a cada temporada — se não vires o teu, envia-nos mensagem.",
      },
      {
        q: "Onde entregam?",
        a: "Em qualquer lugar em Portugal continental. Estamos a trabalhar na expansão para as ilhas e resto da Europa.",
      },
      {
        q: "Posso experimentar o vestido antes do evento?",
        a: "Sim — o vestido chega no dia anterior ao evento para teres tempo de experimentar. Se algo não estiver certo, fazemos o possível para trocar.",
      },
    ],
  },
  occasions: {
    weddingGuest: "Convidada de casamento",
    blackTie: "Gala",
    summerEvent: "Evento de verão",
    party: "Festa",
    dinner: "Jantar",
    holiday: "Férias",
  },
  dresses: {
    "the-bias-slip": {
      name: "O Slip em Bias",
      description:
        "Uma coluna de seda preta líquida cortada no verdadeiro bias. O tipo de vestido que não te pede nada e dá-te tudo.",
      details: ["100% crêpe de seda", "Comprimento até ao chão em bias", "Alças ajustáveis", "Limpeza a seco incluída"],
    },
    "the-poplin-shirt-dress": {
      name: "O Vestido Camiseiro em Popeline",
      description:
        "Um popeline oversized em marfim no espírito da sofisticação sem esforço. Com sandálias de couro ou para nunca tirar.",
      details: ["Popeline de algodão orgânico", "Corte oversized relaxado", "Botões em madrepérola", "Comprimento mid-calf"],
    },
    "the-burgundy-gown": {
      name: "O Vestido Borgonha",
      description:
        "Cetim borgonha profundo moldado num vestido de um ombro com cauda fluida. Feito para noites que importam.",
      details: ["Cetim duchesse", "Decote de um ombro", "Cauda ampla", "Fecho invisível nas costas"],
    },
    "the-olive-linen": {
      name: "O Linho Verde-Azeitona",
      description:
        "Linho verde-azeitona desbotado pelo sol com cintura reunida relaxada. Para longos almoços no Algarve e caminhadas lentas para casa.",
      details: ["Linho europeu", "Alças finas ajustáveis", "Bolsos de patch", "Comprimento no tornozelo"],
    },
    "the-tuxedo-mini": {
      name: "O Mini Smoking",
      description:
        "Um blazer de um botão reimaginado como mini afiado. Confiante, moderno, inegavelmente elegante.",
      details: ["Mistura de lã italiana", "Fecho de um botão", "Lapelas pressionadas", "Forro completo"],
    },
    "the-tiered-sun-dress": {
      name: "O Vestido de Sol em Camadas",
      description:
        "Algodão amanteigado macio com camadas delicadas reunidas. Um vestido que apanha a luz e a brisa em igual medida.",
      details: ["Voile de algodão", "Saia em camadas reunidas", "Faixa para atar", "Comprimento midi"],
    },
    "the-champagne-slip": {
      name: "O Slip Champanhe",
      description:
        "Um slip de lantejoulas champanhe que se move como água. Para o momento em que queres ser vista e olhada ao mesmo tempo.",
      details: ["Lantejoulas aplicadas à mão", "Forro em cetim de seda", "Alças ajustáveis", "Comprimento midi"],
    },
    "the-cacao-wrap": {
      name: "O Wrap Cacau",
      description:
        "Um verdadeiro wrap de seda em cacau profundo — o vestido mais favorecedor alguma vez feito, na cor mais quente da estação.",
      details: ["100% seda", "Fecho wrap para atar", "Mangas compridas", "Comprimento até ao chão"],
    },
  },
  whatsapp: {
    general: "Olá Na Curva, gostaria de saber mais sobre uma reserva.",
    navReserve:
      "Olá!\n\nTenho um evento em breve e estou à procura da peça ideal.\n\nPodem ajudar-me?\n\nObrigada!",
    dress: (name) =>
      `Olá Na Curva, gostaria de reservar "${name}". Podem confirmar a disponibilidade?`,
    dressWithDates: (name, start, end) =>
      `Olá!\n\nGostava de reservar ${name}.\n\nAs datas pretendidas são ${start} – ${end}.\n\nPodem confirmar a disponibilidade?\n\nObrigada!`,
  },
  errors: {
    notFoundTitle: "404",
    notFoundHeading: "Página não encontrada",
    notFoundBody: "A página que procuras não existe ou foi movida.",
    goHome: "Ir para o início",
    errorTitle: "Esta página não carregou",
    errorBody: "Algo correu mal do nosso lado. Podes atualizar ou voltar ao início.",
    tryAgain: "Tentar novamente",
  },
  privacyPolicy: {
    metaTitle: "Política de Privacidade — Na Curva",
    metaDescription:
      "Como a Na Curva recolhe, utiliza e protege os teus dados pessoais.",
    eyebrow: "Legal",
    title1: "política de",
    title2: "privacidade.",
    updated: "Última atualização: junho de 2026",
    sections: [
      {
        title: "Quem somos",
        body: "A Na Curva é uma marca de aluguer de vestidos com sede em Lisboa, Portugal. Para questões relacionadas com privacidade, contacta-nos em hello@nacurva.pt.",
      },
      {
        title: "Dados que recolhemos",
        body: "Quando reservas connosco via WhatsApp ou email, podemos recolher o teu nome, contacto, datas de aluguer, tamanho e detalhes da ocasião. Também recolhemos dados técnicos básicos quando visitas o nosso website, como tipo de browser e páginas visitadas.",
      },
      {
        title: "Como utilizamos os teus dados",
        body: "Utilizamos os teus dados para processar reservas, comunicar contigo sobre o teu aluguer, melhorar o nosso serviço e cumprir obrigações legais. Não vendemos os teus dados a terceiros.",
      },
      {
        title: "Conservação e segurança",
        body: "Conservamos os teus dados apenas pelo tempo necessário para prestar o serviço e cumprir requisitos legais. Aplicamos medidas razoáveis para proteger a informação que nos confias.",
      },
      {
        title: "Os teus direitos",
        body: "Ao abrigo do RGPD, tens direito a aceder, retificar, apagar ou limitar o tratamento dos teus dados, bem como a apresentar reclamação à CNPD. Para exercer estes direitos, envia-nos email para hello@nacurva.pt.",
      },
    ],
  },
  termsAndConditions: {
    metaTitle: "Termos e Condições — Na Curva",
    metaDescription:
      "Termos e condições de aluguer de vestidos com a Na Curva.",
    eyebrow: "Legal",
    title1: "termos e",
    title2: "condições.",
    updated: "Última atualização: junho de 2026",
    sections: [
      {
        title: "Aceitação dos termos",
        body: "Ao reservar um vestido com a Na Curva, aceitas estes termos e condições. Se não concordares, por favor não completes a reserva.",
      },
      {
        title: "Reservas e pagamento",
        body: "Todas as reservas são confirmadas via WhatsApp. Os detalhes de pagamento, depósito e preço final são comunicados no momento da confirmação. Uma reserva só é válida após confirmação escrita da nossa parte.",
      },
      {
        title: "Período de aluguer",
        body: "O aluguer padrão é de quatro dias, salvo acordo diferente. O vestido deve ser devolvido na data acordada, em condições razoáveis de uso normal.",
      },
      {
        title: "Danos e perda",
        body: "O desgaste normal está incluído. Danos significativos, manchas permanentes ou perda do vestido podem implicar custos de reparação ou substituição, acordados caso a caso.",
      },
      {
        title: "Cancelamentos",
        body: "As políticas de cancelamento e reembolso são comunicadas no momento da reserva. Pedimos que nos avises o mais cedo possível se precisares de alterar ou cancelar.",
      },
    ],
  },
};

const en: Translation = {
  meta: {
    siteTitle: "Na Curva — Curated Dress Rental",
    siteDescription:
      "A curated rental wardrobe of exceptional dresses for weddings, celebrations and evenings out. Based in Portugal.",
  },
  nav: {
    browse: "Browse",
    howItWorks: "How It Works",
    about: "About",
    faq: "FAQ",
    reserve: "Reserve",
    reserveWhatsApp: "Reserve via WhatsApp →",
    menu: "Menu",
    closeMenu: "Close menu",
    mobileNavLabel: "Main navigation",
    homeAria: "Na Curva — home",
  },
  ticker: ["Weddings", "Company Events", "Parties", "Celebrations"],
  footer: {
    tagline1: "Wear the dress.",
    tagline2: "Own the moment.",
    explore: "Explore",
    contact: "Contact",
    legal: "Legal",
    privacyPolicy: "Privacy Policy",
    termsAndConditions: "Terms & Conditions",
    location: "Lisbon · Portugal",
    copyright: "Na Curva — Curated in Portugal",
    moments: "For the moments that matter",
  },
  cta: {
    browseCollection: "Browse the collection",
    browseCollectionArrow: "Browse the collection →",
    viewAll: "View all →",
    viewFullCollection: "View the full collection →",
    readStory: "Read our story →",
    allAnswers: "All answers →",
    seeAllQuestions: "See all questions →",
    reserveWhatsApp: "Reserve via WhatsApp",
    reserveOnWhatsApp: "Reserve on WhatsApp",
    reserveWhatsAppUpper: "RESERVE VIA WHATSAPP →",
    noCheckout: "No checkout. A real person will reply to confirm.",
    backToCollection: "Back to the collection",
  },
  home: {
    metaTitle: "Na Curva — Designer Dress Rental for Every Celebration",
    metaDescription:
      "Designer dresses rented by the night. For summer weddings, birthday dinners, fashion events and the moments you want to remember.",
    heroImageAlt: "Woman in a flowing dress in a sunlit Portuguese villa",
    heroLine1: "wear the",
    heroLine2: "dress.",
    heroLine3: "own the",
    heroLine4: "moment.",
    heroBody:
      "Designer dresses, rented by the night. For the weddings, birthdays, dinners and weekends away that ask for something a little louder than your wardrobe.",
    favouritesEyebrow: "Our Current Favourites",
    favouritesTitle: "Selected pieces.",
    howEyebrow: "How it works",
    howTitle1: "Four steps,",
    howTitle2: "zero friction.",
    steps: [
      { n: "01", title: "Choose", description: "Browse the edit. Save what speaks to you." },
      { n: "02", title: "Reserve", description: "Message us. We confirm in minutes." },
      { n: "03", title: "Wear", description: "It arrives pressed and ready. Yours for four nights." },
      { n: "04", title: "Return", description: "Slip it back in the bag. We do the rest." },
    ],
    whyRentEyebrow: "Why Rent",
    whyRentTitle: "A wardrobe that lives with more than one woman.",
    whyRentItems: [
      "Wear pieces that would otherwise hang unworn in someone's wardrobe.",
      "A small, hand-picked edit — never a marketplace, never a sea.",
      "A more conscious — and a lot more fun — way to dress for the moments that count.",
    ],
    editorialImageAlt: "Woman in flowing dress on a sunlit Portuguese coastal path",
    aboutEyebrow: "About Na Curva",
    aboutTitle1: "Curated in Lisbon.",
    aboutTitle2: "Worn everywhere.",
    aboutBody:
      "Na Curva was born from one idea: exceptional clothes should be lived in, not stored. We pick each dress for its silhouette, its craft and the kind of night it deserves.",
    faqEyebrow: "Questions",
    faqTitle: "Good to know.",
    faqPreview: [
      {
        q: "How long is the rental?",
        a: "Four days, door to door. Longer stays available on request.",
      },
      {
        q: "What if the dress is damaged?",
        a: "Minor wear is on us. Anything beyond that we discuss case by case — no panic.",
      },
      {
        q: "How do reservations work?",
        a: "All via WhatsApp. We reply personally — usually within the hour.",
      },
    ],
    finalTitle1: "the dress is ready",
    finalTitle2: "when you are.",
    finalBody:
      "Tell us the occasion — wedding, birthday, gallery opening, weekend in Comporta. We'll help you find the dress.",
    aboutTeaserImageAlt: "Folded silk dress on linen with dried wildflowers",
  },
  collection: {
    metaTitle: "Collection — Na Curva",
    metaDescription:
      "A curated edit of designer dresses available for rental in Portugal.",
    eyebrow: "The Collection",
    title1: "dresses,",
    title2: "by the night.",
    intro:
      "A small, hand-picked edit for the celebrations that ask for something a little louder — weddings, dinners, gallery openings, weekends with the right people.",
    curatedCollection: "Curated Collection",
    size: "Size",
    all: "All",
    emptyTitle: "Nothing matches yet.",
    emptyBody: "Try a different size.",
    reserved: "Reserved",
  },
  dress: {
    perRental: "per rental",
    retail: "retail",
    sizes: "Sizes",
    occasions: "Occasions",
    availability: "Rental dates",
    availabilityHelper: "Check unavailable dates before requesting a visit.",
    availabilityChangeHelper: "Check unavailable dates before requesting a visit.",
    rentalSummaryLabel: "Selected dates",
    legendAvailable: "Available",
    legendReserved: "Reserved",
    legendSelected: "Selected period",
    calendarPreviousMonth: "Previous month",
    calendarNextMonth: "Next month",
    calendarPast: "past date",
    calendarSelectDay: "Select as rental start date",
    rentalDateRange: (start, end) => `${start} → ${end}`,
    rentalPeriodError:
      "This rental period isn't available. Please choose another start date.",
    viewReservedDates: "View unavailable dates",
    changeDates: "Change dates",
    useTheseDates: "Use these dates",
    closeModal: "Close",
    requestShowroomVisit: "Request showroom visit",
    showroomVisitTitle: "Showroom visit",
    showroomVisitDescription:
      "Book a fitting at our Lisbon showroom. You can try several pieces from the collection in one visit.",
    showroomVisitNote: "We'll confirm your visit with you personally.",
    details: "Details",
    relatedTitle: "Also in the edit",
    notFoundEyebrow: "Not found",
    notFoundTitle: "This dress is no longer here.",
    errorTitle: "Something went wrong.",
  },
  about: {
    metaTitle: "About — Na Curva",
    metaDescription:
      "Na Curva is a curated dress rental brand based in Portugal — built on style, craft and a more conscious way of dressing.",
    eyebrow: "Our story",
    title1: "a wardrobe of",
    title2: "borrowed beauty.",
    imageAlt: "Founder in a Lisbon apartment",
    lead:
      "Na Curva began with a closet full of dresses worn once, and the quiet realisation that beauty is meant to be lived in.",
    body1:
      "We started Na Curva in Lisbon to make exceptional dresses accessible — without the weight of ownership. Every piece is selected by hand for its silhouette, its craft, and the kind of evening it deserves.",
    body2:
      "We believe in fewer, better things. In dressing for the moment instead of the wardrobe. In a more honest relationship with fashion — one where a single dress can carry many stories.",
    values: [
      {
        title: "Curation",
        description: "A small, intentional edit. We say no to far more than we say yes to.",
      },
      {
        title: "Access",
        description: "Designer dresses, by the night. The way exceptional clothes should feel.",
      },
      {
        title: "Consciousness",
        description: "A more thoughtful way to dress — one dress, many women, many stories.",
      },
    ],
    ctaEyebrow: "Begin",
    ctaTitle1: "tell us about",
    ctaTitle2: "the occasion.",
  },
  howItWorks: {
    metaTitle: "How It Works — Na Curva",
    metaDescription:
      "Choose, reserve, wear, return. Renting a dress with Na Curva is simple and personal.",
    eyebrow: "How it works",
    title1: "four steps,",
    title2: "no friction.",
    steps: [
      {
        n: "01",
        title: "Choose your dress",
        description:
          "Browse our edit and save the pieces that speak to you. Each dress is hand-selected — there are no thousands of options here, only the ones we love.",
      },
      {
        n: "02",
        title: "Reserve via WhatsApp",
        description:
          "Send us a message with the dress and the date. We respond personally — usually within the hour — to confirm availability and size.",
      },
      {
        n: "03",
        title: "Wear it",
        description:
          "Your dress arrives the day before your event, pressed and ready in a reusable garment bag. Wear it. Be in it. Take photos worth keeping.",
      },
      {
        n: "04",
        title: "Return it",
        description:
          "Slip the dress back into its bag and drop it off the day after your event. We take care of cleaning. You take care of the memory.",
      },
    ],
    ctaTitle1: "ready to find",
    ctaTitle2: "your dress?",
  },
  faq: {
    metaTitle: "FAQ — Na Curva",
    metaDescription:
      "Answers to common questions about renting a dress with Na Curva — rentals, returns, sizing, damages and care.",
    eyebrow: "Questions",
    title1: "good to ",
    title2: "know.",
    ctaEyebrow: "Still wondering?",
    ctaTitle: "send us a message.",
    items: [
      {
        q: "How does the rental work?",
        a: "You choose a dress from our edit and reserve it via WhatsApp. We confirm availability, arrange delivery and pick-up around your event, and take care of cleaning when the dress returns.",
      },
      {
        q: "How long is the rental?",
        a: "Standard rentals are four days, door to door — typically the day before, the day of, and two days after your event. Longer rentals are available on request.",
      },
      {
        q: "What happens if the dress is damaged?",
        a: "Minor wear is expected and fully included — a spilled glass of wine, a loose hem. For anything more significant, we discuss case by case and only charge if a repair is needed.",
      },
      {
        q: "How do reservations work?",
        a: "All reservations are made via WhatsApp. We respond personally — usually within the hour — to confirm the dress, the size and the dates. There is no checkout, no shopping cart.",
      },
      {
        q: "How do returns work?",
        a: "We include a pre-paid return label and a reusable garment bag. Drop the dress at the nearest collection point the day after your event. That's it.",
      },
      {
        q: "What sizes do you carry?",
        a: "Our current edit runs from XS to L. We're growing the size range with every season — if you don't see your size, message us and we'll help.",
      },
      {
        q: "Where do you deliver?",
        a: "Anywhere in mainland Portugal. We're working on expanding to the islands and the rest of Europe soon.",
      },
      {
        q: "Can I try the dress before my event?",
        a: "Yes — the dress arrives the day before your event so you have time to try it. If something is wrong, we'll do everything we can to swap it.",
      },
    ],
  },
  occasions: {
    weddingGuest: "Wedding Guest",
    blackTie: "Black Tie",
    summerEvent: "Summer Event",
    party: "Party",
    dinner: "Dinner",
    holiday: "Holiday",
  },
  dresses: {
    "the-bias-slip": {
      name: "The Bias Slip",
      description:
        "A column of liquid black silk cut on the true bias. The kind of dress that asks nothing of you and gives everything back.",
      details: ["100% silk crêpe", "Bias-cut floor length", "Adjustable straps", "Dry clean only — included"],
    },
    "the-poplin-shirt-dress": {
      name: "The Poplin Shirt Dress",
      description:
        "An oversized ivory poplin in the spirit of effortless sophistication. Pair it with leather sandals or never take it off.",
      details: ["Organic cotton poplin", "Relaxed oversized fit", "Mother-of-pearl buttons", "Mid-calf length"],
    },
    "the-burgundy-gown": {
      name: "The Burgundy Gown",
      description:
        "Deep burgundy satin shaped into a one-shoulder gown with a fluid mermaid sweep. Made for evenings that matter.",
      details: ["Duchess satin", "One-shoulder neckline", "Sweeping train", "Hidden back zip"],
    },
    "the-olive-linen": {
      name: "The Olive Linen",
      description:
        "Sun-faded olive linen with a relaxed gathered waist. For long lunches in the Algarve and slow walks home.",
      details: ["European linen", "Adjustable spaghetti straps", "Patch pockets", "Ankle length"],
    },
    "the-tuxedo-mini": {
      name: "The Tuxedo Mini",
      description:
        "A single-breasted blazer reimagined as a sharply tailored mini. Confident, modern, undeniably elegant.",
      details: ["Italian wool blend", "Single-button closure", "Pressed lapels", "Fully lined"],
    },
    "the-tiered-sun-dress": {
      name: "The Tiered Sun Dress",
      description:
        "Soft butter cotton with delicate gathered tiers. A dress that catches the light and the breeze in equal measure.",
      details: ["Cotton voile", "Tiered gathered skirt", "Self-tie sash", "Midi length"],
    },
    "the-champagne-slip": {
      name: "The Champagne Slip",
      description:
        "A champagne sequin slip that moves like water. For the moment you want to be looked at and seen at the same time.",
      details: ["Hand-applied sequins", "Silk satin lining", "Adjustable straps", "Midi length"],
    },
    "the-cacao-wrap": {
      name: "The Cacao Wrap",
      description:
        "A true silk wrap in deep cacao — the most flattering dress ever made, in the warmest colour of the season.",
      details: ["100% silk", "Self-tie wrap closure", "Long sleeves", "Floor length"],
    },
  },
  whatsapp: {
    general: "Hi Na Curva, I'd like to know more about making a reservation.",
    navReserve:
      "Hi!\n\nI'm looking for something to wear for an upcoming event.\n\nCould you help me find the right piece?\n\nThank you!",
    dress: (name) =>
      `Hi Na Curva, I'd like to reserve "${name}". Could you confirm availability?`,
    dressWithDates: (name, start, end) =>
      `Hi!\n\nI'd love to reserve the ${name}.\n\nMy preferred rental dates are:\n\n${start} – ${end}\n\nCould you let me know if it's available?\n\nThank you!`,
  },
  errors: {
    notFoundTitle: "404",
    notFoundHeading: "Page not found",
    notFoundBody: "The page you're looking for doesn't exist or has been moved.",
    goHome: "Go home",
    errorTitle: "This page didn't load",
    errorBody: "Something went wrong on our end. You can try refreshing or head back home.",
    tryAgain: "Try again",
  },
  privacyPolicy: {
    metaTitle: "Privacy Policy — Na Curva",
    metaDescription: "How Na Curva collects, uses and protects your personal data.",
    eyebrow: "Legal",
    title1: "privacy",
    title2: "policy.",
    updated: "Last updated: June 2026",
    sections: [
      {
        title: "Who we are",
        body: "Na Curva is a dress rental brand based in Lisbon, Portugal. For privacy-related questions, contact us at hello@nacurva.pt.",
      },
      {
        title: "Data we collect",
        body: "When you book with us via WhatsApp or email, we may collect your name, contact details, rental dates, size and occasion details. We also collect basic technical data when you visit our website, such as browser type and pages viewed.",
      },
      {
        title: "How we use your data",
        body: "We use your data to process bookings, communicate with you about your rental, improve our service and meet legal obligations. We do not sell your data to third parties.",
      },
      {
        title: "Retention and security",
        body: "We keep your data only for as long as needed to provide the service and meet legal requirements. We apply reasonable measures to protect the information you share with us.",
      },
      {
        title: "Your rights",
        body: "Under the GDPR, you have the right to access, rectify, erase or restrict processing of your data, and to lodge a complaint with the CNPD. To exercise these rights, email us at hello@nacurva.pt.",
      },
    ],
  },
  termsAndConditions: {
    metaTitle: "Terms & Conditions — Na Curva",
    metaDescription: "Terms and conditions for renting a dress with Na Curva.",
    eyebrow: "Legal",
    title1: "terms &",
    title2: "conditions.",
    updated: "Last updated: June 2026",
    sections: [
      {
        title: "Acceptance of terms",
        body: "By booking a dress with Na Curva, you accept these terms and conditions. If you do not agree, please do not complete a booking.",
      },
      {
        title: "Bookings and payment",
        body: "All bookings are confirmed via WhatsApp. Payment details, deposit and final price are communicated at the time of confirmation. A booking is only valid once confirmed in writing by us.",
      },
      {
        title: "Rental period",
        body: "The standard rental is four days unless otherwise agreed. The dress must be returned on the agreed date in reasonable condition for normal wear.",
      },
      {
        title: "Damage and loss",
        body: "Normal wear is included. Significant damage, permanent stains or loss of the dress may incur repair or replacement costs, agreed on a case-by-case basis.",
      },
      {
        title: "Cancellations",
        body: "Cancellation and refund policies are communicated at the time of booking. Please let us know as early as possible if you need to change or cancel.",
      },
    ],
  },
};

export const translations: Record<Locale, Translation> = { pt, en };

export const DEFAULT_LOCALE: Locale = "pt";

export const OCCASION_KEYS: OccasionKey[] = [
  "weddingGuest",
  "blackTie",
  "summerEvent",
  "party",
  "dinner",
  "holiday",
];
