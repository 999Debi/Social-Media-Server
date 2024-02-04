require("dotenv").config();

require("express-async-errors");



// npm package
const helmet = require("helmet");
const cors = require("cors");
const multer = require("multer");
const morgan = require("morgan");
const bodyparser = require("body-parser");

const path=require("path");
const express = require("express");
const app = express();

const connectDB = require("./db/connect");

//router import
const authrouter = require("./routes/auth");
const userrouter = require("./routes/users");
const postrouter = require("./routes/posts");

//controlers import
const { createpost } = require("./controler/posts");
const { Register } = require("./controler/auth");
const { updatePic } = require("./controler/user");

//middleware 
const verifytoken = require("./middleware/auth");
const errorHandlerMiddleware =require('./middleware/error-handler');
const notFoundMiddleware=require('./middleware/not-found')

// extra packages
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); 

app.use(morgan("common"));
app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// var publicDir = path.join(__dirname, "/public");
// app.use(express.static(publicDir));
// app.use(express.static(path.join(__dirname, "./clients/build")));

//file storag
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });




//  Routes with files
app.post("/auth/register", upload.single("picture"), Register);
app.post("/user/updatepic", verifytoken, upload.single("picture"), updatePic);

app.post("/posts", verifytoken, upload.single("picture"), createpost);

//Routes
app.use("/auth", authrouter);
app.use("/users", userrouter);
app.use("/posts", postrouter);


app.get("/", function (request, response) {
  response.send("hello");
});


app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
