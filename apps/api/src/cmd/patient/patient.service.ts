import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from 'src/schemas/patient.schema';
@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) {}
  async create(createPatientDto: CreatePatientDto) {
    const createdPatient = await this.patientModel.create(createPatientDto);
    return createdPatient;
  }

  async findAll(_id: string) {
    const data = await this.patientModel.find({
      supervisingDoctor: _id.toString(),
    });
    return data;
  }

  async findOne(id: string) {
    const data = await this.patientModel
      .findById(id.toString())
      .populate({ path: `assignedQuestionnaires`, model: 'Questionnaire' });

    return data;
  }

  async update(id: string, updatePatientDto: CreatePatientDto) {
    const updatedData = await this.patientModel.findByIdAndUpdate(
      id.toString(),
      updatePatientDto,
    );
    return updatedData;
  }

  async remove(id: string) {
    const data = await this.patientModel.deleteOne({ _id: id.toString() });
    return data;
  }

  /**
   * This function is used to add a questionnaire to the patient's assignedQuestionnaires array updatePatientDto.questionnairesDoneByPatient
   * @param id
   * @param updatePatientDto
   */

  async updateQuestionnaireDoneByPatient(id: string, questionnaire: any) {
    const updatedData = await this.patientModel.findByIdAndUpdate(
      id.toString(),
      {
        $push: { questionnairesDoneByPatient: questionnaire },
      },
    );
    return updatedData;
  }
}
