import { useEffect } from "react";
import { useTask } from "../context/TaskContex";
import TaskCard from "../components/TaskCard";

function TasksPage() {
  const { getTask, tasks } = useTask();

  useEffect(() => {
    getTask();
  }, []);

  // Si no hay tareas
  if (tasks.length === 0) return <h1>No tasks</h1>;

  return (
    // Se indica que según el tamaño de la pantalla cambie las columnas
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {tasks.map((task) => (
       <TaskCard task={task} key={task._id}/>
      ))}
    </div>
  );
}

export default TasksPage;
