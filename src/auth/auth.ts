import { SECRET_KEY } from "./private-keys";

const jwt =  require('jsonwebtoken');

const privateKey = SECRET_KEY;

export default function auth(req: any, res: any, next: any){
    const authorizationHeader = req.headers.authorization;
    if(!authorizationHeader) {
        const message = `Vous n'avez pas fourni de jeton d'authenifiaction. Ajoutez-en un dans l'entête de la requête.`
        return res.status(401).json({ message })
    }

    const token =  authorizationHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, privateKey, (err: unknown, decodedToken: any)=> {
        if(err) {
            const message = `L'utilisateur n'est pas authorisé à accéder à cette ressource.`;
            return res.status(401).json({message, data: err});
        }
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId) {
            const message =`L'identifiant de l'utilisateur est invalide`;
            return res.status(401).jason(message)
        } else{
            next();
        }
    })
}