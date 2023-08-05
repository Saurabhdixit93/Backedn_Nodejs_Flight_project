/* Importing All Files */
const { Router } = require("express");
const router = Router();
/* User Controller */
const { CreateNewAccount, LoginUser } = require("../controller/UserController");

/*User Routes Handle*/
router.post("/sign_up", CreateNewAccount);
router.post("/login", LoginUser);

module.exports = router;
