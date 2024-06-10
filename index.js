require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const Routes = require("./routes");
const cors = require("cors");
const httpStatus = require("http-status");
const app = express();
const PORT = process.env.PORT;
const ApiError = require("./utils/ApiError");
const { errorConverter, errorHandler } = require("./middelwares/error");
const { default: mongoose } = require('mongoose');

app.use(bodyParser.json());

app.use("/", Routes);

app.use(cors());
app.options("*", cors());

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);
app.use(errorHandler);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`)
  })
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
