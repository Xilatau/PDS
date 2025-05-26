
export async function criarPedidoReuniao(pedido) {
  try {
    const response = await fetch('https://localhost:7061/reuniao/novo/pedido', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pedido)
    });

    if (!response.ok) throw new Error("Erro ao enviar pedido de reunião");

    return true;
  } catch (err) {
    console.error("API criarPedidoReuniao erro:", err);
    return false;
  }
}

export async function aprovarPedidoReuniao(id) {
  try {
    const response = await fetch(`https://localhost:7061/reuniao/aprovar/pedido/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error("Erro ao aprovar pedido de reunião");

    return true;
  } catch (err) {
    console.error("API aprovarPedidoReuniao erro:", err);
    return false;
  }
}

export async function rejeitarPedidoReuniao(id) {
  try {
    const response = await fetch(`https://localhost:7061/reuniao/rejeita/pedido/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error("Erro ao rejeitar pedido de reunião");

    return true;
  } catch (err) {
    console.error("API rejeitarPedidoReuniao erro:", err);
    return false;
  }
}



export async function publicarAtaReuniao(id, ata) {
  try {
    const response = await fetch(`https://localhost:7061/reuniao/add/ata/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ata})
    });

    if (!response.ok) throw new Error("Erro ao publicar ata de reunião");

    return true;
  } catch (err) {
    console.error("API publicarAtaReuniao erro:", err);
    return false;
  }
}

/* Lista de reuniões */
export async function getPedidosReuniao() {
  try {
    const res = await fetch('https://localhost:7061/reuniao/lista/admin');
    if (!res.ok) throw new Error("Erro ao obter pedidos de reunião");
    const data = await res.json();
    return data.$values ?? data ?? [];
  } catch (err) {
    console.error("API getPedidosReuniao erro:", err);
    return [];
  }
}

export async function getReunioes() {
  try {
    const res = await fetch('https://localhost:7061/reuniao/lista/prox');
    if (!res.ok) throw new Error("Erro ao obter pedidos de reunião");
    const data = await res.json();
    return data.$values ?? data ?? [];
  } catch (err) {
    console.error("API getReunioes erro:", err);
    return [];
  }
}

// Reuniões agendadas 
export async function getMinhasReunioes() {
  try {
    const res = await fetch('https://localhost:7061/reuniao/lista/prox');
    if (!res.ok) throw new Error("Erro ao obter reuniões agendadas");
    const data = await res.json();
    return data.$values ?? data ?? [];
  } catch (err) {
    console.error("API getMinhasReunioes erro:", err);
    return [];
  }
}
