'use client'

import { useState, FormEvent } from 'react';
import { fetchAtualizarReserva, fetchCancelarReserva } from '../utils/reservas';
import { Reserva } from '../interfaces/reservas';
import styles from '../styles/reservas.module.css';

export default function ListMinhasReservas({ reservas }: { reservas: Reserva[] }) {
  const [reservasState, setReservasState] = useState<Reserva[]>(reservas);
  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [cancReserva, setCancReserva] = useState<Reserva | null>(null);
  const [response, setResponse] = useState({ erro: false, mensagem: '' });
  const [isLoading, setIsLoading] = useState(false);

  // função para cancelar uma reserva
  async function handleCancelReserva() {
    if (cancReserva) {
      setIsLoading(true);
      try {
        const res = await fetchCancelarReserva(cancReserva.id);
        setResponse(res);
        if (!res.erro) {
          setReservasState(reservasState.filter(r => r.id !== cancReserva.id));
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
          setReservasState(reservasState.map(r => r.id === reserva.id ? res.reserva : r));
          setReserva(null);
        }
      } catch (error) {
        console.error("Erro ao atualizar reserva:", error);
        setResponse({ erro: true, mensagem: 'Erro ao atualizar reserva' });
      }
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h2>Minhas Reservas</h2>
      {response.erro && <p className={styles.error}>{response.mensagem}</p>}
      {isLoading && <p>Carregando...</p>}
      <ul>
        {reservasState.map((reserva) => (
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
        <div>
          <h3>Atualizar Reserva</h3>
          <form onSubmit={handleUpdateReserva}>
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
            <button className={styles.button} type="submit">Confirmar</button>
            <button className={styles.button} type="button" onClick={() => setReserva(null)}>Cancelar</button>
          </form>
        </div>
      )}
      {cancReserva && (
        <div>
          <h3>Cancelar Reserva</h3>
          <p>Tem certeza que deseja cancelar a reserva da mesa {cancReserva.mesa ? cancReserva.mesa.codigo : 'N/A'}?</p>
          <button className={styles.button} onClick={handleCancelReserva}>Confirmar</button>
          <button className={styles.button} onClick={() => setCancReserva(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}