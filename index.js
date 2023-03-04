import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { validationResult } from "express-validator";

import { regValidation } from './validations/auth.js'

mongoose
    .connect('mongodb+srv://admin:admin@cluster0.on4l6vj.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DataBase OK'))
    .catch(err => console.log(err))

const app = express()

app.use(express.json()) // разрешается отправлять данные в формате json на сервер

app.post('/reg', regValidation, (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }

    res.json({
        success: true
    })
})

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
})