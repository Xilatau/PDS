/**
 * Obter utilizador pelo id
 * -> devolve sempre um array (mesmo que vazio)
 */
export async function getPosts() {
    try {
      const res = await fetch("https://localhost:7061/post/feed");
      if (!res.ok) throw new Error("Erro na API ao obter posts");
      const data = await res.json();
      // data tem forma { $id: "...", $values: [ ... ] }
      return [data.$values]?? [];
    } catch (err) {
      console.error("API getPosts erro:", err);
      return [];  // garante que devolvemos um array
    }
  }