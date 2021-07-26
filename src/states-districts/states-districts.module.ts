import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DistrictsSchema } from './schemas/districts.schema'
import { PincodeSchema } from './schemas/pincode.schema'
import { StatesSchema } from './schemas/states.schema'
import { StatesDistrictsController } from './states-districts.controller'
import { StatesDistrictsResolver } from './states-districts.resolver'
import { StatesDistrictsService } from './states-districts.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'State', schema: StatesSchema },
      { name: 'Districts', schema: DistrictsSchema },
      { name: 'Pincode', schema: PincodeSchema },
    ]),
  ],
  controllers: [StatesDistrictsController],
  providers: [StatesDistrictsService, StatesDistrictsResolver],
})
export class StatesDistrictsModule {
  constructor() {}
}
