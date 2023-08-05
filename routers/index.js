/* Importing All Files */
const { Router } = require("express");
const router = Router();
const UserRoutes = require("./UserRoutes");
const FlighRoutes = require("./FlightRoutes");

/* FlighRoutes Handle*/
router.use("/flight", FlighRoutes);

/* UserRoutes Handle*/
router.use("/user", UserRoutes);

/* Exporting Globale Route*/
module.exports = router;
