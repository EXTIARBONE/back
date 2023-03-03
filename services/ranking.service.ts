import {UserDocument, UserModel} from "../models";

export class RankingService {
    private static instance?: RankingService;

    public static getInstance(): RankingService {
        if (RankingService.instance === undefined) {
            RankingService.instance = new RankingService();
        }
        return RankingService.instance;
    }

    private constructor() {
    }


    async getAllUsers(): Promise<UserDocument[]> {
        return UserModel.find().exec();
    }

}
