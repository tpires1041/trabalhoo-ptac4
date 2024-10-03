import PerfilUsuario from "../interfaces/usuario";

const Perfil= () => {
    const usuario ={
        nome: 'José Lima',
        email: 'joselima@gmail.com',
        idade: 15
    }
    return(
        <div>
            <h1>Perfil Usuário</h1>
            <PerfilUsuario usuario={usuario}/>
        </div>
    )
} 