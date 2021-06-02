import {
  Validate,IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumberString, IsPositive,Equals, MaxLength, MinLength, IsNumber,IsOptional,IsMobilePhone
} from "class-validator";
import {
  IsPasswordMatchesRequirementsConstraint,
} from './../../validate';
import { Model } from "../../model";

export class UserModel extends Model {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(200)
  public fullName: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;
  
  // @IsNotEmpty()
  // @Validate(IsPasswordMatchesRequirementsConstraint, {
  //   message: 'ERR_REQUIRED_PASSWORD',
  //   context: {
  //     errorCode: 400
  //   }
  // })
  public password: string;

  @IsNotEmpty()
  public mobile: string;

  @IsNotEmpty()
  public country_code: string;

  @IsOptional()
  public referral_code : string;

  @IsOptional()
  public profile_image : string;

  constructor(body: any) {
    super();
    const {
      fullName,
      email,
      password,
      mobile,
      country_code
    } = body;

    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.mobile = mobile;
    this.country_code = country_code;
  }
}

export class OtpModel extends Model {
  @IsNotEmpty()
  @IsNumber()
  public otp: string;

  @IsNotEmpty()
  public country_code: string;

  @IsNotEmpty()
  public mobile: string;
  
  constructor(body: any) {
    super();
    const { otp,country_code, mobile} = body;

    this.otp = otp;
    this.country_code = country_code;
    this.mobile = mobile;
  }
}

export class AuthModel extends Model {
  @IsNotEmpty()
  country_code: string;

  @IsNotEmpty()
  public mobile: string;

  @IsNotEmpty()
  @Validate(IsPasswordMatchesRequirementsConstraint, {
    message: 'ERR_REQUIRED_PASSWORD',
    context: {
      errorCode: 400
    }
  })
  public password: string;

  constructor(body: any) {
    super();
    const { country_code, mobile, password, deviceId } = body;

    this.country_code = country_code;
    this.mobile = mobile;
    this.password = password;
  }
}

export class ForgotPasswordModel extends Model {
  @IsNotEmpty()
  country_code: string;

  @IsNotEmpty()
  public mobile: string;

  constructor(body: any) {
    super();
    const { country_code, mobile } = body;

    this.country_code = country_code;
    this.mobile = mobile;
  }
}

export class ProfileModel extends Model {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  public fullName: string;

  constructor(body: any) {
    super();
    const { email, fullName } = body;

    this.email = email;
    this.fullName = fullName;
  }
}

export class ContactUsModel extends Model {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  public description: string;

  constructor(body: any) {
    super();
    const { title, description } = body;

    this.title = title;
    this.description = description;
  }
} 

export class BlockedModel extends Model {
  @IsNotEmpty()
  public userId: string;

  constructor(body: any) {
    super();
    const { userId } = body;

    this.userId = userId;
  }
}

export class ResetPasswordModel extends Model {
  @IsNotEmpty()
  @Validate(IsPasswordMatchesRequirementsConstraint, {
    message: 'Password must be Alphnumeric with special character and number',
    context: {
      errorCode: 500
    }
  })
  public password: string;

  @IsNotEmpty()
  public confirm_password: string;

  @IsNotEmpty()
  public mobile: string;

  constructor(body: any) {
    super();
    const { password, confirm_password, mobile } = body;

    this.password = password;
    this.confirm_password = confirm_password;
    this.mobile = mobile;
  }
}

export class PasswordModel extends Model {
  @IsNotEmpty()
  @Validate(IsPasswordMatchesRequirementsConstraint, {
    message: 'Password must be Alphnumeric with special character and number',
    context: {
      errorCode: 500
    }
  })
  public password: string;

  @IsNotEmpty()
  public confirm_password: string;

  @IsNotEmpty()
  @Validate(IsPasswordMatchesRequirementsConstraint, {
    message: 'Password must be Alphnumeric with special character and number',
    context: {
      errorCode: 500
    }
  })
  public old_password: string;

  constructor(body: any) {
    super();
    const { password, confirm_password, old_password } = body;

    this.old_password = old_password;
    this.password = password;
    this.confirm_password = confirm_password;
  }
}

export class AddCardModel extends Model {
    @IsNotEmpty()
    public token: string;

    constructor(body: any) {
        super();
        const {
            token
        } = body;
        this.token = token;
    }
} 

export class DeviceTokenModel extends Model {
  @IsNotEmpty()
  public device_token: string;

  @IsNotEmpty()
  public device_type: string;

  constructor(body: any) {
      super();
      const {
        device_type,
        device_token
      } = body;
      this.device_type = device_type;
      this.device_token = device_token;
  }
}
