require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes =  require("./routes/user");
const userPost = require("./routes/post");
const userProfile = require("./routes/profile")

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);
app.use("/api",userRoutes);
app.use("/api",userPost);
app.use("/api",userProfile)

//app.use("/api/users", require("../Projectback/routes/user"))

//app.use("/api/profile", require("../Projectback/routes/profile"))
//app.use("/api/post", require("../Projectback/routes/post"))


//PORT
const port = process.env.PORT || 7000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
