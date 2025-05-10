import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createContacto } from '../../../api/ApiAddContact'; 
import './StyleC.css';

function Contactos() {
  const navigate = useNavigate();
  const [nomeC, setNomeC] = useState('');
  const [contactoC, setContactoC] = useState('');
  const [errors, setErrors] = useState({});
  const condominioID = 1; // ou buscar do localStorage, login, etc.

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).some(error => error)) return;

    try {
      await createContacto({
        nome: nomeC,
        telemovel: Number(contactoC),
        condominioID
      });
    } catch (err) {
      console.error("Erro ao conectar com a API:", err);
      alert("Erro ao adicionar o contacto.");
    }
     navigate('/contactsAdmin');
  };

  return (
    <main className='dashboard-contact'>
      <div className="Add-Contact">
        <h1>Contactos</h1>
        <form onSubmit={handleSubmit} className="form-group">

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
                } else if (value.length < 3) {
                  setErrors(prev => ({ ...prev, contactoC: 'O contacto não pode ter menos de 3 dígitos' }));
                } else {
                  setErrors(prev => ({ ...prev, contactoC: '' }));
                }
                setContactoC(value);
              }}
            />
            {errors.contactoC && <div className="error-message">{errors.contactoC}</div>}
          </div>

          <button type="submit" className="Button">Adicionar</button>
        </form>
      </div>
    </main>
  );
}

export default Contactos;
