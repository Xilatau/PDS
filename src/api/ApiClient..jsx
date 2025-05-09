export async function createClient({nome, nif, contacto, contactoTag, nPorta, password, condominioId}) {
    try {
    const response = await fetch('https://localhost:7061/user/novo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: nome,
        nif: nif,
        contacto: contacto,
        contactoTag: "",
        nPorta: nPorta,
        password: password,
        condominioId: condominioId
      }),
    })
    .then(response => {
      if (!response.ok) throw new Error("Erro na API");
      return response.json();
    })
    .catch(error => {
      console.error("Erro ao conectar com a API:", error);
    });
  } catch (error) {
    console.error("Erro ao conectar com a API:", error);
  }
}