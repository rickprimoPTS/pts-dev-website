import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import ReactMarkdown from 'react-markdown';
import ContactForm from '../components/ContactForm';
import './pages.css';

// --- INÍCIO: NOVOS SUBCOMPONENTES PARA CADA TIPO DE BLOCO ---

// Componente para renderizar um bloco de título (h1, h2, etc.)
const HeaderBlock = ({ data }) => {
  const Tag = `h${data.level}`; // Cria a tag h2, h3, etc. dinamicamente
  return <Tag dangerouslySetInnerHTML={{ __html: data.text }} />;
};

// Componente para renderizar um bloco de parágrafo
const ParagraphBlock = ({ data }) => {
  // Usamos dangerouslySetInnerHTML para permitir tags HTML simples como <b> e <i>
  return <p dangerouslySetInnerHTML={{ __html: data.text }} />;
};

// Componente para renderizar um bloco de imagem
const ImageBlock = ({ data }) => {
  return (
    <figure style={{ margin: '20px 0' }}>
      <img src={data.url} alt={data.caption || ''} style={{ width: '100%', borderRadius: '8px' }} />
      {data.caption && <figcaption style={{ textAlign: 'center', fontSize: '0.9em', color: '#555', marginTop: '8px' }}>{data.caption}</figcaption>}
    </figure>
  );
};

// --- FIM: NOVOS SUBCOMPONENTES ---


const BlogPost = () => {
  const { slugPost } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const postsRef = collection(db, "blog_posts");
      const q = query(
        postsRef,
        where("slug", "==", slugPost),
        where("status", "==", "publicado"), // <-- Adiciona esta linha
        limit(1)
      );
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
          {/* --- INÍCIO: NOVA LÓGICA DE RENDERIZAÇÃO --- */}
          {/* Verifica se 'post.conteudo' é uma string (formato antigo) */}
          {typeof post.conteudo === 'string' ? (
            <ReactMarkdown>{post.conteudo}</ReactMarkdown>
          ) : (
            // Se não for string, assume que é um array (formato novo) e mapeia os blocos
            Array.isArray(post.conteudo) && post.conteudo.map((bloco, index) => {
              switch (bloco.type) {
                case 'header':
                  return <HeaderBlock key={index} data={bloco.data} />;
                case 'paragraph':
                  return <ParagraphBlock key={index} data={bloco.data} />;
                case 'image':
                  return <ImageBlock key={index} data={bloco.data} />;
                // Adicione mais 'cases' aqui para outros tipos de bloco no futuro (ex: 'youtube')
                default:
                  return null;
              }
            })
          )}
          {/* --- FIM: NOVA LÓGICA DE RENDERIZAÇÃO --- */}
        </div>
      </div>

      <ContactForm />
    </>
  );
};

export default BlogPost;