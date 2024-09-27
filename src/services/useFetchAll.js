import { useEffect, useRef, useState } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetchAll(urls) {
  const prevUrls = useRef([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (areEqual(urls, prevUrls.current)) {
      setLoading(false);
      return;
    }

    const promises = urls.map((url) =>
      fetch(baseUrl + url).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
    );

    Promise.all(promises)
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [urls]);

  return { data, error, loading };
}

function areEqual(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index])
  );
}
