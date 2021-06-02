// Import only what we need from express
import * as Multipart from "connect-multiparty";
import { Router } from "express";
import { Middleware } from "../../middleware";
import { Validator } from "../../validate";
import { UserController } from "./userController";
import { UserMiddleware } from "./userMiddleware";
import { Constants } from "../../config/constants";
import { UserModel,AuthModel } from "./userModel";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const userController = new UserController();
const userMiddleware = new UserMiddleware();
const middleware = new Middleware();

router.post(Constants.ROUTES.SIGNUP, v.validate(UserModel), userMiddleware.checkReferralCode,userMiddleware.checkForUniqueEmail, userMiddleware.checkForUniqueMObile,v.validate(UserModel), userController.signup);

router.post(Constants.ROUTES.SIGNIN, v.validate(AuthModel), userMiddleware.checkForValidMobile, userController.login);

export const UserRoute: Router = router;
