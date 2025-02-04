'use client';

import { useState, useActionState } from 'react';
import { Mesas } from '../interfaces/mesas'; // Certifique-se de que o tipo Mesas está correto
import { fetchAtualizarMesa, fetchCriarMesa } from '../utils/mesas';
import ModalMap from '../components/modalMap';
import { Plus } from 'lucide-react';

interface ListMesasProps {
  mesas: Mesas[];
  reservas: { mesaId: number }[];
}

export default function ListMesas({ mesas, reservas }: ListMesasProps) {
  const [mesa, setMesa] = useState<Mesas | null>(null);
  const [state, action] = useActionState(fetchAtualizarMesa, {
    erro: false,
    mensagem: '',
  });
  const [stateCriar, actionCriar] = useActionState(fetchCriarMesa, {
    erro: false,
    mensagem: '',
  });
  const [criarMesa, setCriarMesa] = useState(false);

  return (
    <div>
      <div>
        <h2>Mapa Restaurante</h2>
        <ModalMap />
        <h2>Mesas:</h2>
        <div>
          {mesas.map((mesa) => {
            const isReservada = reservas.some((reserva) => reserva.mesaId === mesa.id);
            return (
              <button
                key={mesa.id}
                onClick={() => !isReservada && setMesa(mesa)}
                className={isReservada ? 'reservado' : 'livre'}
              >
                {mesa.codigo}
              </button>
            );
          })}
        </div>
        <div>
          <button type="button" onClick={() => setCriarMesa(true)} title="Adicionar nova mesa">
            <Plus />
          </button>
        </div>
      </div>

      {mesa && (
        <div>
          <div>
            <h3>Alterar Mesa:</h3>
            <form action={action}>
              <label>
                Id da Mesa
                <input type="number" defaultValue={mesa.id} readOnly name="id" />
              </label>
              <label>
                Código da Mesa:
                <input type="number" defaultValue={mesa.codigo} name="codigo" />
              </label>
              <label>
                Número de lugares:
                <input type="number" defaultValue={mesa.n_lugares} name="n_lugares" />
              </label>
              {state.erro && <p>{state.mensagem}</p>}
              <div>
                <button type="button" onClick={() => setMesa(null)}>
                  Cancelar
                </button>
                <button type="submit">Confirmar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {criarMesa && (
        <div>
          <div>
            <h3>Criar Nova Mesa:</h3>
            <form action={actionCriar}>
              <label>
                Código da Mesa:
                <input type="number" name="codigo" />
              </label>
              <label>
                Número de lugares:
                <input type="number" defaultValue={0} name="n_lugares" />
              </label>
              {stateCriar.erro && <p>{stateCriar.mensagem}</p>}
              <div>
                <button type="button" onClick={() => setCriarMesa(false)}>
                  Cancelar
                </button>
                <button type="submit">Confirmar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
