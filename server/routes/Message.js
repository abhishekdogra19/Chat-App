const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  sendMessageController,
  AllMessagesController,
} = require("../controllers/message");
const router = express.Router();

router.route("/").post(protect, sendMessageController);
router.route("/:chatId").get(protect, AllMessagesController);

module.exports = router;
