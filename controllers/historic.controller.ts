import express, {Request, Response} from "express";
import {HistoricService} from "../services/historic.service";
import {AuthService} from "../services";
import {checkUserConnected} from "../middlewares";


export class HistoricController{

    async getHistoric(req: Request, res: Response){
        try{
            let startDate: string|undefined
            let endDate: string|undefined
            const userId = req.params.id

            if (userId === null){
                res.status(400).json({error: "La requête envoyée n'est pas valide"})
                return
            }

            if (req.query.startDate && req.query.endDate){
                startDate = req.query.startDate as string
                endDate = req.query.endDate as string
            }

            const historic = await HistoricService.getInstance().getHistoric(userId, startDate, endDate)

            if (historic.length === 0){
                res.status(404).json({error: "Aucun historique trouvé"})
                return
            }

            return historic

        }catch (e) {
            res.status(500).json({error: "Impossible de récupérer l'historique"})
        }
    }


    async updateHistoric(req: Request, res: Response){

    }


    buildRoutes(){

        const router = express.Router()

        //get historic
        router.get("/gethistoric/:id", checkUserConnected(""), this.getHistoric.bind(this))

        //put historic
        router.put("/puthistoric/:id", checkUserConnected(""),this.updateHistoric.bind(this))

        return router

    }


}