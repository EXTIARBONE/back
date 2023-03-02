import {UserModel} from "../models";
import {CoffeeModel} from "../models/coffee.model";

export class NfcService{
    private static instance: NfcService;

    public static getInstance(): NfcService{
        if (NfcService.instance === undefined){
            NfcService.instance = new NfcService();
        }
        return NfcService.instance;
    }

    async getInfo(nfc: Array<number>) {
        return UserModel.findOne({nfc: nfc}, {name: 1, surname: 1, score: 1})
    }
}