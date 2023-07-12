import { SECRET_KEY } from "../auth/private-keys";
import { TokenModel, UserModel } from "../bd/sequilize";
import { Request, Response, ErrorRequestHandler } from 'express';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = process.env.JWT_PRIVATE_KEY || SECRET_KEY;


export default function authenticateUser(app: any) {
    app.post('/api/users/login', async (req: Request, res: Response) => {
        try {
            console.log('test '+privateKey)
            const user = await UserModel.findOne({ where: { username: req.body.username } });
            console.log('test2')
            if (!user) {
                const message = `L'utilisateur n'existe pas`;
                return res.status(404).json({ message })
            }
            //JWT 
            const token = jwt.sign(
                {userId: user.id},
                privateKey,
                {expiresIn: '24h'}
            );
          const compare = await bcrypt.compare(req.body.password, user.password);
          console.log('test3')
          if (!compare) {
            const message = 'Le mot de passe est incorret';
            return res.status(401).json({ message, data: user, auth: false });
            }
            const createTokenFn = await createToken({userId: user.id, token: token});
            const message = 'L\'utilisateur a été authentifié avec succès';
            return res.status(200).json({ message, data: user, token, auth: true });
        } catch (error) {
            const message = 'L\'utilisateur n\'a pas pu être connecté réessayer plus tard';
                return res.json({ message, data: error, auth: false });
        }
    
           
            
            
    });
    
}

const createToken = ({userId, token}: {userId: string, token: string}) => {
    return TokenModel.create({
        userId: userId,
  token: token,
  expiredAt: new Date(new Date().getTime() + (24 * 60 * 60 * 1000))
    })
}