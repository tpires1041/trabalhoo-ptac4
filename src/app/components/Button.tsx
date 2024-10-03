//<button type="submit" className={styles.botao}>Entrar</button>
type ButtonProp = {
    titulo: string,
    tipo: "submit",

}

const Button: React.FC<ButtonProp> = ({titulo, tipo}) => {
    return (<button type={tipo}>{titulo}</button>)
}

export default Button;
