import { useCallback, useEffect, useState } from 'react';

async function sendRequest(initialValue, url, config) {
  console.log(url, config, initialValue)
  try {
    const response = await fetch(url, config);
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(
        resData.message || 'Something went wrong, failed to send request.'
      );
    }
    return resData;
  } catch (error) {
    if (error.name !== 'AbortError') {
      throw error;
    }
    return initialValue;
  }
}

export default function useHttp(initialValue, url, config = {}) {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const executeRequest = useCallback(
    async function (bodyData, abortController) {
      setIsLoading(true);
      setError('');
      try {
        const requestConfig = { ...config };
        if (abortController) {
          requestConfig.signal = abortController.signal;
        }
        if (bodyData) {
          requestConfig.body = bodyData;
        }
        const data = await sendRequest(initialValue, url, requestConfig);
        setData(data);
        setError('');
        setIsLoading(false);
        return true;
      } catch (error) {
        setError(error.message || 'An Error Occured');
        setIsLoading(false);
        return false;
      }
    },
    [sendRequest]
  );

  useEffect(() => {
    const abortController = new AbortController();

    if (!config.method || config.method === 'GET') {
      executeRequest(undefined, abortController);
    }

    return () => {
      if (!config.method || config.method === 'GET') {
        abortController.abort();
      }
    };
  }, [executeRequest]);

  return {
    data,
    isLoading,
    error,
    executeRequest,
  };
}
