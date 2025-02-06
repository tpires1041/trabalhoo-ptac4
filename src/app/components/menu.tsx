'use client';

import styles from '../styles/reservasnovo.module.css';
import { Usuario } from '../interfaces/usuario';
import Link from 'next/link';
import { ClipboardList, User, LogOut } from 'lucide-react';

type MenuProps = {
  user: Usuario | null;
};

export default function Menu({ user }: MenuProps) {
  function handleLogout() {
    console.log('Logout realizado'); 
  }

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.menuContainer}>
      <div className={styles.userInfo}>
        <img className={styles.avatar} src={'/default-avatar.png'} alt={`${user.nome}'s avatar`} />
        <h2 className={styles.userName}>{user.nome}</h2>
        <p className={styles.userType}>{user.tipo}</p>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/reservas">
              <ClipboardList /> Reservas
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/perfil">
              <User /> Perfil
            </Link>
          </li>
          <li className={styles.navItem}>
            <button className={styles.logoutButton} onClick={handleLogout}>
              <LogOut /> Sair
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}