// src/components/Header.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // A tag <Link> já está aqui
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import logo from '../assets/logo.png';
import '../App.css';

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesRef = collection(db, "blog_categorias");
      const categorySnapshot = await getDocs(categoriesRef);
      const categoriesData = categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  return (
    <header className="main-header">
      <div className="container">
        <Link to="/"><img src={logo} alt="Logo da Primo Trade Solutions - Desenvolvimento de Apps" className="logo-image" /></Link>
        <nav>
          <div className="nav-dropdown">
            <Link to="/" className="nav-link">Página Inicial</Link>
            <div className="dropdown-content">
              <Link to="/termos-e-condicoes">Termos e Condições</Link>
              <Link to="/politica-de-privacidade">Política de Privacidade</Link>
            </div>
          </div>

          <div className="nav-dropdown">
            <Link to="/blog" className="nav-link">Blog</Link>
            <div className="dropdown-content">
              <Link to="/blog">Todas as categorias</Link>
              {/* ↓↓↓ ALTERAÇÃO AQUI ↓↓↓ */}
              {categories.map(category => (
                // Trocamos <a> por <Link> e ajustamos o 'to'
                <Link to={`/blog/categoria/${category.slug}`} key={category.id}>
                  {category.nome}
                </Link>
              ))}
            </div>
          </div>

          <a href="/#solutions" className="nav-link">Soluções</a>
          <a href="/#about" className="nav-link">Sobre Nós</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;