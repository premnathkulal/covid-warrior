import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Districts } from './entities/district.entity'
import { State } from './entities/state.entity'

@Injectable()
export class StatesDistrictsService {
  constructor(
    @InjectModel('States') private readonly statesModule: Model<State>,
    @InjectModel('Districts')
    private readonly districtsModule: Model<Districts>,
  ) {}

  async getStatesList(): Promise<State[]> {
    const states = await this.statesModule.find().exec()
    return states.map((state: State) => ({
      id: state.id,
      state_id: state.state_id,
      state_name: state.state_name,
    }))
  }

  async getDistrictsList(stateId: number): Promise<Districts> {
    const districts = await this.districtsModule
      .findOne({ state_id: stateId })
      .exec()
    if (!districts) {
      throw new NotFoundException('State Not Found')
    }

    return {
      id: districts.id,
      state_id: districts.state_id,
      districts: districts.districts,
    }
  }
}
