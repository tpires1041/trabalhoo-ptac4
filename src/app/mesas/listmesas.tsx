'use client';


import { useState, useActionState } from 'react';  
import { Mesas } from '../interfaces/mesas';  
import { fetchAtualizarMesa, fetchCriarMesa } from '../utils/mesas';  
import ModalMap from '../components/modalMap';  
import { Plus } from 'lucide-react';  

// define as propriedades que o componente vai receber
interface ListMesasProps {
  mesas: Mesas[]; 
  reservas: { mesaId: number }[];  
}

// componente principal que vai lidar com as mesas
export default function ListMesas({ mesas, reservas }: ListMesasProps) {
  const [mesa, setMesa] = useState<Mesas | null>(null);  
  const [state, action] = useActionState(fetchAtualizarMesa, { erro: false, mensagem: '' });
  const [stateCriar, actionCriar] = useActionState(fetchCriarMesa, { erro: false, mensagem: '' }); 
  const [criarMesa, setCriarMesa] = useState(false);  

  return (
    <div>
      <div>
        <h2>mapa do restaurante</h2>
        <ModalMap />  
        <h2>mesas:</h2>
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
          <button type="button" onClick={() => setCriarMesa(true)} title="adicionar nova mesa">
            <Plus /> 
          </button>
        </div>
      </div>
      {mesa && (
        <div>
          <div>
            <h3>alterar mesa:</h3>
            <form action={action}>
              <label>
                id da mesa
                <input type="number" defaultValue={mesa.id} readOnly name="id" />
              </label>
              <label>
                código da mesa:
                <input type="number" defaultValue={mesa.codigo} name="codigo" />
              </label>
              <label>
                número de lugares:
                <input type="number" defaultValue={mesa.n_lugares} name="n_lugares" />
              </label>
              {state.erro && <p>{state.mensagem}</p>} 
              <div>
                <button type="button" onClick={() => setMesa(null)}>cancelar</button> 
                <button type="submit">confirmar</button> 
              </div>
            </form>
          </div>
        </div>
      )}
      {criarMesa && (
        <div>
          <div>
            <h3>criar nova mesa:</h3>
            <form action={actionCriar}>
              <label>
                código da mesa:
                <input type="number" name="codigo" />
              </label>
              <label>
                número de lugares:
                <input type="number" defaultValue={0} name="n_lugares" />
              </label>
              {stateCriar.erro && <p>{stateCriar.mensagem}</p>} 
              <div>
                <button type="button" onClick={() => setCriarMesa(false)}>cancelar</button> 
                <button type="submit">confirmar</button>  
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
