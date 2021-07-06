import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { VaccinationCenter } from './interfaces/vaccination-center.interface'

@Injectable()
export class VaccinationCenterServices {
  constructor(
    @InjectModel('Vaccinationcenter')
    private readonly appointmentCenterModule: Model<VaccinationCenter>,
  ) {}

  async findVaccinationCenter({ ...args }): Promise<VaccinationCenter[]> {
    const requestQuery = { date: args.date }
    if (args.pinCode) {
      requestQuery['pincode'] = parseInt(args.pinCode)
    }
    if (args.district_name) {
      requestQuery['district_name'] = args.district_name
    }
    const result = await this.appointmentCenterModule.find(requestQuery).exec()
    return result
  }
}
