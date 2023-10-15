import { Router } from "express";
import { Login, Register } from "../controllers/AuthController";

const AuthRouter=Router();

AuthRouter.post("/login",Login);
AuthRouter.post("/register",Register);


export default AuthRouter;