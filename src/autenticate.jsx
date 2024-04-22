import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  user: null,
  error: null,
  token: null,
});

export function AuthProvider({ children }) {
  const [user, setUsuario] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [error, setError] = useState(null);
  const [token, setToken] = useState(() => {
    const storedToken = sessionStorage.getItem('token');
    return storedToken ? storedToken : null;
  });


  // Verificar si hay una sesión activa al cargar la aplicación
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);


  const login = async (doc, password) => {
    try {
      //http://localhost/api_sisinov/public/api/login
      const response = await fetch("http://localhost/api_sisinov/public/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "passw": password, "documento": doc }),
      });
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.error === false) {
          setUsuario(responseData.user);
          localStorage.setItem('user', JSON.stringify(responseData.user));
          sessionStorage.setItem('token', responseData.token);
          setToken(responseData.token);
        } else {
          setError("Credenciales inválidas, inténtelo nuevamente");
        }
      } else {
        setError("Credenciales inválidas, inténtelo nuevamente");
      }
    } catch (error) {
      setError("Credenciales inválidas, inténtelo nuevamente");
    }
  };

  const logout = () => {
    // Realiza la lógica de cierre de sesión actualizando el estado del usuario.
    setUsuario(null);

    // Borra la información de autenticación del localStorage al cerrar sesión
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
