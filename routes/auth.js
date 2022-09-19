const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//custom error to help us manage different errors
class RouteError extends Error {
    constructor(msg, statusCode = 500) {
        super(msg);
        // define my own enumerable properties so they
        // will show up in JSON automatically
        this.error = msg;
        this.status = statusCode;
    }
}

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(err.status).json(err);
        console.log(err);
    }
})

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        //if user does not exist
        if (!user) {
            throw new RouteError("wrong username", 401);
        }

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        //if password is wrong
        if (OriginalPassword !== req.body.password) {
            throw new RouteError("Wrong credentials", 401);
        }


        //jwt token
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        //Don't send password in the response
        const { password, ...others } = user._doc;

        //if everything is okay then return user
        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(err.status).json(err);
        console.log(err);
    }
})


module.exports = router