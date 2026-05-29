import { useEffect, useState } from "react";
import api from "./api-instance";

interface UseApiQueryResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
}

export function useApiQuery<T>(url: string, deps: unknown[] = []): UseApiQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);

    api.get<T>(url)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, deps);

  return { data, loading, error, refresh: fetchData };
}
