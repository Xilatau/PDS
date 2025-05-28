import { getClient } from '../api/ApiClient.jsx';

export async function fetchUserProfile(userId) {
  try {
    const userData = await getClient(userId);
    return userData;
  } catch (error) {
    console.error('Erro ao conectar com a API:', error);
    throw error;
  }
}

export async function updateProfile(userId, { nomeP, teleP, stringIMG }) {
    const payload = {
      id: userId,
      nome: nomeP,
      telemovel: teleP,
      foto: stringIMG
    };

    console.log(payload);
  
    try {
      const response = await fetch('https://localhost:7061/user/editar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Erro na API ao atualizar perfil');
      }
      const text = await response.text();
      return text ? JSON.parse(text) : {};
    } catch (error) {
      console.error('Erro ao conectar com a API:', error);
      throw error;
    }
  }

  export async function ValidatePassword(userId, currentPassword) {
    try {
      const res = await fetch(`https://localhost:7061/user/verifica/password/${userId}/${currentPassword}`, {
        method: "GET"
      });
      if (!res.ok) throw new Error("Erro na API ao verificar password");
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("API ValidatePassword erro:", err);
      return false;
    }
  }

  export async function ChangePassword(userId, newPassword) {
    try {
      const res = await fetch(`https://localhost:7061/user/altera/password/${userId}/${newPassword}`, {
        method: "POST"
      });
      if (!res.ok) throw new Error("Erro na API ao alterar password");
      const data = await res;
      console.log(data);
      return data;
    } catch (err) {
      console.error("API ValidatePassword erro:", err);
      return false;
    }
  }
