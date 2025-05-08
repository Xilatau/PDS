
import React, { useState } from "react"
import "./StyleP.css"

export default function PostModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleFileChange = e => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return
    if (preview) URL.revokeObjectURL(preview)
    const url = URL.createObjectURL(selectedFile)
    setFile(selectedFile)
    setPreview(url)
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log("Modal a submeter:", { title, message, file })
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

          <label className="label-message">
            Descrição:
            <textarea
              rows="7"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
            />
          </label>

          <label htmlFor="fileUpload">
            Imagem (opcional):
          </label>
          <input
            id="fileUpload"
            className="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {preview && (
            <img
              src={preview}
              className="preview-image"
              alt="Pré-visualização"
              onLoad={() => URL.revokeObjectURL(preview)}
            />
          )}

          <div className="modal-actions">
            <button className="btn-cancel" type="button" onClick={onClose}>
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
