// src/App.js

import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa os componentes de layout
import Header from './components/Header';
import Footer from './components/Footer';

// Importa os componentes de página
import Home from './pages/Home';
import Termos from './pages/Termos';
import Privacidade from './pages/Privacidade';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import CategoryPage from './pages/CategoryPage';
// import Chatbot from './components/Chatbot'; // Mantido comentado para uso futuro

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