import axios, { AxiosRequestConfig } from 'axios';
import {frontVehiculeType} from "../controllers/carbonCalcApiController";
export interface vehicleAction{
    distance: number,
    vehicle: string
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

    public async personnalVehicleQuery(vehicle: vehicleAction) {
        const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiN2ExMTU2MTFlYmJkMjAyMWE1MzA4NWVjNjRjZWE0MDkzNDM2MjE5OTYyMzM2MTNmN2ZlYjQ3ZWU1NDBkOTA3YmVmYzUxM2VlZWMxOTlmMWEiLCJpYXQiOjE2Nzc3NDQyNjEsIm5iZiI6MTY3Nzc0NDI2MSwiZXhwIjoxNzA5MzY2NjYxLCJzdWIiOiIzNjI0Iiwic2NvcGVzIjpbXX0.WYMHVuTTsIvI6Cl33XYo22QTxN70-lMS1EDpLRGcd-vOVUh_jh3WX_mktIWKCy1OCJmd4C05w-Wp6JNUMDZN9w';

        const postData = {
            distance: vehicle.distance,
            vehicle: vehicle.vehicle
        };

        const options: AxiosRequestConfig = {
            method: 'POST',
            url: 'https://app.trycarbonapi.com/api/carTravel',
            headers: {
                Authorization: `Bearer ${API_KEY}`
            },
            data: postData
        };

        try {
            const response = await axios(options);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }


    public async publicTransportQuery(vehicle: vehicleAction) {
        const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiN2ExMTU2MTFlYmJkMjAyMWE1MzA4NWVjNjRjZWE0MDkzNDM2MjE5OTYyMzM2MTNmN2ZlYjQ3ZWU1NDBkOTA3YmVmYzUxM2VlZWMxOTlmMWEiLCJpYXQiOjE2Nzc3NDQyNjEsIm5iZiI6MTY3Nzc0NDI2MSwiZXhwIjoxNzA5MzY2NjYxLCJzdWIiOiIzNjI0Iiwic2NvcGVzIjpbXX0.WYMHVuTTsIvI6Cl33XYo22QTxN70-lMS1EDpLRGcd-vOVUh_jh3WX_mktIWKCy1OCJmd4C05w-Wp6JNUMDZN9w';

        const postData = {
            distance: vehicle.distance,
            vehicle: vehicle.vehicle
        };

        const options: AxiosRequestConfig = {
            method: 'POST',
            url: 'https://app.trycarbonapi.com/api/publicTransit',
            headers: {
                Authorization: `Bearer ${API_KEY}`
            },
            data: postData
        };

        try {
            const response = await axios(options);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
