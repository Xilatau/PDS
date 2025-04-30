import { User, CirclePlus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';

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
      <div className="first">
        <h1 className="first-h">Contactos</h1>
        <p className="first-p">
          Inicio&emsp;Reportar incidencias&emsp;Contactos de emergência&emsp;Reuniões
          <User />
        </p>
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
          <button className="my-button" onClick={() => navigate('/')}>
            <CirclePlus size={21} />
            Adicionar novo contacto
          </button>
        </div>
      </div>
    </main>
  );
}

export default Contact;
