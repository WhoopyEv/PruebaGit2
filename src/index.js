import app from "./app.js"
import { connectDB } from "./db.js"

// Conexion base de datos
connectDB()

// Asignar puerto
app.listen(3000)
console.log('Server on port', 3000)