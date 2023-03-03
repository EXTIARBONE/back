import express, {Request, Response, Router} from "express";
import {checkUserConnected} from "../middlewares";
import {BilanCarboneFacade} from "../facade/bilanCarboneFacade";
import {AuthUtils} from "../utils";

export enum frontVehiculeType {
    dieselCar = "MediumDieselCar",
    hybridCar = "MediumHybridCar",
    vanDiesel = "MediumDieselVan",
    petrolCar = "MediumPetrolCar"
}

export enum frontPublicTransport{
    Taxi = "Taxi",
    Bus = "ClassicBus",
    Metro = "Subway"
}

export class CarbonCalcApiController {



    async carbonCalculator(req: Request, res: Response) {
        const carbonAction = req.body;
        if (!carbonAction.distance || !carbonAction.vehicle) {
            res.status(400).end(); // 400 -> bad request
            return;
        }
        let score;
        try {
            if(req.headers.authorization){
                const tmpUser = await AuthUtils.getUserByTokenSession(req.headers.authorization);
                if(carbonAction.vehicle in frontVehiculeType){
                    let vehicle = await req.body.vehicle
                    // @ts-ignore
                    let transport = frontVehiculeType[vehicle]
                    score = await BilanCarboneFacade.getInstance().getVehicleCarbonScore(tmpUser?._id, {
                        distance: req.body.distance,
                        vehicle: transport
                    })
                }
                else {
                    score = await BilanCarboneFacade.getInstance().getPublicTransportCarbonScore(tmpUser?._id,{
                        distance: req.body.distance,
                        vehicle: req.body.vehicle
                    })
                }
                res.json({score:score})
            }
        } catch (err) {
            res.status(500).end();
            return;
        }
    }

    buildRoutes(): Router {
        const router = express.Router();
        //router.use();
        router.use(checkUserConnected(""));
        router.post('/', express.json(), this.carbonCalculator.bind(this));
        return router;
    }
}
