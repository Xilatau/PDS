import React, { useState, useEffect } from 'react';
import './styleP.css';
import { fetchUserProfile,updateProfile } from '../../../api/ApiPerfil.jsx';

function Perfil() {
  //Variaveis dos campos input
  const [nomeP, setNomeP] = useState('');
  const [stringIMG, setStringIMG] = useState('');
  const [nifP, setNifP] = useState('');
  const [portaP, setPortaP] = useState();
  const [errors, setErrors] = useState({});

  //Variaveis para butoes lock/unlock
  const [editNome, setEditNome] = useState(false);
  const [editNif, setEditNif] = useState(false);
  const [editPorta, setEditPorta] = useState(false);
  const [editImg, setEditImg] = useState(false);

  useEffect(() => {
		// Suponha que o ID do usuário da sessão seja armazenado no localStorage
		const userId = localStorage.getItem('userId'); // Obtenha o ID do usuário da sessão

		if (userId) {
		  fetchUserProfile(userId)
			.then(data => {
			  setNomeP(data.nome);
			  setNifP(data.nif);
			  setPortaP(data.nPorta);
			  setStringIMG(data.stringIMG);
			})
			.catch(error => {
			  console.error('Failed to load user profile:', error);
			});
		} else {
		  console.error('User ID not found in session.');
		}
	  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStringIMG(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some(error => error)) {
      return;
    }

    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        await updateProfile(userId, {
          nome: nomeP,
          nif: nifP,
          nPorta: portaP,
          stringIMG: stringIMG
        });
        console.log('Perfil atualizado com sucesso');
      } catch (error) {
        console.error('Erro ao atualizar o perfil:', error);
      }
    } else {
      console.error('ID de utilizador não encontrado para atualização.');
    }
  };


  return (
    <div className="perfil-container">
      <h1 className='h1-profile'>Perfil</h1>
      <form onSubmit={handleSubmit} className="perfil-form">

        {/* nome */}
        <div className="form-group">
          <label>Nome</label>
          <div className="input-with-button">
            <input
              type="text"
              id="nomeP"
              value={nomeP}
              className="form-input"
              onChange={(e) => setNomeP(e.target.value)}
              disabled={!editNome}
            />
            <button type="button" onClick={() => setEditNome(prev => !prev)}>
              {editNome ? "🔒" : "🔓"}
            </button>
          </div>
        </div>

        {/* nif */}
        <div className="form-group">
          <label>NIF</label>
          <div className="input-with-button">
            <input
              type="number"
              id="nifP"
              value={nifP}
              className="form-input"
              onChange={(e) => {
                const value = e.target.value;
                if (value.length > 9) {
                  setErrors(prev => ({ ...prev, nifP: 'O NIF não pode ter mais de 9 dígitos' }));
                } else if (value.length < 9) {
                  setErrors(prev => ({ ...prev, nifP: 'O NIF não pode ter menos de 9 dígitos' }));
                } else {
                  setErrors(prev => ({ ...prev, nifP: '' }));
                }
                setNifP(value);
              }}
              disabled={!editNif}
            />
            <button type="button" onClick={() => setEditNif(prev => !prev)}>
              {editNif ? "🔒" : "🔓"}
            </button>
          </div>
          {errors.nifP && <div className="error-message">{errors.nifP}</div>}
        </div>

        {/* porta */}
        <div className="form-group">
          <label>Nº de Porta</label>
          <div className="input-with-button">
            <input
              type="number"
              id="portaP"
              value={portaP}
              className="form-input"
              onChange={(e) => setPortaP(e.target.value)}
              disabled={!editPorta}
            />
            <button type="button" onClick={() => setEditPorta(prev => !prev)}>
              {editPorta ? "🔒" : "🔓"}
            </button>
          </div>
        </div>

        {/* imagem */}
        <div className="form-group">
          <label htmlFor="profile-image">Imagem de Perfil</label>
          <div className="input-with-button">
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              onChange={handleImageChange}
              className="form-input"
              disabled={!editImg}
            />
            <button type="button" onClick={() => setEditImg(prev => !prev)}>
              {editImg ? "🔒" : "🔓"}
            </button>
          </div>
        </div>

        {/* botão de atualizar */}
        <button type="submit" className="submit-button">Atualizar</button>
      </form>
    </div>
  );
}

export default Perfil;
