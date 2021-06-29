import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { StatesDistrictsModule } from './states-districts/states-districts.module'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'

@Module({
  imports: [
    StatesDistrictsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot(
      'mongodb+srv://premnathkulal1998:Un5pa2w7pb45nDPy@cluster0.wfsyt.mongodb.net/covidWarrior?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
