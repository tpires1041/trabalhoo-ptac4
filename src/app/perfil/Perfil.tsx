'use client'

import { useState, FormEvent } from 'react';
import { atualizarPerfil } from '../utils/perfil';
import styles from '../styles/reservas.module.css';
import { Usuario } from '../interfaces/usuario';

// componente perfil que recebe uma lista de usuários como prop
export default function Perfil({ users }: { users: Usuario[] }) {
  const [userState, setUserState] = useState<Usuario[]>(users);
  const [user, setUser] = useState<Usuario | null>(null);
  const [response, setResponse] = useState({ erro: false, mensagem: '' });
  const [isLoading, setIsLoading] = useState(false);

  // função para fazer a atualização do perfil
  async function handleUpdatePerfil(e: FormEvent) {
    e.preventDefault();
    if (user) {
      setIsLoading(true);
      try {
        const res = await atualizarPerfil(user.email, user.nome);
        setResponse(res);
        if (!res.erro) {
          setUserState(userState.map(r => r.id === user.id ? res.user : r));
          setUser(null);
        }
      } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        setResponse({ erro: true, mensagem: 'Erro ao atualizar perfil' });
      }
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h2>Meu Perfil</h2>
      {response.erro && <p className={styles.error}>{response.mensagem}</p>}
      {isLoading && <p>Carregando...</p>}
      <ul>
        {userState.map((user) => (
          <li key={user.id} className={styles.reservaItem}>
            <div className={styles.reservaActions}>
              <button className={styles.button} onClick={() => setUser(user)}>Atualizar</button>
            </div>
          </li>
        ))}
      </ul>
      {user && (
        <div>
          <h3>Atualizar Perfil</h3>
          <form onSubmit={handleUpdatePerfil}>
            <label className={styles.label}>
              Nome:
              <input
                className={styles.input}
                type="text"
                value={user.nome}
                onChange={(e) => setUser({ ...user, nome: e.target.value })}
              />
            </label>
            <label className={styles.label}>
              Email:
              <input
                className={styles.input}
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </label>
            <button className={styles.button} type="submit">Confirmar</button>
            <button className={styles.button} type="button" onClick={() => setUser(null)}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
}