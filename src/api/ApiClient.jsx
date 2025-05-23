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

export async function getClient(id) {
    try {
      const response = await fetch(`https://localhost:7061/user/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error("Erro na API");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao conectar com a API:", error);
      throw error; // permite que quem chamar também trate o erro
    }
  }
  