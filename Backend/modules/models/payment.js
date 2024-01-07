import { Schema, model } from 'mongoose';

const schema = new Schema({
    userID: { type: Schema.ObjectId, ref: 'user' },
    resNumber: { type: String, },//شناسه پرداخت
    price: { type: Number },//پول شارژ
    statusPayment: { type: String, default: 'ناموفق' },//وضعیت تراکنش
    date: { type: String, },//تاریخ
    time: { type: String, },//ساعت
    refID: { type: String },//شماره تراکنش
});
export default model('Payment', schema);
