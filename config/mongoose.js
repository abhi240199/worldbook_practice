const mongoose = require("mongoose");
const env = require("./environment");
mongoose.connect(
  "mongodb+srv://wbpractice:abhi@123@cluster0.ghnsc.mongodb.net/wbpractice?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;
