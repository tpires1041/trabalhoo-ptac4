export interface Usuario {
    id: number,
    nome: string,
    email: string,
    password: string,
    tipo: "cliente" | "admin"
}
