/* Importing All Files */
const userModel = require("../models/UserModel");
const bcryptJs = require("bcryptjs");
const { generateJwtToken } = require("../config/JWT");

/* Creating User Account Function */
module.exports.CreateNewAccount = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.json({
      success: false,
      message: "Check Password And Confirm Password",
    });
  }
  //   securing password
  const hashedPassword = await bcryptJs.hash(password, 10);
  //   email valid
  const validEmail = email.toLowerCase();

  try {
    const user = await userModel.findOne({ email: validEmail });
    if (user) {
      return res.json({
        success: false,
        message: "User Already exists with this email",
      });
    }
    const newUser = await new userModel({
      email: validEmail,
      password: hashedPassword,
      name: name,
    });
    // saving details in db
    await newUser.save();
    return res.json({
      success: true,
      message: "Account Created Successfully",
    });
  } catch (error) {
    console.log("Error In Creting User", error);
    return res.json({
      success: false,
      message: "Inernal Server Error",
    });
  }
};

/* User Login Function*/
module.exports.LoginUser = async (req, res) => {
  const { email, password } = req.body;
  // Convert email to lowercase for case-insensitive comparison
  const validEmail = email.toLowerCase();
  try {
    // Check if the user exists
    const userExists = await userModel.findOne({ email: validEmail });
    if (!userExists) {
      return res.json({
        success: false,
        message:
          "User Email Not Found or User Does Not Exist,Please Create New Account",
      });
    }
    // Verify the password
    const passwordMatch = await bcryptJs.compare(password, userExists.password);
    if (!passwordMatch) {
      return res.json({
        success: false,
        message: "Incorrect Password Try Again !",
      });
    }
    // generate a token for authentication with expires Time
    const token = await generateJwtToken(
      userExists._id,
      userExists.email,
      userExists.name
    );
    // send success messagae with token
    return res.json({
      success: true,
      message: "Logged in successfull",
      token: token,
    });
  } catch (error) {
    console.log("Error In Login User", error);
    return res.json({
      success: false,
      message: "Inernal Server Error",
    });
  }
};
