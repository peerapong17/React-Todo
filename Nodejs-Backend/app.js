require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const route = require("./routes");
const cookieParser = require("cookie-parser");
const passportConfig = require("./passport/passportConfig");
const googleConfig = require("./passport/googleConfig");
const connectDB = require("./connection/db");
const jwtConfigs = require("./passport/jwtConfigs")

const app = express();

connectDB(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "Our little secret.",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("Our little secret."));
// middle-ware that initialises Passport
app.use(passport.initialize());
//middle-ware that alter the req object and change the 'user' value that is currently the session id (from the client cookie) into the true deserialized user object.
app.use(passport.session());
//Tell express to use session
passportConfig(passport);

jwtConfigs(passport)

googleConfig(passport);

app.use("/auth/google", route.google);

app.use("/auth", route.auth);

app.use("/todo", route.todo);

app.use("/reset-password", route.resetPassword);
