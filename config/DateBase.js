// import mongoose
const { connect, connection } = require("mongoose");

// Export for global use
module.exports.connectDB = async () => {
  try {
    // mongodb connection
    const con = await connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const isConntected = (await connection.readyState) === 1; // 1 = connected
    if (isConntected) {
      console.log(
        `MongoDB Database is connected Successfully and Database connection is active on :  ${con.connection.host}`
      );
    } else {
      console.log("Database connection is not active");
    }
  } catch (err) {
    process.exit(1);
  }
};
