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

export async function updateProfile(userId, { nome, nif, nPorta, stringIMG }) {
    const payload = {
      userId,
      nome,
      nif,
      nPorta,
      stringIMG
    };
  
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
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao conectar com a API:', error);
      throw error;
    }
  }
