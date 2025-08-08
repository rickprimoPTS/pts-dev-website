// src/pages/CategoryPage.js

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, getDocs, orderBy, where, limit } from "firebase/firestore";
import ContactForm from '../components/ContactForm';
import './BlogLayout.css';

const CategoryPage = () => {
  const { slugCategoria } = useParams();
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!slugCategoria) return;

      try {
        setLoading(true);
        const categoriesRef = collection(db, "blog_categorias");
        const categoryQuery = query(categoriesRef, where("slug", "==", slugCategoria), limit(1));
        const categorySnapshot = await getDocs(categoryQuery);

        if (categorySnapshot.empty) {
          setError('Categoria não encontrada.');
          setLoading(false);
          return;
        }

        const categoryData = categorySnapshot.docs[0].data();
        const categoryId = categorySnapshot.docs[0].id;
        setCategory(categoryData);

        const postsRef = collection(db, "blog_posts");
        const postsQuery = query(
          postsRef,
          where("status", "==", "publicado"),
          where("categoriaId", "==", categoryId),
          orderBy("dataCriacao", "desc")
        );
        const postSnapshot = await getDocs(postsQuery);
        const postsData = postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);

      } catch (err) {
        console.error("Erro ao buscar dados da categoria:", err);
        setError('Ocorreu um erro ao carregar os posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [slugCategoria]);

  if (loading) {
    return <div className="blog-container">Carregando posts...</div>;
  }
  
  if (error) {
    return <div className="blog-container"><h1>{error}</h1></div>;
  }

  return (
    <>
      <title>Posts na Categoria: {category?.nome} | PTS DEV</title>
      
      <div className="blog-header">
        <h1>Categoria: {category?.nome}</h1>
        <p>Exibindo todos os artigos relacionados a {category?.nome}.</p>
      </div>

      <div className="blog-layout-container">
        <aside className="blog-sidebar">
          <h3>Categorias</h3>
          <ul>
            <li><Link to="/blog">Voltar para Todos os posts</Link></li>
          </ul>
        </aside>

        <main className="blog-main-content">
          {posts.length > 0 ? (
            posts.map(post => (
              <div key={post.id} className="blog-card">
                <img src={post.urlImagemDestaque} alt={post.titulo} className="blog-card-image" />
                <div className="blog-card-content">
                  <h2>{post.titulo}</h2>
                  <p>{post.resumo}</p>
                  {/* O link agora inclui o slug da categoria atual */}
                  <Link to={`/blog/categoria/${slugCategoria}/${post.slug}`} className="solution-cta">Ler Mais</Link>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum post encontrado nesta categoria.</p>
          )}
        </main>
      </div>
      
      <ContactForm />
    </>
  );
};

export default CategoryPage;