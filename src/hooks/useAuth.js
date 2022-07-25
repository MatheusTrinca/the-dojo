import { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { auth, storage, db } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

export const useAuth = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  const { dispatch, user } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setPending(true);

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCredentials) {
        throw new Error('Could not complete signup');
      }

      // Update Image Profile and Uploading to Storage
      const uploadPath = `thumbnails/${userCredentials.user.uid}/${thumbnail.name}`;
      const imgRef = ref(storage, uploadPath);
      await uploadBytes(imgRef, thumbnail);
      const imgURL = await getDownloadURL(imgRef);

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: imgURL,
      });

      // Create a user document in Firestore
      await setDoc(doc(db, 'users', userCredentials.user.uid), {
        online: true,
        displayName,
        photoURL: imgURL,
      });

      dispatch({ type: 'SIGNUP', payload: auth.currentUser });

      if (!cancelled) {
        setPending(false);
        setError(false);
      }
    } catch (err) {
      if (!cancelled) {
        setError(err.message);
        setPending(false);
      }
    }
  };

  const login = async (email, password) => {
    setPending(true);
    setError(null);
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!userCredentials) {
        throw new Error('Incorrect email or password');
      }

      await updateDoc(doc(db, 'users', userCredentials.user.uid), {
        online: true,
      });
      dispatch({ type: 'LOGIN', payload: userCredentials.user });
      if (!cancelled) {
        setPending(false);
      }
    } catch (err) {
      if (!cancelled) {
        setError(err.message);
        setPending(false);
      }
    }
  };

  const logout = async () => {
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        online: false,
      });

      await signOut(auth);
      dispatch({ type: 'LOGOUT' });
    } catch (err) {
      if (!cancelled) {
        setError(err.message);
        setPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { pending, error, signup, cancelled, login, logout };
};
