'use server'

import { cookies } from "next/headers"
import { ApiURL } from "../../../config"

// função para buscar o perfil do usuário
export async function fetchPerfil() {
    const cookieStored = await cookies()
    const token = cookieStored.get('restaurant-token')

    if (!token) {
        throw new Error('Token não encontrado')
    }

    // faz uma requisição para buscar o perfil do usuário
    const res = await fetch(`${ApiURL}/perfil`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
        }
    })

    if (!res.ok) {
        throw new Error('Erro ao buscar perfil')
    }

    const dataRes = await res.json()
    return dataRes.usuario
}

// função para atualizar o perfil do usuário
export async function atualizarPerfil(nome: string, email: string) {
    const cookieStored = await cookies()
    const token = cookieStored.get('restaurant-token')


    if (!token) {
        throw new Error('Token não encontrado')
    }

    console.log('Atualizando perfil com:', { nome, email })

    // faz uma requisição para atualizar o perfil do usuário
    const res = await fetch(`${ApiURL}/perfil`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify({ nome, email })
    })

    if (!res.ok) {
        const errorText = await res.text()
        console.error('Erro ao atualizar perfil:', errorText)
        throw new Error('Erro ao atualizar perfil')
    }

    const dataRes = await res.json()
    return dataRes
}