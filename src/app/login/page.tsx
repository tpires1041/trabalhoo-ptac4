'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Usuario from '../interfaces/usuario';
import styles from '../styles/login.module.css';
import Button from '../components/Button';
import Link from 'next/link';
import { setCookie, parseCookies } from 'nookies';

const PaginaLogin = () => {
  const [email, password] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMsg, setMsgError] = useState('')
  const router = useRouter();


  useEffect(()=> {
    const {'restaurant-token' : token} = parseCookies()
    if (token){
      router.push('/')
    }
  }, [router])


  const  handleSubmit = async (e :FormEvent) => {
    e.preventDefault();
    try {

      const response = await fetch(`${ApiURL}/auth/login`, {	'
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({email, password})
      })
  
      if (response){
        const data = await response.json();
        const {erro, mensagem, token} = data
        console.log(data)
        if (erro){
          setMsgError(mensagem)
        } else {
          setCookie(undefined, 'restaurant-token', token, {
            maxAge: 60*60*1 //1 hora
          })
          router.push('/')
        }
      }
    } catch (error) {
      console.error('Erro na requisicao', error)
    }

    console.log('Email:', email);
    console.log('Senha:', password);
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
        <Button titulo='Entrar' tipo='submit' />
        <Link href="./cadastrar">
          <Button titulo='Cadastrar' tipo='submit' />
        </Link>
      </form>
    </div>
  );
};

export default PaginaLogin;
