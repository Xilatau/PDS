import React, { useState, useEffect } from "react"
import { useAuth } from "../../../Authentication"
import PostModal from "../../user/post/Post"
import PostCard from "../../user/post/PostCard"

import { getPosts, createPost } from "../../../api/ApiPost"
import "./StyleD.css"

export default function Dashboard() {
  const [posts, setPosts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState("all"); // 'all' ou 'mine'

  const userId = localStorage.getItem("userId")

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
        userName: p.utilizadorId
      }))
      setPosts(mapped)
    }
    load()
  }, [])

// 2)API - Criar post
  const handleCreateClick = () => setShowModal(true)

  const handleSubmit = async ({ title, message, imageBase64 }) => {
    try {
      await createPost({
        userId: userId,
        tag: "post",
        title,
        message,
        file: imageBase64
      });

      // Recarrega os posts
      const feed = await getPosts();
      const mapped = feed.map(p => ({
        id: p.id,
        title: p.titulo,
        message: p.mensagem,
        imageUrl: p.foto,
        createdAt: p.createdOn,
        userName: p.utilizadorId
      }));
      setPosts(mapped);

      // Fecha o modal
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao criar post:", error);
    }
  };

    const filteredPosts = activeTab === "mine" ? 
    (posts.filter(post => String(post.userName) === userId)) : posts;

return (
  <main className="dashboard">
    <div className="dashboard-content">
      <div className="dashboard-btt">
        <button className="btn-post" onClick={handleCreateClick}>
            Criar Post
          </button>

          <div className="tab-buttons">
              <button className={activeTab === "all" ? "active-tab" : ""} onClick={() => setActiveTab("all")}>
                Todos os Posts</button> 
              
              <button className={activeTab === "mine" ? "active-tab" : ""} onClick={() => setActiveTab("mine")}>
                Meus Posts</button>
            </div>
      </div>
        {showModal && (
          <PostModal onClose={() => setShowModal(false)} onSubmit={handleSubmit} />
        )}
  
      <div className="feed">
        {filteredPosts.length === 0 ? (
          <p className="no-posts">Ainda não há posts.</p>
        ) : (
          filteredPosts.map(post => <PostCard key={post.id} post={post} />)

        )}
      </div>
    </div>
   </main>
 );
}