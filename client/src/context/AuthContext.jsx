import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequet } from "../api/auth";
// Leer cookies desde el front lane
import Cookies from "js-cookie";

export const AuthContext = createContext();

// Nos lleva los datos de este contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Vericar si esta autenticado y se crea un estado para pasarlo
  const [isAuthenicated, setIsAuthenicated] = useState(false);
  // Estado que guardara los errores
  const [errors, setErrors] = useState([]);
  // Crear dato de carga, ver si esta cargando
  const [loading, setLoading] = useState(true);

  // Se va a asignar el usuario registrado
  const signup = async (user) => {
    try {
      // Se manda los valores a Axios o auth para así llegue al back lane
      const res = await registerRequest(user);
      console.log(res.data);
      // Asigna el user con la función del estado
      setUser(res.data);
      setIsAuthenicated(true);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      // Se manda los valores a Axios o auth para así llegue al back lane
      const res = await loginRequest(user);
      console.log(res.data);
      setIsAuthenicated(true);
      setUser(res.data);
    } catch (error) {
      console.log(error.response);
      // En este caso llegara un objeto, donde lo pasaremos a un arreglo
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      // En el objeto buscamos el arreglo, si acaso mirar controllers en auth
      setErrors([error.response.data.message]);
    }
  };

  // Cerrar sesión
  const logout = () => {
    Cookies.remove("token");
    setIsAuthenicated(false);
    setUser(null);
  };

  // Se va a controlar que se elimine el error una vez ya fue mostrado
  useEffect(() => {
    if (errors.length > 0) {
      // Se recomienda guardar siempre un setTimeout en un valor para controlar el gasto de recursos
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      // Se elimina la función setTimeout
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // Se va a verificar que cuando se cargue la pagina este generado el token de autentificación
  useEffect(() => {
    async function checkLogin() {
      // Lectura de la cookie
      const cookies = Cookies.get();
      // Comprueba si existe un token
      if (!cookies.token) {
        setIsAuthenicated(false);
        // No esta cargando la pagina
        setLoading(false);
        return setUser(null);
      }
      try {
        // Enviar cookie al back lane para su verificación
        const res = await verifyTokenRequet(cookies.token);
        console.log(res.data.id + "idohewfuidweu")
        // Si no se envia datos desde la back lane
        if (!res.data) {
          setIsAuthenicated(false);
          setLoading(false);
          return;
        }

        setIsAuthenicated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        // Si el token  incorrecto
        setIsAuthenicated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, signin, logout, user, loading, isAuthenicated, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
