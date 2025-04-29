import {useAuth} from '../../Authentication';
import '../../Style.css';""

function HeaderAdmin(){
    const {username} = useAuth(); // Importa o nome de utilizador do contexto de autenticação

    return(
        <header>
            <p><strong>Admin:</strong> {username} </p>
        </header>
    );
}
export default HeaderAdmin;