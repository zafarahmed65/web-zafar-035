const mongoose = require("mongoose");
const bcrypt = require ('bcrypt');
let modelSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role:{
    type:String,
    default:"user"
  }
});
modelSchema.methods.generateHashedPassword = async function () {
  let salt = await bcrypt.genSalt (10);
  this.password = await bcrypt.hash (this.password, salt);
};

let Model = mongoose.model("User", modelSchema);
module.exports = Model;
