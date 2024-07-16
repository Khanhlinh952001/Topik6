import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { database } from '@/firebase'; // Thay thế bằng cấu hình Firebase của bạn

const useFirebaseData = (path) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
  
      const dataRef = ref(database, '/vocabulary');

      setLoading(true);
      setError(null);

      onValue(dataRef, (snapshot) => {
        const responseData = snapshot.val();
        setData(responseData);
        setLoading(false);
      }, (error) => {
        setError(error.message);
        setLoading(false);
      });
    };

    fetchData();
  }, [path]);

  return { loading, error, data };
};

export default useFirebaseData;
