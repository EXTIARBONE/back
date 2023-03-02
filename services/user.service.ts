
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
    public async UserService(props: UserProps): Promise<UserDocument> {
        const model = new UserModel(props);
        const user = await model.save();
        return user;
    }
   /* async getByIdUser(userId: string): Promise<UserDocument| null> {
        return UserModel.findById(userId).exec();

    }*/
    async getByIdUser(userId: string): Promise<UserDocument | null> {
        return UserModel.findById(userId).exec();
    }

}