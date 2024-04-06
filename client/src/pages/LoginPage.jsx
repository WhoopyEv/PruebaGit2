import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import {Link, useNavigate} from 'react-router-dom'
import { useEffect } from "react";

function LoginPage() {
  // Nos ayuda almacenar los datos del formulario en un estado
  // Este handleSubmit es parte de react hook form
  // El formState es para mostrar los errores en el form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Se nombra errors con otro nombre por formState que ya lo usa
  const { signin, errors: signinErrors, isAuthenicated} = useAuth();
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  // Verificar si esta logeado para enviarlo a tareas
  useEffect(()=>{
    if (isAuthenicated) navigate("/tasks")
  },[isAuthenicated])

  return (
    // Se centra vertical y horizontalmente
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {
          // Error de usuario ya existe por medio del estado
          signinErrors.map((error, i) => (
            <div key={i} className="bg-red-500 p-2 text-white text-center">
              {error}
            </div>
          ))
        }

        <h1 className="text-3xl font-bold my-2">Login</h1>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {
            /*Se muestra los errores del form*/
            errors.email && <p className="text-red-500">Email is required</p>
          }
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {
            /*Se muestra los errores del form*/
            errors.password && (
              <p className="text-red-500">Password is required</p>
            )
          }
          <button className="bg-sky-500 text-white px-4 py-2 rounded-md my-2" type="submit">Login</button>
        </form>
          {/* El between es para que se separe de los lados*/}
        <p className="flex gap-x-2 justify-between">
          Don't have an account? <Link className="text-sky-500" to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
