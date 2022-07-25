import './Login.css';
import { useAuth } from '../../hooks/useAuth';

import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, error, pending } = useAuth();

  const handleSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Log In</h2>
      <label>
        <span>Email:</span>
        <input
          type="text"
          required
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          required
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <button className="btn" disabled={pending}>
        {!pending ? 'Login' : 'Loging in...'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
