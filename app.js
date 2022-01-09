require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const debug = require("debug")("app");
const session = require("express-session");
const uuid = require("uuid");
const MongoStore = require("connect-mongo");
const cors = require("cors");

//Import the mongoose module
const mongoose = require("mongoose");

//Set up default mongoose connection
const mongoURL = process.env.DEV_DB || process.env.PRO_DB;
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
debug("DATABASE_CONNECTION: ON");

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Initialize app
const app = express();
const corsOptions = {
  origin: [
    "http://localhost:3000/callback",
    "http://localhost:3000",
  ],
  credentials: true,
  preflightContinue: true,
  origin:true,
};

// Session
const mongoStore = MongoStore.create({
  dbName: "dev_db",
  mongoUrl: mongoURL,
  collectionName: "sessions",
});

app.set("trust proxy", 1);
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    genid: function (req) {
      return uuid.v4(); // use UUIDs for session IDs
    },
    resave: false,
    saveUninitialized: true,
    //Same as spotify token: 1 hour
    cookie: { secure: false, maxAge: 3600000 },
    store: mongoStore,
  })
);

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users_rout");
const dataRouter = require("./routes/data_rout");
const playerRouter = require("./routes/player_rout");
const dbRouter = require("./routes/db_rout");

//app.use(cookieParser())

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/v1", indexRouter);
app.use("/v1/data", dataRouter);
app.use("/v1/users", usersRouter);
app.use("/v1/player", playerRouter);
app.use("/v1/db", dbRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
