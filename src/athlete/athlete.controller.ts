import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AthleteService } from './athlete.service';
import { Athlete } from './schemas/athlete.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Athlete')
@Controller('athlete')
export class AthleteController {
  constructor(private readonly athleteService: AthleteService) {}

  @Post()
  async create(@Body() athleteData: Partial<Athlete>): Promise<Athlete> {
    return this.athleteService.create(athleteData);
  }

  @Get()
  async findAll(): Promise<Athlete[]> {
    return this.athleteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Athlete> {
    return this.athleteService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() athleteData: Partial<Athlete>,
  ): Promise<Athlete> {
    return this.athleteService.update(id, athleteData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Athlete> {
    return this.athleteService.delete(id);
  }
}
