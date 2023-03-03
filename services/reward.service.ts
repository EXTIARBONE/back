import {rewardModel} from "../models/rewardUser.model";
import {RewardAvailableProps, rewardAvaiModel} from "../models/rewardAviable.model";

export class RewardService{

    private static instance: RewardService

    public static getInstance(): RewardService{
        if (RewardService.instance === undefined) {
            RewardService.instance = new RewardService();
        }
        return RewardService.instance;
    }

    async addReward(userId: string, rewardId: RewardAvailableProps){
        return rewardModel.create({userId: userId, amount: rewardId.gift, title: rewardId.title})
    }

    async addRewardAvailable(reward: RewardAvailableProps){
        return rewardAvaiModel.create(reward)
    }

    async getAllRewardsAvailable(){
        return rewardAvaiModel.find({}).exec()
    }

    async getRewardAvailable(rewardId: string){
        return rewardAvaiModel.findOne({_id: rewardId}).exec()
    }

    async getReward(userId: string){
        return rewardModel.find({userId: userId}).exec()
    }

    async updateRewardAvailable(rewardId: string, rewardProps: RewardAvailableProps){

        const reward = await this.getRewardAvailable(rewardId)

        if(!reward){
            return null
        }
        if (rewardProps.title !== undefined) {
            reward.title = rewardProps.title;
        }
        if (rewardProps.gift !== undefined) {
            reward.gift = rewardProps.gift;
        }
        return reward.save()
    }


}