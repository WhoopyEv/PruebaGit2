import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        // En caso que no se pase la fecha
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // Referencia a otro modelo, en este caso User
        ref: 'User',
        required: true
    },

}, {
    timestamps: true
})

export default mongoose.model("Task", taskSchema)