import { Router, Request, Response } from "express";
import { handleSignIn } from "../controllers/auth.controller";

const router = Router();

router.post('/signup', handleSignIn);

export default router;