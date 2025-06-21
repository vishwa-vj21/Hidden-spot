const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const spotRoutes = require("./routes/spots");

const fileUpload = require("express-fileupload");
app.use(fileUpload());

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/spots", spotRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error(err));
