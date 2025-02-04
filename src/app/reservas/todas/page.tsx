

import { redirect } from "next/navigation";
import  Menu  from "../../components/menu";
import { fetchMinhasReservas } from "../../utils/reservas";
import { fetchUser } from "../../utils/auth";
import ListAllReservas from "./listAllReservas";    

export default async function Reservas() {
   let reservas;

  const user = await fetchUser()
  if (user?.tipo != 'admin'){
      redirect('/')
}

  return (
    <div>
      <Menu user={user} />
      <h1>Reservas</h1>
      <ListAllReservas/>
    </div>
  )
}

