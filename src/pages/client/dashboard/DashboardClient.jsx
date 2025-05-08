import React, { useState, useEffect } from "react"
import { useAuth } from "../../../Authentication"
import PostModal from "../../user/post/Post"
import PostCard from "../../user/post/PostCard"

import { getPosts, createPost } from "../../../api/ApiPost"
import "./StyleD.css"

export default function Dashboard() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [showModal, setShowModal] = useState(false)

  // 1)API - Obter posts
  useEffect(() => {
    async function load() {
      const feed = await getPosts()
      const mapped = feed.map(p => ({
        id: p.id,
        title: p.titulo,
        message: p.mensagem,
        imageUrl: p.foto,
        createdAt: p.createdOn,
        userName: `Utilizador ${p.utilizadorId}`
      }))
      setPosts(mapped)
    }
    load()
  }, [])

  // 2)API - Criar post


  const handleCreateClick = () => setShowModal(true)

  const handleSubmit = async ({ title, message, imageBase64 }) => {
    const created = await createPost({
      userId: localStorage.getItem("userId"),
      tag: "post",
      title,
      message,
      file: imageBase64
    })
    setPosts(prev => [
      {
        id: created.id,
        title: created.titulo,
        message: created.mensagem,
        createdAt: created.createdOn,
        userName: `Utilizador ${created.utilizadorId}`
      },
      ...prev
    ])
    setShowModal(false)
  }

  return (
    <div className="dashboard-container">
      <button className="btn-post" onClick={handleCreateClick}>
        Criar Post
      </button>

      {showModal && (
        <PostModal onClose={() => setShowModal(false)} onSubmit={handleSubmit} />
      )}

      <div className="feed">
        {posts.length === 0 ? (
          <p className="no-posts">Ainda não há posts.</p>
        ) : (
          posts.map(post => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  )
}
