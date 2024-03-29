import {possibleRole, UserDocument, UserModel, UserProps} from "../models";
import {SecurityUtils} from "../utils";
import {SessionDocument, SessionModel} from "../models/session.model";

export class AuthService {

    private static instance?: AuthService;

    public static getInstance(): AuthService {
        if (AuthService.instance === undefined) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    private constructor() {
    }

    public async subscribeUser(user: UserProps): Promise<UserDocument> {
        if (!user.password) {
            throw new Error('Missing password');
        }
        let roleName = possibleRole["USER"];
        const model = new UserModel({
            mail: user.mail,
            name: user.name,
            surname: user.surname,
            password: SecurityUtils.sha512(user.password),
            role: roleName,
            score: 0,
            carbonScore: 0
        });
        return model.save();
    }

    // Pick selectionne des champs dans le type
    public async logIn(info: Pick<UserProps, 'mail' | 'password'>, platform: string): Promise<SessionDocument | null> {
        const user = await UserModel.findOne({
            mail: info.mail,
            password: SecurityUtils.sha512(info.password)
        }).exec();
        if (user === null) {
            throw new Error('User not found');
        }
        // 604_800 -> 1 week in seconds
        const currentDate = new Date();
        const expirationDate = new Date(currentDate.getTime() + 604_800_000);
        const session = await SessionModel.create({
            platform,
            expiration: expirationDate,
            user: user._id
        });
        user.sessions.push(session._id); // permet de memoriser la session dans le user
        await user.save();
        return session;
    }

    public async getUserFrom(token: string): Promise<UserProps | null> {
        const session = await SessionModel.findOne({
            _id: token,
            expiration: {
                $gte: new Date()
            }
        }).populate("user").exec();
        return session ? session.user as UserProps : null;
    }
}
