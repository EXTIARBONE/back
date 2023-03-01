import express, {Request, Response, Router} from "express";
import {CoffeeService} from "../services";
import {checkUserConnected} from "../middlewares";
import {RankingService} from "../services/ranking.service";
import {UserSerializer} from "../utils/UserSerializer";

export class ActionController {

    async getRanking(req: Request, res: Response) {
        const users = await RankingService.getInstance().getAllUsers();
        const dtoUsers = UserSerializer.userListToDto(users);
        res.json(dtoUsers);
    }

    buildRoutes(): Router {
        const router = express.Router();
        //router.use();
        router.use(checkUserConnected(""));
        router.get('/', this.getRanking.bind(this));
        return router;
    }
}
