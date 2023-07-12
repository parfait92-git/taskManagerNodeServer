import { ErrorRequestHandler, Request, Response } from "express";
import auth from "../auth/auth";
import { TaskModel } from "../bd/sequilize";
import { UniqueConstraintError, ValidationError } from "sequelize";
import verifyToken from "./triggers/verify.token";

const express = require('express');

export default function addTask(app: typeof express) {
    app.post('/api/users/:id/tasks', auth, verifyToken, (req: Request, res: Response) => {
        const userId = req.params.id;
        TaskModel.create({...req.body, userid: userId, priority: 'LOW'})
        .then((task: any) => {
            let msg = `${task.name} a ete crée avec succès`;
            res.status(200).json({message: msg, data: task});
        })
        .catch((err: ErrorRequestHandler) => {
            if(err instanceof ValidationError) {
                res.status(400).json({message: err.message});
            };

            if(err instanceof UniqueConstraintError) {
                res.status(400).json({message: err.message});
            };

            let msg = 'Une erreur s\'est produite lors de l\'ajout de cette tache';
                console.log({message: msg, data: err});
                res.status(500).json({message: msg, data: err});
        })
    })
} 
