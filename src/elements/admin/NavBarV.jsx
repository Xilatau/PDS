import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../Authentication';
import { useNavigate } from 'react-router-dom'; 
import '../../Style.css';

export default function VerticalNavbar() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
                <li><Link to="/Pedidos">Pedidos</Link></li>
                <li><Link to="/Contactos">Contactos</Link></li>
                <li><Link to="/perfil">Perfil</Link></li>
                <li><button className='logout-btn' onClick={handleLogout}>Logout</button></li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </>
  );
}
