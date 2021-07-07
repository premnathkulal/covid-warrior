import { BadRequestException } from '@nestjs/common'
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'
import { CreateBeneficiary } from '../dto/create-beneficiary.dto'

@Injectable()
export class InputValidationPipe implements PipeTransform {
  transform(value: CreateBeneficiary, metadata: ArgumentMetadata) {
    this.testPhotoIdNumber(value)
    return value
  }

  private testPhotoIdNumber(value: CreateBeneficiary) {
    const aadharPattern = /^[2-9]{1}[0-9]{11}$/
    const panCardPattern = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/
    if (
      value.photo_id_type === '0' &&
      !aadharPattern.test(value.photo_id_number)
    ) {
      throw new BadRequestException('Invalid Aadhar Number')
    } else if (
      value.photo_id_type === '1' &&
      !panCardPattern.test(value.photo_id_number)
    ) {
      throw new BadRequestException('Invalid Pan Number')
    }
  }
}
