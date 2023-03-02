import {config} from "dotenv";
import express from "express";
import {AuthController, CarbonCalcApiController, CoffeeController} from "./controllers";
import mongoose, {Mongoose} from "mongoose";
config();

async function startServer(): Promise<void> {

    const m: Mongoose = await mongoose.connect(process.env.MONGO_URI as string, {
        auth: {
            username: process.env.MONGO_USER as string,
            password: process.env.MONGO_PASSWORD as string
        }
    });

    const app = express();

    const coffeeController = new CoffeeController();
    app.use('/coffee', coffeeController.buildRoutes()); // enregistrement d'un routeur
    const authController = new AuthController();
    app.use('/auth', authController.buildRoutes())
    const carbonController = new CarbonCalcApiController();
    app.use('/carbonScore', carbonController.buildRoutes())


    app.listen(process.env.PORT, function () {
        console.log("Server listening on port " + process.env.PORT);
    });
}

startServer().catch(console.error);
