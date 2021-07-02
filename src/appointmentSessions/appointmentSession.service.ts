import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AppointmentCenter } from './interfaces/appointment-center.interface'

@Injectable()
export class AppointmentSessionsServices {
  constructor(
    @InjectModel('Appointmentcenter')
    private readonly appointmentCenterModule: Model<AppointmentCenter>,
  ) {}

  async findVaccinationCenter({ ...args }): Promise<AppointmentCenter[]> {
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
