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

export async function updateProfile(userId, { nomeP, nifP, portaP, stringIMG }) {
    const payload = {
      id: userId,
      nome: nomeP,
      nif: nifP,
      nPorta: portaP,
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
