/* Importing All Files */
const { Router } = require("express");
const router = Router();
/*Flight Controller*/
const {
  SaveFlighDetails,
  GetFlights,
  GetPrices,
} = require("../controller/FlightController");

/*Router For Saving Details*/
router.post("/save-details/:userId", SaveFlighDetails);
/*Router For Getting All saved list*/
router.get("/get-flights/:userId", GetFlights);

/*Get Price Routes */
router.get("/get-price", GetPrices);
module.exports = router;
