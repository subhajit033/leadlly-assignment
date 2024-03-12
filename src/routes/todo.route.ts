import { Router } from "express";
import { protect } from "../middlewares/auth";
import {getTodos, postTodos} from '../controllers/todo.controller'

const router = Router();

router.route('/').get(protect, getTodos).post(protect, postTodos);

export default router;