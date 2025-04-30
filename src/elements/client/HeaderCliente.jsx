import {useAuth} from '../../Authentication';
import { useNavigate, Link } from 'react-router-dom';
import '../../Style.css';

function HeaderClient(){
    const {username, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
      }

    return(
        <div className="headerClient">
            <nav>
                <ul>
                    <li className="user"><strong>Utilizador: {username}</strong></li>
                    <li className="links">
                        <ul>
                            <li><Link to="/dashboardClient">Dashboard</Link></li>
                            <li><Link to="/pedidos">Incidencias/Melhorias</Link></li>
                            <li><Link to="/perfil">Perfil</Link></li>
                            <li><Link to="/contactos">Contactos</Link></li>
                        </ul>
                    </li>
                    <li className="logout"> <button className="logout-btn" onClick={handleLogout}>Logout</button></li>
                </ul>
            </nav>
        </div>  
    );
}
export default HeaderClient;