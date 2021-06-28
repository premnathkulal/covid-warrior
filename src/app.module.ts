import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { StatesDistrictsModule } from './states-districts/states-districts.module'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    StatesDistrictsModule,
    MongooseModule.forRoot(
      'mongodb+srv://premnathkulal1998:Zc9XSjOeinyUv116@cluster0.wfsyt.mongodb.net/covidWarrior?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
