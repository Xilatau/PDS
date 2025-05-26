import React, { useEffect, useState } from "react";
import "./Style.css";
import { getPedidosReuniao, aprovarPedidoReuniao, rejeitarPedidoReuniao, getReunioes, publicarAtaReuniao } from "../../../api/ApiReuniao";

export default function ListaPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [reunioes, setReunioes] = useState([]);
  const [ata, setAta] = useState("");

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

  const publicarAta = async (id) => {
    const data = await publicarAtaReuniao(id, ata);
    carregarPedidos();
    carregarReunioes();
  };

  // Função para converter o ficheiro para Base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1]; // remove o prefixo "data:..."
      setAta(base64String);
    };
  
    if (file) {
      reader.readAsDataURL(file); // lê o ficheiro e converte para Base64
    }
  };

  // Função para fazer download do ficheiro da ata
  const downloadAta = (base64, nomeFicheiro) => {
    const byteCharacters = atob(base64); // decodifica base64
    const byteNumbers = Array.from(byteCharacters).map(char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
  
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = nomeFicheiro;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
                
                <strong>Ata:</strong>
                <div className="modal-actions ata">
                  <input type="file" accept=".doc,.docx" onChange={handleFileChange} />
                  <button className="primary ata" onClick={() => publicarAta(reuniao.id)}>Publicar Ata</button>
                  {reuniao.ata && (
                    <button className="primary ata" onClick={() => downloadAta(reuniao.ata, "ata.docx")}>
                      Download Ata
                    </button>
                  )}
                </div>

              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
