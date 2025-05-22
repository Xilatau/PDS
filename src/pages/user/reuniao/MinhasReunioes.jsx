import React, { useEffect, useState } from "react";
import { getMinhasReunioes } from "../../../api/ApiReuniao"; // ou getReunioes
import "./StyleM.css";

export default function MinhasReunioes() {
  const [reunioes, setReunioes] = useState([]);

  useEffect(() => {
  const carregar = async () => {
    const data = await getMinhasReunioes();
    console.log("🔍 Dados da API:", data);
    const reunioesAprovadas = data.filter((r) => r.estado === "Aprovado");
    setReunioes(reunioesAprovadas);
  };
  carregar();
}, []);


  return (
    <div>
      <h2>As Minhas Reuniões</h2>
      {reunioes.length === 0 ? (
        <p>Não tem reuniões agendadas.</p>
      ) : (
        <ul className="Pedidos">
          {reunioes.map((r, index) => {
            const [data, horaCompleta] = r.horario.split("T");
            const hora = horaCompleta?.slice(0, 5);

            return (
              <li key={index}>
                <strong>Data:</strong> {data} <br />
                <strong>Hora:</strong> {hora} <br />
                <strong>Motivo:</strong> {r.motivo}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
