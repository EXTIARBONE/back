import mongoose, {Document, Model, Schema} from "mongoose";
import {SessionProps} from "./session.model";
import {HistoryModel, HistoryProps} from "./history.model";

export enum Role {
    USER,
    ADMIN
}

const userSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    surname: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    mail: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    role: {
        type: Role,
        required: true
    },
    sessions: [{
        type: Schema.Types.ObjectId,
        ref: "Session"
    }],
    score:{
        type: Schema.Types.Number,
        required: false
    },
    historique: [{
        type: HistoryModel
    }]
}, {
    collection: "users",
    timestamps: true,
    versionKey: false
});

export interface UserProps {
    name: string;
    surname: string;
    mail: string;
    password: string;
    role: Role;
    sessions: string[];
    score: number;
    historique: HistoryProps[]

}

export type UserDocument = UserProps & Document;
export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>("User", userSchema);
