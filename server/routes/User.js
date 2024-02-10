const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  getUserProfile,
  logoutUser,
} = require("../controllers/user");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers);
router.route("/login").post(authUser);
router.route("/logout").post(logoutUser);
router.route("/getUserProfile").get(getUserProfile);

module.exports = router;
