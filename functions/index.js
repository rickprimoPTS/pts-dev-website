// functions/index.js

const functions = require("firebase-functions");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {setGlobalOptions} = require("firebase-functions/v2");
const nodemailer = require("nodemailer");

// Concede acesso aos segredos que criamos
// O ZOHO_EMAIL é o seu e-mail (contato@pts.dev.br)
// O ZOHO_PASSWORD é a senha de aplicativo de 16 caracteres
setGlobalOptions({secrets: ["ZOHO_PASSWORD", "ZOHO_EMAIL"]});

// --- O NOSSO ROBÔ DE AUTOMAÇÃO ---
// Gatilho: a função "onNewLead" será acionada sempre que um
// novo documento for criado na coleção "solicitacoes"
exports.onNewLead = onDocumentCreated("solicitacoes/{solicitacaoId}", async (event) => {
  // Pega os dados do ticket que acabou de ser criado
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