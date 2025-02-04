import  Menu  from "../../components/menu";
import { fetchUser } from '../../utils/auth'
import { redirect } from 'next/navigation'
import { fetchMesas } from '../../utils/mesas'
import { ListMesasReserva } from './listMesasReserva'

export default async function NovaReserva(){
    const user = await fetchUser()
    const mesas = await fetchMesas()
    if(!user || !mesas) redirect('/login')
    return (
        <div>
            <Menu user={user} />
            <ListMesasReserva mesas={mesas}/>
        </div>
    )
}