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
  HttpStatus,
} from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import { CreateSchedule } from './dto/create-schedule.dto'
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import {
  ScheduleResponse,
  ScheduleResponseById,
} from './dto/schedule-response.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UpdateSchedule } from './dto/update-schedule.dto'
import { Schedule } from './dto/schedule.dto'
import { VaccinationCenterServices } from 'src/vaccination-center/vaccination-center.service'

@ApiTags('Schedule Appointment APIs')
@Controller('schedule')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly vaccinationCenterService: VaccinationCenterServices,
  ) {}

  @ApiBearerAuth('JWT-auth')
  @ApiCreatedResponse({ type: ScheduleResponse })
  @ApiConflictResponse({ description: 'Appointment already Scheduled' })
  @ApiUnauthorizedResponse({ description: 'UnAuthorized' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createScheduleDto: CreateSchedule,
  ): Promise<ScheduleResponse> {
    const username = req.user.username
    return await this.scheduleService.create(createScheduleDto, username)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: Schedule })
  @ApiNotFoundResponse({ description: 'Schedule data not found' })
  @ApiUnauthorizedResponse({ description: 'UnAuthorized' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ScheduleResponseById> {
    const { beneficiaryId, centerID, slot, date, vaccine } =
      await this.scheduleService.findOne(id)
    const result =
      await this.vaccinationCenterService.findVaccinationCenterById(centerID)
    return {
      status: HttpStatus.OK,
      scheduleData: {
        beneficiaryId,
        centerID,
        slot,
        date,
        vaccine,
        centerName: result.data[0].name,
        centerAddress: result.data[0].address,
        pincode: result.data[0].pincode.toString(),
      },
    }
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ScheduleResponse })
  @ApiNotFoundResponse({ description: 'Schedule data not found' })
  @ApiUnauthorizedResponse({ description: 'UnAuthorized' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') beneficiaryId: string,
    @Body() updateScheduleDto: UpdateSchedule,
  ): Promise<ScheduleResponse> {
    const username = req.user.username
    return await this.scheduleService.update(
      updateScheduleDto,
      beneficiaryId,
      username,
    )
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ScheduleResponse })
  @ApiNotFoundResponse({ description: 'Schedule data not found' })
  @ApiUnauthorizedResponse({ description: 'UnAuthorized' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Request() req,
    @Param('id') id: string,
  ): Promise<ScheduleResponse> {
    const username = req.user.username
    return await this.scheduleService.remove(id, username)
  }
}
