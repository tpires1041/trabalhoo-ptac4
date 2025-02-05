'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './../styles/gestao.module.css'; // importa o css

const Gestao = () => {
  return (
    <>
      <Header /> 
      
      <div className={styles.container}>
        <h1 className={styles.title}>Gestão</h1> 
        <div className={styles.gestaoMenu}>
          <Link href="/gestao/reservasgestao">
            <button className={styles.botao}>Gerenciar Reservas</button>
          </Link>
          <Link href="/gestao/mesasgestao">
            <button className={styles.botao}>Gerenciar Mesas</button>
          </Link>
        </div>
      </div>

      <Footer /> 
    </>
  );
};

export default Gestao;
