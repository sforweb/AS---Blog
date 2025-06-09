---
title: Estatística para Análise de Dados: Conceitos Fundamentais para Iniciantes
date: 2023-08-02
excerpt: Entenda o papel da estatística na análise de dados e na ciência de dados. Neste guia introdutório, você vai conhecer os conceitos essenciais para começar com segurança sua jornada no mundo orientado por dados.
category: Dados
author: Alexandre Spada
authorAvatar: /images/team/foto-de-perfil.png
authorRole: Fundador
image: /images/blog/introducao-a-estatistica-para-data-science.png
readTime: "5 min de leitura"
featured: true
tags: [Data Science, Análise de Dados, Estatística]
---

Bem-vindo a este artigo, o primeiro de uma série dedicada a desvendar o fascinante mundo da estatística e sua aplicação na análise de dados e Data Science. Se você está aqui, é porque entende que, em um mundo cada vez mais orientado por dados, o domínio da estatística é uma habilidade essencial.

Se você é "marinheiro de primeira viagem", saiba que a **estatística** é a ciência que nos permite coletar, analisar, interpretar, apresentar e organizar dados. Ela é uma ferramenta fundamental para a tomada de decisões embasadas, seja em um contexto de negócios, pesquisa científica ou até mesmo em nossas vidas pessoais.

No campo da análise de dados e Data Science, a estatística é ainda mais crucial. Ela é a base que permite aos cientistas de dados extrair insights de grandes conjuntos de dados, identificar padrões, fazer previsões e, em última análise, criar valor a partir deles.

Neste post, meu objetivo é apresentar a você os conceitos fundamentais da estatística, de uma maneira simples e compreensível, mesmo que você seja um completo iniciante no assunto. Vamos explorar a origem da estatística, seus diferentes ramos, como os dados são coletados e classificados, e muito mais.

Então, se você está pronto para embarcar nesta jornada de descoberta e aprendizado, vamos começar!

## Origem da Estatística: Uma Viagem no Tempo

A estatística, como a conhecemos hoje, é o resultado de séculos de evolução e desenvolvimento. Mas você sabia que suas raízes remontam à antiguidade?

Os primeiros registros de uso da estatística vêm de civilizações antigas, como o Egito e a Babilônia, onde eram realizados censos populacionais e de propriedades para fins fiscais. Na Roma antiga, por exemplo, a estatística era usada para planejar provisões de alimentos e organizar campanhas militares.

No entanto, a estatística como uma disciplina formal só começou a se desenvolver no século XVII, com o advento da teoria das probabilidades. A partir daí, a estatística começou a ser aplicada em uma variedade de campos, desde a astronomia até a sociologia, e se tornou uma ferramenta indispensável para a tomada de decisões baseada em dados.

No século XX, com o advento dos computadores e a explosão de dados disponíveis, a estatística ganhou ainda mais relevância. Hoje, ela é a espinha dorsal da análise de dados e da Data Science, permitindo-nos extrair informação de enormes conjuntos de dados.

## Ramos da Estatística: Entendendo as Diferenças

A estatística é um campo vasto e diversificado, com muitos subcampos especializados, mas, para fins de introdução, podemos dividir a estatística em três ramos principais: estatística discreta, estatística inferencial e estatística probabilística. Vamos entender um pouco mais sobre cada um deles.

### Estatística Discreta

A **estatística discreta** lida com dados que podem ser contados, ou seja, dados que assumem valores específicos e separados. Por exemplo, o número de usuários em um site, a quantidade de vendas realizadas em uma loja ou o número de estudantes em uma sala de aula. Esses são todos exemplos de dados discretos, e a estatística discreta nos fornece as ferramentas para analisar e interpretar esses dados.

> A estatística discreta é responsável por descrever, estruturar e sintetizar informações por meio de ferramentas como tabelas, gráficos e medidas, proporcionando uma visualização clara e compreensível dos dados.

### Estatística Inferencial

A **estatística inferencial**, por outro lado, é o ramo da estatística que nos permite fazer inferências sobre uma população com base em uma amostra dessa população. Por exemplo, se quisermos saber a altura média dos brasileiros, não seria prático (ou mesmo possível) medir a altura de todos os brasileiros. Ao invés disso, poderíamos medir a altura de uma amostra representativa de brasileiros e, em seguida, usar a estatística inferencial para estimar a altura média de toda a população.

> A estatística inferencial emprega uma série de métodos sofisticados para extrapolar e aplicar os resultados obtidos a partir de uma amostra específica a uma população maior e mais abrangente.

### Estatística Probabilística

Finalmente, a **estatística probabilística** é o ramo da estatística que lida com a incerteza. Ela nos permite quantificar a incerteza, fazer previsões sobre eventos futuros e entender a variabilidade nos dados. Por exemplo, a estatística probabilística pode nos ajudar a prever a probabilidade de um usuário clicar em um anúncio, ou a chance de um time de futebol ganhar um jogo.

> A estatística probabilística utiliza princípios de incerteza e aleatoriedade para modelar e prever comportamentos futuros. Ela nos permite quantificar a probabilidade de um evento ocorrer, fornecendo uma base sólida para tomada de decisões em situações de incerteza.

Cada um desses ramos da estatística tem seu próprio conjunto de técnicas e métodos, e todos eles são fundamentais para a análise de dados e a Data Science. Ao longo deste post, vamos explorar esses conceitos em mais detalhes e mostrar como eles podem ser aplicados na prática.

## A Origem dos Dados: Onde Tudo Começa

Os dados são o coração da análise de dados e da Data Science. Mas de onde eles vêm? Nesta seção, vamos explorar as diferentes fontes de dados e como elas podem impactar nossas análises.

### Pesquisa de Campo

A **pesquisa de campo** é uma das formas mais comuns de coleta de dados. Ela envolve a coleta direta em "campo", ou seja, no ambiente natural onde o fenômeno que estamos estudando acontece e durante sua ocorrência. Isso pode envolver a realização de entrevistas, a observação direta de comportamentos ou a coleta de amostras físicas. Os dados coletados por meio da pesquisa de campo são frequentemente ricos e detalhados, mas também podem ser demorados e caros para coletar.

Vejamos um exemplo... Suponha que você seja um cientista de dados trabalhando para uma empresa de transporte público. Você quer entender melhor como os passageiros usam o serviço de ônibus da cidade. Para isso, você decide realizar uma pesquisa de campo. Você e sua equipe vão até várias paradas de ônibus em diferentes momentos do dia e entrevistam os passageiros. Vocês perguntam sobre seus padrões de viagem, suas opiniões sobre o serviço e suas sugestões para melhorias. Os dados coletados nesta pesquisa de campo fornecem uma rica fonte de informações que você pode usar para melhorar o serviço de ônibus.

### Respostas de Experimentos

Outra fonte comum de dados são as **respostas de experimentos**. Em um experimento, manipulamos uma ou mais variáveis e observamos como isso afeta outras variáveis. Os experimentos são uma maneira poderosa de estabelecer relações causais, mas também podem ser complexos e desafiadores para projetar e implementar corretamente.

Por exemplo, imagine que você é um cientista de dados em uma empresa de comércio eletrônico. Você quer saber se a mudança na cor do botão "Comprar agora" em seu site afetará a taxa de conversão. Para descobrir isso, você configura um experimento. Metade dos visitantes do site vê o botão na cor original (azul), enquanto a outra metade vê o botão em uma cor diferente (verde). Depois de coletar dados por algumas semanas, você analisa os resultados e descobre que a cor do botão tem um impacto significativo na taxa de conversão. Este é um exemplo de como os dados coletados a partir de respostas de experimentos podem ser usados para embasar decisões de negócios.

Como você pode perceber, cada fonte de dados tem suas próprias vantagens e desvantagens, e a sua escolha pode ter um grande impacto na qualidade e na utilidade de nossas análises.

## Tempo de Coleta de Dados: Quando e Como Coletamos Dados

O tempo de coleta de dados também é um aspecto crucial que pode influenciar a qualidade e a utilidade dos dados coletados. Vamos explorar seus diferentes tempos e como eles podem impactar nossas análises.

### Coleta Contínua de Dados

A **coleta contínua de dados** ocorre quando os dados são coletados de maneira constante ao longo do tempo. Por exemplo, uma empresa de comércio eletrônico pode coletar dados sobre as atividades dos usuários em seu site em tempo real. Isso permite que a empresa monitore o comportamento dos usuários, detecte tendências e responda rapidamente a quaisquer problemas que possam surgir.

### Coleta Periódica de Dados

A **coleta periódica de dados** ocorre em intervalos regulares. Por exemplo, uma empresa pode realizar uma pesquisa de satisfação do cliente a cada trimestre. Isso permite que o negócio acompanhe a satisfação de seus consumidores ao longo do tempo e identifique quaisquer mudanças ou tendências.

### Coleta Ocasional de Dados

A **coleta ocasional de dados** ocorre em momentos específicos e não regulares. Por exemplo, uma organização sem fins lucrativos pode realizar uma pesquisa de doadores após uma grande campanha de arrecadação de fundos. Esses dados podem ajudar a organização a entender o sucesso da campanha e planejar futuras iniciativas de arrecadação.

## Unidade Elementar e Variável: Entendendo os Componentes dos Dados

Ao trabalhar com dados, é importante entender os conceitos de unidade elementar e variável. Esses são os componentes básicos dos dados que coletamos e analisamos.

### Unidade Elementar

A **unidade elementar** é o objeto sobre o qual as informações são coletadas. Por exemplo, se estamos realizando uma pesquisa de satisfação do cliente, cada cliente que responde à pesquisa é uma unidade elementar. Se estamos analisando dados de vendas, cada venda individual pode ser considerada uma unidade elementar.

### Variável

A **variável**, por outro lado, é a característica específica que estamos interessados em medir e que faz parte da unidade elementar. Por exemplo, em nossa pesquisa de satisfação do cliente, a satisfação do cliente é a variável que estamos medindo. Em nossa análise de dados de vendas, a quantidade de vendas pode ser a variável.

As variáveis podem ser de diferentes tipos, dependendo da natureza das informações que elas representam. Vamos explorar dois tipos principais de variáveis: qualitativas e quantitativas.

#### Variável Qualitativa

Uma **variável qualitativa**, também conhecida como variável categórica, é aquela que expressa uma qualidade ou característica. Ela representa uma classificação dos indivíduos em categorias, de acordo com alguma característica ou atributo que possuam. As variáveis qualitativas podem ser divididas em três tipos: nominal, ordinal e dicotômica.

- **Nominal**: Este tipo de variável qualitativa categoriza os indivíduos sem estabelecer uma ordem ou hierarquia entre as categorias. Por exemplo, a cor dos olhos (azul, verde, castanho) é uma variável nominal, pois não existe uma ordem natural entre azul, verde e castanho.
- **Ordinal**: As variáveis ordinais, por outro lado, representam categorias que possuem uma ordem ou hierarquia. Por exemplo, a classificação de um hotel (1 estrela, 2 estrelas, 3 estrelas, etc.) é uma variável ordinal, pois existe uma ordem natural entre as categorias.
- **Dicotômica**: Este é um caso especial de variável qualitativa que possui apenas duas categorias. Por exemplo, a variável "sexo" (masculino, feminino) é uma variável dicotômica.

#### Variável Quantitativa

Uma **variável quantitativa**, como o próprio nome sugere, representa uma quantidade ou um número. Ela é expressa em termos numéricos que fazem sentido em operações matemáticas como somar, subtrair, multiplicar e dividir. As variáveis quantitativas podem ser divididas em dois tipos: discreta e contínua.

- **Discreta**: Uma variável quantitativa discreta é aquela que pode assumir apenas um número finito ou contável de valores. Esses valores geralmente representam contagens ou números inteiros. Por exemplo, o número de filhos em uma família, o número de vendas realizadas em uma loja ou o número de alunos em uma sala de aula são exemplos de variáveis discretas.
- **Contínua**: Uma variável quantitativa contínua, por outro lado, pode assumir qualquer valor dentro de um intervalo específico. Esses valores geralmente representam medidas ou pesos. Por exemplo, a altura de uma pessoa, o tempo que um usuário passa em um site ou a distância percorrida por um carro são exemplos de variáveis contínuas.

## Conclusão: O Início de Uma Jornada

Chegamos ao fim deste nosso primeiro artigo introdutório sobre estatística voltada para análise de dados e Data Science. Mas lembre-se, este é apenas o começo de uma jornada de aprendizado.

Neste post, exploramos a origem da estatística, seus diferentes ramos, as fontes de dados, o tempo de coleta e os conceitos de unidade elementar e variável. Cada um desses tópicos é fundamental para entender como a estatística funciona e como ela pode ser aplicada na análise de dados e Data Science.

Espero que este artigo tenha despertado seu interesse pela estatística e que você esteja ansioso para aprender mais. Nos próximos artigos desta série, vou aprofundar cada um desses tópicos e explorar novos conceitos e técnicas.

Até o próximo artigo!