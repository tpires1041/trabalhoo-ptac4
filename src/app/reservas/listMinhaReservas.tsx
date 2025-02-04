'use client'

import { useActionState, useState } from 'react';
import { Reserva } from '../interfaces/reservas';
import { fetchAtualizarReserva, fetchCancelarReserva } from '../utils/reservas';

type ListMinhasReservasProps = {
  reservas: Reserva[];
};

export default function ListMinhasReservas({ reservas }: ListMinhasReservasProps) {
  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [cancReserva, setCancReserva] = useState<Reserva | null>(null);
  const [state, action, isPading] = useActionState(fetchAtualizarReserva, { erro: false, mensagem: '' });

  async function handleCancelReserva() {
    if (cancReserva) {
      const res = await fetchCancelarReserva(cancReserva.id);
      console.log(res);
      setCancReserva(null);
    }
  }

  function openModal(reserva: Reserva) {
    setReserva(reserva);
  }

  return (
    <div>
      <h2>Suas Reservas</h2>
      {reservas.length === 0 ? (
        <p>Você ainda não tem reservas</p>
      ) : (
        <div>
          {reservas.map((reserva) => (
            <div key={reserva.id} style={{ background: reserva.status ? '' : 'gray' }}>
              <p>Mesa: {reserva.mesa?.codigo}</p>
              <p>Data: {reserva.data}</p>
              <p>Pessoas: {reserva.n_pessoas}</p>
              {reserva.status ? (
                <div>
                  <button onClick={() => openModal(reserva)}>Alterar</button>
                  <button type="button" onClick={() => setCancReserva(reserva)}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <p>Reserva Cancelada</p>
              )}
            </div>
          ))}
        </div>
      )}

      {reserva && !state.mensagem && (
        <div>
          <h3>Confirmar Reserva:</h3>
          <form action={action}>
            <label>
              Data:
              <input type="date" defaultValue={reserva.data} readOnly name="data" />
            </label>
            <input type="hidden" defaultValue={reserva.id} name="reservaId" />
            <label>
              Mesa Selecionada:
              <input type="number" defaultValue={reserva.mesa?.codigo} name="codigo" />
            </label>
            <label>
              Número de pessoas:
              <input type="number" max={reserva.mesa?.n_lugares} defaultValue={reserva.n_pessoas} min={1} name="n_pessoas" />
            </label>
            {state.erro && <p>{state.mensagem}</p>}
            <div>
              <button type="button" onClick={() => setReserva(null)}>
                Cancelar
              </button>
              <button type="submit">Confirmar</button>
            </div>
          </form>
        </div>
      )}

      {cancReserva && (
        <div>
          <h3>Confirmar Cancelamento:</h3>
          <p>Realmente deseja cancelar essa reserva?</p>
          <div>
            <button type="button" onClick={() => setCancReserva(null)}>
              Cancelar
            </button>
            <button type="button" onClick={handleCancelReserva}>
              Confirmar Cancelamento
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
