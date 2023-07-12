import { ErrorRequestHandler, Request, Response } from "express";
import auth from "../auth/auth";
import { UserModel } from "../bd/sequilize";
import verifyToken from "./triggers/verify.token";

const express =  require('express');

export default function listAllUsers(app: typeof express) {
    app.get('/api/users/:id/getAll', auth,verifyToken, (req: Request, res: Response) => {
        const id = req.params.id;
        const limitqry = JSON.stringify(req.query.limit);
        const limit = limitqry? parseInt(limitqry): 5;
        UserModel.findAll(
            {
                where: {id: !id},
                order: [['createdAt', 'ASC']],
                limit: limit
            }
        )
        .then((users: any)=> {
            const message = `La liste des ${users.length} Utilisateurs disponible a bien été récupérée`;
            res.json({ message, data: users });
        })
        .catch((err: ErrorRequestHandler) => {
            const message = 'Une erreur s\'est produite lors de la récupération des taches';
            console.error(message + ': ', err);
            res.status(500).json({ message, data: err });
          });
    })
}