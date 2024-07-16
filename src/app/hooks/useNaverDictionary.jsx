import { useState } from 'react';

const useDictionary = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchDictionary = (query, display = 10) => {
    setLoading(true);
    setError(null);
    setData(null);

    const clientId = 'YOUR_CLIENT_ID'; // Thay YOUR_CLIENT_ID và YOUR_CLIENT_SECRET bằng thông tin của bạn
    const clientSecret = 'YOUR_CLIENT_SECRET';

    fetch(`https://openapi.naver.com/v1/search/encyc.json?query=${encodeURIComponent(query)}&display=${display}&sort=sim`, {
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.items && data.items.length > 0) {
          setData(data.items); // Lưu ý rằng đây là ví dụ, bạn cần kiểm tra cụ thể cấu trúc dữ liệu trả về từ API
        } else {
          setData([]); // Xử lý khi không có kết quả
        }
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  return { loading, error, data, fetchDictionary };
};

export default useDictionary;
