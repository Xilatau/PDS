import React, { useState, useEffect } from "react";
import "./StylePC.css";
import { getClient } from "../../../api/ApiClient.jsx";
import { responseImprov } from "../../../api/ApiImprov.jsx";

export default function IncidCard({ incid }) {
  const [editResponse, setEditResponse] = useState(false);
  const [user, setUser] = useState({});
  const [resposta, setResposta] = useState("");
  const [isExpanded, setIsExpanded] = useState(false); // controla expansão

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getClient(incid.userId);
        setUser(data);
        setResposta(incid.response);
      } catch (err) {
        console.error("Erro ao buscar utilizador:", err);
      }
    };

    fetchUser();
  }, [incid.userId]);

  const sendResponse = () => {
    responseImprov({ id: incid.id, response: resposta });
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <img className="avatar" src={user.foto} />
        <div className="info">
          <div className="title">{incid.message}</div>
          <div className="meta">
            {user.nome} · {incid.tag}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="post-body">
          {incid.foto && (
            <img src={incid.foto} className="thumbnail-image" />
          )}

          <div className="input-with-button">
            <input
              type="text"
              id="nomeP"
              value={resposta}
              className="form-input"
              disabled={!editResponse}
              onChange={(e) => setResposta(e.target.value)}
            />
            <button type="button" onClick={() => setEditResponse((prev) => !prev)}>
              {editResponse ? "🔒" : "🔓"}
            </button>
          </div>

          <button className="btn-post" onClick={sendResponse}>
            Enviar Resposta
          </button>
        </div>
      )}

      <div style={{ textAlign: "center", margin: "10px" }}>
        <button className="toggle-button" onClick={() => setIsExpanded(prev => !prev)}>
          {isExpanded ? "Mostrar menos ▲" : "Mostrar mais ▼"}
        </button>
      </div>
    </div>
  );
}
