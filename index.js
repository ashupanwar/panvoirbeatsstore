const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require("cors");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth");
const trackRoute = require("./routes/track");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const drumkitRoute = require("./routes/drumkit");
const messageRoute = require("./routes/message");
const featuredRoute = require("./routes/featured");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DBConnection Successfull!");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());


app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/tracks", trackRoute);
app.use("/api/drumkits", drumkitRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/messages", messageRoute);
app.use("/api/featured", featuredRoute);


//Heroku
if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running");
})