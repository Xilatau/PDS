import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getContactosPorCondominio } from '../../../api/ApiAddContact';
import './Style.css';

function Contact() {
  const navigate = useNavigate();
  const [contactos, setContactos] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const condominioID = 1;

  useEffect(() => {
    getContactosPorCondominio(condominioID)
      .then(setContactos)
      .catch((err) => {
        console.error('Erro ao obter contactos:', err);
        alert('Erro ao carregar contactos da API.');
      });
  }, []);

  const contactosFiltrados = contactos.filter((c) =>
    c.nome.toLowerCase().includes(filtroNome.toLowerCase())
  );

  return (
    <div className="lista-contactos">
      <div className="barra-pesquisa">
        <input
          type="text"
          placeholder="Pesquisar por nome"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
          className="campo-pesquisa"
        />
      </div>

      {contactosFiltrados.length === 0 ? (
        <p>Nenhum contacto encontrado.</p>
      ) : (
        contactosFiltrados.map((c, index) => (
          <div key={index} className="linha-contacto">
            <p>{c.telemovel} - {c.nome}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Contact;
