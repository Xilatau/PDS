import React from "react"
import "./StylePC.css"


export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <div className="post-header">
        <img
          className="avatar"
          src={post.userAvatar || "/default-avatar.png"}
        />
        <div className="info">
          <div className="title">{post.title}</div>
          <div className="meta">
            {post.userName} ·{""}
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="post-body">
        <p>{post.message}</p>
        {post.imageUrl && (
          <img src={post.imageUrl}/>
        )}
      </div>
    </div>
  )
}
