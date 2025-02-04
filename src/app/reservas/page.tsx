import { redirect } from "next/navigation";
import Menu from "../components/Menu";
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
      <Menu user={user} />
      <h1>Reservas</h1>
      <ListMinhasReservas reservas={reservas} />
    </div>
  );
}
