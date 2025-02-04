import { ApiURL } from "../../../config";
import { cookies } from "next/headers";
import { Usuario } from "../interfaces/usuario";
import { redirect } from "next/navigation";

export async function fetchUser(): Promise<Usuario | null> {
  try {
    const cookieStored = cookies();
    const token = cookieStored.get('restaurant-token')?.value;

    if (!token) return null;

    const res = await fetch(`${ApiURL}/usuario`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.usuario || null;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
}

export async function logout() {
  const cookieStored = cookies();
  cookieStored.delete('restaurant-token');
  redirect('/');
}
