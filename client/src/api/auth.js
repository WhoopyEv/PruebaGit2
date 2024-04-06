import axios from './axios'

// Dirección del back lane donde se va a mandar los datos del registro, recibiendo una respuesta
export const registerRequest = user =>
    axios.post(`/register`, user)

export const loginRequest = user =>
    axios.post(`/login`, user)

// Verifica si el usuario esta logeado por medio del Token en las cookies
export const verifyTokenRequet = () => axios.get('/verify')
