import axios from 'axios'

// Indicar a Axios cual es el dominio que siempre va a consultar
const instance = axios.create({
    baseURL:"http://localhost:3000/api",
    // Establecer las cookies
    withCredentials: true
})

export default instance
