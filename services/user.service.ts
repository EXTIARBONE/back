import {UserDocument, UserModel, UserProps} from "../models";
import {CoffeeDocument, CoffeeModel} from "../models/coffee.model";

export class UserService {
    private static instance?: UserService;

    public static getInstance(): UserService {
        if (UserService.instance === undefined) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    private constructor() {
    }

    async getById(userId: string): Promise<UserDocument | null> {
        return UserModel.findById(userId).exec();
    }

    async updateCarboneScore(userId: string, score: number): Promise<UserDocument | null> {
        const user = await this.getById(userId);
        if (!user) {
            return null;
        }
        if (score !== null && user.carbonScore !== undefined) {
            user.carbonScore = user.carbonScore + parseFloat(String(score));
        }
        else {
            user.carbonScore = parseFloat(String(score));
        }
        const res = await user.save();
        return res;
    }

    async getAll(): Promise<UserDocument[]> {
        return UserModel.find().exec();
    }

}
