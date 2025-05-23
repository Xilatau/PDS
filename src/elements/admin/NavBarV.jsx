import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../Authentication';
import { useNavigate } from 'react-router-dom';

export default function VerticalNavbar() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (  
    <>
      <div className={`vertical-navbar ${isOpen ? 'open' : 'closed'}`}>
        <button className="toggle-btn" onClick={toggleNavbar}>
          {isOpen ? '←' : '☰'}
        </button>
        {isOpen && (
          <>
            <h2>CondoConnect</h2>
            <nav>
              <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/createClient">Adicionar Condómino</Link></li>
                <li><Link to="/improvement-incidencesAdmin">Incidências/Melhorias</Link></li>
                 <li><Link to="/pedidosReuniao">Pedidos de Reunião</Link></li>
                <li><Link to="/ContactsAdmin">Contactos de Emergência</Link></li>
                <li><Link to="/profileAdmin">Perfil</Link></li>
                <li><button className='logout-btn' onClick={handleLogout}>Logout</button></li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </>
  );
}
