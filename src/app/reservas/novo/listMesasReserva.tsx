'use client'

import ModalMap from '@/app/components/modalMap';
import { Mesas } from '../../interfaces/mesas';
import { Reserva } from '../../interfaces/reservas';
import { useState } from "react";
import { fetchReserva } from '../../utils/reservas';
import { fetchNovaReserva } from '../../utils/reservas';
import { useRouter } from 'next/navigation'


type ListMesasReservaProps = {
    mesas: Mesas[]
}

export function ListMesasReserva({ mesas }: ListMesasReservaProps) {
    const [data, setData] = useState('');
    const [reservas, setReservas] = useState<Reserva | null>()
    const [loadReservas, setLoadReservas] = useState(false)
    const [mesaS, setMesaS] = useState<Mesas | null>(null)
    const [response, setResponse] = useState({erro: false, mensagem: ''})
    const router = useRouter()

    async function handleFetchData(){
        setLoadReservas(true)
        const res = await fetchReserva(data)
        console.log(res)
        setReservas(res)
        if(!res.erro){
            router.push('reservas/novo')
        }
        setLoadReservas(false)
    }

    async function handleFormSubmit(e : FormEvent) {
        e.preventDefault()

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        const mesaId = parseInt(formData.get('mesaId') as string)
        const n_pessoas = parseInt(formData.get('n_pessoas') as string)

        const res = await fetchNovaReserva(mesaId, n_pessoas, data)
        setResponse(res)
        console.log(res)
    }

    return (
        <div>
            <div>
                <h2>Mapa Restaurante:</h2>
                <ModalMap />
                <h2>Fazer Reserva:</h2>
                <div>
                    <input>
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    </input>

                </div>
                <button type="button">
                    Buscar
                </button>
                {loadReservas && <p>Carregando...</p>}
                
                {reservas &&

                mesas.map(mesa => {
                    if(reservas.find(reserva => reserva.mesaId === mesa.id))
                    return(
                        <button
                                key={mesa.id}
                                className='reservado'
                            >
                                {mesa.codigo}
                            </button>
                    )
    
                        return (
                            <button
                                onClick={() => setMesaS(mesa)}
                                key={mesa.id}
                                className='livre'
                            >
                                {mesa.codigo}
                            </button>
                        )
                    })
                }
            </div>

            {mesaS && (
                <div>
                    <div>
                        <h3>Confirmar Reserva:</h3>
                        <form action="">
                            <label>
                                Data:
                                <input type="date"
                                    value={data}
                                    readOnly
                                    name="data"
                                />
                            </label>
                            <input type="number"
                                    hidden
                                    readOnly
                                    value={mesaS.id}
                                    name="mesaId"
                                />
                            <label>
                                Mesa Selecionada:
                                <input type="number"
                                    value={mesaS.codigo}
                                    name="codigo"
                                />
                            </label>
                            <label>
                                Número de pessoas:
                                <input type="number"
                                    max={mesaS.n_lugares}
                                    min={1}
                                    value={mesaS.codigo}
                                    name="n_pessoas"
                                />
                            </label>
                            {response.erro && <p>{response.mensagem}</p>}
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setMesaS(null)}
                                 >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                >Confirmar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
            }
        </div>
    )

}