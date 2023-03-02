import {UserModel} from "../models";
import {HistoryProps} from "../models/history.model";

export class HistoricService{

    private static instance: HistoricService

    public static getInstance(): HistoricService{
        if (HistoricService.instance === undefined) {
            HistoricService.instance = new HistoricService();
        }
        return HistoricService.instance;
    }

    async getHistoric(userId: string, startDate: string|undefined, endDate: string|undefined){

        if (startDate && endDate){
            return UserModel.find({ $and: [
                {_id: userId},
                    {historique: {$elemMatch: {date: {$gte: startDate, $lte: endDate}}}}
                ]}).exec()
        }

        return UserModel.find({_id: userId}, {historique: 1}).exec()

    }

    async updateHistoric(userId: string, data: HistoryProps){
        const user = await UserModel.updateOne({_id: userId}, {$push: {historique: data}}).exec()
        return user.modifiedCount === 1
    }



}