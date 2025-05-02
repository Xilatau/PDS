import { User, CirclePlus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css';

function Contact() {
  const navigate = useNavigate();
  const [contactos, setContactos] = useState([]);

  useEffect(() => {
    const contactosGuardados = JSON.parse(localStorage.getItem('contactos')) || [];
    setContactos(contactosGuardados);
  }, []);

  const eliminarContacto = (indexParaEliminar) => {
    const novosContactos = contactos.filter((_, i) => i !== indexParaEliminar);
    setContactos(novosContactos);
    localStorage.setItem('contactos', JSON.stringify(novosContactos));
  };
  
  return (
    <main>
        <div className="white-space"></div>
        <div className="Add-Contact">
          {/* Contactos adicionados */}
          {contactos.length === 0 ? (
            <p>Nenhum contacto adicionado.</p>
          ) : (
            contactos.map((c, index) => (
              <div key={index} className="contact-item">
                <p>{c.contacto} - {c.nome}</p>
                <button className="delete-button" onClick={() => eliminarContacto(index)}>
                  Eliminar
                </button>
              </div>
            ))
            
          )}

          {/* Botão para adicionar novo */}
          <button className="my-button" onClick={() => navigate('/AddContacts')}>
            <CirclePlus size={21} />
            Adicionar novo contacto
          </button>
        </div>
    </main>
  );
}

export default Contact;