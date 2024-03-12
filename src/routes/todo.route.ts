import { Router } from "express";
import { protect } from "../middlewares/auth";
import {getTodos, postTodos, updateTodo, deleteTodo} from '../controllers/todo.controller'

const router = Router();
router.use(protect);

router.route('/').get(getTodos).post(postTodos);

router.route('/:todoId').patch(updateTodo).delete(deleteTodo)

export default router;