const Drumkit = require("../models/Drumkit");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();


//Create drumkit
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newDrumkit = new Drumkit(req.body);

    try {
        const savedDrumkit = await newDrumkit.save();
        res.status(200).json(savedDrumkit);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Update Drumkit
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedDrumkit = await Drumkit.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true }
        );
        res.status(200).json(updatedDrumkit);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Delete Drumkit
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Drumkit.findByIdAndDelete(req.params.id);
        res.status(200).json("Drumkit has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
})

//Get Drumkit
router.get("/find/:id", async (req, res) => {
    try {
        const drumkit = await Drumkit.findById(req.params.id);

        res.status(200).json(drumkit);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Get All drumkits
router.get("/", async (req, res) => {

    const qNew = req.query.new;
    try {

        let products

        if (qNew) {
            //find the latest 4 drumkits
            products = await Drumkit.find().sort({ createdAt: -1 }).limit(4);
        } else {
            products = await Drumkit.find().sort({ createdAt: -1 });
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;