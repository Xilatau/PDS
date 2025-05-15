import React, { useState, useEffect, useRef } from "react"
import "./StylePC.css"
import { getClient } from "../../../api/ApiClient.jsx"
import { responseImprov } from "../../../api/ApiImprov.jsx"

export default function IncidCard({ incid }) {
  const [editResponse, setEditResponse] = useState(false);
  const [user, setUser] = useState({})
  const [resposta, setResposta] = useState("");

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
  }

  return (
    <div className="post-card">
      <div className="post-header">
        <img
          className="avatar"
          src={user.foto}
        />
        <div className="info">
          <div className="title">{incid.message}</div>
          <div className="meta">
            {user.nome} ·{""}
            {incid.tag}
          </div>
        </div>
      </div>
      <div className="post-body">
      {incid.foto && (
        <img src={incid.foto}/>
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
            <button type="button" onClick={() => setEditResponse(prev => !prev)}>
              {editResponse ? "🔒" : "🔓"}
            </button>
      </div>
      <button className="btn-post" onClick={sendResponse}>
           Enviar Resposta
         </button>
      </div>
    </div>
  )
}
