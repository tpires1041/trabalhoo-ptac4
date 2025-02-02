import { Menu } from '@/app/components/menu'
import { fetchUser } from '../../utils/auth'
import { redirect } from 'next/navigation'
import { ListMesas } from '@/app/components/listMesas'
import { fetchMesas } from '../../utils/mesas'
import { ListMesasReserva } from './listMesasReserva'

export default async function NovaReserv(){
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