import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { getIncidenciasPorUtilizador } from "../../../api/ApiImprov";
import './StyleRU.css';


export default function RespostasUtilizador() {
  const navigate = useNavigate();
  const { utilizadorId } = useParams();
  const [incidencias, setIncidencias] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getIncidenciasPorUtilizador(utilizadorId);
      console.log("DADOS RECEBIDOS:", data); // deve mostrar a lista
      setIncidencias(data);
    } catch (error) {
      console.error("Erro ao carregar as respostas:", error);
    }
  };

  fetchData();
}, [utilizadorId]);



  return (
    <div className="respostas-container">
      <h2>Respostas às Incidências/Melhorias</h2>
      {incidencias.length === 0 ? (
        <p>Nenhuma incidência/melhoria encontrada.</p>
      ) : (
        incidencias.map((incid) => (
          <div key={incid.id} className="resposta-card">
            <h3>{incid.mensagem}</h3>
            <p><strong>Tipo:</strong> {incid.tag}</p>
            <p><strong>Resposta:</strong> {incid.resposta || "Sem resposta ainda"}</p>
          </div>
        ))
      )}
    </div>
  );
}
