import React, { useState } from "react"
import "./StyleP.css"


export default function PostModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [file, setFile] = useState("")
  const [preview, setPreview] = useState(null)


    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (!selectedFile) return;
    
      // Gerar preview
      if (preview) URL.revokeObjectURL(preview);
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
    
      // Converter para Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result); // aqui guardamos o Base64 diretamente no estado
      };
      reader.readAsDataURL(selectedFile);
    };
    const handleSubmit = (e) => {
      e.preventDefault();
    
      console.log("Modal a submeter:", { title, message, imageBase64: file });
      onSubmit({ title, message, imageBase64: file });
    };
        

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

          <div className="butoespost">
            <button className="btn-cancel" type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
