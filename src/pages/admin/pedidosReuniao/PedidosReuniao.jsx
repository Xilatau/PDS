import React, { useEffect, useState } from "react";
import "./Style.css";
import { getPedidosReuniao } from "../../../Api/ApiReuniao";

export default function ListaPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    const data = await getPedidosReuniao();
    console.log("Pedidos de reunião recebidos:", data); 
    setPedidos(data);
  };

  return (
    <div>
      <h2>Pedidos de Reunião</h2>
      {pedidos.length === 0 ? (
        <p>Não há pedidos de reunião.</p>
      ) : (
        <ul className="Pedidos">
          {pedidos.map((pedido, index) => (
            <li key={index}>
              <strong>Data:</strong> {pedido.data} <br />
              <strong>Hora:</strong> {pedido.hora} <br />
              <strong>Motivo:</strong> {pedido.motivo}
              <div className="botoes">
                <button className="Aprovar">Aprovar</button>
                <button className="Rejeitar">Rejeitar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
