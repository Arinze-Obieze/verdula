// models/Payment.js
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    address: { type: String, required: true },
    reference: { type: String, required: true },
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
