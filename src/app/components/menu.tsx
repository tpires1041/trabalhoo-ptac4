'use client';  

import styles from '../styles/reservasnovo.module.css';  
import { Usuario } from '../interfaces/usuario';  
import Link from 'next/link';  
import { ClipboardList, User, LogOut } from 'lucide-react';  
import { logout } from '../utils/auth';  

// define o tipo das props que o menu recebe  
type MenuProps = {  
  user: Usuario | null; 
};  

// cria o componente do menu  
export default function Menu({ user }: MenuProps) {  
  const isAdmin = user?.tipo === 'admin'; 

  // função para fazer logout  
  function handleLogout() {  
    logout();  
  }  

  return (  
    <div className={styles.menuContainer}>   
      <div className={styles.userInfo}>  
        <img className={styles.avatar} src={'/default-avatar.png'} alt={`${user?.nome}'s avatar`} />
        <h2 className={styles.userName}>{user?.nome}</h2>
        <p className={styles.userType}>{user?.tipo}</p> 
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
          {isAdmin && ( 
            <>  
              <li className={styles.navItem}>  
                <Link href="/reservas/todas"> 
                  Todas as reservas  
                </Link>  
              </li>  
              <li className={styles.navItem}>  
                <Link href="/mesas"> 
                  Cadastrar Mesas  
                </Link>  
              </li>  
            </>  
          )}  
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