'use server' 

import { cookies } from "next/headers" 
import { revalidateTag } from 'next/cache'  
import { ApiURL } from "../../../config"  
import { Reserva } from "./../interfaces/reservas"  

// função para buscar reservas com base em uma data
export async function fetchReserva(data: string): Promise<Reserva[] | null> {
    if (!data) { 
        return null 
    }
    try {
        const cookieStored = await cookies() 
        const token = cookieStored.get('restaurant-token') 
        const res = await fetch(`${ApiURL}/reservas/list`, { 
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

// função para buscar mesas disponíveis em uma data específica
export async function fetchMesasDisponiveis(data: string) {
    const cookieStored = await cookies()  
    const token = cookieStored.get('restaurant-token')  

    if (!token) {  
        throw new Error('Token não encontrado')
    }

    const res = await fetch(`${ApiURL}/mesa/disponibilidade`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`  
        },
        body: JSON.stringify({ data }) 
    })

    if (!res.ok) { 
        throw new Error('Erro ao buscar mesas disponíveis') 
    }

    const dataRes = await res.json() 
    console.log('Resposta da API:', dataRes)  
    return dataRes 
}

// função para criar uma nova reserva
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

// função para buscar as reservas do usuário
export async function fetchMinhasReservas(): Promise<Reserva[] | null> {
    try {
        const cookieStored = await cookies()  
        const token = cookieStored.get('restaurant-token') 
        const res = await fetch(`${ApiURL}/reservas/minhas`, { 
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

// função para atualizar uma reserva existente
export async function fetchAtualizarReserva(reservaId: number, reserva: Reserva) {
    const cookieStored = await cookies()  
    const token = cookieStored.get('restaurant-token')

    if (!token) {
        throw new Error('Token não encontrado')  
    }

    const res = await fetch(`${ApiURL}/reservas/${reservaId}`, { 
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify(reserva) 
    })

    if (!res.ok) { 
        throw new Error('Erro ao atualizar reserva')  
    }

    const dataRes = await res.json()  
    return dataRes 
}

// função para cancelar uma reserva
export async function fetchCancelarReserva(reservaId: number) {
    const cookieStored = await cookies()  
    const token = cookieStored.get('restaurant-token')  

    if (!reservaId || !token) {  
        return { erro: true, mensagem: "Dados inválidos" } 
    }

    try {
        const res = await fetch(`${ApiURL}/reservas`, {  
            method: 'DELETE',
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

// função para buscar todas as reservas para uma data específica
export async function fetchTodasReservas(data: string): Promise<Reserva[] | null> {
    if (!data) { 
        return null 
    }

    try {
        const cookieStored = await cookies() 
        const token = cookieStored.get('restaurant-token')  
        const res = await fetch(`${ApiURL}/reservas/list`, {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`  
            },
            body: JSON.stringify({ data })  
        })
        const dataRes = await res.json()  
        console.log('fetchTodasReservas response:', dataRes)  
        return dataRes.reservas  
    } catch (error) {
        console.error(error)  
        return null  
    }
}
