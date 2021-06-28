import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { StatesDistrictsController } from './states-districts.controller'
import { DistrictsSchema, StatesSchema } from './states-districts.model'
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
