import { Validator } from "class-validator";
import * as sql from "jm-ez-mysql";
import { isEmpty } from "lodash";
import { Constants } from "../../config/constants";
import { Tables,UserTable } from "../../config/tables";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import bcryptjs = require("bcryptjs");

export class UserMiddleware {
  public checkForUniqueEmail = async (req, res, next) => {
    const { email } = req.body;
    const result = await sql.first(`${Tables.USER}`, ["_id"], `email='${email}' AND Role = 1`);
    if (result) {
      return res.status(Constants.ERROR_CODE).json(ResponseBuilder.errorMessage(req.t("ERR_EMAIL_ALREADY_USED")));
    } else {
      next();
    }
  }

  public checkForUniqueMObile = async (req, res, next) => {
    const result = await sql.first(`${Tables.USER}`, [UserTable.ID], `${UserTable.MOBILE} = ? AND ${UserTable.COUNTRY_CODE} = ? AND Role = 1`,
    [req.body.mobile,req.body.country_code]);
    if (result) {
      return res.status(Constants.ERROR_CODE).json(ResponseBuilder.errorMessage(req.t("ERR_MOBILE_ALREADY_USED")));
    } else {
      next();
    }
  }

  public checkForValidMobile = async (req, res, next) => {
    const result = await sql.first(`users left join attachments on attachments.id = users.profile_image`, ['users.*','users.profile_image as image_id','name as profile_image'], `${UserTable.MOBILE} = ? AND ${UserTable.COUNTRY_CODE} = ? AND Role = 1`,
    [req.body.mobile,req.body.country_code]);
    if (!result) {
      return res.status(Constants.ERROR_CODE).json(ResponseBuilder.errorMessage(req.t("ERR_MOBILE_IS_NOT_VALID")));
    } else {
      req.user = result;
      next();
    }
  } 

  public checkReferralCode = async (req,res,next) => {
    const { referral_code } = req.body;
    if(!referral_code){
      next();
    }else{
      const result = await sql.first(`${Tables.USER}`, ["_id"], `referral_code='${referral_code}'`);
      if (!result) {
        return res.status(Constants.ERROR_CODE).json(ResponseBuilder.errorMessage(req.t("ERR_REFERRAL_IS_NOT_VALID")));
      } else {
        req.referral_userId = result._id;
        next();
      }
    }
  }
}
