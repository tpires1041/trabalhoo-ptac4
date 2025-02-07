'use client'

import { useState, useEffect, FormEvent } from 'react';
import { fetchAtualizarReserva, fetchCancelarReserva, fetchTodasReservas } from "../../utils/reservas";
import { Reserva } from '../../interfaces/reservas';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/reservastodas.module.css';

export default function ListAllReservas() {
  const [reservas, setReservas] = useState<Reserva[] | null>(null);
  const [data, setData] = useState<string>('');
  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [cancReserva, setCancReserva] = useState<Reserva | null>(null);
  const [response, setResponse] = useState({ erro: false, mensagem: '' });
  const [isLoading, setIsLoading] = useState(false);

  // useEffect para carregar as reservas quando a data muda
  useEffect(() => {
    async function loadReservas() {
      if (data) {
        const reservas = await fetchTodasReservas(data);
        console.log('loadReservas response:', reservas);
        setReservas(reservas);
      }
    }
    loadReservas();
  }, [data]);

  // função para cancelar uma reserva
  async function handleCancelReserva() {
    if (cancReserva) {
      setIsLoading(true);
      try {
        const res = await fetchCancelarReserva(cancReserva.id);
        setResponse(res);
        if (!res.erro) {
          setReservas(reservas?.filter(r => r.id !== cancReserva.id) || null);
          setReserva(null);
          setCancReserva(null);
        }
      } catch (error) {
        console.error("Erro ao cancelar reserva:", error);
        setResponse({ erro: true, mensagem: 'Erro ao cancelar reserva' });
      }
      setIsLoading(false);
    }
  }

  // função para atualizar uma reserva
  async function handleUpdateReserva(e: FormEvent) {
    e.preventDefault();
    if (reserva) {
      setIsLoading(true);
      try {
        const res = await fetchAtualizarReserva(reserva.id, reserva);
        setResponse(res);
        if (!res.erro) {
          setReservas(reservas?.map(r => r.id === reserva.id ? res.reserva : r) || null);
          setReserva(null);
        }
      } catch (error) {
        console.error("Erro ao atualizar reserva:", error);
        setResponse({ erro: true, mensagem: 'Erro ao atualizar reserva' });
      }
      setIsLoading(false);
    }
  }

  // função para buscar reservas com base na data
  async function handleFetchData() {
    const res = await fetchTodasReservas(data);
    console.log('handleFetchData response:', res);
    if (res && res.length > 0) {
      setReservas(res);
      setResponse({ erro: false, mensagem: 'Reservas encontradas com sucesso!' });
    } else {
      setReservas([]);
      setResponse({ erro: true, mensagem: 'Nenhuma reserva encontrada para a data especificada.' });
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.header}>Todas as Reservas</h2>
        <div className={styles.inputContainer}>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className={styles.input}
          />
          <button className={styles.button} type="button" onClick={handleFetchData}>Buscar</button>
        </div>
        {response.erro && <p className={styles.error}>{response.mensagem}</p>}
        {isLoading && <p>Carregando...</p>}
        <ul className={styles.reservasList}>
          {reservas?.map((reserva) => (
            <li key={reserva.id} className={styles.reservaItem}>
              <div className={styles.reservaInfo}>
                <p>Mesa: {reserva.mesa ? reserva.mesa.codigo : 'N/A'}</p>
                <p>Data: {new Date(reserva.data).toLocaleDateString()}</p>
              </div>
              <div className={styles.reservaActions}>
                <button className={styles.button} onClick={() => setReserva(reserva)}>Atualizar</button>
                <button className={styles.button} onClick={() => setCancReserva(reserva)}>Cancelar</button>
              </div>
            </li>
          ))}
        </ul>
        {reserva && (
          <div className={styles.formContainer}>
            <h3 className={styles.formTitle}>Atualizar Reserva</h3>
            <form onSubmit={handleUpdateReserva} className={styles.form}>
              <label className={styles.label}>
                Data:
                <input
                  className={styles.input}
                  type="date"
                  value={reserva.data && !isNaN(new Date(reserva.data).getTime()) ? new Date(reserva.data).toISOString().split('T')[0] : ''}
                  onChange={(e) => setReserva({ ...reserva, data: new Date(e.target.value) })}
                />
              </label>
              <label className={styles.label}>
                Número de pessoas:
                <input
                  className={styles.input}
                  type="number"
                  value={reserva.n_pessoas}
                  onChange={(e) => setReserva({ ...reserva, n_pessoas: parseInt(e.target.value) })}
                />
              </label>
              <div className={styles.buttonContainer}>
                <button className={styles.button} type="submit">Confirmar</button>
                <button className={styles.button} type="button" onClick={() => setReserva(null)}>Cancelar</button>
              </div>
            </form>
          </div>
        )}
        {cancReserva && (
          <div className={styles.formContainer}>
            <h3 className={styles.formTitle}>Cancelar Reserva</h3>
            <p>Tem certeza que deseja cancelar a reserva da mesa {cancReserva.mesa ? cancReserva.mesa.codigo : 'N/A'}?</p>
            <div className={styles.buttonContainer}>
              <button className={styles.button} onClick={handleCancelReserva}>Confirmar</button>
              <button className={styles.button} onClick={() => setCancReserva(null)}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}