const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    // console.log('token :>> ', token);
    if (token) {
      token = token.split(" ")[1];
      // console.log('SECRET_KEY :>> ', SECRET_KEY);
      // console.log("token >>:", token);
      return await jwt.verify(token, SECRET_KEY, (err, resp) => {
        if (err) {
          if (err?.message == "jwt expired") {
            // console.log("inside token expired if message");
            return res
              .status(200)
              .json({
                status: false,
                message: "token expired",
                tokenExpired: true,
              });
          } else {
            return res
              .status(200)
              .json({
                status: false,
                message: "Invalid Token",
                tokenExpired: false,
              });
          }
        } else {
            // console.log('resp :>> ', resp);
            
          req.userId = resp.id;
          next();
        }
      });
    } else {
      return res.status(403).json({ message: "Unauthorized User!" });
    }
  } catch (error) {
    console.log("Error in auth middleware -->", error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
module.exports = auth;
