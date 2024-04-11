require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const Routes = require("./routes");
const sequelize = require("./config/db");
const cors = require("cors");
const httpStatus = require("http-status");
const app = express();
const PORT = process.env.PORT;
const ApiError = require("./utils/ApiError");
const { errorConverter, errorHandler } = require("./middelwares/error");

app.use(bodyParser.json());

app.use("/", Routes);

app.use(cors());
app.options("*", cors());

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);
app.use(errorHandler);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server running on port " + PORT);
    });
  })
  .catch((error) => {
    console.error("Error dropping tables:", error);
  });
