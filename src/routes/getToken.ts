import { ErrorRequestHandler, Request, Response } from "express";
import auth from "../auth/auth";
import verifyToken from "./triggers/verify.token";
import { TokenModel } from "../bd/sequilize";

const express = require('express');


export default function provideToken(app: typeof express) {
    app.get('/api/users/:id/token/:token', auth, verifyToken, (req: Request, res: Response) => {
        const userId = req.params.id;
        const token = req.params.token;
        TokenModel.findOne({
            where: {token: token, userId: userId}
        }).then((result: any) => {
            let message = 'token trouvé';
            res.status(200).json({message, data: result})
        }).catch((err: ErrorRequestHandler) => {
            let message = 'une erreur s\'est produite!';
            res.status(500).json({message, data: err});
        })
    })
}
