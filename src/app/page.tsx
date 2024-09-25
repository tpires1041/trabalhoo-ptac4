'use client';

import Link from 'next/link';
import styles from './styles/home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Bem-vindo!</h1>
      <Link href="/login" className={styles.link}>Ir para a página de login</Link>
    </div>
  );
};

export default Home;
