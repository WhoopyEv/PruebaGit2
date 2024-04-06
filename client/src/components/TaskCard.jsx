import { useTask } from "../context/TaskContex";
import { Link } from "react-router-dom";

// Nos permite cambiar el formato de una fecha
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskCard({ task }) {
  // Función para eliminar tareas
  const { deleteTask } = useTask();
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={() => {
              deleteTask(task._id);
            }}
          >
            Delete
          </button >
          <Link className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" to={`/tasks/${task._id}`}>Edit</Link>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      {/*Se muestra la fecha de la tarea*/}
      <p>
        {dayjs(task.date).utc().format("DD/MM/YYYY")}
      </p>
    </div>
  );
}

export default TaskCard;
