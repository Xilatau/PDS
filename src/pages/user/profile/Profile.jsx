import React, { useState, useEffect } from 'react';
import './styleP.css';
import { useNavigate } from 'react-router-dom';
import { updateProfile, ValidatePassword } from '../../../api/ApiPerfil.jsx';
import { getClient } from '../../../api/ApiClient.jsx';

function Perfil() {
  // State variables
  const [nomeP, setNomeP] = useState('');
  const [stringIMG, setStringIMG] = useState('');
  const [teleP, setTeleP] = useState('');
  const [errors, setErrors] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // State for lock/unlock buttons
  const [editNome, setEditNome] = useState(false);
  const [editTele, setEditTele] = useState(false);
  const [editImg, setEditImg] = useState(false);

  const navigate = useNavigate();
    const [preview, setPreview] = useState(null)

  useEffect(() => {
		const userId = localStorage.getItem('userId'); // Obtem o ID da sessao

    //Com o ID, pega no perfil, e depois carrega as infos da base de dados nas variaves dos inputs
		if (userId) {
		  getClient(userId)
			.then(data => {
			  setNomeP(data.nome);
			  setTeleP(data.telemovel);
			  setStringIMG(data.foto);
			})
			.catch(error => {
			  console.error('Failed to load user profile:', error);
			});
		} else {
		  console.error('User ID not found in session.');
		}
	  }, []);

    const handleImageChange = (e) => {
      const selectedFile = e.target.files[0];
      if (!selectedFile) return;
    
      // Gerar preview
      if (preview) URL.revokeObjectURL(preview);
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
    
      // Converter para Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setStringIMG(reader.result); // aqui guardamos o Base64 diretamente no estado
      };
      reader.readAsDataURL(selectedFile);
    };

  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePasswords = () => {
    const passwordValid = async () => {
          try {
            const data = await ValidatePassword(localStorage.getItem('userId'), passwordData.currentPassword);
            console.log(data);
          } catch (err) {
            console.error("Erro ao verificar password:", err);
          }
        };

    if(!passwordValid()) {
      setPasswordError('Palavra-passe atual inválida');
      return false;
    }else{
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setPasswordError('As palavras-passe não coincidem');
        return false;
      }
      if (passwordData.newPassword.length < 6) {
        setPasswordError('A nova palavra-passe deve ter pelo menos 6 caracteres');
        return false;
      }
      setPasswordError('');
      return true;
    }

    
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;

    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        await updateProfile(userId, {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        });
        setPasswordSuccess('Palavra-passe alterada com sucesso!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setIsChangingPassword(false);
        setTimeout(() => setPasswordSuccess(''), 3000);
      } catch (error) {
        console.error('Erro ao atualizar a palavra-passe:', error);
        setPasswordError('Erro ao atualizar a palavra-passe. Verifique a palavra-passe atual.');
      }
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
          nomeP,
          teleP,
          stringIMG
        });
        console.log('Perfil atualizado com sucesso');
        alert('Perfil atualizado com sucesso!');
        navigate('/dashboard');
      } catch (error) {
        console.error('Erro ao atualizar o perfil:', error);
      }
    } else {
      console.error('ID de utilizador não encontrado para atualização.');
    }
  };

  return (
    <div className="dashboard">
      <div className="perfil-container">
      <h1>Perfil</h1>
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
          <label>Contacto</label>
          <div className="input-with-button">
            <input
              type="string"
              id="teleP"
              value={teleP}
              className="form-input"
              onChange={(e) => {
                const value = e.target.value;
                setTeleP(value);
              }}
              disabled={!editTele}
            />
            <button type="button" onClick={() => setEditTele(prev => !prev)}>
              {editTele ? "🔒" : "🔓"}
            </button>
          </div>
          {errors.teleP && <div className="error-message">{errors.teleP}</div>}
        </div>

        {/* Password Change Section */}
        <div className="form-group">
          <label>Palavra-passe</label>
          {!isChangingPassword ? (
            <button 
              type="button" 
              className="change-password-btn"
              onClick={() => setIsChangingPassword(true)}
            >
              Alterar Palavra-passe
            </button>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="password-form">
              <div className="form-group">
                <label>Palavra-passe atual</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Nova palavra-passe</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirmar nova palavra-passe</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="form-input"
                  required
                />
              </div>
              {passwordError && <div className="error-message">{passwordError}</div>}
              {passwordSuccess && <div className="success-message">{passwordSuccess}</div>}
              <div className="modal-actions">
                <button type="button" onClick={validatePasswords} className="btn">Guardar</button>
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setPasswordError('');
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
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
          <div className="form-group">
          {preview && (
            <img
              src={preview}
              className="preview-image"
              alt="Pré-visualização"
              onLoad={() => URL.revokeObjectURL(preview)}
            />
          )}
          </div>
        </div>

        {/* botão de atualizar */}
        <button type="submit" className="submit-button">Atualizar</button>
      </form>
    </div>
    </div>
  );
}

export default Perfil;
