const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/myBook")
.then(() => console.log("DataBase connected"))
.catch(() => console.log("err.message"));