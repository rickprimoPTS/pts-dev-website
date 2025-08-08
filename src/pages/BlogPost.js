import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import ReactMarkdown from 'react-markdown';
import ContactForm from '../components/ContactForm'; // Importa o formulário
import './pages.css'; // Reutiliza o CSS original

const BlogPost = () => {
  const { slugPost } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const postsRef = collection(db, "blog_posts");
      const q = query(postsRef, where("slug", "==", slugPost), limit(1));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setPost(querySnapshot.docs[0].data());
      }
      setLoading(false);
    };

    fetchPost();
  }, [slugPost]);

  if (loading) {
    return <div className="legal-container">Carregando...</div>;
  }

  if (!post) {
    return (
      <>
        <title>Post não encontrado | PTS DEV</title>
        <div className="legal-container"><h1>Post não encontrado!</h1></div>
        <ContactForm />
      </>
    );
  }

  return (
    <>
      <title>{post.seoTitulo}</title>
      <meta name="description" content={post.seoDescricao} />
      {post.palavrasChave && <meta name="keywords" content={post.palavrasChave.join(', ')} />}
      
      <div className="legal-container">
        <img src={post.urlImagemDestaque} alt={post.titulo} style={{ width: '100%', borderRadius: '8px', marginBottom: '20px' }} />
        <h1>{post.titulo}</h1>
        <p><em>Por {post.autorNome} | Tempo de leitura: {post.tempoLeitura} min</em></p>
        <hr />
        <div className="post-content">
          <ReactMarkdown>{post.conteudo}</ReactMarkdown>
        </div>
      </div>

      <ContactForm />
    </>
  );
};

export default BlogPost;