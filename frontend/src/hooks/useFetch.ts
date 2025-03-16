// React
import { useEffect, useState } from 'react';

// Errors
import { FetchError } from '../errors/FetchError';

type Options = {
  [key: string]: any;
};
type FetchFunction = (options?: Options) => Promise<any>;

type State = {
  data: any;
  error: FetchError | null;
  isLoading: boolean;
};

export function useFetch(fetchFunction: FetchFunction, options?: Options) {
  const initialState: State = {
    data: null,
    error: null,
    isLoading: false,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const fetchData = async () => {
      setState({
        data: null,
        error: null,
        isLoading: true,
      });
      try {
        const data = await fetchFunction(options);
        setState({
          data,
          error: null,
          isLoading: false,
        });
      } catch (e: unknown) {
        const error =
          e instanceof Error
            ? new FetchError(
              500,
              e.message,
              'An error occurred while fetching data',
            )
            : new FetchError(
              500,
              'Unknown error',
              'An error occurred while fetching data',
            );
        setState({
          data: null,
          error,
          isLoading: false,
        });
      }
    };

    void fetchData();
  }, [fetchFunction, options]);

  return state;
}
