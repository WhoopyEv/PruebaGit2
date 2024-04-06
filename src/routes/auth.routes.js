import { Router } from "express";
import { register, login, logout, profile, verifyToken } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

// Poder crear múltiples rutas en terminos de peteciones
const router = Router()

// Rutas y se llama las funciones de controller
router.post("/register", validateSchema(registerSchema), register)
router.post("/login", validateSchema(loginSchema), login)
router.post("/logout", logout)

// Va a verificar si el token se encuentra y si esta correcto
router.get("/verify", verifyToken)

// Se emplea un middleware para verificar antes y proteger la ruta
router.get("/profile", authRequired, profile)

export default router
