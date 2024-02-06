import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { User as getUser } from '../auth/decorators';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@getUser() user: { user: { _id: string } }) {
    return this.patientService.findAll(user.user._id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: CreatePatientDto) {
    return this.patientService.update(id, updatePatientDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/questionnaire')
  updateQuestionnaireDoneByPatient(
    @Param('id') id: string,
    @Body() questionnaire: any,
  ) {
    return this.patientService.updateQuestionnaireDoneByPatient(
      id,
      questionnaire,
    );
  }
}
