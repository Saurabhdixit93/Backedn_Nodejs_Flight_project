/* Importing Schema and model from mongoose */
const { Schema, model } = require("mongoose");

/* Defining User Schemaa*/
const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

/*Exporting UserModel For Globle*/
module.exports = model("UserModel", userSchema);
