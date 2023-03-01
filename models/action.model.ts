import mongoose, {Document, Model, Schema} from "mongoose";
import {SessionProps} from "./session.model";


export enum PossibleAction {
    JOURNEY,
    MEAL,
    EVENT
}

const actionSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true,
    },
    description: {
        type: Schema.Types.String,
        required: false
    },
    amoutToWin: {
        type: Schema.Types.Number,
        required: false,
    },
    actionType: {
        type: PossibleAction,
        required: true,
    },

}, {
    collection: "action",
    timestamps: true,
    versionKey: false
});

export interface ActionProps {
    title: string;
    description: string;
    amountToWin: number;
    actionType: PossibleAction;
}

export type ActionDocument = ActionProps & Document;
export const ActionModel: Model<ActionDocument> = mongoose.model<ActionDocument>("Action", actionSchema);
