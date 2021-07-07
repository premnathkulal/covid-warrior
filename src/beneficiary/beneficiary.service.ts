import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { BeneficiaryResponse } from './entities/beneficiary-response.entity'
import { Beneficiaries, Beneficiary } from './entities/beneficiary.entity'
import { Model } from 'mongoose'
import { CreateBeneficiary } from './dto/create-beneficiary.dto'

@Injectable()
export class BeneficiaryService {
  constructor(
    @InjectModel('Beneficiary')
    private readonly beneficiariesModule: Model<Beneficiary>,
  ) {}

  private beneficiaries = [
    {
      id: '1625585017629',
      name: '1',
      birth_year: '1',
      gender_id: 0,
      photo_id_type: 0,
      photo_id_number: '1',
      comorbidity_ind: '1',
      consent_version: '1',
    },
    {
      id: '1625585019015',
      name: '2',
      birth_year: '2',
      gender_id: 0,
      photo_id_type: 0,
      photo_id_number: '2',
      comorbidity_ind: '2',
      consent_version: '2',
    },
  ]

  async create(
    createBeneficiary: CreateBeneficiary,
  ): Promise<BeneficiaryResponse> {
    const newBeneficiary = new this.beneficiariesModule({
      ...createBeneficiary,
    })
    const result = await newBeneficiary.save()
    return {
      status: HttpStatus.CREATED,
      message: 'Beneficiary added',
    }
  }

  async findAll(): Promise<Beneficiaries> {
    const result = await this.beneficiariesModule.find().exec()
    const beneficiaries = this.mapBeneficiariesData(result)
    return {
      status: HttpStatus.OK,
      beneficiaries,
    }
  }

  async findOne(id: string): Promise<Beneficiaries> {
    const beneficiaries = await this.getBeneficiaryById(id)
    return {
      status: HttpStatus.OK,
      beneficiaries,
    }
  }

  async remove(id: string): Promise<BeneficiaryResponse> {
    const result = await await this.beneficiariesModule
      .deleteOne({ _id: id })
      .exec()
    if (result.n === 0) {
      throw new NotFoundException('Could not found beneficiary')
    }
    return {
      status: HttpStatus.OK,
      message: 'Beneficiary removed',
    }
  }

  private async getBeneficiaryById(id: string): Promise<Beneficiary[]> {
    const beneficiary = await this.beneficiariesModule
      .findOne({ _id: id })
      .exec()
    if (!beneficiary) {
      throw new NotFoundException('Could not found beneficiary')
    }
    const beneficiaries = this.mapBeneficiariesData([beneficiary])
    return beneficiaries
  }

  private mapBeneficiariesData(data: Beneficiary[]): Beneficiary[] {
    return data.map((beneficiary: Beneficiary) => ({
      id: beneficiary.id,
      name: beneficiary.name,
      birth_year: beneficiary.birth_year,
      gender_id: beneficiary.gender_id,
      photo_id_type: beneficiary.photo_id_type,
      photo_id_number: beneficiary.photo_id_number,
      comorbidity_ind: beneficiary.comorbidity_ind,
      consent_version: beneficiary.consent_version,
    }))
  }
}
