import { Usuario } from '../interfaces/usuario';
import Link from 'next/link';
import { ClipboardList, ChefHat, User } from 'lucide-react';

type MenuProps = {
  user: Usuario;
};

export function Menu({ user }: MenuProps) {
  return (
    <div>
      <div>
        <img  alt={`${user.nome}'s avatar`} />
        <h2>{user.nome}</h2>
        <p>{user.tipo}</p>
      </div>
      {user.tipo === 'admin' ? (
        <>
          <div>
            <Link href={'/reservas/novo'} className=""><ClipboardList />Nova Reserva</Link>
          </div>
          <div>
            <Link href={'/reservas'} className=""><ClipboardList />Minhas Reservas</Link>
          </div>
          <div>
            <Link href={'/mesas'} className=""><ChefHat />Mesas</Link>
          </div>
          <div>
            <Link href={'/profile'} className=""><User />Perfil</Link>
          </div>
        </>
      ) : (
        <div>
          <Link href={'/profile'} className=""><User />Perfil</Link>
        </div>
      )}
    </div>
  );
}