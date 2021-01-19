const mongoose = require("mongoose");


mongoose
.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
.then(() => {
  console.log("Connected to database 🟢");
})
.catch((error) => {
  console.log("Could not connect to database 🔴");
});