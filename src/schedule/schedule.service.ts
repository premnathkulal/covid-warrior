import { ConflictException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CreateSchedule } from './dto/create-schedule.dto'
import { Model } from 'mongoose'
import { Schedule } from './entities/schedule.entity'
import { ScheduleResponse } from './entities/schedule-response.entity'
import { BeneficiaryService } from 'src/beneficiary/beneficiary.service'

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel('Schedule')
    private readonly scheduleModule: Model<Schedule>,
    private readonly beneficiaryService: BeneficiaryService,
  ) {}

  async create(
    createScheduleDto: CreateSchedule,
    username: string,
  ): Promise<ScheduleResponse> {
    const findBeneficiary = await this.getScheduleById(
      createScheduleDto.beneficiaryId,
    )

    if (findBeneficiary[0]) {
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

  async getScheduleById(id: string): Promise<Schedule> {
    const result = await this.scheduleModule.find({ beneficiaryId: id })
    return result
  }
}
