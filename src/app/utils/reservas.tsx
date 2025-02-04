'use server'

import { cookies } from "next/headers";
import { ApiURL } from "../../../config";
import { Reserva } from "./../interfaces/reservas";
import { revalidateTag } from "next/cache";

export async function fetchReserva(data: string): Promise<Reserva[] | null> {
    if (!data) return null;
    try {
        const cookieStored = cookies();
        const token = cookieStored.get('restaurant-token')?.value;
        if (!token) return null;

        const res = await fetch(`${ApiURL}/reservas/date`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ data })
        });

        if (!res.ok) return null;
        const responseData = await res.json();
        return responseData.reservas || null;
    } catch (error) {
        console.error("Erro ao buscar reserva:", error);
        return null;
    }
}

export async function fetchNovaReserva(mesaId: number, n_pessoas: number, data: string): Promise<{ erro: boolean, mensagem: string }> {
    const cookieStored = cookies();
    const token = cookieStored.get('restaurant-token')?.value;
    if (!data || isNaN(n_pessoas) || isNaN(mesaId) || !token) {
        return { erro: true, mensagem: "Dados inválidos" };
    }
    try {
        const res = await fetch(`${ApiURL}/reservas/novo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ data, mesaId, n_pessoas })
        });

        const dataRes = await res.json();
        return dataRes;
    } catch (error) {
        console.error("Erro ao criar reserva:", error);
        return { erro: true, mensagem: 'Erro ao fazer requisição' };
    }
}

export async function fetchMinhasReservas(): Promise<Reserva[] | null> {
    try {
        const cookieStored = cookies();
        const token = cookieStored.get('restaurant-token')?.value;
        if (!token) return null;

        const res = await fetch(`${ApiURL}/reservas/date`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            next: { tags: ['minhas_reservas'] }
        });

        if (!res.ok) return null;
        const responseData = await res.json();
        return responseData.reservas || null;
    } catch (error) {
        console.error("Erro ao buscar reservas:", error);
        return null;
    }
}

export async function fetchAtualizarReserva(state: any, formData: FormData) {
    const cookieStored = cookies();
    const token = cookieStored.get('restaurant-token')?.value;
    if (!token) return { erro: true, mensagem: "Token inválido" };

    const reservaId = parseInt(formData.get('reservaId') as string, 10);
    const n_pessoas = parseInt(formData.get('n_pessoas') as string, 10);

    if (isNaN(reservaId) || isNaN(n_pessoas)) {
        return { erro: true, mensagem: "Dados inválidos" };
    }
    try {
        const res = await fetch(`${ApiURL}/reservas/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ reservaId, n_pessoas })
        });

        const dataRes = await res.json();
        if (!dataRes.erro) revalidateTag('minhas_reservas');
        return dataRes;
    } catch (error) {
        console.error("Erro ao atualizar reserva:", error);
        return { erro: true, mensagem: 'Erro ao fazer requisição' };
    }
}

export async function fetchCancelarReserva(reservaId: number) {
    const cookieStored = cookies();
    const token = cookieStored.get('restaurant-token')?.value;
    if (!token || isNaN(reservaId)) {
        return { erro: true, mensagem: "Dados inválidos" };
    }
    try {
        const res = await fetch(`${ApiURL}/reservas/cancelar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ reservaId })
        });

        const dataRes = await res.json();
        if (!dataRes.erro) revalidateTag('minhas_reservas');
        return dataRes;
    } catch (error) {
        console.error("Erro ao cancelar reserva:", error);
        return { erro: true, mensagem: 'Erro ao fazer requisição' };
    }
}

export async function fetchTodasReservas(data: string): Promise<Reserva[] | null> {
    try {
        const cookieStored = cookies();
        const token = cookieStored.get('restaurant-token')?.value;
        if (!token) return null;

        const res = await fetch(`${ApiURL}/reservas/date`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ data }),
            next: { tags: ['todas_reservas'] }
        });

        if (!res.ok) return null;
        const responseData = await res.json();
        return responseData.reservas || null;
    } catch (error) {
        console.error("Erro ao buscar todas reservas:", error);
        return null;
    }
}
