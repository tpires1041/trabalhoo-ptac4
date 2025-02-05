'use client';

// importa hooks do react e next/router
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

// importa estilos e componentes
import styles from '../styles/cadastrar.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { ApiURL } from '../../../config';
import { setCookie } from 'nookies';

// componente de cadastro
const PaginaCadastro = () => {
  // estado para armazenar dados do usuário
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    password: '',
    tipo: 'cliente'
  });

  // estado para mensagem de erro
  const [errorMsg, setErrorMsg] = useState('');

  // hook de roteamento
  const router = useRouter();

  // função para atualizar os campos do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [id]: value
    }));
  };

  // função para processar o cadastro
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

      // verifica resposta do servidor
      if (response.ok) {
        const data = await response.json();
        const { erro, mensagem, token } = data;

        if (erro) {
          setErrorMsg(mensagem);
        } else {
          setCookie(undefined, 'restaurant-token', token, {
            maxAge: 60 * 60 * 1
          });
          router.push('/');
        }
      } else {
        setErrorMsg('erro ao fazer cadastro. verifique suas credenciais.');
      }
    } catch (error) {
      console.error('erro na requisição', error);
      setErrorMsg('ocorreu um erro. tente novamente mais tarde.');
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.background}></div>
        <form onSubmit={handleCadastro} className={styles.formulario}>
          <h1 className={styles.titulo}>cadastrar</h1>
          <div className={styles.grupoInput}>
            <label htmlFor="nome" className={styles.label}>nome:</label>
            <input
              type="text"
              id="nome"
              value={usuario.nome}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.grupoInput}>
            <label htmlFor="email" className={styles.label}>email:</label>
            <input
              type="text"
              id="email"
              value={usuario.email}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.grupoInput}>
            <label htmlFor="password" className={styles.label}>senha:</label>
            <input
              type="password"
              id="password"
              value={usuario.password}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
          <Button titulo='cadastrar' tipo='submit' />
        </form>
      </div>
      <Footer />
    </>
  );
};

export default PaginaCadastro;
