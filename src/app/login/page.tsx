'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/login.module.css';
import Button from '../components/Button';
import Link from 'next/link';
import { setCookie, parseCookies } from 'nookies';
import { ApiURL } from '../../../config'

const PaginaLogin = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    const { 'restaurant-token': token } = parseCookies();
    if (token) {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${ApiURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: usuario, password: senha })
      });

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
        setErrorMsg('Erro ao fazer login. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro na requisição', error);
      setErrorMsg('Ocorreu um erro. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <h1 className={styles.titulo}>Login</h1>
        <div className={styles.grupoInput}>
          <label htmlFor="usuario" className={styles.label}>Usuário:</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.grupoInput}>
          <label htmlFor="senha" className={styles.label}>Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={styles.input}
          />
        </div>
        {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
        <Button titulo="Entrar" tipo="submit" />
        <Link href="./cadastrar">
          <Button titulo="Cadastrar" tipo="submit" />
        </Link>
      </form>
    </div>
  );
};

export default PaginaLogin;