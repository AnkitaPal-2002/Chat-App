import express from 'express';

const router = express.Router();
import { protectRoute } from '../../middleware/auth.middleware.js';

import { getAllUsers } from '../../controllers/user/users.controller.js';

router.get('/', protectRoute, getAllUsers);

export default router;