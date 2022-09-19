const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        tracks: { type: Array, required: true },
        quantity: { type: Number, required: true },
        total: { type: Number, required: true }

    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Cart", CartSchema);