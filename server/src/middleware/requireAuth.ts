import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../Models/User";
import mongoose from "mongoose";

interface JwtPayload {
  _id: string;
}

export interface AuthRequest extends Request {
  user?: mongoose.Types.ObjectId;
}

const requireAuth: RequestHandler = async (
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
  console.log(token);

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
    if (error.name === "JsonWebTokenError") {
      // Token is malformed or invalid
      return res.status(401).json({ error: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      // Token has expired
      return res.status(401).json({ error: "Token has expired" });
    } else {
      // Other error (e.g., jwt.verify failed)
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

export default requireAuth;
