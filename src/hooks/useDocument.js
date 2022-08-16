import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { onSnapshot, doc } from 'firebase/firestore';

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, collection, id),
      doc => {
        if (!doc.data()) {
          setError('No documents found');
          return;
        }
        setDocument({ id: doc.id, ...doc.data() });
      },
      error => {
        console.log(error.message);
        setError('Failed to get document');
      }
    );
    return () => unsub();
  }, [collection, id]);

  return { document, error };
};
