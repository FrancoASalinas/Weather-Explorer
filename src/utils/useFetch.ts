import { useEffect, useState } from 'react';

function useFetch<T>(url: string | null) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<{ error: string }>();

  useEffect(() => {
    if (url) {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          setData(data);
        })
        .catch(err => setError({ error: err.message }));
    }
  }, [url]);

  return [data, error] as const;
}

export default useFetch;
