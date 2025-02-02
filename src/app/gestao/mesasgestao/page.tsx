'use client';

import { useState, useEffect, FormEvent } from 'react';
import { parseCookies } from 'nookies';
import styles from '../../styles/mesasgestao.module.css';
import Button from '../../components/Button';

const GerenciarMesas = () => {
  const [codigo, setCodigo] = useState('');
  const [n_lugares, setN_lugares] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [mesas, setMesas] = useState<any[]>([]);
  const { 'restaurant-token': token } = parseCookies();

  // Função para buscar as mesas
  const buscarMesas = async () => {
    try {
      const response = await fetch('http://localhost:8000/gestao/mesasgestao', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMesas(data); // Supondo que a resposta seja um array de mesas
      } else {
        setMensagem('Erro ao carregar mesas.');
      }
    } catch (error) {
      console.error('Erro ao buscar mesas:', error);
      setMensagem('Erro ao carregar mesas. Tente novamente mais tarde.');
    }
  };

  // Chamar a função buscarMesas assim que o componente for carregado
  useEffect(() => {
    buscarMesas();
  }, [token]);

  // Função para criar mesa
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
          codigo,
          n_lugares: parseInt(n_lugares), // Envia no formato esperado pelo backend
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMensagem('Mesa criada com sucesso!');
        setCodigo('');
        setN_lugares('');
        buscarMesas(); // Atualiza a lista de mesas após a criação
      } else {
        const errorData = await response.json();
        setMensagem(errorData.mensagem || 'Erro ao criar mesa.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setMensagem('Erro ao criar mesa. Tente novamente mais tarde.');
    }
  };

  // Função para deletar mesa
  const deletarMesa = async (id: number) => {
    // Verificando se o token está correto
    if (!token) {
      setMensagem('Token de autenticação não encontrado.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/gestao/mesasgestao/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMensagem(data.mensagem || 'Mesa deletada com sucesso!');
        buscarMesas(); // Atualiza a lista após deletar a mesa
      } else {
        const errorData = await response.json();
        setMensagem(errorData.mensagem || 'Erro ao deletar mesa.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setMensagem('Erro ao deletar mesa. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Gerenciar Mesas</h1>
      
      {/* Formulário para criar mesa */}
      <form onSubmit={criarMesa} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="codigo">Código da Mesa:</label>
          <input
            type="text"
            id="codigo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="n_lugares">Número de Lugares:</label>
          <input
            type="number"
            id="n_lugares"
            value={n_lugares}
            onChange={(e) => setN_lugares(e.target.value)}
          />
        </div>
        <Button titulo="Criar Mesa" type="submit" />
      </form>

      {/* Mensagem de sucesso ou erro */}
      {mensagem && <p className={styles.mensagem}>{mensagem}</p>}

      {/* Exibindo a lista de mesas */}
      <h2>Mesas Criadas</h2>
      <ul className={styles.listaMesas}>
        {mesas.length === 0 ? (
          <li>Não há mesas cadastradas.</li>
        ) : (
          mesas.map((mesa) => (
            <li key={mesa.id} className={styles.mesaItem}>
              <div>
                <p><strong>Código:</strong> {mesa.codigo}</p>
                <p><strong>Número de Lugares:</strong> {mesa.n_lugares}</p>
              </div>
              <button
                onClick={() => deletarMesa(mesa.id)} // Lógica para deletar a mesa
                className={styles.botaoDeletar}
              >
                Deletar
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default GerenciarMesas;