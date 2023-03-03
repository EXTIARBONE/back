import axios from 'axios';

export interface vehicleAction{
    distance: number,
    vehicle: string
}

export interface resLocalCarbon{
    carbon: string
}

export class BilanCarboneService {
    private static instance?: BilanCarboneService;

    public static getInstance(): BilanCarboneService {
        if (BilanCarboneService.instance === undefined) {
            BilanCarboneService.instance = new BilanCarboneService();
        }
        return BilanCarboneService.instance;
    }

    private constructor() {
    }


    public calculerCO2(kmParcourus: number, typeVehicule: string) {
        let tauxCO2 = 0; // taux d'émission de CO2 en grammes par kilomètre
        let rendement = 0; // rendement énergétique en litres ou kWh pour 100 km
        switch (typeVehicule) {
            case "MediumPetrolCar":
                tauxCO2 = 8; // en grammes par kilomètre
                rendement = 8; // en litres pour 100 km
                break;
            case "MediumDieselCar":
                tauxCO2 = 7; // en grammes par kilomètre
                rendement = 6; // en litres pour 100 km
                break;
            case "MediumHybridCar":
                tauxCO2 = 5; // en grammes par kilomètre
                rendement = 4; // en litres pour 100 km en mode hybride
                break;
            case "MediumDieselVan":
                tauxCO2 = 9; // pas d'émission directe de CO2
                rendement = 4; // en litre pour 100 km
                break;
            case "Taxi":
                tauxCO2 = 6; // pas d'émission directe de CO2
                rendement = 8; // en litre pour 100 km
                break;
            case "Subway":
                tauxCO2 = 2; // pas d'émission directe de CO2
                rendement = 4; // en litre pour 100 km
                break;
            case "ClassicBus":
                tauxCO2 = 3; // pas d'émission directe de CO2
                rendement = 4; // en litre pour 100 km
                break;
            default:
                console.error("Type de véhicule invalide");
                return 0;
        }
        let quantiteCO2 = kmParcourus / 10 * tauxCO2 / rendement;
        return quantiteCO2;
    }

    public ifApiDown(postData: vehicleAction){
        console.log("api down")
        let c02 = this.calculerCO2(postData.distance, postData.vehicle)
        let res = c02.toString() + " kg de c02"
        let toReturn : resLocalCarbon =  {
            carbon: res
        };
        return toReturn;
    }


    public async personnalVehicleQuery(vehicle: vehicleAction) {
        const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiN2ExMTU2MTFlYmJkMjAyMWE1MzA4NWVjNjRjZWE0MDkzNDM2MjE5OTYyMzM2MTNmN2ZlYjQ3ZWU1NDBkOTA3YmVmYzUxM2VlZWMxOTlmMWEiLCJpYXQiOjE2Nzc3NDQyNjEsIm5iZiI6MTY3Nzc0NDI2MSwiZXhwIjoxNzA5MzY2NjYxLCJzdWIiOiIzNjI0Iiwic2NvcGVzIjpbXX0.WYMHVuTTsIvI6Cl33XYo22QTxN70-lMS1EDpLRGcd-vOVUh_jh3WX_mktIWKCy1OCJmd4C05w-Wp6JNUMDZN9w';

        const postData = {
            distance: vehicle.distance,
            vehicle: vehicle.vehicle
        };

        const options = {
            method: 'POST',
            url: 'https://api.carboninterface.com/v1/estimates',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_KEY}`
            },
            data: postData
        };

        try {
            const response = await axios(options);
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                return this.ifApiDown(postData);
            } else {
                console.error('Erreur inconnue.');
            }
        }

    }


    public async publicTransportQuery(vehicle: vehicleAction) {
        const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiN2ExMTU2MTFlYmJkMjAyMWE1MzA4NWVjNjRjZWE0MDkzNDM2MjE5OTYyMzM2MTNmN2ZlYjQ3ZWU1NDBkOTA3YmVmYzUxM2VlZWMxOTlmMWEiLCJpYXQiOjE2Nzc3NDQyNjEsIm5iZiI6MTY3Nzc0NDI2MSwiZXhwIjoxNzA5MzY2NjYxLCJzdWIiOiIzNjI0Iiwic2NvcGVzIjpbXX0.WYMHVuTTsIvI6Cl33XYo22QTxN70-lMS1EDpLRGcd-vOVUh_jh3WX_mktIWKCy1OCJmd4C05w-Wp6JNUMDZN9w';

        const postData = {
            distance: vehicle.distance,
            vehicle: vehicle.vehicle
        };

        const options = {
            method: 'POST',
            url: 'https://app.trycarbonapi.com/api/publicTransit',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_KEY}`
            },
            data: postData
        };

        try {
            const response = await axios(options);
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                return this.ifApiDown(postData);
            } else {
                console.error('Erreur inconnue.');
            }
        }
    }
}
