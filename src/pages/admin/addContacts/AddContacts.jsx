import { User, Paperclip } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contactos.css';

function Contactos() {
  const navigate = useNavigate();

  const [nome, setNome] = useState();
  const [contacto, setContacto] = useState();

  const handleAddContact = () => {
    if (nome.trim() === '' || contacto.trim() === '') {
      alert("Por favor preenche todos os campos.");
      return;
    }
  
    const novoContacto = { nome, contacto };
  
    // Buscar contactos guardados anteriormente
    const contactosGuardados = JSON.parse(localStorage.getItem('contactos')) || [];
  
    // Adicionar novo contacto à lista
    contactosGuardados.push(novoContacto);
  
    // Guardar de volta no localStorage
    localStorage.setItem('contactos', JSON.stringify(contactosGuardados));
  
    // Limpar campos
    setNome("");
    setContacto("");
  
    // Redirecionar para a página de contactos
    navigate('/contact');
  };
  

  return (
    <div className="Add-Contact">
      
        <h1>Contactos</h1>
        <form onSubmit={handleAddContact} className="form-group">
          
          {/* nome */}
          <div className="form-group">
          <label>Nome</label>
            <input
              type="text"
              id="nomeC"
              value={nome}
              onChange={(e) => setNomeC(e.target.value)}
              className="form-input"
            />
          </div>

          {/* contacto */}
          <div className="form-group">
          <label>Contacto</label>
            <input
              type="text"
              id="contactoC"
              value={contacto}
              onChange={(e) => setContacto(e.target.value)}
              className="form-input"
            />
          </div>

          {/* botão de enviar */}
          <button className="Button" type="submit">Adicionar</button>
        </form>
    </div>
  );
}

export default Contactos;
