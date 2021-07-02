import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from 'src/users/schemas/user.schema'
import { AppointmentSessionsController } from './appointmentSession.controller'
import { AppointmentSessionsServices } from './appointmentSession.service'
import { AppointmentCenterSchema } from './schemas/appointment-centers.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Appointmentcenter', schema: AppointmentCenterSchema },
    ]),
  ],
  controllers: [AppointmentSessionsController],
  providers: [AppointmentSessionsServices],
})
export class AppointmentSessionsModule {}
