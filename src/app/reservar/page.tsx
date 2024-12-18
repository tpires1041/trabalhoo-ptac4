"use client";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import styles from "../styles/reservar.module.css";

export default function Home() {
  function getDateNow() {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }

  const [selectedTable, setSelectedTable] = useState(null);
  const [dateTables, setDateTables] = useState(getDateNow);
  const tables = [
    { id: 1, nome: "Mesa 1" },
    { id: 2, nome: "Mesa 2" },
    { id: 3, nome: "Mesa 3" },
  ];
  const reservas = [
    {
      id: 1,
      mesa: 1,
      data: "2024-11-29",
    },
    {
      id: 1,
      mesa: 2,
      data: "2024-11-29",
    },
    {
      id: 1,
      mesa: 2,
      data: "2024-11-28",
    },
  ];

  function handleChangeDate(e: ChangeEvent<HTMLInputElement>) {
    setDateTables(e.target.value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.linha}>
        <div className={styles.coluna}>
          <div className={styles.cartaousuario}>
            <img
              src="https://github.com/MrMinerin.png"
              alt="Usuário"
              className="imagem-usuario"
            />
            <h2>Jéferson Carlos de Souza</h2>
            <p>Cliente</p>
          </div>
        </div>
        <div className="coluna">
          <div className="lista-mesas">
            <h2>Mesas Disponíveis</h2>
            <input
              type="date"
              value={dateTables}
              min={dateTables}
              onChange={handleChangeDate}
            />
          </div>
          <div className="mesas">
            {tables.map((table) => {
              if (
                reservas.find(
                  (reserva) =>
                    dateTables === reserva.data && reserva.mesa === table.id
                )
              ) {
                return (
                  <button
                    key={table.id}
                    className="mesa indisponivel"
                    onClick={() => setSelectedTable(table.nome)}
                  >
                    {table.nome}
                  </button>
                );
              } else {
                return (
                  <button
                    key={table.id}
                    className="mesa disponivel"
                    onClick={() => setSelectedTable(table.nome)}
                  >
                    {table.nome}
                  </button>
                );
              }
            })}
          </div>
        </div>
        <div className="coluna">
          {selectedTable ? (
            <div className="formulario-reserva">
              <h2>Reservar {selectedTable}</h2>
              <form>
                <label>
                  Nome:
                  <input type="text" placeholder="Seu nome" />
                </label>
                <label>
                  Data:
                  <input type="date" />
                </label>
                <label>
                  Pessoas:
                  <input type="number" max={4} min={1} />
                </label>
                <button type="submit">Confirmar Reserva</button>
              </form>
            </div>
          ) : (
            <p>Selecione uma mesa para reservar</p>
          )}
        </div>
      </div>
    </div>
  );
}
