
'use client'  

import Image from 'next/image'  
import { useState } from 'react'
import { X } from 'lucide-react'  
import styles from '../styles/modalMap.module.css'  

// cria o componente do modal do mapa  
export default function ModalMap() {  
    const [isMapOpen, setIsMapOpen] = useState(false) 

    return (  
        <div>  
            <div  
                className={styles.thumbnail}  
                onClick={() => setIsMapOpen(true)}  
            >  
                <Image src={'/mapa_mesas.png'} width={200} height={150} alt="Mapa do Restaurante" />  
            </div>  

            {/* se o modal estiver aberto, exibe o conteúdo */}  
            {isMapOpen && (  
                <div className={styles.modalOverlay}> 
                    <div className={styles.modalContent}> 
                        <button className={styles.closeButton} onClick={() => setIsMapOpen(false)}>  
                            <X />  
                        </button> 
                        <div className={styles.imageContainer}>  
                            <Image src={'/mapa_mesas.png'} layout="responsive" width={800} height={600} alt="Mapa do Restaurante" />  
                        </div>  
                    </div>  
                </div>  
            )}  
        </div>  
    )  
}  