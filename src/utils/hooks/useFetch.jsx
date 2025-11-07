import { useState, useEffect } from "react";

import harmonizeUserData from "../harmonizeUserdata";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!url) {
          throw new Error("url manquante");
        }
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(res.status + " " + res.statusText);
        }
        const resData = await res.json();
        setData(harmonizeUserData(resData.data));
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}
