// Importing jwt and secret ket
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

// export the generateToken function
module.exports.generateJwtToken = async (userId, name, email) => {
  return await jwt.sign({ userId, name, email }, secretKey, {
    expiresIn: "24h",
  });
};
