import express from "express";
import { signup, signin } from "../controllers/userControllers.js";
import authenticateUser from "../middlewares/user-middleware.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

export default userRouter;