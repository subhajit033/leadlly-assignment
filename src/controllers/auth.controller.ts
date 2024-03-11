import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { userDeTail } = new PrismaClient();

const craeteAndSendToken = (userId: number, res: Response, user: Object) => {
  const sec: string = process.env.JWT_SEC || 'hi I am Subhajit';
  const token = jwt.sign({ id: userId }, sec, {
    expiresIn: process.env.JWT_EXPIRE_TIME || '1d',
  });

  const cookieOptions = {
    //in expires is saved as date in config file so we have to convert it into a mili second
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN!) * 24 * 60 * 60 * 1000
    ),

    httpOnly: true,
  };
  res.cookie('login', token, cookieOptions);
  res.status(200).json({
    status: true,
    token,
    user,
  });
};

const handleSignIn = async (req: Request, res: Response) => {
  const { firstName, lastName, email } = req.body;

  try {
    const user = await userDeTail.create({
      data: {
        firstName,
        lastName,
        email,
      },
    });
    craeteAndSendToken(user.id, res, user);
  } catch (err) {
    res.status(400).json({
      status: false,
      message: 'Error while sign in ' + err,
    });
  }
};

const isLoggedIn = async (req: Request, res: Response) => {
  try {
    if (req?.cookies?.login) {
      const userId = jwt.verify(
        req.cookies.login,
        process.env.JWT_SEC!
      ) as string;
      const user = await userDeTail.findUnique({
        where: {
          id: parseInt(userId),
        },
      });
    } else {
      throw new Error('No cookies found at all');
    }
  } catch (error) {
    res.status(404).json({
      status: true,
      message: 'No cookies found',
    });
  }
};

export { handleSignIn };
