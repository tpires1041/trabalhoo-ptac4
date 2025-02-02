'use server'

import { cookies } from "next/headers"
import { ApiURL } from "../../../config"
import { Mesas } from "./../interfaces/mesas"

export async function fetchMesas():Promise<Mesas[] | null>{
    try {
        const cookieStored = await cookies()
        const token = cookieStored.get('restaurant-token')
        const res = await fetch(`${ApiURL}/mesas`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token?.value}` }
        })
        const data = await res.json()
        return data.mesas
    } catch (error) {
        return null
    }
}