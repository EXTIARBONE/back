import {BilanCarboneService, vehicleAction} from "../services/bilanCarbone.service";
import {UserService} from "../services/user.service";
import {frontVehiculeType} from "../controllers";

export class BilanCarboneFacade {
    private static instance?: BilanCarboneFacade;

    public static getInstance(): BilanCarboneFacade {
        if (BilanCarboneFacade.instance === undefined) {
            BilanCarboneFacade.instance = new BilanCarboneFacade();
        }
        return BilanCarboneFacade.instance;
    }

    private constructor() {
    }

    public async getVehicleCarbonScore(userId: string, vehicle: vehicleAction) {
        let bilanCarboneObj = await BilanCarboneService.getInstance().personnalVehicleQuery(vehicle);
        if (bilanCarboneObj){
            let strSplitted = bilanCarboneObj.carbon.split(" ")
            console.log("nono")
            console.log(strSplitted[0].toString())
            console.log(strSplitted[0])
            let co2 : number = strSplitted[0]
            UserService.getInstance().updateCarboneScore(userId, co2);
            return bilanCarboneObj;
        } else {
            console.log("error in getVehicleCarbonScore")
        }
    }

    public async getPublicTransportCarbonScore(userId: string, vehicle: vehicleAction){
        let scoreStr = await BilanCarboneService.getInstance().publicTransportQuery(vehicle);
        if (scoreStr){
            const match: RegExpMatchArray | null = scoreStr.match(/([\d.]+)\s*kg/);
            if (match) {
                const score: number = parseFloat(match[1]);
                UserService.getInstance().updateCarboneScore(userId, score);
                return score;
            }
        }
        else {
            console.log("error in getVehicleCarbonScore")
        }
    }

}