import {UserModel} from "../models";

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


}