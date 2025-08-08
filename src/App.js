import React from 'react';
import './App.css';
import ContactForm from './components/ContactForm';
import logo from './assets/logo.png';
import vitrineOnlineImg from './assets/vitrine-online.jpg'; // Adicione esta linha
import deliveryAppImg from './assets/delivery-app.jpg';
import webAppImg from './assets/web-app.jpg'; // Adicione esta linha
import rpaImg from './assets/rpa.jpg'; // Adicione esta linha
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Termos from './pages/Termos';
import Home from './pages/Home';
import Privacidade from './pages/Privacidade';
// import Chatbot from './components/Chatbot';
import BlogList from './pages/BlogList';   // <--- ADICIONAR
import BlogPost from './pages/BlogPost';   // <--- ADICIONAR
import CategoryPage from './pages/CategoryPage';
import Header from './components/Header'; // Você vai criar este componente
import Footer from './components/Footer'; // Você vai criar este componente


function App() {
  return (
    <BrowserRouter>
      <Header /> {/* Header fica aqui, fora das rotas */}
      <main>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/termos-e-condicoes" element={<Termos />} />
        <Route path="/politica-de-privacidade" element={<Privacidade />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/categoria/:slugCategoria" element={<CategoryPage />} />
        {/* A rota do post agora espera o slug da categoria também */}
        <Route path="/blog/categoria/:slugCategoria/:slugPost" element={<BlogPost />} />
      </Routes>
      </main>
      {/* O Chatbot pode ficar aqui para aparecer em todas as páginas */}
      {/* <Chatbot /> */}
      <Footer /> {/* Footer fica aqui, fora das rotas */}
    </BrowserRouter>
  );
}

export default App;