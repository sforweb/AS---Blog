
export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  featured: boolean;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Explorando as Ruínas Antigas de Machu Picchu, Peru',
    subtitle: 'Uma jornada através da história perdida dos Incas',
    excerpt: 'Empoleirada no topo de uma cordilheira remota nos Andes peruanos, a extraordinária ruína...',
    content: `Empoleirada no topo de uma cordilheira remota nos Andes peruanos, a extraordinária ruína de Machu Picchu permanece como um dos sítios arqueológicos mais impressionantes do mundo.

Esta cidadela inca, construída no século XV e depois abandonada durante a conquista espanhola, foi redescoberta apenas em 1911 pelo explorador americano Hiram Bingham. Hoje, ela atrai milhares de visitantes que buscam uma conexão com o passado místico do Peru.

## A Jornada até o Topo

O caminho mais tradicional para chegar a Machu Picchu é através da famosa Trilha Inca, uma caminhada de quatro dias que serpenteia através de paisagens andinas deslumbrantes. A trilha não é apenas uma jornada física, mas uma experiência espiritual que conecta os caminhantes com a rica herança cultural do Peru.

Durante a caminhada, você passará por outros sítios arqueológicos incas, florestas nubladas repletas de orquídeas raras, e terá vistas panorâmicas de picos nevados que tocam o céu. Cada passo na trilha é uma página da história, contando a saga de uma civilização que construiu estradas e cidades nas alturas mais impossíveis.

## O Mistério da Arquitetura Inca

Ao chegar a Machu Picchu, você será confrontado com a genialidade da engenharia inca. As pedras são cortadas com tal precisão que nem uma lâmina de faca pode ser inserida entre elas. Não foi usado nenhum argamassa, apenas o peso e o encaixe perfeito das pedras mantêm as estruturas intactas há mais de 500 anos.

O complexo é dividido em seções urbanas e agrícolas, com templos, residências e terraços que demonstram o sofisticado conhecimento inca sobre agricultura em montanha e astronomia. O Templo do Sol, por exemplo, está perfeitamente alinhado com o solstício de inverno.

## Preservando uma Maravilha

Hoje, Machu Picchu enfrenta desafios de conservação devido ao alto número de visitantes. Por isso, é essencial que cada turista seja consciente de seu impacto e siga as diretrizes de preservação. Afinal, esta maravilha deve ser protegida para as futuras gerações descobrirem sua magia.`,
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80',
    category: 'Destination',
    author: {
      name: 'Oliver Buchannon',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'
    },
    date: 'Mar 11, 2024',
    featured: true,
    slug: 'explorando-ruinas-antigas-machu-picchu-peru'
  },
  {
    id: '2',
    title: 'Trilhas através das Paisagens da Patagônia, Argentina',
    subtitle: 'Descobrindo a natureza selvagem no fim do mundo',
    excerpt: 'Compartilhada entre Argentina e Chile, a região da Patagônia abrange algumas das...',
    content: `Compartilhada entre Argentina e Chile, a região da Patagônia abrange algumas das paisagens mais dramáticas e intocadas do nosso planeta. Esta vasta extensão de terra no extremo sul da América do Sul oferece uma experiência de trekking incomparável para aqueles que buscam aventura em estado puro.

## O Chamado da Natureza Selvagem

A Patagônia é uma terra de extremos: glaciares milenares que encontram o mar, picos rochosos que perfuram o céu, e estepes infinitas onde o vento sussurra histórias antigas. Para os amantes da natureza, é um destino que promete encontros íntimos com paisagens que parecem de outro planeta.

O Parque Nacional Los Glaciares, patrimônio mundial da UNESCO, abriga o famoso Glaciar Perito Moreno, uma massa de gelo de 30 quilômetros de comprimento que avança constantemente em direção ao Lago Argentino. O som dos blocos de gelo se desprendendo e caindo na água é uma sinfonia natural que ecoa pelos vales.

## Trilhas Épicas

Uma das trilhas mais desafiadoras e recompensadoras é a que leva ao Cerro Fitz Roy, também conhecido como Chaltén pelos povos indígenas, que significa "montanha que fuma" devido às nuvens que frequentemente envolvem seu pico.

A caminhada até a Laguna de los Tres oferece vistas espetaculares desta montanha icônica, especialmente durante o nascer do sol, quando os primeiros raios de luz tingem as rochas de um vermelho intenso - um fenômeno conhecido como "alpenglow".

## Vida Selvagem Única

A Patagônia também é o lar de uma fauna única. Condores gigantes planam sobre os vales, guanacos (parentes selvagens das lhamas) pastam nas estepes, e nas águas costeiras, orcas e baleias francas austrais podem ser avistadas durante suas migrações.

## Preparação é Fundamental

O clima na Patagônia é notoriamente imprevisível. Ventos de até 120 km/h podem surgir sem aviso, e o tempo pode mudar de ensolarado para tempestuoso em questão de minutos. Por isso, estar bem preparado com equipamentos adequados é essencial para uma experiência segura e prazerosa.`,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    category: 'Hiking',
    author: {
      name: 'Oliver Buchannon',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'
    },
    date: 'Mar 09, 2024',
    featured: true,
    slug: 'trilhas-atraves-paisagens-patagonia-argentina'
  },
  {
    id: '3',
    title: 'Saboreando os Sabores da Vibrante Cena de Comida de Rua de Bangkok',
    subtitle: 'Uma aventura culinária pelas ruas da Tailândia',
    excerpt: 'Para os amantes da gastronomia, Bangkok é um paraíso extenso e efervescente de delícias...',
    content: `Para os amantes da gastronomia, Bangkok é um paraíso extenso e efervescente de delícias da comida de rua. A capital tailandesa oferece uma experiência culinária que vai muito além dos restaurantes tradicionais - aqui, as ruas são o verdadeiro palco gastronômico.

## O Teatro da Comida de Rua

Em Bangkok, a comida de rua não é apenas uma refeição rápida, é um espetáculo cultural. Desde o amanhecer até altas horas da madrugada, vendedores habilidosos transformam carrinhos simples em cozinhas elaboradas, preparando pratos que rivalizem com qualquer restaurante renomado.

O aroma inconfundível do pad thai sendo preparado em woks gigantes, o som do óleo fervendo enquanto bolinhos são fritos até ficarem dourados, e o vapor que sobe dos caldeirões de sopa tom yum - todos esses elementos criam uma sinfonia sensorial única.

## Mercados Imperdíveis

O Chatuchak Weekend Market é um dos maiores mercados de fim de semana do mundo, onde mais de 200.000 visitantes se misturam entre as 15.000 bancas. Aqui, você pode encontrar desde o tradicional mango sticky rice até experimentações culinárias mais ousadas como insetos grelhados temperados com molho de pimenta.

O mercado flutuante de Damnoen Saduak oferece uma experiência ainda mais autêntica, onde vendedores navegam em pequenos barcos carregados de ingredientes frescos e pratos prontos, mantendo viva uma tradição centenária.

## Pratos Que Não Podem Faltar

**Som Tam**: Esta salada de mamão verde é uma explosão de sabores - doce, azedo, salgado e picante em perfeita harmonia. Preparada na hora com pilão e morteiro, cada porção é única.

**Khao Pad**: O arroz frito tailandês pode parecer simples, mas nas mãos certas torna-se uma obra de arte culinária, com cada grão perfeitamente separado e temperado.

**Mango Sticky Rice**: Uma sobremesa que combina a doçura da manga madura com arroz glutinoso cozido no leite de coco, criando uma experiência quase transcendental.

## A Arte da Negociação

Fazer compras nos mercados de Bangkok é também uma arte social. A negociação é esperada e faz parte da experiência cultural. Sorrir, ser respeitoso e mostrar interesse genuíno pela cultura local geralmente resulta em melhores preços e, mais importante, em conexões humanas autênticas.

## Dicas de Segurança Alimentar

Embora a comida de rua de Bangkok seja geralmente segura, algumas precauções básicas podem garantir uma experiência sem problemas: procure vendedores com alta rotatividade de clientes, prefira alimentos cozidos na hora e bem quentes, e observe as condições de higiene do local.`,
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
    category: 'Food and Drink',
    author: {
      name: 'Alessandro Rossi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80'
    },
    date: 'Mar 07, 2024',
    featured: true,
    slug: 'saboreando-sabores-vibrante-comida-rua-bangkok'
  },
  {
    id: '4',
    title: 'Os Segredos Escondidos de Kyoto',
    subtitle: 'Descobrindo templos ancestrais e tradições milenares',
    excerpt: 'Antiga capital do Japão, Kyoto preserva mais de 1.000 anos de história em suas ruas...',
    content: `Antiga capital do Japão, Kyoto preserva mais de 1.000 anos de história em suas ruas serpenteantes e templos majestosos. Esta cidade é um tesouro vivo da cultura japonesa, onde cada esquina revela uma nova camada de tradição e espiritualidade.

## O Caminho dos Mil Torii

O santuário Fushimi Inari é famoso por seus milhares de portões torii vermelho-alaranjados que criam túneis místicos subindo pela montanha. Cada torii foi doado por indivíduos ou empresas como oferenda, criando um caminho colorido que se estende por quilômetros.

Caminhar por esses túneis ao amanhecer, quando a luz dourada filtra através dos portões e a névoa matinal ainda paira sobre a montanha, é uma experiência quase transcendental que conecta visitantes com séculos de devoção espiritual.

## O Distrito de Gion

Gion é o distrito das gueixas mais famoso de Kyoto, onde tradições centenárias ainda vivem. Suas ruas de paralelepípedos são ladeadas por casas de chá tradicionais (ochaya) onde as gueixas e maikos entretêm seus convidados com danças clássicas, música de shamisen e conversação refinada.

Ao final da tarde, você pode ter a sorte de avistar uma gueixa ou maiko caminhando rapidamente pelas ruas estreitas, suas vestes elaboradas contrastando belamente com a arquitetura tradicional de madeira.

## Templos de Contemplação

O Kinkaku-ji, ou Pavilhão Dourado, é provavelmente o templo mais fotografado do Japão. Coberto com folhas de ouro genuíno, ele se reflete perfeitamente no lago que o circunda, criando uma imagem de beleza etérea especialmente durante o outono, quando as folhas de bordo ao redor se tingem de vermelho e dourado.

O Kiyomizu-dera oferece uma das vistas mais panorâmicas de Kyoto. Este templo de madeira, construído sem usar um único prego, possui um palco que se projeta 13 metros sobre a encosta da colina, oferecendo vistas espetaculares da cidade abaixo.

## A Filosofia do Jardim Japonês

Os jardins de Kyoto são obras de arte vivas que incorporam a filosofia zen. O Ryoan-ji é famoso por seu jardim de rochas - 15 pedras cuidadosamente posicionadas em cascalho branco rastreado. A disposição é tal que de qualquer ponto de vista, apenas 14 pedras são visíveis, simbolizando a natureza incompleta da percepção humana.

## Cerimônia do Chá

Participar de uma cerimônia do chá autêntica em Kyoto é mergulhar na essência da hospitalidade japonesa. Cada movimento é deliberado e significativo, desde a limpeza dos utensílios até a preparação e servimento do matcha. É uma meditação em movimento que ensina paciência, respeito e mindfulness.`,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
    category: 'Culture',
    author: {
      name: 'Yuki Tanaka',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80'
    },
    date: 'Mar 05, 2024',
    featured: false,
    slug: 'segredos-escondidos-kyoto'
  }
];

export const getFeaturedPosts = () => blogPosts.filter(post => post.featured);
export const getAllPosts = () => blogPosts;
export const getPostBySlug = (slug: string) => blogPosts.find(post => post.slug === slug);
