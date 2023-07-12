import { Op } from "sequelize";
import { TokenModel } from "../../bd/sequilize";
import { NextFunction, Request, Response } from "express";
import { SECRET_KEY } from "../../auth/private-keys";

const jwt =  require('jsonwebtoken');

const privateKey = SECRET_KEY;
export default function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization?.split(' ');
  const token = authorization? authorization[1]: '';
  if (!token) {
    return res.status(401).json({ message: "Token manquant", destroy: false });
  }
  try {
    const decoded = jwt.verify(token, privateKey);
    if (decoded.exp < Date.now() / 1000) {
      // Token expiré, supprime-le de la base de données
      TokenModel.destroy({ where: { token: token } });
      return res.status(401).json({ message: "Token expiré", destroy: true });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide", header: token });
  }

}