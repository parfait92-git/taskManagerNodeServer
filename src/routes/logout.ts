import { ErrorRequestHandler, Request, Response } from "express";
import auth from "../auth/auth";
import { TokenModel } from "../bd/sequilize";
import verifyToken from "./triggers/verify.token";

const express =  require('express');
export default function logout(app: typeof express) {
    let message = '';
    app.put('/api/users/logout/:id',auth,verifyToken, async (req: Request, res: Response) => {
        const id = req.params.id;
        const token = req.headers.authorization?.split(' ')[1];
        try {
            await destroyToken(id, token);
            message = `Utilisateur deconnecté avec succès`;  
            res.status(200).json({message})
        } catch (error) {
            const message = 'Une erreur s\'est produite lors de la deconnexion';
            console.error(message+': ', error);
            res.status(500).json({message, data: error})
        }
        
    })
}

const destroyToken = async(id: string, token?: string) => {
    return TokenModel.destroy({ where: { userId: id, token: token} });
}