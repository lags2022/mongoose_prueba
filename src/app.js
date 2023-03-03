//seguda solucin para conectarse
require("./db/index_mongoose");
const express = require("express");
const cors = require("cors");
const Notes = require("./routes/notes");

// //primera solucin para conectarse
// const connectDB = require("./db/index_mongoose");
// connectDB()

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/notes", Notes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
