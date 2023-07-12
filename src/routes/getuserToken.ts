import { ErrorRequestHandler, Request, Response } from "express";
import auth from "../auth/auth";
import { UserModel } from "../bd/sequilize";

const express =  require('express');


export default function getToken(app: typeof express) {
    app.put('/api/users/update/token/:id', auth, (req: Request, res: Response) => {
        const userid = req.params.id;
        const token = req.body.token;
        UserModel.findOne({
            where: {id: userid}
        }).then((user: any) => {
            UserModel.update({...user, token: token}, {
                where: {id: userid}
            }).then((data: any) => {
                if(data === null) {
                    return res.status(400).json('aucune donnees existante');
                }
                let msg = 'l\'utilisateur a recu un token'
                res.status(200).json({message: msg, data});
            })
        })
        .catch((err: ErrorRequestHandler) => {
            return res.status(500).json({message: err})
        })
    })
}