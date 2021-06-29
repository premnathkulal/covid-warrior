import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { sha256 } from 'js-sha256'
import { DistrictsSchema } from './schemas/districts.schema'
import { StatesSchema } from './schemas/states.schema'
import { StatesDistrictsController } from './states-districts.controller'
import { StatesDistrictsResolver } from './states-districts.resolver'
import { StatesDistrictsService } from './states-districts.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'States', schema: StatesSchema },
      { name: 'Districts', schema: DistrictsSchema },
    ]),
  ],
  controllers: [StatesDistrictsController],
  providers: [StatesDistrictsService, StatesDistrictsResolver],
})
export class StatesDistrictsModule {
  constructor() {
    const hashValue = sha256('992366')
    console.log(hashValue)
  }
}
