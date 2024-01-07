import { Schema, model } from 'mongoose';

const schema = new Schema({
    mobile: { type: String, required: true },
    fullName: { type: String },
    phone: { type: String },
    email: { type: String },
    image: { type: String },
    type: { type: String, default: 'user' },
    token: { type: String },
});
export default model('User', schema);
