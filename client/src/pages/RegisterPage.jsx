import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
// Para redireccionar
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  // Nos ayuda almacenar los datos del formulario en un estado
  // Este handleSubmit es parte de react hook form
  // El formState es para mostrar los errores en el form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Recibir los valores del Contexto
  // En errors se llama de otra manera para no causar conflicto con el errors de formState
  const { signup, isAuthenicated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  // Con el fin de redireccionar una vez se autentifique
  useEffect(() => {
    if (isAuthenicated) {
      navigate("/tasks");
    }
  }, [isAuthenicated]);


  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        <h1 className="text-white font-bold text-3xl my-2">Register</h1>
        {
          // Error de usuario ya existe por medio del estado
          registerErrors.map((error, i) => (
            <div key={i} className="bg-red-500 p-2 text-white">
              {error}
            </div>
          ))
        }
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Username"
          />
          {
            /*Se muestra los errores del form*/
            errors.username && (
              <p className="text-red-500">Username is required</p>
            )
          }
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
          <button className="bg-sky-500 text-white px-4 py-2 rounded-md my-2" type="submit">Register</button>
        </form>
        {/* El between es para que se separe de los lados*/}
        <p className="flex gap-x-2 justify-between">
          Alredy have an account?{" "}
          <Link className="text-sky-500" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
