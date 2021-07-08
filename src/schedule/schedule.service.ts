import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CreateSchedule } from './dto/create-schedule.dto'
import { Model } from 'mongoose'
import { Schedule } from './dto/schedule.dto'
import { ScheduleResponse } from './dto/schedule-response.dto'
import { BeneficiaryService } from 'src/beneficiary/beneficiary.service'
import { UpdateSchedule } from './dto/update-schedule.dto'
import { ScheduleDocument } from './schemas/schedule.scema'

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel('Schedule')
    private readonly scheduleModule: Model<ScheduleDocument>,
    private readonly beneficiaryService: BeneficiaryService,
  ) {}

  async findOne(beneficiaryId: string): Promise<Schedule> {
    const result = await this.getScheduleById(beneficiaryId)
    if (!result) {
      throw new NotFoundException('Schedule data not found')
    }
    return result
  }

  async create(
    createScheduleDto: CreateSchedule,
    username: string,
  ): Promise<ScheduleResponse> {
    const scheduleData = await this.getScheduleById(
      createScheduleDto.beneficiaryId,
    )

    if (scheduleData) {
      throw new ConflictException('Appointment already Scheduled')
    }

    await this.beneficiaryService.setSchedule(
      createScheduleDto.beneficiaryId,
      username,
    )
    const schedule = new this.scheduleModule({
      username,
      ...createScheduleDto,
    })
    await schedule.save()
    return {
      status: HttpStatus.CREATED,
      message: 'Appointment Scheduled',
    }
  }

  async update(
    updateSchedule: UpdateSchedule,
    beneficiaryId: string,
    username: string,
  ): Promise<ScheduleResponse> {
    const scheduleData = await this.getScheduleById(beneficiaryId)

    if (!scheduleData) {
      throw new NotFoundException('Schedule data not found')
    }
    if (updateSchedule.centerID) {
      scheduleData.centerID = updateSchedule.centerID
    }
    if (updateSchedule.slot) {
      scheduleData.slot = updateSchedule.slot
    }
    if (updateSchedule.date) {
      scheduleData.date = updateSchedule.date
    }
    if (updateSchedule.vaccine) {
      scheduleData.vaccine = updateSchedule.vaccine
    }
    scheduleData.save()
    return {
      status: HttpStatus.OK,
      message: 'Schedule details updated',
    }
  }

  async remove(
    beneficiaryId: string,
    username: string,
  ): Promise<ScheduleResponse> {
    const scheduleData = await this.getScheduleById(beneficiaryId)

    if (!scheduleData) {
      throw new NotFoundException('Schedule data not found')
    }

    await this.beneficiaryService.setSchedule(beneficiaryId, username)
    const result = await this.scheduleModule.deleteOne({ beneficiaryId }).exec()
    return {
      status: HttpStatus.OK,
      message: 'Schedule details deleted',
    }
  }

  async getScheduleById(id: string): Promise<Schedule> {
    const result = await this.scheduleModule.findOne({ beneficiaryId: id })
    return result
  }
}
