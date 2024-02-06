import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';
import { Roles } from 'src/interfaces_enums/roles.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  /**
   * MANDATORY PROPS
   */
  @Prop()
  email: string;

  @Exclude()
  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop({ default: Roles.MedicalRepresentative })
  authLevel: Roles;

  @Prop({ default: true })
  isUserApproved: boolean;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;

  @Prop()
  securityQuestion1: string;

  @Prop()
  securityQuestion2: string;

  @Prop()
  securityAnswer1: string;

  @Prop()
  securityAnswer2: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
