import Task from '../models/task.model.js'


export const getTasks = async (req, res) => {
    try {
        console.log(req)
        // Si se quiere todas las tareas es: const tasks = await Task.find()
        console.log(req.user.id)
        // Se busca solo las tareas de ese usuario
        const tasks = await Task.find({
            user: req.user.id
      
            // El populate trae tambien los datos del usuario, razón por la cual se referencio
        }).populate('user')
    
        res.json(tasks)
    } catch (error) {
        return res.status(500).json({ message: "Error in get tasks" })
    }
}

export const getTask = async (req, res) => {
    try {
        // Recibir el id por la dirección 
        const task = await Task.findById(req.params.id).populate('user')

        // No se encontro la tarea
        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }

        res.json(task)
    } catch (error) {
        return res.status(404).json({ message: "Task not found" })
    }
}

export const createTasks = async (req, res) => {
  try {
    const { title, description, date } = req.body

    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id
    })

    // Pasar el modelo para guardar
    const savedTask = await newTask.save()

    // Se le muestra al cliente
    res.json(savedTask)
  } catch (error) {
    return res.status(500).json({ message: "Error in create task" })
  }
}

export const updateTasks = async (req, res) => {
    try {
        // Recibir el id por la dirección y el new es para que reciba el actualizado
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })

        // No se encontro la tarea
        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }

        res.json(task)
    } catch (error) {
        return res.status(404).json({ message: "Task not found" })
    }
}

export const deleteTasks = async (req, res) => {
    try {
        // Recibir el id por la dirección 
        const task = await Task.findByIdAndDelete(req.params.id)

        // No se encontro la tarea
        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }

        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({ message: "Task not found" })
    }
}