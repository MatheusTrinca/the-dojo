import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useReducer, createContext, useContext, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'SIGNUP':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { authIsReady: false, user: null };
    case 'AUTH_IS_READY':
      return { authIsReady: true, user: action.payload };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        dispatch({ type: 'AUTH_IS_READY', payload: user });
      }
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
};

export default AuthProvider;
