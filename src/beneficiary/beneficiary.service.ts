import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CreateBeneficiaryResponse } from './entities/create-beneficiary.entity'
import { Beneficiary } from './entities/beneficiary.entity'
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
  ): Promise<CreateBeneficiaryResponse> {
    const newBeneficiary = new this.beneficiariesModule({
      ...createBeneficiary,
    })
    const result = await newBeneficiary.save()
    return {
      status: HttpStatus.CREATED,
      message: 'Beneficiary added',
    }
  }

  async findAll() {
    const beneficiaries = await this.beneficiariesModule.find().exec()
    return beneficiaries
  }

  findOne(id: string) {
    return this.getBeneficiaryById(id)
  }

  remove(id: string) {
    this.beneficiaries = this.beneficiaries.filter(
      beneficiary => beneficiary.id !== id,
    )
    return this.beneficiaries
  }

  private getBeneficiaryById(id: string) {
    return this.beneficiaries.find(beneficiary => beneficiary.id === id)
  }
}
