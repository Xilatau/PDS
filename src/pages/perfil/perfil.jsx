import React, { useState } from 'react';
import './styleP.css';

function Perfil() {
  const [formData, setFormData] = useState({
    field1: '',
    field2: '',
    field3: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="perfil-container">
      <h1>Perfil</h1>
      <form onSubmit={handleSubmit} className="perfil-form">
        <div className="form-group">
          <label htmlFor="field1">Nome</label>
          <input
            type="text"
            id="nome"
            name="nomeP"
            value={formData.field1}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="field2">NIF</label>
          <input
            type="text"
            id="nif"
            name="nifP"
            value={formData.field2}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="porta">Nº de Porta</label>
          <input
            type="text"
            id="porta"
            name="portaP"
            value={formData.field3}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Atualizar</button>
      </form>
    </div>
  );
}

export default Perfil;