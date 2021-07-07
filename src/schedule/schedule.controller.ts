import {
  Controller,
  Request,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Get,
  Delete,
} from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import { CreateSchedule } from './dto/create-schedule.dto'
import { ApiTags } from '@nestjs/swagger'
import { ScheduleResponse } from './entities/schedule-response.entity'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UpdateSchedule } from './dto/update-schedule.dto'

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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.scheduleService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') beneficiaryId: string,
    @Body() updateScheduleDto: UpdateSchedule,
  ) {
    const username = req.user.username
    return await this.scheduleService.update(
      updateScheduleDto,
      beneficiaryId,
      username,
    )
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    const username = req.user.username
    return this.scheduleService.remove(id, username)
  }
}
