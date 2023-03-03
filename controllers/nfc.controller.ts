import express, {Request, Response} from "express";
import {NfcService} from "../services";

export class NfcController{

    async getInfo(req: Request, res: Response){
        try{
            if (!req.body){
                res.status(400).json({error: "No body"});
                return;
            }
            let nfc = req.body.nfc.toString()
            if (!req.body.nfc){
                res.status(400).json({error: "No nfc"});
                return;
            }
            const userNfc = await NfcService.getInstance().getInfo(nfc);
            if (!userNfc){
                res.status(404).json({error: "User not found"});
                return;
            }
            res.json(userNfc);
        }catch (e) {
            res.status(500).json({error: "Server error"});
        }
    }


    buildRoutes(){
        const router = express.Router();
        router.post('/getInfo', express.json(), this.getInfo.bind(this));
        return router
    }



}