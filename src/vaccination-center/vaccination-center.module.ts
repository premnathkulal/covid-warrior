import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { VaccinationCenterController } from './vaccination-center.controller'
import { VaccinationCenterResolver } from './vaccination-center.resolver'
import { VaccinationCenterServices } from './vaccination-center.service'
import { VaccinationCenterSchema } from './schemas/vaccination-center.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Vaccinationcenter', schema: VaccinationCenterSchema },
    ]),
  ],
  controllers: [VaccinationCenterController],
  providers: [VaccinationCenterServices, VaccinationCenterResolver],
  exports: [VaccinationCenterServices],
})
export class VaccinationCenterModule {}
