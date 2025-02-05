'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from './styles/home.module.css';

const Home = () => {
  const [taLogado, setTalogado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setTalogado(true); 
    }
  }, []);

  return (
    <>
      <Header />
      
      <nav className={styles.menu}>
        <ul className={styles.listaMenu}>
          <li>
            <Link href="/login">
              <button className={styles.botao}>Login</button>
            </Link>
          </li>
          <li>
            <Link href="/cadastrar">
              <button className={styles.botao}>Cadastrar</button>
            </Link>
          </li>
          <li>
            <Link href="/reservas">
              <button className={styles.botao}>Reservar Mesa</button>
            </Link>
          </li>
            <li>
              <Link href="/gestao">
                <button className={styles.botao}>Gestão</button>
              </Link>
            </li>
            </ul>
      </nav>

      <Footer />
    </>
  );
};

export default Home;
