import { Module } from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import { ScheduleController } from './schedule.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduleSchema } from './schemas/schedule.scema'
import { BeneficiaryModule } from 'src/beneficiary/beneficiary.module'

@Module({
  imports: [
    BeneficiaryModule,
    MongooseModule.forFeature([{ name: 'Schedule', schema: ScheduleSchema }]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
