import { Router, Request, Response } from 'express';
import {
  handleSignIn,
  isLoggedIn,
  login,
  updateDetails,
  logout
} from '../controllers/auth.controller';
import { protect } from '../middlewares/auth';

const router = Router();

router.post('/signup', handleSignIn);
router.post('/login', login);
router.get('/logout', logout);
router.patch('/updateme', protect, updateDetails);

export default router;
