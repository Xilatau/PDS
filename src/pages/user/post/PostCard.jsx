import React, { useState, useEffect } from "react"
import "./StylePC.css"
import { getClient } from "../../../api/ApiClient.jsx"
import { deletePost } from "../../../api/ApiPost.jsx"
import { useNavigate } from 'react-router-dom';

export default function PostCard({ post, onDelete }) {

  const navigate = useNavigate();
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

  const handleDelete = async () => {
    const confirmar = window.confirm("Tem a certeza que quer eliminar?");
    if (confirmar) {
      try {
        await deletePost(post.id);
        onDelete();
      } catch (error) {
        console.error("Erro ao eliminar post:", error);
      }
    }
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
