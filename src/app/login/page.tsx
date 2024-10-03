'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/login.module.css';
import Button from '../components/Button';


const PaginaLogin = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (usuario === 'admin' && senha === '123456') {
      alert('Login bem-sucedido!');
      router.push('/');
    } else {
      alert('Login ou senha incorretos.');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.formulario}>
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
        <Button titulo='Entrar' tipo='submit'/>
        <button type="submit" className={styles.botao}>Entrar</button>
      </form>
    </div>
  );
};

export default PaginaLogin;
