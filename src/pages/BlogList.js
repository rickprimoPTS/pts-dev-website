// src/pages/BlogList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, getDocs, orderBy, where } from "firebase/firestore";
import ContactForm from '../components/ContactForm';
import './BlogLayout.css';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRef = collection(db, "blog_categorias");
        const categorySnapshot = await getDocs(categoriesRef);
        const categoriesData = categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCategories(categoriesData);

        const postsRef = collection(db, "blog_posts");
        const q = query(postsRef, where("status", "==", "publicado"), orderBy("dataCriacao", "desc"));
        const postSnapshot = await getDocs(q);
        const postsData = postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);

      } catch (error) {
        console.error("Erro ao buscar dados do blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="blog-container">Carregando...</div>;
  }

  return (
    <>
      <title>Blog | PTS DEV - Automação e Desenvolvimento de Software</title>
      <meta name="description" content="Artigos e insights sobre tecnologia, desenvolvimento de software, automação de processos (RPA) e transformação digital para negócios." />

      <div className="blog-header">
        <h1>Nosso Blog</h1>
        <p>Artigos e insights sobre tecnologia e transformação digital.</p>
      </div>

      <div className="blog-layout-container">
        <aside className="blog-sidebar">
          <h3>Categorias</h3>
          <ul>
            <li><Link to="/blog">Todos os posts</Link></li>
            {categories.map(category => (
              <li key={category.id}>
                <Link to={`/blog/categoria/${category.slug}`}>{category.nome}</Link>
              </li>
            ))}
          </ul>
        </aside>

        <main className="blog-main-content">
          {posts.map(post => {
            // Para cada post, encontramos sua categoria correspondente para pegar o slug
            const postCategory = categories.find(cat => cat.id === post.categoriaId);
            // Se a categoria for encontrada, montamos o link completo
            const postUrl = postCategory ? `/blog/categoria/${postCategory.slug}/${post.slug}` : `/blog/${post.slug}`;

            return (
              <div key={post.id} className="blog-card">
                <img src={post.urlImagemDestaque} alt={post.titulo} className="blog-card-image" />
                <div className="blog-card-content">
                  <h2>{post.titulo}</h2>
                  <p>{post.resumo}</p>
                  <Link to={postUrl} className="solution-cta">Ler Mais</Link>
                </div>
              </div>
            );
          })}
        </main>
      </div>
      
      <ContactForm />
    </>
  );
};

export default BlogList;