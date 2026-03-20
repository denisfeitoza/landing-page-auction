import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'pt-BR' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  'pt-BR': {
    // Navbar
    'nav.home': 'Início',
    'nav.about': 'Sobre Nós',
    'nav.about.who': 'Quem Somos',
    'nav.about.vision': 'Nossa Visão',
    'nav.about.mission': 'Nossa Missão',
    'nav.about.team': 'Nossa Equipe',
    'nav.services': 'Serviços',
    'nav.services.trading': 'Trading de iPhones',
    'nav.services.center': 'Centro de Serviços',
    'nav.services.certification': 'Certificação GoldPrime',
    'nav.services.repairs': 'Reparos Originais',
    'nav.global': 'Presença Global',
    'nav.global.dubai': 'Dubai (Sede)',
    'nav.global.usa': 'EUA & Europa',
    'nav.global.brazil': 'Brasil & Paraguai',
    'nav.global.lebanon': 'Líbano',
    'nav.partners': 'Parceiros',
    'nav.contact': 'Contato',
    'nav.auction': 'Leilão',
    'nav.faq': 'FAQ',
    'nav.auction.platform': 'Plataforma de Leilão',

    // Hero
    'hero.title': 'Hub Premier de Trading de iPhones Premium',
    'hero.subtitle': 'Líder global em trading de iPhones com certificação de qualidade industrial e presença em 6 países',
    'hero.cta.primary': 'Seja Nosso Parceiro',
    'hero.cta.secondary': 'Conheça Nossos Serviços',

    // Stats
    'stats.years': 'Anos de Experiência',
    'stats.technicians': 'Técnicos Especializados',
    'stats.devices': 'Dispositivos/Mês',
    'stats.countries': 'Países',

    // About
    'about.title': 'Sobre a GoldPrime',
    'about.description': 'GoldPrime FZCO é o principal hub de trading de iPhones premium em Dubai, oferecendo soluções abrangentes para parceiros B2B globais. Com mais de 10 anos de experiência, nos tornamos a ponte entre qualidade premium e presença no mercado internacional.',
    'about.vision.title': 'Nossa Visão',
    'about.vision.text': 'Tornar-se o destino de trading de iPhones premium mais confiável e inovador globalmente, estabelecendo novos padrões na indústria de dispositivos móveis.',
    'about.mission.title': 'Nossa Missão',
    'about.mission.text': 'Entregar excelência em qualidade, satisfação do cliente e parcerias globais através de nossos 40+ testes rigorosos e certificação GoldPrime.',
    'about.image.technicians': '100+ Técnicos',
    'about.image.location': 'Centro de Serviços Dubai',
    'about.image.alt': 'Equipe GoldPrime - 100+ técnicos',

    // Process
    'process.title': 'Nosso Processo',
    'process.step1.title': 'Receber e Catalogar',
    'process.step1.desc': 'Recebemos e catalogamos cada iPhone com precisão.',
    'process.step2.title': 'Testar e Reparar',
    'process.step2.desc': 'Realizamos testes em todos os dispositivos e mantemos apenas os que realmente precisam.',
    'process.step3.title': 'Certificar e Enviar',
    'process.step3.desc': 'Seu dispositivo é enviado com certificado oficial GoldPrime e selo de autenticidade garantido.',

    // Service Center
    'service.title': 'Conheça o Nosso Centro de Serviços',
    'service.description': 'Transforme seus lotes de iPhones em lucro garantido. Nosso Centro de Serviços aplica padrões industriais de qualidade a cada dispositivo. Diagnosticamos, reparamos e certificamos seu inventário com o selo GoldPrime, eliminando devoluções e maximizando suas margens.',
    'service.tests': '40+ testes',
    'service.tests.subtitle': 'Diagnóstico Completo',
    'service.repairs': 'Reparos de Precisão',
    'service.repairs.subtitle': 'Peças Originais',
    'service.ready': 'Pronto para Venda',
    'service.ready.subtitle': 'Certificação GoldPrime',
    'service.branding.title': 'Sua Marca, Nossa Qualidade',
    'service.branding.desc': 'Podemos criar etiquetas personalizadas com a sua marca. Recebemos o seu lote de dispositivos, processamos com o padrão GoldPrime e os devolvemos com sua identidade visual e garantia de qualidade.',
    'service.certified.badge': 'Qualidade Certificada',
    'service.premium.title': 'Certificação Premium',
    'service.premium.desc': 'Fortaleça sua marca com nossa qualidade industrial e a confiança do selo GoldPrime. Peças 100% originais.',
    'service.tech.title': 'Tecnologia Avançada',
    'service.tech.desc': 'Equipamentos de teste de última geração.',
    'service.list.title': 'Nossos Serviços',
    'service.list.item1': 'Teste e classificação completa de dispositivos',
    'service.list.item2': 'Verificação de saúde da bateria',
    'service.list.item3': 'Avaliação cosmética completa',
    'service.list.item4': 'Diagnóstico de software e atualizações',
    'service.list.item5': 'Verificação de peças originais',
    'service.list.item6': 'Certificação de qualidade e etiquetagem',

    // Global
    'global.title': 'Presença Global',
    'global.description': 'Conectando parceiros em 3 continentes com presença estratégica em mercados-chave.',
    'global.dubai': 'Dubai, UAE',
    'global.dubai.desc': 'Sede Global & Centro de Serviços',
    'global.usa': 'Estados Unidos',
    'global.usa.desc': 'Hub de Trading Norte-Americano',
    'global.europe': 'Europa',
    'global.europe.desc': 'Rede de Distribuição Europeia',
    'global.brazil': 'Brasil',
    'global.brazil.desc': 'Operações América do Sul',
    'global.paraguay': 'Paraguai',
    'global.paraguay.desc': 'Centro Logístico Regional',
    'global.lebanon': 'Líbano',
    'global.lebanon.desc': 'Expansão Oriente Médio',

    // Journey
    'journey.title': 'Nossa Jornada',
    'journey.description': '2017: GoldPrime é lançada com uma visão para o comércio global de iPhones premium. 2021: O laboratório de Dubai é inaugurado, estabelecendo padrões de qualidade líderes na indústria. Agora: Presente no GITEX e nos principais eventos mundiais, incluindo Dubai, Barcelona, Brasil, Espanha, Malta, Paraguai e Líbano — conectando parceiros em 3 continentes e liderando a inovação em tecnologia móvel.',

    // Timeline
    'journey.2017.title': 'Fundação',
    'journey.2017.desc': 'GoldPrime é lançada com uma visão para o comércio global de iPhones premium',
    'journey.2019.title': 'Expansão',
    'journey.2019.desc': 'Operações se expandem para os mercados dos EUA e Europa',
    'journey.2021.title': 'Centro de Serviços',
    'journey.2021.desc': 'Laboratório de Dubai abre com padrões líderes da indústria',
    'journey.2023.title': 'Reconhecimento',
    'journey.2023.desc': 'Presente nos maiores eventos de tecnologia ao redor do mundo',
    'journey.2025.title': 'Alcance Global',
    'journey.2025.desc': 'Operando em 6 países em 3 continentes',
    'journey.2026.title': 'Modelo de Leilão',
    'journey.2026.desc': 'Leilões de iPhones certificados',
    'journey.2026.cta': 'Conhecer agora!',

    // Auction
    'auction.title': 'Plataforma de Leilão GoldPrime',
    'auction.subtitle': 'Acesso exclusivo a lotes de iPhones certificados',
    'auction.description': 'Participe de leilões ao vivo e adquira lotes de dispositivos que passaram pelo nosso rigoroso processo de certificação industrial. Qualidade garantida, transparência total e as melhores oportunidades do mercado B2B.',
    'auction.offices': 'Nossos centros de atendimento estão em São Paulo, Brasil; Ciudad del Este, Paraguai; e Dubai, Emirados Árabes Unidos.',
    'auction.feature1': 'Lances em Tempo Real',
    'auction.feature2': 'Lotes Certificados',
    'auction.feature3': 'Relatórios Detalhados',
    'auction.feature4': 'Tag personalizada',
    'auction.cta': 'Acessar Leilões',
    'auction.liveHeader': 'Leilão Ao Vivo',
    'auction.live': 'AO VIVO',
    'auction.lot': 'Lote',
    'auction.certified': 'Certificação GoldPrime',
    'auction.currentBid': 'Lance Atual',
    'auction.placeBid': 'Dar Lance',
    'auction.watching': 'assistindo',
    'auction.winner': 'Vencedor',

    // Countries
    'countries.title': 'O serviço está disponível em vários países e continentes',

    // FAQ
    'faq.title': 'FAQ',
    'faq.subtitle': 'Respostas claras para suas dúvidas sobre nossos serviços',
    'faq.q1': 'O que é a Certificação GoldPrime?',
    'faq.a1': 'A Certificação GoldPrime é nosso selo de qualidade que garante que cada iPhone passou por 40+ testes rigorosos, incluindo verificação de hardware, software, bateria e funcionalidades. Dispositivos certificados têm garantia de qualidade premium.',
    'faq.q2': 'Quais são os requisitos para se tornar parceiro?',
    'faq.a2': 'Trabalhamos com empresas B2B que operam no mercado de dispositivos móveis. Entre em contato conosco para discutir volume mínimo, termos de pagamento e logística para sua região.',
    'faq.q3': 'Quanto tempo leva o processo de certificação?',
    'faq.a3': 'O tempo varia de acordo com o volume, mas geralmente processamos lotes em 3-5 dias úteis. Nossa equipe de 100+ técnicos permite alto throughput mantendo padrões rigorosos.',
    'faq.q4': 'Vocês oferecem garantia nos dispositivos?',
    'faq.a4': 'Sim, todos os dispositivos com Certificação GoldPrime incluem 3 meses de garantia.',
    'faq.q5': 'Como funciona a logística internacional?',
    'faq.a5': 'Temos operações em 6 países e parcerias logísticas estabelecidas. Podemos enviar para praticamente qualquer lugar do mundo com rastreamento completo e seguro.',
    'faq.q6': 'Quais modelos de iPhone vocês trabalham?',
    'faq.a6': 'Trabalhamos com toda a linha de iPhones, desde modelos mais antigos até os lançamentos mais recentes. Nossa especialidade é garantir qualidade premium independente do modelo.',

    // Badges
    'badges.qualityTested': '100% Testado',
    'badges.certified': 'Certificação GoldPrime',
    'badges.devices': '20.000+ Dispositivos/Mês',
    'badges.global': 'Operações Globais',
    'badges.technicians': '100+ Técnicos',
    'badges.warranty': 'Garantia Abrangente',
    'badges.experience': '10+ Anos de Excelência',
    'badges.trusted': 'Parceiro B2B Confiável',

    // Contact
    'contact.title': 'Transforme Suas Ideias em Parceria',
    'contact.cta': 'Colabore Conosco',
    'contact.form.title': 'Vamos Trabalhar Juntos!',
    'contact.form.name': 'Seu Nome',
    'contact.form.email': 'Seu Email',
    'contact.form.message': 'Descreva Seu Caso',
    'contact.form.submit': 'Enviar Mensagem',
    'contact.form.sending': 'Enviando...',

    // Footer
    'footer.address': 'Endereço',
    'footer.phone': 'Telefones',
    'footer.email': 'Email',
    'footer.rights': 'Todos os direitos reservados.',
    'footer.social': 'Redes Sociais',
    'footer.website': 'Website',
    'chat.bubble': 'Fale com a nossa AI',
    'loading.experience': 'Carregando sua experiência GoldPrime...',

    // Auction LP - Navbar
    'auctionLP.nav.advantages': 'Vantagens',
    'auctionLP.nav.howItWorks': 'Como Funciona',
    'auctionLP.nav.grades': 'Grades',
    'auctionLP.nav.models': 'Modelos',
    'auctionLP.nav.faq': 'FAQ',
    'auctionLP.nav.accessPlatform': 'Acessar Leilões',

    // Auction LP - Hero
    'auctionLP.hero.badge': 'Leilões ao Vivo — Exclusivo B2B',
    'auctionLP.hero.title1': 'Leilões Exclusivos de',
    'auctionLP.hero.title2': 'iPhones Certificados',
    'auctionLP.hero.subtitle': 'Adquira lotes de iPhones com certificação industrial em leilões ao vivo. Pague apenas 20% no arremate e o restante na retirada.',
    'auctionLP.hero.cta1': 'Solicitar Acesso',
    'auctionLP.hero.cta2': 'Ver Leilão ao Vivo',
    'auctionLP.hero.stat.locations': 'Centros de Atendimento',
    'auctionLP.hero.stat.lotUnits': 'Unidades por Lote',
    'auctionLP.hero.stat.grades': 'Grades Disponíveis',
    'auctionLP.hero.stat.express': 'Envio Express',

    // Auction LP - Advantages
    'auctionLP.adv.label': 'Por Que Escolher',
    'auctionLP.adv.title': 'Vantagens Exclusivas',
    'auctionLP.adv.subtitle': 'Uma plataforma projetada para maximizar suas margens e simplificar suas operações.',
    'auctionLP.adv.popular': 'Popular',
    'auctionLP.adv.1.title': 'Pague 20% no Arremate',
    'auctionLP.adv.1.desc': 'Você paga apenas 20% no momento do arremate e os outros 80% somente na retirada do lote. Máximo de flexibilidade financeira.',
    'auctionLP.adv.2.title': 'Leilões Semanais',
    'auctionLP.adv.2.desc': 'Novos leilões toda semana, criando um fluxo constante de oportunidades para abastecer seu estoque.',
    'auctionLP.adv.3.title': 'Envio Express',
    'auctionLP.adv.3.desc': 'Comprou na terça → sai na quinta. Comprou na quinta → sai na terça. Ou retire em Paraguai, Dubai ou Miami. Frete só na retirada.',
    'auctionLP.adv.4.title': 'Compre em Lotes',
    'auctionLP.adv.4.desc': 'Adquira em volume com lotes de 100+ unidades. Escala garantida e margens otimizadas para seu negócio.',
    'auctionLP.adv.5.title': 'Fotos Reais',
    'auctionLP.adv.5.desc': 'Acesso a fotos reais dos produtos antes de comprar. Transparência total em cada lote disponível.',
    'auctionLP.adv.6.title': 'Acesso Antecipado',
    'auctionLP.adv.6.desc': 'Tenha acesso a produtos antes deles chegarem ao mercado comum. Vantagem competitiva exclusiva.',

    // Auction LP - How It Works
    'auctionLP.how.label': 'Como Funciona',
    'auctionLP.how.title': 'Simples e Direto',
    'auctionLP.how.subtitle': 'Em 3 passos você já está participando dos leilões e garantindo seus lotes.',
    'auctionLP.how.step1.title': 'Solicite Acesso',
    'auctionLP.how.step1.desc': 'Plataforma exclusiva com aprovação. Evitamos concorrência desqualificada e garantimos seriedade em cada leilão.',
    'auctionLP.how.step2.title': 'Participe dos Leilões',
    'auctionLP.how.step2.desc': 'Leilões ao vivo com lances em tempo real, cronômetro regressivo e competição justa e aberta para todos.',
    'auctionLP.how.step3.title': 'Ganhe e Retire',
    'auctionLP.how.step3.desc': 'Pague 20% no arremate, 80% na retirada. Retire em Paraguai, Dubai ou Miami. Acompanhe tudo pelo sistema.',

    // Auction LP - Grades
    'auctionLP.grades.label': 'Classificação',
    'auctionLP.grades.title': 'Grades de Qualidade',
    'auctionLP.grades.subtitle': 'Todos os lotes possuem certificação e padrão de qualidade rigoroso.',
    'auctionLP.grades.aplus.title': 'Excelente',
    'auctionLP.grades.aplus.desc': 'Condição próxima ao novo, sem marcas visíveis.',
    'auctionLP.grades.llplus.title': 'Premium',
    'auctionLP.grades.llplus.desc': 'Certificação premium GoldPrime, qualidade superior.',
    'auctionLP.grades.bplus.title': 'Ótimo',
    'auctionLP.grades.bplus.desc': 'Ótima condição geral, mínimas marcas de uso.',
    'auctionLP.grades.bcplus.title': 'Bom',
    'auctionLP.grades.bcplus.desc': 'Boa condição com marcas leves de uso normal.',
    'auctionLP.grades.cplus.title': 'Padrão',
    'auctionLP.grades.cplus.desc': 'Condição padrão, funcional e confiável.',
    'auctionLP.grades.mix.title': 'Misto',
    'auctionLP.grades.mix.desc': 'Lotes variados com grades mistas. Melhor custo-benefício.',

    // Auction LP - Models
    'auctionLP.models.label': 'Lotes Disponíveis',
    'auctionLP.models.title': 'Modelos em Leilão',
    'auctionLP.models.subtitle': 'Acesse lotes de 100 unidades dos principais modelos de iPhone, com preços competitivos.',
    'auctionLP.models.lotSize': 'Lote',
    'auctionLP.models.priceRange': 'Faixa de Preço',
    'auctionLP.models.viewAuctions': 'Ver Leilões',

    // Auction LP - Live Demo
    'auctionLP.liveDemo.badge': 'Demonstração ao Vivo',
    'auctionLP.liveDemo.title': 'Veja o Leilão em Ação',
    'auctionLP.liveDemo.subtitle': 'Lances em tempo real com transparência total',
    'auctionLP.liveDemo.description': 'Todos os lances são visíveis e registrados, garantindo um processo justo e transparente. Participe da competição e garanta os melhores lotes.',
    'auctionLP.liveDemo.feat1': 'Lances em Tempo Real',
    'auctionLP.liveDemo.feat2': 'Lotes Certificados',
    'auctionLP.liveDemo.feat3': 'Transparência Total',
    'auctionLP.liveDemo.feat4': 'Acesso Exclusivo',
    'auctionLP.liveDemo.cta': 'Acessar Leilões',

    // Auction LP - Trust
    'auctionLP.trust.label': 'Confiança',
    'auctionLP.trust.title': 'Transparência e Segurança',
    'auctionLP.trust.item1.title': 'Plataforma Fechada',
    'auctionLP.trust.item1.desc': 'Acesso apenas por aprovação, evitando concorrência desqualificada.',
    'auctionLP.trust.item2.title': 'Lances Visíveis',
    'auctionLP.trust.item2.desc': 'Todos os lances são registrados e visíveis, garantindo transparência.',
    'auctionLP.trust.item3.title': 'Qualidade Certificada',
    'auctionLP.trust.item3.desc': 'Cada lote possui certificação e padrão de qualidade GoldPrime.',
    'auctionLP.trust.item4.title': 'Competição Justa',
    'auctionLP.trust.item4.desc': 'Leilões em tempo real com regras claras e competição aberta.',

    // Auction LP - FAQ
    'auctionLP.faq.title': 'Perguntas Frequentes',
    'auctionLP.faq.subtitle': 'Tudo que você precisa saber sobre nossos leilões.',
    'auctionLP.faq.q1': 'Como consigo acesso à plataforma?',
    'auctionLP.faq.a1': 'A plataforma é por convite ou aprovação. Solicite acesso pelo site e nossa equipe irá analisar seu perfil para garantir a qualidade dos participantes.',
    'auctionLP.faq.q2': 'Quais grades estão disponíveis?',
    'auctionLP.faq.a2': 'Trabalhamos com 6 grades: A+ (excelente), LL+ (premium), B+ (ótimo), BC+ (bom), C+ (padrão) e MIX (lotes mistos). Cada grade tem padrões rigorosos de qualidade.',
    'auctionLP.faq.q3': 'Como funciona o pagamento?',
    'auctionLP.faq.a3': 'Você paga apenas 20% no momento do arremate. Os outros 80% são pagos somente na retirada do lote, seja em Paraguai, Dubai ou Miami.',
    'auctionLP.faq.q4': 'Como funciona o envio?',
    'auctionLP.faq.a4': 'Oferecemos envio express: comprou na terça, sai na quinta; comprou na quinta, sai na terça. Você também pode retirar o lote em Paraguai, Dubai ou Miami. O frete só é pago na retirada.',
    'auctionLP.faq.q5': 'Qual é o tamanho dos lotes?',
    'auctionLP.faq.a5': 'Os lotes padrão são de 100 unidades por leilão, com faixa de preço entre USD 22.000 e USD 50.000 dependendo do modelo e grade.',
    'auctionLP.faq.q6': 'As condições são por tempo limitado?',
    'auctionLP.faq.a6': 'Sim, as condições atuais são promocionais e por tempo limitado. O sistema é gratuito para os primeiros usuários. Solicite acesso agora para garantir as melhores condições.',

    // Auction LP - CTA
    'auctionLP.cta.urgencyBadge': 'Condições por Tempo Limitado',
    'auctionLP.cta.title': 'Comece a Participar Agora',
    'auctionLP.cta.description': 'Solicite acesso à plataforma e comece a adquirir lotes de iPhones certificados com as melhores condições do mercado B2B.',
    'auctionLP.cta.freeBadge': 'Sistema Grátis para os Primeiros Usuários',
    'auctionLP.cta.button': 'Solicitar Acesso',

    // Auction LP - Footer
    'auctionLP.footer.description': 'Plataforma B2B de leilões ao vivo de lotes de iPhones certificados industrialmente.',
    'auctionLP.footer.locations': 'Nossos Centros',
    'auctionLP.footer.contact': 'Contato',
    'auctionLP.footer.privacy': 'Privacidade',
    'auctionLP.footer.terms': 'Termos',

    // Auction LP - Video
    'auctionLP.video.label': 'Tutorial',
    'auctionLP.video.title': 'Veja Como Funciona',
    'auctionLP.video.subtitle': 'Assista a uma demonstração completa de como participar dos leilões e garantir seus lotes.',
    'auctionLP.video.placeholder': 'Vídeo em breve',
    'auctionLP.video.duration': '~3 minutos',
    'auctionLP.video.caption': 'Tutorial completo de como usar a plataforma de leilões GoldPrime',
  },
  'en': {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.about.who': 'Who We Are',
    'nav.about.vision': 'Our Vision',
    'nav.about.mission': 'Our Mission',
    'nav.about.team': 'Our Team',
    'nav.services': 'Services',
    'nav.services.trading': 'iPhone Trading',
    'nav.services.center': 'Service Center',
    'nav.services.certification': 'GoldPrime Certification',
    'nav.services.repairs': 'Original Repairs',
    'nav.global': 'Global Presence',
    'nav.global.dubai': 'Dubai (HQ)',
    'nav.global.usa': 'USA & Europe',
    'nav.global.brazil': 'Brazil & Paraguay',
    'nav.global.lebanon': 'Lebanon',
    'nav.partners': 'Partners',
    'nav.contact': 'Contact',
    'nav.auction': 'Auction',
    'nav.faq': 'FAQ',
    'nav.auction.platform': 'Auction Platform',

    // Hero
    'hero.title': 'Premier Premium iPhone Trading Hub',
    'hero.subtitle': 'Global leader in iPhone trading with industrial quality certification and presence in 6 countries',
    'hero.cta.primary': 'Become Our Partner',
    'hero.cta.secondary': 'Explore Our Services',

    // Stats
    'stats.years': 'Years of Experience',
    'stats.technicians': 'Specialized Technicians',
    'stats.devices': 'Devices/Month',
    'stats.countries': 'Countries',

    // About
    'about.title': 'About GoldPrime',
    'about.description': 'GoldPrime FZCO is the leading premium iPhone trading hub in Dubai, offering comprehensive solutions for global B2B partners. With over 10 years of experience, we have become the bridge between premium quality and international market presence.',
    'about.vision.title': 'Our Vision',
    'about.vision.text': 'To become the most trusted and innovative premium iPhone trading destination globally, setting new standards in the mobile device industry.',
    'about.mission.title': 'Our Mission',
    'about.mission.text': 'To deliver excellence in quality, customer satisfaction, and global partnerships through our 40+ rigorous tests and GoldPrime certification.',
    'about.image.technicians': '100+ Technicians',
    'about.image.location': 'Dubai Service Center',
    'about.image.alt': 'GoldPrime Team - 100+ technicians',

    // Process
    'process.title': 'Our Process',
    'process.step1.title': 'Receive and Catalog',
    'process.step1.desc': 'We receive and catalog every iPhone with precision.',
    'process.step2.title': 'Test and Repair',
    'process.step2.desc': 'We perform tests on all devices and only maintain those that truly need it.',
    'process.step3.title': 'Certify and Ship',
    'process.step3.desc': 'Your device ships with an official GoldPrime certificate and guaranteed authenticity seal.',

    // Service Center
    'service.title': 'Meet Our Service Center',
    'service.description': 'Transform your iPhone batches into guaranteed profit. Our Service Center applies industrial quality standards to every device. We diagnose, repair, and certify your inventory with the GoldPrime seal, eliminating returns and maximizing your margins.',
    'service.tests': '40+ tests',
    'service.tests.subtitle': 'Complete Diagnostics',
    'service.repairs': 'Precision Repairs',
    'service.repairs.subtitle': 'Original Parts',
    'service.ready': 'Ready to Sell',
    'service.ready.subtitle': 'GoldPrime Certification',
    'service.branding.title': 'Your Brand, Our Quality',
    'service.branding.desc': 'We can create custom labels with your brand. We receive your device batches, process them with GoldPrime standards, and return them with your visual identity and quality assurance.',
    'service.certified.badge': 'Certified Quality',
    'service.premium.title': 'Premium Certification',
    'service.premium.desc': 'Empower your brand with our industrial quality and the trust of the GoldPrime seal. 100% original parts',
    'service.tech.title': 'Advanced Technology',
    'service.tech.desc': 'State-of-the-art testing equipment.',
    'service.list.title': 'Our Services',
    'service.list.item1': 'Complete device testing and grading',
    'service.list.item2': 'Battery health verification',
    'service.list.item3': 'Cosmetic assessment complete',
    'service.list.item4': 'Software diagnostics and updates',
    'service.list.item5': 'Original parts verification',
    'service.list.item6': 'Quality certification and labeling',

    // Global
    'global.title': 'Global Presence',
    'global.description': 'Connecting partners across 3 continents with strategic presence in key markets.',
    'global.dubai': 'Dubai, UAE',
    'global.dubai.desc': 'Global HQ & Service Center',
    'global.usa': 'United States',
    'global.usa.desc': 'North American Trading Hub',
    'global.europe': 'Europe',
    'global.europe.desc': 'European Distribution Network',
    'global.brazil': 'Brazil',
    'global.brazil.desc': 'South America Operations',
    'global.paraguay': 'Paraguay',
    'global.paraguay.desc': 'Regional Logistics Center',
    'global.lebanon': 'Lebanon',
    'global.lebanon.desc': 'Middle East Expansion',

    // Journey
    'journey.title': 'Our Journey',
    'journey.description': '2017: GoldPrime launches with a vision for global premium iPhone trading. 2021: Dubai laboratory opens, establishing industry-leading quality standards. Now: Present at GITEX and major events worldwide including Dubai, Barcelona, Brazil, Spain, Malta, Paraguay, and Lebanon—connecting partners across 3 continents and leading mobile technology innovation.',

    // Timeline
    'journey.2017.title': 'Founded',
    'journey.2017.desc': 'GoldPrime launches with a vision for premium iPhone trading',
    'journey.2019.title': 'Expansion',
    'journey.2019.desc': 'Operations extend to USA and Europe markets',
    'journey.2021.title': 'Service Center',
    'journey.2021.desc': 'Dubai laboratory opens with industry-leading standards',
    'journey.2023.title': 'Recognition',
    'journey.2023.desc': 'Present at the biggest technology events in the world',
    'journey.2025.title': 'Global Reach',
    'journey.2025.desc': 'Operating across 6 countries on 3 continents',
    'journey.2026.title': 'Auction Model',
    'journey.2026.desc': 'Certified iPhone auctions',
    'journey.2026.cta': 'Discover now!',

    // Auction
    'auction.title': 'GoldPrime Auction Platform',
    'auction.subtitle': 'Exclusive access to certified iPhone lots',
    'auction.description': 'Join live auctions and acquire device lots that have passed our rigorous industrial certification process. Guaranteed quality, total transparency, and the best opportunities in the B2B market.',
    'auction.offices': 'Our assistance centers are located in São Paulo, Brazil; Ciudad del Este, Paraguay; and Dubai, UAE.',
    'auction.feature1': 'Real-time Bidding',
    'auction.feature2': 'Certified Lots',
    'auction.feature3': 'Detailed Reports',
    'auction.feature4': 'We ship with your custom tag',
    'auction.cta': 'Access Auctions',
    'auction.liveHeader': 'Live Auction',
    'auction.live': 'LIVE',
    'auction.lot': 'Lot',
    'auction.certified': 'GoldPrime Certified',
    'auction.currentBid': 'Current Bid',
    'auction.placeBid': 'Place Bid',
    'auction.watching': 'watching',
    'auction.winner': 'Winner',

    // Countries
    'countries.title': 'The service is available in several countries and continents',

    // FAQ
    'faq.title': 'FAQ',
    'faq.subtitle': 'Clear answers to your questions about our services',
    'faq.q1': 'What is GoldPrime Certification?',
    'faq.a1': 'GoldPrime Certification is our quality seal that guarantees each iPhone has passed 40+ rigorous tests, including hardware, software, battery, and functionality verification. Certified devices have premium quality guarantee.',
    'faq.q2': 'What are the requirements to become a partner?',
    'faq.a2': 'We work with B2B companies operating in the mobile device market. Contact us to discuss minimum volume, payment terms, and logistics for your region.',
    'faq.q3': 'How long does the certification process take?',
    'faq.a3': 'Time varies by volume, but we typically process batches in 3-5 business days. Our team of 100+ technicians allows high throughput while maintaining rigorous standards.',
    'faq.q4': 'Do you offer warranty on devices?',
    'faq.a4': 'Yes, all devices with GoldPrime Certification include a 3-month warranty.',

    // Badges
    'badges.qualityTested': '100% Quality Tested',
    'badges.certified': 'GoldPrime Certified',
    'badges.devices': '20,000+ Devices/Month',
    'badges.global': 'Global Operations',
    'badges.technicians': '100+ Expert Technicians',
    'badges.warranty': 'Comprehensive Warranty',
    'badges.experience': '10+ Years Excellence',
    'badges.trusted': 'Trusted B2B Partner',
    'faq.q5': 'How does international logistics work?',
    'faq.a5': 'We have operations in 6 countries and established logistics partnerships. We can ship virtually anywhere in the world with full tracking and insurance.',
    'faq.q6': 'Which iPhone models do you work with?',
    'faq.a6': 'We work with the entire iPhone lineup, from older models to the latest releases. Our specialty is ensuring premium quality regardless of the model.',

    // Contact
    'contact.title': 'Transform Your Ideas into Partnership',
    'contact.cta': 'Collaborate With Us',
    'contact.form.title': "Let's Work Together!",
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Your Email',
    'contact.form.message': 'Describe Your Case',
    'contact.form.submit': 'Send Message',
    'contact.form.sending': 'Sending...',

    // Footer
    'footer.address': 'Address',
    'footer.phone': 'Phone',
    'footer.email': 'Email',
    'footer.rights': 'All rights reserved.',
    'footer.social': 'Social Media',
    'footer.website': 'Website',
    'chat.bubble': 'Chat with our AI',
    'loading.experience': 'Loading your GoldPrime experience...',

    // Auction LP - Navbar
    'auctionLP.nav.advantages': 'Advantages',
    'auctionLP.nav.howItWorks': 'How It Works',
    'auctionLP.nav.grades': 'Grades',
    'auctionLP.nav.models': 'Models',
    'auctionLP.nav.faq': 'FAQ',
    'auctionLP.nav.accessPlatform': 'Access Auctions',

    // Auction LP - Hero
    'auctionLP.hero.badge': 'Live Auctions — B2B Exclusive',
    'auctionLP.hero.title1': 'Exclusive Auctions of',
    'auctionLP.hero.title2': 'Certified iPhones',
    'auctionLP.hero.subtitle': 'Acquire industrially certified iPhone lots in live auctions. Pay only 20% on winning and the rest on pickup.',
    'auctionLP.hero.cta1': 'Request Access',
    'auctionLP.hero.cta2': 'View Live Auction',
    'auctionLP.hero.stat.locations': 'Service Centers',
    'auctionLP.hero.stat.lotUnits': 'Units per Lot',
    'auctionLP.hero.stat.grades': 'Available Grades',
    'auctionLP.hero.stat.express': 'Express Shipping',

    // Auction LP - Advantages
    'auctionLP.adv.label': 'Why Choose Us',
    'auctionLP.adv.title': 'Exclusive Advantages',
    'auctionLP.adv.subtitle': 'A platform designed to maximize your margins and simplify your operations.',
    'auctionLP.adv.popular': 'Popular',
    'auctionLP.adv.1.title': 'Pay 20% on Winning',
    'auctionLP.adv.1.desc': 'You only pay 20% when you win the auction and the remaining 80% upon lot pickup. Maximum financial flexibility.',
    'auctionLP.adv.2.title': 'Weekly Auctions',
    'auctionLP.adv.2.desc': 'New auctions every week, creating a constant flow of opportunities to stock your inventory.',
    'auctionLP.adv.3.title': 'Express Shipping',
    'auctionLP.adv.3.desc': 'Bought on Tuesday → ships Thursday. Bought on Thursday → ships Tuesday. Or pick up in Paraguay, Dubai, or Miami.',
    'auctionLP.adv.4.title': 'Buy in Lots',
    'auctionLP.adv.4.desc': 'Purchase in volume with lots of 100+ units. Guaranteed scale and optimized margins for your business.',
    'auctionLP.adv.5.title': 'Real Photos',
    'auctionLP.adv.5.desc': 'Access real product photos before buying. Total transparency on every available lot.',
    'auctionLP.adv.6.title': 'Early Access',
    'auctionLP.adv.6.desc': 'Access products before they reach the common market. Exclusive competitive advantage.',

    // Auction LP - How It Works
    'auctionLP.how.label': 'How It Works',
    'auctionLP.how.title': 'Simple and Direct',
    'auctionLP.how.subtitle': 'In 3 steps you are already participating in auctions and securing your lots.',
    'auctionLP.how.step1.title': 'Request Access',
    'auctionLP.how.step1.desc': 'Exclusive platform with approval. We prevent unqualified competition and ensure seriousness in every auction.',
    'auctionLP.how.step2.title': 'Join Live Auctions',
    'auctionLP.how.step2.desc': 'Live auctions with real-time bids, countdown timer, and fair, open competition for all.',
    'auctionLP.how.step3.title': 'Win & Collect',
    'auctionLP.how.step3.desc': 'Pay 20% on winning, 80% on pickup. Collect in Paraguay, Dubai, or Miami. Track everything through the system.',

    // Auction LP - Grades
    'auctionLP.grades.label': 'Classification',
    'auctionLP.grades.title': 'Quality Grades',
    'auctionLP.grades.subtitle': 'All lots have certification and rigorous quality standards.',
    'auctionLP.grades.aplus.title': 'Excellent',
    'auctionLP.grades.aplus.desc': 'Near-new condition, no visible marks.',
    'auctionLP.grades.llplus.title': 'Premium',
    'auctionLP.grades.llplus.desc': 'GoldPrime premium certification, superior quality.',
    'auctionLP.grades.bplus.title': 'Great',
    'auctionLP.grades.bplus.desc': 'Great overall condition, minimal usage marks.',
    'auctionLP.grades.bcplus.title': 'Good',
    'auctionLP.grades.bcplus.desc': 'Good condition with light marks from normal use.',
    'auctionLP.grades.cplus.title': 'Standard',
    'auctionLP.grades.cplus.desc': 'Standard condition, functional and reliable.',
    'auctionLP.grades.mix.title': 'Mixed',
    'auctionLP.grades.mix.desc': 'Mixed lots with varying grades. Best cost-benefit.',

    // Auction LP - Models
    'auctionLP.models.label': 'Available Lots',
    'auctionLP.models.title': 'Models in Auction',
    'auctionLP.models.subtitle': 'Access lots of 100 units of the top iPhone models with competitive pricing.',
    'auctionLP.models.lotSize': 'Lot',
    'auctionLP.models.priceRange': 'Price Range',
    'auctionLP.models.viewAuctions': 'View Auctions',

    // Auction LP - Live Demo
    'auctionLP.liveDemo.badge': 'Live Demo',
    'auctionLP.liveDemo.title': 'See the Auction in Action',
    'auctionLP.liveDemo.subtitle': 'Real-time bids with total transparency',
    'auctionLP.liveDemo.description': 'All bids are visible and recorded, ensuring a fair and transparent process. Join the competition and secure the best lots.',
    'auctionLP.liveDemo.feat1': 'Real-time Bids',
    'auctionLP.liveDemo.feat2': 'Certified Lots',
    'auctionLP.liveDemo.feat3': 'Total Transparency',
    'auctionLP.liveDemo.feat4': 'Exclusive Access',
    'auctionLP.liveDemo.cta': 'Access Auctions',

    // Auction LP - Trust
    'auctionLP.trust.label': 'Trust',
    'auctionLP.trust.title': 'Transparency & Security',
    'auctionLP.trust.item1.title': 'Closed Platform',
    'auctionLP.trust.item1.desc': 'Access by approval only, preventing unqualified competition.',
    'auctionLP.trust.item2.title': 'Visible Bids',
    'auctionLP.trust.item2.desc': 'All bids are recorded and visible, ensuring transparency.',
    'auctionLP.trust.item3.title': 'Certified Quality',
    'auctionLP.trust.item3.desc': 'Each lot has GoldPrime quality certification and standards.',
    'auctionLP.trust.item4.title': 'Fair Competition',
    'auctionLP.trust.item4.desc': 'Real-time auctions with clear rules and open competition.',

    // Auction LP - FAQ
    'auctionLP.faq.title': 'Frequently Asked Questions',
    'auctionLP.faq.subtitle': 'Everything you need to know about our auctions.',
    'auctionLP.faq.q1': 'How do I get platform access?',
    'auctionLP.faq.a1': 'The platform works by invitation or approval. Request access via the website and our team will review your profile to ensure participant quality.',
    'auctionLP.faq.q2': 'What grades are available?',
    'auctionLP.faq.a2': 'We work with 6 grades: A+ (excellent), LL+ (premium), B+ (great), BC+ (good), C+ (standard), and MIX (mixed lots). Each grade has rigorous quality standards.',
    'auctionLP.faq.q3': 'How does payment work?',
    'auctionLP.faq.a3': 'You only pay 20% when you win. The other 80% is paid upon lot pickup, whether in Paraguay, Dubai, or Miami.',
    'auctionLP.faq.q4': 'How does shipping work?',
    'auctionLP.faq.a4': 'We offer express shipping: bought Tuesday, ships Thursday; bought Thursday, ships Tuesday. You can also pick up in Paraguay, Dubai, or Miami. Shipping is only charged on pickup.',
    'auctionLP.faq.q5': 'What is the lot size?',
    'auctionLP.faq.a5': 'Standard lots are 100 units per auction, with a price range between USD 22,000 and USD 50,000 depending on the model and grade.',
    'auctionLP.faq.q6': 'Are the conditions limited time?',
    'auctionLP.faq.a6': 'Yes, current conditions are promotional and limited time. The system is free for first users. Request access now to lock in the best conditions.',

    // Auction LP - CTA
    'auctionLP.cta.urgencyBadge': 'Limited Time Conditions',
    'auctionLP.cta.title': 'Start Participating Now',
    'auctionLP.cta.description': 'Request access to the platform and start acquiring certified iPhone lots with the best B2B market conditions.',
    'auctionLP.cta.freeBadge': 'Free System for First Users',
    'auctionLP.cta.button': 'Request Access',

    // Auction LP - Footer
    'auctionLP.footer.description': 'B2B platform for live auctions of industrially certified iPhone lots.',
    'auctionLP.footer.locations': 'Our Centers',
    'auctionLP.footer.contact': 'Contact',
    'auctionLP.footer.privacy': 'Privacy',
    'auctionLP.footer.terms': 'Terms',

    // Auction LP - Video
    'auctionLP.video.label': 'Tutorial',
    'auctionLP.video.title': 'See How It Works',
    'auctionLP.video.subtitle': 'Watch a full walkthrough on how to participate in auctions and secure your lots.',
    'auctionLP.video.placeholder': 'Video coming soon',
    'auctionLP.video.duration': '~3 minutes',
    'auctionLP.video.caption': 'Full tutorial on how to use the GoldPrime auction platform',
  },
  'es': {
    // Navbar
    'nav.home': 'Inicio',
    'nav.about': 'Sobre Nosotros',
    'nav.about.who': 'Quiénes Somos',
    'nav.about.vision': 'Nuestra Visión',
    'nav.about.mission': 'Nuestra Misión',
    'nav.about.team': 'Nuestro Equipo',
    'nav.services': 'Servicios',
    'nav.services.trading': 'Trading de iPhones',
    'nav.services.center': 'Centro de Servicios',
    'nav.services.certification': 'Certificación GoldPrime',
    'nav.services.repairs': 'Reparaciones Originales',
    'nav.global': 'Presencia Global',
    'nav.global.dubai': 'Dubái (Sede)',
    'nav.global.usa': 'EE.UU. & Europa',
    'nav.global.brazil': 'Brasil & Paraguay',
    'nav.global.lebanon': 'Líbano',
    'nav.partners': 'Socios',
    'nav.contact': 'Contacto',
    'nav.auction': 'Subasta',
    'nav.faq': 'FAQ',
    'nav.auction.platform': 'Plataforma de Subasta',

    // Hero
    'hero.title': 'Hub Premier de Trading de iPhones Premium',
    'hero.subtitle': 'Líder global en trading de iPhones con certificación de calidad industrial y presencia en 6 países',
    'hero.cta.primary': 'Conviértete en Socio',
    'hero.cta.secondary': 'Conoce Nuestros Servicios',

    // Stats
    'stats.years': 'Años de Experiencia',
    'stats.technicians': 'Técnicos Especializados',
    'stats.devices': 'Dispositivos/Mes',
    'stats.countries': 'Países',

    // About
    'about.title': 'Sobre GoldPrime',
    'about.description': 'GoldPrime FZCO es el principal hub de trading de iPhones premium en Dubái, ofreciendo soluciones integrales para socios B2B globales. Con más de 10 años de experiencia, nos hemos convertido en el puente entre la calidad premium y la presencia en el mercado internacional.',
    'about.vision.title': 'Nuestra Visión',
    'about.vision.text': 'Convertirnos en el destino de trading de iPhones premium más confiable e innovador a nivel global, estableciendo nuevos estándares en la industria de dispositivos móviles.',
    'about.mission.title': 'Nuestra Misión',
    'about.mission.text': 'Entregar excelencia en calidad, satisfacción del cliente y asociaciones globales a través de nuestras 40+ pruebas rigurosas y la certificación GoldPrime.',
    'about.image.technicians': '100+ Técnicos',
    'about.image.location': 'Centro de Servicios Dubái',
    'about.image.alt': 'Equipo GoldPrime - 100+ técnicos',

    // Process
    'process.title': 'Nuestro Proceso',
    'process.step1.title': 'Recibir y Catalogar',
    'process.step1.desc': 'Recibimos y catalogamos cada iPhone con precisión.',
    'process.step2.title': 'Probar y Reparar',
    'process.step2.desc': 'Realizamos pruebas en todos los dispositivos y solo mantenemos los que realmente lo necesitan.',
    'process.step3.title': 'Certificar y Enviar',
    'process.step3.desc': 'Tu dispositivo se envía con un certificado oficial GoldPrime y sello de autenticidad garantizado.',

    // Service Center
    'service.title': 'Conoce Nuestro Centro de Servicios',
    'service.description': 'Transforma tus lotes de iPhones en ganancias garantizadas. Nuestro Centro de Servicios aplica estándares de calidad industrial a cada dispositivo. Diagnosticamos, reparamos y certificamos tu inventario con el sello GoldPrime, eliminando devoluciones y maximizando tus márgenes.',
    'service.tests': '40+ pruebas',
    'service.tests.subtitle': 'Diagnóstico Completo',
    'service.repairs': 'Reparaciones de Precisión',
    'service.repairs.subtitle': 'Piezas Originales',
    'service.ready': 'Listo para Vender',
    'service.ready.subtitle': 'Certificación GoldPrime',
    'service.branding.title': 'Tu Marca, Nuestra Calidad',
    'service.branding.desc': 'Podemos crear etiquetas personalizadas con tu marca. Recibimos tu lote de dispositivos, los procesamos con los estándares GoldPrime y los devolvemos con tu identidad visual y garantía de calidad.',
    'service.certified.badge': 'Calidad Certificada',
    'service.premium.title': 'Certificación Premium',
    'service.premium.desc': 'Fortalece tu marca con nuestra calidad industrial y la confianza del sello GoldPrime. Piezas 100% originales.',
    'service.tech.title': 'Tecnología Avanzada',
    'service.tech.desc': 'Equipos de prueba de última generación.',
    'service.list.title': 'Nuestros Servicios',
    'service.list.item1': 'Prueba y clasificación completa de dispositivos',
    'service.list.item2': 'Verificación de salud de la batería',
    'service.list.item3': 'Evaluación cosmética completa',
    'service.list.item4': 'Diagnóstico de software y actualizaciones',
    'service.list.item5': 'Verificación de piezas originales',
    'service.list.item6': 'Certificación de calidad y etiquetado',

    // Global
    'global.title': 'Presencia Global',
    'global.description': 'Conectando socios en 3 continentes con presencia estratégica en mercados clave.',
    'global.dubai': 'Dubái, EAU',
    'global.dubai.desc': 'Sede Global & Centro de Servicios',
    'global.usa': 'Estados Unidos',
    'global.usa.desc': 'Hub de Trading Norteamericano',
    'global.europe': 'Europa',
    'global.europe.desc': 'Red de Distribución Europea',
    'global.brazil': 'Brasil',
    'global.brazil.desc': 'Operaciones Sudamérica',
    'global.paraguay': 'Paraguay',
    'global.paraguay.desc': 'Centro Logístico Regional',
    'global.lebanon': 'Líbano',
    'global.lebanon.desc': 'Expansión Oriente Medio',

    // Journey
    'journey.title': 'Nuestro Recorrido',
    'journey.description': '2017: GoldPrime se lanza con una visión para el comercio global de iPhones premium. 2021: El laboratorio de Dubái abre sus puertas, estableciendo estándares de calidad líderes en la industria. Ahora: Presente en GITEX y los principales eventos mundiales incluyendo Dubái, Barcelona, Brasil, España, Malta, Paraguay y Líbano — conectando socios en 3 continentes y liderando la innovación en tecnología móvil.',

    // Timeline
    'journey.2017.title': 'Fundación',
    'journey.2017.desc': 'GoldPrime se lanza con una visión para el comercio global de iPhones premium',
    'journey.2019.title': 'Expansión',
    'journey.2019.desc': 'Las operaciones se amplían a los mercados de EE.UU. y Europa',
    'journey.2021.title': 'Centro de Servicios',
    'journey.2021.desc': 'El laboratorio de Dubái abre con estándares líderes de la industria',
    'journey.2023.title': 'Reconocimiento',
    'journey.2023.desc': 'Presente en los mayores eventos de tecnología alrededor del mundo',
    'journey.2025.title': 'Alcance Global',
    'journey.2025.desc': 'Operando en 6 países en 3 continentes',
    'journey.2026.title': 'Modelo de Subasta',
    'journey.2026.desc': 'Subastas de iPhones certificados',
    'journey.2026.cta': '¡Descubrir ahora!',

    // Auction
    'auction.title': 'Plataforma de Subasta GoldPrime',
    'auction.subtitle': 'Acceso exclusivo a lotes de iPhones certificados',
    'auction.description': 'Participa en subastas en vivo y adquiere lotes de dispositivos que han pasado por nuestro riguroso proceso de certificación industrial. Calidad garantizada, transparencia total y las mejores oportunidades del mercado B2B.',
    'auction.offices': 'Nuestros centros de asistencia están en São Paulo, Brasil; Ciudad del Este, Paraguay; y Dubái, Emiratos Árabes Unidos.',
    'auction.feature1': 'Pujas en Tiempo Real',
    'auction.feature2': 'Lotes Certificados',
    'auction.feature3': 'Informes Detallados',
    'auction.feature4': 'Enviamos con tu etiqueta personalizada',
    'auction.cta': 'Acceder a Subastas',
    'auction.liveHeader': 'Subasta en Vivo',
    'auction.live': 'EN VIVO',
    'auction.lot': 'Lote',
    'auction.certified': 'Certificación GoldPrime',
    'auction.currentBid': 'Puja Actual',
    'auction.placeBid': 'Hacer Puja',
    'auction.watching': 'viendo',
    'auction.winner': 'Ganador',

    // Countries
    'countries.title': 'El servicio está disponible en varios países y continentes',

    // FAQ
    'faq.title': 'FAQ',
    'faq.subtitle': 'Respuestas claras a tus preguntas sobre nuestros servicios',
    'faq.q1': '¿Qué es la Certificación GoldPrime?',
    'faq.a1': 'La Certificación GoldPrime es nuestro sello de calidad que garantiza que cada iPhone ha pasado 40+ pruebas rigurosas, incluyendo verificación de hardware, software, batería y funcionalidades. Los dispositivos certificados tienen garantía de calidad premium.',
    'faq.q2': '¿Cuáles son los requisitos para convertirse en socio?',
    'faq.a2': 'Trabajamos con empresas B2B que operan en el mercado de dispositivos móviles. Contáctanos para hablar sobre volumen mínimo, condiciones de pago y logística para tu región.',
    'faq.q3': '¿Cuánto tiempo dura el proceso de certificación?',
    'faq.a3': 'El tiempo varía según el volumen, pero generalmente procesamos lotes en 3-5 días hábiles. Nuestro equipo de 100+ técnicos permite un alto rendimiento manteniendo estándares rigurosos.',
    'faq.q4': '¿Ofrecen garantía en los dispositivos?',
    'faq.a4': 'Sí, todos los dispositivos con Certificación GoldPrime incluyen 3 meses de garantía.',
    'faq.q5': '¿Cómo funciona la logística internacional?',
    'faq.a5': 'Tenemos operaciones en 6 países y asociaciones logísticas establecidas. Podemos enviar prácticamente a cualquier parte del mundo con seguimiento completo y seguro.',
    'faq.q6': '¿Con qué modelos de iPhone trabajan?',
    'faq.a6': 'Trabajamos con toda la línea de iPhones, desde modelos más antiguos hasta los últimos lanzamientos. Nuestra especialidad es garantizar calidad premium independientemente del modelo.',

    // Badges
    'badges.qualityTested': '100% Probado',
    'badges.certified': 'Certificación GoldPrime',
    'badges.devices': '20.000+ Dispositivos/Mes',
    'badges.global': 'Operaciones Globales',
    'badges.technicians': '100+ Técnicos Expertos',
    'badges.warranty': 'Garantía Integral',
    'badges.experience': '10+ Años de Excelencia',
    'badges.trusted': 'Socio B2B de Confianza',

    // Contact
    'contact.title': 'Transforma Tus Ideas en Alianza',
    'contact.cta': 'Colabora con Nosotros',
    'contact.form.title': '¡Trabajemos Juntos!',
    'contact.form.name': 'Tu Nombre',
    'contact.form.email': 'Tu Email',
    'contact.form.message': 'Describe Tu Caso',
    'contact.form.submit': 'Enviar Mensaje',
    'contact.form.sending': 'Enviando...',

    // Footer
    'footer.address': 'Dirección',
    'footer.phone': 'Teléfonos',
    'footer.email': 'Email',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.social': 'Redes Sociales',
    'footer.website': 'Sitio Web',
    'chat.bubble': 'Habla con nuestra IA',
    'loading.experience': 'Cargando tu experiencia GoldPrime...',

    // Auction LP - Navbar
    'auctionLP.nav.advantages': 'Ventajas',
    'auctionLP.nav.howItWorks': 'Cómo Funciona',
    'auctionLP.nav.grades': 'Grados',
    'auctionLP.nav.models': 'Modelos',
    'auctionLP.nav.faq': 'FAQ',
    'auctionLP.nav.accessPlatform': 'Acceder a Subastas',

    // Auction LP - Hero
    'auctionLP.hero.badge': 'Subastas en Vivo — Exclusivo B2B',
    'auctionLP.hero.title1': 'Subastas Exclusivas de',
    'auctionLP.hero.title2': 'iPhones Certificados',
    'auctionLP.hero.subtitle': 'Adquiera lotes de iPhones con certificación industrial en subastas en vivo. Pague solo el 20% al ganar y el resto al retirar.',
    'auctionLP.hero.cta1': 'Solicitar Acceso',
    'auctionLP.hero.cta2': 'Ver Subasta en Vivo',
    'auctionLP.hero.stat.locations': 'Centros de Servicio',
    'auctionLP.hero.stat.lotUnits': 'Unidades por Lote',
    'auctionLP.hero.stat.grades': 'Grados Disponibles',
    'auctionLP.hero.stat.express': 'Envío Express',

    // Auction LP - Advantages
    'auctionLP.adv.label': 'Por Qué Elegirnos',
    'auctionLP.adv.title': 'Ventajas Exclusivas',
    'auctionLP.adv.subtitle': 'Una plataforma diseñada para maximizar sus márgenes y simplificar sus operaciones.',
    'auctionLP.adv.popular': 'Popular',
    'auctionLP.adv.1.title': 'Pague 20% al Ganar',
    'auctionLP.adv.1.desc': 'Solo paga el 20% al ganar la subasta y el 80% restante al retirar el lote. Máxima flexibilidad financiera.',
    'auctionLP.adv.2.title': 'Subastas Semanales',
    'auctionLP.adv.2.desc': 'Nuevas subastas cada semana, creando un flujo constante de oportunidades para su inventario.',
    'auctionLP.adv.3.title': 'Envío Express',
    'auctionLP.adv.3.desc': 'Compró el martes → sale el jueves. Compró el jueves → sale el martes. O retire en Paraguay, Dubai o Miami.',
    'auctionLP.adv.4.title': 'Compre en Lotes',
    'auctionLP.adv.4.desc': 'Compre en volumen con lotes de 100+ unidades. Escala garantizada y márgenes optimizados.',
    'auctionLP.adv.5.title': 'Fotos Reales',
    'auctionLP.adv.5.desc': 'Acceda a fotos reales de los productos antes de comprar. Transparencia total en cada lote.',
    'auctionLP.adv.6.title': 'Acceso Anticipado',
    'auctionLP.adv.6.desc': 'Acceda a productos antes de que lleguen al mercado común. Ventaja competitiva exclusiva.',

    // Auction LP - How It Works
    'auctionLP.how.label': 'Cómo Funciona',
    'auctionLP.how.title': 'Simple y Directo',
    'auctionLP.how.subtitle': 'En 3 pasos ya está participando de las subastas y asegurando sus lotes.',
    'auctionLP.how.step1.title': 'Solicite Acceso',
    'auctionLP.how.step1.desc': 'Plataforma exclusiva con aprobación. Evitamos competencia no calificada y garantizamos seriedad.',
    'auctionLP.how.step2.title': 'Participe en Subastas',
    'auctionLP.how.step2.desc': 'Subastas en vivo con pujas en tiempo real, cronómetro regresivo y competencia justa y abierta.',
    'auctionLP.how.step3.title': 'Gane y Retire',
    'auctionLP.how.step3.desc': 'Pague 20% al ganar, 80% al retirar. Retire en Paraguay, Dubai o Miami. Siga todo por el sistema.',

    // Auction LP - Grades
    'auctionLP.grades.label': 'Clasificación',
    'auctionLP.grades.title': 'Grados de Calidad',
    'auctionLP.grades.subtitle': 'Todos los lotes cuentan con certificación y estándares de calidad rigurosos.',
    'auctionLP.grades.aplus.title': 'Excelente',
    'auctionLP.grades.aplus.desc': 'Condición casi nueva, sin marcas visibles.',
    'auctionLP.grades.llplus.title': 'Premium',
    'auctionLP.grades.llplus.desc': 'Certificación premium GoldPrime, calidad superior.',
    'auctionLP.grades.bplus.title': 'Óptimo',
    'auctionLP.grades.bplus.desc': 'Óptima condición general, marcas mínimas de uso.',
    'auctionLP.grades.bcplus.title': 'Bueno',
    'auctionLP.grades.bcplus.desc': 'Buena condición con marcas leves de uso normal.',
    'auctionLP.grades.cplus.title': 'Estándar',
    'auctionLP.grades.cplus.desc': 'Condición estándar, funcional y confiable.',
    'auctionLP.grades.mix.title': 'Mixto',
    'auctionLP.grades.mix.desc': 'Lotes variados con grados mixtos. Mejor costo-beneficio.',

    // Auction LP - Models
    'auctionLP.models.label': 'Lotes Disponibles',
    'auctionLP.models.title': 'Modelos en Subasta',
    'auctionLP.models.subtitle': 'Acceda a lotes de 100 unidades de los principales modelos de iPhone con precios competitivos.',
    'auctionLP.models.lotSize': 'Lote',
    'auctionLP.models.priceRange': 'Rango de Precio',
    'auctionLP.models.viewAuctions': 'Ver Subastas',

    // Auction LP - Live Demo
    'auctionLP.liveDemo.badge': 'Demostración en Vivo',
    'auctionLP.liveDemo.title': 'Vea la Subasta en Acción',
    'auctionLP.liveDemo.subtitle': 'Pujas en tiempo real con transparencia total',
    'auctionLP.liveDemo.description': 'Todas las pujas son visibles y registradas, garantizando un proceso justo y transparente. Participe de la competencia y asegure los mejores lotes.',
    'auctionLP.liveDemo.feat1': 'Pujas en Tiempo Real',
    'auctionLP.liveDemo.feat2': 'Lotes Certificados',
    'auctionLP.liveDemo.feat3': 'Transparencia Total',
    'auctionLP.liveDemo.feat4': 'Acceso Exclusivo',
    'auctionLP.liveDemo.cta': 'Acceder a Subastas',

    // Auction LP - Trust
    'auctionLP.trust.label': 'Confianza',
    'auctionLP.trust.title': 'Transparencia y Seguridad',
    'auctionLP.trust.item1.title': 'Plataforma Cerrada',
    'auctionLP.trust.item1.desc': 'Acceso solo por aprobación, evitando competencia no calificada.',
    'auctionLP.trust.item2.title': 'Pujas Visibles',
    'auctionLP.trust.item2.desc': 'Todas las pujas son registradas y visibles, garantizando transparencia.',
    'auctionLP.trust.item3.title': 'Calidad Certificada',
    'auctionLP.trust.item3.desc': 'Cada lote posee certificación y estándar de calidad GoldPrime.',
    'auctionLP.trust.item4.title': 'Competencia Justa',
    'auctionLP.trust.item4.desc': 'Subastas en tiempo real con reglas claras y competencia abierta.',

    // Auction LP - FAQ
    'auctionLP.faq.title': 'Preguntas Frecuentes',
    'auctionLP.faq.subtitle': 'Todo lo que necesita saber sobre nuestras subastas.',
    'auctionLP.faq.q1': '¿Cómo obtengo acceso a la plataforma?',
    'auctionLP.faq.a1': 'La plataforma funciona por invitación o aprobación. Solicite acceso por el sitio y nuestro equipo analizará su perfil para garantizar la calidad de los participantes.',
    'auctionLP.faq.q2': '¿Qué grados están disponibles?',
    'auctionLP.faq.a2': 'Trabajamos con 6 grados: A+ (excelente), LL+ (premium), B+ (óptimo), BC+ (bueno), C+ (estándar) y MIX (lotes mixtos). Cada grado tiene estándares rigurosos de calidad.',
    'auctionLP.faq.q3': '¿Cómo funciona el pago?',
    'auctionLP.faq.a3': 'Solo paga el 20% al ganar. El otro 80% se paga al retirar el lote, sea en Paraguay, Dubai o Miami.',
    'auctionLP.faq.q4': '¿Cómo funciona el envío?',
    'auctionLP.faq.a4': 'Ofrecemos envío express: compró el martes, sale el jueves; compró el jueves, sale el martes. También puede retirar en Paraguay, Dubai o Miami.',
    'auctionLP.faq.q5': '¿Cuál es el tamaño de los lotes?',
    'auctionLP.faq.a5': 'Los lotes estándar son de 100 unidades por subasta, con un rango de precio entre USD 22.000 y USD 50.000 según el modelo y grado.',
    'auctionLP.faq.q6': '¿Las condiciones son por tiempo limitado?',
    'auctionLP.faq.a6': 'Sí, las condiciones actuales son promocionales y por tiempo limitado. El sistema es gratuito para los primeros usuarios. Solicite acceso ahora para asegurar las mejores condiciones.',

    // Auction LP - CTA
    'auctionLP.cta.urgencyBadge': 'Condiciones por Tiempo Limitado',
    'auctionLP.cta.title': 'Comience a Participar Ahora',
    'auctionLP.cta.description': 'Solicite acceso a la plataforma y comience a adquirir lotes de iPhones certificados con las mejores condiciones del mercado B2B.',
    'auctionLP.cta.freeBadge': 'Sistema Gratis para los Primeros Usuarios',
    'auctionLP.cta.button': 'Solicitar Acceso',

    // Auction LP - Footer
    'auctionLP.footer.description': 'Plataforma B2B de subastas en vivo de lotes de iPhones certificados industrialmente.',
    'auctionLP.footer.locations': 'Nuestros Centros',
    'auctionLP.footer.contact': 'Contacto',
    'auctionLP.footer.privacy': 'Privacidad',
    'auctionLP.footer.terms': 'Términos',

    // Auction LP - Video
    'auctionLP.video.label': 'Tutorial',
    'auctionLP.video.title': 'Vea Cómo Funciona',
    'auctionLP.video.subtitle': 'Mire una demostración completa de cómo participar en las subastas y asegurar sus lotes.',
    'auctionLP.video.placeholder': 'Video próximamente',
    'auctionLP.video.duration': '~3 minutos',
    'auctionLP.video.caption': 'Tutorial completo de cómo usar la plataforma de subastas GoldPrime',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const detectBrowserLanguage = (): Language => {
  const browserLang = navigator.language || (navigator as any).userLanguage;
  if (browserLang.startsWith('pt')) {
    return 'pt-BR';
  }
  if (browserLang.startsWith('es')) {
    return 'es';
  }
  return 'en';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Verifica se o usuário já fez uma escolha manual
    const userChoice = localStorage.getItem('goldprime-language-user-choice');
    if (userChoice === 'true') {
      const saved = localStorage.getItem('goldprime-language');
      if (saved === 'pt-BR' || saved === 'en' || saved === 'es') {
        return saved as Language;
      }
    }
    // Sempre detecta o idioma do navegador se não houver escolha manual
    const detected = detectBrowserLanguage();
    localStorage.setItem('goldprime-language', detected);
    return detected;
  });

  useEffect(() => {
    localStorage.setItem('goldprime-language', language);
    document.documentElement.lang = language;
  }, [language]);

  // Wrapper para setLanguage que marca como escolha do usuário
  const handleSetLanguage = (lang: Language) => {
    localStorage.setItem('goldprime-language-user-choice', 'true');
    setLanguage(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
