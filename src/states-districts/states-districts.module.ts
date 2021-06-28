import { Module } from '@nestjs/common'
import { StatesDistrictsController } from './states-districts.controller';
import { StatesDistrictsService } from './states-districts.service';

@Module({
  controllers: [StatesDistrictsController],
  providers: [StatesDistrictsService]
})
export class StatesDistrictsModule {}
