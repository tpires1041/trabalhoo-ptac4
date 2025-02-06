import styles from '../styles/reservas.module.css';
import { redirect } from "next/navigation";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from "../components/menu";
import { fetchUser } from "../utils/auth";
import ListMinhasReservas from "./listMinhaReservas";
import { fetchMinhasReservas } from "../utils/reservas";

export default async function Reservas() {
  const user = await fetchUser();
  const reservas = await fetchMinhasReservas();

  if (!user || !reservas) {
    redirect('/login');
  }

  return (
    <div>
      <Header/>
    <div className={styles.container}>
      <div className={styles.menuContainer}>
        <Menu user={user} />
      </div>
      <div className={styles.reservasContainer}>
        <ListMinhasReservas reservas={reservas} />
      </div>
    </div>
    <Footer/>
    </div>
  );
}