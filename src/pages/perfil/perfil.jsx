import React, { useState } from 'react';
import './styleP.css';

function Perfil() {
  const [nomeP, setNomeP] = useState();
  const [nifP, setNifP] = useState();
  const [portaP, setPortaP] = useState();
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).some(error => error)) {
      return;
    }
    console.log('Enviado:', {nomeP, nifP, portaP});
  };

  return (
    <div className="perfil-container">

      <h1>Perfil</h1>
      <form onSubmit={handleSubmit} className="perfil-form">

        {/* nome */}
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            id="nomeP"
            value={setNomeP}
            className="form-input"
          />
        </div>

        {/* nif */}
        <div className="form-group">
          <label>NIF</label>
          <input
            type="text"
            id="nifP"
            value={setNifP}
            className="form-input"
            onChange={(e) => {
              const value = e.target.value;
              if ((value.length > 9) || (value.length < 9))  {
                setErrors(prev => ({ ...prev, nifP: 'O NIF não pode ter mais de 9 dígitos' }));
              } else {
                setErrors(prev => ({ ...prev, nifP: '' }));
              }
              setNifP(value);
            }}
          />
          {errors.nifP && <div className="error-message">{errors.nifP}</div>}
        </div>

        {/* porta */}
        <div className="form-group">
          <label>Nº de Porta</label>
          <input
            type="text"
            id="portaP"
            value={setPortaP}
            className="form-input"
          />
        </div>

        {/* botão de atualizar */}
        <button type="submit" className="submit-button">Atualizar</button>
      </form>
    </div>
  );
}

export default Perfil;