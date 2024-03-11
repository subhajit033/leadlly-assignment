import { Router, Request, Response } from "express";
import { handleSignIn, isLoggedIn } from "../controllers/auth.controller";

const router = Router();

router.post('/signup', handleSignIn);
router.get('/login', isLoggedIn);

export default router;