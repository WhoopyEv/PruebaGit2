import jwt from "jsonwebtoken"
import { TOKEN_SCRET } from "../config.js"

export const authRequired = (req, res, next) => {

    // Extraer token de cookie, acordarse que viene como un JSON por el cookie parser de App
    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({ message: "Not token, authorization denied" })
    }

    jwt.verify(token, TOKEN_SCRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invaled token" })
        }

        // Se asigna el token decodificado
        req.user = user
        
        // No retorna nada, se indica que continue a la siguiente función
        next()

    })

}