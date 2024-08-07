import { useEffect, useState } from 'react';

function useFetch(url: string | null) {
  const [data, setData] = useState<null | any>(null);

  useEffect(() => {
    if (url) {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          setData(data);
        })
        .catch(err => setData({ error: err }));
    }
  }, [url]);

  return data;
}

export default useFetch;
