import { Module } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireController } from './questionnaire.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Questionnaire,
  QuestionnaireSchema,
} from '../../schemas/questionnaire.schema';
@Module({
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService],
  imports: [
    MongooseModule.forFeature([
      { name: Questionnaire.name, schema: QuestionnaireSchema },
    ]),
  ],
})
export class QuestionnaireModule {}
