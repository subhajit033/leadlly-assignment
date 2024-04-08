import { Router, Request, Response } from 'express';
import {
  handleSignIn,
  isLoggedIn,
  login,
  updateDetails,
} from '../controllers/auth.controller';
import { protect } from '../middlewares/auth';

const router = Router();

router.post('/signup', handleSignIn);
router.post('/login', login);
router.patch('/updateme', protect, updateDetails);

export default router;
