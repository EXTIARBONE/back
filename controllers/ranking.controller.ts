import express, {Request, Response, Router} from "express";
import {checkUserConnected} from "../middlewares";
import {RankingService} from "../services/ranking.service";
import {UserSerializer} from "../utils/UserSerializer";

export class RankingController {

    async getRanking(req: Request, res: Response) {
        try {
            const users = await RankingService.getInstance().getAllUsers();
            if (!users){
                res.status(404).json({error: "Aucun utilisateur n'a été trouvé"});
                return;
            }
            const dtoUsers = UserSerializer.userListToDto(users);
            res.json(dtoUsers);
        }
        catch (err){
            res.status(500).end();
        }
    }

    buildRoutes(): Router {
        const router = express.Router();
        //router.use();
        router.use(checkUserConnected(""));
        router.get('/', this.getRanking.bind(this));
        return router;
    }
}
