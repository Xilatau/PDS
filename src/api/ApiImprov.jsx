

import { getClient } from "./ApiClient";

export async function createImprov({ assunto, tag, file }) {
  const utilizadorId = localStorage.getItem("userId");
  console.log(assunto + ", " + utilizadorId + ", " + tag + ", " + file);
  const payload = {
    mensagem: assunto,
    tag,
    foto: file,
    utilizadorId
  };
  const res = await fetch("https://localhost:7061/incidencias/nova", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Erro na API ao criar incidencia");
  else alert("Incidencia enviada com sucesso!");

const text = await res.text();
return text ? JSON.parse(text) : {}; // evita erro se a resposta for vazia
}


export async function getImprov() {
  try {
    const user = await getClient(localStorage.getItem("userId"));
    const res = await fetch("https://localhost:7061/incidencias/lista/" + user.condominioId);
    if (!res.ok) throw new Error("Erro na API ao obter posts");
    const data = await res.json();
    // data tem forma { $id: "...", $values: [ ... ] }
    return data.$values ?? [];
  } catch (err) {
    console.error("API getPosts erro:", err);
    return [];  // garante que devolvemos um array
  }
}

  