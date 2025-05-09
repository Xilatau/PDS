import React, { useState, useEffect } from "react"
import "./StylePC.css"
import { getClient } from "../../../api/ApiClient.jsx"

export default function PostCard({ post }) {

  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getClient(post.userName);
        setUser(data);
      } catch (err) {
        console.error("Erro ao buscar utilizador:", err);
      }
    };

    fetchUser();
  }, [post.userName]);

  return (
    <div className="post-card">
      <div className="post-header">
        <img
          className="avatar"
          src={user.foto}
        />
        <div className="info">
          <div className="title">{post.title}</div>
          <div className="meta">
            {user.nome} ·{""}
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
