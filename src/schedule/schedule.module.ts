import { Module } from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import { ScheduleController } from './schedule.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduleSchema } from './schemas/schedule.scema'
import { BeneficiaryModule } from 'src/beneficiary/beneficiary.module'
import { VaccinationCenterModule } from 'src/vaccination-center/vaccination-center.module'

@Module({
  imports: [
    BeneficiaryModule,
    VaccinationCenterModule,
    MongooseModule.forFeature([{ name: 'Schedule', schema: ScheduleSchema }]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
