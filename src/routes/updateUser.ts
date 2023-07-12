import { ErrorRequestHandler, Request, Response } from "express";
import auth from "../auth/auth";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { UserModel } from "../bd/sequilize";
import verifyToken from "./triggers/verify.token";
const express = require('express');

export default function updateUser(app: typeof express) {
    app.put('/api/users/update/:id', auth,verifyToken, (req: Request, res: Response) => {
        const id = req.params.id;
        UserModel.update(req.body, {
            where: {id: id}
        }).then((userData: any) => {
            let msg = 'l\'utilisateur a ete mise a jour avec success'
            res.status(200).json({message: msg, data: userData});
        })
        .catch((err: ErrorRequestHandler) => {
            if(err instanceof ValidationError) {
                res.status(400).json({message: err.message})
            };
            if(err instanceof UniqueConstraintError) {
                res.status(400).json({message: err.message})
            }
            let msg = 'une erreur est survenu lors de la connexion au serveur';
            res.status(500).json({message: msg, data: err})
        })
    })
}