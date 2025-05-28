import React, { useState, useEffect } from "react"
import { getImprov } from "../../../api/ApiImprov"
import IncidCard from "./IncidCard"

import "./Style.css"

export default function Dashboard() {
  const [incids, setIncids] = useState([])

  // 1)API - Obter posts
  useEffect(() => {
      async function load() {
        const feed = await getImprov()
        const mapped = feed.map(i => ({
          id: i.id,
          message: i.mensagem,
          tag: i.tag,
          response: i.resposta,
          foto: i.foto,
          userId: i.utilizadorId
        }))
        setIncids(mapped)
      }
      load()
    }, [])

  return (
    <div className="dashboard">
      <div className="feed">
        {incids.length === 0 ? (
          <p className="no-posts">Ainda não há incidências.</p>
        ) : (
            incids.map(incid => <IncidCard key={incid.id} incid={incid} />)
        )}
      </div>
    </div>
  )
}
