import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { BeneficiaryResponse } from './dto/beneficiary-response.dto'
import { Beneficiaries, Beneficiary } from './dto/beneficiary.dto'
import { Model } from 'mongoose'
import { CreateBeneficiary } from './dto/create-beneficiary.dto'
import { BeneficiaryDocument } from './schemas/beneficiary.schema'

@Injectable()
export class BeneficiaryService {
  constructor(
    @InjectModel('Beneficiary')
    private readonly beneficiariesModule: Model<BeneficiaryDocument>,
  ) {}

  async create(
    createBeneficiary: CreateBeneficiary,
    username: string,
  ): Promise<BeneficiaryResponse> {
    const newBeneficiary = new this.beneficiariesModule({
      username: username,
      scheduled: false,
      ...createBeneficiary,
    })
    await newBeneficiary.save()
    return {
      status: HttpStatus.CREATED,
      message: 'Beneficiary added',
    }
  }

  async findAll(username: string): Promise<Beneficiaries> {
    const result = await this.beneficiariesModule.find({ username }).exec()
    const beneficiaries = this.mapBeneficiariesData(result)
    return {
      status: HttpStatus.OK,
      beneficiaries,
    }
  }

  async findOne(id: string, username: string): Promise<Beneficiaries> {
    const beneficiaries = await this.getBeneficiaryById(id, username)
    return {
      status: HttpStatus.OK,
      beneficiaries,
    }
  }

  async remove(id: string, username: string): Promise<BeneficiaryResponse> {
    const result = await await this.beneficiariesModule
      .deleteOne({ _id: id, username })
      .exec()
    if (result.n === 0) {
      throw new NotFoundException('Could not found beneficiary')
    }
    return {
      status: HttpStatus.OK,
      message: 'Beneficiary removed',
    }
  }

  async setSchedule(id: string, username: string): Promise<void> {
    const beneficiary = await this.beneficiariesModule
      .findOne({ _id: id })
      .exec()
    // const beneficiary = await this.getBeneficiaryById(id, username)
    beneficiary.scheduled = !beneficiary.scheduled
    beneficiary.save()
  }

  private async getBeneficiaryById(
    id: string,
    username: string,
  ): Promise<Beneficiary[]> {
    const beneficiary = await this.beneficiariesModule
      .findOne({ _id: id, username })
      .exec()
    if (!beneficiary) {
      throw new NotFoundException('Could not found beneficiary')
    }
    const beneficiaries = this.mapBeneficiariesData([beneficiary])
    return beneficiaries
  }

  private mapBeneficiariesData(data: BeneficiaryDocument[]): Beneficiary[] {
    return data.map((beneficiary: BeneficiaryDocument) => ({
      id: beneficiary.id,
      name: beneficiary.name,
      birth_year: beneficiary.birth_year,
      gender_id: beneficiary.gender_id,
      photo_id_type: beneficiary.photo_id_type,
      photo_id_number: beneficiary.photo_id_number,
      comorbidity_ind: beneficiary.comorbidity_ind,
      consent_version: beneficiary.consent_version,
      scheduled: beneficiary.scheduled,
    }))
  }
}
