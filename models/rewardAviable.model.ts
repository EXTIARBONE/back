import mongoose, {Document, Model, Schema} from "mongoose";
import {SessionProps} from "./session.model";

const actionSchema = new Schema({
    gift: {
        type: Schema.Types.String,
        required: false
    },
    title: {
        type: Schema.Types.Number,
        required: false,
    },

}, {
    collection: "rewardAvailable",
    timestamps: true,
    versionKey: false
});

export interface RewardAvailableProps {
    gift: number;
    title: string;
}

export type RewardAvailableDocument = RewardAvailableProps & Document;
export const ActionModel: Model<RewardAvailableDocument> = mongoose.model<RewardAvailableDocument>("Reward Available", actionSchema);
