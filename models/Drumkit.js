const mongoose = require("mongoose");

const DrumkitSchema = new mongoose.Schema(
    {
        img: { type: String, required: true },
        kitname: { type: String, required: true, unique: true },
        producername: { type: String, required: true },
        desc: { type: String, required: true },
        contents: { type: Array, required: true },
        downloadlink: { type: String, required: true },
        price: { type: Number, required: true },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Drumkit", DrumkitSchema);