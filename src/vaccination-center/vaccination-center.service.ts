import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { VaccinationCenters } from './dto/vaccination-center.dto'
import { VaccinationCenterDocument } from './schemas/vaccination-center.schema'

@Injectable()
export class VaccinationCenterServices {
  constructor(
    @InjectModel('Vaccinationcenter')
    private readonly appointmentCenterModule: Model<VaccinationCenterDocument>,
  ) {}

  async findVaccinationCenter({ ...args }): Promise<VaccinationCenters> {
    const date = this.dateFormateConverter(args.date)
    const requestQuery = { date }
    if (args.pincode) {
      requestQuery['pincode'] = parseInt(args.pincode)
    }
    if (args.district_name) {
      requestQuery['district_name'] = args.district_name
    }
    if (args.state_name) {
      requestQuery['state_name'] = args.state_name
    }
    if (args.latitude) {
      requestQuery['lat'] = args.latitude
    }
    if (args.longitude) {
      requestQuery['long'] = args.longitude
    }

    console.log(requestQuery)

    const result = await this.appointmentCenterModule.find(requestQuery).exec()

    return {
      status: HttpStatus.OK,
      data: result,
    }
  }

  private dateFormateConverter(value: Date) {
    const date = new Date(value)
    const dd = date.getDate()
    const mm = date.getMonth() + 1
    const yyyy = date.getFullYear()
    return `${dd < 10 ? `0${dd}` : dd}-${mm < 10 ? `0${mm}` : mm}-${yyyy}`
  }
}
