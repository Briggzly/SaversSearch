const express = require("express");
const app = express();
const cors = require("cors");
const authorize = require("./middleware/authorize");
const path = require("path")

// middleware
app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../build')))

// routes
app.use('/', require('./routes/jwtAuth'))

app.use("/auth", require("./routes/jwtAuth"));

app.use(authorize)

app.use("/dashboard", require("./routes/dashboard"));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
})


const {PORT} = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
