import { useState, useEffect } from "react";

import harmonizeData from "../harmonizeData";

/**
 * @typedef {object} fetchStatus
 * @property {(object|null)} data
 * @property {boolean} isLoading
 * @property {(object|null)} error
 */

/**
 * Fetches ressource
 *
 * @param {string} url - the url of the ressource to be fetched
 * @param {string} [harmonize] - optional data harmonization type
 * @returns {fetchStatus}
 */
export default function useFetch(url, harmonize) {
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
        setData(harmonizeData(resData.data, harmonize));
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url, harmonize]);

  return { data, isLoading, error };
}
