'use client'; // define que o componente roda no lado do cliente

import { useState, useEffect, FormEvent } from 'react';
import { parseCookies } from 'nookies';
import styles from '../styles/reservas.module.css';
import Button from '../components/Button';
import Header from '../components/Header';
import { MesasType } from '../reservas-server/page';
import { ReservasType } from '../reservas-server/page';

const Reservas = () => {
  // estados para armazenar mesas, reservas e o formulário de reserva
  const [mesas, setMesas] = useState<MesasType[]>([]);
  const [reservas, setReservas] = useState<ReservasType[]>([]);
  const [formReserva, setFormReserva] = useState<ReservasType>({
    id: 0,
    usuario_id: 0,
    mesa_id: 0,
    data: getDateNow(),
    n_pessoas: 0,
    status: true
  });

  const [mensagem, setMensagem] = useState<string | null>(null);
  const { 'restaurant-token': token } = parseCookies(); // obtém o token do usuário

  useEffect(() => {
    fetchData(); // carrega dados das reservas e mesas ao montar o componente
  }, [token]);

  function getDateNow() {
    return new Date().toISOString().split("T")[0]; // retorna a data atual formatada
  }

  // função para alterar valores no formulário
  function alterFormReserva<K extends keyof ReservasType>(key: K, value: ReservasType[K]) {
    setFormReserva((prevForm) => ({
      ...prevForm,
      [key]: value
    }));
  }

  // função para buscar mesas e reservas da api
  async function fetchData() {
    try {
      const responseReservas = await fetch('http://localhost:8000/reservas', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const responseMesas = await fetch('http://localhost:8000/mesas', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!responseReservas.ok || !responseMesas.ok) throw new Error('erro ao carregar dados');

      setMesas(await responseMesas.json());
      setReservas(await responseReservas.json());
    } catch (error) {
      console.error(error);
      setMensagem('erro ao carregar dados. tente novamente.');
    }
  }

  // função para enviar um novo pedido de reserva
  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault();

    if (!formReserva.mesa_id || !formReserva.data || !formReserva.n_pessoas) {
      alert('preencha todos os campos corretamente');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/reservas/novo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: formReserva.data,
          mesa: formReserva.mesa_id,
          n_pessoas: formReserva.n_pessoas,
        }),
      });

      const result = await response.json();
      alert(result.mensagem);
      fetchData(); // recarrega os dados após criar a reserva
    } catch (error) {
      console.error('erro na requisição:', error);
      setMensagem('erro ao criar reserva. tente novamente.');
    }
  }

  // função para cancelar uma reserva
  async function handleCancelarReserva(id: number) {
    try {
      const response = await fetch(`http://localhost:8000/reservas/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        setMensagem('reserva cancelada com sucesso!');
        fetchData(); // recarrega os dados após cancelamento
      } else {
        const errorData = await response.json();
        setMensagem(errorData.mensagem || 'erro ao cancelar reserva.');
      }
    } catch (error) {
      console.error('erro ao cancelar reserva:', error);
      setMensagem('erro ao cancelar reserva. tente novamente.');
    }
  }

  return (
    <div>
      <Header /> 
      <div className={styles.container}>
       
        <h1 className={styles.title}>Efetuar Reservas</h1>

        <form onSubmit={handleSubmitForm} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="mesa_id">mesa:</label>
            <select
              id="mesa_id"
              value={formReserva.mesa_id}
              onChange={(e) => alterFormReserva("mesa_id", parseInt(e.target.value))}
            >
              <option value="">selecione uma mesa</option>
              {mesas.map((mesa) => (
                <option key={mesa.id} value={mesa.id}>{mesa.codigo}</option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="data">data:</label>
            <input
              type="date"
              id="data"
              value={formReserva.data}
              onChange={(e) => alterFormReserva("data", e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="n_pessoas">número de pessoas:</label>
            <input
              type="number"
              id="n_pessoas"
              value={formReserva.n_pessoas}
              onChange={(e) => alterFormReserva("n_pessoas", parseInt(e.target.value))}
            />
          </div>

          <Button titulo="criar reserva" type="submit" />
        </form>

        {mensagem && <p className={styles.mensagem}>{mensagem}</p>}

        <h2 className={styles.subtitle}>mesas disponíveis</h2>
        <ul className={styles.lista}>
          {mesas.map((mesa) => (
            <li key={mesa.id} className={styles.mesaItem}>
              código: {mesa.codigo} - lugares: {mesa.n_lugares} - disponível: {mesa.disponivel ? 'sim' : 'não'}
            </li>
          ))}
        </ul>

        <h2 className={styles.subtitle}>Reservas Criadas</h2>
        <ul className={styles.lista}>
          {reservas.map((reserva) => (
            <li key={reserva.id} className={styles.reservaItem}>
              mesa {reserva.mesa_id} - data: {reserva.data} - pessoas: {reserva.n_pessoas}
              {reserva.status && (
                <button onClick={() => handleCancelarReserva(reserva.id)} className={styles.btnCancelar}>
                  Cancelar
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reservas;
