import mongoose, {Document, Model, Schema} from "mongoose";


export const scoreCarboneHistoricSchema = new Schema({
    score: {
        type: Schema.Types.Number,
        required: true
    },
    date: {
        type: Schema.Types.Date,
        required: true,
    },
}, {
    collection: "coffees",
    timestamps: true,
    versionKey: false
});

export interface scoreCarboneHistoricProps {
    score: number;
    date: Date;
}
export type ScoreCaboneHistoricDocument = scoreCarboneHistoricProps & Document;

export const scoreCarboneHistoricSchemaModel: Model<ScoreCaboneHistoricDocument> = mongoose.model<ScoreCaboneHistoricDocument>("scoreCarboneHistoric", scoreCarboneHistoricSchema);
