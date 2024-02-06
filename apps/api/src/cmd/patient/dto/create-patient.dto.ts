import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;
  @IsString()
  @IsNotEmpty()
  privateId: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  fulltext: string;

  @IsArray()
  @IsNotEmpty()
  questionnairesDoneByPatient: any[];

  @IsArray()
  @IsNotEmpty()
  assignedQuestionnaires: any[];

  @IsString()
  @IsNotEmpty()
  supervisingDoctor: string;
}
