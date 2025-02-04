import { ApiURL } from "../../../config";
import { cookies } from "next/headers";
import { Usuario } from "../interfaces/usuario";
import { redirect } from "next/navigation"; 

export async function fetchUser():Promise<Usuario | null>{
    try {
        const cookieStored = await cookies()
        const token = cookieStored.get('restaurant-token')
        const res = await fetch(`${ApiURL}/usuario`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token?.value}` }
        })
        const data = await res.json()
        const user = data.usuario
        return data.usuario
    } catch (error) {
        return null
    }
}

async function logout(){
  const cookieStored = await cookies()
  cookieStored.delete('restaurant-token')
  redirect('/')
}

