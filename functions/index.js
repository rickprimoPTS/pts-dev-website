// functions/index.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {HttpsError, onCall} = require("firebase-functions/v2/https");
const {setGlobalOptions} = require("firebase-functions/v2");
const nodemailer = require("nodemailer");
const {GoogleGenerativeAI} = require("@google/generative-ai");


// --- INICIALIZAÇÃO E CONFIGURAÇÃO GERAL ---

// Inicializa o Firebase Admin para que ambas as funções possam usar o Firestore
admin.initializeApp();
const db = admin.firestore();

// Concede acesso aos segredos que criamos
// O ZOHO_EMAIL é o seu e-mail (contato@pts.dev.br)
// O ZOHO_PASSWORD é a senha de aplicativo de 16 caracteres
// Define a região para TODAS as funções v2 e os segredos necessários
setGlobalOptions({
  region: "southamerica-east1",
  secrets: ["ZOHO_PASSWORD", "ZOHO_EMAIL", "gemini_api_key"],
});

// =========================================================================
// FUNÇÕES AUXILIARES DE VALIDAÇÃO (Helpers)
// =========================================================================
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  // Remove caracteres não numéricos e verifica se tem 10 ou 11 dígitos
  const justDigits = phone.replace(/\D/g, "");
  return justDigits.length >= 10 && justDigits.length <= 11;
};

const validateCPF = (cpf) => {
    const cpfClean = cpf.replace(/[^\d]+/g, "");
    if (cpfClean === "") {
        return false;
    }
    // Elimina CPFs invalidos conhecidos
    if (cpfClean.length !== 11 ||
        cpfClean === "00000000000" ||
        cpfClean === "11111111111" ||
        cpfClean === "22222222222" ||
        cpfClean === "33333333333" ||
        cpfClean === "44444444444" ||
        cpfClean === "55555555555" ||
        cpfClean === "66666666666" ||
        cpfClean === "77777777777" ||
        cpfClean === "88888888888" ||
        cpfClean === "99999999999") {
            return false;
    }
    // Valida 1o digito
    let add = 0;
    for (let i=0; i < 9; i++) {
        add += parseInt(cpfClean.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
        rev = 0;
    }
    if (rev !== parseInt(cpfClean.charAt(9))) {
        return false;
    }
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) {
        add += parseInt(cpfClean.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
        rev = 0;
    }
    if (rev !== parseInt(cpfClean.charAt(10))) {
        return false;
    }
    return true;
  };

const validateCNPJ = (cnpj) => {
    const cnpjClean = cnpj.replace(/[^\d]+/g, "");
    if (cnpjClean === "") {
        return false;
    }
    if (cnpjClean.length !== 14) {
        return false;
    }
    // Elimina CNPJs invalidos conhecidos
    if (cnpjClean === "00000000000000" ||
        cnpjClean === "11111111111111" ||
        cnpjClean === "22222222222222" ||
        cnpjClean === "33333333333333" ||
        cnpjClean === "44444444444444" ||
        cnpjClean === "55555555555555" ||
        cnpjClean === "66666666666666" ||
        cnpjClean === "77777777777777" ||
        cnpjClean === "88888888888888" ||
        cnpjClean === "99999999999999") {
            return false;
    }
    // Valida DVs
    let tamanho = cnpjClean.length - 2;
    let numeros = cnpjClean.substring(0, tamanho);
    const digitos = cnpjClean.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
            pos = 9;
      }
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(0))) {
        return false;
    }
    tamanho = tamanho + 1;
    numeros = cnpjClean.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
            pos = 9;
      }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(1))) {
        return false;
    }
    return true;
};


// =========================================================================
// FUNÇÃO 1: ROBÔ DE AUTOMAÇÃO DE E-MAIL (Sem alterações)
// =========================================================================
// --- O NOSSO ROBÔ DE AUTOMAÇÃO ---
// Gatilho: a função "onNewLead" será acionada sempre que um
// novo documento for criado na coleção "solicitacoes"
exports.onNewLead = onDocumentCreated("solicitacoes/{solicitacaoId}", async (event) => {
  const data = event.data.data();
  const dadosCliente = data.dadosCliente;
  const consentimentos = data.consentimentos;

  // Prepara o "carteiro" (Nodemailer) para enviar e-mails via Zoho
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true, // `true` para a porta 465
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_PASSWORD,
    },
  });

  // --- E-MAIL 1: Notificação de "Novo Lead" para você ---
  const adminEmailHtml = `
    <div style="font-family: sans-serif;">
      <h2>[PTS DEV] Você tem um novo lead!</h2>
      <p><strong>${dadosCliente.nome} ${dadosCliente.sobrenome}</strong> enviou uma nova solicitação.</p>
      <hr>
      <h3>Informações da mensagem:</h3>
      <ul>
        <li><strong>Nome:</strong> ${dadosCliente.nome}</li>
        <li><strong>Sobrenome:</strong> ${dadosCliente.sobrenome}</li>
        <li><strong>Telefone:</strong> ${dadosCliente.telefone}</li>
        <li><strong>Email:</strong> ${dadosCliente.email}</li>
        <li><strong>Empresa:</strong> ${dadosCliente.empresa || "Não informado"}</li>
        <li><strong>CNPJ:</strong> ${dadosCliente.cnpj || "Não informado"}</li>
        <li><strong>Necessidade:</strong> ${dadosCliente.necessidade}</li>
      </ul>
      <h3>Consentimentos:</h3>
      <ul>
        <li><strong>Concordou com os Termos:</strong> ${consentimentos.aceitouTermos ? "✓ Verificado" : "✗ Não verificado"}</li>
        <li><strong>Aceitou Marketing por Telefone/WhatsApp:</strong> ${consentimentos.aceitouMarketingTelefone ? "✓ Verificado" : "✗ Não verificado"}</li>
        <li><strong>Aceitou Marketing por E-mail:</strong> ${consentimentos.aceitouMarketingEmail ? "✓ Verificado" : "✗ Não verificado"}</li>
      </ul>
      <hr>
      <a
        href="mailto:${dadosCliente.email}?subject=RE: Sua solicitação para a PTS DEV"
        style="background-color: #007bff; color: white; padding: 12px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;"
      >
        Responder
      </a>
    </div>
  `;

  const adminMailOptions = {
    from: `"PTS DEV Notificações" <${process.env.ZOHO_EMAIL}>`,
    to: process.env.ZOHO_EMAIL, // Envia para o seu próprio e-mail
    subject: `[PTS DEV] Você tem um novo lead de ${dadosCliente.nome}`,
    html: adminEmailHtml,
  };

  // --- E-MAIL 2: Confirmação para o Cliente ---
  const clientEmailHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
      <img src="https://firebasestorage.googleapis.com/v0/b/pts-dev-br.firebasestorage.app/o/assets%2FPTSDEVLogo.png?alt=media&token=69b6fe4d-1bd6-411d-bb92-784302ab2135" alt="PTS DEV Logo" style="max-width: 150px; margin-bottom: 20px;">
      <h2>Entraremos em contato</h2>
      <p>Olá, ${dadosCliente.nome} ${dadosCliente.sobrenome},</p>
      <p>Agradecemos seu contato com a PTS DEV! Recebemos sua solicitação com sucesso e nossa equipe de especialistas entrará em contato em breve.</p>
      <hr>
      <p><strong>Este é um registro das informações e permissões que você nos forneceu:</strong></p>
      <h3>Resumo dos Dados Enviados:</h3>
      <ul>
        <li><strong>Nome Completo:</strong> ${dadosCliente.nome} ${dadosCliente.sobrenome}</li>
        <li><strong>E-mail:</strong> ${dadosCliente.email}</li>
        <li><strong>Telefone:</strong> ${dadosCliente.telefone}</li>
        <li><strong>Mensagem:</strong> ${dadosCliente.necessidade}</li>
      </ul>
      <h3>Suas Preferências de Comunicação:</h3>
      <ul>
        <li><strong>Termos e Condições:</strong> ${consentimentos.aceitouTermos ? "Aceito" : "Não Aceito"}</li>
        <li><strong>Receber comunicações por E-mail:</strong> ${consentimentos.aceitouMarketingEmail ? "Aceito" : "Não Aceito"}</li>
        <li><strong>Receber comunicações por WhatsApp/Telefone:</strong> ${consentimentos.aceitouMarketingTelefone ? "Aceito" : "Não Aceito"}</li>
      </ul>
      <hr>
      <p>Caso queira alterar suas preferências ou corrigir alguma informação, por favor, responda a este e-mail ou entre em contato conosco.</p>
      <p>Atenciosamente,</p>
      <p><strong>Equipe PTS DEV</strong><br>
      <a href="https://pts.dev.br">www.pts.dev.br</a></p>
    </div>
  `;

  const clientMailOptions = {
    from: `"PTS DEV" <${process.env.ZOHO_EMAIL}>`,
    to: dadosCliente.email,
    subject: "Confirmação de sua solicitação | PTS DEV",
    html: clientEmailHtml,
  };

  // Envia os dois e-mails
  try {
    await transporter.sendMail(adminMailOptions);
    functions.logger.log("E-mail de admin enviado com sucesso.");
    await transporter.sendMail(clientMailOptions);
    functions.logger.log("E-mail de confirmação para o cliente enviado com sucesso.");
  } catch (error) {
    functions.logger.error("Erro ao enviar e-mails:", error);
  }
});

// =========================================================================
// FUNÇÃO 2: CHATBOT DE QUALIFICAÇÃO (Lógica de Validação Adicionada)
// =========================================================================

// Adicione este "cérebro" (prompt) no topo da sua função, ou mesmo do arquivo.
const SYSTEM_PROMPT = `
# MISSÃO PRINCIPAL 
Você é um assistente de IA da PTS DEV. 
Sua única função é conduzir uma qualificação de leads em três fases, seguindo as regras de forma implacável. 
Você se comunica exclusivamente em português do Brasil, mas se o usuário pedir em outra lingua, só aí voce altera o idioma de comunicação,,
mas vai me trazer a informação ao final no momento de criar o registro do banco de dados somente em portugues do Brasil.

# FASES E REGRAS
---
## FASE 1: COLETA E VALIDAÇÃO DE DADOS
- Seu estado inicial é 'awaiting_name'.
- Você deve pedir um dado por vez, na ordem: nome, email, telefone.
- As respostas para esta fase são pré-definidas e você não deve improvisar.
- A transição para a Fase 2 só ocorre após a validação bem-sucedida do telefone.

## FASE 2: CONVERSA INVESTIGATIVA DE ENTENDIMENTO
- **SEU GATILHO:** A conversa entra nesta fase quando o humano envia a primeira mensagem após você dizer "Dados validados com sucesso... Agora me descreva a sua necessidade e o que já tem".
- **SEU OBJETIVO:** Sua única missão é preencher um "rascunho interno" mental com todos os detalhes do projeto. Você deve investigar a fundo os requisitos de SOFTWARE, DADOS e HARDWARE.
- **TÉCNICA DE INVESTIGAÇÃO:** Faça perguntas abertas e fechadas para extrair todas as informações necessárias. Use os exemplos do seu conhecimento para guiar suas perguntas. Se o cliente quer um "app de delivery", pergunte sobre cadastro de entregadores, clientes, produtos, sistema de rotas, acompanhamento em tempo real, etc. Se quer "automação", peça para descrever o processo manual passo a passo, quais programas são usados (Excel, sistemas web, etc.).
- **PERSONA RESTRITA:** NÃO responda a perguntas sobre a PTS DEV, preços ou tecnologias. Se o cliente perguntar, responda: "Minha função é apenas coletar os detalhes do seu projeto. Poderíamos continuar com a qualificação?". Não dê sugestões. Apenas colete informações.
- **SAÍDA DA FASE:** Quando julgar que tem informações suficientes para um desenvolvedor entender o escopo completo do projeto, você deve fazer a transição para a Fase 3.

## FASE 3: CONFIRMAÇÃO E PERSISTÊNCIA
- **SEU GATILHO:** Ao final da Fase 2, sua ÚNICA resposta deve ser a pergunta: "Entendido. Tenho os detalhes necessários para registrar sua solicitação. Posso prosseguir e criar o registro em nosso sistema?".
- **AÇÃO FINAL:** Se a resposta do usuário for afirmativa (contendo "sim", "aceito", "pode", "prossiga", etc.), sua PRÓXIMA e ÚLTIMA resposta deve ser APENAS e SOMENTE "Agradeço pelas informações, estou direcionando um resumo de nossa conversa para um especialista, que entrará em contato em breve", e finaliza o chat. Ao mesmo tempo, você não mostra nada do resumo ao cliente (nunca, nem se ele pedir de quaisquer formas, nao há autorização para isso pra você, informe a ele que só quando alguem real fizer contato ele poderá saber o escopo), nesse meio tempo voce deverá criar um objeto JSON válido, sem nenhum texto adicional. Este JSON deve ter a estrutura (veja um exemplo completo de um usuário real sem ser pelo chat, quero que o chat crie um resumo estruturado e detalhado contendo todos os campos e exatamente nos nomes que o nosso firebase precisa para salvar corretamente, segue o exemplo): {consentimentos
(map)


aceitouMarketingEmail
true
(boolean)


aceitouMarketingTelefone
true
(boolean)


aceitouTermos
true
(boolean)


dataAceiteMarketingEmail
4 de agosto de 2025 às 22:01:10 UTC-3
(timestamp)


dataAceiteMarketingTelefone
4 de agosto de 2025 às 22:01:10 UTC-3
(timestamp)


dataAceiteTermos
4 de agosto de 2025 às 22:01:10 UTC-3
(timestamp)



dadosCliente
(map)


cnpj
"496.469.048-23 "
(string)


email
"mateuslima5300@gmail.com"
(string)


empresa
"LimaRPASolucoes "
(string)


necessidade
"RPA "
(string)


nome
"Mateus "
(string)


sobrenome
"Lima "
(string)


telefone
"11958437220"
(string)


dataCriacao
4 de agosto de 2025 às 22:01:10 UTC-3
(timestamp)


status
"novo"}. No campo 'necessidade', você deve escrever um resumo detalhado e bem estruturado de tudo que foi discutido na Fase 2, e na entrevista deverá cobrir completamente os requisitos até ter tudo o que precisa, e com isso irá me descrever o projeto de maneira estruturada iniciando com "Chatbot PTS DEV: [resumo da necessidade em detalhes e estruturado]".
---




REGRAS GERAIS IMUTÁVEIS
- NÃO SEJA FLEXÍVEL: Siga o fluxo de fases sem desvios. Não pule a validação de dados.
- PERSONA RESTRITA: Você é um "assistente de qualificação". 
NÃO responda a perguntas sobre a PTS DEV, preços, tecnologias (que ele possa usar ou que temos) ou qualquer coisa fora do escopo. 
Se o cliente perguntar algo fora do escopo, responda: 
"Minha função é coletar os detalhes do seu projeto para que nossa equipe de especialistas possa responder a todas as suas perguntas. Poderíamos continuar com a qualificação?", ou uma variaão desse contexto.
- NÃO DÊ SUGESTÕES: Sua função é entender, não resolver. Não sugira tecnologias ou soluções nem converse sobre nada que nao seja o seu objetivo de entender o projeto dele. 
Apenas faça perguntas para esclarecer os requisitos do cliente.
Suas perguntas devem ser diretas e objetivas, focadas em extrair informações específicas sobre o projeto e tudo necessário à ele somente.
- NÃO SEJA AMIGÁVEL: Sua comunicação é direta e profissional com poucas palavras e sem explicações desnecessárias e nem responder dúvidas do cliente. Não use emojis, gírias ou linguagem coloquial. 
Mantenha um tom neutro e formal.
- NÃO SEJA CRIATIVO: Sua função é seguir o fluxo de qualificação.
-
`;

exports.chat = onCall({secrets: ["gemini_api_key"]}, async (request) => {
    const {sessionId, message: userMessage} = request.data;

    if (!sessionId) {
        throw new HttpsError("invalid-argument", "A função precisa de um 'sessionId'.");
    }

    const sessionRef = db.collection("chatbot_sessoes").doc(sessionId);
    const sessionDoc = await sessionRef.get();
    let botReply = "";

    // --- LÓGICA DE INÍCIO DE SESSÃO ---
    if (!sessionDoc.exists) {
        if (userMessage !== "__INITIATE_CHAT__") {
           // Se a sessão não existe e não é a chamada inicial, algo está errado. Ignora.
           return {reply: "Sessão não encontrada. Por favor, recarregue a página."};
        }
        botReply = "Para iniciarmos a qualificação, por favor, informe seu nome completo.";
        await sessionRef.set({
            currentStep: "awaiting_name",
            data: {validation_attempts: 0},
            history: [{role: "model", parts: [{text: botReply}]}],
        });
        return {reply: botReply};
    }

    // A partir daqui, a sessão GARANTIDAMENTE existe.
    const sessionData = sessionDoc.data();
    let {currentStep, data: collectedData, history} = sessionData;

    // --- CORREÇÃO PRINCIPAL: Checa o estado da sessão ANTES de fazer qualquer outra coisa ---
    if (currentStep === "failed_validation") {
        botReply = "Sua sessão anterior foi encerrada por falha na validação. Vamos começar de novo. Por favor, informe seu nome completo.";
        // Reseta completamente o estado
        currentStep = "awaiting_name";
        collectedData = {validation_attempts: 0};
        history = [{role: "user", parts: [{text: userMessage}]}, {role: "model", parts: [{text: botReply}]}];
        await sessionRef.set({currentStep, data: collectedData, history});
        return {reply: botReply};
    }
    // Se a sessão está OK, agora sim adicionamos a nova mensagem do usuário ao histórico
    history.push({role: "user", parts: [{text: userMessage}]});
    // --- LÓGICA DA FASE 1: COLETA DE DADOS (Máquina de Estados) ---
    if (currentStep.startsWith("awaiting_")) {
        switch (currentStep) {
            case "awaiting_name": {
                const nameParts = userMessage.trim().split(" ").filter((part) => part.length > 0);
                if (nameParts.length < 1) {
                    botReply = "Nome inválido. Por favor, informe seu nome completo.";
                } else {
                    collectedData.nome = nameParts.shift();
                    collectedData.sobrenome = nameParts.join(" ");
                    botReply = `Obrigado, ${collectedData.nome}. Agora, qual o seu e-mail?`;
                    currentStep = "awaiting_email";
                }
                break;
            }
            case "awaiting_email": {
                if (!validateEmail(userMessage.trim())) {
                    collectedData.validation_attempts = (collectedData.validation_attempts || 0) + 1;
                    if (collectedData.validation_attempts >= 2) {
                        botReply = "O e-mail fornecido não parece válido. A sessão será encerrada.";
                        currentStep = "failed_validation";
                    } else {
                        botReply = "Este e-mail não parece válido. Por favor, tente novamente.";
                    }
                } else {
                    collectedData.email = userMessage.trim();
                    collectedData.validation_attempts = 0;
                    botReply = "E-mail confirmado. Por favor, informe seu telefone com DDD.";
                    currentStep = "awaiting_phone";
                }
                break;
            }
            // ... (cases para awaiting_phone, awaiting_entity_type, awaiting_cnpj, awaiting_cpf, etc. continuam aqui, sem alteração)
            case "awaiting_phone": {
                if (!validatePhone(userMessage.trim())) {
                    collectedData.validation_attempts = (collectedData.validation_attempts || 0) + 1;
                    if (collectedData.validation_attempts >= 2) {
                        botReply = "O telefone fornecido não parece válido. A sessão será encerrada.";
                        currentStep = "failed_validation";
                    } else {
                        botReply = "Telefone inválido. Por favor, informe um número válido com DDD.";
                    }
                } else {
                    collectedData.telefone = userMessage.trim().replace(/\D/g, "");
                    collectedData.validation_attempts = 0;
                    botReply = "Ótimo. Você representa uma 'pessoa física' ou uma 'pessoa jurídica'?";
                    currentStep = "awaiting_entity_type";
                }
                break;
            }
            case "awaiting_entity_type": {
                const isJuridica = /juridica|empresa|cnpj/i.test(userMessage);
                const isFisica = /fisica|cpf|pessoal/i.test(userMessage);
                if (isJuridica) {
                    currentStep = "awaiting_cnpj";
                    botReply = "Entendido. Por favor, informe o CNPJ da empresa.";
                } else if (isFisica) {
                    collectedData.empresa = "Pessoa Física";
                    currentStep = "awaiting_cpf";
                    botReply = "Entendido. Por favor, informe o seu CPF.";
                } else {
                    botReply = "Não compreendi. Por favor, responda com 'pessoa física' ou 'pessoa jurídica'.";
                }
                break;
            }
            case "awaiting_cnpj": {
                if (!validateCNPJ(userMessage)) {
                    collectedData.validation_attempts = (collectedData.validation_attempts || 0) + 1;
                    if (collectedData.validation_attempts >= 2) {
                        botReply = "O CNPJ fornecido não parece válido. A sessão será encerrada.";
                        currentStep = "failed_validation";
                    } else {
                        botReply = "CNPJ inválido. Por favor, verifique e tente novamente.";
                    }
                } else {
                    collectedData.cnpj = userMessage.trim().replace(/[^\d]+/g, "");
                    collectedData.validation_attempts = 0;
                    currentStep = "awaiting_company_name";
                    botReply = "CNPJ validado. Qual é o nome (razão social) da empresa?";
                }
                break;
            }
            case "awaiting_cpf": {
                if (!validateCPF(userMessage)) {
                    collectedData.validation_attempts = (collectedData.validation_attempts || 0) + 1;
                    if (collectedData.validation_attempts >= 2) {
                        botReply = "O CPF fornecido não parece válido. A sessão será encerrada.";
                        currentStep = "failed_validation";
                    } else {
                        botReply = "CPF inválido. Por favor, verifique e tente novamente.";
                    }
                } else {
                    collectedData.cnpj = userMessage.trim().replace(/[^\d]+/g, ""); // Nota: Armazenando CPF no campo CNPJ
                    collectedData.validation_attempts = 0;
                    currentStep = "awaiting_terms_consent";
                    botReply = "CPF validado. Para continuar, preciso que aceite nossos Termos e Política de Privacidade. Você aceita? (sim/não)";
                }
                break;
            }
            case "awaiting_company_name": {
                if (userMessage.trim().length < 2) {
                     botReply = "Por favor, informe um nome de empresa válido.";
                } else {
                    collectedData.empresa = userMessage.trim();
                    currentStep = "awaiting_terms_consent";
                    botReply = "Ok. Para continuar, preciso que aceite nossos Termos e Política de Privacidade. Você aceita? (sim/não)";
                }
                break;
            }
            case "awaiting_terms_consent": {
                if (/sim|aceito|s|yes/i.test(userMessage)) {
                    collectedData.aceitouTermos = true;
                    currentStep = "awaiting_marketing_phone_consent";
                    botReply = "Obrigado. Você aceita receber comunicações de marketing por telefone ou WhatsApp? (sim/não)";
                } else {
                    collectedData.aceitouTermos = false;
                    currentStep = "failed_validation";
                    botReply = "A aceitação dos termos é necessária para continuar. A sessão será encerrada.";
                }
                break;
            }
            case "awaiting_marketing_phone_consent": {
                collectedData.aceitouMarketingTelefone = /sim|s|yes/i.test(userMessage);
                currentStep = "awaiting_marketing_email_consent";
                botReply = "Entendido. E por e-mail, você aceita receber nossas comunicações de marketing? (sim/não)";
                break;
            }
            case "awaiting_marketing_email_consent": {
                collectedData.aceitouMarketingEmail = /sim|s|yes/i.test(userMessage);
                currentStep = "qualification_phase"; // Transição para Fase 2
                botReply = "Perfeito, todos os dados foram validados! Agora, estou pronto para entender sua necessidade. Por favor, descreva em detalhes o projeto ou automação que você precisa.";
                break;
            }
        }
                history.push({role: "model", parts: [{text: botReply}]});
        await sessionRef.update({currentStep, data: collectedData, history});
        return {reply: botReply};
    }
    // --- LÓGICA DAS FASES 2 e 3: Interação com a IA ---
    const genAI = new GoogleGenerativeAI(process.env.gemini_api_key);
    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});
    const chat = model.startChat({
        systemInstruction: {role: "system", parts: [{text: SYSTEM_PROMPT}]},
        history: history.slice(0, -1), // Envia o histórico SEM a última mensagem do usuário
    });
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    botReply = response.text();
    // Tenta interpretar a resposta como JSON (Ação Final da Fase 3)
    try {
        const jsonResponse = JSON.parse(botReply);
        // Se conseguiu fazer o parse, é o JSON final. Crie o lead.
        await db.collection("solicitacoes").add({
            dadosCliente: jsonResponse.dadosCliente,
            consentimentos: jsonResponse.consentimentos,
            status: "novo",
            dataCriacao: admin.firestore.FieldValue.serverTimestamp(),
        });
        // Envia a mensagem de encerramento para o usuário
        botReply = "Agradeço pelas informações. Um resumo de nossa conversa foi direcionado para um especialista, que entrará em contato em breve.";
        currentStep = "completed";
    } catch (e) {
        // Se não for um JSON, é uma continuação da conversa da Fase 2.
        // A resposta do bot (botReply) já está correta. Apenas continuamos.
    }
    history.push({role: "model", parts: [{text: botReply}]});
    await sessionRef.update({currentStep, data: collectedData, history});
    return {reply: botReply};
});