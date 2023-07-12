import { ErrorRequestHandler, Request, Response } from "express";
import auth from "../auth/auth";
import { TaskModel } from "../bd/sequilize";
import verifyToken from "./triggers/verify.token";

const express = require('express');

export default function removeTask(app: typeof express) {
    app.delete('/api/users/:id/tasks/:taskid', auth,verifyToken, (req: Request, res: Response) => {
        const userid = req.params.id;
        const taskid = req.params.taskid;
        TaskModel.findByPk(taskid)
        .then((task: any) => {
            if(task === null) {
                const message = 'Cette tache n\'existe pas, réessayez un autre identifiant';
                return res.status(404).json(message);
            };

            const deletedTask = task;
            return TaskModel.destroy({
                where: {id: taskid, userid: userid}
            })
            .then(() => {
                const message = `La tache ${deletedTask.name} a été suprimé`;
                res.status(200).json({message, data: deletedTask})
            })
        })
        .catch((err: ErrorRequestHandler) => {
            const message = 'Une erreur s\'est produite lors de la suppression de la tache'
            console.error(message+ ': ', err);
            res.status(500).json({message, data: err})
        })
    })
}