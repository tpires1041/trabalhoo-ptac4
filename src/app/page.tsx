'use client';

import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from './styles/home.module.css';

const Home = () => {
  return (
    <>
      <Header />
      
      <nav className={styles.menu}>
        <ul className={styles.listaMenu}>
          <li><Link href="/login"><button className={styles.botao}>Login</button></Link></li>
          <li><Link href="/cadastrar"><button className={styles.botao}>Cadastrar</button></Link></li>
          <li><Link href="/reservar"><button className={styles.botao}>Reservar Mesa</button></Link></li>
        </ul>
      </nav>

      <Footer />
    </>
  );
};

export default Home;
