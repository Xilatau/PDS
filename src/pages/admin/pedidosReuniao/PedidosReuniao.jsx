import React, { useEffect, useState } from "react";
import "./Style.css";
import { getPedidosReuniao, aprovarPedidoReuniao, rejeitarPedidoReuniao } from "../../../api/ApiReuniao";

export default function ListaPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    const data = await getPedidosReuniao();
    setPedidos(data);
  };

  const aprovarPedido = async (id) => {
    const data = await aprovarPedidoReuniao(id);
    carregarPedidos();
  };

  const rejeitarPedido = async (id) => {
    const data = await rejeitarPedidoReuniao(id);
    carregarPedidos();
  };

  return (
    <div>
      <h2>Pedidos de Reunião</h2>
      {pedidos.length === 0 ? (
        <p>Não há pedidos de reunião.</p>
      ) : (
        <ul className="Pedidos">
          {pedidos.map((pedido, index) => {
            const [data, horaCompleta] = pedido.horario.split("T");
            const hora = horaCompleta.slice(0, 5);

            return (
              <li key={index}>
                <strong>Data:</strong> {data} <br />
                <strong>Hora:</strong> {hora} <br />
                <strong>Motivo:</strong> {pedido.motivo}
                <div className="botoes">
                  <button className="Aprovar" onClick={() => aprovarPedido(pedido.id)}>Aprovar</button>
                  <button className="Rejeitar" onClick={() => rejeitarPedido(pedido.id)}>Rejeitar</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
