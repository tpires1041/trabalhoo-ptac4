import styles from '../../styles/reservasnovo.module.css';
import Menu from "../../components/Menu";
import { fetchUser } from '../../utils/auth';
import { fetchMesas } from '../../utils/mesas';
import { ListMesasReserva } from './listMesasReserva';
import { redirect } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default async function NovaReserva() {
  const user = await fetchUser();
  console.log('Fetched User:', user);
  const mesas = await fetchMesas();

  // redireciona para a página de login se o usuário não estiver autenticado
  if (!user) {
    redirect('/login');
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Menu user={user} />
        {mesas && <ListMesasReserva mesas={mesas} />}
      </div>
      <Footer />
    </div>
  );
}