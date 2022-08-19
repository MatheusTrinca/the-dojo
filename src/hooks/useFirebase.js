import { useState, useReducer, useEffect } from 'react';
import { db } from '../config/firebase';
import {
  addDoc,
  collection,
  Timestamp,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';

const firebaseReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        document: null,
        isPending: true,
        error: null,
        success: false,
      };
    case 'ERROR':
      return {
        ducument: null,
        isPending: false,
        error: action.payload,
        success: false,
      };
    case 'ADD_DOCUMENT':
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    case 'DELETE_DOCUMENT':
      return {
        document: null,
        isPending: false,
        error: null,
        success: true,
      };
    case 'UPDATED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    default:
      return state;
  }
};

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

export const useFirebase = c => {
  const [response, dispatch] = useReducer(firebaseReducer, initialState);
  const [cancelled, setCancelled] = useState(false);

  const dispatchIfNotCancelled = action => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const collectionRef = collection(db, c);

  // Add
  const addDocument = async doc => {
    dispatchIfNotCancelled({ type: 'IS_PENDING' });
    try {
      const docRef = await addDoc(collectionRef, {
        ...doc,
        date: Timestamp.fromDate(new Date()),
      });
      if (!docRef) {
        throw new Error('Could not save the transaction');
      }
      dispatchIfNotCancelled({ type: 'ADD_DOCUMENT', payload: docRef });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  // Delete
  const deleteDocument = async id => {
    dispatchIfNotCancelled({ type: 'IS_PENDING' });
    try {
      await deleteDoc(doc(db, c, id));
      dispatchIfNotCancelled({ type: 'DELETE_DOCUMENT' });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  const updateDocument = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const updatedDocument = await updateDoc(doc(db, c, id), { ...updates });
      dispatchIfNotCancelled({
        type: 'UPDATED_DOCUMENT',
        payload: updatedDocument,
      });
      return updatedDocument;
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
      return null;
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { response, addDocument, deleteDocument, updateDocument };
};
