import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { StatesDistrictsModule } from './states-districts/states-districts.module'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { AppointmentSessionsModule } from './appointmentSessions/appointmentSession.module'

@Module({
  imports: [
    StatesDistrictsModule,
    UsersModule,
    AuthModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://premnathkulal1998:1Wtfp26D9xAfSQnX@cluster0.wfsyt.mongodb.net/covidWarrior?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot(),
    AppointmentSessionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
