import { Schema, model } from 'mongoose';

const schema = new Schema({
    times: [{ time: String, status: Boolean }],
    date: { type: String, required: true },
    closed: { type: Boolean, default: false }
}, { timestamps: true });
export default model('Plan', schema);
