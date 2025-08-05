import React from 'react';
import './App.css';
import ContactForm from './components/ContactForm';
import logo from './assets/logo.png';
import vitrineOnlineImg from './assets/vitrine-online.jpg'; // Adicione esta linha
import deliveryAppImg from './assets/delivery-app.jpg';
import webAppImg from './assets/web-app.jpg'; // Adicione esta linha

// --- ÍCONES ---


const AppIcon = () => <svg height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>;
const ConsultingIcon = () => <svg height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>;
const PlatformIcon = () => <svg height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>;

function App() {
  const contactEmail = "contato@pts.dev.br";
  const companyName = "PTS DEV";
  const fullCompanyName = "Primo Trade Solutions LTDA";
  

  
  const scrollToForm = () => {
  const formSection = document.getElementById('contact-form-section');
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth' });
  }
};

  return (
    <div className="App">
      <header className="main-header">
        <div className="container">
          <img src={logo} alt="Logo da Primo Trade Solutions - Desenvolvimento de Apps" className="logo-image" />
          <nav>
            <a href="#solutions">Soluções</a>
            <a href="#about">Sobre Nós</a>
            <a href="#contact" className="cta-button">Fale conosco</a>
          </nav>
        </div>
      </header>

      

      <main>
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
      Entendemos os desafios do varejo físico. As longas filas, o controle de estoque, a dificuldade de alcançar novos clientes. É por isso que a PTS DEV existe. Nossa missão é pegar o melhor dos dois mundos - a conveniência do online com a experiência da loja física - e criar uma solução integrada que funciona para você. Somos mais do que desenvolvedores; somos seus parceiros na jornada de transformação digital.
    </p>
  </div>
</section>

        <section id="solutions" className="solutions-section">
          <div className="container">
            <h2 className="section-title">Desenvolvimento de Software Sob Medida para Digitalizar e Automatizar seu Comércio</h2>
            <p className="section-subtitle">Construímos as ferramentas que integram sua operação, da gestão interna à entrega final.</p>
            
            {/* PRODUTO 1: SISTEMA DE GESTÃO E VITRINE ONLINE */}
          <div className="solution-detailed-item">
            <div className="solution-image-container">
              {/* Substitua por uma imagem real do seu sistema de gestão */}
              <img src={vitrineOnlineImg} alt="Ilustração mostrando a conexão entre a loja física e a vitrine online para gestão de pedidos" />
            </div>
            <div className="solution-text-container">
              <PlatformIcon />
              <h3>Sistema de Gestão com Vitrine Online Integrada</h3>
              <p>
                <strong>Assuma o controle total da sua operação.</strong> Nossa plataforma de gestão (ERP) foi desenhada para o comércio local, permitindo que você gerencie produtos, estoque, e vendas internas de forma intuitiva e 100% online. Acesse seus dados em tempo real, de qualquer lugar, e tome decisões baseadas em informações precisas.
              </p>
              <p>
                <strong>Abra sua loja para o mundo digital.</strong> Integrada ao sistema de gestão, criamos uma vitrine online (e-commerce) para seus clientes. Eles podem fazer pedidos para retirada, serem notificados automaticamente quando estiver pronto e pagar online. É a experiência de compra moderna que seus clientes esperam, conectada perfeitamente ao seu estoque.
              </p>
              <p>Reduza custos operacionais e aumente seu alcance, vendendo para clientes muito além do seu bairro, 24 horas por dia, 7 dias por semana.</p>
              <button onClick={scrollToForm} className="solution-cta">Quero para minha loja</button>
            </div>
          </div>

          {/* PRODUTO 2: APLICATIVO DE ENTREGAS */}
          <div className="solution-detailed-item reverse">
            <div className="solution-text-container">
              <AppIcon />
              <h3>Aplicativo de Entregas (Delivery App)</h3>
              <p>
                <strong>Crie seu próprio ecossistema de delivery.</strong> Conecte suas lojas a uma rede de entregadores independentes sem depender de taxas abusivas de aplicativos de terceiros. Nossa plataforma de logística gerencia o fluxo completo: entregadores se cadastram, aceitam corridas e o sistema traça a rota ideal em tempo real.
              </p>
              <p>
                <strong>Transparência e segurança para todos.</strong> Você e seu cliente acompanham cada passo da entrega no mapa. Ao finalizar, o cliente confirma o recebimento, o motoboy dá baixa no app e sua loja registra a entrega automaticamente, com todos os horários e dados para uma análise completa da venda, de ponta a ponta.
            </p>
            <p>Ofereça a conveniência máxima aos seus clientes, permitindo que eles comprem de casa e recebam seus produtos sem enfrentar filas ou trânsito.</p>
              <button onClick={scrollToForm} className="solution-cta">Saiba mais sobre a plataforma</button>
            </div>
            <div className="solution-image-container">
              {/* Substitua por uma imagem real do seu app de entregas */}
              <img src={deliveryAppImg} alt="Ilustração de um aplicativo de compras online com entrega por caminhão ou por motoboy" />
            </div>
          </div>

          {/* PRODUTO 3: APLICATIVOS WEBEBASE E MARKETING */}
          <div className="solution-detailed-item">
            <div className="solution-image-container">
              {/* Substitua por uma imagem real de um webapp no celular */}
              <img src={webAppImg} alt="Celular mostrando um webapp com ofertas e descontos de uma loja" />
            </div>
            <div className="solution-text-container">
              <ConsultingIcon />
              <h3>Web Apps de Fidelização e Marketing</h3>
              <p>
                <strong>Converse diretamente com seu cliente, sem intermediários.</strong> Crie um canal de marketing poderoso com aplicativos "web-base" que não exigem download em loja de apps. Com um simples QR Code na sua loja, seu cliente "instala" seu ícone na tela inicial do celular, abrindo uma porta para a fidelização.
              </p>
              <p>
                <strong>Transforme dados em lucro.</strong> Envie ofertas e cupons de desconto segmentados com base no comportamento real do seu público. Nossa plataforma analisa tendências de consumo, produtos de interesse e os melhores horários para promoções, permitindo que você crie campanhas de marketing que realmente convertem.
              </p>
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
            <p>Chega de sistemas genéricos que não entendem sua necessidade. Empresas de toda a região já confiam na {fullCompanyName} para impulsionar seus resultados. Fale agora com um de nossos especialistas e dê o primeiro passo para a transformação digital definitiva.</p>
            <button onClick={scrollToForm} className="hero-cta-button">
              
              Solicite uma Proposta Sem Compromisso
            </button>
          </div>
        </section>
        <ContactForm /> {/* ADICIONE ESTA LINHA */}
      </main>

      <footer className="main-footer">
        <div className="container">
          <div className="footer-about">
            <img src={logo} alt="PLogo da PTS DEV - Empresa de Desenvolvimento de Software" className="logo-image-footer" />
            <p>PTS DEV é Uma divisão de desenvolvimento e tecnologia da {fullCompanyName}. Construindo o futuro do comércio com soluções inovadoras.</p>
            <p><strong>Contato Imediato (WhatsApp):</strong> +55 11 9 7721-1739</p>
            <p><strong>E-mail:</strong> <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
          </div>
          <div className="footer-links">
            <h4>Navegação</h4>
            <ul>
              <li><a href="#solutions">Soluções</a></li>
              <li><a href="#about">Sobre a PTS DEV</a></li>
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