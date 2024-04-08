import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const { product, user } = new PrismaClient();

interface AuthReq extends Request {
  userId?: string;
}

const getPdts = async (req: AuthReq, res: Response) => {
  try {
    const products = await product.findMany();
    if (products.length === 0) {
      return res.status(404).json({
        status: false,
        message: 'No Products found',
      });
    }

    res.status(200).json({
      status: true,
      products,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: 'Bad req',
      err,
    });
  }
};

const createProduct = async (req: AuthReq, res: Response) => {
  try {
    const pdtDetail = { ...req.body, userId: req.userId! };
    const newpdt = await product.create({
      data: pdtDetail,
    });

    res.status(201).json({
      status: true,
      pdt: newpdt,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      err,
    });
  }
};


export { getPdts, createProduct,};
