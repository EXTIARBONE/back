import express, {Request, Response, Router} from "express";
import {UserService} from "../services/user.service";
import {checkUserConnected} from "../middlewares";
import exp from "constants";

export class UserController {

    async addProfilPics(req: Request, res: Response) {

        try{
            if (!req.params.id){
                res.status(400).json({error: "La requête envoyée n'est pas valide"})
                return;
            }
            if (!req.body){
                res.status(400).json({error: "La requête envoyée n'est pas valide"})
                return;
            }
            let img = req.body.img as string;
            const user = await UserService.getInstance().addProfilePicture(req.params.id, img);
            if (!user){
                res.status(404).json({error: "L'utilisateur n'existe pas"});
                return;
            }
            res.status(200)
        }catch (e) {
            res.status(500).json({error: e})
        }
    }

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
            res.json({message: "L'utilisateur a bien été mis à jour"});
        }
        catch (err) {
            res.status(500).end();
        }

    }

    async getScoreFromUser(req: Request, res:Response){
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
            res.json(user.score);
        }
        catch (err) {
            res.status(500).end();
            return;
        }
    }

    async getProfilPics(req: Request, res:Response){
        try{
            if (!req.params.id){
                res.status(400).json({error: "La requête envoyée n'est pas valide"})
                return;
            }
            const photo = await UserService.getInstance().getProfilePicture(req.params.user_id);
            if (!photo) {
                res.status(404).end();
                return;
            }
            res.json({data: photo});
        }
        catch (err) {
            res.status(500).end();
        }
    }

    async updateUserByNfc(req: Request, res:Response){
        try{
            if (!req.params.id){
                res.status(400).json({error: "La requête envoyée n'est pas valide"})
                return;
            }
            if (!req.body){
                res.status(400).json({error: "La requête envoyée n'est pas valide"})
                return;
            }
            if (!req.body.score){
                res.status(400).json({error: "La requête envoyée n'est pas valide"})
                return;
            }
            const user = await UserService.getInstance().updateUserByNfc(req.params.id, req.body);
            if (!user) {
                res.status(404).json({error: "L'utilisateur n'existe pas et ou est incorrect"})
                return;
            }
            res.json({message: "score updated"});
        }
        catch (err) {
            res.status(500).end();
        }
    }

    buildRoutes(): Router {
        const router = express.Router();

        router.post('/', checkUserConnected(""), express.json(), this.addProfilPics.bind(this))

        router.get('/:user_id', checkUserConnected(""), this.getUser.bind(this));
        router.get('/getScore/:user_id', checkUserConnected(""), this.getScoreFromUser.bind(this));
        router.get('/profilPics', checkUserConnected(""), this.getProfilPics.bind(this));

        router.put('/:user_id', express.json(), checkUserConnected(""), this.updateUser.bind(this));
        router.put('/nfc/:id', express.json(), this.updateUserByNfc.bind(this))

        return router;
    }

}