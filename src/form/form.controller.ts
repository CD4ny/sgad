import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto, UpdateFormDto } from './dto/form.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Form')
@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @ApiBearerAuth('token')
  @Post('create')
  create(@Body() createFormDto: CreateFormDto) {
    return this.formService.create(createFormDto);
  }

  @ApiBearerAuth()
  @Get()
  findAll(@Query('extended') extended?: boolean) {
    return this.formService.findAll(null, extended);
  }

  @ApiBearerAuth()
  @Post()
  findAllPost(@Body() params: { ids?: string[]; extended?: boolean }) {
    return this.formService.findAll(params.ids, params.extended);
  }

  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formService.update(id, updateFormDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formService.remove(id);
  }

  @ApiBearerAuth()
  @Delete()
  remove_bulk(@Body() params: { ids: string[] }) {
    return this.formService.removeBulk(params.ids);
  }
}
