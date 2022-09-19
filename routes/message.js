const Message = require("../models/Message");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();


//Create message
router.post("/", async (req, res) => {
    const newMessage = new Message(req.body);

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
})


//Delete Message
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.status(200).json("Message has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
})

//Get Message
router.get("/find/:id", async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        res.status(200).json(message);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Get All drumkits
router.get("/", async (req, res) => {

    try {

        let products = await Drumkit.find().sort({ createdAt: -1 });

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;