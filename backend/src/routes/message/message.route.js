import express from "express";
import { protectRoute } from "../../middleware/auth.middleware";
import { sendMessages, getUsersForSideBar, getMessages } from "../../controllers/messages/messages.controller";

const router = express.Router();

router.get("/allUsers", protectRoute, getUsersForSideBar);
router.get("/:id", protectRoute, getMessages);

router.post("/send-message/:id", sendMessages);

export default router;