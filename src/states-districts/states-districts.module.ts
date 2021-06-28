import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DistrictsSchema } from './schemas/districts.schema'
import { StatesSchema } from './schemas/states.schema'
import { StatesDistrictsController } from './states-districts.controller'
import { StatesDistrictsService } from './states-districts.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'States', schema: StatesSchema },
      { name: 'Districts', schema: DistrictsSchema },
    ]),
  ],
  controllers: [StatesDistrictsController],
  providers: [StatesDistrictsService],
})
export class StatesDistrictsModule {}
