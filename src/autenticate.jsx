import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
    user:false,
});

export function AuthProvider({ children }) {
    const [user, setUsuario] = useState(false);

    const login = async (doc, password) => {
        try {
            const response = await fetch("http://localhost/api_proyecto.github.io/api.php?apicall=login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "passw": password, "documento": doc }),
            });

            if (response.ok) {
                const responseData = await response.json();
                if (responseData.error === false) {
                    setUsuario(true);
                } else {
                    console.log("Error en el inicio de sesión");
                }
            } else {
                console.log("Error en la solicitud");
            }
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
        }
    };

    const logout = () => {
        // Realiza la lógica de cierre de sesión aquí y actualiza el estado del usuario.
        setUsuario(false);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
