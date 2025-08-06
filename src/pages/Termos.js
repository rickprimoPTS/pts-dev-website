// src/pages/Termos.js
import React from 'react';
import './pages.css';

const Termos = () => {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="legal-container">
      <h1>Termos e Condições de Uso – pts.dev.br</h1>
      <p><strong>Última atualização:</strong> 06 de agosto de 2025</p>
      <p>Bem-vindo à PTS DEV! Estes Termos e Condições de Uso ("Termos") regem o seu acesso e utilização do website pts.dev.br ("Site"), de propriedade da PRIMO TRADE SOLUTIONS LTDA, pessoa jurídica de direito privado, inscrita no CNPJ/MF sob o nº 42.419.988/0001-78, com sede na Rua Eugene Carriere, 30, CJ 06 Torre 1, São Paulo - SP, CEP 05541-100, e sua filial inscrita no CNPJ/MF sob o nº 42.419.988/0002-59, com sede na Rua Dr. Pedro Ferreira, 333, Sala 1206 Box 250, Itajaí - SC, CEP 88301-030.</p>
      <p>Ao acessar ou utilizar nosso Site, você concorda em cumprir e se vincular a estes Termos.</p>
      <h2>1. Objeto</h2>
      <p>O Site tem como objetivo apresentar as soluções de software, aplicativos e serviços de tecnologia oferecidos pela PTS DEV, bem como servir como um canal de contato para potenciais clientes ("Usuários") solicitarem informações e propostas comerciais.</p>
      <h2>2. Aceitação dos Termos</h2>
      <p>O simples acesso e navegação no Site, bem como o envio de informações através do nosso formulário de contato, constituem uma aceitação tácita, integral e sem reservas de todos os termos e condições aqui estipulados. Se você não concorda com estes Termos, não deve utilizar o Site.</p>
      <h2>3. Propriedade Intelectual</h2>
      <p>Todo o conteúdo presente no Site, incluindo, mas não se limitando a, textos, gráficos, imagens, logotipos, ícones, software e o código-fonte, é de propriedade exclusiva da Primo Trade Solutions LTDA ou de seus parceiros, e é protegido pelas leis brasileiras de propriedade intelectual. É expressamente proibida a cópia, reprodução, modificação, distribuição ou qualquer outra forma de utilização do conteúdo para fins comerciais sem a prévia e expressa autorização por escrito da PTS DEV.</p>
      <h2>4. Conduta e Obrigações do Usuário</h2>
      <p>O Usuário concorda em utilizar o Site de forma ética e legal, comprometendo-se a: a) Não realizar quaisquer ações que possam causar dano ao Site, aos sistemas da PTS DEV ou a terceiros. b) Fornecer informações verdadeiras, precisas e atualizadas ao preencher o formulário de contato. c) Não utilizar o Site para fins ilícitos, difamatórios, ou que violem os direitos de terceiros.</p>
      <h2>5. Limitação de Responsabilidade</h2>
      <p>A PTS DEV empenha-se para manter as informações do Site precisas e atualizadas. No entanto, não garantimos que o Site estará livre de erros, interrupções ou que será compatível com todo e qualquer hardware ou software. Em nenhuma hipótese a Primo Trade Solutions LTDA será responsável por quaisquer danos diretos, indiretos, incidentais ou consequenciais resultantes do acesso ou uso deste Site.</p>
      <h2>6. Privacidade e Proteção de Dados</h2>
      <p>A coleta e o tratamento de dados pessoais dos Usuários através do nosso Site são regidos por um documento específico, nossa Política de Privacidade, que é parte integrante destes Termos. Ao aceitar estes Termos, você declara ter lido e concordado com nossa Política de Privacidade.</p>
      <h2>7. Modificações dos Termos</h2>
      <p>A PTS DEV reserva-se o direito de modificar estes Termos a qualquer momento, sem aviso prévio. A versão atualizada estará sempre disponível no Site. Recomendamos que o Usuário revise os Termos periodicamente.</p>
      <h2>8. Lei Aplicável e Foro</h2>
      <p>Estes Termos serão regidos e interpretados de acordo com as leis da República Federativa do Brasil. Fica eleito o Foro da Comarca de São Paulo, Estado de São Paulo, para dirimir quaisquer litígios ou controvérsias oriundas destes Termos, com expressa renúncia a qualquer outro, por mais privilegiado que seja.</p>
      <h2>9. Contato</h2>
      <p>Em caso de dúvidas sobre estes Termos, entre em contato conosco através do e-mail: contato@pts.dev.br.</p>
    </div>
  );
};
export default Termos;