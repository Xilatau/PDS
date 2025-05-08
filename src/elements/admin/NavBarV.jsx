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
                <li><Link to="/dashboardAdmin">Dashboard</Link></li>
                <li><Link to="/createClient">Criar Cliente</Link></li>
                <li><Link to="/improvement-incidencesAdmin">Improvement/Incidences</Link></li>
                <li><Link to="/ContactsAdmin">Contactos</Link></li>
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
