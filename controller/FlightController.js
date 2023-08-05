/* Importing All Files */

const FlightSaveModel = require("../models/FlightSaveModel");

/* Flight details Saving In User Specific*/
module.exports.SaveFlighDetails = async (req, res) => {
  const { userId } = req.params;
  const { source, destination, date, airline, price } = req.body;
  // Check if any required field is empty
  if (!source || !destination || !date || !airline || !price) {
    return res.json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    // Create a new Flight document and associate it with the current user's ID
    const newFlight = await new FlightSaveModel({
      source,
      destination,
      date,
      airline,
      price,
      user: userId,
    });
    /* Check If All Correct*/
    if (!newFlight) {
      return res.json({
        success: false,
        message: "Something went wrong",
      });
    }

    /*Save Details*/
    await newFlight.save();

    /*Return Success response*/
    return res.json({
      success: true,
      message: "Details Saved SuccessFully",
    });
  } catch (error) {
    console.log("Error In Saving Details", error);
    return res.json({
      success: false,
      message: "Inernal Server Error",
    });
  }
};

/*Get All Saved Flights*/
module.exports.GetFlights = async (req, res) => {
  const { userId } = req.params;
  try {
    /*  find all flights with userId */
    const flights = await FlightSaveModel.findById(userId);
    if (!flights) {
      return res.json({
        success: false,
        message: "Flights Not Found",
      });
    }
    return res.json({
      success: true,
      message: "Flights Fetched",
      flights,
    });
  } catch (error) {
    console.log("Error In Getting Details", error);
    return res.json({
      success: false,
      message: "Inernal Server Error",
    });
  }
};
