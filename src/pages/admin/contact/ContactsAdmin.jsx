import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getContactosPorCondominio, eliminarContactoEmergencia } from '../../../api/ApiAddContact';
import { CirclePlus } from 'lucide-react';
import './Style.css';

function Contact() {
  const navigate = useNavigate();
  const [contactos, setContactos] = useState([]);
  const condominioID = 1; // Ajusta se necessário

  // Buscar contactos ao carregar
  useEffect(() => {
    carregarContactos();
  }, []);

  const carregarContactos = async () => {
    const data = await getContactosPorCondominio(condominioID);
    console.log("Contactos recebidos:", data); // Debug opcional
    setContactos(data);
  };

  // Eliminar contacto ao clicar no botão
  const handleDelete = async (id) => {
    const sucesso = await eliminarContactoEmergencia(id);
    if (sucesso) {
      setContactos(prev => prev.filter(c => c.id !== id));
    } else {
      alert("Erro ao eliminar o contacto");
    }
  };

  return (
    <main className='dashboard-contact'>
      <div className="Add-Contact">
        {contactos.length === 0 ? (
          <p>Nenhum contacto adicionado.</p>
        ) : (
          contactos.map((c) => (
            <div key={c.id} className="contact-item">
              <p>{c.telemovel} - {c.nome}</p>
              <button className="delete-button" onClick={() => handleDelete(c.id)}>
                Eliminar
              </button>
            </div>
          ))
        )}

        {/* Botão para adicionar novo contacto */}
        <button className="my-button" onClick={() => navigate('/AddContacts')}>
          <CirclePlus size={21} />
          Adicionar novo contacto
        </button>
      </div>
    </main>
  );
}

export default Contact;
