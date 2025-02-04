'use client'

import { Reserva } from '../../interfaces/reservas';
import { useState, useActionState } from 'react';
import { fetchAtualizarReserva, fetchCancelarReserva, fetchTodasReservas } from "../../utils/reservas"

type ListMinhasReservasProps = {
    reservas: Reserva[]
}

export default function ListAllReservas() {
    const [reservas, setReservas] = useState<Reserva[] | null>(null)
    const [data, setData] = useState<string>('')
    const [reserva, setReserva] = useState<Reserva | null>(null)
    const [cancReserva, setCancReserva] = useState<Reserva | null>(null)
    const [state, action, isPading] = useActionState(fetchAtualizarReserva, { erro: false, mensagem: '' })
    const [response, setResponse] = useState({})

    function openModal(reserva: Reserva) {
        state.erro = false
        state.mensagem = ''
        setReserva(reserva)
    }

    async function handleCancelReserva() {
        const res = await fetchCancelarReserva(cancReserva?.id as number)
        if (res) {
            // Handle successful cancellation
        }
    }

    async function handleFetchData() {
        const res = await fetchTodasReservas(data)
        setReservas(res)
    }

    return (
        <div>
            <div>
                <h2>Seleciona uma Data</h2>
                <div>
                    <input
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleFetchData}>
                    Buscar
                </button>
            </div>
            <div>
                <h2>Suas Reservas</h2>
                {reservas?.length === 0 ? (
                    <p>Você ainda não tem reservas</p>
                ) : (
                    <div>
                        {reservas?.map(reserva => {
                            return (
                                <div key={reserva.id} style={{ background: `${reserva.status ? '' : 'gray'}` }}>
                                    <p>Mesa: {reserva.mesa?.codigo}</p>
                                    <p>Data: {reserva.data}</p>
                                    <p>Pessoas: {reserva.n_pessoas}</p>
                                    {reserva.status ? (
                                        <div>
                                            <button onClick={() => openModal(reserva)}>Alterar</button>
                                            <button type="submit" onClick={() => setCancReserva(reserva)}>Cancelar</button>
                                        </div>
                                    ) : (
                                        <p>Reserva Cancelada</p>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
                {reserva && !state.mensagem && (
                    <div>
                        <div>
                            <h3>Confirmar Reserva:</h3>
                            <form action={action}>
                                <label>
                                    Data:
                                    <input type="date"
                                        defaultValue={reserva.data}
                                        readOnly
                                        name="data"
                                    />
                                </label>
                                <input type="number"
                                    hidden
                                    readOnly
                                    defaultValue={reserva.id}
                                    name="reservaId"
                                />
                                <label>
                                    Mesa Selecionada:
                                    <input type="number"
                                        defaultValue={reserva.mesa?.codigo}
                                        name="codigo"
                                    />
                                </label>
                                <label>
                                    Número de pessoas:
                                    <input type="number"
                                        max={reserva.mesa?.n_lugares}
                                        defaultValue={reserva.n_pessoas}
                                        min={1}
                                        name="n_pessoas"
                                    />
                                </label>
                                {state.erro && <p>{state.mensagem}</p>}
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => setReserva(null)}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit">Confirmar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {reserva && (
                    <div>
                        <div>
                            <h3>Confirmar Cancelamento:</h3>
                            <p>Realmente deseja cancelar essa reserva?</p>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setCancReserva(null)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancelReserva}
                                >
                                    Confirmar Cancelamento
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}