import mongoose from "mongoose";

const schema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },

}, { timestamps: true });

export default mongoose.model("Cart", schema);