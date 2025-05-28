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
      <div className="modal">
        <form className="form-reuniao" onSubmit={handleSubmit}> 
          <h1>Pedir Reunião</h1>
          <div className="reuniao-row">
            <div>
              <label>Data da reunião:</label>
              <input type="date" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div>
              <label>Hora da reunião:</label>
              <input type="time" value={time} onChange={e => setTime(e.target.value)} required />
            </div>
          </div>
            
          <div className="reuniao-description">
            <label className="label-message">Motivo da reunião:</label>
            <textarea rows="7" value={message} onChange={e => setMessage(e.target.value)} required/>
          </div>
          
          <div className="modal-buttons-reuniao">
            <button className='btn-cancel' type="button" onClick={onClose}>Cancelar</button>
            <button className="btn-submit" type="submit">Enviar</button>
          </div>
        </form>
      <button className="verpedidos" onClick={() => navigate('/MinhasReunioes')}>Ver Pedidos</button>
    </div>
  );
}
