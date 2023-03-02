import express, {Request, Response} from "express";
import {checkUserConnected} from "../middlewares";
import {RewardService} from "../services/reward.service";

export class RewardController{


    async getReward(req: Request, res: Response){
        try{

            if (!req.params.id){
                res.status(400).json({error: "La requête envoyée n'est pas valide"})
                return
            }
            const id = req.params.id

            const rewards = await RewardService.getInstance().getReward(id)
            let total = 0
            for (const reward of rewards) {
                total += reward.amount
            }

            res.json({rewards: rewards, total: total})

        }catch (e) {
            res.status(500).json({error: "Impossible de récupérer les récompenses"})
        }
    }

    async getAllRewardsAvailable(req: Request, res: Response){
        try{

            const rewards = await RewardService.getInstance().getAllRewardsAvailable()
            if (rewards.length === 0){
                res.status(404).json({error: "Aucune récompense disponible"})
                return
            }
            res.json({rewards: rewards})

        }catch (e) {
            res.status(500).json({error: "Impossible de récupérer les récompenses"})
        }
    }



    buildRoutes(){
        const router = express.Router()

        //Get Routes
        router.get("/getreward/:id", checkUserConnected(""), this.getReward.bind(this))
        router.get("/getAllRewardsAvailable", this.getAllRewardsAvailable.bind(this))

        //Post Routes
        router.post("/addreward", checkUserConnected(""), this.getReward.bind(this))
        router.post("/addrewardavailable", checkUserConnected(""), this.getAllRewardsAvailable.bind(this))

        //Put Routes
        router.put("/updaterewardAvailable", checkUserConnected(""), this.getReward.bind(this))

        return router
    }

}