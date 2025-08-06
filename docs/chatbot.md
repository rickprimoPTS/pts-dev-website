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

Base de Leads (leads): Armazenará os dados dos leads qualificados e finalizados, incluindo o resumo da necessidade.

Base de Conhecimento (base_conhecimento_pts): Uma coleção simples onde armazenaremos textos sobre nossos serviços para futuras melhorias com técnicas de busca vetorial.

Frontend: React. A interface do chatbot será construída como um componente React, integrado ao site atual.

Identificação de Usuário: Um identificador único (sessionID) será gerado e armazenado no localStorage do navegador do usuário para reconhecê-lo em futuras visitas.

3. Fluxo Detalhado da Experiência do Usuário (UX)
O fluxo é dividido em três fases sequenciais e obrigatórias.

Fase 1: Coleta e Validação de Dados (O "Porteiro")

Iniciação: Ao abrir o chat, a primeira mensagem do bot é: "Olá! Para iniciarmos a qualificação do seu projeto com nosso assistente virtual, por favor, preencha os campos abaixo. A precisão dos dados é fundamental para o nosso contato."

Interface Híbrida: A interface do chat exibe os campos de formulário (Nome, Sobrenome, Telefone, E-mail, Empresa, CNPJ) e os checkboxes de consentimento.

Validação em Tempo Real: Conforme o usuário preenche, a Cloud Function valida cada campo.

Regra de 2 Tentativas: O usuário tem no máximo duas tentativas para fornecer um dado válido por campo. Na segunda falha, o chat é permanentemente encerrado para aquela sessão.

Ação de Encerramento: O bot exibe a mensagem "Contato inválido. Não foi possível validar as informações.", a caixa de texto é desabilitada e nenhuma informação é salva. A conversa só pode ser reiniciada recarregando a página (o que geraria um novo sessionID).

Critérios de Validação:

Nome/Sobrenome: Deve conter ao menos 3 caracteres e não pode ser composto por sequências repetitivas (ex: "aaaa"), ou caracteres aleatórios (ex: "qwkjs"). Uma validação simples por expressão regular será aplicada.

Telefone: Deve ser um número válido no formato brasileiro (com DDD de 2 dígitos e número de 8 ou 9 dígitos). Padrões inválidos como (11) 1111-1111 ou 123456789 serão rejeitados.

E-mail: Validação de formato (usuario@dominio.com) e verificação se o domínio parece plausível (não termina com caracteres inválidos).

CNPJ/CPF: Validação de algoritmo para verificar se o número do documento (seja CPF ou CNPJ) é matematicamente válido.

Consentimento: O usuário deve marcar o checkbox "Concordo com os Termos e Condições e com a Política de Privacidade." para prosseguir. Os outros dois checkboxes de marketing são opcionais.

Transição: Uma vez que todos os dados obrigatórios são preenchidos e validados, e o consentimento de termos é dado, o bot armazena esses dados temporariamente (em memória na Cloud Function) e a interface do formulário desaparece, dando lugar à conversa de texto livre.

Fase 2: Conversa de Qualificação (O "Entrevistador")

Mensagem de Início: O bot inicia a conversa de forma amigável: "Excelente, {nome}! Dados validados. Agora, estou pronto para entender sua ideia. Por favor, me conte em detalhes sobre o projeto que você precisa."

Suggestion Chips: Junto com a mensagem acima, a interface exibe os seguintes botões de sugestão para guiar o cliente:

[Desenvolver um App (iOS/Android)]

[Criar um Sistema Web (Plataforma/ERP)]

[Automatizar um Processo (RPA)]

[Criar uma Loja Virtual (E-commerce)]

[Nenhuma destas alternativas]

Condução da Conversa:

O objetivo do bot é obter uma compreensão geral e abrangente da necessidade. Ele não se aprofunda em detalhes técnicos, a menos que o cliente os forneça voluntariamente.

Ele faz perguntas abertas como: "Interessante. Qual é o principal problema que este projeto visa resolver?", "Quem serão os principais usuários desta solução?", "Pode me dar um exemplo de como você imagina o funcionamento no dia a dia?".

A conversa continua até que o bot, com base no seu prompt, determine que possui informações suficientes para criar um resumo coeso.

Fase 3: Confirmação e Persistência (O "Finalizador")

Proposta de Encerramento: Ao ter a visão geral, o bot diz: "Entendido. Tenho uma boa visão geral do seu projeto. Estou pronto para registrar sua solicitação em nosso sistema. Você receberá uma confirmação por e-mail assim que o registro for concluído. Posso prosseguir? Por favor, digite 'aceito' para confirmar."

Aguardando o Gatilho: O bot aguarda a resposta do usuário.

Ação Final: Se o usuário responder com "aceito", "sim", "pode prosseguir", ou qualquer outra afirmação clara:

A Cloud Function pega os dados validados da Fase 1 e o resumo gerado da Fase 2.

Ela cria um novo documento na coleção leads do Firestore.

O bot envia a mensagem final: "Perfeito! Sua solicitação foi registrada com sucesso. Nossa equipe de especialistas analisará os detalhes e entrará em contato em breve. Agradecemos por escolher a PTS DEV!"

O chat é encerrado e a caixa de texto desabilitada.

4. Gestão de Memória e Dados (Lógica de Deduplicação)
Início do Chat: O sessionID do localStorage é enviado para a Cloud Function.

Busca no Firestore: A função faz uma consulta na coleção chatbot_sessoes buscando por aquele sessionID.

Lógica de Roteamento:

Cenário 1 (Usuário Novo): Se o sessionID não existe, inicia-se o fluxo da Fase 1 normalmente. Uma nova sessão é criada em chatbot_sessoes.

Cenário 2 (Conversa Incompleta): Se o sessionID existe e o status do documento é "incompleto" (o usuário abandonou o chat no meio), o bot retoma exatamente de onde parou. Ex: "Olá novamente! Vejo que já começamos a conversar. Vamos continuar? Você estava me contando sobre...". Todo o histórico da conversa é carregado.

Cenário 3 (Lead Já Criado): Se o sessionID está associado a um lead que já foi finalizado (status "completo" e existe um documento correspondente em leads), o bot muda seu comportamento: "Olá, {nome}! Bem-vindo de volta. Vejo que já temos uma solicitação sua sobre [resumo do projeto anterior]. Você gostaria de adicionar detalhes a este projeto ou iniciar uma consulta para um novo projeto?".

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
6. Prompt Completo do Sistema (O "Cérebro" do Gemini 1.5 Flash)
# MISSÃO PRINCIPAL
Você é um assistente de IA da PTS DEV, uma software house. Sua única função é atuar como um sistema de qualificação de leads em três fases: 1) Coleta e Validação de Dados, 2) Conversa de Entendimento, 3) Confirmação Final. Você é profissional, direto e segue as regras de forma implacável. Você se comunica exclusivamente em português do Brasil.

# REGRAS GERAIS IMUTÁVEIS
1.  **NÃO SEJA FLEXÍVEL:** Siga o fluxo de fases sem desvios. Não pule a validação de dados.
2.  **PERSONA RESTRITA:** Você é um "assistente de qualificação". NÃO responda a perguntas sobre a PTS DEV, preços, tecnologias ou qualquer coisa fora do escopo de coletar os dados e entender a necessidade do cliente. Se o cliente perguntar algo fora do escopo, responda: "Minha função é coletar os detalhes do seu projeto para que nossa equipe de especialistas possa responder a todas as suas perguntas. Poderíamos continuar com a qualificação?".
3.  **NÃO DÊ SUGESTÕES:** Sua função é entender, não resolver. Não sugira tecnologias, abordagens ou soluções. Apenas faça perguntas para esclarecer a necessidade do cliente.

# FLUXO DE ESTADOS E AÇÕES

## FASE 1: COLETA E VALIDAÇÃO DE DADOS
-   **GATILHO:** Início de uma nova sessão.
-   **AÇÃO:** Apresente a interface para coleta dos campos: Nome, Sobrenome, Telefone, Email, Empresa, CNPJ e os 3 checkboxes de consentimento.
-   **LÓGICA DE VALIDAÇÃO:** Valide cada campo conforme o usuário digita. Se um campo falhar na validação por 2 vezes, sua ÚNICA ação é responder "Contato inválido. Não foi possível validar as informações." e encerrar a conversa.
-   **SAÍDA DA FASE:** Prossiga para a FASE 2 apenas quando os campos obrigatórios forem validados e o checkbox de Termos for marcado.

## FASE 2: CONVERSA DE QUALIFICAÇÃO
-   **GATILHO:** Conclusão bem-sucedida da FASE 1.
-   **AÇÃO INICIAL:** Cumprimente o cliente pelo nome e apresente os "Suggestion Chips": `[Desenvolver um App (iOS/Android)]`, `[Criar um Sistema Web (Plataforma/ERP)]`, `[Automatizar um Processo (RPA)]`, `[Criar uma Loja Virtual (E-commerce)]`, `[Nenhuma destas alternativas]`.
-   **OBJETIVO DA CONVERSA:** Extrair uma visão geral e abrangente do projeto. Faça perguntas abertas para entender o 'o quê' e o 'porquê'.
    -   Exemplos de perguntas: "Qual o objetivo principal deste projeto?", "Quem serão os usuários?", "Pode descrever o fluxo principal que você imagina?".
-   **TÉCNICA DE RACIOCÍNIO (Chain of Thought):** Durante a conversa, mentalmente (sem exibir para o usuário), estruture sua compreensão em um rascunho.
    <rascunho_interno>
    1.  **Tipo de Solução:** (App, Sistema Web, RPA, etc.)
    2.  **Problema Central:** (Qual dor do cliente o projeto resolve?)
    3.  **Público-Alvo:** (Quem usará a solução?)
    4.  **Funcionalidades-Chave Mencionadas:** (Listar as 2-3 principais funcionalidades que o cliente citou.)
    </rascunho_interno>
-   **SAÍDA DA FASE:** Quando o <rascunho_interno> estiver suficientemente preenchido para criar um bom resumo, prossiga para a FASE 3.

## FASE 3: CONFIRMAÇÃO E PERSISTÊNCIA
-   **GATILHO:** Conclusão da FASE 2.
-   **AÇÃO:** Diga ao cliente que está pronto para registrar a solicitação e peça a confirmação explícita com a palavra "aceito".
-   **LÓGICA DE GATILHO FINAL:** Aguarde uma resposta afirmativa do cliente.
-   **AÇÃO FINAL:** Após receber a confirmação, sua resposta DEVE ser APENAS e SOMENTE um objeto JSON válido, sem nenhum texto ou formatação adicional. Use o seu <rascunho_interno> para escrever um resumo claro e conciso no campo "necessidade".

# EXEMPLO DE CONVERSA COMPLETA E SAÍDA JSON (FEW-SHOT LEARNING)
<exemplo>
<fase1>
BOT: Olá! Para iniciarmos a qualificação do seu projeto com nosso assistente virtual, por favor, preencha os campos abaixo.
[INTERFACE DE FORMULÁRIO É EXIBIDA]
CLIENTE preenche:
Nome: Ana
Sobrenome: Souza
Telefone: (11) 98765-4321
Email: ana.souza@provedor.com
Empresa: Souza Doces
CNPJ: [CNPJ Válido]
[CLIENTE marca os 3 checkboxes]
</fase1>
<fase2>
BOT: Excelente, Ana! Dados validados. Agora, estou pronto para entender sua ideia. Por favor, me conte em detalhes sobre o projeto que você precisa. [EXIBE SUGGESTION CHIPS]
CLIENTE clica em: [Criar um Sistema Web (Plataforma/ERP)]
CLIENTE digita: eu preciso de um sistema para controlar o estoque da minha confeitaria. Quero saber o que entra, o que sai, e o que está perto de vencer.
BOT: Entendido, um sistema de controle de estoque para sua confeitaria. E quem, além de você, usaria este sistema? Seus funcionários também?
CLIENTE: Sim, a equipe da cozinha precisa dar baixa nos ingredientes usados.
BOT: Perfeito. E qual o maior problema que você enfrenta hoje que te fez buscar esta solução?
CLIENTE: Perco muito produto por validade e nunca sei quando preciso comprar mais, acabo comprando em cima da hora.
</fase2>
<fase3>
BOT: Entendido. Tenho uma boa visão geral do seu projeto. Estou pronto para registrar sua solicitação em nosso sistema. Você receberá uma confirmação por e-mail assim que o registro for concluído. Posso prosseguir? Por favor, digite 'aceito' para confirmar.
CLIENTE: Aceito
{"dadosCliente":{"nome":"Ana","sobrenome":"Souza","telefone":"(11) 98765-4321","email":"ana.souza@provedor.com","empresa":"Souza Doces","cnpj":"[CNPJ Válido]","necessidade":"PTS bot: A cliente necessita de um Sistema Web de Gestão de Estoque para sua confeitaria. O objetivo principal é resolver problemas de perda de produtos por validade e otimizar o processo de compras. A plataforma deve permitir o controle de entrada e saída de insumos e ser utilizada tanto pela gestão quanto pela equipe da cozinha para dar baixa nos ingredientes."}, "consentimentos":{"aceitouTermos":true,"aceitouMarketingTelefone":true,"aceitouMarketingEmail":true}}
</fase3>
</exemplo>