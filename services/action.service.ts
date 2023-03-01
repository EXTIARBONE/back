import {CoffeeDocument, CoffeeModel, CoffeeProps} from "../models/coffee.model";
import {ActionDocument, ActionModel} from "../models/action.model";

export class ActionService {
    private static instance?: ActionService;

    public static getInstance(): ActionService {
        if (ActionService.instance === undefined) {
            ActionService.instance = new ActionService();
        }
        return ActionService.instance;
    }

    private constructor() {
    }

    async getAll(): Promise<ActionDocument[]> {
        return ActionModel.find().exec();
    }
}
