'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Usuario from '../interfaces/usuario';
import styles from '../styles/login.module.css';
import Button from '../components/Button';
import Link from 'next/link';

const PaginaLogin = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('https://prof-jeferson.github.io/API-reservas/usuarios.json');
      if (!response.ok) {
        console.log('Erro ao buscar os dados.');
        return;
      }
      const usuarios: Usuario[] = await response.json();

      const user = usuarios.find((user) => user.email === usuario && user.password === senha);
      if (user) {
        localStorage.setItem('usuario', JSON.stringify(user));
        router.push('/');
      } else {
        console.log('Usuário ou senha incorretos.');
        alert("Usuário ou senha incorretos.")
      }
    } catch (error) {
      console.error('Erro ao buscar os usuários:', error);
    }
  };

  useEffect(() => {
    const usuarioLogado = localStorage.getItem('usuario');
    if (usuarioLogado) {
      router.push('/');
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.formulario}>
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
        <Button titulo='Entrar' tipo='submit' />
        <Link href="./cadastrar">
          <Button titulo='Cadastrar' tipo='submit' />
        </Link>
      </form>
    </div>
  );
};

export default PaginaLogin;
