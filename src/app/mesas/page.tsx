'use server'

import { redirect } from 'next/navigation'
import { fetchUser } from '../utils/auth' 
import { fetchMesas } from '../utils/mesas'
import { fetchTodasReservas } from '../utils/reservas' // Certifique-se de ter a função para buscar as reservas
import Menu from '../components/Menu'
import ListMesas from '../mesas/listmesas'

export default async function Mesas() {
  const user = await fetchUser()
  const mesas = await fetchMesas()
  const reservas = await fetchReservas() // Certifique-se de que essa função está implementada corretamente

  if (!user || user.tipo === 'cliente' || !mesas) {
    redirect('/')
  }

  return (
    <div>
      <Menu user={user} />
      <ListMesas mesas={mesas} reservas={reservas} />  {/* Passando ambas as props */}
    </div>
  )
}
