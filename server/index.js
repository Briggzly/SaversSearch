const express = require("express");
const app = express();
const cors = require("cors");
const authorize = require("./middleware/authorize");

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/', require('./routes/jwtAuth'))

app.use("/auth", require("./routes/jwtAuth"));

app.use(authorize)

app.use("/dashboard", require("./routes/dashboard"));


app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
