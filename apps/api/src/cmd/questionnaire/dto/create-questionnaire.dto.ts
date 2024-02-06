import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';
export class CreateQuestionnaireDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  maxrange: number;

  @IsString({ each: true })
  @IsNotEmpty()
  questions: string[];

  @IsNotEmpty()
  supervisingDoctor: Types.ObjectId;
}
