import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { StatesDistrictsModule } from './states-districts/states-districts.module'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { VaccinationCenterModule } from './vaccination-center/vaccination-center.module'
import { BeneficiaryModule } from './beneficiary/beneficiary.module'
import { ScheduleModule } from './schedule/schedule.module'

@Module({
  imports: [
    StatesDistrictsModule,
    AuthModule,
    UsersModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://premnathkulal1998:1Wtfp26D9xAfSQnX@cluster0.wfsyt.mongodb.net/covidWarrior?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot(),
    VaccinationCenterModule,
    BeneficiaryModule,
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
