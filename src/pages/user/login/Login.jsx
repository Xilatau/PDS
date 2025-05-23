import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../Authentication';
import style from './styleL.module.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  // Definindo os estados para armazenar o valor dos inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Efeito para adicionar e remover a classe 'login' ao body
  useEffect(() => {
    document.body.classList.add('login');

    return () => {
      document.body.classList.remove('login');
    }; }, []);

  // Função para lidar com o submit do formulário
  const handleLogin = (e) => {
    e.preventDefault();
    //usa api
    fetch('https://localhost:7061/login/'+username+'/'+password)
      .then(response => {
        if (!response.ok) throw new Error("Erro na API");
        return response.json();
      })
      .then(data => {
        console.log("Dados recebidos:", data);
        if(data.user==null){
          setError(true);
          return;
        }
        login(data.user);
        localStorage.setItem('userId', JSON.stringify(data.idUser));
        localStorage.setItem('admin', JSON.stringify(data.admin));
        if(data.admin){
          console.log("admin");
          navigate('/dashboardAdmin'); // Redireciona para a página de dashboard após o login bem-sucedido
        }else{
          console.log("user");
          navigate('/dashboard'); // Redireciona para a página de dashboard após o login bem-sucedido
        }
      })
      .catch(error => {
        console.error("Erro ao conectar com a API:", error);
      });
  };

  return (
    <div className={style.pagelogin}>
      <div className={style.header}>
        <h1>CondoConnect</h1>
      </div>
      <div className={style.login}>

        <div className={style.loginboxtext}>
          <h2>Login</h2>
          <p className={style.loginp}>Faça parte da nossa Comunidade!</p>
        </div>
        
        <form className={style.form} onSubmit={handleLogin}>
          <input
            type="text"
            id="username"
            placeholder="Utilizador"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Atualiza o estado com o valor do input
            required
          />
          <br />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado com o valor do input
            required
          />
          {error && <p className={style.error}>*Credenciais inválidas*</p>}
          <button className={style.button} type="submit" disabled={!password || !username}>
            Entrar
          </button>
          <p>
            Esqueceu-se da password?
            <span>
              <Link to="/reset-password">Clique aqui</Link>
            </span>
          </p>
        </form>
      </div>
      <div className={style.footer}>
        <hr />
        <p>&copy; 2025 CondoConnect. All rights reserved.</p>
        <p>IPCA - LESI - PDS</p>
      </div>
    </div>
  );
}