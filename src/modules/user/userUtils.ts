import * as sql from "jm-ez-mysql";
import { Constants } from "../../config/constants";
import { Tables,UserTable } from "../../config/tables";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { SMSUtils } from '../../helpers/sms';
import { Aws } from '../../helpers/aws';
import { AuthServices } from '../../helpers/auth';
import Stripe from 'stripe';
import * as dotenv from "dotenv";
import { Jwt } from "../../helpers/jwt";
import moment = require('moment');

dotenv.config();

export class UserUtils {
  public async createUser(userDetail): Promise<ResponseBuilder> {
      const user = await sql.insert(`${Tables.USER}`, userDetail);
      if (user.insertId) {
        return ResponseBuilder.data({userId: user.insertId});
      } else {
        ResponseBuilder.error(user.message);
      }
  }

  // send otp
  public async sendOtp(countryCode, mobile) {
    const code = SMSUtils.generateOtp();
    const otpData = {
      otp: code,
      otp_expired: moment()
        .add(Constants.OTP_EXPIRE_LIMIT, 'minutes')
        .format(),
    };
    await sql.updateFirst(Tables.USER, otpData, `${UserTable.MOBILE} = ?`, [
      mobile,
      mobile,
    ]);
    Aws.SendOtp(countryCode+''+mobile,code);
    return ResponseBuilder.data({ registered: true });
  }
}
