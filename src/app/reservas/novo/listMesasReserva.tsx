'use client'

import ModalMap from '@/app/components/modalMap';
import { Mesas } from '../../interfaces/mesas';
import { Reserva } from '../../interfaces/reservas';
import { useState, FormEvent } from "react";
import { fetchReserva } from '../../utils/reservas';
import { fetchNovaReserva } from '../../utils/reservas';
import { useRouter } from 'next/navigation';

type ListMesasReservaProps = {
    mesas: Mesas[];
};

export function ListMesasReserva({ mesas }: ListMesasReservaProps) {
    const [data, setData] = useState('');
    const [reservas, setReservas] = useState<Reserva[] | null>(null);
    const [loadReservas, setLoadReservas] = useState(false);
    const [mesaS, setMesaS] = useState<Mesas | null>(null);
    const [response, setResponse] = useState({ erro: false, mensagem: '' });
    const router = useRouter();

    // Função para buscar reservas baseadas na data
    async function handleFetchData() {
        setLoadReservas(true);
        
        try {
            const res = await fetchReserva(data);
            
            // Verifica se res é válido e se contém a propriedade erro
            if (res && 'erro' in res && !res.erro) {
                router.push('/reservas/novo');
            }

            setReservas(res);
        } catch (error) {
            console.error("Erro ao buscar reservas:", error);
        }

        setLoadReservas(false);
    }

    // Função para submeter o formulário de reserva
    async function handleFormSubmit(e: FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const mesaId = parseInt(formData.get('mesaId') as string);
        const n_pessoas = parseInt(formData.get('n_pessoas') as string);

        const res = await fetchNovaReserva(mesaId, n_pessoas, data);
        setResponse(res);
    }

    return (
        <div>
            <div>
                <h2>Mapa Restaurante:</h2>
                <ModalMap />
                <h2>Fazer Reserva:</h2>
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

                {loadReservas && <p>Carregando...</p>}

                {/* Renderizando as mesas */}
                {reservas && mesas.map(mesa => {
                    const mesaReservada = reservas.find(reserva => reserva.mesa_id === mesa.id);
                    if (mesaReservada) {
                        return (
                            <button
                                key={mesa.id}
                                className="reservado"
                            >
                                {mesa.codigo}
                            </button>
                        );
                    } else {
                        return (
                            <button
                                onClick={() => setMesaS(mesa)}
                                key={mesa.id}
                                className="livre"
                            >
                                {mesa.codigo}
                            </button>
                        );
                    }
                })}
            </div>

            {/* Formulário de reserva */}
            {mesaS && (
                <div>
                    <div>
                        <h3>Confirmar Reserva:</h3>
                        <form onSubmit={handleFormSubmit}>
                            <label>
                                Data:
                                <input type="date" value={data} readOnly name="data" />
                            </label>

                            <input
                                type="number"
                                hidden
                                readOnly
                                value={mesaS.id}
                                name="mesaId"
                            />

                            <label>
                                Mesa Selecionada:
                                <input type="text" value={mesaS.codigo} readOnly name="codigo" />
                            </label>

                            <label>
                                Número de pessoas:
                                <input
                                    type="number"
                                    max={mesaS.n_lugares}
                                    min={1}
                                    name="n_pessoas"
                                    required
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

                                <button type="submit">Confirmar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
