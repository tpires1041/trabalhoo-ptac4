'use client'

import { useState, useEffect, FormEvent } from 'react';  
import Header from '../components/Header'; 
import Footer from '../components/Footer';  
import { fetchPerfil, atualizarPerfil } from './../utils/perfil';  
import styles from './../styles/perfil.module.css';  

// função principal que lida com a renderização e lógica da página de perfil
export default function Perfil() {
  const [usuario, setUsuario] = useState<{ nome: string, email: string } | null>(null); 
  const [nome, setNome] = useState<string>('');  
  const [email, setEmail] = useState<string>('');
  const [response, setResponse] = useState({ erro: false, mensagem: '' }); 
  const [isLoading, setIsLoading] = useState(false); 

  // hook useEffect para carregar o perfil 
  useEffect(() => {
    async function loadPerfil() {
      try {
        const perfil = await fetchPerfil();  
        setUsuario(perfil); 
        setNome(perfil.nome);  
        setEmail(perfil.email);  
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);  
        setResponse({ erro: true, mensagem: 'Erro ao carregar perfil' });  
      }
    }
    loadPerfil(); 
  }, []);  
  // função para atualizar o perfil do usuário
  async function handleUpdatePerfil(e: FormEvent) {
    e.preventDefault();  
    setIsLoading(true);  
    try {
      const res = await atualizarPerfil(nome, email);  
      setResponse(res);  
      if (!res.erro) {
        setUsuario({ nome, email });  
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error); 
      setResponse({ erro: true, mensagem: 'Erro ao atualizar perfil' });  
    }
    setIsLoading(false); 
  }

  return (
    <div>
      <Header /> 
      <div className={styles.container}>
        <h2>Meu Perfil</h2> 
        {response.erro && <p className={styles.error}>{response.mensagem}</p>} 
        {isLoading && <p>carregando...</p>} 
        {usuario && ( 
          <form onSubmit={handleUpdatePerfil}>  
            <label className={styles.label}>
              nome:
              <input
                className={styles.input}
                type="text"
                value={nome} 
                onChange={(e) => setNome(e.target.value)}  
              />
            </label>
            <label className={styles.label}>
              email:
              <input
                className={styles.input}
                type="email"
                value={email}  
                onChange={(e) => setEmail(e.target.value)}  
              />
            </label>
            <button className={styles.button} type="submit">atualizar</button> 
          </form>
        )}
      </div>
      <Footer />  
    </div>
  );
}
