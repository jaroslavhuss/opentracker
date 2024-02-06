import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import {
  JwtStrategy,
  JwtStrategyAdmin,
  RefreshTokenStrategy,
  JwtAbsoluteAdmin,
  JwtAreaManager,
  JwtMedicalRepresentative,
  JwtSalesForceManager,
} from './strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'src/schemas/user.schema';
@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtStrategyAdmin,
    RefreshTokenStrategy,
    JwtAbsoluteAdmin,
    JwtAreaManager,
    JwtMedicalRepresentative,
    JwtSalesForceManager,
  ],
})
export class AuthModule {}
