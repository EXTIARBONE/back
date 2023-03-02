import express, {Request, Response, Router} from "express";
import {CoffeeService} from "../services";
import {UserService} from "../services/user.service";
import {checkUserConnected} from "../middlewares";


export class UserController {

    async getUser(req: Request, res:Response){
        try{
            if (!req.params.user_id){
                res.status(400).json({error: "La requête envoyée n'est pas valide"})
                return;
            }
            const user = await UserService.getInstance().getByIdUser(req.params.user_id);
            if (!user) {
                res.status(404).end();
                return;
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).end();
        }
    }


    async updateUser(req: Request, res:Response){

        try{
            if (!req.params.user_id){
                res.status(400).json({error: "La requête envoyée n'est pas valide"})
                return;
            }
            if (!req.body){
                res.status(400).json({error: "La requête envoyée n'est pas valide"})
                return;
            }
            const user = await UserService.getInstance().updateUser(req.params.user_id, req.body);
            if (!user) {
                res.status(404).json({error: "L'utilisateur n'existe pas"})
                return;
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).end();
        }

    }

    buildRoutes(): Router {
        const router = express.Router();
        router.use(checkUserConnected(""));

        router.get('/:user_id', this.getUser.bind(this));

        router.put('/:user_id', this.updateUser.bind(this));

        return router;
    }

}