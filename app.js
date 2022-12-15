const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");


app.use(cors());

// includes
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

// router include
const userRoute = require("./app/routes/route.user");
const categoryRoute = require("./app/routes/route.category");
const authRoute = require("./app/routes/route.auth");

const verifyJwt = require("./app/middleware/verifyJWT");


mongoose.set("strictQuery", false);

// connect to database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// mongoose connection object
const db = mongoose.connection;

// set up an event listener that will fire once the connection opens for the database
// console.log what host and port we are on
db.once("open", () => {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

app.use("/api", authRoute);
app.use("/api/user", userRoute);

// protected routes
// app.use(verifyJwt);
app.use("/api/category", categoryRoute);

// app listen
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
