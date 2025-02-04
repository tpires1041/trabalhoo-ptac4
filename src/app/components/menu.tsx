'use client';

import { Usuario } from '../interfaces/usuario';
import Link from 'next/link';
import { ClipboardList, ChefHat, User } from 'lucide-react';

type MenuProps = {
  user: Usuario;
};

export default function Menu({ user }: MenuProps) {
  function handleLogout() {
    console.log('Logout realizado'); 
  }

  return (
    <div>
      <div>
        <img src={'/default-avatar.png'} alt={`${user.nome}'s avatar`} />
        <h2>{user.nome}</h2>
        <p>{user.tipo}</p>
      </div>
      {user.tipo === 'admin' ? (
        <>
          <div>
            <Link href="/reservas/novo"><ClipboardList /> Nova Reserva</Link>
          </div>
          <div>
            <Link href="/reservas/todas"><ClipboardList /> Todas Reservas</Link>
          </div>
          <div>
            <Link href="/mesas"><ChefHat /> Mesas</Link>
          </div>
          <div>
            <Link href="/profile"><User /> Perfil</Link>
          </div>
          <div>
            <button onClick={handleLogout}>Sair</button>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link href="/profile"><User /> Perfil</Link>
          </div>
          <div>
            <button onClick={handleLogout}>Sair</button>
          </div>
        </>
      )}
    </div>
  );
}