import express, {Request, Response} from "express";
import {checkUserConnected} from "../middlewares";
import {ActionService} from "../services/action.service";

export class ActionController {

    async getAllActions(req: Request, res: Response) {
        try {
            const actions = await ActionService.getInstance().getAll();
            res.json(actions);
        }
        catch (err) {
            res.status(500).end();
            return;
        }

    }

    async addActionsAvailable(req: Request, res: Response) {
        try{
            if (!req.body){
                res.status(400).json({error: "Bad request"});
                return;
            }
            const actions = await ActionService.getInstance().addActionsAvailable(req.body);
            res.json(actions);
        }catch (e){
            res.status(500).json({error: e})
            return;
        }
    }

    async addAction(req: Request, res: Response) {
        try {
            if (!req.body){
                res.status(400).json({error: "Bad request"});
                return;
            }
            if (!req.body.action && !req.body.userId){
                res.status(400).json({error: "Les champs sont manquants ou incorrects"});
                return;
            }
            const action = await ActionService.getInstance().addAction(req.body.action, req.body.userId);
            if (!action){
                res.status(403).json({error: "L'action n'a pas pu être ajoutée"});
                return;
            }
            res.json(action);
        }
        catch (err) {
            res.status(500).json({error: err})
            return;
        }
    }

    async deleteAction(req: Request, res: Response) {
        try {
            if (!req.params.id){
                res.status(400).json({error: "Bad request"});
                return;
            }
            const action = await ActionService.getInstance().deleteAction(req.params.id);
            if (!action){
                res.status(403).json({error: "L'action n'a pas pu être supprimée"});
                return;
            }
            res.json(action);
        }
        catch (err) {
            res.status(500).json({error: err})
            return;
        }
    }


    buildRoutes() {
        const router = express.Router();

        router.use(checkUserConnected(""));
        router.get('/', this.getAllActions.bind(this));

        //Post routes
        router.post("/addActionsAvailable", express.json(), this.addActionsAvailable.bind(this));
        router.post("/addAction", express.json(), this.addAction.bind(this));

        router.delete("/deleteAction/:id", this.deleteAction.bind(this));

        return router;
    }
}
