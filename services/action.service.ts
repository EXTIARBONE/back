import {ActionDocument, ActionModel, ActionProps} from "../models/action.model";
import {HistoryModel} from "../models/history.model";
import {UserModel} from "../models";

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

    async addActionsAvailable(actions: ActionProps|ActionProps[]): Promise<ActionDocument[]> {
        return ActionModel.insertMany(actions);
    }

    async addAction(action: ActionProps, userId: string): Promise<boolean> {
        const historyAction = new HistoryModel({
            userId: userId,
            action: action,
            date: new Date().toISOString()
        })

        const modified = await UserModel.updateOne({_id: userId}, {$push: {historique: historyAction}});
        return new Promise((resolve, reject) => {
            if (modified.modifiedCount === 1) {
                resolve(true);
            } else {
                reject(false);
            }
        })

    }

    async deleteAction(id: string) {
        const deletion = await ActionModel.deleteOne({_id: id});
        return deletion.deletedCount === 1
    }

}
