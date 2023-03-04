import { body } from "express-validator";

export const regValidation = [
    body('email', 'Укажите верную почту').isEmail(),
    body('password', 'Пароль дольжен быть больше 5 символов').isLength({ min: 5 }),
    body('fullName', 'Имя должно быть не меньше 3 символов').isLength({ min: 3 })
]