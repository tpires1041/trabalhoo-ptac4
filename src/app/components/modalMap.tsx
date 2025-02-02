'use client'
import Image from 'next/image';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function ModalMap() {
    const [isMapOpen, setIsMapOpen] = useState(false)

    return (
        <div>
            <div
                onClick={() => setIsMapOpen(true)}
            >
                <Image src={'/mapa_mesas.png'} fill alt="Mapa do Restaurante" />
            </div>

            {isMapOpen && (
                <div>
                    <div>
                        <button onClick={() => setIsMapOpen(false)}>
                            <X/>
                        </button>
                        <div>

                        </div>
                    </div>
                </div>
            )

            }
        </div>
    )
}