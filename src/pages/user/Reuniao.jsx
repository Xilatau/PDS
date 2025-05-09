import React, { useState } from "react";
import "./Style.css";

export default function PostModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    const novoPost = {
      title,
      message
    };

    const postsGuardados = JSON.parse(localStorage.getItem("Reuniao")) || [];
    localStorage.setItem("Reuniao", JSON.stringify([novoPost, ...postsGuardados]));

    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Pedido Reunião</h2>
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
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="primary">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
