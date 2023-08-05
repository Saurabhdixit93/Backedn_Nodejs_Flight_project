/* Importing Schema and model from mongoose */
const { Schema, model } = require("mongoose");

/* Defining Flight Schemaa*/
const flightSchema = new Schema(
  {
    source: {
      type: String,
      require: true,
    },
    destination: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
    airline: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  { timestamps: true }
);

/*Exporting FlighModel For Globle*/
module.exports = model("FlighModel", flightSchema);
