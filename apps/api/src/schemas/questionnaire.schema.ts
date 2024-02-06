import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
export type QuestionnaireDocument = Questionnaire & Document;

@Schema()
export class Questionnaire {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  maxrange: number;

  @Prop()
  questions: string[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  supervisingDoctor: User;
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
