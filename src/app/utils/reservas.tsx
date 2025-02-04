'use server'

import { cookies } from "next/headers"
import { revalidateTag } from 'next/cache'
import { ApiURL } from "../../../config"
import { Reserva } from "./../interfaces/reservas"

export async function fetchReserva(data: string): Promise<Reserva[] | null> {
    if (!data) {
        return null
    }
    try {
        const cookieStored = await cookies()
        const token = cookieStored.get('restaurant-token')
        const res = await fetch(`${ApiURL}/reservas/date`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`
            },
            body: JSON.stringify({ data })
        })
        const dataRes = await res.json()
        return dataRes.reservas
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function fetchNovaReserva(mesaId: number, n_pessoas: number, data: string): Promise<{ erro: boolean, mensagem: string }> {
    const cookieStored = await cookies()
    const token = cookieStored.get('restaurant-token')

    if (!data || !n_pessoas || !mesaId || !token) {
        return { erro: true, mensagem: "Dados inválidos" }
    }

    try {
        const res = await fetch(`${ApiURL}/reservas/novo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`
            },
            body: JSON.stringify({ data, mesaId, n_pessoas })
        })

        const dataRes = await res.json()
        const { erro, mensagem } = dataRes
        return { erro, mensagem }
    } catch (error) {
        console.error(error)
        return { erro: true, mensagem: 'Erro ao fazer requisição' }
    }
}

export async function fetchMinhasReservas(data: string): Promise<Reserva[] | null> {
    if (!data) {
        return null
    }
    try {
        const cookieStored = await cookies()
        const token = cookieStored.get('restaurant-token')
        const res = await fetch(`${ApiURL}/reservas/date`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`
            }
        })
        const dataRes = await res.json()
        return dataRes.reservas
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function fetchAtualizarReserva(state: any, formData: FormData) {
    const cookieStored = await cookies()
    const token = cookieStored.get('restaurant-token')
    const n_pessoas = parseInt(formData.get('n_pessoas') as string)
    const reservaId = parseInt(formData.get('reservaId') as string)

    if (!reservaId || !n_pessoas || !token) {
        return { erro: true, mensagem: "Dados inválidos" }
    }

    try {
        const res = await fetch(`${ApiURL}/reservas/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`
            },
            body: JSON.stringify({ reservaId, n_pessoas })
        })

        const dataRes = await res.json()
        const { erro, mensagem } = dataRes
        if (!erro) {
            revalidateTag('minhas_reservas')
        }
        return { erro, mensagem }
    } catch (error) {
        console.error(error)
        return { erro: true, mensagem: 'Erro ao fazer requisição' }
    }
}

export async function fetchCancelarReserva(reservaId: number) {
    const cookieStored = await cookies()
    const token = cookieStored.get('restaurant-token')

    if (!reservaId || !token) {
        return { erro: true, mensagem: "Dados inválidos" }
    }

    try {
        const res = await fetch(`${ApiURL}/reservas/cancelar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`
            },
            body: JSON.stringify({ reservaId })
        })

        const dataRes = await res.json()
        const { erro, mensagem, reservas } = dataRes
        if (!erro) {
            revalidateTag('minhas_reservas')
        }
        return { erro, mensagem, reservas }
    } catch (error) {
        console.error(error)
        return { erro: true, mensagem: 'Erro ao fazer requisição' }
    }
}

export async function fetchTodasReservas(data: string): Promise<Reserva[] | null> {
    if (!data) {
        return null
    }

    try {
        const cookieStored = await cookies()
        const token = cookieStored.get('restaurant-token')
        const res = await fetch(`${ApiURL}/reservas/date`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`
            },
            body: JSON.stringify({ data })
        })
        const dataRes = await res.json()
        return dataRes.reservas
    } catch (error) {
        console.error(error)
        return null
    }
}
