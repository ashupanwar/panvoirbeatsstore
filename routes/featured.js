const Featured = require("../models/Featured");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();


//Create Featured track
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newFeatured = new Featured(req.body);

    try {
        const savedFeatured = await newFeatured.save();
        res.status(200).json(savedFeatured);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Update Featured track
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedFeatured = await Featured.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true }
        );
        res.status(200).json(updatedFeatured);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Delete Featured
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Featured.findByIdAndDelete(req.params.id);
        res.status(200).json("Featured Track has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
})

//Get Featured
router.get("/find/:id", async (req, res) => {
    try {
        const featured = await Featured.findById(req.params.id);

        res.status(200).json(featured);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Get All Featured
router.get("/", async (req, res) => {

    const qTop = req.query.top;
    try {

        let products

        if (qTop) {
            //find the latest featured track
            products = await Featured.find().sort({ createdAt: -1 }).limit(1);
        } else {
            products = await Featured.find().sort({ createdAt: -1 });
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;