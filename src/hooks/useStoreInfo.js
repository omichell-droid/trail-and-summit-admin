import { useState, useEffect } from "react";

const STORE_INFO_URL = "http://localhost:3001/store_info";

export function useStoreInfo() {
  const [storeInfo, setStoreInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStoreInfo() {
      try {
        const response = await fetch(STORE_INFO_URL);
        const data = await response.json();
        setStoreInfo(data[0]);
      } catch (err) {
        console.error("Could not load store info", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStoreInfo();
  }, []);

  return { storeInfo, isLoading };
}