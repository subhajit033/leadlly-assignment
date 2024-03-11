import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { userDeTail } = new PrismaClient();

interface AuthReq extends Request {
  userId?: number;
}

const protect = async (req: AuthReq, res: Response, next: NextFunction) => {
  console.log(req.cookies);
  try {
    if (req?.cookies?.login) {
      // const verifyJwt = promisify(jwt.verify)
      const userId = (await jwt.verify(
        req.cookies.login,
        process.env.JWT_SEC!
      )) as JwtPayload;
      console.log(userId);
      const user = await userDeTail.findUnique({
        where: {
          id: userId.id,
        },
      });
      if (!user) {
        return res.status(404).json({
          status: false,
          message: 'No user found with this id',
        });
      }
      res.status(200).json({
        status: true,
        user,
      });
      req.userId = userId.id;
      next();
    } else {
      throw new Error('No cookies found at all');
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'No cookies found',
    });
  }
};
