import { Request, Response } from 'express';

/**
 * Interface CONTROLLER responsável por definir os métodos
 * para receber o conteudo da requisição e direcionar para
 * o serviço correto.
 */
export default interface ClientControllerInterface {
     save(req: Request, res: Response): Promise<Response>;

     getAll(req: Request, res: Response): Promise<void>;

     getOne(req: Request, res: Response): Promise<void>;

     updateById(req: Request, res: Response): Promise<void>;

     delById(req: Request, res: Response): Promise<void>;

     login(req: Request, res: Response): Promise<Response>;

     logout(req: Request, res: Response): Promise<Response>;
}
