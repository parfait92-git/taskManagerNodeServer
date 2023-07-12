import { UniqueConstraintError, ValidationError } from "sequelize";
import { UserModel } from "../bd/sequilize";
import { Request, Response, ErrorRequestHandler } from 'express';
const bcrypt = require('bcrypt');
const express = require('express');
let msg: string;
export default function register(app: typeof express) {
    app.post('/api/users/register', (req: Request, res: Response) => {
        bcrypt.hash(req.body.password, 10).then((hash: string) => {
            UserModel.create({...req.body, password: hash}).then((user: any) => {
                msg = `L'utilisateur ${user.firstname} a ete crée avec succès`;
                res.status(200).json({message: msg, data: user});
            })
            .catch((err: ErrorRequestHandler) => {
                if(err instanceof ValidationError) {
                    res.status(400).json({message: err.message, data: err})
                }
                if(err instanceof UniqueConstraintError) {
                    res.status(400).json({message: err.message, data: err})
                }

                msg = 'Une erreur s\'est produite lors de la creation de l\'utilisateur';
                console.log({message: msg, data: err});
                res.status(500).json({message: msg, data: err});
            })
        })
    })
}