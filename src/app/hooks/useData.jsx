"use client"
import { useState, useEffect } from 'react';

const API_GET_QUESTION = 'https://script.google.com/macros/s/AKfycby-rHbrFfcND0_jkNApNOk0bAZiTeZMGk6uGPnRdzb1Fv-6bIU_qQYbrT8xWbSTSZOx/exec';

const useData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [datas, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_GET_QUESTION, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const datas = await response.json() ;
        setData(datas);
        console.log(response.json())
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, error, datas};
};

export default useData;
