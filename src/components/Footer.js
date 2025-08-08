// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css';

const Footer = () => {
  const contactEmail = "contato@pts.dev.br";
  const companyName = "PTS DEV";
  const fullCompanyName = "Primo Trade Solutions LTDA";

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-about">
          <img src={logo} alt="Logo da PTS DEV - Empresa de Desenvolvimento de Software" className="logo-image-footer" />
          <p>PTS DEV é Uma divisão de desenvolvimento e tecnologia da {fullCompanyName}. Construindo o futuro do comércio com soluções inovadoras.</p>
          <p><strong>Contato Imediato (WhatsApp):</strong> +55 11 9 7721-1739</p>
          <p><strong>E-mail:</strong> <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
        </div>
        <div className="footer-links">
          <h4>Navegação</h4>
          <ul>
            <li><a href="/#solutions">Soluções</a></li>
            <li><a href="/#about">Sobre a PTS DEV</a></li>
            <li><a href="/#contact">Contato</a></li>
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
            <Link to="/politica-de-privacidade">Política de Privacidade</Link>
            <Link to="/termos-e-condicoes">Termos e Condições</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;