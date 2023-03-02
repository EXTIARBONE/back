import mongoose, {Document, Model, Schema} from "mongoose";
import {SessionProps} from "./session.model";

const rewardAvaiSchema = new Schema({
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
export const rewardAvaiModel: Model<RewardAvailableDocument> = mongoose.model<RewardAvailableDocument>("Reward Available", rewardAvaiSchema);
