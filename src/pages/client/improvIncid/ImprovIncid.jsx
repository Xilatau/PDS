import React, { useState } from 'react';
import { createImprov } from "../../../api/ApiImprov";
import { useNavigate } from 'react-router-dom';
import './style.css';

function Pedidos() {
  const navigate = useNavigate();
  const [tag, setTag] = useState("Incidencia");
  const [assunto, setAssunto] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState(null)

  const handleTipoChange = (e) => {
    setTag(e.target.value);
    console.log(tag);
  };

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

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await createImprov({
          assunto,
          tag,
          file
        });
        navigate('/dashboard');
      } catch (error) {
        console.error("Erro ao criar incidencia:", error);
      }
    };

  return (
    <div className="pedidos-container">

      <h1>Fazer Pedido</h1>
      <form onSubmit={handleSubmit} className="pedidos-form">

        {/* tipo */}
        <div className="form-group">
          <label>Tipo de Pedido</label>
          <select
            id="tag"
            name="tag"
            value={tag}
            onChange={handleTipoChange}
            className="form-input"
          >
            <option value="Incidencia">Incidência</option>
            <option value="Melhoria">Melhoria</option>
          </select>
        </div>

        <div className="form-group">
          <label>Assunto</label>
          <input
            type="text"
            id="assunto"
            name="assunto"
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label>Anexar Arquivo</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="form-input"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          {file && (
            <p className="file-info">{file.name}</p>
          )}
        </div>
        {preview && (
            <img
              src={preview}
              className="preview-image"
              alt="Pré-visualização"
              onLoad={() => URL.revokeObjectURL(preview)}
            />
          )}

        <button type="submit" className="submit-button">Enviar Pedido</button>
      </form>
       <button className='button-ver' onClick={() => navigate('/RespostasUtilizador')}>Ver Respostas</button>
    </div>
  );
}

export default Pedidos;