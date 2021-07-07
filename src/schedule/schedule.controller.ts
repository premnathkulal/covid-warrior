import { Controller, Request, Post, Body, UseGuards } from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import { CreateSchedule } from './dto/create-schedule.dto'
import { ApiTags } from '@nestjs/swagger'
import { ScheduleResponse } from './entities/schedule-response.entity'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@ApiTags('Schedule Appointment APIs')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createScheduleDto: CreateSchedule,
  ): Promise<ScheduleResponse> {
    const username = req.user.username
    return await this.scheduleService.create(createScheduleDto, username)
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.scheduleService.findOne(+id)
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateScheduleDto: UpdateScheduleDto,
  // ) {
  //   return this.scheduleService.update(+id, updateScheduleDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.scheduleService.remove(+id)
  // }
}
