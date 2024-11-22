'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/cadastrar.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { ApiURL } from '../../../config';
import { setCookie } from 'nookies';

const PaginaCadastro = () => {
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    password: '',
    tipo: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [id]: value
    }));
  };

  const handleCadastro = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${ApiURL}/auth/cadastro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      });
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        const { erro, mensagem, token } = data;
        console.log(mensagem)

        if (erro) {
          setErrorMsg(mensagem);
        } else {
          setCookie(undefined, 'restaurant-token', token, {
            maxAge: 60 * 60 * 1
          });
          router.push('/');
        }
      } else {
        setErrorMsg('Erro ao fazer login. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro na requisição', error);
      setErrorMsg('Ocorreu um erro. Tente novamente mais tarde.');
    }
  };

  return (
    <>
    <Header />
    <div className={styles.container}>
    <div className={styles.background}></div>
      <form onSubmit={handleCadastro} className={styles.formulario}>
        <h1 className={styles.titulo}>Cadastrar</h1>
        <div className={styles.grupoInput}>
          <label htmlFor="nome" className={styles.label}>Nome:</label>
          <input
            type="text"
            id="nome"
            value={usuario.nome}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <div className={styles.grupoInput}>
          <label htmlFor="tipo" className={styles.label}>Tipo:</label>
          <input
            type="text"
            id="tipo"
            value={usuario.tipo}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <div className={styles.grupoInput}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            type="text"
            id="email"
            value={usuario.email}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <div className={styles.grupoInput}>
          <label htmlFor="password" className={styles.label}>Senha:</label>
          <input
            type="password"
            id="password"
            value={usuario.password}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
        <Button titulo='Cadastrar' tipo='submit' />
      </form>
    </div>
    <Footer />
    </>
  );
};

export default PaginaCadastro;
