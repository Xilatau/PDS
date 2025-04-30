import React, { useState } from 'react';
import './style.css';

function Pedidos() {
  const [tipo, setTipo] = useState("");
  const [assunto, setAssunto] = useState("");
  const [file, setFile] = useState(null);

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', {tipo, assunto, file});
    // Here you would typically handle the file upload and form submission
  };

  return (
    <div className="pedidos-container">

      <h1>Fazer Pedido</h1>
      <form onSubmit={handleSubmit} className="pedidos-form">

        {/* tipo */}
        <div className="form-group">
          <label>Tipo de Pedido</label>
          <select
            id="tipo"
            name="tipo"
            value={tipo}
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

        <button type="submit" className="submit-button">Enviar Pedido</button>
      </form>
    </div>
  );
}

export default Pedidos;