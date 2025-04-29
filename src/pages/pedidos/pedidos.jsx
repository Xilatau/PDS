import React, { useState } from 'react';
import './stylePedidos.css';

function Pedidos() {
  const [formData, setFormData] = useState({
    tipo: 'Incidencia',
    file: null
  });

  const handleTipoChange = (e) => {
    setFormData(prev => ({
      ...prev,
      tipo: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically handle the file upload and form submission
  };

  return (
    <div className="pedidos-container">
      <h1>Fazer Pedido</h1>
      <form onSubmit={handleSubmit} className="pedidos-form">
        <div className="form-group">
          <label htmlFor="tipo">Tipo de Pedido</label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleTipoChange}
            className="form-select"
          >
            <option value="Incidencia">Incidência</option>
            <option value="Melhoria">Melhoria</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="assunto">Assunto</label>
          <input
            type="text"
            id="assunto"
            name="assunto"
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="file">Anexar Arquivo</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="file-input"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          {formData.file && (
            <p className="file-info">{formData.file.name}</p>
          )}
        </div>

        <button type="submit" className="submit-button">Enviar Pedido</button>
      </form>
    </div>
  );
}

export default Pedidos;