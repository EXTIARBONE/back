import mongoose, {Document, Model, Schema} from "mongoose";
import {SessionProps} from "./session.model";

const rewardSchema = new Schema({
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
    collection: "rewardUser",
    timestamps: true,
    versionKey: false
});

export interface RewardUserProps {
    userId: string;
    amount: number;
    title: string;
}

export type RewardUserDocument = RewardUserProps & Document;
export const rewardModel: Model<RewardUserDocument> = mongoose.model<RewardUserDocument>("Reward", rewardSchema);
