import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from 'src/schemas/patient.schema';
@Module({
  controllers: [PatientController],
  providers: [PatientService],
  imports: [
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
  ],
})
export class PatientModule {}
