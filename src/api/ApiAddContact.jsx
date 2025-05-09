/**
 * Adiciona um novo contacto de emergência
 */
export async function createContacto({ nome, telemovel, condominioID }) {
  const payload = {
    nome,
    telemovel,
    condominioID
  };

  const res = await fetch("https://localhost:7061/contacto/emergencia/Add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("Erro da API:", errorData);
    throw new Error(errorData.message || "Erro na API ao adicionar contacto");
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    return null; // ou `return res.text();` se quiseres o texto simples
  }
}

/**
 * Buscar contactos por condomínio
 * -> devolve sempre um array (mesmo que vazio)
 */
export async function getContactosPorCondominio(condominioID) {
  try {
    const res = await fetch(`https://localhost:7061/contacto/emergencia/Lista/1`);
    if (!res.ok) throw new Error("Erro na API ao obter contactos");
    const data = await res.json();
    return data.$values ?? [];
  } catch (err) {
    console.error("API getContactos erro:", err);
    return [];
  }
}
