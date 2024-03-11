import { Request, Response } from 'express';
import { PrismaClient } from 'prisma/prisma-client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

const craeteAndSendToken = (userId: number)=>{

}

const handleSignIn = async (req: Request, res: Response) => {
  const { userDeTail } = new PrismaClient();
  const { firstName, lastName, email } = req.body();

  try {
    const user = await userDeTail.create({
      data: {
        firstName,
        lastName,
        email,
      },
    });
    res.status(200).json({
      status: true,
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: 'Error while sign in',
    });
  }
};
