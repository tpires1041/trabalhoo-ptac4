import { redirect } from 'next/navigation'
import { fetchUser } from '../utils/auth' 
import { fetchMesas } from '../utils/mesas'
import { fetchReserva } from '../utils/reservas'
import Menu from '../components/menu'
import ListMesas from '../mesas/listmesas'

export default async function Mesas() {
  const user = await fetchUser()
  const mesas = await fetchMesas()
  const reservas = await fetchReserva(new Date().toISOString()) // Pass the required argument

  if (!user || user.tipo === 'cliente' || !mesas) {
    redirect('/')
  }

  // Map reservas to the expected format
  const reservasFormatted = (reservas || []).map(reserva => ({
    mesaId: reserva.mesa_id,
    // Add other properties if needed
  }))

  return (
    <div>
      <Menu user={user} />
      <ListMesas mesas={mesas} reservas={reservasFormatted} />
    </div>
  )
}