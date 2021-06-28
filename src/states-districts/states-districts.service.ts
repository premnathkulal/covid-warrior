import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { DISTRICTS } from 'src/database/data'
import { Districts, States } from './interfaces/states-districts.interface'

@Injectable()
export class StatesDistrictsService {
  constructor(
    @InjectModel('States') private readonly statesModule: Model<States>,
    @InjectModel('Districts')
    private readonly districtsModule: Model<Districts>,
  ) {}

  async getStatesList(): Promise<States[]> {
    const states = await this.statesModule.find().exec()
    return states
  }

  async getDistrictsList(stateId: number): Promise<Districts> {
    const district = await this.districtsModule
      .findOne({ stateId: stateId })
      .exec()
    return district
  }
}
