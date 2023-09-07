const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv").config();

const connectDB = require("./config/db");

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/company", require("./routes/companyRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  connectDB()
    .then(() => console.log("Connected to DB!"))
    .catch((err) => console.log(err));
});
