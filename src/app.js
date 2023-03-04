//seguda solucin para conectarse
require("./db/index_mongoose");
const express = require("express");
const cors = require("cors");
const Notes = require("./routes/notes");
const notFound = require("./routes/error/notFound");

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

app.use(notFound);

module.exports = app;
