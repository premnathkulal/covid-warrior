import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppointmentSessionsController } from './appointmentSession.controller'
import { AppointmentCenterResolver } from './appointmentSession.resolver'
import { AppointmentSessionsServices } from './appointmentSession.service'
import { AppointmentCenterSchema } from './schemas/appointment-centers.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Appointmentcenter', schema: AppointmentCenterSchema },
    ]),
  ],
  controllers: [AppointmentSessionsController],
  providers: [AppointmentSessionsServices, AppointmentCenterResolver],
})
export class AppointmentSessionsModule {}
