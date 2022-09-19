const mongoose = require("mongoose");

const FeaturedSchema = new mongoose.Schema(
    {
        trackId: { type: String, required: true },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Featured", FeaturedSchema);