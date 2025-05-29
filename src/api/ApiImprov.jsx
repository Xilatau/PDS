

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

export async function responseImprov({ id, response }) {
  const utilizadorId = localStorage.getItem("userId");
  const res = await fetch(`https://localhost:7061/incidencias/resposta/${id}/${utilizadorId}?resposta=${response}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) throw new Error("Erro na API ao criar resposta da incidencia");
  else alert("Resposta enviada com sucesso!");

const text = await res.text();
return text ? JSON.parse(text) : {}; // evita erro se a resposta for vazia
}

//Respostas incidencias/melhorias
export async function getIncidenciasPorUtilizador(utilizadorId) {
  try {
    const response = await fetch(`https://localhost:7061/incidencias/lista/user/${localStorage.getItem('userId')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar incidências do utilizador");
    }

    const data = await response.json();
    

    return data?.$values ?? []; 
  } catch (error) {
    console.error("Erro ao buscar incidências do utilizador:", error);
    throw error;
  }
}
