import React from "react"
import "./StylePC.css"

export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <div className="post-header">
        {/* Avatar do utilizador */}
        <img
          className="avatar"
          src={post.userAvatar || "/default-avatar.png"}
          alt={post.userName}
        />
        <div className="info">
          {/* Título do post */}
          <div className="title">{post.title}</div>
          {/* Meta: nome do utilizador e data de criação */}
          <div className="meta">
            {post.userName} · {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="post-body">
        {/* Corpo da mensagem */}
        <p>{post.message}</p>
        {/* Imagem, se existir */}
        {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
      </div>
    </div>
  )
}