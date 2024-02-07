import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  privateId: string;

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
