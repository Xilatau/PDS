// src/api/ApiPost.js

/**
 * Obter todos os posts
 * -> devolve sempre um array (mesmo que vazio)
 */
export async function getPosts() {
    try {
      const res = await fetch("https://localhost:7061/post/feed");
      if (!res.ok) throw new Error("Erro na API ao obter posts");
      const data = await res.json();
      // data tem forma { $id: "...", $values: [ ... ] }
      return data.$values ?? [];
    } catch (err) {
      console.error("API getPosts erro:", err);
      return [];  // garante que devolvemos um array
    }
  }
  
  /**
   * Criar um novo post
   */
  export async function createPost({ userId, title, message, file }) {
    const payload = {
      utilizadorId: userId,
      tag: "post",
      titulo: title,
      mensagem: message,
      foto: file,
      createdOn: new Date().toISOString()
    };
    const res = await fetch("https://localhost:7061/post/novo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Erro na API ao criar post");

  const text = await res.text();
  return text ? JSON.parse(text) : {}; // evita erro se a resposta for vazia
  }

  export async function deletePost(postId) {
    const res = await fetch(`https://localhost:7061/post/eliminar/${postId}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error("Erro na API ao eliminar post");
  }
  