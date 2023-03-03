import {config} from "dotenv";
import express from "express";
import {ActionController, AuthController, CarbonCalcApiController, CoffeeController, RankingController} from "./controllers";
import mongoose, {Mongoose} from "mongoose";
import cors from "cors"
import {HistoricController} from "./controllers";
import {RewardController} from "./controllers";
import {NfcController} from "./controllers";
import {monthlyTask} from "./monthlyTask/resetC02ScoreMonthly";
import {UserController} from "./controllers";
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
    app.use('/auth', authController.buildRoutes());
    const rankingController = new RankingController();
    app.use('/ranking', rankingController.buildRoutes())

    const historicController = new HistoricController();
    app.use('/historic', historicController.buildRoutes())

    const rewardController = new RewardController();
    app.use('/reward', rewardController.buildRoutes())

    const actionController = new ActionController();
    app.use('/action', actionController.buildRoutes())

    const nfcController = new NfcController();
    app.use('/nfc', nfcController.buildRoutes())

    const carbonController = new CarbonCalcApiController();
    app.use('/carbonScore', carbonController.buildRoutes())

    const userController = new UserController();
    app.use('/user', userController.buildRoutes())


    app.listen(process.env.PORT, function () {
        console.log("Server listening on port " + process.env.PORT);
    });
}
startServer().catch(console.error);
//monthlyTask()

