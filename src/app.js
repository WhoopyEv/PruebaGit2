import express from 'express'
import morgan from 'morgan'

// El router pero lo podemos llamar como se quiera por el default
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js'

import cookieParser from 'cookie-parser'
// Nos ayuda a comunicar el front lane con el back lane
import cors from 'cors'


const app = express()

// Le indica que se quiere que todos los dominios se comuniquen, en este caso solo se indica uno
app.use(cors(
    {
        origin: 'http://localhost:5173',
        // Dar permiso de establecer las cookies
        credentials: true

    }))
// Mostrar los datos o estados que lleguen al back lane por consola
app.use(morgan('dev'))
// Convertir los req.body en JSON
app.use(express.json())
// Lectura de cookies como JSON
app.use(cookieParser())

// Mostrar y procesar rutas post
app.use("/api", authRoutes)
app.use("/api", taskRoutes)

export default app