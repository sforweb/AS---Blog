const e=`---
title: Por que arquivos .txt superam PDFs no treinamento de LLMs?
date: 2024-04-14
excerpt: Você sabe tudo o que o marketing realmente abrange? Descubra as áreas que fazem uma marca se destacar e como usá-las no seu negócio.
category: Tecnologia
author: Alexandre Spada
authorAvatar: /images/team/foto-de-perfil.png
authorRole: Fundador
image: /images/blog/treinamento-de-llms-com-txt.png
readTime: "5 min de leitura"
featured: true
tags: [LLM, IA]
---

À medida que os modelos de linguagem se tornam cada vez mais onipresentes em nossas vidas, explorar ao máximo as suas capacidades para que possamos atingir nossos objetivos tornou-se uma prioridade repleta de desafios. Um desses desafios é a necessidade de trabalhar com modelos de linguagem que sejam especializados em assuntos ou áreas específicas.

Você sabia que é possível treinar LLMs, como o GPT, para que tenham e acessem conhecimentos específicos que nos ajudem em nossas tarefas? Esse treinamento pode ser realizado de diversas maneiras, utilizando diferentes tipos de materiais para capacitar o modelo.

No entanto, após uma série de experimentos com várias LLMs, percebi que nem todos os formatos de arquivo (texto, áudio, vídeo, etc.) apresentam o mesmo desempenho quando se trata de treinar esses modelos de forma eficiente e precisa. E é exatamente sobre isso que quero conversar neste post.

## O problema

Tenho trabalhado em vários projetos que requerem a análise de conteúdos específicos, repletos de grandes quantidades de conhecimento especializado. Nestes casos, como buscamos respostas ou a geração de conhecimento específico, não podemos simplesmente recorrer à base de conhecimento de treinamento de LLMs como o ChatGPT, que são treinadas com uma base de conhecimento genérica.

A solução para esses casos é treinar o LLM com o conhecimento específico que queremos que ele maneje. Esse conhecimento pode vir de diversos lugares e assumir vários formatos, como artigos científicos, livros, websites, históricos de atendimento e qualquer outro tipo de fonte de informação.

Porém, em alguns testes, notei que os LLMs não trabalham igualmente bem com qualquer formato de arquivo para seu treinamento. Ao fornecer a base de treino em arquivos PDF, eu obtinha respostas mais genéricas e vagas do que quando utilizava arquivos .txt, o que revela uma dificuldade da IA em ler e interpretar alguns formatos de arquivo.

## Por que isso acontece?

Os arquivos PDF são criados principalmente com o objetivo de preservar o layout visual de documentos impressos, o que significa que eles são ótimos para serem lidos por humanos, mas representam um desafio para as máquinas. A estrutura de um PDF pode incluir múltiplos layouts de página, colunas, caixas de texto posicionadas arbitrariamente, imagens e elementos gráficos, como gráficos e tabelas. Esses elementos são frequentemente colocados de maneira que maximizem a estética e a funcionalidade na impressão e na visualização em tela, mas não necessariamente em uma ordem que faça sentido para o processamento sequencial de texto.

Por exemplo, um PDF pode apresentar colunas de texto que são visualmente paralelas, mas que devem ser lidas sequencialmente de cima para baixo e depois da esquerda para a direita. Este layout pode confundir os algoritmos de extração de texto que tentam interpretar o conteúdo, resultando em blocos de texto que são extraídos fora de ordem. Além disso, textos embutidos em imagens dentro de arquivos PDF muitas vezes requerem o uso de tecnologia de Reconhecimento Óptico de Caracteres (OCR) para serem convertidos em texto processável, um processo que pode introduzir erros e imprecisões.

Por outro lado, os arquivos .txt são incrivelmente mais simples e são compostos exclusivamente por texto, sem formatações complexas ou elementos gráficos. Esta simplicidade faz com que sejam ideais para o processamento por modelos de linguagem, pois garantem que o texto esteja em uma forma pura e linear, facilitando a interpretação e aprendizado do modelo. Quando documentos complexos são convertidos para o formato .txt, todos os elementos visuais e de formatação são removidos, deixando apenas o texto puro. Isso elimina as ambiguidades sobre a ordem de leitura e garante que o modelo de linguagem possa focar no conteúdo textual sem ser confundido por layouts complexos ou informações visuais não textuais.

Converter documentos para .txt também pode ajudar a padronizar o treinamento de dados para LLMs, tornando o processo mais eficiente. Os modelos podem se concentrar em desenvolver uma compreensão mais profunda da linguagem e da estrutura do conteúdo sem gastar recursos computacionais tentando decifrar layouts complicados ou erros de OCR. Este foco na simplicidade e clareza do conteúdo textual não apenas melhora a precisão da aprendizagem do modelo, mas também aumenta a generalidade e a aplicabilidade do conhecimento adquirido.

## Experimento Prático: Avaliando o Mistral 7B com Ollama

O principal objetivo deste experimento foi testar a capacidade de resposta e a eficácia do modelo de linguagem Mistral 7B quando operado localmente, utilizando o framework Ollama. Queríamos avaliar como diferentes formatos de arquivo influenciam a qualidade das respostas do modelo, especificamente comparando os resultados ao processar informações em formato PDF versus formato .txt.

Para realizar este teste, configuramos o Mistral 7B compilado para rodar localmente com a ajuda do Ollama. Foram selecionados dois conjuntos de dados: um em formato PDF e outro convertido para .txt, ambos contendo o mesmo conteúdo textual.

Os dados foram inseridos no modelo, e uma série de perguntas foram feitas para avaliar a compreensão do texto e a precisão das respostas geradas em cada formato. As perguntas foram projetadas para abordar o conteúdo específico contido nos documentos, permitindo-nos observar diretamente a eficácia do processamento de texto pelo modelo.

Os resultados foram bastante reveladores. Quando alimentado com o arquivo .txt, o Mistral 7B produziu respostas mais precisas, detalhadas e contextualmente relevantes. Por outro lado, o desempenho com o arquivo PDF foi notavelmente inferior, com respostas frequentemente vagas e, em alguns casos, incorretas ou irrelevantes. Isso confirmou nossa hipótese de que a simplicidade e a clareza dos arquivos .txt facilitam significativamente a tarefa de processamento dos LLMs.

Este experimento reforçou a importância de considerar o formato dos dados durante o treinamento de modelos de linguagem. A clareza com que um modelo pode "ler" e entender o material de treinamento tem um impacto direto na qualidade de sua performance. Assim, para maximizar a eficácia de um LLM, especialmente em aplicações específicas ou especializadas, é importante considerar formatos de dados que sejam mais compatíveis com as capacidades de processamento da IA.

## Conclusão

A eficiência na escolha do formato de arquivo para o treinamento de LLMs pode fazer uma diferença significativa na qualidade das respostas geradas. A simplicidade dos arquivos .txt permite que ensinemos de forma mais eficazmente nossos modelos de linguagem, garantindo que eles absorvam as informações de forma mais completa e precisa. Para quem trabalha com desenvolvimento de IA ou está interessado em explorar as capacidades dos modelos de linguagem, considerar o formato de treinamento é crucial para maximizar o potencial do modelo.

Espero que este post tenha ajudado a entender sobre como a preparação de dados pode impactar o treinamento de um LLM e inspirado você a considerar esses aspectos em seus próprios projetos de IA.

Se você tiver experiências próprias ou dúvidas sobre o treinamento de modelos de linguagem, sinta-se à vontade para compartilhá-las nos comentários abaixo. Vamos aprender juntos!`;export{e as default};
