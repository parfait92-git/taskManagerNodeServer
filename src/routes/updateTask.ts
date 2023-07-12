import { ErrorRequestHandler, Request, Response } from "express";
import auth from "../auth/auth";
import { TaskModel } from "../bd/sequilize";
import { UniqueConstraintError, ValidationError } from "sequelize";
import verifyToken from "./triggers/verify.token";

const express = require('express');
export default function updateTask(app: typeof express) {
    app.put('/api/users/:id/tasks/:taskid',auth, verifyToken, (req: Request, res: Response) => {
        const userid = req.params.id;
        const taskid = req.params.taskid;
        
        TaskModel.update(req.body, {
            where: {id: taskid, userid: userid}
        })
        .then((task: any) => {
            let msg = 'la tache a ete mise a jour avec success'
            res.status(200).json({message: msg, data: task});
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