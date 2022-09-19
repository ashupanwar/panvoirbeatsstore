const Track = require("../models/Track");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();


//Create track
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newTrack = new Track(req.body);

    try {
        const savedTrack = await newTrack.save();
        res.status(200).json(savedTrack);
    } catch (err) {
        res.status(500).json(err);
    }
})


//Update track
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedtrack = await Track.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true }
        );
        res.status(200).json(updatedtrack);
    } catch (err) {
        res.status(500).json(err);
    }
})


//Delete Track
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Track.findByIdAndDelete(req.params.id);
        res.status(200).json("Track has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
})

//Get Track
router.get("/find/:id", async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);

        res.status(200).json(track);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Get related tracks
router.get("/related", async (req, res) => {

    const qTag = req.query.tag;

    let products;

    try {
        if (qTag) {
            //if qTag is in the tags of a product then return that track
            products = await Track.find({
                tags: { "$regex": qTag, '$options': 'i' },
            })
                .sort({ createdAt: -1 })
                .limit(10);
        } else {
            products = await Track.find()
                .sort({ createdAt: -1 })
                .limit(10);;
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }

})



//Get All tracks
router.get("/", async (req, res) => {

    const qNew = req.query.new;
    const qTag = req.query.tag;
    const qGenre = req.query.genre;
    const qBpm = req.query.bpm;
    const qPage = req.query.page;
    let qSearch = req.query.search;
    if (qSearch) {
        qSearch = qSearch.replace(/ /g, '');
    }
    try {
        let products;

        if (qNew) {
            //find the latest 10 tracks
            products = await Track.find().sort({ createdAt: -1 }).limit(10);
        } else if (qTag) {
            //if qTag is in the tags of a product then return that track
            products = await Track.find({
                tags: {
                    $in: [qTag],
                }
            })
        } else if (qGenre) {
            //if qGenre is in the genre array then return that track
            products = await Track.find({
                genre: {
                    $in: [qGenre],
                }
            })
        } else if (qBpm) {
            //if qBpm is same as bpm of the track then return that track
            products = await Track.find({
                bpm: {
                    $eq: qBpm,
                }
            })
        }
        else if (qSearch && qPage) {

            products = await Track.find({
                $or: [
                    { "trackname": { "$regex": qSearch, '$options': 'i' } },
                    { "tags": { "$regex": qSearch, '$options': 'i' } },
                    { "genre": { "$regex": qSearch, '$options': 'i' } },

                ]
            }).skip(qPage * 10).limit(10);
        }
        else if (qSearch) {
            products = await Track.find({
                $or: [
                    { "trackname": { "$regex": qSearch, '$options': 'i' } },
                    { "tags": { "$regex": qSearch, '$options': 'i' } },
                    { "genre": { "$regex": qSearch, '$options': 'i' } },

                ]
            });
        }
        else if (qPage) {
            //using skip method to make pages, each page contains 10 results
            products = await Track.find().sort({ createdAt: -1 }).skip(qPage * 10).limit(10);
        }

        else {
            products = await Track.find().sort({ createdAt: -1 });
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;