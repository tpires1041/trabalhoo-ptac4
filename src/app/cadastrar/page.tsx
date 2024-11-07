'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/cadastrar.module.css';
import Button from '../components/Button';
import Usuario from '../interfaces/usuario';


const PaginaCadastro = () => {

    const [usuario, setUsuario] = useState<Usuario>({
        nome: '',
        email: '',
        password: '',
        tipo: ''
    })

    const alterarNome = (novoNome: string) => {
        setUsuario((valoresAnteriores) => ({
            ...valoresAnteriores,
            nome: novoNome
        }))
        console.log(usuario)
    }

    

    const alterarTipo = (novoTipo: string) => {
        setUsuario((valoresAnteriores) => ({
            ...valoresAnteriores,
            tipo: novoTipo
        }))
    }

    const alterarEmail = (novoEmail: string) => {
        setUsuario((valoresAnteriores) => ({
            ...valoresAnteriores,
            email: novoEmail
        }))
    }

    const alterarPassword = (novoPassword: string) => {
        setUsuario((valoresAnteriores) => ({
            ...valoresAnteriores,
            password: novoPassword
        }))
    };

    const handleCadastro = (e: React.FormEvent) => {
        e.preventDefault();
        
        
        localStorage.setItem('usuario', JSON.stringify(usuario));

        router.push('/login');
    };

    const router = useRouter();

    return (
        <div className={styles.container}>
            <form className={styles.formulario}>
                <h1 className={styles.titulo}>Cadastrar</h1>
                <div className={styles.grupoInput}>
                    <label htmlFor="nome" className={styles.label}>Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        value={usuario.nome}
                        onChange={(e) => alterarNome(e.target.value)}
                        className={styles.input}
                    />
                </div>

                <div className={styles.grupoInput}>
                    <label htmlFor="tipo" className={styles.label}>Tipo:</label>
                    <input
                        type="text"
                        id="tipo"
                        value={usuario.tipo}
                        onChange={(e) => alterarTipo(e.target.value)}
                        className={styles.input}
                    />
                </div>

                <div className={styles.grupoInput}>
                    <label htmlFor="email" className={styles.label}>Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={usuario.email}
                        onChange={(e) => alterarEmail(e.target.value)}
                        className={styles.input}
                    />
                </div>
                
               
                <div className={styles.grupoInput}>
                    <label htmlFor="senha" className={styles.label}>Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        value={usuario.password}
                        onChange={(e) => alterarPassword(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <Button titulo='Cadastrar' tipo='submit' />

            </form>
        </div>
    );
};

export default PaginaCadastro;