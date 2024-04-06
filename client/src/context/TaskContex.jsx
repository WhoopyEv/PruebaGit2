import { createContext, useContext, useState } from "react";
import {
  createTasksRequest,
  getTasksRequest,
  deleteTasksRequest,
  getTaskRequest,
  updateTasksRequest,
} from "../api/task";

const TaskContext = createContext();

// Creación del objeto del contexto
export const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }

  return context;
};

export function TaskProvider({ children }) {
  // Lista de tareas
  const [tasks, setTasks] = useState([]);

  // Obtener tareas
  const getTask = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Crear tareas
  const createTask = async (task) => {
    const res = await createTasksRequest(task);
    console.log(res);
  };

  // Eliminar tareas
  const deleteTask = async (id) => {
    try {
      const res = await deleteTasksRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id != id));
    } catch (error) {
      console.log(error);
    }
  };

  // Mostrar datos de una tarea en form
  const getOneTask = async (id) => {
    try {
      // Se obtiene los datos de task
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  // Editar una tarea
  const updateTask = async (id, task) => {
    try {
      await updateTasksRequest(id, task);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, createTask, getTask, deleteTask, getOneTask, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}
