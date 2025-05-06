import React, { useState } from "react"
import "./StyleP.css"

export default function PostModal({ onClose, onSubmit }) {
  // Estado para título, descrição e ficheiro
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [file, setFile] = useState(null)

  // Guarda o ficheiro escolhido pelo utilizador
  const handleFileChange = e => {
    setFile(e.target.files[0])
  }

  // Quando submeter, chama a função passada pelo Dashboard
  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({ title, message, file })
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Criar Novo Post</h2>
        <form className="form-post" onSubmit={handleSubmit}>
          <label className="label-title">
            Título:
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </label>
          <div>
          <label className="label-message">
            <div>
              Descrição:
            </div>
            <textarea
              rows="7"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
            />
          </label>
          </div>
          

          <label>
            Imagem:
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="primary">
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}