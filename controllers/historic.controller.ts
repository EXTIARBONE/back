import express, {Request, Response} from "express";
import {HistoricService} from "../services/historic.service";
import {checkUserConnected} from "../middlewares";


export class HistoricController{

    async getHistoric(req: Request, res: Response){
        try{
            let startDate: string|undefined = undefined
            let endDate: string|undefined = undefined
            const userId: string = req.params.id

            if (!userId){
                res.status(400).json({error: "La requête envoyée n'est pas valide"})
                return
            }

            if (req.query.startDate){
                startDate = req.query.startDate as string
            }

            if (req.query.endDate){
                endDate = req.query.endDate as string
            }

            const historic = await HistoricService.getInstance().getHistoric(userId, startDate, endDate)

            if (!historic || historic.length === 0){
                res.status(404).json({error: "Aucun historique trouvé"})
                return
            }

            res.json(historic)

        }catch (e) {
            res.status(500).json({error: "Impossible de récupérer l'historique"})
        }
    }


    async updateHistoric(req: Request, res: Response){
        try{
            if (!req.params.id){
                res.status(400).json({error: "Erreur dans la requête"})
                return
            }
            if (!req.body){
                res.status(400).json({error: "Un corps est nécessaire pour la requête"})
                return
            }
            const updateHistoricUser = await HistoricService.getInstance().updateHistoric(req.params.id, req.body)
            if (!updateHistoricUser){
                res.status(500).json({error: "Erreur serveur, impossible de mettre à jour l'historique de l'utilisateur"})
                return
            }
            res.json({message: "Historique de l'utilisateur mis à jour"})

        }catch (e) {
            res.status(500).json({error: "Erreur serveur, impossible de mettre à jour l'historique de l'utilisateur"})
        }
    }


    buildRoutes(){

        const router = express.Router()

        //get historic
        router.get("/getHistoric/:id", checkUserConnected(""), this.getHistoric.bind(this))

        //put historic
        router.put("/putHistoric/:id", checkUserConnected(""),this.updateHistoric.bind(this))

        return router

    }


}