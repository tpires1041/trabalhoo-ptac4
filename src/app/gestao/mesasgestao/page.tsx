'use client';

import { useState, useEffect, FormEvent } from 'react';
import { parseCookies } from 'nookies';
import Header from '../../components/Header';
import styles from '../../styles/mesasgestao.module.css';
import Button from '../../components/Button';

const GerenciarMesas = () => {
  const [codigo, setCodigo] = useState(''); 
  const [n_lugares, setN_lugares] = useState(''); 
  const [mensagem, setMensagem] = useState(''); 
  const [mesas, setMesas] = useState<any[]>([]);
  const { 'restaurant-token': token } = parseCookies(); 

  // função para buscar as mesas cadastradas
  const buscarMesas = async () => {
    try {
      const response = await fetch('http://localhost:8000/gestao/mesasgestao', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // envia o token na requisição
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMesas(data); // atualiza a lista de mesas
      } else {
        setMensagem('Erro ao carregar mesas.');
      }
    } catch (error) {
      console.error('Erro ao buscar mesas:', error);
      setMensagem('Erro ao carregar mesas. Tente novamente mais tarde.');
    }
  };

  useEffect(() => {
    buscarMesas(); // chama a função para buscar as mesas quando o componente for montado
  }, [token]);

  // função para criar uma nova mesa
  const criarMesa = async (e: FormEvent) => {
    e.preventDefault(); 

    try {
      const response = await fetch('http://localhost:8000/gestao/mesasgestao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
          codigo, // código da mesa
          n_lugares: parseInt(n_lugares), // número de lugares
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMensagem('Mesa criada com sucesso!'); // exibe mensagem de sucesso
        setCodigo(''); // limpa o campo do código
        setN_lugares(''); // limpa o campo do número de lugares
        buscarMesas(); // atualiza a lista de mesas
      } else {
        const errorData = await response.json();
        setMensagem(errorData.mensagem || 'Erro ao criar mesa.'); // exibe mensagem de erro
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setMensagem('Erro ao criar mesa. Tente novamente mais tarde.');
    }
  };

  // função para deletar uma mesa
  const deletarMesa = async (id: number) => {
    if (!token) {
      setMensagem('Token de autenticação não encontrado.'); // verifica se o token existe
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/gestao/mesasgestao/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // envia o token na requisição
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMensagem(data.mensagem || 'Mesa deletada com sucesso!'); // exibe mensagem de sucesso
        buscarMesas(); // atualiza a lista após deletar a mesa
      } else {
        const errorData = await response.json();
        setMensagem(errorData.mensagem || 'Erro ao deletar mesa.'); // exibe mensagem de erro
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setMensagem('Erro ao deletar mesa. Tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1>Gerenciar Mesas</h1>
        
        <form onSubmit={criarMesa} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="codigo">Código da Mesa:</label>
            <input
              type="text"
              id="codigo"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)} // atualiza o código da mesa
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="n_lugares">Número de Lugares:</label>
            <input
              type="number"
              id="n_lugares"
              value={n_lugares}
              onChange={(e) => setN_lugares(e.target.value)} // atualiza o número de lugares
            />
          </div>
          <Button titulo="Criar Mesa" type="submit" /> 
        </form>

        {mensagem && <p className={styles.mensagem}>{mensagem}</p>} 

        <h2>Mesas Criadas</h2>
        <ul className={styles.listaMesas}>
          {mesas.length === 0 ? (
            <li>Não há mesas cadastradas.</li> // mensagem caso não haja mesas
          ) : (
            mesas.map((mesa) => (
              <li key={mesa.id} className={styles.mesaItem}>
                <div>
                  <p><strong>Código:</strong> {mesa.codigo}</p>
                  <p><strong>Número de Lugares:</strong> {mesa.n_lugares}</p>
                </div>
                <button
                  onClick={() => deletarMesa(mesa.id)} // chama a função para deletar a mesa
                  className={styles.botaoDeletar}
                >
                  Deletar
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default GerenciarMesas;
