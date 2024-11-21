'use client';

import Link from 'next/link';
import styles from '../styles/header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <a href="/"><img src="/logo.png" alt="Logo" className={styles.logo} /></a>
      <p className={styles.frase}>Cultivando tradições, inovando sabores</p>  
    </header>
  );
};

export default Header;
