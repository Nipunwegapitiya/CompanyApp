const express = require("express");
const router = express.Router();
const {
  getAllCompanies,
  getAllCompanyNames,
  createCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");

// Import authentication middleware for protecting routes
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getAllCompanies).post(protect, createCompany);
router.get("/names", getAllCompanyNames);
router.route("/:id").put(protect, updateCompany).delete(protect, deleteCompany);

module.exports = router;
