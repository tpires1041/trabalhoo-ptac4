'use server'

import { cookies } from "next/headers";
import { ApiURL } from "../../../config";
import { Mesas } from "./../interfaces/mesas";
import { revalidateTag } from "next/cache";

export async function fetchMesas(): Promise<Mesas[] | null> {
  try {
    const cookieStored = cookies();
    const token = cookieStored.get('restaurant-token')?.value;

    if (!token) return null;

    const res = await fetch(`${ApiURL}/mesas`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
      next: { tags: ['carregar-mesas'] }
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.mesas || null;
  } catch (error) {
    console.error("Erro ao buscar mesas:", error);
    return null;
  }
}

export async function fetchAtualizarMesa(state: any, formData: FormData) {
  const cookieStored = cookies();
  const token = cookieStored.get('restaurant-token')?.value;

  const codigo = formData.get('codigo');
  const n_lugares = parseInt(formData.get('n_lugares') as string, 10);

  if (!codigo || isNaN(n_lugares)) {
    return {
      erro: true,
      mensagem: 'Dados inválidos'
    };
  }

  try {
    const res = await fetch(`${ApiURL}/mesas/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ codigo, n_lugares })
    });

    const data = await res.json();
    const { erro, mensagem } = data;

    if (!erro) revalidateTag('carregar-mesas');

    return { erro, mensagem };
  } catch (error) {
    console.error("Erro ao atualizar mesa:", error);
    return {
      erro: true,
      mensagem: 'Algum erro inesperado aconteceu'
    };
  }
}

export async function fetchCriarMesa(state: any, formData: FormData) {
  const cookieStored = cookies();
  const token = cookieStored.get('restaurant-token')?.value;

  const id = parseInt(formData.get('id') as string, 10);
  const codigo = formData.get('codigo');
  const n_lugares = parseInt(formData.get('n_lugares') as string, 10);

  if (isNaN(id) || !codigo || isNaN(n_lugares)) {
    return {
      erro: true,
      mensagem: 'Dados inválidos'
    };
  }

  try {
    const res = await fetch(`${ApiURL}/mesas/novo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ id, codigo, n_lugares })
    });

    const data = await res.json();
    const { erro, mensagem } = data;

    if (!erro) revalidateTag('carregar-mesas');

    return { erro, mensagem };
  } catch (error) {
    console.error("Erro ao criar mesa:", error);
    return {
      erro: true,
      mensagem: 'Algum erro inesperado aconteceu'
    };
  }
}
