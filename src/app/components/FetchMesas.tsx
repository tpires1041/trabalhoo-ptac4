import styles from '../styles/fetchmesas.module.css';

type MesasType = {
  id: number,
  codigo: string,
  n_lugares: number,
}

export async function FetchMesas() {
  const response = await fetch('http://localhost:8000/reservas');
  const data = await response.json();
  const mesas: MesasType[] = data.mesas;
  console.log(mesas);
  //const reservas : Reservas[] = data.reserva

  return (
    <div className={styles.mesasGrid}>
      {mesas.map((table) => {
        return (
          <button
            key={table.id}
            className={styles.mesaButton}
          >
            {table.codigo}
          </button>
        )
      })}
    </div>
  )
}