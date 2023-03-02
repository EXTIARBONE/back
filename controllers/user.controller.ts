import express, {Request, Response, Router} from "express";
import {CoffeeService} from "../services";
import {UserService} from "../services/user.service";
import {checkUserConnected} from "../middlewares";


export class UserController {

    async getUser(req: Request, res:Response){
        try{
            const user = await UserService.getInstance().getByIdUser(req.params.user_id);
            if (user === null) {
                res.status(404).end();
                return;
            }
            res.json(user);
        }
        catch (err) {
            res.status(400).end();
            return;}
    }

    async getScoreFromUser(req: Request, res:Response){
        try{
            const user = await UserService.getInstance().getByIdUser(req.params.user_id);
            console.log("coucou", user)
            if (user === null) {
                res.status(404).end();
                return;
            }
            res.json(user.score);
        }
        catch (err) {
            res.status(400).end();
            return;}
    }
    buildRoutes(): Router {
        const router = express.Router();
        //router.use();
        router.use(checkUserConnected(""));
        router.get('/:user_id', this.getUser.bind(this));
        router.get('/getScore/:user_id', this.getScoreFromUser.bind(this));
        return router;
    }

}