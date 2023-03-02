import mongoose, {Document, Model, Schema} from "mongoose";

export const PossibleAction:{[status:string]:string;}={
    "JOURNEY":'JOURNEY',
    "MEAL": 'MEAL',
    "EVENT": 'EVENT'
}

export const actionSchema = new Schema({
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
        type: Schema.Types.String,
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
    actionType: string;
}

export type ActionDocument = ActionProps & Document;
export const ActionModel: Model<ActionDocument> = mongoose.model<ActionDocument>("Action", actionSchema);
