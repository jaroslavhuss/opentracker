import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User as getUser } from '../auth/decorators';
@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createQuestionnaireDto: CreateQuestionnaireDto) {
    return this.questionnaireService.create(createQuestionnaireDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@getUser() user: { user: { _id: string } }) {
    if (!user.user._id) throw new BadRequestException('User not found');
    return this.questionnaireService.findAll(user.user._id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionnaireService.findOne(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionnaireService.remove(id);
  }

  //update route
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionnaireDto: CreateQuestionnaireDto,
  ) {
    return this.questionnaireService.update(id, updateQuestionnaireDto);
  }
}
