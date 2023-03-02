import {config} from "dotenv";
import express from "express";
import {AuthController, CoffeeController} from "./controllers";
import mongoose, {Mongoose} from "mongoose";
import cors from "cors"
import {HistoricController} from "./controllers";
import {RewardController} from "./controllers";
import {NfcController} from "./controllers";
config();

async function startServer(): Promise<void> {

    await mongoose.connect(process.env.MONGO_URI as string, {
        auth: {
            username: process.env.MONGO_USER as string,
            password: process.env.MONGO_PASSWORD as string
        }
    });

    const app = express();
    app.use(cors())
    const coffeeController = new CoffeeController();
    app.use('/coffee', coffeeController.buildRoutes()); // enregistrement d'un routeur
    const authController = new AuthController();
    app.use('/auth', authController.buildRoutes())

    const historicController = new HistoricController();
    app.use('/historic', historicController.buildRoutes())

    const rewardController = new RewardController();
    app.use('/reward', rewardController.buildRoutes())

    const nfcController = new NfcController();
    app.use('/nfc', nfcController.buildRoutes())

    app.listen(process.env.PORT, function () {
        console.log("Server listening on port " + process.env.PORT);
    });
}

startServer().catch(console.error);
