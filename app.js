var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const products = require("./routes/products");
const brands = require("./routes/brands");
const singleproduct = require("./routes/singleproduct");
const customer = require("./routes/customer");
const emailRoutes = require("./routes/email");
const types = require("./routes/type");
const serverRouter = require("./payment/Server");

const mongoURI =
  process.env.MONGODB_URI ||
  "mongodb+srv://admin:1234@cluster0.cftvtvp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection successful"))
  .catch((err) => console.error(err));

var app = express();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// middleware setup
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

// routes setup
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", products);
app.use("/brands", brands);
app.use("/singleproduct", singleproduct);
app.use("/brands/:brandName", products);
app.use("/customer/", customer);
app.use("/email", emailRoutes);
app.use("/type", types);
app.use("/server-route", serverRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// general error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

app.listen(4242, () => console.log("App listening on port 4242!"));

module.exports = app;
