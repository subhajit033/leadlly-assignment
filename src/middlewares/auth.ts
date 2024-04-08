import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { user } = new PrismaClient();

interface AuthReq extends Request {
  userId?: string;
}

const protect = async (req: AuthReq, res: Response, next: NextFunction) => {
  if (!req?.cookies?.login) {
    return res.status(403).json({
      status: false,
      message: 'You need to be logged in to perform this in action',
    });
  }

  try {
    if (req?.cookies?.login) {
      //we want explicitly return of jwtpayload
      const userId = (await jwt.verify(
        req.cookies.login,
        process.env.JWT_SEC!
      )) as JwtPayload;
      console.log(userId);
      const userDetail = await user.findUnique({
        where: {
          id: userId.id,
        },
      });

      console.log('userDetail');
      if (!userDetail) {
        return res.status(403).json({
          status: false,
          message: 'Forbidden access',
        });
      }

      req.userId = userId.id;
    } else {
      throw new Error('No cookies found at all');
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: 'No cookies found',
    });
  }
  next();
};

export { protect };
