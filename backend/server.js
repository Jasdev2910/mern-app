const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const userRouter = require("./routes/userRoute");
const cors = require("cors");
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(process.env.PORT || 8000, (error) => {
      if (error) {
        console.log(error);
      }
      console.log("server is running successfully at port ", process.env.PORT);
    });
  })
  .catch((e) => {
    console.log("error", e);
  });

app.use(userRouter);
