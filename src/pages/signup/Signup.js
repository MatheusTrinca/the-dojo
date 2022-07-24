import './Signup.css';
import { useAuth } from '../../hooks/useAuth';

import { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const { signup, error, pending } = useAuth();

  const handleSubmit = e => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  const handleFileInput = e => {
    setThumbnail(null);
    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError('Please select a file');
      return;
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Please select an image');
      return;
    }
    if (selected.size > 100000) {
      setThumbnailError('Image size exceded');
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign Up</h2>
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
      <label>
        <span>Name:</span>
        <input
          type="text"
          required
          onChange={e => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Profile thumbnail:</span>
        <input type="file" required onChange={handleFileInput} />
      </label>
      {thumbnailError && <div className="error">{thumbnailError}</div>}
      <button className="btn" disabled={pending}>
        Sign Up
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
