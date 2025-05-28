import React, { useState } from "react";
import "./Style.css";
import { criarPedidoReuniao } from "../../../api/ApiReuniao";
import { useNavigate } from "react-router-dom";

export default function PostModal({ onClose }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoPedido = {
      data: title,
      hora: time,
      motivo: message,
      utilizadorId: localStorage.getItem("userId")
    };

    const sucesso = await criarPedidoReuniao(novoPedido);

    if (sucesso) {
      alert("Pedido de reunião enviado com sucesso!");
      navigate('/MinhasReunioes');
    } else {
      alert("Erro ao enviar pedido.");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Pedir Reunião</h2>
        <form className="form-post" onSubmit={handleSubmit}>
          
          <label className="label-title">
            Data da reunião:
            <input
              type="date"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </label>

          <label className="label-title">
            Hora da reunião:
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              required
            />
          </label>

          <label className="label-message">
            <div>Motivo da reunião:</div>
            <textarea
              rows="7"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
            />
          </label>

          <div className="modal-actions">
            <button  className='cancel' type="button" onClick={onClose}>Cancelar</button>
            <button type="submit" className="primary">Enviar</button>
          </div>
        </form>
      </div>
      <button className="v" onClick={() => navigate('/MinhasReunioes')}>Ver Pedidos</button>
    </div>
  );
}
