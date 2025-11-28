import { useState, useEffect } from "react";

import harmonizeData from "../harmonizeData";
import getMockedData from "../getMockedData";

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

  const isInMockMode = false;

  useEffect(() => {
    async function fetchData() {
      try {
        if (!url) {
          throw new Error("url manquante");
        }
        let rawData = null;
        if (isInMockMode) {
          rawData = getMockedData(url);
          if (!rawData) {
            throw new Error("can't find matching mocked data for given url");
          }
        } else {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error(res.status + " " + res.statusText);
          }
          const resData = await res.json();
          rawData = resData.data;
        }
        setData(harmonizeData(rawData, harmonize));
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url, harmonize, isInMockMode]);

  return { data, isLoading, error };
}
