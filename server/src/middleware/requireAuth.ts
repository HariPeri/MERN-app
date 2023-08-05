import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../Models/User";
import mongoose from "mongoose";

interface JwtPayload {
  _id: string;
}

export interface AuthRequest extends Request {
  email: string;
  password: string;
  user?: mongoose.Types.ObjectId;
}
const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // verify authentication
  const { authorization } = req.headers;

  // need to check if the authorization header was actually sent
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // Grabs the token
  const token = authorization.split(" ")[1];

  // verify the token to make sure that it wasn't tampered with
  jwt.verify(token, process.env.SECRET!);

  try {
    // verify the token to make sure that it wasn't tampered with
    const { _id } = jwt.verify(token, process.env.SECRET!) as JwtPayload;

    const user = await User.findOne({ _id }).select("_id");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user._id;
    next();
  } catch (error: any) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};
