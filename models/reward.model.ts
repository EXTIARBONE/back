import mongoose, {Document, Model, Schema} from "mongoose";
import {SessionProps} from "./session.model";

const actionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    amount: {
        type: Schema.Types.String,
        required: false
    },
    title: {
        type: Schema.Types.Number,
        required: false,
    },

}, {
    collection: "reward",
    timestamps: true,
    versionKey: false
});

export interface ActionProps {
    userId: string;
    amount: number;
    title: string;
}

export type ActionDocument = ActionProps & Document;
export const ActionModel: Model<ActionDocument> = mongoose.model<ActionDocument>("Action", actionSchema);
