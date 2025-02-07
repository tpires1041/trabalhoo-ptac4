import styles from '../styles/button.module.css';

// define o tipo das props que o botão vai receber  
type ButtonProp = {  
    titulo: string,   
    tipo: "submit", 
};

// cria o componente funcional do botão  
const Button: React.FC<ButtonProp> = ({ titulo, tipo }) => {  
    return (  
        // retorna um botão com a classe de estilo e as props passadas  
        <button className={styles.botao} type={tipo}>{titulo}</button>  
    );  
};

export default Button;