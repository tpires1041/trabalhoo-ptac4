'use client';  

import Link from 'next/link';  


import styles from '../styles/header.module.css';  

// cria o componente do cabeçalho  
const Header = () => {  
  return (  
    <header className={styles.header}> 
      <a href="/">   
        <img src="/logo.png" alt="Logo" className={styles.logo} />
      </a>  
      <h1 className={styles.frase}>Cultivando tradições, inovando sabores</h1>
    </header>  
  );  
};  

export default Header;  