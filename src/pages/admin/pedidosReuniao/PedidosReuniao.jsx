import React, { useEffect, useState } from "react";
import "./Style.css";
import { getPedidosReuniao, aprovarPedidoReuniao, rejeitarPedidoReuniao, getReunioes } from "../../../api/ApiReuniao";

export default function ListaPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [reunioes, setReunioes] = useState([]);

  useEffect(() => {
    carregarPedidos();
    carregarReunioes();
  }, []);

  const carregarPedidos = async () => {
    const data = await getPedidosReuniao();
    setPedidos(data);
  };

  const carregarReunioes = async () => {
    const data = await getReunioes();
    setReunioes(data);
  };

  const aprovarPedido = async (id) => {
    const data = await aprovarPedidoReuniao(id);
    carregarPedidos();
    carregarReunioes();
  };

  const rejeitarPedido = async (id) => {
    const data = await rejeitarPedidoReuniao(id);
    carregarPedidos();
    carregarReunioes();
  };

  return (
    <div>
      <h2>Pedidos de Reunião</h2>
      {pedidos.length == 0 ? (
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
                <div className="modal-actions">
                  <button className="btn-cancel" onClick={() => rejeitarPedido(pedido.id)}>
                    Rejeitar
                  </button>
                  <button onClick={() => aprovarPedido(pedido.id)} className="primary">
                    Aprovar
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <h2>Reuniões Agendadas</h2>
      {reunioes.length == 0 ? (
        <p>Não há reuniões agendadas.</p>
      ) : (
        <ul className="Pedidos">
          {reunioes.map((reuniao, index) => {
            const [data, horaCompleta] = reuniao.horario.split("T");
            const hora = horaCompleta.slice(0, 5);

            return (
              <li key={index}>
                <strong>Data:</strong> {data} <br />
                <strong>Hora:</strong> {hora} <br />
                <strong>Motivo:</strong> {reuniao.motivo}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
