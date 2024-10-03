interface Usuario2 {
    nome: string,
    idade: number,
    email?: string
}

//const PerfilUsuario: React.FC<{usuario: Usuario2}>
= ({ usuario }) => {
    return (
        <div>
            <h1>Perfil Usuario</h1>
            <p>Nome: {usuario.nome}</p>
            <p>Idade: {usuario.idade}</p>
            {usuario.email && <p>Email: {usuario.email}</p>}
        </div>
    )
};

export default PerfilUsuario;