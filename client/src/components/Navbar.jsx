import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  // Nos va ayudar si esta logeado para no mostrar el login y el register en el Navbar
  const { isAuthenicated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to={
        isAuthenicated ? "/tasks" : "/"
      }>
        <h1 className="text-2xl font-bold">Tasks Manager</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenicated ? (
          <>
            <li>Welcome {user.username}</li>
            <li>
              <Link className="bg-indigo-500 px-4 py-1 rounded-sm" to={"/add-task"}>Add Task</Link>
            </li>
            <li>
              <Link
                to={"/"}
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="bg-indigo-500 px-4 py-1 rounded-sm" to={"/login"}>Login</Link>
            </li>
            <li>
              <Link className="bg-indigo-500 px-4 py-1 rounded-sm" to={"/register"}>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
