import mongoose, {Document, Model, Schema} from "mongoose";
import {SessionProps} from "./session.model";
import {HistoryProps, historySchema} from "./history.model";
import {scoreCarboneHistoricProps, scoreCarboneHistoricSchema} from "./historicCarbonScore";

export const possibleRole:{[status:string]:string;}={
    "USER":'USER',
    "ADMIN": 'ADMIN',
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
        type: Schema.Types.String,
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
        type: historySchema,
        required: false
    }],
    nfc: {
        type: Schema.Types.String,
        required: false
    },
    photo: {
        type: Schema.Types.String,
        required: false
    },
    carbonScore: {
        type: Schema.Types.Number
    },
    historicCarbonScore: [{
        type: scoreCarboneHistoricSchema
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
    role: string;
    sessions: string[] | SessionProps[];
    score: number;
    historique: HistoryProps[]
    nfc: string
    photo: string;
    carbonScore: number;
    historicCarbonScore: scoreCarboneHistoricProps[];
}
export type UserDocument = UserProps & Document;
export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>("Users", userSchema, "Users");
