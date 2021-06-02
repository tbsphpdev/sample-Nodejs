import bcryptjs = require("bcryptjs");
import { Request, Response } from "express";
import { Constants } from "../../config/constants";
import { Log } from "../../helpers/logger";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import {isEmpty} from "lodash";
import { Jwt } from "../../helpers/jwt";
import { UserUtils } from "./userUtils";
import uniqid  = require('uniqid');
import moment = require('moment');

export class UserController {
  private userUtils: UserUtils = new UserUtils();
  private logger: any = Log.getLogger();

  public signup = async (req: any, res: Response) => {
    const { password, email, fullName,country_code,mobile,referral_code,profile_image,platform, appId} = req.body;
    const encryptedPassword = bcryptjs.hashSync(password, Constants.HASH_STRING_LIMIT);
    const code = uniqid.time();
    const userDetail =  { 
      email, 
      fullName, 
      password: encryptedPassword,
      country_code,
      mobile,
      user_referral_code:referral_code,
      referral_code: code, 
      platform: platform ? platform : 'app', 
      profile_image,
      social_id :appId,
      updated_at:moment().format(Constants.DATE_TIME_FORMAT)
    };
    const result: ResponseBuilder = await this.userUtils.createUser(userDetail);
    if (result && result.data && result.data.userId) {
      await this.userUtils.sendOtp(`${req.body.country_code}`, req.body.mobile);
      const user =  { 
      email, 
      fullName, 
      country_code,
      mobile,
      token: Jwt.getAuthToken({id: result.data.userId}),
    };
      res.status(result.code).json(ResponseBuilder.data(user, req.t("SUCCESS")));
    }else {
      res.status(result.code).json(ResponseBuilder.errorMessage(result.data)); // sending error if any
    }
  }

  public login = async (req: any, res: Response) => {
    const user = req.user;
    if (bcryptjs.compareSync(req.body.password, user.password)) {
      const userDetail = {
        userId : user._id,
        fullName: user.fullName,
        referral_code: user.referral_code,
        profile_image: user.profile_image ? user.profile_image : "",
        email: user.email,
        country_code:user.country_code,
        mobile: user.mobile,
        is_verified : user.status,
        subscription: user.subscription,
        notification: user.notification,
        status: user.status,
        image_id : user.image_id,
        token: Jwt.getAuthToken({id: user._id}),
      };
      res.status(Constants.SUCCESS_CODE).json(ResponseBuilder.data(userDetail, req.t("SUCCESS")));
    } else {
      return res.status(Constants.ERROR_CODE).json(ResponseBuilder.errorMessage(req.t("ERR_INVALID_PASSWORD")));
    }
  }
  
}
