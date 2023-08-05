/* Importing All Files */

const FlightSaveModel = require("../models/FlightSaveModel");
const API_KEY = process.env.AVIATION_STACK_API_KEY;
const API_URL = "https://test.api.amadeus.com/v1/shopping";
const axios = require("axios");

/* API Endpoint to fetch flight prices*/

module.exports.GetPrices = async (req, res) => {
  const { source, destination, date } = req.query;
  // Check if any required field is empty
  if (!source || !destination || !date) {
    return res.json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
     const response = await axios.get(
      `${API_URL}/flight-offers?originLocationCode=${source}&destinationLocationCode=${destination}&departureDate=${date}&apiKey=${API_KEY}`
    );
    // Process the response and extract the flight prices
    const flightPrices = response.data.data.map((flight) => ({
      airline: flight.offerItems[0].services[0].segments[0].flightSegment.carrierCode,
      price: flight.offerItems[0].price.total,
    }));
    return res.json({
      success: true,
      message: "Flight Fetched",
      flightPrices,
    });
  } catch (error) {
    console.log("Error In Fetching Flights Details", error);
    return res.json({
      success: false,
      message: "Inernal Server Error",
    });
  }
};

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
