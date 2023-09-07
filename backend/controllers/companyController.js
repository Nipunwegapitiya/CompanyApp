const Company = require("../models/companyModel");

// @desc Get all companies
//@route Get /api/company
//access Privet
const getAllCompanies = async (req, res) => {
  const company = await Company.find({ user: req.user.id });
  res.status(200).json(company);
};

// @desc Get All company  name
//@route Get /api/company/names
//access Public
const getAllCompanyNames = async (req, res) => {
  const company = await Company.find();
  const companyNames = company.map((item) => ({ name: item.name }));

  return res.status(200).json(companyNames);
};

// @desc Create New company
//@route Set /api/company
//access Privet
const createCompany = async (req, res) => {
  const { name, email, phoneNumber, foundedYear } = req.body;

  if (!name || !email || !phoneNumber || !foundedYear) {
    return res.status(400).json({
      status: false,
      error: { message: "Plese add all fields" },
    });
  }

  try {
    //Check if company exists
    const companyExists = await Company.findOne({ name });

    if (companyExists) {
      return res.status(400).json({
        status: false,
        error: { message: "company alrady exits" },
      });
    }

    //Create Company
    const company = await Company.create({
      user: req.user.id,
      name,
      email,
      phoneNumber,
      foundedYear,
    });

    if (company) {
      return res.status(201).json({
        status: true,
        success: {
          message: "Successfully added a new company!",
        },
      });
    } else {
      return res.status(400).json({
        status: false,
        error: { message: "Invalid user data" },
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: { message: "Internal Server error" },
    });
  }
};

// @desc Update company
//@route Put /api/company/id
//access Privet
const updateCompany = async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    return res.status(400).json({
      status: false,
      error: { message: "Company not found" },
    });
  }

  //Check for user
  if (!req.user) {
    return res.status(403).json({
      status: false,
      error: { message: "User not found" },
    });
  }

  //Make usre the logged in user maches the Company user
  if (company.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      status: false,
      error: { message: "User not authorized" },
    });
  }

  const updateCompany = await Company.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  return res.status(200).json({
    status: true,
    success: { message: "company updated" },
  });
};

// @desc Delete  company
//@route Delete /api/company/id
//access Privet
const deleteCompany = async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    return res.status(400).json({
      status: false,
      error: { message: "Company not found" },
    });
  }

  //Check for user
  if (!req.user) {
    return res.status(403).json({
      status: false,
      error: { message: "User not found" },
    });
  }

  //Make usre the logged in user maches the Company user
  if (company.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      status: false,
      error: { message: "User not authorized" },
    });
  }

  await company.deleteOne();
  return res.status(200).json({
    status: true,
    success: { message: "company deleted" },
  });
};

module.exports = {
  getAllCompanies,
  getAllCompanyNames,
  createCompany,
  updateCompany,
  deleteCompany,
};
