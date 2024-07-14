import express from 'express';

import { UserControllers } from './user.controller';

const router = express.Router();

router.get('/', UserControllers.getAllUsers);
router.get('/:id', UserControllers.getSingleUser);

export const UserRoutes = router;
