import fs from 'fs'
import { validationResult } from "express-validator";
import express from 'express'
import jwt from 'jsonwebtoken'
import bcript from 'bcrypt'

import Users from './data/Users.json' assert { type: "json" }
import { regValidation } from './validations/auth.js'


const app = express()
app.use(express.json()) // разрешается отправлять данные в формате json на сервер

app.post('/reg', regValidation, async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }

    const password = req.body.password
    const salt = await bcript.genSalt(10)
    const passwordHash = await bcript.hash(password, salt)

    const user = {
        email: req.body.email,
        passwordHash,
        fullName: req.body.fullName
    }
    Users.push(user)
    console.log(Users);
    await fs.writeFile('./data/Users.json', JSON.stringify(Users), err => {
        console.log(err);
    })

    res.json(user)
})



app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
})