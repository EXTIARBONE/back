import mongoose, {Document, Model, Schema} from "mongoose";
import {ActionProps, actionSchema} from "./action.model";

export const historySchema = new Schema({
    userId:  {
        Type: Schema.Types.ObjectId
    },
    action: {
        type: actionSchema
    },
    date: {
        type: Schema.Types.Date
    },
}, {
    collection: "history",
    timestamps: true,
    versionKey: false
});

export interface HistoryProps {
    userId: string;
    action: ActionProps;
    date: Date;
}

export type HistoryDocument = HistoryProps & Document;
export const HistoryModel: Model<HistoryDocument> = mongoose.model<HistoryDocument>("History", historySchema);
