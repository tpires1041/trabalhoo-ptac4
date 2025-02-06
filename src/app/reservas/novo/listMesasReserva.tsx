'use client'

import styles from '../../styles/reservasnovo.module.css';
import ModalMap from '@/app/components/modalMap';
import { Mesas } from '../../interfaces/mesas';
import { useState, FormEvent } from "react";
import { fetchMesasDisponiveis } from '../../utils/reservas';
import { fetchNovaReserva } from '../../utils/reservas';
import { useRouter } from 'next/navigation';

type ListMesasReservaProps = {
    mesas: Mesas[];
};

export function ListMesasReserva({ mesas }: ListMesasReservaProps) {
    const [data, setData] = useState('');
    const [mesasDisponiveis, setMesasDisponiveis] = useState<Mesas[] | null>(null);
    const [mesasReservadas, setMesasReservadas] = useState<number[] | null>(null);
    const [loadMesas, setLoadMesas] = useState(false);
    const [mesaS, setMesaS] = useState<Mesas | null>(null);
    const [response, setResponse] = useState({ erro: false, mensagem: '' });
    const router = useRouter();

    async function handleFetchData() {
        setLoadMesas(true);
        
        try {
            const res = await fetchMesasDisponiveis(data);
            console.log('Mesas Disponíveis:', res.mesasDisponiveis);
            console.log('Mesas Reservadas:', res.mesasReservadas);
            setMesasDisponiveis(res.mesasDisponiveis);
            setMesasReservadas(res.mesasReservadas);
        } catch (error) {
            console.error("Erro ao buscar mesas:", error);
        }

        setLoadMesas(false);
    }

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
        <div className={styles.container}>
            <h2 className={styles.title}>Mapa do Restaurante:</h2>
            <ModalMap />
            <h2 className={styles.title}>Fazer Reserva:</h2>
            <div className={styles.inputContainer}>
                <input
                    className={styles.input}
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />
                <button className={styles.button} type="button" onClick={handleFetchData}>
                    Buscar
                </button>
            </div>

            {loadMesas && <p>Carregando...</p>}

            <div className={styles.mesasContainer}>
                {mesasDisponiveis && mesasDisponiveis.map(mesa => (
                    <button
                        key={mesa.id}
                        onClick={() => setMesaS(mesa)}
                        className={`${styles.mesaButton} ${styles.livre}`}
                    >
                        {mesa.codigo}
                    </button>
                ))}
                {mesasReservadas && mesasReservadas.map(mesaId => (
                    <button
                        key={mesaId}
                        className={`${styles.mesaButton} ${styles.reservado}`}
                        disabled
                    >
                        {mesas.find(mesa => mesa.id === mesaId)?.codigo}
                    </button>
                ))}
            </div>

            {mesaS && (
                <div className={styles.formContainer}>
                    <h3 className={styles.formTitle}>Confirmar Reserva:</h3>
                    <form className={styles.form} onSubmit={handleFormSubmit}>
                        <label className={styles.label}>
                            Data:
                            <input className={styles.input} type="date" value={data} readOnly name="data" />
                        </label>

                        <input
                            type="number"
                            hidden
                            readOnly
                            value={mesaS.id}
                            name="mesaId"
                        />

                        <label className={styles.label}>
                            Mesa Selecionada:
                            <input className={styles.input} type="text" value={mesaS.codigo} readOnly name="codigo" />
                        </label>

                        <label className={styles.label}>
                            Número de pessoas:
                            <input
                                className={styles.input}
                                type="number"
                                max={mesaS.n_lugares}
                                min={1}
                                name="n_pessoas"
                                required
                            />
                        </label>

                        {response.erro && <p className={styles.errorMessage}>{response.mensagem}</p>}

                        <div className={styles.buttonContainer}>
                            <button className={styles.button} type="button" onClick={() => setMesaS(null)}>
                                Cancelar
                            </button>
                            <button className={styles.button} type="submit">Confirmar</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}