import { Schema, model } from 'mongoose';

const schema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    code: { type: String },
    title: { type: String },
    number: { type: String },
    description: { type: String },
    files: { type: Array },
    status: { type: String, default: "در حال بررسی" },
}, { toJSON: { virtuals: true } });
schema.virtual('User', {
    ref: 'User',
    localField: 'userID',
    foreignField: '_id',
});
export default model('Order', schema);