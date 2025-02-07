'use server';

import { ApiURL } from "../../../config";
import { cookies } from "next/headers";
import { Usuario } from "../interfaces/usuario";
import { redirect } from "next/navigation"; 

// função para buscar os dados do usuário
export async function fetchUser(): Promise<Usuario | null> {
  try {
    const cookieStored = await cookies();
    const token = cookieStored.get('restaurant-token');
    const res = await fetch(`${ApiURL}/perfil/`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token?.value}` }
    });
    const data = await res.json();
    console.log('Fetched User Data:', data); 

    return data.usuario;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error); 
  }
}

// função para fazer logout
export async function logout() {
  const cookieStored = await cookies();
  cookieStored.delete('restaurant-token');
  redirect('/');
}