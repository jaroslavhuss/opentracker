import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { Questionnaire } from './questionnaire.schema';

export type PatientDocument = Patient & Document;

@Schema()
export class Patient {
  /**
   * MANDATORY PROPS
   */
  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  privateId: string;

  @Prop()
  email: string;

  @Prop()
  fulltext: string;

  @Prop()
  questionnairesDoneByPatient: any[];

  @Prop([{ type: Types.ObjectId, ref: 'Questionnaire' }])
  assignedQuestionnaires: Questionnaire;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  supervisingDoctor: User;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
