// src/pages/Home.js
import React from 'react';
import ContactForm from '../components/ContactForm';
import vitrineOnlineImg from '../assets/vitrine-online.jpg';
import deliveryAppImg from '../assets/delivery-app.jpg';
import webAppImg from '../assets/web-app.jpg';
import rpaImg from '../assets/rpa.jpg';
import '../App.css'; // O CSS continua sendo necessário

// Reutilizamos os mesmos ícones do App.js original
const AppIcon = () => <svg height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>;
const ConsultingIcon = () => <svg height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>;


const Home = () => {
  const fullCompanyName = "Primo Trade Solutions LTDA";

  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <h1>Soluções em Software e Aplicativos para o Comércio</h1>
          <h2>A concorrência não vai esperar. Nós criamos as ferramentas para você vencer.</h2>
          <p className="hero-statistic"><strong>Especialistas preveem: até 2040, 95% das compras serão online. A sua loja está pronta?</strong></p>
          <p>Desenvolvemos soluções em software e aplicativos sob medida que impulsionam o comércio e colocam seu negócio à frente no mercado.</p>
          <button onClick={scrollToForm} className="hero-cta-button">
            Solicite uma Proposta Sem Compromisso
          </button>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">Nós não criamos apenas software. Criamos o futuro do seu negócio.</h2>
          <p>
            Entendemos os desafios do varejo físico, como as longas filas e o controle de estoque, mas também os desafios de <strong>escritórios e empresas de serviços</strong>, como <strong>tarefas administrativas repetitivas</strong> e a necessidade de <strong>agilidade na gestão</strong>. É por isso que a PTS DEV existe. Nossa missão é pegar o melhor dos dois mundos - a conveniência do online e a eficiência da <strong>automação</strong> - para criar soluções integradas que funcionam para você. Somos mais do que desenvolvedores; somos seus parceiros na jornada de <strong>transformação digital</strong> e <strong>otimização de processos</strong>.
          </p>
        </div>
      </section>

      <section id="solutions" className="solutions-section">
        <div className="container">
          <h2 className="section-title">Desenvolvimento de Software Sob Medida para Digitalizar e Automatizar seu Comércio</h2>
          <p className="section-subtitle">Construímos as ferramentas que integram sua operação, da gestão interna à entrega final.</p>
          
          <div className="solution-detailed-item">
            <div className="solution-image-container">
              <img src={rpaImg} alt="Automação de processos com RPA" />
            </div>
            <div className="solution-text-container">
              <ConsultingIcon />
              <h3>RPA (Automação de Processos)</h3>
              <p><strong>Libere sua equipe para o que realmente importa.</strong> Cansado de tarefas repetitivas e demoradas? Nossa solução de <strong>RPA</strong> cria robôs virtuais que executam processos burocráticos de forma autônoma, 24 horas por dia, 7 dias por semana.</p>
              <button onClick={scrollToForm} className="solution-cta">Quero automatizar meus processos</button>
            </div>
          </div>

          <div className="solution-detailed-item">
            <div className="solution-image-container">
              <img src={vitrineOnlineImg} alt="Sistema de gestão com vitrine online" />
            </div>
            <div className="solution-text-container">
              <h3>Sistema de Gestão com Vitrine Online Integrada</h3>
              <p><strong>Assuma o controle total da sua operação.</strong> Nossa plataforma de gestão (ERP) foi desenhada para o comércio local, permitindo que você gerencie produtos, estoque, e vendas internas de forma intuitiva e 100% online.</p>
              <button onClick={scrollToForm} className="solution-cta">Quero para minha loja</button>
            </div>
          </div>

          <div className="solution-detailed-item reverse">
            <div className="solution-text-container">
              <AppIcon />
              <h3>Aplicativo de Entregas (Delivery App)</h3>
              <p><strong>Crie seu próprio ecossistema de delivery.</strong> Conecte suas lojas a uma rede de entregadores independentes sem depender de taxas abusivas de aplicativos de terceiros.</p>
              <button onClick={scrollToForm} className="solution-cta">Saiba mais sobre a plataforma</button>
            </div>
            <div className="solution-image-container">
              <img src={deliveryAppImg} alt="Aplicativo de delivery" />
            </div>
          </div>

          <div className="solution-detailed-item">
            <div className="solution-image-container">
              <img src={webAppImg} alt="Web App de fidelização de clientes" />
            </div>
            <div className="solution-text-container">
              <ConsultingIcon />
              <h3>Web Apps de Fidelização e Marketing</h3>
              <p><strong>Converse diretamente com seu cliente, sem intermediários.</strong> Crie um canal de marketing poderoso com aplicativos "web-base" que não exigem download em loja de apps.</p>
              <button onClick={scrollToForm} className="solution-cta">Quero fidelizar meus clientes</button>
            </div>
          </div>
        </div>
      </section>

      <section className="scarcity-section">
        <div className="container">
          <h2 className="section-title">Agenda Exclusiva para Novos Projetos de Software</h2>
          <p>Para garantir a máxima qualidade e dedicação total, aceitamos um número limitado de novos parceiros a cada mês. Seja um dos poucos a ter acesso à nossa agenda.</p>
          <div className="scarcity-counter">
            Poucas vagas por mês. Garanta o seu projeto agora mesmo!
          </div>
        </div>
      </section>

      <section id="contact" className="final-cta-section">
        <div className="container">
          <h2>Pronto para Ter um Software que Realmente Funciona para Você?</h2>
          <p>Chega de sistemas genéricos que não entendem sua necessidade. Empresas de toda a região já confiam na {fullCompanyName} para impulsionar seus resultados.</p>
          <button onClick={scrollToForm} className="hero-cta-button">
            Solicite uma Proposta Sem Compromisso
          </button>
        </div>
      </section>
      <ContactForm />
    </>
  );
};

export default Home;