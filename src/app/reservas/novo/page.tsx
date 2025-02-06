import styles from '../../styles/reservasnovo.module.css';
import Menu from "../../components/menu";
import { fetchUser } from '../../utils/auth'
import { fetchMesas } from '../../utils/mesas'
import { ListMesasReserva } from './listMesasReserva'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default async function NovaReserva() {
    const user = await fetchUser()
    console.log(user)
    const mesas = await fetchMesas()
    return (
        <div>
            <Header />
        <div className={styles.container}>
            <Menu user={user} />
            {mesas && <ListMesasReserva mesas={mesas} />}
        </div>
        <Footer/>
        </div>
    )
}