import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getContactosPorCondominio } from '../../../api/ApiAddContact';
import { CirclePlus } from 'lucide-react';
import './Style.css';

function Contact() {
  const navigate = useNavigate();
  const [contactos, setContactos] = useState([]);
  const condominioID = 1; 

  useEffect(() => {
    getContactosPorCondominio(condominioID).then(setContactos);
  }, []);

  return (
    <main>
      <div className="Add-Contact">
        {contactos.length === 0 ? (
          <p>Nenhum contacto adicionado.</p>
        ) : (
          contactos.map((c, index) => (
            <div key={index} className="contact-item">
              <p>{c.telemovel} - {c.nome}</p>
            </div>
          ))
        )}
        <button className="my-button" onClick={() => navigate('/AddContacts')}>
          <CirclePlus size={21} />
          Adicionar novo contacto
        </button>
      </div>
    </main>
  );
}

export default Contact;
