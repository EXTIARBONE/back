import express, {Request, Response, Router} from "express";
import {CoffeeService} from "../services";
import {checkUserConnected} from "../middlewares";
import {ActionService} from "../services/action.service";

export class ActionController {

    async getAllActions(req: Request, res: Response) {
        try {
            const actions = await ActionService.getInstance().getAll();
            res.json(actions);
        }
        catch (err) {
            res.status(503).end();
            return;
        }

    }

    buildRoutes(): Router {
        const router = express.Router();
        //router.use();
        router.use(checkUserConnected(""));
        router.get('/', this.getAllActions.bind(this));
        return router;
    }
}
