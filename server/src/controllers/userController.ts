import { Request, Response } from "express";
import User from "../Models/User";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const createToken = (_id: any) => {
  return jwt.sign({ _id }, process.env.SECRET!, { expiresIn: "3d" });
};

// Login Function

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Checks if email and password were included
    if (!email || !password) {
      throw Error("All fields must be filled");
    }

    // Check if a user with an email already exists [should not matter because email is unique but no harm in a second check]
    const user = await User.findOne({ email });

    // Throw an error if the email isn't in our database
    if (!user) {
      throw new Error("Incorrect email");
    }

    // we compare the plain text password with the user's hashpassword [returns a boolean]
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error("Incorrect Password");
    }

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Sign Up User

export const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // VALIDATION CHECKs

    // Checks if email and password were included
    if (!email || !password) {
      throw Error("All fields must be filled");
    }

    // Check if the email is a valid email
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }

    // Check if the password is a strong password

    if (!validator.isStrongPassword(password)) {
      throw Error("Password is not strong enough");
    }

    // Check if a user with an email already exists [should not matter because email is unique but no harm in a second check]
    const exists = await User.findOne({ email });

    if (exists) {
      throw new Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hash });

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
