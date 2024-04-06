import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouter() {
  const { loading , isAuthenicated } = useAuth();

  if (loading) return
  if (loading) return <h1>Loading...</h1>
  // Si no esta logeado se redirige a login y no se puede devolver con replace
  if (!loading && !isAuthenicated) return <Navigate to={"/login"} replace />;

  return (
    // Le esta indicando que siga con el componente
    <Outlet />
  );
}

export default ProtectedRouter;
