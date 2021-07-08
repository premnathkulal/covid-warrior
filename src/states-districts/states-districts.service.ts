import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Districts } from './dto/district.dto'
import { States } from './dto/state.dto'
import { DistrictDocument } from './schemas/districts.schema'
import { StateDocument } from './schemas/states.schema'

@Injectable()
export class StatesDistrictsService {
  constructor(
    @InjectModel('State')
    private readonly statesModule: Model<StateDocument>,
    @InjectModel('Districts')
    private readonly districtsModule: Model<DistrictDocument>,
  ) {}

  async getStatesList(): Promise<States> {
    const result = await this.statesModule.find().exec()

    const states = await result.map(state => ({
      id: state.id,
      state_id: state.state_id,
      state_name: state.state_name,
    }))

    return {
      status: HttpStatus.OK,
      data: states,
    }
  }

  async getDistrictsList(stateId: number): Promise<Districts> {
    const districts = await this.districtsModule
      .findOne({ state_id: stateId })
      .exec()
    if (!districts) {
      throw new NotFoundException('State Not Found')
    }

    return {
      status: HttpStatus.OK,
      id: districts.id,
      state_id: districts.state_id,
      districts: districts.districts,
    }
  }
}
