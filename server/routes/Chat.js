const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  accessChat,
  getAllChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chat");

router.route("/").post(protect, accessChat);
router.route("/").get(protect, getAllChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
