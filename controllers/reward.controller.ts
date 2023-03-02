import express, {Request, Response} from "express";
import {checkUserConnected} from "../middlewares";
import {RewardService} from "../services/reward.service";

export class RewardController{

    async addReward(req: Request, res: Response){
        try{
            if (!req.params.id){
                res.status(400).json({error: "La requête envoyée n'est pas valide"})
                return
            }
            if (!req.body){
                res.status(400).json({error: "La requête envoyée n'est pas valide"})
                return
            }
            const rewardUser = await RewardService.getInstance().addReward(req.params.id, req.body)
            if (!rewardUser){
                res.status(500).json({error: "Une erreur est survenu lors de l'enregistrement"})
                return
            }
            res.json({message: "ok", reward: rewardUser})
        }catch (e) {
            res.status(500).json({error: "Impossible d'ajouter la récompense"})
        }
    }

    async addRewardAvailable(req: Request, res: Response){
        try{
            if (!req.body){
                res.status(400).json({error: "La requête envoyée n'est pas valide"})
                return
            }
            const reward = await RewardService.getInstance().addRewardAvailable(req.body)
            if (!reward){
                res.status(500).json({error: "Une erreur est survenu lors de l'enregistrement"})
                return
            }
            res.json({message: "ok", reward: reward})

        }catch (e) {
            res.status(500).json({error: "Impossible d'ajouter la récompense disponible"})
        }
    }

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

    async updateReward(req: Request, res: Response){
        try{
            if (!req.params.id){
                res.status(400).json({error: "La requête envoyée n'est pas valide"})
                return
            }
            if (!req.body){
                res.status(400).json({error: "La requête envoyée n'est pas valide"})
                return
            }

            const rewardUpdated = await RewardService.getInstance().updateRewardAvailable(req.params.id, req.body)
            if (!rewardUpdated){
                res.status(404).json({error: "Aucun reward n'a pu être mis à jour"})
                return
            }
            res.json({message: "ok", reward: rewardUpdated})

        }catch (e) {
            res.status(500).json({error: "Impossible de mettre à jour la récompense"})
        }
    }



    buildRoutes(){
        const router = express.Router()

        //Get Routes
        router.get("/getReward/:id", checkUserConnected(""), this.getReward.bind(this))
        router.get("/getAllRewardsAvailable", this.getAllRewardsAvailable.bind(this))

        //Post Routes
        router.post("/addReward", checkUserConnected(""), this.addReward.bind(this))
        router.post("/addRewardAvailable", checkUserConnected(""), this.addRewardAvailable.bind(this))

        //Put Routes
        router.put("/updateRewardAvailable", checkUserConnected(""), this.updateReward.bind(this))

        return router
    }

}