import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body
    console.log(email);
 
    const userExist = await User.findOne({ email });
    
    
    if (!userExist) {
      return res.send("User is already exist");
    }
    
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      firstName,
      lastName,
     hashpassword,
    });
    
    const newUserCreated = await newUser.save();

    if (!newUserCreated) {
      return res.send("user is not created");
    }

    const token = generateToken(email);
    
    res.cookie("token", token)
    res.send("Signed successfully!");
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).send("Internal Server Error");
  }
};



export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("User not found");
    }

    const matchPassword = await bcrypt.compare(password, user.hashPassword);

    if (!matchPassword) {
      return res.send("Password is not correct");
    }

    const token = generateToken(email);
    res.cookie("token", token);
    res.send("Logged in!");
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).send("Internal Server Error");
  }
};
