import { useForm } from "react-hook-form";
import { useTask } from "../context/TaskContex";
// Se emplea useParams para obtener los datos dinamicos de la URL
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

// Nos permite cambiar el formato de una fecha
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TasksFormPage() {
  // El setValue permite establecer valores en el form
  const { register, handleSubmit, setValue } = useForm();

  const { createTask, getOneTask, updateTask } = useTask();

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      async function loadTask() {
        const task = await getOneTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs(task.date).utc().format("YYYY-MM-DD"))
      }
      loadTask();
    }
  }, []);

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    const dataValid = {
      // Los tres puntos significa que se esta asignando el mismo valor
      ...data,
      // Se va a verificar que se ha colocado una fecha y se cambia el formato
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };
    console.log(dataValid)

    if (params.id) {
      updateTask(params.id, dataValid);
    } else {
      createTask(dataValid);
    }
    navigate("/tasks");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title</label>
          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            type="text"
            placeholder="Title"
            {...register("title")}
            // Apenas cargue la pagina se seleccione este
            autoFocus
          />
          <label htmlFor="description">Description</label>
          <textarea
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            rows="3"
            placeholder="Description"
            {...register("description")}
          ></textarea>

          <label htmlFor="date">Date </label>
          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            type="date"
            {...register("date")}
          />

          <button className="bg-indigo-500 px-3 py-2 rounded-md">Save</button>
        </form>
      </div>
    </div>
  );
}

export default TasksFormPage;
