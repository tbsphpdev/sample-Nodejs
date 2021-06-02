import * as sql from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables,UserTable } from "./config/tables";
import { Encrypt } from "./helpers/encrypt";
import { Jwt } from "./helpers/jwt";
import { ResponseBuilder } from "./helpers/responseBuilder";
import { Constants } from "./config/constants";

export class Middleware {

  private encryptUtil: Encrypt = new Encrypt();

  public authenticateUser = async (req, res, next: () => void) => { 

    if (req.headers.authorization && !_.isEmpty(req.headers.authorization)) {
      const tokenInfo = Jwt.decodeAuthToken(req.headers.authorization); 
      if (tokenInfo) { 
        const user = await sql.first(`users left join attachments on attachments.id = users.profile_image`,
          [UserTable.ID,UserTable.NAME,UserTable.EMAIL,UserTable.COUNTRY_CODE,UserTable.MOBILE,UserTable.REFERRAL_CODE,UserTable.SUBSCRIPTION,UserTable.NOTIFICATION,UserTable.STATUS, UserTable.CUSTOMERID,'users.profile_image as image_id','name as profile_image'], `_id='${tokenInfo.id}' AND Role = 1`);
        if (user) {
          req._user = user;
          next();
        } else {
          return res.status(401).json(ResponseBuilder.errorMessage(req.t("ERR_UNAUTH")));
        }
      } else {
        return res.status(401).json(ResponseBuilder.errorMessage(req.t("ERR_UNAUTH")));
      }

    } else {
      return res.status(401).json(ResponseBuilder.errorMessage(req.t("ERR_UNAUTH")));
    }
  }
}
