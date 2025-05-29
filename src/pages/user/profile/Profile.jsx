import React, { useState, useEffect } from 'react';
import './styleP.css';
import { useNavigate } from 'react-router-dom';
import { updateProfile, ValidatePassword, ChangePassword } from '../../../api/ApiPerfil.jsx';
import { getClient } from '../../../api/ApiClient.jsx';

function Perfil() {
  const [nomeP, setNomeP] = useState('');
  const [stringIMG, setStringIMG] = useState('');
  const [teleP, setTeleP] = useState('');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      getClient(userId)
        .then(data => {
          setNomeP(data.nome);
          setTeleP(data.telemovel);
          setStringIMG(data.foto);
        })
        .catch(error => console.error('Failed to load user profile:', error));
    }
  }, []);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    if (preview) URL.revokeObjectURL(preview);
    const url = URL.createObjectURL(selectedFile);
    setPreview(url);
    const reader = new FileReader();
    reader.onloadend = () => {
      setStringIMG(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const validatePasswords = async () => {
    const passwordValid = async () => {
          try {
            const data = await ValidatePassword(localStorage.getItem('userId'), passwordData.currentPassword);
            return data;
          } catch (err) {
            console.error("Erro ao verificar password:", err);
            return false;
          }
        };

    const isPasswordValid = await passwordValid();

    if (!isPasswordValid) {
      setPasswordError('Palavra-passe atual inválida');
      cleanPassword();
      return false;
    }else{
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setPasswordError('As palavras-passe não coincidem');
        cleanPassword();
        return false;
      }
      if (passwordData.newPassword.length < 6) {
        setPasswordError('A nova palavra-passe deve ter pelo menos 6 caracteres');
        cleanPassword();
        return false;
      }
      changePassword();
      cleanPassword();
      setPasswordError('');
      return true;
    }
  };

  const changePassword = async () => {
    try {
      const data = await ChangePassword(localStorage.getItem('userId'), passwordData.newPassword);
      alert("Palavra-passe alterada com sucesso!");
    } catch (err) {
      console.error("Erro ao alterar password:", err);
    }
  };

  const cleanPassword = () => {
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setIsChangingPassword(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!(await validatePasswords())) return;

    try {
      await updateProfile(localStorage.getItem('userId'), {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setPasswordSuccess('Palavra-passe alterada com sucesso!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsChangingPassword(false);
      setTimeout(() => setPasswordSuccess(''), 3000);
    } catch {
      setPasswordError('Erro ao atualizar a palavra-passe. Verifique a palavra-passe atual.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(localStorage.getItem('userId'), {
        nomeP,
        teleP,
        stringIMG
      });
      alert('Perfil atualizado com sucesso!');
      navigate('/dashboardAdmin');
    } catch {
      console.error('Erro ao atualizar o perfil.');
    }
  };

  return (
    <div className="dashboard">
      <div className="perfil-container">
        <h1>Perfil Condómino</h1>
        
        <div className="avatar-section">
          <img
            src={preview || stringIMG || 'https://via.placeholder.com/150'}
            alt="Imagem de Perfil"
            className="avatar-image"
          />
          <label htmlFor="profile-image" className="avatar-button">
            Alterar Imagem
          </label>
          <input
            type="file"
            id="profile-image"
            accept="image/*"
            onChange={handleImageChange}
            className="avatar-input"
          />
        </div>
        <form onSubmit={handleSubmit} className="perfil-form">
          <div className="form-group">
            <label>Nome</label>
            <input type="text" value={nomeP} className="form-input" onChange={(e) => setNomeP(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Contacto</label>
            <input type="text" value={teleP} className="form-input" onChange={(e) => setTeleP(e.target.value)} />
          </div>

          <div className="form-group password-label-row">
            {!isChangingPassword ? (
              <button type="button" className="change-password-btn" onClick={() => setIsChangingPassword(true)}>
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
                  <button type="button" onClick={validatePasswords}>Guardar</button>
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

          <button type="submit" className="submit-button-profile">Atualizar</button>
        </form>
      </div>
    </div>
  );
}

export default Perfil;