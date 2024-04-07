import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

const { user } = new PrismaClient();

const craeteAndSendToken = (userId: string, res: Response, user: Object) => {
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
  const { email, name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const userData = await user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    craeteAndSendToken(userData.id, res, user);
  } catch (err) {
    res.status(400).json({
      status: false,
      message: 'Error while sign in ' + err,
    });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body();
  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: 'Kindly enter email and password',
    });
  }
  try {
    const userDetail = await user.findUnique({
      where: {
        email,
      },
    });

    if (!userDetail || !(await bcrypt.compare(password, userDetail.password))) {
      return res.status(400).json({
        status: false,
        message: 'Incorrect Email or Password',
      });
    }
    craeteAndSendToken(userDetail.id, res, userDetail);
  } catch (e: any) {
    res.status(400).json({
      status: false,
      message: e.message,
    });
  }
};

const filterObj = (obj: { [key: string]: any }, ...allowedField: string[]) => {
  const newObj: { [key: string]: any } = {};
  Object.keys(obj).forEach((el) => {
    if (allowedField.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const updateDetails = async (req: Request, res: Response) => {
  //we are not udating password by this method for security reason
  const filteredData: { [key: string]: any } = filterObj(
    req.body,
    'name',
    'email'
  );

  if (!req?.cookies?.login) {
    return res.status(403).json({
      status: false,
      message: 'You need to be logged in to update data',
    });
  }

  try {
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
    if (!userDetail) {
      return res.status(403).json({
        status: false,
        message: 'Forbidden access',
      });
    }
    const UpdatedData = await user.update({
      where: {
        email: filteredData.email,
      },
      data: filteredData,
    });
  } catch (e: any) {
    res.status(400).json({
      status: false,
      message: e.message,
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
      const userData = await user.findUnique({
        where: {
          id: userId.id,
        },
      });
      if (!userData) {
        return res.status(404).json({
          status: false,
          message: 'No user found with this id',
        });
      }
      res.status(200).json({
        status: true,
        userData,
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
