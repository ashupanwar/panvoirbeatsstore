const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema(
    {
        img: { type: String, required: true },
        trackname: { type: String, required: true, unique: true },
        producername: { type: String, required: true },
        desc: { type: String, required: true },
        bpm: { type: Number, required: true },
        key: { type: String, required: true },
        trackduration: { type: String, required: true },
        uploaddate: { type: String, required: true },
        mp3: { type: String, required: true },
        wav: { type: String, required: true },
        stems: { type: String, required: true },
        tags: { type: Array, required: true },
        genre: { type: Array, required: true },
        nonprofitprice: { type: Number, required: true },
        basicprice: { type: Number, required: true },
        professionalprice: { type: Number, required: true },
        unlimitedprice: { type: Number, required: true },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Track", TrackSchema);