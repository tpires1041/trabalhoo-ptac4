'use client';

import { useState, useEffect, FormEvent } from 'react';
import { parseCookies } from 'nookies';
import styles from '../../styles/reservasgestao.module.css';
import Button from '../../components/Button';

const GerenciarReservas = () => {
  const [clienteNome, setClienteNome] = useState('');
  const [dataReserva, setDataReserva] = useState('');
  const [mesaId, setMesaId] = useState<number | string>('');
  const [mensagem, setMensagem] = useState('');
  const [reservas, setReservas] = useState<any[]>([]);
  const [mesas, setMesas] = useState<any[]>([]);
  const { 'restaurant-token': token } = parseCookies();

  // Defina o valor de dataReserva como a data atual (no formato datetime-local)
  useEffect(() => {
    const hoje = new Date();
    const dataAtual = hoje.toISOString().slice(0, 16); // Converte para o formato correto (yyyy-mm-ddThh:mm)
    setDataReserva(dataAtual);
    
    buscarMesas();
    buscarReservas(dataAtual); // Passa a data atual para buscar as reservas
  }, [token]);

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
        setMesas(data);
      } else {
        setMensagem('Erro ao carregar mesas.');
      }
    } catch (error) {
      setMensagem('Erro ao carregar mesas. Tente novamente mais tarde.');
    }
  };

  const buscarReservas = async (data: string) => {
    try {
      const response = await fetch('http://localhost:8000/gestao/reservasgestao', {
        method: 'GET', // Alterei para POST conforme o Controller
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ data }) // Envia a data no corpo da requisição
      });

      if (response.ok) {
        const data = await response.json();
        setReservas(data.reservas); // Recebe as reservas do servidor
      } else {
        setMensagem('Erro ao carregar reservas.');
      }
    } catch (error) {
      setMensagem('Erro ao carregar reservas. Tente novamente mais tarde.');
    }
  };

  const criarReserva = async (e: FormEvent) => {
    e.preventDefault();

    if (!mesaId || !clienteNome || !dataReserva) {
      setMensagem('Preencha todos os campos para fazer a reserva.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/gestao/reservasgestao/nova', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mesaId: parseInt(mesaId as string),
          clienteNome,
          data: dataReserva, // Envia a data diretamente como está
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMensagem('Reserva criada com sucesso!');
        setClienteNome('');
        setDataReserva('');
        setMesaId('');
        buscarReservas(dataReserva); // Recarrega as reservas com a data atual
      } else {
        const errorData = await response.json();
        setMensagem(errorData.mensagem || 'Erro ao criar reserva.');
      }
    } catch (error) {
      setMensagem('Erro ao criar reserva. Tente novamente mais tarde.');
    }
  };

  const deletarReserva = async (id: number) => {
    if (!token) {
      setMensagem('Token de autenticação não encontrado.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/gestao/reservasgestao/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMensagem('Reserva deletada com sucesso!');
        buscarReservas(dataReserva); // Recarrega as reservas com a data atual
      } else {
        setMensagem('Erro ao deletar reserva.');
      }
    } catch (error) {
      setMensagem('Erro ao deletar reserva. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Gerenciar Reservas</h1>

      <form onSubmit={criarReserva} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="clienteNome">Nome do Cliente:</label>
          <input
            type="text"
            id="clienteNome"
            value={clienteNome}
            onChange={(e) => setClienteNome(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="dataReserva">Data da Reserva:</label>
          <input
            type="datetime-local"
            id="dataReserva"
            value={dataReserva}
            onChange={(e) => setDataReserva(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="mesaId">Selecione a Mesa:</label>
          <select
            id="mesaId"
            value={mesaId}
            onChange={(e) => setMesaId(e.target.value)}
          >
            <option value="">Escolha uma mesa</option>
            {mesas.map((mesa) => (
              <option key={mesa.id} value={mesa.id}>
                Mesa {mesa.codigo} ({mesa.n_lugares} lugares)
              </option>
            ))}
          </select>
        </div>
        <Button titulo="Criar Reserva" type="submit" />
      </form>

      {mensagem && <p className={styles.mensagem}>{mensagem}</p>}

      <h2>Reservas Criadas</h2>
      <ul className={styles.listaReservas}>
        {reservas.length === 0 ? (
          <li>Não há reservas cadastradas.</li>
        ) : (
          reservas.map((reserva) => (
            <li key={reserva.id}>
              <p>{reserva.clienteNome}</p>
              <p>{new Date(reserva.data).toLocaleString()}</p>
              <p>{reserva.mesa.codigo}</p>
              <button onClick={() => deletarReserva(reserva.id)}>Deletar</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default GerenciarReservas;
