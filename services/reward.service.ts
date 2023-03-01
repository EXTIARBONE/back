import {rewardModel} from "../models/rewardUser.model";
import {rewardAvaiModel} from "../models/rewardAviable.model";

export class RewardService{

    private static instance: RewardService

    public static getInstance(): RewardService{
        if (RewardService.instance === undefined) {
            RewardService.instance = new RewardService();
        }
        return RewardService.instance;
    }

    async getAllRewardsAvailable(){
        return rewardAvaiModel.find({}).exec()
    }

    async getReward(userId: string){
        return rewardModel.find({userId: userId}).exec()
    }

}