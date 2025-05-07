import express from "express";
import { registerUser, loginUser, logoutUser, updateProfile, checkAuth } from "../../controllers/user/user.controller.js";
import { protectRoute } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.put('/update-profile', protectRoute, updateProfile);

router.get('/check-auth', protectRoute, checkAuth);



export default router;