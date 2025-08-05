import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

/**
 * Verifica se o usuário está autenticado e retorna
 * um token válido, caso esteja.
 *
 * @param req Requisição do Client
 * @param res Resposta do Servidor
 * @param next Chama o proximo middleware ou controller
 * @returns Um token válido no `res.locals.user` para o usuario.
 */
export default async function authMiddleware(
     req: Request,
     res: Response,
     next: NextFunction
) {
     const token = req.cookies.token;

     if (!token)
          return res
               .status(401)
               .json({ message: 'Acesso negado. Token ausente.' });

     try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET!);
          console.log(decoded);
          res.locals.user = decoded;
          next();
     } catch (err) {
          return res
               .status(403)
               .json({ message: 'Token inválido ou expirado' });
     }
}
