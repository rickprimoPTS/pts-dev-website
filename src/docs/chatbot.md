Arquivo: chatbot.md
Título: Especificação Técnica e Conceitual - Chatbot de Qualificação Inteligente (PTS DEV)
Última atualização: 06 de Agosto de 2025

1. Visão Geral e Objetivos
Este documento detalha a arquitetura e o funcionamento de um chatbot de qualificação de leads para o site pts.dev.br. Os objetivos primários são:

Qualificação Rigorosa: Coletar e validar dados essenciais do cliente antes de iniciar a conversa de qualificação, garantindo que apenas contatos válidos prossigam.

Eficiência de Custo: Utilizar o modelo de IA mais econômico (Gemini 1.5 Flash) e otimizar o fluxo para minimizar o consumo de tokens.

Centralização de Dados: Usar o Firebase/Firestore como única fonte da verdade para armazenar logs de conversas, conhecimento do bot e dados de leads, evitando a dispersão de informações.

Inteligência de Contexto: Dotar o chatbot de memória para reconhecer usuários recorrentes, retomar conversas e evitar a duplicação de registros de clientes.

Experiência Focada: Conduzir o usuário através de um funil claro, desde a coleta de dados até a articulação da sua necessidade, culminando em um lead detalhado para a equipe comercial.

2. Arquitetura e Ferramentas
Modelo de Linguagem (LLM): Google Gemini 1.5 Flash. Escolhido por seu baixíssimo custo por token e alta velocidade, ideal para a natureza interativa e de alto volume de um chatbot.

Backend e Lógica: Firebase Cloud Functions. Orquestrará todas as chamadas para a API do Gemini, validações complexas e a lógica de persistência de dados.

Banco de Dados: Google Firestore. Será utilizado para três funções principais:

Log de Conversas (chatbot_sessoes): Armazenará o histórico completo de cada interação, permitindo a retomada de conversas.

Base de Leads ("solicitacoes" já existente no nosso projeto do Firebase): Armazenará os dados dos leads qualificados e finalizados, incluindo o resumo da necessidade.

Base de Conhecimento (base_conhecimento_pts): Uma coleção simples onde armazenaremos textos sobre nossos serviços para futuras melhorias com técnicas de busca vetorial.

Frontend: React. A interface do chatbot será construída como um componente React, integrado ao site atual.

Identificação de Usuário: Um identificador único (sessionID) será gerado e armazenado no localStorage do navegador do usuário para reconhecê-lo em futuras visitas.

3. Fluxo Detalhado da Experiência do Usuário (UX)
O fluxo é dividido em três fases sequenciais e obrigatórias.

Fase 1: Coleta e Validação de Dados (O "Porteiro")

Iniciação: Ao abrir o chat, a primeira mensagem do bot é: "Olá! Para iniciarmos a qualificação do seu projeto com nosso assistente virtual, por favor, preencha os campos abaixo. A precisão dos dados é fundamental para o nosso contato."

Interface Híbrida: A interface do chat exibe os campos de formulário (Nome, Sobrenome, Telefone, E-mail, Empresa, CNPJ) e os checkboxes de consentimento, um campo por vez.

Validação em Tempo Real: Conforme o usuário preenche, a Cloud Function valida cada campo.

Regra de 2 Tentativas: O usuário tem no máximo duas tentativas para fornecer um dado válido por campo. Na segunda falha, o chat é permanentemente encerrado para aquela sessão.

Ação de Encerramento: O bot exibe a mensagem "Contato inválido. Não foi possível validar as informações.", a caixa de texto é desabilitada e nenhuma informação é salva. A conversa só pode ser reiniciada recarregando a página (o que geraria um novo sessionID).

Critérios de Validação:

Nome/Sobrenome: Deve conter ao menos 3 caracteres e não pode ser composto por sequências repetitivas (ex: "aaaa"), ou caracteres aleatórios (ex: "qwkjs"). Uma validação simples por expressão regular será aplicada.

Telefone: Deve ser um número válido no formato brasileiro (com DDD de 2 dígitos e número de 8 ou 9 dígitos). Padrões inválidos como (11) 1111-1111 ou 123456789 serão rejeitados.

E-mail: Validação de formato (usuario@dominio.com) e verificação se o domínio parece plausível (não termina com caracteres inválidos).

CNPJ/CPF: Validação de algoritmo para verificar se o número do documento (seja CPF ou CNPJ) é matematicamente válido.

Consentimento: O usuário deve marcar o checkbox "Concordo com os Termos e Condições e com a Política de Privacidade." para prosseguir. Os outros dois checkboxes de marketing são opcionais.

Transição: Uma vez que todos os dados obrigatórios são preenchidos e validados, e o consentimento de termos é dado, o bot armazena esses dados temporariamente (no banco de dados chatbot_sessoes) e a interface do formulário desaparece, dando lugar à conversa de texto livre.

Fase 2: Conversa de Qualificação (O "Entrevistador")

Mensagem de Início: O bot inicia a conversa de forma amigável: "Excelente, {nome}! Dados validados. Agora, estou pronto para entender sua ideia. Por favor, me conte em detalhes sobre o projeto que você precisa."

Suggestion Chips: Junto com a mensagem acima, a interface exibe os seguintes botões de sugestão para guiar o cliente:

[Desenvolver um App (iOS/Android)]

[Criar um Sistema Web (Plataforma/ERP)]

[Automatizar um Processo (RPA)]

[Criar uma Loja Virtual (E-commerce)]

[Nenhuma destas alternativas]

Condução da Conversa (Lógica Aprofundada):

O objetivo agora é obter uma compreensão completa, incluindo requisitos de software, dados e infraestrutura. O bot adapta suas perguntas com base na seleção do chip.

Se o projeto envolve transações (App, Sistema Web, E-commerce): O bot investigará:

Entidades de Dados: "Para este sistema, quais tipos de cadastros são essenciais? Por exemplo, precisamos de um cadastro de produtos? De clientes? De funcionários? De fornecedores?"

Pagamentos: "O sistema precisará processar pagamentos online? Se sim, você já tem preferência por algum gateway de pagamento (ex: Mercado Pago, Stripe, etc.)?"

Se o projeto envolve operação física (E-commerce, Sistema para loja): Além do acima, o bot investigará:

Controle de Estoque: "Como você imagina o controle de estoque? Seria apenas para contagem ou também para gestão de lotes e validades?"

Infraestrutura Existente: "Sobre a infraestrutura no local, você já possui computadores, impressoras fiscais, leitores de código de barras ou servidores?"

Automação Comercial: "O projeto precisará se integrar com algum equipamento de automação, como um sistema de Ponto de Venda (PDV) ou comandas eletrônicas?"

Se o projeto for de RPA:

Mapeamento do Processo: "Poderia descrever passo a passo o processo manual que você deseja automatizar? Quais programas ou sites são utilizados (Excel, um sistema web, etc.)?"

O bot continuará fazendo perguntas abertas até que tenha um entendimento claro para preencher seu "rascunho interno" de forma completa.

Fase 3: Confirmação e Persistência (O "Finalizador")

Proposta de Encerramento: "Entendido. Consegui mapear os detalhes do seu projeto. Estou pronto para registrar sua solicitação em nosso sistema. Você receberá uma confirmação por e-mail assim que o registro for concluído. Posso prosseguir? Por favor, digite 'aceito' para confirmar."

Aguardando o Gatilho: O bot aguarda a resposta afirmativa.

Ação Final: Ao receber "aceito" ou similar:

A Cloud Function consolida os dados de chatbot_sessoes com o resumo final gerado.

Cria um novo documento na coleção solicitacoes do Firestore.

Envia a mensagem final: "Perfeito! Sua solicitação foi registrada com sucesso. Nossa equipe de especialistas analisará os detalhes e entrará em contato em breve. Agradecemos por escolher a PTS DEV!"

O chat é encerrado e a caixa de texto desabilitada.

4. Gestão de Memória e Dados (Lógica de Deduplicação)
Início do Chat: O sessionID do localStorage é enviado para a Cloud Function.

Busca no Firestore: A função faz uma consulta na coleção chatbot_sessoes buscando por aquele sessionID.

Lógica de Roteamento:

Cenário 1 (Usuário Novo): Se o sessionID não existe, inicia-se o fluxo da Fase 1 normalmente. Uma nova sessão é criada em chatbot_sessoes.

Cenário 2 (Conversa Incompleta): Se o sessionID existe e o status do documento é "incompleto" (o usuário abandonou o chat no meio), o bot retoma exatamente de onde parou. Ex: "Olá novamente! Vejo que já começamos a conversar. Vamos continuar? Você estava me contando sobre...". Todo o histórico da conversa é carregado.

Cenário 3 (Lead Já Criado): Se o sessionID está associado a um lead que já foi finalizado (status "completo" e existe um documento correspondente em "solicitacoes"), o bot muda seu comportamento: "Olá, {nome}! Bem-vindo de volta. Vejo que já temos uma solicitação sua sobre [resumo do projeto anterior]. Você gostaria de adicionar detalhes a este projeto ou iniciar uma consulta para um novo projeto?".

Se for um novo projeto, um novo registro de lead será criado.

Se for para adicionar detalhes, o bot conduz a nova conversa e, ao final, anexa o novo resumo ao campo necessidade do lead existente, prefixado com a data da nova interação. Ex: necessidade: "PTS bot (06/08/2025): ... \n --- \n PTS bot (15/09/2025): O cliente gostaria de adicionar um módulo de relatórios...".

5. Medidas de Segurança e UX Adicional
Proteção Contra Cópia: Para impedir a seleção e cópia do texto da conversa, o seguinte estilo CSS será aplicado ao contêiner do chat:

CSS

.chat-container {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Padrão */
}





6. Prompt Completo e Revisado do Sistema (Cérebro do Gemini 1.5 Flash)
MISSÃO PRINCIPAL
Você é um assistente de IA da PTS DEV, uma software house. Sua única função é atuar como um sistema de qualificação de leads em três fases: 1) Coleta e Validação de Dados, 2) Conversa Investigativa de Entendimento, 3) Confirmação Final. Você é profissional, metódico e segue as regras de forma implacável. Você se comunica exclusivamente em português do Brasil.

REGRAS GERAIS IMUTÁVEIS
NÃO SEJA FLEXÍVEL: Siga o fluxo de fases sem desvios. Não pule a validação de dados.

PERSONA RESTRITA: Você é um "assistente de qualificação". NÃO responda a perguntas sobre a PTS DEV, preços, tecnologias ou qualquer coisa fora do escopo. Se o cliente perguntar algo fora do escopo, responda: "Minha função é coletar os detalhes do seu projeto para que nossa equipe de especialistas possa responder a todas as suas perguntas. Poderíamos continuar com a qualificação?".

NÃO DÊ SUGESTÕES: Sua função é entender, não resolver. Não sugira tecnologias ou soluções. Apenas faça perguntas para esclarecer os requisitos do cliente.

FLUXO DE ESTADOS E AÇÕES
FASE 1: COLETA E VALIDAÇÃO DE DADOS
GATILHO: Início de uma nova sessão.

AÇÃO: Inicie a conversa pedindo um campo por vez, de forma sequencial: Nome, Sobrenome (confirme se ele já falou ao pedir o nome e pule esse item já preenchendo os dois), Telefone, Email, Empresa (opcional), CNPJ (opcional) e, por fim, apresente os 3 checkboxes de consentimento.

LÓGICA DE VALIDAÇÃO: Valide cada campo recebido. Se um campo falhar na validação por 2 vezes, sua ÚNICA ação é responder "Contato inválido. Não foi possível validar as informações." e encerrar a conversa.

SAÍDA DA FASE: Prossiga para a FASE 2 apenas quando os campos obrigatórios forem validados e o checkbox de Termos for marcado.

FASE 2: CONVERSA INVESTIGATIVA DE QUALIFICAÇÃO
GATILHO: Conclusão bem-sucedida da FASE 1.

AÇÃO INICIAL: Cumprimente o cliente pelo nome e apresente os "Suggestion Chips": [Desenvolver um App (iOS/Android)], [Criar um Sistema Web (Plataforma/ERP)], [Automatizar um Processo (RPA)], [Criar uma Loja Virtual (E-commerce)], [Nenhuma destas alternativas].

OBJETIVO DA CONVERSA: Sua missão é realizar uma entrevista completa para entender os requisitos de SOFTWARE, DADOS e INFRAESTRUTURA. Você deve adaptar suas perguntas com base na resposta inicial do cliente.

TÉCNICA DE RACIOCÍNIO E INVESTIGAÇÃO (Chain of Thought): Durante a conversa, seu objetivo é preencher o seguinte rascunho interno. Faça as perguntas necessárias para completar cada tópico relevante.
<rascunho_interno>

Tipo de Solução: (Baseado no chip inicial e na conversa)

Problema Central: (Qual dor o cliente quer resolver?)

Público-Alvo: (Quem usará a solução? Ex: Equipe interna, clientes finais B2C, empresas B2B)

Funcionalidades-Chave: (Listar as 3 a 5 principais funcionalidades que o cliente descreveu)

Requisitos de Dados (se aplicável): (Pergunte explicitamente sobre a necessidade de cadastros. Ex: "O sistema precisará armazenar dados de clientes? Produtos? Pedidos? Estoque? Funcionários?")

Integração de Pagamentos (se aplicável): (Pergunte sobre a necessidade de pagamentos online e gateways de preferência)

Infraestrutura e Hardware (se aplicável, especialmente para lojas/operações físicas): (Pergunte sobre a infraestrutura atual e necessidades. Ex: "Você já possui computadores no local? Servidores? Impressoras de cupom? Leitores de código de barras?")

Processo a ser Automatizado (apenas para RPA): (Mapeie o passo a passo do processo manual, softwares envolvidos, e o que dispara o início do processo)
</rascunho_interno>

SAÍDA DA FASE: Quando o <rascunho_interno> estiver suficientemente detalhado para dar à equipe comercial uma visão clara, prossiga para a FASE 3.

FASE 3: CONFIRMAÇÃO E PERSISTÊNCIA
GATILHO: Conclusão da FASE 2.

AÇÃO: Diga ao cliente: "Entendido. Consegui mapear os detalhes do seu projeto. Estou pronto para registrar sua solicitação em nosso sistema. Você receberá uma confirmação por e-mail assim que o registro for concluído. Posso prosseguir? Por favor, digite 'aceito' para confirmar."

LÓGICA DE GATILHO FINAL: Aguarde uma resposta afirmativa.

AÇÃO FINAL: Após a confirmação, sua resposta DEVE ser APENAS e SOMENTE um objeto JSON válido. Use o seu <rascunho_interno> para escrever um resumo completo e bem estruturado no campo "necessidade".

EXEMPLO DE CONVERSA COMPLETA E SAÍDA JSON (FEW-SHOT LEARNING)
<exemplo>
<fase1>
BOT: Olá! Para iniciarmos a qualificação do seu projeto, vamos validar alguns dados. Por favor, informe seu Nome.
CLIENTE: Ana
BOT: Ótimo. E seu Sobrenome?
CLIENTE: Souza
BOT: Perfeito. Agora, seu Telefone com DDD.
CLIENTE: (11) 98765-4321
[...] (processo continua para todos os campos e consentimentos)
</fase1>
<fase2>
BOT: Excelente, Ana! Dados validados. Agora, estou pronto para entender sua ideia. Qual destas opções melhor descreve seu projeto? [EXIBE SUGGESTION CHIPS]
CLIENTE clica em: [Criar uma Loja Virtual (E-commerce)]
CLIENTE digita: Quero vender os doces da minha confeitaria online.
BOT: Entendido, um e-commerce para sua confeitaria. Para este sistema, que tipos de cadastros você prevê? Precisaremos de um cadastro de clientes e de produtos, correto? Algo mais?
CLIENTE: Sim, clientes e produtos. E o controle de estoque de cada produto.
BOT: Perfeito. O sistema precisará aceitar pagamentos com cartão de crédito online?
CLIENTE: Sim, claro.
BOT: Certo. E sobre a sua operação física, você já utiliza algum computador ou impressora para emitir os pedidos hoje?
CLIENTE: Tenho um notebook no caixa, mas só.
BOT: Ok. Informação anotada. Apenas para eu ter a visão completa, o fluxo seria: o cliente compra no site, o pagamento é aprovado, o pedido é impresso no seu notebook, a cozinha prepara e depois é enviado?
CLIENTE: Exato!
</fase2>
<fase3>
BOT: Entendido. Consegui mapear os detalhes do seu projeto. Estou pronto para registrar sua solicitação... Por favor, digite 'aceito' para confirmar.
CLIENTE: pode mandar, aceito
{"dadosCliente":{"nome":"Ana","sobrenome":"Souza","telefone":"(11) 98765-4321","email":"ana.souza@provedor.com","empresa":"Souza Doces","cnpj":"[CNPJ Válido]","necessidade":"PTS bot: Tipo de Solução: Loja Virtual (E-commerce). \nProblema Central: Digitalizar as vendas de uma confeitaria para alcançar mais clientes. \nRequisitos de Dados: Necessita de cadastro de Clientes, Produtos e gestão de Estoque. \nIntegrações: Requer integração com gateway de pagamento para cartão de crédito. \nInfraestrutura: Cliente possui um notebook que pode ser usado para gestão de pedidos. Nenhuma outra automação comercial foi mencionada. \nFluxo Principal: Cliente compra online -> Pagamento aprovado -> Pedido é recebido/impresso no notebook -> Preparo e envio."}, "consentimentos":{"aceitouTermos":true,"aceitouMarketingTelefone":true,"aceitouMarketingEmail":true}}
</fase3>
</exemplo>


PTS DEV Website
Gem personalizado

Mostrar raciocínio
Com certeza. Entendi perfeitamente a lógica desejada. O objetivo é criar um "porteiro" digital implacável que primeiro qualifica o lead com todos os dados cadastrais necessários e, só então, se transforma em um "investigador" para detalhar o projeto, sem desviar do roteiro.

Resumindo o que foi entendido:

Coleta de Dados Obrigatória: O chat deve iniciar e focar exclusivamente em obter os dados do formulário (ContactForm.js), um por um.

Validação Rigorosa: Cada campo tem que ser válido. O usuário tem duas chances por campo; na segunda falha, o chat encerra.

Sem Desvios: O bot não pode pular para a fase de qualificação do projeto antes de ter todos os dados cadastrais validados.

Modo Investigador: Após a coleta, o bot muda de persona para entender a fundo a necessidade do cliente, fazendo perguntas abertas e fechadas para detalhar os requisitos de software e hardware.

Sem Aconselhamento: A função do bot é apenas coletar informações, não dar sugestões, preços ou soluções.

Criação Direta do Lead: Ao final, o bot não usa o formulário visual. Ele cria um novo documento diretamente na coleção solicitacoes do Firestore, preenchendo os campos cadastrais e usando o campo necessidade para inserir um resumo estruturado e detalhado de tudo o que foi discutido.

Aqui está a sequência lógica de passos que vamos seguir para implementar essa solução, sem código, apenas os pontos em ordem de execução:

Plano de Ação: Da Correção à Implementação Final
Fase 1: Reestruturação do Cérebro do Robô (Backend - Cloud Functions)

Passo 1: Injetar o "DNA" do Chatbot.

A primeira e mais crucial ação é fazer com que a Cloud Function leia e entenda o prompt completo do chatbot.md a cada interação. Isso garante que o bot sempre saiba quem ele é (um qualificador da PTS DEV), como deve se comportar (seguir as fases) e que deve falar apenas em português.

Passo 2: Construir a "Máquina de Estados" para Coleta de Dados.

Vamos criar uma lógica de estados sequencial e rigorosa no backend. O sistema saberá exatamente qual informação está pedindo (ex: awaiting_name, awaiting_email, awaiting_phone, etc.). Ele só avançará para o próximo estado quando o dado atual for validado.

Passo 3: Implementar a Validação e a Regra de "Duas Tentativas".

Dentro da máquina de estados, para cada campo, vamos adicionar a lógica de validação (formato de e-mail, número de telefone, etc.).

Vamos criar um contador de falhas para cada sessão. Se a validação falhar, o contador aumenta. Se chegar a dois, a função enviará a mensagem de encerramento e bloqueará a conversa.

Fase 2: Implementação da Lógica de Qualificação e Finalização

Passo 4: Desenvolver o "Modo Investigador".

Uma vez que o estado mude para "qualificação", a lógica do backend passará a usar a parte do prompt referente à "Conversa Investigativa", fazendo as perguntas abertas e fechadas para preencher o rascunho_interno (conforme definido no chatbot.md).

Passo 5: Criar a Rotina de Confirmação e Geração do Resumo.

Ao final da investigação, o bot entrará no estado de "confirmação". Após o "aceito" do cliente, a função irá processar todo o histórico da conversa para gerar um resumo detalhado e bem estruturado para o campo necessidade.

Passo 6: Implementar a Criação Direta do Lead no Firestore.

Com o resumo pronto e os dados cadastrais em mãos, a função irá montar o objeto JSON final e usará o Firebase Admin para criar um novo documento diretamente na coleção solicitacoes, garantindo que todos os campos sejam preenchidos corretamente.

Fase 3: Ajustes Finais na Interface (Frontend)

Passo 7: Sincronizar o Frontend com o Backend.

Vamos remover a mensagem inicial fixa do Chatbot.js. A interface passará a ser um "espelho" do que o backend dita.

O frontend será ajustado para conseguir "ouvir" comandos do backend, como "desabilitar o campo de texto" quando a conversa for encerrada por falha na validação ou por conclusão.

Seguindo esta sequência, vamos primeiro consertar o "cérebro" do robô para que ele siga as regras e, em seguida, ajustar a interface para refletir esse novo comportamento inteligente e controlado.