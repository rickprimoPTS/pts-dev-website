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
    // O <> de fragmento é usado pois este componente retorna múltiplos elementos de nível superior
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
          
          {/* PRODUTO 4: RPA */}
          <div className="solution-detailed-item">
            <div className="solution-image-container">
              <img src={rpaImg} alt="Robôs de software executando automação de processos (RPA)" />
            </div>
            <div className="solution-text-container">
              <ConsultingIcon />
              <h3>RPA (Automação de Processos)</h3>
              <p><strong>Libere sua equipe para o que realmente importa.</strong> Cansado de tarefas repetitivas e demoradas? Nossa solução de <strong>RPA</strong> cria robôs virtuais que executam processos burocráticos de forma autônoma, 24 horas por dia, 7 dias por semana. De planilhas a relatórios, nossa <strong>automação robótica</strong> garante precisão total, eliminando erros manuais e desperdício de tempo.</p>
              <p><strong>Seus concorrentes já estão automatizando. Não fique para trás.</strong> O <strong>mercado de automação no Brasil</strong> está crescendo exponencialmente, e as empresas que investem em <strong>eficiência operacional</strong> saem na frente. Nossos especialistas em <strong>RPA</strong> analisam os fluxos de trabalho da sua empresa para identificar o maior potencial de economia e implementar a solução ideal, com foco em <strong>redução de custos</strong> e <strong>produtividade</strong>.</p>
              <p><strong>Aja agora e garanta a vantagem competitiva.</strong> Comece sua <strong>transformação digital</strong> hoje. Fale com um de nossos consultores para uma <strong>avaliação gratuita</strong> do potencial de <strong>automação</strong> na sua empresa. É a sua chance de otimizar processos e focar no crescimento estratégico.</p>
              <button onClick={scrollToForm} className="solution-cta">Quero automatizar meus processos</button>
            </div>
          </div>

          {/* PRODUTO 1: SISTEMA DE GESTÃO E VITRINE ONLINE */}
          <div className="solution-detailed-item">
            <div className="solution-image-container">
              <img src={vitrineOnlineImg} alt="Ilustração mostrando a conexão entre a loja física e a vitrine online para gestão de pedidos" />
            </div>
            <div className="solution-text-container">
              <h3>Sistema de Gestão com Vitrine Online Integrada</h3>
              <p><strong>Assuma o controle total da sua operação.</strong> Nossa plataforma de gestão (ERP) foi desenhada para o comércio local, permitindo que você gerencie produtos, estoque, e vendas internas de forma intuitiva e 100% online. Acesse seus dados em tempo real, de qualquer lugar, e tome decisões baseadas em informações precisas.</p>
              <p><strong>Abra sua loja para o mundo digital.</strong> Integrada ao sistema de gestão, criamos uma vitrine online (e-commerce) para seus clientes. Eles podem fazer pedidos para retirada, serem notificados automaticamente quando estiver pronto e pagar online. É a experiência de compra moderna que seus clientes esperam, conectada perfeitamente ao seu estoque.</p>
              <p>Reduza custos operacionais e aumente seu alcance, vendendo para clientes muito além do seu bairro, 24 horas por dia, 7 dias por semana.</p>
              <button onClick={scrollToForm} className="solution-cta">Quero para minha loja</button>
            </div>
          </div>

          {/* PRODUTO 2: APLICATIVO DE ENTREGAS */}
          <div className="solution-detailed-item reverse">
            <div className="solution-text-container">
              <AppIcon />
              <h3>Aplicativo de Entregas (Delivery App)</h3>
              <p><strong>Crie seu próprio ecossistema de delivery.</strong> Conecte suas lojas a uma rede de entregadores independentes sem depender de taxas abusivas de aplicativos de terceiros. Nossa plataforma de logística gerencia o fluxo completo: entregadores se cadastram, aceitam corridas e o sistema traça a rota ideal em tempo real.</p>
              <p><strong>Transparência e segurança para todos.</strong> Você e seu cliente acompanham cada passo da entrega no mapa. Ao finalizar, o cliente confirma o recebimento, o motoboy dá baixa no app e sua loja registra a entrega automaticamente, com todos os horários e dados para uma análise completa da venda, de ponta a ponta.</p>
              <p>Ofereça a conveniência máxima aos seus clientes, permitindo que eles comprem de casa e recebam seus produtos sem enfrentar filas ou trânsito.</p>
              <button onClick={scrollToForm} className="solution-cta">Saiba mais sobre a plataforma</button>
            </div>
            <div className="solution-image-container">
              <img src={deliveryAppImg} alt="Ilustração de um aplicativo de compras online com entrega por caminhão ou por motoboy" />
            </div>
          </div>

          {/* PRODUTO 3: APLICATIVOS WEBEBASE E MARKETING */}
          <div className="solution-detailed-item">
            <div className="solution-image-container">
              <img src={webAppImg} alt="Celular mostrando um webapp com ofertas e descontos de uma loja" />
            </div>
            <div className="solution-text-container">
              <ConsultingIcon />
              <h3>Web Apps de Fidelização e Marketing</h3>
              <p><strong>Converse diretamente com seu cliente, sem intermediários.</strong> Crie um canal de marketing poderoso com aplicativos "web-base" que não exigem download em loja de apps. Com um simples QR Code na sua loja, seu cliente "instala" seu ícone na tela inicial do celular, abrindo uma porta para a fidelização.</p>
              <p><strong>Transforme dados em lucro.</strong> Envie ofertas e cupons de desconto segmentados com base no comportamento real do seu público. Nossa plataforma analisa tendências de consumo, produtos de interesse e os melhores horários para promoções, permitindo que você crie campanhas de marketing que realmente convertem.</p>
              <button onClick={scrollToForm} className="solution-cta">Quero fidelizar meus clientes</button>
            </div>
          </div>
        </div>
      </section>

      <section className="scarcity-section">
          <div className="container">
              <h2 className="section-title">Agenda Exclusiva para Novos Projetos de Software</h2>
              <p>Para garantir a máxima qualidade e dedicação total, aceitamos um número limitado de novos parceiros a cada mês. Seja um dos poucos a ter acesso à nossa agenda.</p>
              <button onClick={scrollToForm} className="hero-cta-button" style={{ marginTop: '20px' }}>
                  Poucas vagas por mês. Garanta o seu projeto agora mesmo!
              </button>
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

      <ContactForm />
    </>
  );
};

export default Home;