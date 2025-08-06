// src/pages/Privacidade.js
import React from 'react';
import './pages.css';

const Privacidade = () => {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="legal-container">
      <h1>Política de Privacidade – pts.dev.br</h1>
      <p><strong>Última atualização:</strong> 06 de agosto de 2025</p>
      <h2>1. Nosso Compromisso com a Privacidade</h2>
      <p>A PRIMO TRADE SOLUTIONS LTDA ("PTS DEV", "nós"), respeita sua privacidade e se compromete a proteger seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018). Esta política descreve como coletamos, usamos, armazenamos e protegemos os dados dos usuários ("Você") que interagem com nosso site pts.dev.br.</p>
      <h2>2. Nosso Papel no Tratamento de Dados</h2>
      <p>É fundamental que você entenda nossa atuação:</p>
      <p><strong>Como Controladora de Dados:</strong> Atuamos como Controladora quando coletamos seus dados diretamente através deste Site (por exemplo, no formulário de contato). Nós definimos a finalidade e os meios de tratamento para estes dados.</p>
      <p><strong>Como Operadora de Dados:</strong> Quando você, nosso cliente, utiliza nossos softwares (ERP, App de Delivery, etc.), você é o Controlador dos dados dos seus clientes. Nós atuamos como Operadores, tratando esses dados unicamente sob suas instruções e em conformidade com o contrato de serviço estabelecido, não os utilizando para nenhuma outra finalidade.</p>
      <p>Esta política foca em nossa atuação como Controladora.</p>
      <h2>3. Dados que Coletamos e Suas Finalidades</h2>
      <p>Coletamos o mínimo de informações necessárias para atingir finalidades legítimas, específicas e informadas a você.</p>
      <p><strong>Dados Fornecidos por Você (Formulário de Contato):</strong></p>
      <ul>
        <li><strong>Dados:</strong> Nome, sobrenome, telefone, e-mail, nome da empresa, CNPJ e a mensagem que descreve sua necessidade.</li>
        <li><strong>Finalidade:</strong> Responder às suas solicitações, enviar propostas comerciais e realizar as diligências pré-contratuais necessárias para a prestação de nossos serviços.</li>
        <li><strong>Base Legal (LGPD):</strong> Execução de diligências pré-contratuais a seu pedido (Art. 7º, V) e nosso legítimo interesse em responder a contatos comerciais (Art. 7º, IX).</li>
      </ul>
      <p><strong>Dados de Consentimento para Marketing:</strong></p>
      <ul>
        <li><strong>Dados:</strong> A confirmação (booleana) se você aceita receber comunicações de marketing por e-mail ou telefone/WhatsApp, e a data/hora em que essa permissão foi concedida.</li>
        <li><strong>Finalidade:</strong> Enviar notícias, informações sobre novos produtos e promoções da PTS DEV.</li>
        <li><strong>Base Legal (LGPD):</strong> Seu consentimento livre, informado e inequívoco (Art. 7º, I).</li>
      </ul>
      <p><strong>Dados de Navegação (Cookies):</strong></p>
      <ul>
        <li><strong>Dados:</strong> Informações como endereço IP, tipo de navegador, páginas visitadas e tempo de permanência.</li>
        <li><strong>Finalidade:</strong> Analisar o desempenho do nosso Site, melhorar sua experiência e garantir a segurança. Utilizamos apenas cookies essenciais e de análise anônima.</li>
        <li><strong>Base Legal (LGPD):</strong> Nosso legítimo interesse (Art. 7º, IX).</li>
      </ul>
      <h2>4. Com Quem Compartilhamos Seus Dados</h2>
      <p>Não vendemos ou alugamos seus dados pessoais. O compartilhamento ocorre apenas quando estritamente necessário:</p>
      <ul>
        <li><strong>Provedores de Serviços de Tecnologia:</strong> Como provedores de hospedagem (Google Firebase) e plataformas de e-mail, que atuam como operadores sob nossas instruções.</li>
        <li><strong>Autoridades Públicas:</strong> Se exigido por lei ou ordem judicial.</li>
      </ul>
      <h2>5. Por Quanto Tempo Guardamos Seus Dados</h2>
      <p>Reteremos seus dados pessoais apenas pelo tempo necessário para cumprir a finalidade para a qual foram coletados, ou para cumprir obrigações legais, fiscais ou regulatórias. Dados coletados com base no consentimento para marketing serão retidos enquanto o consentimento for válido.</p>
      <h2>6. Segurança dos Seus Dados</h2>
      <p>Adotamos medidas de segurança técnicas e administrativas, como controle de acesso, criptografia e monitoramento de rede, para proteger seus dados pessoais contra acessos não autorizados e situações acidentais ou ilícitas.</p>
      <h2>7. Seus Direitos como Titular dos Dados</h2>
      <p>A LGPD garante a você diversos direitos, incluindo: Confirmação da existência de tratamento; Acesso aos seus dados; Correção de dados incompletos, inexatos ou desatualizados; Anonimização, bloqueio ou eliminação de dados desnecessários; Portabilidade dos dados a outro fornecedor; Eliminação dos dados pessoais tratados com o seu consentimento; Revogação do consentimento a qualquer momento.</p>
      <h2>8. Como Exercer Seus Direitos</h2>
      <p>Para exercer qualquer um dos seus direitos, ou para tirar dúvidas sobre o tratamento de seus dados, entre em contato com nosso Encarregado pela Proteção de Dados (DPO) através do canal oficial:</p>
      <p><strong>E-mail:</strong> contato@pts.dev.br</p>
      <h2>9. Atualizações desta Política</h2>
      <p>Esta Política pode ser atualizada a qualquer momento. A versão mais recente estará sempre disponível em nosso Site, com a data da última atualização no topo do documento.</p>
      <p><strong>Controlador:</strong><br />PRIMO TRADE SOLUTIONS LTDA<br />CNPJ: 42.419.988/0001-78 (Matriz)<br />CNPJ: 42.419.988/0002-59 (Filial)</p>
    </div>
  );
};
export default Privacidade;