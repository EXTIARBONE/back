import mongoose, {Document, Model, Schema} from "mongoose";
import {SessionProps} from "./session.model";
import {ActionProps} from "./action.model";

const historySchema = new Schema({
    userId:  {
        Type: Schema.Types.ObjectId,
        required: true
    },
    action: {
        type: Schema.Types.Map,
        required: true,
    },
    date: {
        type: Schema.Types.Date,
        required: true,
        unique: true
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
