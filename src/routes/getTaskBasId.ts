import { ErrorRequestHandler, Request, Response } from "express";
import auth from "../auth/auth";
import { TaskModel } from "../bd/sequilize";
import verifyToken from "./triggers/verify.token";

const express =  require('express');

export default function getTask(app: typeof express) {
    app.get('/api/users/tasks/:taskid', auth,verifyToken, (req: Request, res: Response) => {
        const taskid =  req.params.taskid;
        TaskModel.findByPk(taskid)
        .then(((task: any)  => {
            const message = `${task.name} a été retrouvé`;
            res.json({message, data: task})
        }))
        .catch((err: ErrorRequestHandler) => {
            const message = 'Une erreur s\'est produite lors de la récupération des taches';
            console.error(message + ': ', err);
            res.status(500).json({ message, data: err });
          });
    })
}