'use client'

import { useState, useEffect, FormEvent } from 'react';  
import { fetchMesas, criarMesa, atualizarMesa, deletarMesa } from './../utils/mesas';  
import Header from '../components/Header';  
import Footer from '../components/Footer';  
import styles from './../styles/mesas.module.css'; 

// define o tipo para mesa
interface Mesa {
  id: number;
  codigo: string;
  n_lugares: number;
}

// função principal para gerenciar mesas
export default function Mesas() {
  const [mesas, setMesas] = useState<Mesa[]>([]);  
  const [codigo, setCodigo] = useState('');  
  const [n_lugares, setNLugares] = useState('');  
  const [mesaId, setMesaId] = useState<number | null>(null);  
  const [response, setResponse] = useState({ erro: false, mensagem: '' });  
  const [isLoading, setIsLoading] = useState(false);  

  // hook useEffect para carregar as mesas 
  useEffect(() => {
    async function loadMesas() {
      try {
        const mesas = await fetchMesas(); 
        setMesas(mesas);  
      } catch (error) {
        console.error("Erro ao carregar mesas:", error);  
        setResponse({ erro: true, mensagem: 'Erro ao carregar mesas' }); 
      }
    }
    loadMesas(); 
  }, []); 

  // função para criar uma nova mesa
  async function handleCreateMesa(e: FormEvent) {
    e.preventDefault(); 
    setIsLoading(true);  
    try {
      const res = await criarMesa(codigo, parseInt(n_lugares)); 
      if (!res.erro) {
        setMesas([...mesas, res.mesa]); 
        setCodigo('');  
        setNLugares(''); 
      }
    } catch (error) {
      console.error("Erro ao criar mesa:", error);  
      setResponse({ erro: true, mensagem: 'Erro ao criar mesa' });  
    }
    setIsLoading(false);  
  }

  // função para atualizar uma mesa
  async function handleUpdateMesa(e: FormEvent) {
    e.preventDefault(); 
    setIsLoading(true); 
    try {
      const res = await atualizarMesa(mesaId!, codigo, parseInt(n_lugares));  
      setResponse(res); 
      if (!res.erro) {
        setMesas(mesas.map(mesa => mesa.id === mesaId ? res.mesa : mesa));
        setNLugares('');  
        setMesaId(null); 
      }
    } catch (error) {
      console.error("Erro ao atualizar mesa:", error);  
      setResponse({ erro: true, mensagem: 'Erro ao atualizar mesa' });  
    }
    setIsLoading(false);  
  }

  // função para deletar uma mesa
  async function handleDeleteMesa(id: number) {
    setIsLoading(true); 
    try {
      const res = await deletarMesa(id); 
      setResponse(res);  
      if (!res.erro) {
        setMesas(mesas.filter(mesa => mesa.id !== id)); 
      }
    } catch (error) {
      console.error("Erro ao deletar mesa:", error);  
      setResponse({ erro: true, mensagem: 'Erro ao deletar mesa' });  
    }
    setIsLoading(false);  
  }

  return (
    <div>
      <Header />  
      <div className={styles.container}>
        <h2>gerenciar mesas</h2>
        {response.erro && <p className={styles.error}>{response.mensagem}</p>}  
        {isLoading && <p>Carregando...</p>} 
        <form onSubmit={mesaId ? handleUpdateMesa : handleCreateMesa}> 
          <label className={styles.label}>
            código:
            <input
              className={styles.input}
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)} 
            />
          </label>
          <label className={styles.label}>
            número de lugares:
            <input
              className={styles.input}
              type="number"
              value={n_lugares}
              onChange={(e) => setNLugares(e.target.value)}
            />
          </label>
          <button className={styles.button} type="submit">
            {mesaId ? 'Atualizar' : 'Criar'} 
          </button>
        </form>
        <ul className={styles.mesaList}>
          {mesas.map((mesa) => (
            <li key={mesa.id} className={styles.mesaItem}>
              <div className={styles.mesaInfo}>
                <p>código: {mesa.codigo}</p>
                <p>número de lugares: {mesa.n_lugares}</p>
              </div>
              <div className={styles.mesaActions}>
                <button className={styles.button} onClick={() => {
                  setMesaId(mesa.id);
                  setCodigo(mesa.codigo);
                  setNLugares(mesa.n_lugares.toString());
                }}>editar</button>
                <button className={styles.button} onClick={() => handleDeleteMesa(mesa.id)}>deletar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />  
    </div>
  );
}
