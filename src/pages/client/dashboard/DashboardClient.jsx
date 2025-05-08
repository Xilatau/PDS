// src/components/Dashboard.jsx
import React, { useState } from "react"
import { useAuth } from "../../../Authentication"
import PostModal from "../../user/post/Post"
import PostCard from "../../user/post/PostCard"
import "./StyleD.css"

export default function Dashboard() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [showModal, setShowModal] = useState(false)

  const handleCreateClick = () => {
    setShowModal(true)
  }

  const handleSubmit = ({ title, message, file }) => {
    console.log("handleSubmit chamado com:", title, message, file)
    const newPost = {
      id: Date.now(),
      userName: user?.username || "Anónimo",
      userAvatar: user?.avatarUrl || null,
      title,
      message,
      imageUrl: file ? URL.createObjectURL(file) : null,
      createdAt: new Date().toISOString(),
    }
    setPosts(prev => [newPost, ...prev])
    setShowModal(false)
  }

  return (
    <div className="dashboard-container">
      <button className="btn-post" onClick={handleCreateClick}>
        Criar Post
      </button>

      {showModal && (
        <PostModal
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}

      <div className="feed">
        {posts.length === 0 && (
          <p className="no-posts">Ainda não há posts. Cria o primeiro!</p>
        )}
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}