import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(8, { message: 'Minimum length is 8 with special characters' })
  @MaxLength(20, { message: 'Maximum length is 20' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/, {
    message:
      'Password is too weak - it has to contain at least one Capital Letter and one number.',
  })
  password: string;
}

export class SignUpDto {
  /**
   * EMAIL
   */
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  /**
   * PASSWORD
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Minimum length is 8 with special characters' })
  @MaxLength(20, { message: 'Maximum length is 20' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/, {
    message:
      'Password is too weak - it has to contain at least one Capital Letter and one number.',
  })
  password: string;

  /**
   * CONFIRMED PASSWORD
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Minimum length is 8 with special characters' })
  @MaxLength(20, { message: 'Maximum length is 20' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/, {
    message: 'Heslo je bohužel hodně slabé...',
  })
  confirmedPassword: string;

  @IsString({ message: 'Name must be a text!' })
  @IsNotEmpty({ message: 'Name is mandatory!' })
  name: string;

  @IsString({ message: 'Security question must be a text!' })
  @IsNotEmpty({ message: 'Security question is mandatory!' })
  securityQuestion1: string;

  @IsString({ message: 'Security question must be a text!' })
  @IsNotEmpty({ message: 'Security question is mandatory!' })
  securityQuestion2: string;

  @IsString({ message: 'Security answer must be a text!' })
  @IsNotEmpty({ message: 'Security answer is mandatory!' })
  securityAnswer1: string;

  @IsString({ message: 'Security answer must be a text!' })
  @IsNotEmpty({ message: 'Security answer is mandatory!' })
  securityAnswer2: string;
}

export class UserIdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  oldPassword?: string;

  @IsOptional()
  newPassword?: string;

  @IsOptional()
  confirmedNewPassword?: string;
}

export class ForgotPasswordDto_checkEmail {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class CheckSecurityAnswersDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  securityAnswer1: string;

  @IsString()
  @IsNotEmpty()
  securityAnswer2: string;
}

export class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  confirmedNewPassword: string;

  @IsString()
  @IsNotEmpty()
  securityAnswer1: string;

  @IsString()
  @IsNotEmpty()
  securityAnswer2: string;
}
