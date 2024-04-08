import { Router } from 'express';
import { protect } from '../middlewares/auth';
import { getPdts, createProduct } from '../controllers/product.controller';

const router = Router();


router.route('/').get(getPdts).post(protect,  createProduct);

// router.route('/:todoId').patch(updateTodo).delete(deleteTodo)

export default router;
