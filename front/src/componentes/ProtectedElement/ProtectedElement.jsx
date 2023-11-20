import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';

// Usuario debe ser entrenador o ser presidente para acceder al elemento protegido.
const ProtectedElement = ({mustBeEntrenador,mustBePresidente, children }) => {

    // Se obtiene el contexto del usuario, que contiene tres funciones: isLoggedIn, esEntrenador y esPresidente
    const { isLoggedIn, esEntrenador, esPresidente } = useContext(UserContext);
    // Verifica si el usuario no está autenticado o no cumple con los requisitos de tipo de usuario
    if (!isLoggedIn() || (mustBeEntrenador && !esEntrenador())) {
        return <></>;
    }

    if (!isLoggedIn() || (mustBePresidente && !esPresidente())) {
        return <></>;
    }
    // Muestra los elementos hijos si el usuario tiene los permisos necesarios
    return children;
};
export { ProtectedElement };