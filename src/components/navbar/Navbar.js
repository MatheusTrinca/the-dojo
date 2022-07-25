import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import temple from '../../assets/temple.svg';
import { useAuth } from '../../hooks/useAuth';
import { useAuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
  const { logout, pending } = useAuth();
  const { user } = useAuthContext();

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={temple} alt="dojo logo" />
          <span>The Dojo</span>
        </li>
        {!user ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        ) : (
          <li>
            <button className="btn" disabled={pending} onClick={() => logout()}>
              {pending ? 'Logging out' : 'Logout'}
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
