
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

