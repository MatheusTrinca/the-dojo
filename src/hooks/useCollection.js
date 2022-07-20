import { useState, useEffect, useRef } from 'react';
import { db } from '../config/firebase';
import {
  onSnapshot,
  collection,
  where,
  query,
  orderBy,
} from 'firebase/firestore';

export const useCollection = (c, _q, _o) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const q = useRef(_q).current;
  const o = useRef(_o).current;

  useEffect(() => {
    setError(null);
    let collectionRef = collection(db, c);

    if (q && o) {
      collectionRef = query(collectionRef, where(...q), orderBy(...o));
    }

    const unsub = onSnapshot(
      collectionRef,
      querySnapshot => {
        const transactions = [];
        querySnapshot.forEach(doc =>
          transactions.push({
            id: doc.id,
            ...doc.data(),
          })
        );
        setDocuments(transactions);
        setError(null);
      },
      error => {
        console.log(error);
        setError('Could not fetch data');
      }
    );
    return () => unsub();
  }, [c, q, o]);

  return { documents, error };
};
