import {config} from "dotenv";
import {UserDocument, UserModel, UserProps} from "../models";
import {BlobServiceClient} from "@azure/storage-blob";
import {SecurityUtils} from "../utils";

config()

const blobService = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING as string)
const container = blobService.getContainerClient('profil-pics')
let enfFileContainer = "profile-pics"
let blockBlobExist: string

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

    private async checkBlobExist(userId: string){
        let ok = 0
        for await (const blob of container.listBlobsFlat()){
            if (blob.name.includes(userId)){
                ok = 1
                blockBlobExist = blob.name
            }
        }
        return ok
    }

    private async streamToString(readableStream: any) : Promise<string>{
        return new Promise((resolve, reject) => {
            const chunks: any[] = [];
            readableStream.on("data", (data: any) => {
                chunks.push(data.toString());
            });
            readableStream.on("end", () => {
                resolve(chunks.join(""));
            });
            readableStream.on("error", reject);
        });
    }

    async addProfilePicture(userId: string, file: string) {

        if (await this.checkBlobExist(userId + enfFileContainer)){
            const blockBlobClient = container.getBlockBlobClient(blockBlobExist);
            await blockBlobClient.delete()
            const upload = await container.getBlockBlobClient(userId + enfFileContainer).upload(file, file.length)
            if (!upload){
                return null;
            }
            return true
        }

        const upload = await container.getBlockBlobClient(userId + enfFileContainer).upload(file, file.length)
        if (!upload){
            return null;
        }
        return upload._response.request.url


    }

    async getProfilePicture(userId: string) {

        if (!await this.checkBlobExist(userId + enfFileContainer)){
            return null;
        }
        const blockBlobClient = container.getBlockBlobClient(blockBlobExist);
        const downloadBlockBlobResponse = await blockBlobClient.download(0);
        return this.streamToString(downloadBlockBlobResponse.readableStreamBody);

    }

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
            user.password = SecurityUtils.sha512(userProps.password);
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
        if(userProps.nfc !== undefined){
            user.nfc = userProps.nfc;
        }
        return await user.save();
    }

    async updateUserByNfc(userId: string, userProps: UserProps) {

        const user = await this.getByIdUser(userId);

        if (!user) {
            return null;
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