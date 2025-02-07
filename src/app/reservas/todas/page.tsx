import { redirect } from "next/navigation";
import { fetchUser } from "../../utils/auth";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ListAllReservas from "./listAllReservas";
import styles from '../../styles/reservas.module.css';

export default async function Reservas() {
  const user = await fetchUser();
  
  // redireciona para a página inicial se o usuário não for admin
  if (user?.tipo !== 'admin') {
    redirect('/');
  }

  return (
    <div>
      <Header/>
      <div className={styles.container}>
        <div className={styles.reservasList}>
          <ListAllReservas />
        </div>
      </div>
      <Footer/>
    </div>
  );
}