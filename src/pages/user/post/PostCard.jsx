import React, { useState, useEffect } from "react"
import "./StylePC.css"
import { getClient } from "../../../api/ApiClient.jsx"

export default function PostCard({ post }) {

  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if current user is admin
    const adminStatus = localStorage.getItem('admin');
    setIsAdmin(adminStatus === 'true');

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

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log('Deleting post:', post.id);
    // You'll want to add your delete logic here
    // For example: deletePost(post.id).then(() => onDelete(post.id));
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <img
          className="avatar"
          src={user.foto}
          alt={`${user.nome}'s avatar`}
        />
        <div className="info">
          <div className="title">{post.title}</div>
          <div className="meta">
            {user.nome} ·{""}
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
        {isAdmin && (
          <button 
            className="delete-button"
            onClick={handleDelete}
            title="Eliminar post"
          >
            Eliminar
          </button>
        )}
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
