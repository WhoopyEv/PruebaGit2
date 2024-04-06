import axios from "./axios";

export const getTasksRequest = () => axios.get('/tasks')
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`)
// Se crea una tarea y se guarda en task
export const createTasksRequest = (task) => axios.post('/tasks', task)
export const updateTasksRequest = (id, task) => axios.put(`/tasks/${id}`, task)
export const deleteTasksRequest = (id) => axios.delete(`/tasks/${id}`)
