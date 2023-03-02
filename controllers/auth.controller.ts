import express, {Request, Response, Router} from "express";
import {AuthService} from "../services";
import {checkUserConnected} from "../middlewares";


export class AuthController {

    async createUser(req: Request, res: Response) {
        try {
            if (!req.body){
                res.status(400).json({error: "Bad request"})
                return
            }
            console.log(req.body)
            const user = await AuthService.getInstance().subscribeUser(req.body);
            if (!user){
                res.status(501).json({error: "Impossible de créer l'utilisateur"})
                return
            }
            res.json(user);
        } catch (err) {
            res.status(500).json({error: err});
        }
    }

    async logUser(req: Request, res: Response) {
        const platform = req.headers['user-agent'] || "Unknown";
        try {
            const session = await AuthService.getInstance().logIn({
                mail: req.body.mail,
                password: req.body.password
            }, platform);
            if (!session) {
                res.status(401).end(); // unauthorized
                return;
            }
            res.json({
                token: session?._id
            });
        } catch (err) {
            res.status(500).end(); // unauthorized
        }
    }

    async me(req: Request, res: Response) {
        res.json(req.user);
    }

    buildRoutes(): Router {
        const router = express.Router();
        router.post('/subscribe', express.json(), this.createUser.bind(this)); // permet de forcer le this lors de l'appel de la fonction sayHello
        router.post('/login', express.json(), this.logUser.bind(this)); // permet de forcer le this lors de l'appel de la fonction sayHello
        router.get('/me', checkUserConnected(""), this.me.bind(this));
        return router;
    }
}
