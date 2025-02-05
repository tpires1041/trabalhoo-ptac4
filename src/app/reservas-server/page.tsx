import { ChangeEvent, useState } from "react";
import { FetchMesas } from "../components/FetchMesas";

// define os tipos para mesas e reservas
export type MesasType = {
  id: number;
  codigo: string;
  n_lugares: number;
  disponivel: boolean;
};

export type ReservasType = {
  id: number;
  usuario_id: number;
  mesa_id: number;
  data: string;
  n_pessoas: number;
  status: boolean;
};

export default function Reservas() {
  // estados para armazenar mesas, reservas e o formulário de reserva
  const [mesas, setMesas] = useState<MesasType[]>([]);
  const [reservas, setReservas] = useState<ReservasType[]>([]);
  const [formReserva, setFormReserva] = useState<ReservasType>({
    id: 0,
    usuario_id: 0,
    mesa_id: 0,
    data: '',
    n_pessoas: 0,
    status: false
  });

  // função para obter a data atual no formato correto
  function getDateNow() {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }

  // função para atualizar a data da reserva
  function handleChangeDate (e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setFormReserva(prevState => ({
      ...prevState,
      data: value
    }));
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      
      {/* seção do usuário */}
      <div className="w-full lg:w-1/4 text-white p-4 flex items-center">
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-4 w-full max-w-sm">
          {/* imagem do usuário comentada */}
          {/*<img
            src="https://github.com/MrMinerin.png"
            alt="Usuário"
            className="w-24 h-24 mx-auto rounded-full border-4 border-indigo-500"
          />*/}
          <h2 className="text-center text-lg font-bold mt-4">jéferson carlos de souza</h2>
          <p className="text-center text-gray-600">cliente</p>
        </div>
      </div>

      {/* seção de mesas disponíveis */}
      <div className="w-full lg:w-1/2 bg-white p-6">
        <div>
          <h2 className="text-xl font-bold mb-4">mesas disponíveis</h2>
          <label className="flex flex-col">
                <input
                  type="date"
                  min={getDateNow()}
                  className="p-2 border rounded"
                />
          </label>
        </div>
        
        <FetchMesas/>
      </div>
     
    </div>
  );
}
