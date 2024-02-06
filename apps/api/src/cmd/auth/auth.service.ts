import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import {
  SignUpDto,
  AuthDto,
  UserIdDto,
  UpdateUserDto,
  ForgotPasswordDto_checkEmail,
  CheckSecurityAnswersDto,
} from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { Model } from 'mongoose';

import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getSelf(id: string): Promise<any> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async updateSelf(id: string, dto: UpdateUserDto): Promise<any> {
    const user = await this.userModel.findById(id);
    if (!user) throw new BadRequestException('Uživatel neexistuje');

    if (dto.newPassword && dto.oldPassword && dto.confirmedNewPassword) {
      const passwordMatch: boolean = await argon.verify(
        user.password,
        dto.oldPassword,
      );

      if (!passwordMatch) throw new BadRequestException('Špatné heslo');

      if (dto.newPassword !== dto.confirmedNewPassword)
        throw new BadRequestException('Hesla se neshodují');

      const hashedPwd = await argon.hash(dto.newPassword);

      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        { password: hashedPwd, name: dto.name, email: dto.email },
        { new: true },
      );

      return updatedUser;
    } else {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        { name: dto.name, email: dto.email },
        { new: true },
      );
      return updatedUser;
    }
  }

  async signup(dto: SignUpDto): Promise<any> {
    //Password actually matches
    if (dto.password !== dto.confirmedPassword)
      throw new BadRequestException('Hesla bohužel nesouhlasí');
    //generate the password hash
    const hashedPwd = await argon.hash(dto.password);
    const findIfMongoEmailIsTaken = await this.userModel.findOne({
      email: dto.email,
    });

    if (findIfMongoEmailIsTaken)
      throw new BadRequestException(
        'Uživatel je už s tímto emailem zaregistrovaný',
      );

    const user = await this.userModel.create({
      password: hashedPwd,
      email: dto.email,
      name: dto.name,
      securityAnswer1: dto.securityAnswer1,
      securityAnswer2: dto.securityAnswer2,
      securityQuestion1: dto.securityQuestion1,
      securityQuestion2: dto.securityQuestion2,
    });

    return user;
  }

  async signin(dto: AuthDto): Promise<any> {
    //find user by email
    const user = await this.userModel.findOne({
      email: dto.email,
    });

    if (!user) throw new ForbiddenException('Tento uživatel neexistuje');

    //compare passwords
    const passwordMatch: boolean = await argon.verify(
      user.password,
      dto.password,
    );
    if (!passwordMatch) throw new BadRequestException('Špatné heslo');
    const tokens = await this.signToken(user._id, user.email, user.authLevel);
    await this.userModel.findOneAndUpdate(
      { _id: user.id },
      { lastLoggedIn: new Date() },
      { new: true },
    );
    user.password = null;
    if (!user.isUserApproved)
      throw new BadRequestException(
        'Uživatel musí být ručně schválen provozovatelem aplikace pro zajištění maximálního bezpečí dat. Pokud chcete proces urychlit, napište email na huss@richtergedeon.cz',
      );

    return {
      user,
      tokens: tokens, //await this.signToken(user.id, user.email, user.authLevel),
    };
  }

  async logout(id: UserIdDto) {
    const user = await this.userModel.findByIdAndUpdate(
      id.id,
      {
        refresh_token: '',
      },
      { new: true },
    );
    if (!user)
      throw new BadRequestException(
        'Tento uživatele neexistuje, nebo se nepodařilo odhlásit',
      );
    delete user.password;
    return user;
  }

  async signToken(
    userId: number,
    email: string,
    authLevel: string,
  ): Promise<Tokens> {
    const config = new ConfigService();
    const payload = {
      sub: userId,
      email,
      authLevel,
    };
    //Access token
    const token = await this.jwt.signAsync(payload, {
      expiresIn: config.get('JWT_EXPIRE'),
      secret: config.get('JWT_SECRET'),
    });
    //Refresh token
    const rToken = await this.jwt.signAsync(payload, {
      expiresIn: config.get('JWT_EXPIRE_REFRESH'),
      secret: config.get('JWT_REFRESH_SECRET'),
    });

    return { access_token: token, refresh_token: rToken };
  }

  //Update refresh token function

  async updateRefreshToken(
    userId: string,
    refresh_token: string,
  ): Promise<void> {
    const hash = await argon.hash(refresh_token);
    await this.userModel.findByIdAndUpdate(userId, {
      rtToken: hash,
    });
  }

  getExpirationFromToken(token: string): Date | null {
    try {
      const decodedToken = this.jwt.verify(token);
      if (typeof decodedToken === 'object' && decodedToken.exp) {
        return new Date(decodedToken.exp * 1000); // Convert to milliseconds
      }
    } catch (error) {
      // Token verification failed, or the token doesn't contain an expiration claim
      // You can handle this error based on your application's needs
    }
    return null; // Token is invalid or doesn't contain expiration
  }

  async startPasswordReset(dto: ForgotPasswordDto_checkEmail): Promise<{
    email: string;
    securityQuestion1: string;
    securityQuestion2: string;
  }> {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new BadRequestException('Uživatel neexistuje');

    if (!user.securityQuestion1 || !user.securityQuestion2)
      throw new BadRequestException(
        'Uživatel nemá nastavené bezpečnostní otázky',
      );

    return {
      email: user.email,
      securityQuestion1: user.securityQuestion1,
      securityQuestion2: user.securityQuestion2,
    };
  }

  async validateSecurityAnswers(dto: CheckSecurityAnswersDto): Promise<string> {
    //Get user but remove password property

    const user = await this.userModel
      .findOne({ email: dto.email })
      .select('-password');

    if (!user) throw new BadRequestException('Uživatel neexistuje');

    if (!user.securityQuestion1 || !user.securityQuestion2)
      throw new BadRequestException(
        'Uživatel nemá nastavené bezpečnostní otázky',
      );

    if (
      user.securityAnswer1 !== dto.securityAnswer1 ||
      user.securityAnswer2 !== dto.securityAnswer2
    )
      throw new BadRequestException(
        'Špatné odpovědi na bezpečnostní otázky. Je nám líto, ale musíte kontaktovat svého správce aplikace pro obnovení hesla.',
      );

    //For user generate a new random password, update it in the database and send it to the user's email

    const newPassword = Math.random().toString(36).slice(-8);

    const hashedPwd = await argon.hash(newPassword);

    await this.userModel.findByIdAndUpdate(user._id, {
      password: hashedPwd,
    });

    return newPassword;
  }
}
