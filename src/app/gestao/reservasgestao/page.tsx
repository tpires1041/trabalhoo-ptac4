'use client';

// importa hooks do react e biblioteca de cookies
import { useState, useEffect, FormEvent } from 'react';
import { parseCookies } from 'nookies';

// importa estilos e componentes
import styles from '../../styles/reservasgestao.module.css';
import Header from '../../components/Header';
import Button from '../../components/Button';

// componente de gestão de reservas
const GerenciarReservas = () => {
  // estados para armazenar dados do formulário e mensagens
  const [clienteNome, setClienteNome] = useState('');
  const [dataReserva, setDataReserva] = useState('');
  const [mesaId, setMesaId] = useState<number | string>('');
  const [mensagem, setMensagem] = useState('');
  const [reservas, setReservas] = useState<any[]>([]);
  const [mesas, setMesas] = useState<any[]>([]);

  // obtém o token de autenticação
  const { 'restaurant-token': token } = parseCookies();

  // carrega mesas e reservas ao montar o componente
  useEffect(() => {
    const hoje = new Date();
    const dataAtual = hoje.toISOString().slice(0, 16);
    setDataReserva(dataAtual);

    buscarMesas();
    buscarReservas(dataAtual);
  }, [token]);

  // busca lista de mesas disponíveis
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
        setMensagem('erro ao carregar mesas.');
      }
    } catch (error) {
      setMensagem('erro ao carregar mesas. tente novamente mais tarde.');
    }
  };

  // busca reservas cadastradas
  const buscarReservas = async (data: string) => {
    try {
      const response = await fetch('http://localhost:8000/gestao/reservasgestao', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ data })
      });

      if (response.ok) {
        const data = await response.json();
        setReservas(data.reservas);
      } else {
        setMensagem('erro ao carregar reservas.');
      }
    } catch (error) {
      setMensagem('erro ao carregar reservas. tente novamente mais tarde.');
    }
  };

  // cria uma nova reserva
  const criarReserva = async (e: FormEvent) => {
    e.preventDefault();

    if (!mesaId || !clienteNome || !dataReserva) {
      setMensagem('preencha todos os campos para fazer a reserva.');
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
          data: dataReserva,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMensagem('reserva criada com sucesso!');
        setClienteNome('');
        setDataReserva('');
        setMesaId('');
        buscarReservas(dataReserva);
      } else {
        const errorData = await response.json();
        setMensagem(errorData.mensagem || 'erro ao criar reserva.');
      }
    } catch (error) {
      setMensagem('erro ao criar reserva. tente novamente mais tarde.');
    }
  };

  // deleta uma reserva existente
  const deletarReserva = async (id: number) => {
    if (!token) {
      setMensagem('token de autenticação não encontrado.');
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
        setMensagem('reserva deletada com sucesso!');
        buscarReservas(dataReserva);
      } else {
        setMensagem('erro ao deletar reserva.');
      }
    } catch (error) {
      setMensagem('erro ao deletar reserva. tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1>Gerenciar Reservas</h1>

        <form onSubmit={criarReserva} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="clienteNome">nome do cliente:</label>
            <input
              type="text"
              id="clienteNome"
              value={clienteNome}
              onChange={(e) => setClienteNome(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="dataReserva">data da reserva:</label>
            <input
              type="datetime-local"
              id="dataReserva"
              value={dataReserva}
              onChange={(e) => setDataReserva(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="mesaId">selecione a mesa:</label>
            <select
              id="mesaId"
              value={mesaId}
              onChange={(e) => setMesaId(e.target.value)}
            >
              <option value="">escolha uma mesa</option>
              {mesas.map((mesa) => (
                <option key={mesa.id} value={mesa.id}>
                  mesa {mesa.codigo} ({mesa.n_lugares} lugares)
                </option>
              ))}
            </select>
          </div>
          <Button titulo="criar reserva" type="submit" />
        </form>

        {mensagem && <p className={styles.mensagem}>{mensagem}</p>}

        <h2>reservas criadas</h2>
        <ul className={styles.listaReservas}>
          {reservas.length === 0 ? (
            <li>não há reservas cadastradas.</li>
          ) : (
            reservas.map((reserva) => (
              <li key={reserva.id}>
                <p>{reserva.clienteNome}</p>
                <p>{new Date(reserva.data).toLocaleString()}</p>
                <p>{reserva.mesa.codigo}</p>
                <button onClick={() => deletarReserva(reserva.id)}>deletar</button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default GerenciarReservas;
