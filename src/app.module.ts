import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { StatesDistrictsModule } from './states-districts/states-districts.module';

@Module({
  imports: [StatesDistrictsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
