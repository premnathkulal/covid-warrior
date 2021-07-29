import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { BeneficiaryResponse } from './dto/beneficiary-response.dto'
import {
  Beneficiaries,
  Beneficiary,
  BeneficiaryModel,
} from './dto/beneficiary.dto'
import { Model } from 'mongoose'
import { CreateBeneficiary } from './dto/create-beneficiary.dto'
import { BeneficiaryDocument } from './schemas/beneficiary.schema'
import { dateFormateConverter } from 'src/utils/dateFormateConverter'

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
    let result = await this.getBeneficiaryByPhotoId(
      createBeneficiary.photo_id_number,
    )

    if (result) {
      throw new NotFoundException('Beneficiary already added')
    }

    const newBeneficiary = new this.beneficiariesModule({
      username: username,
      scheduled: false,
      ...createBeneficiary,
      birth_year: dateFormateConverter(createBeneficiary.birth_year),
    })
    await newBeneficiary.save()
    return {
      status: HttpStatus.CREATED,
      message: 'Beneficiary added',
    }
  }

  async findAll(username: string): Promise<Beneficiaries> {
    const result = await this.beneficiariesModule.find({ username }).exec()
    const beneficiaries = this.mapBeneficiariesData(result as Beneficiary[])
    return {
      status: HttpStatus.OK,
      beneficiaries: beneficiaries as Beneficiary[],
    }
  }

  async findOne(photoId: string, username: string): Promise<Beneficiaries> {
    let result = await this.getBeneficiaryByPhotoId(photoId)

    if (!result) {
      throw new NotFoundException('Could not found beneficiary')
    }

    const beneficiaries = this.mapBeneficiariesData([result] as Beneficiary[])

    return {
      status: HttpStatus.OK,
      beneficiaries: beneficiaries as Beneficiary[],
    }
  }

  async remove(
    photoId: string,
    username: string,
  ): Promise<BeneficiaryResponse> {
    const result = await await this.beneficiariesModule
      .deleteOne({ photo_id_number: photoId, username })
      .exec()
    if (result.n === 0) {
      throw new NotFoundException('Could not found beneficiary')
    }
    return {
      status: HttpStatus.OK,
      message: 'Beneficiary removed',
    }
  }

  async setSchedule(photoId: string, username: string): Promise<void> {
    const beneficiary = await this.getBeneficiaryByPhotoId(photoId)
    beneficiary.scheduled = !beneficiary.scheduled
    beneficiary.save()
  }

  private async getBeneficiaryByPhotoId(photoId: string): Promise<Beneficiary> {
    const beneficiary = await this.beneficiariesModule
      .findOne({ photo_id_number: photoId })
      .exec()
    return beneficiary as Beneficiary
  }

  private mapBeneficiariesData(data: Beneficiary[]): BeneficiaryModel[] {
    return data.map((beneficiary: Beneficiary) => ({
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
