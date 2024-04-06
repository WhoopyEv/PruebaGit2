import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        //Quitar espacios
        trim: true
    },
    email: {
        type: String,
        required: true,
        //Quitar espacios
        trim: true,
        // Esta variable no se puede repetir, es unica para cada usuario
        unique: true
    },
    password: {
        type: String,
        required: true,
    }, 
}, {
    // Agregar fecha de creación
    timestamps: true
})


export default mongoose.model('User', userSchema)