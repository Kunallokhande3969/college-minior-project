const mongoose = require("mongoose");

async function mydb() {

  await mongoose.connect("mongodb://localhost:27017/mydb");
  console.log("mogodb connected");

}

mydb();


module.exports = mongoose.connection;

