import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getContactosPorCondominio } from '../../../api/ApiAddContact'; // ajusta o caminho conforme necessário
import './Style.css';

function Contact() {
  const navigate = useNavigate();
  const [contactos, setContactos] = useState([]);
  const condominioID = 1; // substitui pelo ID real

  useEffect(() => {
    getContactosPorCondominio(condominioID)
      .then(setContactos)
      .catch((err) => {
        console.error('Erro ao obter contactos:', err);
        alert('Erro ao carregar contactos da API.');
      });
  }, []);

  return (
    <div className="contact-container">
      {contactos.length === 0 ? (
        <p>Nenhum contacto adicionado.</p>
      ) : (
        contactos.map((c, index) => (
          <div key={index} className="contact-item">
            <p>{c.telemovel} - {c.nome}</p>
          </div>
        ))
      )}
    </div>
  );
}
export default Contact;
