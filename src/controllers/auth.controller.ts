import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { promisify } from 'util';
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

export { handleSignIn, isLoggedIn };
