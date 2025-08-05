// src/components/ContactForm.js

import React, { useState } from 'react';
import './ContactForm.css'; // Criaremos este arquivo de estilo a seguir
import { db } from '../firebase'; // Importa nosso banco de dados
import { collection, addDoc, serverTimestamp } from "firebase/firestore";



const ContactForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    telefone: '',
    email: '',
    empresa: '',
    cnpj: '',
    necessidade: '',
    aceitouTermos: false,
    aceitouMarketingTelefone: false,
    aceitouMarketingEmail: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o recarregamento da página

    try {
        // Cria um novo "documento" (ticket) na coleção "solicitacoes"
        await addDoc(collection(db, "solicitacoes"), {
            dadosCliente: {
                nome: formData.nome,
                sobrenome: formData.sobrenome,
                telefone: formData.telefone,
                email: formData.email,
                empresa: formData.empresa,
                cnpj: formData.cnpj,
                necessidade: formData.necessidade,
            },
            consentimentos: {
                aceitouTermos: formData.aceitouTermos,
                dataAceiteTermos: formData.aceitouTermos ? serverTimestamp() : null,
                aceitouMarketingTelefone: formData.aceitouMarketingTelefone,
                dataAceiteMarketingTelefone: formData.aceitouMarketingTelefone ? serverTimestamp() : null,
                aceitouMarketingEmail: formData.aceitouMarketingEmail,
                dataAceiteMarketingEmail: formData.aceitouMarketingEmail ? serverTimestamp() : null,
            },
            status: 'novo',
            dataCriacao: serverTimestamp() // Usa o timestamp do servidor para a data
        });

        alert("Solicitação enviada com sucesso! Entraremos em contato em breve.");

        // Limpa o formulário após o envio bem-sucedido
        setFormData({
            nome: '', sobrenome: '', telefone: '', email: '',
            empresa: '', cnpj: '', necessidade: '',
            aceitouTermos: false, aceitouMarketingTelefone: false, aceitouMarketingEmail: false,
        });

    } catch (error) {
        console.error("Erro ao enviar a solicitação: ", error);
        alert("Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente.");
    }
};
  return (
    <section id="contact-form-section" className="contact-form-section">
      <div className="container">
        <h2 className="section-title">Fale com um Especialista em Desenvolvimento de Software</h2>
        <p className="section-subtitle">Informe a sua necessidade e vamos retornar o contato em breve!</p>
        
        <form className="form-grid" onSubmit={handleSubmit}>
    {/* --- Linha 1: Nome e Sobrenome --- */}
    <div className="form-group">
      <label htmlFor="nome">Nome</label>
      <input type="text" id="nome" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label htmlFor="sobrenome">Sobrenome</label>
      <input type="text" id="sobrenome" name="sobrenome" placeholder="Sobrenome" value={formData.sobrenome} onChange={handleChange} />
    </div>

    {/* --- Linha 2: Telefone e Email --- */}
    <div className="form-group">
      <label htmlFor="telefone">Telefone *</label>
      <input type="tel" id="telefone" name="telefone" placeholder="Telefone" required value={formData.telefone} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label htmlFor="email">Email *</label>
      <input type="email" id="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
    </div>

    {/* --- Linha 3: Empresa e CNPJ --- */}
    <div className="form-group">
      <label htmlFor="empresa">Empresa</label>
      <input type="text" id="empresa" name="empresa" placeholder="Empresa" value={formData.empresa} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label htmlFor="cnpj">CNPJ</label>
      <input type="text" id="cnpj" name="cnpj" placeholder="CNPJ" value={formData.cnpj} onChange={handleChange} />
    </div>

    {/* --- Linha 4: Mensagem --- */}
    <div className="form-group full-width">
      <label htmlFor="necessidade">Informe a sua necessidade: *</label>
      <textarea id="necessidade" name="necessidade" rows="6" placeholder="Deixe uma mensagem contendo os detalhes do seu projeto e como podemos te ajudar" value={formData.necessidade} onChange={handleChange}></textarea>
    </div>

    {/* --- Linha 5: Checkboxes LGPD --- */}
    <div className="form-group-checkbox full-width">
      <input type="checkbox" id="aceitouTermos" name="aceitouTermos" required checked={formData.aceitouTermos} onChange={handleCheckboxChange} />
      <label htmlFor="aceitouTermos">Concordo com os <a href="/termos-e-condicoes" target="_blank" rel="noopener noreferrer">termos e condições</a> e com a <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">política de privacidade</a>.</label>
    </div>
    <div className="form-group-checkbox full-width">
      <input type="checkbox" id="aceitouMarketingTelefone" name="aceitouMarketingTelefone" checked={formData.aceitouMarketingTelefone} onChange={handleCheckboxChange} />
      <label htmlFor="aceitouMarketingTelefone">Aceito receber comunicações, notícias e promoções da Primo Trade Solutions por Telefone, Whatsapp e aplicativos de mensagem instantânea.</label>
    </div>
    <div className="form-group-checkbox full-width">
      <input type="checkbox" id="aceitouMarketingEmail" name="aceitouMarketingEmail" checked={formData.aceitouMarketingEmail} onChange={handleCheckboxChange} />
      <label htmlFor="aceitouMarketingEmail">Aceito receber comunicações, notícias e promoções da Primo Trade Solutions por e-mail.</label>
    </div>

    {/* --- Linha 6: Botão --- */}
    <div className="form-group full-width">
      <button type="submit" className="submit-button">Enviar Solicitação</button>
    </div>
  </form>
      </div>
    </section>
  );
};

export default ContactForm;