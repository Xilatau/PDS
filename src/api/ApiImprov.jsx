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

  