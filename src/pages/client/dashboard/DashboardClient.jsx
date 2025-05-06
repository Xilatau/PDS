import React, { useState, useEffect } from "react"
import { useAuth } from "../../../Authentication"
import PostModal from "../../user/post/Post"
import PostCard from "../../user/post/PostCard"
import "./StyleD.css"

export default function Dashboard() {
  const { user, token } = useAuth()            // obter user e token do contexto
  const [posts, setPosts] = useState([])       // state para os posts aprovados
  const [showModal, setShowModal] = useState(false)

  // 1) Ao montar, carrega os posts já aprovados
  useEffect(() => {
    async function load() {
      try {
        const data = await getPosts(token)
        setPosts(data)
      } catch (err) {
        console.error("Erro ao obter posts:", err)
      }
    }
    load()
  }, [token])

  // 2) Abre o modal de criação
  const handleCreateClick = () => {
    setShowModal(true)
  }

  // 3) Submete um novo post (fica pendente de aprovação)
  const handleSubmit = async ({ title, message, file }) => {
    try {
      await createPost({
        title,
        message,
        file,
        userId: user.id,
        token
      })
      setShowModal(false)
      alert("Post criado e aguarda aprovação do admin")
    } catch (err) {
      console.error("Erro ao criar post:", err)
      alert("Não foi possível criar o post")
    }
  }

  return (
    <div className="dashboard-container">
      {/* Botão para abrir o popup de criar post */}
      <button className="btn-post" onClick={handleCreateClick}>
        Criar Post
      </button>

      {/* Modal de criação de post */}
      {showModal && (
        <PostModal
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}

      {/* Feed de posts aprovados */}
      <div className="feed">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
