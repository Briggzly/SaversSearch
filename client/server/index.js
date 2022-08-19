const express = require("express");
const app = express();
const cors = require("cors");
const authorize = require("./middleware/authorize");
const path = require("path");
require("dotenv").config("./server");

// middleware
app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "./client/build")));

// routes
app.use("/", require("./routes/jwtAuth"));

app.use("/auth", require("./routes/jwtAuth"));

app.use(authorize);

// testing something

app.use("/dashboard", require("./routes/dashboard"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
