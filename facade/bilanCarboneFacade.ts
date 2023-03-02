import {BilanCarboneService, vehicleAction} from "../services/bilanCarbone.service";
import {UserService} from "../services/user.service";

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

    public getVehicleCarbonScore(userId: string, vehicle: vehicleAction){
        let score = BilanCarboneService.getInstance().personnalVehicleQuery(vehicle);
        if (score){
            UserService.getInstance().updateCarboneScore(userId, score);
            return score;
        }
        else {
            console.log("error in getVehicleCarbonScore")
        }
    }

    public getPublicTransportCarbonScore(userId: string, vehicle: vehicleAction){
        let score = BilanCarboneService.getInstance().personnalVehicleQuery(vehicle);
        if (score){
            UserService.getInstance().updateCarboneScore(userId, score);
            return score;
        }
        else {
            console.log("error in getVehicleCarbonScore")
        }
    }

}