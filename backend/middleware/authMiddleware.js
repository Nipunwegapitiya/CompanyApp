const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;
  if (req.headers.token !== "") {
    try {
      //Get token from header
      token = req.headers.token.split(" ")[1];

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({
        status: false,
        error: { message: "Not authorized" },
      });
    }
  }

  if (!token) {
    return res.status(403).json({
      status: false,
      error: { message: "Not authorized,no token" },
    });
  }
};

module.exports = { protect };
