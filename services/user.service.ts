import {UserDocument, UserModel, UserProps} from "../models";

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
   /* async getByIdUser(userId: string): Promise<UserDocument| null> {
        return UserModel.findById(userId).exec();

    }*/
    async getByIdUser(userId: string): Promise<UserDocument | null> {
        return UserModel.findById(userId).exec();
    }

    async updateCarboneScore(userId: string, score: number): Promise<UserDocument | null> {
        const user = await this.getByIdUser(userId);
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

    async updateUser(userId: string, userProps: UserProps) {

        const user = await this.getByIdUser(userId);

        if (!user) {
            return null;
        }
        if (userProps.name !== undefined) {
            user.name = userProps.name;
        }
        if (userProps.surname !== undefined) {
            user.surname = userProps.surname;
        }
        if (userProps.password !== undefined) {
            user.password = userProps.password;
        }
        if (userProps.carbonScore !== undefined) {
            user.carbonScore = userProps.carbonScore;
        }
        if (userProps.role !== undefined) {
            user.role = userProps.role;
        }
        if (userProps.score !== undefined) {
            user.score = userProps.score;
        }
        return await user.save();
    }
    
    async getAll(): Promise<UserDocument[]> {
        return UserModel.find().exec();
    }


}