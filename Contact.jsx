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
              </div>
            ))
            
          )}
        </div>
    </main>
  );
}

export default Contact;