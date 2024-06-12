const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/users.routes.js");
const uploadRoutes = require("./routes/upload.routes.js")

const multer = require("multer");
const path = require("path");
const cors = require('cors');

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));

app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
console.log('images path',path.join(__dirname, "/images"))

const DBURL = process.env.DATABASE_URL
console.log("dbutl", DBURL);
mongoose
  .connect(DBURL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));



app.use("/public", express.static(path.join(__dirname, 'public')));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use('/api/upload', uploadRoutes);



app.listen(process.env.PORT || "6200", () => {
  console.log("Backend is running.", process.env.PORT || "6200");
});
