'use client';

import { useState, FormEvent } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/login.module.css';
import Button from '../components/Button';

const PaginaReservar = () => {
  const [mesa, setMesa] = useState('');
  const [data, setData] = useState('');
  const [nPessoas, setNPessoas] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!mesa || !data || !nPessoas) {
      setErrorMsg('Preencha todos os campos para continuar.');
    } else {
      setErrorMsg('');
      alert('Reserva feita com sucesso!');
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.background}></div>
        <form onSubmit={handleSubmit} className={styles.formulario}>
          <h1 className={styles.titulo}>Reservar Mesa</h1>
          <div className={styles.grupoInput}>
            <label htmlFor="mesa" className={styles.label}>
              Mesa:
            </label>
            <input
              type="number"
              id="mesa"
              value={mesa}
              onChange={(e) => setMesa(e.target.value)}
              className={styles.input}
              placeholder="Digite o número da mesa"
            />
          </div>
          <div className={styles.grupoInput}>
            <label htmlFor="data" className={styles.label}>
              Data:
            </label>
            <input
              type="date"
              id="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.grupoInput}>
            <label htmlFor="nPessoas" className={styles.label}>
              Número de Pessoas:
            </label>
            <input
              type="number"
              id="nPessoas"
              value={nPessoas}
              onChange={(e) => setNPessoas(e.target.value)}
              className={styles.input}
              placeholder="Digite o número de pessoas"
            />
          </div>
          {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
          <Button titulo="Reservar" tipo="submit" />
        </form>
      </div>
      <Footer />
    </>
  );
};

export default PaginaReservar;
