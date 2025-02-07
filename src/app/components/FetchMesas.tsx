import styles from '../styles/fetchmesas.module.css';

// define o tipo das mesas com os campos que serão usados  
type MesasType = {  
  id: number, 
  codigo: string, 
  n_lugares: number,   
};

// função que busca as mesas na api  
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