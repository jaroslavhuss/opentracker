import { Injectable } from '@nestjs/common';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import {
  Questionnaire,
  QuestionnaireDocument,
} from 'src/schemas/questionnaire.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectModel(Questionnaire.name)
    private questionnaireModel: Model<QuestionnaireDocument>,
  ) {}
  async create(createQuestionnaireDto: CreateQuestionnaireDto) {
    const createdQuestionnaire = await this.questionnaireModel.create(
      createQuestionnaireDto,
    );
    return createdQuestionnaire;
  }

  async findAll(_id: string) {
    const data = await this.questionnaireModel.find({
      supervisingDoctor: _id.toString(),
    });
    return data;
  }

  async findOne(id: string) {
    const data = await this.questionnaireModel.findById(id);
    return data;
  }

  async remove(id: string) {
    const data = await this.questionnaireModel.deleteOne({ _id: id });
    return data;
  }

  async update(id: string, updateQuestionnaireDto: CreateQuestionnaireDto) {
    const updatedData = await this.questionnaireModel.findByIdAndUpdate(
      id,
      updateQuestionnaireDto,
    );
    return updatedData;
  }
}
