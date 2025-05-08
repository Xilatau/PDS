import { User, Paperclip } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StyleC.css';

function Contactos() {
  const navigate = useNavigate();
  const [nomeC, setNomeC] = useState();
  const [contactoC, setContactoC] = useState();
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (Object.values(errors).some(error => error)) {
      return;
    }
  
    const novoContacto = {
      nome: nomeC,
      contacto: contactoC,
    };
  
    // Buscar contactos existentes
    const contactosExistentes = JSON.parse(localStorage.getItem('contactos')) || [];
  
    // Adicionar novo
    const contactosAtualizados = [...contactosExistentes, novoContacto];
  
    // Guardar no localStorage
    localStorage.setItem('contactos', JSON.stringify(contactosAtualizados));
  
    // Redirecionar para página de contactos
    navigate('/contactsAdmin');
  };
  

  return (
    <div className="Add-Contact">
      
        <h1>Contactos</h1>
        <form onSubmit={handleSubmit} className="form-group">
          
          {/* nome */}
          <div className="form-group">
          <label>Nome</label>
            <input
              type="text"
              id="nomeC"
              value={nomeC}
              className="form-input"
              onChange={(e) => setNomeC(e.target.value)}
            />
          </div>

          {/* contacto */}
          <div className="form-group">
          <label>Contacto</label>
            <input
              type="number"
              id="contactoC"
              value={contactoC}
              className="form-input"
              onChange={(e) => {
                const value = e.target.value;
                if (value.length > 9) {
                  setErrors(prev => ({ ...prev, contactoC: 'O contacto não pode ter mais de 9 dígitos' }));
                } else if (value.length <3) {
                  setErrors(prev => ({ ...prev, contactoC: 'O contacto não pode ter menos de 3 dígitos' }));
                }else{
                  setErrors(prev => ({ ...prev, contactoC: '' }));
                }
                setContactoC(value);
              }}
            />
            {errors.contactoC && <div className="error-message">{errors.contactoC}</div>}
          </div>

          {/* botão de enviar */}
          <button type="submit" className="Button" >Adicionar</button>
        </form>
    </div>
  );
}

export default Contactos; 
