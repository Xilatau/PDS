import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getContactosPorCondominio, eliminarContactoEmergencia } from '../../../api/ApiAddContact';
import { CirclePlus } from 'lucide-react';
import './Style.css';

function Contact() {
  const navigate = useNavigate();
  const [contactos, setContactos] = useState([]);
  const [filtroNome, setFiltroNome] = useState(""); // Estado do filtro por nome
  const condominioID = 1; // Ajusta se necessário

  // Busca contactos ao carregar
  useEffect(() => {
    carregarContactos();
  }, []);

  const carregarContactos = async () => {
    const data = await getContactosPorCondominio(condominioID);
    console.log("Contactos recebidos:", data);
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

  // Filtrar contactos pelo nome
  const contactosFiltrados = contactos.filter((c) =>
    c.nome.toLowerCase().includes(filtroNome.toLowerCase())
  );

  return (
    <main className='dashboard-contact'>
      <div className="Add-Contact">

      <div className='aba'>
        <div className="button-container">
           <button className="my-button" onClick={() => navigate('/AddContacts')}>
           <CirclePlus size={21} />
           Adicionar novo contacto
          </button>
       </div>

     <div className="filtro-container">
      <input
      type="text"
      placeholder="Pesquisar"
      value={filtroNome}
      onChange={(e) => setFiltroNome(e.target.value)}
      className="input-filtro"
             />
        </div>
      </div>
        
        {contactosFiltrados.length === 0 ? (
          <p>Nenhum contacto encontrado.</p>
        ) : (
          contactosFiltrados.map((c) => (
            <div key={c.id} className="contact-item">
              <div className='contact-data'>
                <span className='contact-info'>{c.telemovel} - {c.nome}</span>
                <button className="delet-button" onClick={() => handleDelete(c.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default Contact;
