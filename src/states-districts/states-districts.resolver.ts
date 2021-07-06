import { Resolver, Query, Args } from '@nestjs/graphql'
import { Districts } from './entities/district.entity'
import { State } from './entities/state.entity'
import { StatesDistrictsService } from './states-districts.service'

@Resolver()
export class StatesDistrictsResolver {
  constructor(private statesDistrictsService: StatesDistrictsService) {}

  @Query(() => [State])
  async states() {
    const states = await this.statesDistrictsService.getStatesList()
    return states
  }

  @Query(() => Districts)
  async districts(@Args('stateId') stateId: number) {
    const districts = await this.statesDistrictsService.getDistrictsList(
      stateId,
    )
    return districts
  }
}
