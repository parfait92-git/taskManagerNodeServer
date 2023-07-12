import { ErrorRequestHandler, Request, Response } from "express";
import auth from "../auth/auth";
import { TaskModel } from "../bd/sequilize";
import verifyToken from "./triggers/verify.token";

const express =  require('express');

export default function listTask(app: typeof express) {
    app.get('/api/users/:id/tasks', auth,verifyToken, (req: Request, res: Response) => {
        const reqLimit = req.query.limit as unknown as string;
        const limit: number =  parseInt(reqLimit);
        const userid = req.params.id;
        if(reqLimit) {
            TaskModel.findAndCountAll({
                where: {userid: userid},
                order: [['created', 'ASC']],
                limit: limit
            })
            .then(({ count, rows }: {count: any; rows: any}) => {
                const message = `La liste des ${count} taches a bien été récupérée`;
                res.json({ message, data: rows });
              })
            .catch((err: ErrorRequestHandler) => {
                const message = 'Une erreur s\'est produite lors de la récupération des taches';
                console.error(message + ': ', err);
                res.status(500).json({ message, data: err });
              });
        } else {
            TaskModel.findAll({
                where: {userid: userid},
                order: [['created', 'ASC']],
            })
            .then((tasks: any) => {
                const message = `La liste des ${tasks.length} taches a bien été récupérée`;
                res.json({ message, data: tasks });
              })
            .catch((err: ErrorRequestHandler) => {
                const message = 'Une erreur s\'est produite lors de la récupération des taches';
                console.error(message + ': ', err);
                res.status(500).json({ message, data: err });
              });
        }
        
    })
}