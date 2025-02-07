'use server'

import { cookies } from "next/headers"
import { ApiURL } from "../../../config"
import { redirect } from "next/navigation"

// função para buscar as mesas
export async function fetchMesas() {
    const cookieStored = await cookies()
    const token = cookieStored.get('restaurant-token')

    if (!token) {
        console.log('Token não encontrado')
        redirect('/login')
    }

    console.log('Buscando mesas com token:', token.value)

    // faz uma requisição para buscar as mesas
    const res = await fetch(`${ApiURL}/mesa`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
        }
    })

  
    if (!res.ok) {
        const errorText = await res.text()
        console.error('Erro ao buscar mesas:', errorText)
        throw new Error('Erro ao buscar mesas')
    }
    const dataRes = await res.json()
    return dataRes.mesas
}

// função para criar uma nova mesa
export async function criarMesa(codigo: string, n_lugares: number) {
    const cookieStored = await cookies()
    const token = cookieStored.get('restaurant-token')

    
    if (!token) {
        throw new Error('Token não encontrado')
    }

    console.log('Criando mesa com:', { codigo, n_lugares })

    // faz uma requisição para criar uma nova mesa
    const res = await fetch(`${ApiURL}/mesa/novo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify({ codigo, n_lugares })
    })

    if (!res.ok) {
        const errorText = await res.text()
        console.error('Erro ao criar mesa:', errorText)
        throw new Error('Erro ao criar mesa')
    }
    const dataRes = await res.json()
    return dataRes
}

// função para atualizar uma mesa existente
export async function atualizarMesa(id: number, codigo: string, n_lugares: number) {
    const cookieStored = await cookies()
    const token = cookieStored.get('restaurant-token')


    if (!token) {
        throw new Error('Token não encontrado')
    }

    // faz uma requisição para atualizar uma mesa existente
    const res = await fetch(`${ApiURL}/mesa`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify({ id, codigo, n_lugares })
    })

    
    if (!res.ok) {
        const errorText = await res.text()
        console.error('Erro ao atualizar mesa:', errorText)
        throw new Error('Erro ao atualizar mesa')
    }
    const dataRes = await res.json()
    return dataRes
}

// função para deletar uma mesa
export async function deletarMesa(id: number) {
    const cookieStored = await cookies()
    const token = cookieStored.get('restaurant-token')

    if (!token) {
        throw new Error('Token não encontrado')
    }

    // faz uma requisição para deletar uma mesa
    const res = await fetch(`${ApiURL}/mesa/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
        }
    })


    if (!res.ok) {
        const errorText = await res.text()
        console.error('Erro ao deletar mesa:', errorText)
        throw new Error('Erro ao deletar mesa')
    }
    const dataRes = await res.json()
    return dataRes
}