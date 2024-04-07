import { Router, Request, Response } from "express";
import { handleSignIn, isLoggedIn, login, updateDetails } from "../controllers/auth.controller";


const router = Router();

router.post('/signup', handleSignIn);
router.post('/login', login);

export default router;