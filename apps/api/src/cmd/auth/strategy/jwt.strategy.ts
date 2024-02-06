import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas';
import { Model } from 'mongoose';

interface payLoadInterface {
  sub: number;
  email: string;
  authLevel: string;
  iat: number;
  exp: number;
}
enum Roles {
  OmniAdmin = 'omni-admin',
  SalesForceManager = 'sales-force-manager',
  AreaManager = 'area-manager',
  MedicalRepresentative = 'medical-representative',
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.userModel
      .findById({ _id: payload.sub })
      .select('-password');
    if (!user) throw new ForbiddenException('You must be logged in!');

    if (!user.isUserApproved)
      throw new ForbiddenException(
        `${user.name} ${user.surname} was not approved yet by the admin!`,
      );

    delete user.password;
    return { user, payload };
  }
}

@Injectable()
export class JwtStrategyAdmin extends PassportStrategy(Strategy, 'jwtadmin') {
  constructor(
    config: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: payLoadInterface) {
    const user = await this.userModel
      .findById({ _id: payload.sub })
      .select('-password');
    if (!user) throw new ForbiddenException('You must be logged in!');
    if (!user.isUserApproved)
      throw new ForbiddenException(
        `${user.name} ${user.surname} was not approved yet by the admin!`,
      );

    if (user.authLevel !== Roles.OmniAdmin)
      throw new ForbiddenException('Not enough privileges!');
    return { user, payload };
  }
}

//Admin
@Injectable()
export class JwtAbsoluteAdmin extends PassportStrategy(
  Strategy,
  Roles.OmniAdmin,
) {
  constructor(
    config: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: payLoadInterface) {
    const user = await this.userModel
      .findById({ _id: payload.sub })
      .select('-password');
    if (!user) throw new ForbiddenException('You must be logged in!');
    if (!user.isUserApproved)
      throw new ForbiddenException(
        `${user.name} ${user.surname} was not approved yet by the admin!`,
      );
    if (user.authLevel !== Roles.OmniAdmin)
      throw new ForbiddenException('Not enough privileges!');
    return { user };
  }
}

some: () => {
  console.log('zkouším to');
};
//Sales Force Manager
@Injectable()
export class JwtSalesForceManager extends PassportStrategy(
  Strategy,
  Roles.SalesForceManager,
) {
  constructor(
    config: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: payLoadInterface) {
    const user = await this.userModel
      .findById({ _id: payload.sub })
      .select('-password');
    if (!user) throw new ForbiddenException('You must be logged in!');
    if (!user.isUserApproved)
      throw new ForbiddenException(
        `${user.name} ${user.surname} was not approved yet by the admin!`,
      );
    if (user.authLevel !== Roles.SalesForceManager)
      throw new ForbiddenException('Not enough privileges!');
    return { user };
  }
}
//Sales Force Manager
@Injectable()
export class JwtAreaManager extends PassportStrategy(
  Strategy,
  Roles.AreaManager,
) {
  constructor(
    config: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: payLoadInterface) {
    const user = await this.userModel
      .findById({ _id: payload.sub })
      .select('-password');
    if (!user) throw new ForbiddenException('You must be logged in!');
    if (!user.isUserApproved)
      throw new ForbiddenException(
        `${user.name} ${user.surname} was not approved yet by the admin!`,
      );
    if (user.authLevel !== Roles.AreaManager)
      throw new ForbiddenException('Not enough privileges!');
    return { user };
  }
}
//Sales Force Manager
@Injectable()
export class JwtMedicalRepresentative extends PassportStrategy(
  Strategy,
  Roles.MedicalRepresentative,
) {
  constructor(
    config: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: payLoadInterface) {
    const user = await this.userModel
      .findById({ _id: payload.sub })
      .select('-password');
    if (!user) throw new ForbiddenException('You must be logged in!');
    if (!user.isUserApproved)
      throw new ForbiddenException(
        `${user.name} ${user.surname} was not approved yet by the admin!`,
      );
    if (user.authLevel !== Roles.MedicalRepresentative)
      throw new ForbiddenException('Not enough privileges!');
    return { user };
  }
}
