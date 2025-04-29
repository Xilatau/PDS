import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../Authentication';
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

    // Lógica simples de validação de credenciais
    if (username === 'admin' && password === '123') {
      login(username);
      navigate('/dashboardClient'); // Redireciona para a página de dashboard após o login bem-sucedido
    } else {
      setError(true);

      // Limpa os campos de input
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className={style.pagelogin}>
      <div className={style.header}>
        <h1>CondoConnect</h1>
      </div>
      <div className={style.login}>
        <h2>Login</h2>
        <p>Faça parte da nossa Comunidade!</p>

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