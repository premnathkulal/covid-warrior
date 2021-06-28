import { Injectable } from '@nestjs/common'
import { DISTRICTS, STATES } from 'src/database/data'
import { Districts, States } from './interfaces/states-districts.interface'

@Injectable()
export class StatesDistrictsService {
  getStatesList(): States[] {
    return STATES
  }

  getDistrictsList(stateId: number): Districts {
    let district: Districts
    DISTRICTS.forEach((dis: any) => {
      if (dis.stateId == stateId) {
        district = dis.district
      }
    })
    return district
  }
}
