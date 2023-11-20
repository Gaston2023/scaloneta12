import { createContext, useState } from 'react';

// Definición del contexto de usuario
const UserContext = createContext({
    userData:false
});
// Proveedor de contexto de usuario
const UserProvider = ({ children }) => {
    // Estado para los datos del usuario logueado
    const [userData, setUserData] = useState(null);
    // Funciones de verificación de autenticación y tipo de usuario
    const isLoggedIn = () => {
        return (userData != null && userData.user != null);
    }
    
    const esEntrenador = () => {        
        return (userData != null && userData.user.tipoUsuario === 1);
    }

    const esPresidente = () => {        
        return (userData != null && userData.user.tipoUsuario === 0);
    }

    // Provee el contexto y las funciones a los componentes hijos
    return (
        <UserContext.Provider value={{ userData, setUserData, isLoggedIn, esEntrenador, esPresidente }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };