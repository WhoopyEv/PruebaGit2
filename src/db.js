import mongoose from "mongoose";
import { config } from "dotenv"

// Proceso para tener constantes protegidas
config()

// Conexión a la base de datos
export const connectDB = async () => {

    try {
        await mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.0pxc1mu.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`)
        console.log(" >>>> DB is connected")
    } catch (error) {
        console.log(error)
    }
}