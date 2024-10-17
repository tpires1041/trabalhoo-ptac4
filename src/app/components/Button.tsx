//<button type="submit" className={styles.botao}>Entrar</button>
import styles from '../styles/button.module.css';

type ButtonProp = {
    titulo: string,
    tipo: "submit",
}

const Button: React.FC<ButtonProp> = ({titulo, tipo}) => {
    return (<button className={styles.botao} type={tipo}>{titulo}</button>)
}

export default Button;