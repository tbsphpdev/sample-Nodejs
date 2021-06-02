import * as Enum from 'enum';
import moment = require('moment');

export class Constants {
  public static readonly TIMEZONE = 'Asia/Kolkata';
  public static readonly SUCCESS = 'SUCCESS';
  public static readonly ERROR = 'ERROR';
  public static readonly BAD_DATA = 'BAD_DATA';
  public static readonly BACKEND_API_FAILURE = 'BACKEND_API_FAILURE';
  public static readonly CODE = 'CODE';
  public static readonly APPROVED = 'APPROVED';
  public static readonly INVALID_REQUEST = 'INVALID_REQUEST';
  public static readonly DATE_TIME_FORMAT = 'yyyy-MM-DD:hh:mm:ss';
  public static readonly DATE_FORMAT = 'yyyy-MM-DD:hh:mm:ss';
  public static readonly MASTER_OTP = 123456;
  public static readonly OTP_EXPIRE_LIMIT = 10;
  public static readonly STORY_EXPIRE_LIMIT = 24;
  public static readonly ERROR_CODE = 400;
  public static readonly CURRENT_DATE = moment().format('yyyy-MM-DD:hh:mm:ss');
  public static readonly TODAY_DATE = moment().format('YYYY-MM-DD');
  public static readonly HASH_STRING_LIMIT = 12;
  public static readonly SUCCESS_CODE = 200;
  public static readonly FREESUBSCRIPTIONDAYS = 60;
  public static readonly PER_PAGE_DATA = 10;
  public static readonly PER_CALL_MESSAGE = 10;
  public static readonly MAX_TASK = 3;
  public static readonly FB_OAUTH_URL = "https://graph.facebook.com/me?access_token=";
  public static readonly GOOGLE_OAUTH_URL = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=";
  public static readonly APPLE_AUTH_URL = "https://appleid.apple.com/auth/keys"; 
  public static readonly EVENT_MEDIA_LIMIT = 6;
  public static readonly FIREBASE_JSON = "";
  public static readonly FIREBASE_URL = "";
  public static readonly ROUTES = {
      SIGNIN : '/sign-in',
      SIGNUP : '/sign-up',
  };
}
