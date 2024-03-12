import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const { userDeTail, todo } = new PrismaClient();

interface AuthReq extends Request {
  userId?: string;
}

const getTodos = async (req: AuthReq, res: Response) => {
  try {
    const todos = await todo.findMany({
      where: {
        userId: parseInt(req.userId!),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (todos.length === 0) {
      return res.status(404).json({
        status: false,
        message: 'No todos found',
      });
    }

    res.status(200).json({
      status: true,
      todos,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: 'Bad req',
      err,
    });
  }
};

const postTodos = async (req: AuthReq, res: Response) => {
  try {
    const { description } = req.body;
    const postedTodo = await todo.create({
      data: {
        userId: parseInt(req.userId!),
        description,
      },
    });

    res.status(200).json({
      status: true,
      todo: postedTodo,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      err,
    });
  }
};

const updateTodo = async (req: AuthReq, res: Response) => {
  const updatedTodo = await todo.update({
    where: {
      userId: parseInt(req.userId!),
    },
    data: req.body,
  });
};

export { getTodos, postTodos };
