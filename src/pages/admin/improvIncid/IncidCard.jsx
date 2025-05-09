import React, { useState, useEffect } from "react"
import "./StylePC.css"
import { getClient } from "../../../api/ApiClient.jsx"

export default function IncidCard({ incid }) {

  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getClient(incid.userId);
        setUser(data);
      } catch (err) {
        console.error("Erro ao buscar utilizador:", err);
      }
    };

    fetchUser();
  }, [incid.userId]);

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
        <p>{incid.response}</p>
        {incid.foto && (
          <img src={incid.foto}/>
        )}
      </div>
    </div>
  )
}
