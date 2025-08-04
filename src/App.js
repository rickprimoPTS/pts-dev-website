import React from 'react';
import './App.css';
import logo from './assets/logo.png';

// --- ÍCONES ---
const WhatsAppIcon = () => <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19.05 4.94A10 10 0 0 0 4.94 19.05 10 10 0 0 0 19.05 4.94M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.12 14.22c-.22.12-.48.2-1.03.05-.55-.15-1.3-.5-1.88-.88s-.88-1.07-.98-1.25c-.1-.18-.1-.28.08-.43s.4-.48.5-.6c.1-.12.15-.22.1-.38s-.42-1-.58-1.38c-.16-.38-.32-.3-.48-.3s-.4.05-.55.05h-.3c-.22 0-.48.08-.7.32s-.88.85-1.08 2.05c-.2 1.2.3 2.4 1.25 3.35 1.75 1.7 3.68 2.22 5.58 1.95.4-.08.75-.32.9-.68s.15-1 .15-1.12-.05-.18-.1-.22z" fill="#fff"/></svg>;
const SoftwareIcon = () => <svg height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1" /></svg>;
const AppIcon = () => <svg height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>;
// NOVO ÍCONE PARA RPA (AUTOMAÇÃO)
const RpaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 14H9"/><path d="M15 14H16"/><path d="M12 8V4H8V8H12Z"/></svg>;
const ConsultingIcon = () => <svg height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>;
const MaintenanceIcon = () => <svg height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>;

function App() {
  const whatsappNumber = "5511977211739";
  const contactEmail = "contato@pts.dev.br";
  const companyName = "PTS DEV";
  const fullCompanyName = "Primo Trade Solutions LTDA";
  const vagas = 5;

  const handleWhatsAppClick = () => {
    window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=Olá! Vim pelo site da ${companyName} e gostaria de mais informações sobre as soluções de desenvolvimento.`, '_blank');
  };

  return (
    <div className="App">
      <header className="main-header">
        <div className="container">
          <img src={logo} alt="PTS DEV Logo" className="logo-image" />
          <nav>
            <a href="#solutions">Soluções</a>
            <a href="#about">Sobre Nós</a>
            <a href="#contact" className="cta-button">Fale com um Especialista</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="container">
            <h1>Sua empresa está preparada para o futuro digital?</h1>
            <h2>A concorrência não vai esperar. Nós criamos as ferramentas para você vencer.</h2>
            <p>Desenvolvemos soluções em software e aplicativos sob medida que impulsionam o comércio e colocam seu negócio à frente no mercado.</p>
            <button onClick={handleWhatsAppClick} className="hero-cta-button">
              <WhatsAppIcon />
              Quero uma Consultoria Gratuita Agora
            </button>
          </div>
        </section>

        <section id="solutions" className="solutions-section">
          <div className="container">
            <h2 className="section-title">Transforme Seus Desafios em Oportunidades Lucrativas</h2>
            <p className="section-subtitle">Soluções que resolvem problemas reais do seu dia a dia.</p>
            {/* GRADE DE SOLUÇÕES ATUALIZADA COM 5 ITENS */}
            <div className="solutions-grid">
              <div className="solution-card">
                <SoftwareIcon />
                <h3>Sistemas de Gestão (ERP/CRM)</h3>
                <p>Centralize suas operações, automatize tarefas e tenha uma visão 360° do seu negócio.</p>
              </div>
              <div className="solution-card">
                <AppIcon />
                <h3>Aplicativos Comerciais (Android/iOS)</h3>
                <p>Fidelize clientes e expanda suas vendas com um aplicativo próprio para sua loja ou serviço.</p>
              </div>
              {/* NOVO CARD DE AUTOMAÇÃO (RPA) */}
              <div className="solution-card">
                <RpaIcon />
                <h3>Automação de Processos (RPA)</h3>
                <p>Elimine tarefas manuais repetitivas e libere sua equipe para focar no que realmente importa.</p>
              </div>
              <div className="solution-card">
                <ConsultingIcon />
                <h3>Consultoria em Gestão e Tecnologia</h3>
                <p>Nossa expertise para otimizar seus processos e garantir que a tecnologia trabalhe a seu favor.</p>
              </div>
              <div className="solution-card">
                <MaintenanceIcon />
                <h3>Manutenção e Suporte Especializado</h3>
                <p>Garantimos que seus sistemas e equipamentos operem sempre com máxima performance.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="scarcity-section">
            <div className="container">
                <h3>VAGAS LIMITADAS PARA NOVOS PROJETOS!</h3>
                <p>Para garantir a máxima qualidade e dedicação total, aceitamos um número limitado de novos parceiros a cada mês. Seja um dos poucos a ter acesso à nossa agenda.</p>
                <div className="scarcity-counter">
                    Restam apenas <strong>{vagas}</strong> vagas para este mês.
                </div>
            </div>
        </section>

        <section id="contact" className="final-cta-section">
          <div className="container">
            <h2>Imagine seu negócio operando com 100% de eficiência.</h2>
            <p>Chega de sistemas genéricos que não entendem sua necessidade. Empresas de toda a região já confiam na {fullCompanyName} para impulsionar seus resultados. Fale agora com um de nossos especialistas e dê o primeiro passo para a transformação digital definitiva.</p>
            <button onClick={handleWhatsAppClick} className="hero-cta-button">
              <WhatsAppIcon />
              Falar com um Especialista via WhatsApp
            </button>
          </div>
        </section>
      </main>

      <footer className="main-footer">
        <div className="container">
          <div className="footer-about">
            <img src={logo} alt="PTS DEV Logo" className="logo-image-footer" />
            <p>Uma divisão de desenvolvimento e tecnologia da {fullCompanyName}. Construindo o futuro do comércio com soluções inovadoras.</p>
            <p><strong>Contato Imediato (WhatsApp):</strong> +55 11 9 7721-1739</p>
            <p><strong>E-mail:</strong> <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
          </div>
          <div className="footer-links">
            <h4>Navegação</h4>
            <ul>
              <li><a href="#solutions">Soluções</a></li>
              <li><a href="#about">Sobre Nós</a></li>
              <li><a href="#contact">Contato</a></li>
            </ul>
          </div>
          <div className="footer-legal">
            <h4>Informações</h4>
            <p><strong>Matriz (SP):</strong> Rua Eugene Carriere, 30, CJ 06 T1 - São Paulo/SP</p>
            <p>CNPJ: 42.419.988/0001-78</p>
            <p><strong>Filial (SC):</strong> Rua Dr. Pedro Ferreira, 333, Sala 1206 - Itajaí/SC</p>
            <p>CNPJ: 42.419.988/0002-59</p>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <p>© 2025 {companyName}. Todos os direitos reservados.</p>
            <div className="bottom-links">
              <a href="/politica-de-privacidade">Política de Privacidade</a>
              <a href="/termos-de-uso">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;