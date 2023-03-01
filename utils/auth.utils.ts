import crypto from "crypto";
import {UserModel} from "../models";

export class AuthUtils {
    public static sha512(str: string): string {
        const hash = crypto.createHash('sha512');
        hash.update(str);
        return hash.digest("hex");
    }

    static async checkBigBoss(): Promise<boolean> {
        const session = await UserModel.find({
            role: "BigBoss"
        }).count().exec();
        if (session === 0) {
            return true;
        }
        return false;
    }
}