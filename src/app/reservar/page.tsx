'use client';

import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/login.module.css';
import Button from '../components/Button';
import Link from 'next/link';

const PaginaReservar = () => {
    return (
    <>
      <Header />
        <h1 className={styles.aviso}>Em Breve!</h1>
      <Footer />
    </>
  );
}
export default PaginaReservar;