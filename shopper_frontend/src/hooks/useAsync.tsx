import { useState, useEffect } from "react";

type AsyncHandler<T, Args extends unknown[] = []> = (
  ...args: Args
) => Promise<T>;

interface UseAsyncReturn<T, Args extends unknown[]> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  act: (...args: Args) => Promise<T>;
}

export default function useAsync<T, Args extends unknown[] = []>(
  handler: AsyncHandler<T, Args>,
  start: boolean = true
): UseAsyncReturn<T, Args> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(start);
  const [error, setError] = useState<Error | null>(null);

  const act = async (...args: Args): Promise<T> => {
    setLoading(true);
    setError(null);

    try {
      const result = await handler(...args);
      setData(result);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      throw err;
    }
  };

  useEffect(() => {
    if (start) {
      act(...([] as unknown as Args));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    loading,
    error,
    act,
  };
}
