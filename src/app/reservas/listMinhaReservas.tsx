'use client'

import { Reserva } from '../interfaces/reservas';
import { useState } from 'react';

type ListMinhasReservasProps = {
    reservas: Reserva[]
}

export default function ListMinhasReservas({ reservas }: ListMinhasReservasProps) {
    const [reserva, setReserva] = useState<Reserva|| null>(null)
    return (
        <div>
            <div>
                <h2>
                    {reservas.length == 0 ? (
                        <p>Você ainda não tem reservas</p>
                    ) :
                        (
                            <div>
                                {reservas.map(reserva => {
                                    return (
                                        <div key={reserva.id}>
                                            <p>Mesa: {reserva.mesa?.codigo}</p>
                                            <p>Data: {reserva.data}</p>
                                            <p>Pessoas: {reserva.n_pessoas}</p>
                                            <div>
                                                <button onClick={() => setReserva(null)}>Alterar</button>
                                                <button type="submit">Cancelar</button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                    {reserva && (
                        <div>
                            <div>
                                <h3>Confirmar Reserva:</h3>
                                <form action="">
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
                                        defaultValue={reserva.mesaId}
                                        name="mesaId"
                                    />
                                    <label>
                                        Mesa Selecionada:
                                        <input type="number"
                                            defaultValue={reserva.mesa.codigo}
                                            name="codigo"
                                        />
                                    </label>
                                    <label>
                                        Número de pessoas:
                                        <input type="number"
                                            max={reserva.mesa?.n_lugares}
                                            defaultValue={reserva.n_lugares}
                                            min={1}
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
                    )
                }
                </h2>
            </div>
        </div>
    )
}