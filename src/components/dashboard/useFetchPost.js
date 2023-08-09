import { useEffect, useState } from "react";

export const UsePost = (url, data) => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST,OPTIONS',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setResponse('Error al crear el usuario');
        } else {
          setResponse('Usuario creado correctamente');
        }
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      });
  }, [url, data]);

  return {
    loading,
    response,
    error,
  };
};
