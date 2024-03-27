import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// @ts-ignore
import { DeleteResult, Model, Types } from 'mongoose';
import { Form, FormDocument } from './schemas/form.schema';
import { Field, FieldDocument } from './schemas/field.schema';
import { CreateFormDto, UpdateFormDto } from './dto/form.dto';
import { CreateFieldDto } from './dto/field.dto';
import { FIELD_TYPES } from './enums/enum';

@Injectable()
export class FormService {
  constructor(
    @InjectModel(Form.name) private formModel: Model<FormDocument>,
    @InjectModel(Field.name) private fieldModel: Model<FieldDocument>,
  ) {}

  async createField(createFieldDto: CreateFieldDto): Promise<Field> {
    const { name, desc, type, required } = createFieldDto;

    const createdField = new this.fieldModel({
      name,
      desc,
      type,
      required,
    });

    if (FIELD_TYPES[createdField.type]) {
      if (createdField.type === FIELD_TYPES.NUMBER)
        createdField.optimalValue = createFieldDto.optimalValue;
      else if (
        createdField.type in
        [FIELD_TYPES.CHECKBOX, FIELD_TYPES.RADIO, FIELD_TYPES.SELECT]
      )
        createdField.options = createFieldDto.options;
    } else {
      throw new HttpException(
        'El tipo de campo no existe',
        HttpStatus.BAD_REQUEST,
      );
    }

    return createdField.save();
  }

  async create(createFormDto: CreateFormDto): Promise<Form> {
    const { title, desc, fields } = createFormDto;

    if (fields.length < 1)
      throw new HttpException('Campos Vacíos', HttpStatus.BAD_REQUEST);

    const fieldInstances = await Promise.all(
      fields.map(async (fieldData) => {
        const field = new this.fieldModel(fieldData);
        return field.save();
      }),
    );

    const createdForm = new this.formModel({
      title,
      desc,
      fields: fieldInstances.map((field) => field._id),
    });

    return createdForm.save();
  }

  async findAll(ids?: string[], extended?: boolean): Promise<CreateFormDto[]> {
    const objectIds = ids?.map((form) => new Types.ObjectId(form));

    let filter = null;

    if (ids && ids.length > 0) filter = { _id: { $in: objectIds } };

    const forms = await this.formModel.find(filter).exec();

    let createFormDtos: Awaited<CreateFormDto>[];
    createFormDtos = await Promise.all(
      forms.map(async (form) => {
        let createFormDto: CreateFormDto = new CreateFormDto();

        createFormDto.title = form.title;
        createFormDto.desc = form.desc;
        createFormDto['id'] = form.id;

        if (extended)
          createFormDto.fields = await Promise.all(
            form.fields.map((fieldId) =>
              this.fieldModel.findById(fieldId).exec(),
            ),
          );
        else createFormDto.fields = form.fields;

        return createFormDto;
      }),
    );
    return createFormDtos;
  }

  async findOne(id: string): Promise<CreateFormDto> {
    let createFormDto: CreateFormDto = new CreateFormDto();
    const form = await this.formModel.findById(id).exec();

    createFormDto.title = form.title;
    createFormDto.desc = form.desc;
    createFormDto['id'] = form.id;

    createFormDto.fields = await Promise.all(
      form.fields.map((fieldId) => this.fieldModel.findById(fieldId).exec()),
    );

    return createFormDto;
  }

  async update(id: string, updateFormDto: UpdateFormDto): Promise<Form> {
    for (const field of updateFormDto.fields) {
    }

    return this.formModel
      .findByIdAndUpdate(id, updateFormDto, { new: true })
      .exec();
  }

  // TODO delete fields
  async remove(id: string): Promise<Form> {
    return this.formModel.findByIdAndDelete(id).exec();
  }

  // TODO delete fields
  async removeBulk(forms: string[]): Promise<DeleteResult> {
    const objectIds = forms.map((form) => new Types.ObjectId(form));
    return this.formModel.deleteMany({ _id: { $in: objectIds } }).exec();
  }
}
