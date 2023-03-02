import mongoose, {Document, Model, Schema} from "mongoose";
import {SessionProps} from "./session.model";
import {HistoryModel, HistoryProps, historySchema} from "./history.model";

export const possibleRole:{[status:string]:string;}={
    "USER":'USER',
    "ADMIN": 'ADMIN',
}

const userSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    surname: {
        type: Schema.Types.String,
        required: true
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
        type: String,
        enum: ['USER', "ADMIN"],
        required: true
    },
    sessions: [{
        type: Schema.Types.ObjectId,
        ref: "Session",
        required: false
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
        type: Schema.Types.Array,
        required: false
    }
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
    nfc: {type: Schema.Types.Array}
}

export type UserDocument = UserProps & Document;
export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>("Users", userSchema, "Users");
