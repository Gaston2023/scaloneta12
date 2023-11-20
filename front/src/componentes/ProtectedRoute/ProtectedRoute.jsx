import { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { UserContext } from '../UserContext/UserContext';


// Componente para rutas protegidas según el rol de entrenador
const ProtectedRoute = ({ mustBeEntrenador, children }) => {
    // funciones y datos del contexto de usuario
    const { isLoggedIn, esEntrenador } = useContext(UserContext);

    // Verifica la autenticación y el rol de entrenador
    if (!isLoggedIn() || (mustBeEntrenador && !esEntrenador())) {
        // Redirigir a la página de inicio si no está autenticado o no es entrenador
        return <Navigate to="/" replace />;
    }

    // Renderiza los componentes hijos si cumple con los requisitos
    return children;
};

export { ProtectedRoute };