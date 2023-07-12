import { ErrorRequestHandler, Request, Response } from "express";
import { UserModel } from "../bd/sequilize";
import auth from "../auth/auth";
import verifyToken from "./triggers/verify.token";

const express = require('express');

export default function getUserByPk(app: typeof express) {
    app.get('/api/users/:id', auth,verifyToken, (req: Request, res: Response)=> {
        const id = req.params.id;
        UserModel.findByPk(id)
        .then((user: any) => {
            let message = 'Voici l\'utilisateur trouvé';
           return res.status(200).json({message, data: user})
        })
        .catch((err: ErrorRequestHandler) => {
            res.status(500).json({data: err})
        })
    })
}