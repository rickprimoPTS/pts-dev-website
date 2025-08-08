Arquivo: blog.md
Título: Plano de Evolução e Arquitetura - Módulo de Blog (PTS DEV)
Última atualização: 08 de Agosto de 2025
1. Visão Geral e Objetivos do Projeto
Este documento detalha o plano de implementação e evolução do módulo de blog para o site pts.dev.br. O objetivo principal é construir um sistema de gerenciamento de conteúdo (CMS) proprietário, utilizando a stack existente (React, Firebase), que seja tão funcional e intuitivo quanto plataformas de mercado como o Wix.

Os pilares do projeto são:

Controle Total: Manter 100% de propriedade sobre os dados, a lógica e a apresentação do conteúdo.

Experiência de Edição Rica: Evoluir de um campo de texto simples para um editor de blocos visual, permitindo a inserção de diversos tipos de conteúdo (imagens, vídeos, menção a produtos, etc.), inspirado no editor do Wix.

Apresentação Profissional: Exibir o conteúdo de forma organizada e profissional, com listagem de categorias e posts em formato de "cards".

Automação de Processos: Automatizar tarefas de manutenção, como a atualização do sitemap, para garantir máxima eficiência e performance de SEO.

2. Arquitetura Proposta
O sistema será composto por quatro componentes principais que se interligam:

2.1. Frontend (React): A camada de apresentação pública do blog, responsável por buscar e renderizar o conteúdo para os visitantes do site.

2.2. Banco de Dados (Firestore): A fonte da verdade para todo o conteúdo, incluindo posts, categorias e metadados.

2.3. Painel de Admin (React - Futuro): Uma área privada e segura do site onde o conteúdo será criado e gerenciado, eliminando a necessidade de editar o Firestore manualmente.

2.4. Automação (Cloud Functions - Futuro): Funções de backend que rodam na nuvem para automatizar tarefas em resposta a eventos no banco de dados.

3. Fase 1: Melhorias na Interface Pública (Implementação Imediata)
Esta fase foca em refinar a experiência do usuário na parte pública do blog, usando a estrutura de dados atual.

3.1. Exibição da Lista de Categorias
Para permitir a navegação e filtragem, a lista de categorias deve ser exibida na página principal do blog, similar ao menu lateral visto no exemplo.

Conexão Técnica:

O componente BlogList.js deve fazer uma segunda busca ao Firestore, desta vez na coleção blog_categorias.

A lista de categorias retornada será armazenada em um estado (useState).

No JSX, será feito um map nesta lista para renderizar cada categoria como um componente <Link> do react-router-dom, apontando para uma futura rota de categoria (ex: /blog/categoria/rpa).

3.2. Layout de Cards para Posts
A apresentação atual dos posts na página /blog já segue o modelo de cards. Este layout deve ser mantido e, futuramente, integrado a um layout de duas colunas, com as categorias na lateral e os cards de posts na área principal.

3.3. Inclusão do Formulário de Contato
Para maximizar as oportunidades de conversão, o formulário de contato deve estar presente em todas as páginas do blog.

Conexão Técnica:

Importar o componente ContactForm em BlogList.js e BlogPost.js.

Adicionar a tag <ContactForm /> ao final do JSX de ambos os componentes, garantindo que ele apareça após o conteúdo principal.

4. Fase 2: O Conceito Evolutivo - O Editor de Conteúdo "Estilo Wix"
Esta é a principal evolução conceitual para alcançar a flexibilidade do Wix. A proposta é abandonar o campo de texto único em Markdown e adotar um Editor Baseado em Blocos.

4.1. Nova Estrutura de Dados no Firestore
A mudança mais significativa será no campo conteudo dentro dos documentos da coleção blog_posts.

De: conteudo (Tipo: string)

Para: conteudo (Tipo: array)

Cada item neste array será um map (objeto) que representa um bloco de conteúdo, com um tipo e seus dados específicos.

Exemplo da Nova Estrutura:

JSON

"conteudo": [
  { "type": "header", "data": { "level": 2, "text": "Título da Seção" } },
  { "type": "paragraph", "data": { "text": "Este é um parágrafo de texto com <strong>negrito</strong> e <em>itálico</em>." } },
  { "type": "image", "data": { "url": "url_da_imagem.jpg", "caption": "Legenda da imagem." } },
  { "type": "youtube_video", "data": { "videoId": "ID_DO_VIDEO" } }
]
4.2. Lógica de Renderização no Frontend
Com a nova estrutura de dados, o componente BlogPost.js será modificado:

Conexão Técnica:

Ele não usará mais o <ReactMarkdown>.

Ele fará um map sobre o array post.conteudo.

Para cada objeto (bloco) no array, ele usará uma instrução switch no bloco.type para decidir qual componente React renderizar (<HeaderBlock>, <ParagraphBlock>, <ImageBlock>, etc.), passando bloco.data como props.

5. Fase 3: O Painel de Admin e Automação (Visão de Futuro)
Esta fase elimina completamente a necessidade de interação manual com o Firebase para gestão de conteúdo.

5.1. Interface do Painel de Admin
Será uma seção protegida do site (ex: /admin), inspirada na interface de gerenciamento de posts do Wix.

Conexão Técnica:

Autenticação: O acesso será protegido pelo Firebase Authentication. Apenas usuários com um determinado privilégio (ex: admin: true) poderão acessar.

Dashboard: Uma página que lista todos os posts, permitindo filtrar por status (Publicados, Rascunho) e com botões para editar ou criar um novo.

Editor: A página de criação/edição de post terá o Editor Baseado em Blocos (mencionado na Fase 2). Bibliotecas como Editor.js podem ser usadas para acelerar o desenvolvimento. O botão "+" do editor adicionará novos objetos ao array conteudo em tempo real.

5.2. Automação com Cloud Functions
Esta é a camada de inteligência que trabalha nos bastidores.

Conexão Técnica: Sitemap Automático

Gatilho: Uma Cloud Function será configurada para ser acionada (onWrite) sempre que um documento na coleção blog_posts for criado ou atualizado.

Lógica da Função:

A função verifica se o status do post é "publicado".

Se for, ela lê o arquivo sitemap.xml que estará armazenado no Firebase Storage.

Ela adiciona (ou atualiza) a URL do post no arquivo XML.

Salva o sitemap.xml modificado de volta no Storage.

(Opcional) Envia uma notificação para a API de Indexação do Google para acelerar o rastreamento da nova página.