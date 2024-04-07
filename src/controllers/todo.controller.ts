// import { PrismaClient } from '@prisma/client';
// import { Request, Response, NextFunction } from 'express';

// const { userDeTail } = new PrismaClient();

// interface AuthReq extends Request {
//   userId?: string;
// }

// const getTodos = async (req: AuthReq, res: Response) => {
//   try {
//     const todos = await todo.findMany({
//       where: {
//         userId: parseInt(req.userId!),
//       },
//       orderBy: {
//         createdAt: 'desc',
//       },
//     });
//     if (todos.length === 0) {
//       return res.status(404).json({
//         status: false,
//         message: 'No todos found',
//       });
//     }

//     res.status(200).json({
//       status: true,
//       todos,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: false,
//       message: 'Bad req',
//       err,
//     });
//   }
// };

// const postTodos = async (req: AuthReq, res: Response) => {
//   try {
//     const { description } = req.body;
//     const postedTodo = await todo.create({
//       data: {
//         userId: parseInt(req.userId!),
//         description,
//       },
//     });

//     res.status(201).json({
//       status: true,
//       todo: postedTodo,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: false,
//       err,
//     });
//   }
// };

// const updateTodo = async (req: AuthReq, res: Response) => {
//   try {
//     const updatedTodo = await todo.update({
//       ///thanks to typescrpit I am trying to update the todo of a specific userId, a user may have multiple userId that's why it is giving error to me , we have to specific todo id
//       where: {
//         id: parseInt(req.params.todoId!),
//       },
//       data: req.body,
//     });
//     res.status(200).json({
//       status: true,
//       todo: updatedTodo,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: false,
//       err,
//     });
//   }
// };

// const deleteTodo = async (req: AuthReq, res: Response) => {
//   try {
//     const deletedTodo = await todo.delete({
//       where: {
//         id: parseInt(req.params.todoId!),
//       },
//     });
//     res.status(204).json({
//       status: true,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: false,
//       err,
//     });
//   }
// };

// export { getTodos, postTodos, updateTodo, deleteTodo };
