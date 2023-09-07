const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

//@desc Register new User
//@route Post/api/users
//@access Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      status: false,
      error: {
        message: "Plese add all fields",
      },
    });
  }

  try {
    //Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        status: false,
        error: {
          message: "User alrady exits",
        },
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //Create user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    // Save new user to the database
    const savedUser = await newUser.save();

    return res.status(201).json({
      status: true,
      user: savedUser,
      success: {
        message: "Successfully registered a new user!",
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to register a new user!",
      },
    });
  }
};

//@desc Authenticate new User
//@route Post/api/users/login
//@access Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //check for user email
    const user = await User.findOne({ email });
    //check for user
    if (!user) {
      return res.status(400).json({
        status: false,
        error: { message: "User not found for the giving credentials!" },
      });
    }
    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const userToken = generateToken(user._id);

      return res.status(201).json({
        status: true,
        user: { _id: user.id, name: user.name, token: userToken },
        success: {
          message: "Successfully logged a new user!",
        },
      });
    } else {
      return res.status(400).json({
        status: false,
        error: { message: "Invalid credentials!" },
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to logged in the user!",
      },
    });
  }
};

//@desc Get user data
//@route Get/api/users/me
//@access Privet
const getMe = async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
};

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
