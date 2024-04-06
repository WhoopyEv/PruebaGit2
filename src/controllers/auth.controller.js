import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SCRET } from '../config.js'

// Funciones de las rutas   
export const register = async (req, res) => {

    // Se señala los datos esperados de la petición
    const { email, password, username } = req.body

    try {

        // Verificar usuario
        const userFound = await User.findOne({ email })
        // Mirar si existe el usuario, en caso que si se envia un arreglo de un error
        if (userFound)
            return res.status(400).json(['The email is alredy in use'])

        // Encriptar password y el número es cuantas veces se va a ejecutar el algoritmo
        const passwordHash = await bcrypt.hash(password, 10)

        // Pasar el JSON al modelo User
        const newUser = new User({
            username,
            email,
            password: passwordHash
        })

        // Pasar el modelo para guardar
        const userSaved = await newUser.save()
        // Llamar Token para crearlo
        const token = await createAccessToken({ id: userSaved._id })

        // Creación de Cookie con el Token
        res.cookie('token', token)

        // Respuesta con los datos necesarios para el front lane
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const login = async (req, res) => {
    // Se señala los datos esperados de la petición
    const { email, password } = req.body

    try {

        // Verificar usuario
        const userFound = await User.findOne({ email })
        // Mirar si existe el usuario
        if (!userFound) {
            return res.status(400).json({ message: "User not Found" })
        }

        // Si existe el usuario se procede a comparar password, devuelve un boolean
        const isMatch = await bcrypt.compare(password, userFound.password)
        // Verificar si la contraseña es correcta
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Password" })
        }

        // Llamar Token para crearlo
        const token = await createAccessToken({ id: userFound._id })

        // Creación de Cookie con el Token
        res.cookie('token', token)

        // Respuesta con los datos necesarios para el front lane
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const logout = (req, res) => {
    // Eliminar cookie token
    res.cookie('token', "", { expires: new Date(0) })

    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    // Se buscar el usuario en la base de datos
    const userFound = await User.findById(req.user.id)

    if (!userFound) {
        return res.status(400).json({ message: "User not Found" })
    }

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })

    res.send("profile")
}

// Recibe el token para verificar desde el front lane
export const verifyToken = async (req, res) => {
    const { token } = req.cookies

    // Verifica si primero existe un token
    if (!token) return res.status(401).json({ message: "Unauthorized" })
    // Si existe se verifica que sea correcto
    jwt.verify(token, TOKEN_SCRET, async (error, user) => {
        if (error) return res.status(401).json({ message: "Unauthorized" })

        // Busca el id del token y lo compara con el de los usuario de la base de datos
        const userFound = await User.findById(user.id)
        // Si el usuario no existe
        if (!userFound) return res.status(401).json({ message: "Unauthorized" })

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    })
}