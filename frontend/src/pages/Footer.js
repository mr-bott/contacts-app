// Footer.js
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import '../ContactApp.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Contact Manager. All rights reserved.</p>
        <div className="footer-links">
          <a href="mailto:muralikrishna8309@gmail.com" target="_blank" rel="noopener noreferrer">
            <Mail size={18} /> Email
          </a>
          <a href="https://github.com/mr-bott" target="_blank" rel="noopener noreferrer">
            <Github size={18} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/murali-krishna-abbugondi/" target="_blank" rel="noopener noreferrer">
            <Linkedin size={18} /> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
