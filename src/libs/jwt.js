import { TOKEN_SCRET } from "../config.js"
import jwt from "jsonwebtoken"

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        // Creación del Token
        jwt.sign(
            payload,
            TOKEN_SCRET,
            {
                // Tiempo de expiración
                expiresIn: "1d"
            },
            (err, token) => {
                if (err) {
                    reject(err)
                }
                resolve(token)
            }
        )
    })
}
